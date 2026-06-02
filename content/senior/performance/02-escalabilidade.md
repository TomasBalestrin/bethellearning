---
title: "Escalabilidade Horizontal e Vertical"
keywords: ["escalabilidade", "horizontal", "vertical", "senior"]
module: "Performance, Escalabilidade e Observabilidade"
lesson: "02 - Escalabilidade Horizontal e Vertical"
---

# Aula 02 - Escalabilidade Horizontal e Vertical

Seu aplicativo viralizou. Em vez de 10 usuários por minuto, você tem 10.000 usuários por segundo. O servidor vai explodir. Como você lida com isso? Com **Escalabilidade**.

## 1. Escala Vertical (Scale-Up)
Escalar verticalmente significa **comprar uma máquina maior**. Se você estava num servidor com 2GB de RAM e 1 processador, você migra para um servidor com 64GB de RAM e 16 processadores.
- **Prós:** Zero alteração no código. É rápido de configurar (na nuvem).
- **Contras:** Tem um limite físico (uma máquina não pode ter memória infinita). Tem limite de custo (máquinas absurdamente potentes são exponencialmente mais caras). Falha Única (Single Point of Failure): Se a Super Máquina reiniciar, todo o sistema cai.

## 2. Escala Horizontal (Scale-Out)
Escalar horizontalmente significa **adicionar mais máquinas médias/pequenas**. Em vez de 1 máquina superpoderosa, você usa 10 máquinas padrão trabalhando em conjunto.
- **Prós:** Escalabilidade quase infinita. Sem ponto único de falha (se uma máquina queimar, as outras nove assumem). Mais barato a longo prazo (commodity hardware).
- **Contras:** O código deve estar preparado para rodar distribuído.

### A Regra de Ouro da Escala Horizontal: Stateless (Sem Estado)
Para a escala horizontal funcionar perfeitamente, **os servidores de aplicação (web servers) não podem guardar o "estado" (como a sessão do usuário) na própria memória (RAM/Disco local)**.
- *Por quê?* Se a requisição 1 do usuário cair no Servidor A, ele faz login e o Servidor A guarda na memória. Se a requisição 2 do mesmo usuário cair no Servidor B (via Load Balancer), o Servidor B não saberá quem é o usuário.
- *A Solução:* O estado deve ir para fora da aplicação. Use **Bancos de Dados centralizados** ou, melhor ainda, um **Cache Distribuído** como o Redis (ou tokens JWT) para guardar sessões.

## 3. Escalando o Banco de Dados (O verdadeiro desafio)
A aplicação (Node/Python) escala facilmente horizontalmente. O Banco de Dados relacional, não.
1. Comece com Caching (Redis) para poupar leitura do banco.
2. Adicione **Réplicas de Leitura** (Read Replicas). Todo o código que apenas "busca" dados aponta para as Réplicas.
3. Último recurso (extremamente complexo): **Sharding** (Fragmentação). Cortar o banco em pedaços lógicos em servidores diferentes.

## Exercício Prático
1. Qual a diferença fundamental de arquitetura de código necessária para migrar um sistema que roda em escala vertical (1 máquina) para escala horizontal (múltiplas máquinas via Load Balancer)?
2. Explique como os JWTs (JSON Web Tokens) ajudam imensamente na criação de aplicações *Stateless*.

## Referências
- [AWS - What is Scalability?](https://aws.amazon.com/what-is/scalability/)
- [Designing Data-Intensive Applications (Livro - Martin Kleppmann)](https://dataintensive.net/)
