---
title: "Comunicação Técnica e Decisões"
keywords: ["comunicacao", "decisoes", "adr", "senior"]
module: "Liderança Técnica & Mentoring"
lesson: "03 - Comunicação Técnica e Decisões"
---

# Aula 03 - Comunicação Técnica e Decisões

Muitos projetos de software falham não por incompetência técnica, mas porque **as pessoas pararam de se comunicar direito**. Um Sênior atua como um "tradutor" entre o mundo dos negócios (Stakeholders/Product Owners) e o mundo técnico (Engenheiros).

## 1. Traduzindo "Tech" para "Business" (A Habilidade Chave)
O CEO da sua empresa não se importa que o banco de dados tem um problema de complexidade `O(N^2)`. Ele se importa que "os clientes estão desistindo da compra porque a tela de pagamento demora 5 segundos para carregar".
- **Comunicação Júnior:** "Temos que refatorar o loop do carrinho para usar HashMaps, senão o Array.find vai gargalar."
- **Comunicação Sênior:** "A tela de pagamento está lenta e isso custa vendas. Se investirmos 2 dias refatorando o carrinho, reduziremos o tempo de carregamento de 5s para menos de 1s, melhorando a conversão."

Sempre conecte **esforço técnico** a **valor de negócio** (dinheiro, tempo, segurança).

## 2. ADRs (Architecture Decision Records)
Decisões verbais se perdem com o tempo. Alguém entra na empresa seis meses depois e pergunta: *"Por que diabos estamos usando MongoDB em vez de Postgres?"*. 

A resposta de um Sênior está documentada em um **ADR** (Registro de Decisão de Arquitetura).
Um ADR é um arquivo de texto curto no repositório com 4 seções principais:
1. **Contexto:** "O MongoDB estava de graça na AWS e tínhamos pressa."
2. **Opções Consideradas:** "1. Postgres. 2. MongoDB. 3. Firebase."
3. **Decisão:** "Escolhemos o MongoDB."
4. **Consequências (Trade-offs):** "Ganhamos velocidade de desenvolvimento, mas não teremos transações ACID fáceis no futuro."

## 3. Conduzindo Reuniões Técnicas (Pareto)
A maioria das reuniões poderia ser um e-mail. Se você marcou uma reunião técnica (Design Sync):
1. **Tenha uma pauta (Agenda) enviada 24h antes.** Se as pessoas não leram, você perdeu tempo.
2. **Defina o "Decisor" (Owner).** Quem dá a palavra final se houver empate? (O Líder).
3. **Gere *Action Items* (Ações).** Ao final, defina: "Quem" faz "O Quê" até "Quando".

## Exercício Prático
1. Redija um pequeno **ADR** fictício decidindo entre usar *React* ou *Vue.js* para o próximo projeto da empresa. Invente um contexto que justifique sua escolha baseada nas habilidades atuais da sua equipe fictícia.
2. Como você explicaria o conceito de "Dívida Técnica" (Technical Debt) para um Diretor de Marketing que não entende de código, mas quer que você entregue uma feature até sexta-feira?

## Referências
- [Documenting Architecture Decisions - Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [The Manager's Path - Communicating with Stakeholders](https://www.oreilly.com/library/view/the-managers-path/9781491973882/)
