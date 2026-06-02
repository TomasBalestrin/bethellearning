---
title: "Monolito vs Microserviços"
keywords: ["system design", "microserviços", "monolito", "arquitetura", "senior"]
module: "System Design & Arquitetura de Sistemas"
lesson: "02 - Monolito vs Microserviços"
---

# Aula 02 - Monolito vs Microserviços (A Guerra Fria)

## 🎯 O Conceito (Pareto 80/20)

Há uma febre na indústria de que "Monolitos são ruins e Microserviços são bons". Isso é uma mentira que custa milhões de dólares às empresas todos os anos.

**Monolito:** Todo o seu código (Módulo de Usuários, Módulo de Vendas, Módulo de Relatórios) está em uma única pasta, roda em um único servidor Node.js e se conecta a um único banco de dados.
- *Vantagem:* Fácil de debugar, rápido de deployar, não tem problema de rede.
- *Desvantagem:* Se um dev Júnior fizer um `while(true)` no módulo de relatórios, o servidor trava e o módulo de Vendas (que gera dinheiro) cai junto.

**Microserviços:** Você quebra o sistema em dezenas de APIs independentes. A "API de Vendas" roda em um servidor. A "API de Usuários" roda em outro. Elas conversam pela internet.
- *Vantagem:* Se o módulo de Relatório cair, as Vendas continuam. Você pode usar Node.js nas vendas e Python na Inteligência Artificial. Você pode botar 10 servidores só pras vendas e manter 1 pros relatórios.
- *Desvantagem:* A complexidade de infraestrutura aumenta em 1000%. Agora você tem que lidar com rede falhando, autenticação entre serviços, e bancos de dados separados que perdem a sincronia.

**A Regra 80/20 de Arquitetura Sênior:** 
Sempre comece com um **Monolito Modular** (bem organizado por pastas). Só extraia um Microserviço quando o Monolito começar a doer (ex: o time cresceu para 50 desenvolvedores pisando no pé um do outro, ou uma parte específica do código exige muita CPU e precisa escalar sozinha).

---

## 💻 Deep Dive (Passo a Passo)

Vamos analisar o maior pesadelo de quem muda para microserviços: **A Transação Distribuída**.

### O Problema do Monolito (Fácil)
No monolito clássico (Uber, por exemplo), quando você paga a corrida:
1. Ele cobra o cartão.
2. Ele dá o recibo pro motorista.
Tudo isso acontece dentro de uma Transaction do SQL. Se a etapa 2 falhar, o banco de dados magicamente dá um `ROLLBACK` e cancela a etapa 1 (devolve o dinheiro). Lindo.

### O Pesadelo do Microserviço (Sagas)
Em microserviços, o *Serviço de Pagamento* e o *Serviço de Corridas* são bancos de dados separados! Não existe "Transaction do SQL" que englobe dois bancos diferentes pela internet.

Se o *Serviço de Pagamento* cobrar o cartão, e a rede cair na hora de avisar o *Serviço de Corridas*, o usuário foi cobrado e o motorista não recebeu a viagem.

Para resolver isso, usamos o **Padrão Saga**.
Se um pedaço da operação distribuída falhar, o sistema dispara **Eventos de Compensação** (Compensating Transactions) para desfazer manualmente o que os outros serviços já tinham feito.

**Exemplo Prático (Saga Coreografada):**
1. `Serviço de Pagamento` debita o cartão do usuário.
2. `Serviço de Pagamento` emite um evento no Kafka: `[EVENTO: PAGAMENTO_CONCLUIDO]`.
3. `Serviço de Corridas` escuta esse evento e tenta criar a corrida. Mas o banco de dados dele está fora do ar e falha.
4. `Serviço de Corridas` emite um evento de falha: `[EVENTO: FALHA_CRIAR_CORRIDA]`.
5. O `Serviço de Pagamento` (que estava escutando o Kafka) recebe o aviso de falha.
6. O `Serviço de Pagamento` roda uma função interna chamada `estornarCartao(usuario)`.

Essa é a dura realidade de microserviços: você escreve 3x mais código de tratamento de erros do que código de negócio.

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Monolito Distribuído (O pior dos dois mundos)
**O Sintoma:** Você dividiu o seu sistema em 5 microserviços. Mas toda vez que o "Serviço de Pedidos" vai rodar, ele precisa fazer um request HTTP (`fetch`) pro "Serviço de Produtos" para pegar o preço, e outro request HTTP pro "Serviço de Usuários" para ver se o cliente tem desconto.
**O Desastre:** A rede é lenta. Se o Serviço de Usuários cair, o Serviço de Pedidos não consegue finalizar a venda. Você acoplou os sistemas. Você não criou Microserviços, você criou um Monolito onde as peças demoram 500ms pra se comunicar pela internet.
**A Solução Sênior:** Os serviços não devem ficar fazendo requisições "Síncronas" (HTTP) o tempo todo. Eles devem sincronizar dados importantes de forma "Assíncrona" (via eventos) e ter seu próprio banco de dados isolado com as informações que precisam para trabalhar sozinhos.

### Erro 2: O Banco de Dados Compartilhado (Shared Database)
**O Sintoma:** Você tem 3 microserviços (A, B e C), rodando em servidores diferentes. Mas todos eles se conectam ao MESMO banco de dados `PostgreSQL` e acessam as mesmas tabelas.
**O Desastre:** Se a equipe do Serviço A mudar o nome da coluna `telefone` para `celular`, o Serviço B e C explodem no mesmo segundo. Eles não são independentes.
**A Solução:** Cada microserviço TEM que ter o seu próprio banco de dados (ou no mínimo o seu próprio Schema isolado). O Serviço A NUNCA lê a tabela do Serviço B. Se ele quiser dados do B, ele pede via API.

---

## 🚀 Desafio Prático

**Contexto:** Você é o Arquiteto de Software de uma nova Startup de Venda de Ingressos (Estilo Ticketmaster). A empresa acabou de nascer, tem 3 desenvolvedores e orçamento apertado. Mas os donos ouviram falar que o Netflix usa Microserviços e exigiram que você já crie a startup com 10 microserviços Kubernetes para ser "escalável no futuro".
**Tarefa:**
Escreva um pequeno argumento técnico defendendo por que a startup DEVE começar com uma arquitetura Monolítica bem estruturada (Monolito Modular), usando os conceitos de latência, velocidade de desenvolvimento (time to market) e complexidade de infraestrutura para convencer a diretoria.
