---
title: "Monitoring, Logging e Observabilidade"
keywords: ["observabilidade", "monitoring", "logging", "tracing", "senior"]
module: "Performance, Escalabilidade e Observabilidade"
lesson: "03 - Monitoring, Logging e Observabilidade"
---

# Aula 03 - Monitoring, Logging e Observabilidade

Um Junior diz: "O código compilou, está pronto". 
Um Pleno diz: "Os testes passaram, está pronto". 
Um Sênior diz: "O código está rodando no servidor, e eu consigo **ver** que está funcionando bem, através de métricas". 
Quando o sistema cai às 3 da manhã, é a Observabilidade que diz onde e por que ocorreu.

## 1. Os Três Pilares da Observabilidade

### A. Logging (Registros em Texto)
Logs são o diário de bordo da aplicação. Registram eventos discretos. 
- **O Erro Amador:** `console.log("Erro no banco")`. 
- **O Padrão Sênior:** Usar logs estruturados em formato JSON (ex: Winston ou Pino no Node.js), incluindo carimbo de tempo, ID do usuário (se aplicável) e a "Gravidade" (`INFO`, `WARN`, `ERROR`, `FATAL`).
Quando centralizados em ferramentas como ElasticSearch/Kibana (ELK) ou Datadog, você pode pesquisar "mostre todos os ERROR da última hora no Serviço X".

### B. Metrics (Métricas)
Métricas são números agregados ao longo do tempo. Elas respondem a perguntas como "Como estamos?" e "Algo mudou de repente?".
- CPU e Memória (Infraestrutura).
- Quantas requisições por segundo estamos recebendo?
- Qual é o tempo de resposta do P99 (percentil 99)?
Geralmente exportados para o Prometheus e visualizados em Dashboards incríveis no **Grafana**. É daqui que saem os Alertas automáticos (Slack/PagerDuty) se a latência subir muito.

### C. Tracing (Rastreamento Distribuído)
Se você tem uma arquitetura de Microservices, um "Clique" do usuário pode passar por 5 serviços diferentes. Se o serviço final falhar, você terá 5 logs isolados em 5 máquinas diferentes.
O *Distributed Tracing* anexa um `Correlation ID` único (ou Trace ID) à primeira requisição HTTP. Esse ID é repassado em todas as chamadas HTTP ou mensagens de fila seguintes. Assim, no *Jaeger* ou *DataDog*, você enxerga a requisição como uma árvore visual conectada de ponta a ponta.

## 2. SLOs, SLAs e Error Budgets
Sêniores usam métricas para firmar acordos:
- **SLA (Service Level Agreement):** Um contrato (geralmente com multas) dizendo "Prometemos 99.9% de disponibilidade".
- **SLO (Service Level Objective):** O alvo interno do time. (Ex: 99.95%).
- **Error Budget:** Se você pode ficar fora do ar por 43 minutos num mês inteiro (SLO de 99.9%), esses 43 minutos são o seu "Orçamento de Erro". Se você esgotar o orçamento porque soltou muitas features bugadas, o time para de codar features e foca só em estabilidade até o orçamento voltar.

## Exercício Prático
1. Por que usar `console.log()` comum em produção é uma prática ruim em sistemas distribuídos? Descreva os benefícios de um Log Estruturado (JSON).
2. Se um usuário relata "O app demorou 15 segundos para salvar minha foto" em um sistema com API Gateway, Serviço de Usuários e Serviço de Imagens, qual dos três pilares (Logging, Metrics ou Tracing) seria o mais rápido para descobrir em qual parte o tempo foi gasto?

## Referências
- [Distributed Tracing - Microservices.io](https://microservices.io/patterns/observability/distributed-tracing.html)
- [Site Reliability Engineering (SRE) - Google Book](https://sre.google/sre-book/table-of-contents/)
