---
title: "Design de Sistemas Distribuídos"
keywords: ["system design", "sistemas distribuidos", "cap theorem", "load balancer", "senior"]
module: "System Design & Arquitetura de Sistemas"
lesson: "01 - Design de Sistemas Distribuídos"
---

# Aula 01 - Design de Sistemas Distribuídos (A Arte de Escalar)

## 🎯 O Conceito (Pareto 80/20)

Quando você passa de Pleno para Sênior, o problema deixa de ser "Como eu escrevo o código?" e passa a ser **"Como eu mantenho esse sistema no ar quando 1 milhão de pessoas clicarem no mesmo botão ao mesmo tempo?"**.

Sistemas Distribuídos são vários computadores (nós) trabalhando juntos para parecerem um computador só para o usuário.

**O Pareto do System Design (Os 3 Pilares):**
1. **Load Balancing (Balanceamento de Carga):** Se um servidor aguenta 1.000 requisições, você coloca 5 servidores e um "guarda de trânsito" (Load Balancer) na frente para dividir o tráfego.
2. **Caching (Cache):** Bater no banco de dados é a operação mais lenta e cara que existe. Se o dado não muda a cada segundo (ex: Top 10 Filmes da Netflix), você guarda a resposta na memória RAM (ex: Redis) e devolve em milissegundos.
3. **O Teorema CAP:** Em sistemas distribuídos, você só pode escolher 2 destas 3 garantias:
   - **C (Consistency - Consistência):** Todos os usuários veem o MESMO dado na mesma hora.
   - **A (Availability - Disponibilidade):** O sistema sempre responde (mesmo que com dado velho).
   - **P (Partition Tolerance - Tolerância a Partição):** Se o cabo de rede entre os servidores romper, o sistema continua vivo.
   *(Como a internet sempre falha (P é obrigatório), você sempre tem que escolher entre C e A. O Nubank escolhe C. O Twitter escolhe A).*

---

## 💻 Deep Dive (Passo a Passo)

Vamos desenhar a arquitetura de uma funcionalidade crítica: **Um contador de "Likes" de um vídeo viral (Estilo YouTube/TikTok)**.

### Passo 1: O Design Ingênuo (Pleno)
Um dev Pleno faria assim:
1. O usuário clica em Like.
2. A API (Node.js) recebe o request.
3. A API faz um `UPDATE videos SET likes = likes + 1 WHERE id = 123`.

**Por que quebra?** Se 100.000 pessoas derem like no Neymar ao mesmo tempo, você vai disparar 100.000 `UPDATES` simultâneos na mesma linha (Row Lock) do banco de dados (MySQL/Postgres). O banco trava, o servidor engasga, o sistema cai.

### Passo 2: O Design Sênior (Desacoplamento e Buffer)
Um Sênior sabe que o usuário não se importa se o Like dele demorar 5 segundos para aparecer para o resto do mundo. (A gente sacrifica Consistência em favor de Disponibilidade).

**Nova Arquitetura:**
1. **API:** O usuário clica no Like. A API não fala com o Banco de Dados. Ela joga a mensagem "User X deu Like no Vídeo Y" numa **Fila de Mensagens** (Message Broker, ex: RabbitMQ, Apache Kafka ou AWS SQS).
2. **Resposta Rápida:** A API imediatamente devolve `HTTP 202 Accepted` pro celular do usuário (O botão fica azul na hora pra ele).
3. **O Worker (Consumidor):** Em background, um robozinho (Worker) puxa as mensagens dessa fila. Se tiver 100.000 mensagens, ele não faz 100.000 updates. Ele soma tudo na memória dele (agrupa) e, a cada 5 segundos, manda um ÚNICO update pro banco de dados: `UPDATE videos SET likes = likes + 100000`.

Isso é "Event-Driven Architecture" (Arquitetura Orientada a Eventos) com Buffering. O banco de dados nem sentiu cócegas.

### Passo 3: O Caching da Leitura
Como as pessoas leem a quantidade de likes do vídeo?
Se toda vez que alguém abrir a página do vídeo, você der um `SELECT` no banco, o banco cai do mesmo jeito.

**Nova Arquitetura:**
1. Quando o "Worker" atualiza o banco de dados oficial, ele também atualiza uma chave num banco de memória super rápido (Redis).
2. Quando o usuário abre o App, a API do backend consulta apenas o Redis (que responde em 1 milissegundo) e devolve a tela. O banco SQL pesado nunca é consultado para visualização, apenas para gravação (CQRS Pattern).

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Cache Stampede (O Estouro da Boiada)
**O Sintoma:** Seu site estava rápido porque usava Redis (Cache). A validade do Cache estava configurada para 1 hora. Quando deu 1 hora exata, o Cache apagou para renovar os dados. Naquele exato segundo, 50.000 requisições bateram na API e as 50.000 foram pro Banco de Dados porque o cache estava vazio. O banco caiu na hora.
**A Solução Sênior:** *Cache Warming* ou *Locking*. Quando o cache expira, apenas a PRIMEIRA requisição é autorizada a ir no banco SQL calcular o novo dado. As outras 49.999 requisições recebem o dado "velho" ou ficam presas esperando 100 milissegundos até a primeira requisição repopular o cache.

### Erro 2: Single Point of Failure (SPOF)
**O Sintoma:** Você desenhou uma arquitetura linda com 10 servidores Node.js atrás de 1 Load Balancer super potente da AWS. Um dia, a AWS tem um problema justo no servidor físico onde estava o seu Load Balancer. Como todas as requisições passavam por ele antes de chegar nos seus 10 servidores, seu site inteiro saiu do ar.
**A Solução:** Redundância total. Nada no seu sistema pode existir na quantidade de UM. Todo componente crítico precisa ter um espelho (Failover) operando em Zonas de Disponibilidade diferentes (Datacenters separados geograficamente).

---

## 🚀 Desafio Prático

**Contexto:** Você está numa entrevista de System Design para uma vaga Sênior no Ifood.
**Tarefa:**
O entrevistador desenha o seguinte cenário: "No dia dos namorados, às 19h00, o tráfego do Ifood multiplica por 10x. Nossos bancos de dados de "Restaurantes" não estão aguentando a quantidade de `SELECTS` dos usuários rolando a tela procurando o que comer."

Liste **DUAS técnicas de arquitetura** que você usaria para evitar que essas leituras derrubem o banco de dados relacional principal. (Dica: Pense no que muda muito e no que muda pouco).
