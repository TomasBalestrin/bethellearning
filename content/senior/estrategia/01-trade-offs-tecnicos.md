---
title: "Trade-offs Técnicos"
keywords: ["trade-offs", "decisoes", "senior", "estrategia"]
module: "Estratégia Técnica e Tomada de Decisão"
lesson: "01 - Trade-offs Técnicos"
---

# Aula 01 - Trade-offs Técnicos (A Balança do Sênior)

A resposta mais comum de um Sênior verdadeiro para qualquer pergunta de arquitetura é: **"Depende"**. E esse depende é baseado nos *Trade-offs* (concessões/escolhas difíceis). Não existe "bala de prata" em engenharia de software; você sempre troca uma vantagem por uma desvantagem.

## 1. As Grandes Balanças da Engenharia

### A. Velocidade de Entrega vs Qualidade (Dívida Técnica)
- Entregar um MVP (Produto Mínimo Viável) correndo, sem testes e sem Clean Architecture, ganha o mercado antes do concorrente. Mas gera **Dívida Técnica**.
- Escrever testes perfeitos e documentação para tudo garante qualidade, mas se a startup falir antes de lançar, o código perfeito é inútil.
- **O Trade-off:** Um Sênior sabe contrair Dívida Técnica "conscientemente". Como pegar um empréstimo no banco para comprar uma máquina de costura: você faz rápido para gerar lucro, mas anota (ADRs) que terá que pagar os "juros" (refatorar) no próximo trimestre.

### B. Consistência vs Disponibilidade (Lembre do Teorema CAP)
Se um banco de dados divide suas informações, manter os dados perfeitos (Consistência) faz o sistema ficar fora do ar se houver falha de rede (fere a Disponibilidade).
Sistemas de pagamentos focam em Consistência. Redes sociais focam em Disponibilidade.

### C. Normalização (SQL) vs Desnormalização (NoSQL)
- **Normalizar (SQL):** Salva os dados em um só lugar. Perfeito para garantir que o "nome" nunca fique desatualizado (Consistência). Porém, exige *JOINs* pesados (lentos).
- **Desnormalizar (NoSQL):** Duplicar os dados. Salvar o "nome" no Perfil e também junto com cada Postagem do usuário. A leitura das postagens é instantânea (Performance), mas quando o usuário trocar de nome, você terá que rodar um script caçando e alterando milhares de postagens (Complexidade de Manutenção).

## 2. Padrões vs "Overengineering"
O *Overengineering* (excesso de engenharia) é a doença clássica do Pleno virando Sênior. Ele acabou de ler um livro sobre Design Patterns, CQRS, e Event Sourcing, e tenta aplicar isso numa simples página de formulário de contato de um dentista local.
- **Trade-off:** Aplicar Padrões Avançados aumenta a Escala e a Manutenibilidade a longo prazo, mas esmaga a Velocidade Inicial e a Curva de Aprendizado para desenvolvedores Juniores que entrarem no projeto.

## Exercício Prático
1. Se a sua empresa (uma startup em estágio inicial com pouco orçamento) precisar escolher entre "Fazer deploy em Máquinas Virtuais simples no DigitalOcean" vs "Construir uma infraestrutura gigantesca baseada em Kubernetes na AWS", analise os *Trade-offs* de ambas as abordagens.
2. Explique a diferença entre "Dívida Técnica Consciente" e "Código Desleixado".

## Referências
- [Fundamentos de Arquitetura de Software - Mark Richards](https://www.amazon.com.br/Fundamentos-da-arquitetura-software-engenharia/dp/8575228186)
