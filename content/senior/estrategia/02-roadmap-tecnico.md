---
title: "Roadmap Técnico e Planejamento"
keywords: ["roadmap", "planejamento", "estrategia", "senior"]
module: "Estratégia Técnica e Tomada de Decisão"
lesson: "02 - Roadmap Técnico e Planejamento"
---

# Aula 02 - Roadmap Técnico e Planejamento

O Product Manager (PM) é dono do "Roadmap do Produto" (novas telas, novas regras de negócios). O Sênior/Tech Lead é dono do **Roadmap Técnico**. Se você não lutar pelo espaço do Roadmap Técnico, seu sistema entrará em colapso devido à dívida técnica antes que o Produto atinja seus objetivos.

## 1. O que é um Roadmap Técnico?
É um documento de planejamento a longo prazo (Trimestres ou Semestres) que alinha **Iniciativas Tecnológicas** com os **Objetivos de Negócio**.
Exemplos de iniciativas técnicas:
- "Migrar de JavaScript para TypeScript".
- "Separar o serviço de Faturamento num Microservice isolado".
- "Atualizar a versão do Node.js de 14 para 20".

## 2. A Matriz Impacto vs Esforço (Priorização)
Você terá 50 coisas no backlog técnico, mas tempo para fazer apenas 3. Como escolher?
Você plota as iniciativas num gráfico 2x2:
1. **Baixo Esforço, Alto Impacto (Quick Wins):** O "Fruto baixo". Faça isso **AGORA**. (Ex: Adicionar um índice no banco que resolve um gargalo de lentidão imenso).
2. **Alto Esforço, Alto Impacto (Major Projects):** O núcleo do seu roadmap. Agende-os cuidadosamente (Ex: Migração de banco de dados).
3. **Baixo Esforço, Baixo Impacto (Fill-ins):** Tarefas para dias de "folga" ou sexta-feira à tarde.
4. **Alto Esforço, Baixo Impacto (Thankless Tasks):** Abandone. Esqueça. Jogue no lixo. (Ex: Reescrever o site interno do RH para usar a versão mais recente do React se o RH usa ele 1 vez por mês e funciona bem).

## 3. Negociando com a Área de Negócios (Business)
A regra geral de times saudáveis é a alocação do **"Budget Técnico"**: 
Tente negociar com os PMs para dedicar entre **15% a 25%** de todo o tempo de desenvolvimento (Sprints) *exclusivamente* para pagar dívida técnica, refatorações, infraestrutura e segurança.
- *Argumento matador:* "Se não dedicarmos 20% do nosso tempo agora para atualizar essas bibliotecas de segurança, corremos o risco de um vazamento de dados que fará a empresa perder milhões. Além disso, a cada mês que passa, entregar uma feature nova está ficando 10% mais lento."

## Exercício Prático
1. Faça uma lista de 4 débitos técnicos que você percebe num projeto seu ou da sua empresa hoje. Classifique-os na matriz de Impacto vs Esforço.
2. Como você argumentaria com o CEO da empresa que a equipe precisa "parar" de desenvolver novas funcionalidades por duas semanas para atualizar a versão principal do framework que vocês utilizam? Baseie seus argumentos em *riscos* e *custos*.

## Referências
- [Technical Debt - Martin Fowler](https://martinfowler.com/bliki/TechnicalDebt.html)
- [Shape Up (Basecamp Method)](https://basecamp.com/shapeup)
