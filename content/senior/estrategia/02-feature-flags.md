---
title: "Feature Flags e Lançamento Progressivo"
keywords: ["estrategia", "feature flags", "deploy", "release", "senior"]
module: "Estratégia Técnica"
lesson: "02 - Feature Flags"
---

# Aula 02 - Feature Flags (O Botão de Pânico)

## 🎯 O Conceito (Pareto 80/20)

Antigamente (e na aula de Git), aprendemos que **Deploy** (Jogar o código no servidor) e **Release** (Lançar a funcionalidade para o cliente final) eram a mesma coisa. O código entrava na `main`, o robô mandava pro ar, e automaticamente o cliente via a tela nova.

Mas se a tela nova tiver um bug, 100% dos seus clientes vão sofrer ao mesmo tempo. 

As gigantes da tecnologia (Facebook, Spotify) criaram o conceito de **Desacoplar Deploy de Release**.
O código novo vai para os servidores, MAS escondido atrás de uma chave liga/desliga no banco de dados chamada **Feature Flag** (Sinalizador de Funcionalidade). 

**A Mágica da Feature Flag (80/20):**
1. O botão "Comprar" novo já está no código do servidor em produção, mas o `if (feature_flag_is_on)` está falso. Ninguém vê o botão. O código está "Dormindo".
2. Você pode ativar a Flag apenas para os desenvolvedores internos. Vocês testam em produção sem ninguém saber.
3. Você pode ativar a Flag para apenas 5% dos clientes reais. Se os logs mostrarem erros, você desliga a Flag num clique. O botão de pânico! Ninguém precisa fazer "Rollback" do servidor, apenas mudar `true` para `false` no painel.

---

## 💻 Deep Dive (Passo a Passo)

Vamos criar um sistema brutalmente simples de Feature Flags. Em produção, você usaria ferramentas famosas como *LaunchDarkly* ou *GrowthBook*. Mas por baixo dos panos, todas fazem a mesma coisa.

### Passo 1: O Painel de Controle (O Banco)
Você tem um documento no banco de dados (ou uma API super rápida no Redis) que dita o que está ligado ou desligado.

```json
{
  "novo_checkout": false,
  "chat_bot_ia": true,
  "tema_escuro_beta": "apenas_funcionarios"
}
```

### Passo 2: O Código do Front-end (O If Gigante)
No seu código React, Angular ou HTML puro, você consulta esse arquivo e toma a decisão visual.

```javascript
// O componente da página do Carrinho
async function carregarCarrinho() {
  
  // Pergunta pra API de flags o que tá ligado
  const flags = await buscarFlagsDoUsuario(usuarioId);
  
  // O divisor de águas
  if (flags.novo_checkout === true) {
    renderizarCheckoutInovadorModerno();
  } else {
    renderizarCheckoutAntigoFeioMasFuncional();
  }
}
```

### Passo 3: O Lançamento Canário (Canary Release)
Chama-se Canário porque os mineradores antigos desciam nas minas de carvão com um passarinho canário. Se houvesse gás tóxico invisível, o passarinho morria primeiro, e os humanos corriam.

Com Feature Flags, você faz o Canary Release:
Você entra no painel da sua ferramenta de Flags e define: *"Ligue a flag 'novo_checkout' para 10% dos usuários aleatoriamente"*.
A ferramenta pega o ID do usuário, calcula uma probabilidade matemática, e para 10% das pessoas a função `buscarFlagsDoUsuario` retornará `true`.

Você monitora os Logs de Erro.
- Deu 0 erros? Aumente a Flag para 50%.
- Continuou 0 erros? Aumente para 100%. (Lançamento concluído!).
- Deu erro crítico nos 10%? Mude para 0% no botão de pânico. Apenas 10% dos usuários sofreram, 90% do faturamento da empresa ficou intacto na tela antiga.

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: A Dívida Técnica Infinita (Flag Rot)
**O Sintoma:** Faz 2 anos que o "novo_checkout" foi lançado para 100% dos usuários. Ninguém nunca mais olhou pro código. Hoje, você abre o arquivo do carrinho e existem 300 linhas do `renderizarCheckoutAntigoFeioMasFuncional()` lá, mortas, ocupando espaço e confundindo novos devs. O sistema tem 500 flags.
**A Solução Sênior:** Feature Flags têm prazo de validade. No momento em que uma flag atinge 100% de uso contínuo por 1 mês e o sistema está estável, o time TEM O DEVER de criar um ticket no Jira (uma tarefa) para ir lá no código, deletar o `if`, deletar a flag do painel, e deletar o código antigo inteiro. Chama-se "Cleanup".

### Erro 2: Flags Estáticas e o Cache Maldito
**O Sintoma:** Você notou um erro crítico em produção. Você correu no painel e desligou a flag (mudou para `false`). Mas os clientes continuam reclamando que a tela está lá e o site está caindo!
**A Causa:** O Front-end ou a API estão com um Cache (uma memória temporária) muito agressivo. Eles consultam o banco da Feature Flag, guardam o `true` no celular do cliente por 24 horas para "economizar internet". Quando você desliga a flag, o celular do cliente não fica sabendo.
**A Solução:** Ferramentas de Flag profissionais usam conexões persistentes (WebSockets ou Server-Sent Events) ou caches ultracurtos (TTL de 30 segundos) para que a virada de chave reflita nos celulares dos clientes em tempo quase real.

---

## 🚀 Desafio Prático

**Contexto:** Sua equipe estava desenvolvendo uma nova tela de "Indique um Amigo" que consumiria 2 semanas de trabalho. Na metade da segunda semana, o Back-end ficou pronto, mas o Desenvolvedor do Front-end ficou doente e não conseguiu terminar o código. Sexta-feira é o dia sagrado do Deploy mensal do servidor e o Tech Lead quer mandar tudo para a nuvem.
**Tarefa:**
Explique, usando a metodologia de Feature Flags, como o Tech Lead pode pegar o código *incompleto* do Front-end (quebraria a tela se alguém clicasse), fazer o "Merge" na branch Principal (`main`), e enviar para a produção hoje sem afetar NENHUM usuário real da plataforma.
