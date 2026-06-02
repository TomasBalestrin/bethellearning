---
title: "Comunicação Executiva para Devs"
keywords: ["lideranca", "comunicacao", "stakeholders", "trade-offs", "senior"]
module: "Liderança Técnica e Soft Skills"
lesson: "03 - Comunicação Executiva"
---

# Aula 03 - Comunicação Executiva para Devs (Como Falar com Chefes)

## 🎯 O Conceito (Pareto 80/20)

Muitos desenvolvedores incrivelmente técnicos nunca viram Chefes, Tech Leads ou CTOs porque não sabem "Falar a língua do Dinheiro e do Tempo". 

Se o Diretor da empresa perguntar: "Por que o site tá lento?", o Júnior responde: *"Ah, a nossa query no MongoDB não tá usando índice na collection de users, e o loop O(n^2) trava a thread do Node."* (O diretor não entendeu nada e vai achar que você é o problema).

O Sênior responde: *"A busca de usuários cresceu muito e está afunilando a velocidade. Já mapeei a solução, leva 1 dia de trabalho de um Dev para aplicar a correção e o site vai ficar 10x mais rápido."* (O diretor entendeu o problema, o custo de tempo, e o benefício do negócio).

**O Pareto da Comunicação Sênior:**
1. **Trade-offs (As Trocas):** Em engenharia, nada é de graça. Se quiser velocidade, gasta mais servidor (dinheiro). Se quiser segurança extrema, gasta mais tempo de desenvolvimento. O seu papel é apresentar opções.
2. **Pushback (Saber Dizer Não):** Dizer "Sim" pra todos os prazos irreais te leva ao Burnout e a entregar lixo. Dizer "Não" diretamente te faz ser odiado. A arte Sênior é o "Não Condicional".
3. **Visão de Produto:** Entender que código bonito não paga o seu salário. O que paga o salário são os clientes felizes e a empresa ganhando dinheiro.

---

## 💻 Deep Dive (Passo a Passo)

### Passo 1: O "Não Condicional" (A Arte do Escopo)
O Dono da empresa chega em você: *"Preciso que vocês entreguem o Chat de Suporte com Vídeo e Inteligência Artificial até a Black Friday na semana que vem."*

- O Júnior desesperado: *"Sim senhor, vamos trabalhar sábado e domingo!"* (Vai falhar).
- O Pleno arrogante: *"Impossível. A documentação da IA demora semanas. Não vai rolar."* (O dono vai procurar outro dev).
- O Sênior (Negociador de Escopo): *"Chefe, o pacote completo é tecnicamente impossível para a semana que vem com a nossa equipe atual. PORÉM, se cortarmos a IA e o Vídeo, nós conseguimos entregar o Chat de Texto básico funcional antes da Black Friday. E deixamos o Vídeo para o mês que vem. Fechado?"*

Você não disse Não para o objetivo do negócio. Você negociou o **Escopo** (o tamanho da entrega).

### Passo 2: Apresentando Trade-offs (As Opções)
Quando houver um problema técnico grande, você como Tech Lead não despeja o problema no gerente. Você apresenta o problema com **soluções mastigadas** para ele apenas decidir o risco.

*"Chefe, precisamos mudar nosso Banco de Dados de clientes. Temos 2 opções:*
*Opção A (Fazer internamente): Vamos gastar 1 mês inteiro de 3 desenvolvedores, mas a empresa economiza 2 mil dólares por mês em licenças para o resto da vida.*
*Opção B (Comprar pronto da AWS): Resolvo isso amanhã de tarde e a equipe volta a criar novas funcionalidades, mas vai nos custar 2 mil dólares por mês.*
*Qual rumo estratégico você prefere?"*

Você trouxe a Engenharia para o nível de Negócios (Business).

### Passo 3: O Feedback de Gestão (1:1s)
Como líder, você fará reuniões 1 a 1 (One-on-Ones) com outros desenvolvedores mais juniores para ajudá-los na carreira. 
- Nunca dê feedback apenas negativo no final do ano (Avaliação de Desempenho). O feedback é semanal e contínuo.
- Use a regra do "Ponto Forte, Ponto a Melhorar": Elogie o que o desenvolvedor faz bem (Aumenta a moral) e aponte UMA área clara onde ele pode subir de nível ("Seu código é ótimo, mas percebi que você sofre um pouco nas reuniões de Planning. Na próxima, tenta puxar a palavra e explicar a tarefa de front-end?").

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: A "Paralisia por Análise" (Overengineering)
**O Sintoma:** Você passa 3 meses montando uma arquitetura Kubernetes com 15 microserviços e bancos Kafka de altíssima performance para lançar um aplicativo de padaria que terá 50 usuários locais. A padaria quebra e fecha antes de o app ficar pronto.
**A Causa:** O dev não entendeu a Visão de Produto. Ele resolveu um problema técnico que não existia.
**A Solução Sênior:** *Time-to-market* é rei. Você entrega o Monolito de padaria em 1 semana, o dono começa a ganhar dinheiro, e SE a padaria virar uma franquia nacional de 100 lojas, aí sim a empresa terá dinheiro de sobra para pagar você para refatorar para Microserviços.

### Erro 2: Ocultar Problemas até o "Deadline"
**O Sintoma:** A entrega do projeto é na sexta-feira. Você sabe desde terça-feira que a API de pagamentos que o parceiro mandou tá toda quebrada e não vai dar tempo. Mas você sofre calado, tenta dar um jeito, e só avisa o chefe na quinta-feira à noite de que tudo vai falhar.
**A Solução:** Comunicação Precoce (Raise your hand). Profissionais não têm vergonha de bater no peito e dizer "Atrasamos". Um Sênior levanta a bandeira vermelha no instante em que o bloqueio aparece (ex: terça-feira de manhã), permitindo que o chefe reajuste o cronograma e avise os clientes de forma suave e com antecedência.

---

## 🚀 Desafio Prático

**Contexto:** O Gerente de Produto (Product Manager) sem formação técnica vem até você: *"Nosso novo app está consumindo 500MB de espaço no celular dos clientes e eles estão desinstalando. O que está acontecendo na Engenharia?"*
**Tarefa:**
Escreva (em 3 linhas) como você responderia a essa cobrança, explicando o problema das imagens não comprimidas do site de forma que o Gerente leigo entenda, e já apresentando o "Trade-off" entre investir tempo dos devs para consertar isso ou entregar a funcionalidade X que estava agendada para esta semana.
