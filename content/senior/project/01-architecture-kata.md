---
title: "Projeto Final - Architecture Kata"
keywords: ["projeto final", "kata", "system design", "arquitetura", "senior"]
module: "Projeto Final"
lesson: "01 - Projeto Final - Architecture Kata"
---

# Projeto Final (Trilha Sênior) - Architecture Kata

## 🎯 O Desafio do Mundo Real (A Prova de Fogo)

Chegou a hora de provar que você não é apenas um "Digitador Sênior", mas um **Arquiteto de Soluções**.

Diferente do Projeto Pleno (onde você construiu uma API RESTful), o projeto final Sênior não exige que você digite 1 única linha de código. Você fará um **Architecture Kata**. 
Um "Kata" (termo das artes marciais) é um exercício mental. Você receberá um Problema de Negócio (exatamente como receberia de um CTO) e terá que desenhar a solução inteira no papel, justificando suas escolhas tecnológicas.

Esta é a exata dinâmica usada nas entrevistas de Big Techs (Google, Uber, Nubank) para cargos Staff/Sênior.

---

## 📋 Requisitos de Negócio (O Problema)

A empresa **TicketFast** foi contratada para vender os ingressos do show de reunião de uma banda lendária de Rock no Brasil.

- **O Estádio:** Cabem 50.000 pessoas. (O inventário é finito).
- **O Hype:** As estimativas de marketing preveem que 2 Milhões de pessoas estarão com o site aberto dando F5 às 11h59 da manhã de terça-feira, esperando a bilheteria abrir ao meio-dia em ponto.
- **A Regra de Negócio Crítica:** Você não pode "vender ingressos duplicados" (overselling). Se restam 2 ingressos e 1.000 pessoas clicam no botão "Comprar" ao mesmo tempo, apenas as duas primeiras devem conseguir, e as outras 998 devem ser bloqueadas instantaneamente.
- **O Fluxo do Usuário:** O usuário clica no ingresso, o sistema "Reserva" o assento por 10 minutos (tirando ele da vitrine). O usuário vai para o checkout preencher o cartão de crédito. Se o cartão for recusado ou ele não pagar em 10 minutos, o ingresso volta para a vitrine para outra pessoa comprar.

---

## 🏗️ Requisitos Técnicos da Entrega (O Que Fazer)

Você deve entregar um **Design Document (RFC)** ou um Diagrama Arquitetural (usando ferramentas como *Draw.io*, *Excalidraw* ou *Miro*), contendo as seguintes seções:

### 1. Estimativa de Capacidade (Back-of-the-envelope math)
Mostre os cálculos de quantos requests por segundo (RPS) você espera ao meio-dia.

### 2. O Desenho da Infraestrutura (Macro)
Crie um diagrama de blocos mostrando:
- O celular do cliente / Navegador.
- O Load Balancer / CDN.
- Onde a tela de "Vitrine" vai buscar os dados sem bater no banco de dados.
- Os Microserviços ou Módulos (ex: Serviço de Fila, Serviço de Vendas).
- Os Bancos de Dados escolhidos.

### 3. As Decisões Tecnológicas (O Porquê)
Responda explicitamente:
- **O Banco de Dados Principal:** Você usaria SQL (Postgres/MySQL) ou NoSQL (MongoDB/DynamoDB) para armazenar os ingressos? Por quê? Como você vai evitar que duas requisições peguem o mesmo assento? (Dica: Pense no conceito de *Row Locking / Pessimistic Lock*).
- **A Fila Virtual:** O que acontece quando 2 milhões de pessoas batem na API de comprar? O Node.js trava? Você vai usar alguma Fila de Mensagens (Kafka/RabbitMQ) ou um sistema de "Fila de Espera Virtual" para amortecer o golpe? Como funcionaria?
- **O Descarte de 10 minutos:** Como você vai fazer o sistema perceber que passaram 10 minutos e o ingresso precisa ser devolvido pra vitrine? (Cronjobs a cada 1 minuto num banco de 50 mil ingressos vai fritar a CPU). Qual a solução mais elegante? (Dica: Pense em *Redis Key Expiration* ou *TTL*).

---

## 🛠️ Critérios de Sucesso (Como seu Kata será avaliado)

Um Tech Lead avaliará a sua arquitetura baseada nos Trade-offs que você escolheu:

1. **Escalabilidade (Passou no Teste?):** Se a sua arquitetura mandar todos os 2 milhões de F5s darem um `SELECT *` num banco MySQL tradicional, você foi reprovado imediatamente. O sistema deve proteger o banco a todo custo (Cash, CDN, Edge Computing).
2. **Consistência:** Se você desenhou um sistema onde o usuário compra, e descobre horas depois que "deu overbooking", você falhou na regra de ouro da empresa de ingressos.
3. **Simplicidade:** Você tentou colocar 30 microserviços Kubernetes complexos e Inteligência Artificial para resolver um problema que poderia ser resolvido com um Monolito, Redis e uma Fila? O excesso de engenharia (Overengineering) tira pontos.

Boa sorte, Arquiteto! O show tem que acontecer, e o sistema não pode cair.
