---
title: "Code Review e Mentoring"
keywords: ["code review", "mentoring", "lideranca", "senior"]
module: "Liderança Técnica & Mentoring"
lesson: "02 - Code Review e Mentoring"
---

# Aula 02 - Code Review e Mentoring (A Arte de Ensinar)

Um Sênior não usa o *Code Review* (Revisão de Código) para massagear o próprio ego apontando erros dos outros. O Code Review é a ferramenta **mais poderosa** de *Mentoring* assíncrono que existe na engenharia de software.

## 1. O Princípio de Pareto no Code Review
O que você deve buscar em uma revisão de código, do mais importante ao menos importante (foco nos 20% do topo):
1. **Design / Arquitetura:** Este código pertence a este lugar? Ele viola a Clean Architecture? 
2. **Lógica e Bugs:** Os fluxos condicionais cobrem os cenários negativos? Pode gerar um gargalo de performance?
3. **Legibilidade / Nomes:** Os nomes de variáveis e métodos contam a história do que o código faz?
4. **Estilo (Sintaxe/Indentação):** *Deixe isso para ferramentas automáticas (ESLint/Prettier)!* Humanos não deveriam discutir se falta um ponto-e-vírgula.

## 2. Comunicação Não-Violenta no Code Review
Como você fala muda tudo. Seja duro com o código, seja gentil com a pessoa.

- ❌ **Ruim:** "Você fez isso errado, vai quebrar a página toda." (Agressivo, aponta o dedo).
- ❌ **Ruim:** "Acho que isso aqui tá meio estranho." (Vago, não ajuda).
- ✅ **Bom:** "O que você acha de extrair essa lógica para um UseCase? Dessa forma, conseguimos testar sem depender do componente React." (Inclusivo, propõe solução e explica o *porquê*).

**Regra de Ouro:** Sempre pergunte em vez de afirmar. "Você pensou no que acontece se a API retornar erro 500?" é muito melhor que "Faltou o try/catch".

## 3. Mentoring (O Crescimento Contínuo)
O Mentoring não se resume a ensinar a usar uma biblioteca. Mentoring de verdade é ajudar desenvolvedores mais juniores a **pensar como sêniores**.

- **Pair Programming (Programação em Par):** Não digite o código para o Júnior. Faça-o ser o "Piloto" (quem digita) e você o "Navegador" (quem dita a estratégia). Isso força o júnior a processar a lógica.
- **Sessões de Design:** Antes deles começarem a codificar uma feature complexa, faça-os desenhar caixinhas num quadro. Valide a ideia *antes* de validarem código.

## Exercício Prático
1. Analise o seguinte comentário de Code Review: *"Isso aqui está horrível. Você colocou a chamada de banco no Controller. Leia sobre Clean Architecture."*
   Como você reescreveria esse comentário usando o modelo de Comunicação Não-Violenta e Mentoring construtivo?
2. Descreva como seria a dinâmica da sua primeira reunião "1-on-1" (Um a Um) com um desenvolvedor Júnior que acabou de entrar na sua equipe.

## Referências
- [How to Do Code Reviews Like a Human](https://mtlynch.io/human-code-reviews-1/)
- [Google's Engineering Practices documentation (Code Review)](https://google.github.io/eng-practices/review/reviewer/)
