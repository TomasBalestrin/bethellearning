---
title: "Evolução Arquitetural"
keywords: ["arquitetura evolutiva", "strangler fig", "migracoes", "senior"]
module: "Estratégia Técnica e Tomada de Decisão"
lesson: "03 - Evolução Arquitetural"
---

# Aula 03 - Evolução Arquitetural (Migrações Reais)

No mundo real de sistemas consolidados (legados), você quase nunca tem o luxo de reescrever um sistema do zero (O famoso *Big Bang Rewrite*, que historicamente tem uma taxa altíssima de falhas). O Sênior projeta a **transição gradual**.

## 1. O Padrão Strangler Fig (A Figueira Estranguladora)
Como você migra um monólito gigantesco de 10 anos em PHP para Microservices modernos em Node.js sem parar a empresa? Você usa o Padrão *Strangler Fig* (nomeado em homenagem a uma árvore que cresce ao redor de outra até substituí-la).

**Como funciona (O Pareto da Refatoração de Legado):**
1. **Interceptador (API Gateway/Proxy):** Coloque um Nginx ou AWS API Gateway na frente de toda a comunicação. Ele direciona TODO o tráfego atual para o sistema antigo (PHP).
2. **Construa o Novo:** Escolha **um único domínio pequeno** (Ex: "Faturamento") e reconstrua ele no sistema novo (Node.js).
3. **Mude a Rota:** Vá no Proxy e diga: "Se a URL for `/faturamento`, mande para o Node.js. Para todo o resto, continue mandando para o PHP".
4. **Repita:** Vá "estrangulando" o sistema antigo, endpoint por endpoint, até o sistema PHP ficar inútil e poder ser desligado com segurança.

## 2. Abstração por Ramificação (Branch by Abstraction)
Se você precisar trocar uma biblioteca de Core no meio do seu projeto (Ex: Mudar de MySQL para MongoDB, ou mudar o provedor de pagamentos da Stripe pro PayPal) e ela está espalhada por 300 arquivos, você faz:
1. Crie uma **Interface (Abstração)** que o restante do sistema usará (Ex: `IPaymentService`).
2. Faça o código atual (Stripe) implementar essa Interface. Todo o sistema passa a chamar a Interface, não o Stripe direto.
3. Crie a implementação Nova (PayPal) seguindo a mesma Interface.
4. Troque a Injeção de Dependência da Velha para a Nova. Se der erro, você pode simplesmente "virar a chave" de volta para o código antigo em 1 minuto, porque ambos respeitam a mesma Interface.

## 3. Design Evolutivo
Um bom design de software não é o que prevê perfeitamente o futuro. É o que permite **mudar de ideia barato** no futuro.
Adie decisões difíceis o máximo que puder. Não decida usar Kafka se você só tem 10 requisições por dia. Faça o mais simples possível, mas **esconda essa decisão atrás de uma interface** para que você possa substituir por Kafka facilmente quando escalar.

## Exercício Prático
1. A sua empresa possui um painel de administração escrito há 8 anos, muito lento e inseguro. O CEO pediu para reescrever tudo em React. Utilizando o **Padrão Strangler Fig**, como você descreveria o plano de ação passo-a-passo (com duração de meses) para realizar essa mudança de forma invisível para o usuário final e minimizando riscos de interrupção no serviço?
2. Procure pela Lei de Conway (Conway's Law). Como a estrutura organizacional da sua empresa afeta o código (e vice-versa)?

## Referências
- [Strangler Fig Pattern - Martin Fowler](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Building Evolutionary Architectures - Neal Ford](https://evolutionaryarchitecture.com/)
