---
title: "Gestão de Crises e Incidentes (Post-mortem)"
keywords: ["lideranca", "gestao de crise", "post-mortem", "incidentes", "senior"]
module: "Liderança Técnica e Soft Skills"
lesson: "02 - Gestão de Crises e Incidentes"
---

# Aula 02 - Gestão de Crises e Incidentes (A Calma no Caos)

## 🎯 O Conceito (Pareto 80/20)

Sexta-feira, 15h. Você acabou de dar o deploy da nova versão da API de Pagamentos. Às 15h05, o canal do Slack da diretoria explode. Clientes estão ligando. Ninguém consegue passar o cartão no site. A empresa está perdendo R$ 10.000 por minuto.

É neste exato segundo que se separa o Sênior do Pleno.

**O Pareto da Gestão de Crise:**
1. **Mitigar antes de Corrigir:** O seu trabalho não é achar a raiz do bug enquanto o site queima. É estancar o sangramento na hora. O botão mais importante da empresa é o **Rollback** (Voltar a versão pro código antigo de ontem que funcionava).
2. **A Comunicação:** Uma crise sem comunicação gera pânico. Uma crise onde o Sênior avisa de 15 em 15 minutos o status, gera respeito e controle.
3. **Blameless Post-Mortem (Autópsia Sem Culpa):** Depois que o incêndio apagou, achamos o CULPADO, certo? **ERRADO**. Empresas de elite não buscam o culpado (o estagiário que deletou o banco). Elas buscam "Qual foi a falha no nosso sistema/processo que PERMITIU que um humano apertasse o botão errado?".

---

## 💻 Deep Dive (Passo a Passo)

### Passo 1: O "War Room" (A Sala de Guerra)
O site caiu. A primeira regra Sênior é **Centralizar a Informação**.
Você não fala com o chefe no WhatsApp, e com o estagiário no Slack, e com o gerente no Teams.
Você abre uma sala de chamada de vídeo única (O "War Room" ou "Incident Channel"). Todo mundo que é importante entra ali.

A Liderança Técnica exige designar papéis:
- **O Investigador:** Quem vai olhar os logs de erro do servidor para ver onde travou.
- **O Comunicador:** Quem vai escrever para a diretoria/clientes "Estamos cientes do problema e atuando". (Tirando a pressão dos ombros de quem está codando).

### Passo 2: Rollback vs Fix Forward
- **Rollback (Reversão):** "O código que subiu às 15h quebrou. Então clique no botão de Deploy da versão das 14h." Isso funciona em 90% das vezes e apaga o incêndio em 30 segundos.
- **Fix Forward (Corrigir pra Frente):** "O código subiu, apagou colunas do banco de dados, e o Rollback não vai trazer os dados de volta." Neste caso, você é forçado a consertar o código no desespero, commitar a correção com suor frio, e dar push. É arriscado, mas às vezes inevitável.

### Passo 3: O Documento de Post-Mortem
Após a crise resolvida e todo mundo ir pra casa dormir, a empresa precisa evoluir para não acontecer de novo. Você escreve um **Post-Mortem**.
É um documento simples contendo:
1. **Timeline:** 15h00 (deploy), 15h05 (alertas apitaram), 15h12 (rollback executado, sistema normal).
2. **Impacto:** "Ficamos fora do ar por 12 minutos. 400 clientes não conseguiram comprar."
3. **Causa Raiz:** "Um erro de sintaxe no arquivo XPTO.js impediu o serviço de iniciar."
4. **Plano de Ação (A parte de ouro):** O que vamos fazer para isso NUNCA mais acontecer? "Adicionar um teste automatizado no Jest para o arquivo XPTO" ou "Configurar o servidor para impedir o deploy se a sintaxe falhar".

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Caça às Bruxas
**O Sintoma:** Na reunião do dia seguinte, o gerente pergunta: "Quem foi o incompetente que aprovou o Pull Request do botão de pagar?". O Sênior aponta para o Pleno, que aponta para o Júnior. O clima da empresa fica tóxico e o Júnior pede demissão.
**A Solução Sênior:** Liderança Técnica blinda a equipe. Se um humano quebrou o sistema da empresa com um clique, a empresa tem uma infraestrutura patética e frágil. A resposta sênior é: "O João fez o deploy, mas o nosso sistema não tinha nenhum Teste de Integração barrando o deploy. A culpa não é dele, é da nossa falta de cobertura de testes. Vamos adicionar os testes hoje."

### Erro 2: Silêncio no Rádio
**O Sintoma:** O sistema cai. O Tech Lead fica em pânico tentando debugar o código no VS Code. Passam-se 40 minutos. O CEO não faz ideia do que está acontecendo e liga furioso exigindo demissões.
**A Solução:** Comunicação de Crise. O Sênior respira e posta no canal da empresa: "Tivemos um pico de erro no banco de dados. Estou investigando os logs. Dou atualizações daqui a 15 minutos". Só isso já acalma 90% da raiva da diretoria. Mostra que alguém no manche do avião está no controle.

---

## 🚀 Desafio Prático

**Contexto:** Um Júnior acabou de rodar o comando SQL `DELETE FROM clientes` (esquecendo o `WHERE id = 1`) no banco de dados de produção da empresa, apagando o banco todo. Ele está chorando desesperado achando que será demitido. 
**Tarefa:**
Você é o Tech Lead Sênior ao lado dele. 
1. Qual sua primeira Ação Imediata TÉCNICA para recuperar a empresa em minutos?
2. Como você fala com o Júnior (lado humano) e qual é o "Plano de Ação" que você anotaria no Post-Mortem para resolver a falha de sistema que permitiu isso acontecer?
