---
title: "Mentoria e Code Review"
keywords: ["lideranca", "code review", "mentoria", "feedback", "senior"]
module: "Liderança Técnica e Soft Skills"
lesson: "01 - Mentoria e Code Review"
---

# Aula 01 - Mentoria e Code Review (O Multiplicador de Força)

## 🎯 O Conceito (Pareto 80/20)

Você não é Sênior porque escreve código rápido. Você é Sênior porque **faz os outros escreverem código rápido**. A métrica do Desenvolvedor Sênior é o impacto na equipe. Se você entrega suas tarefas brilhantemente, mas o time todo atrasa, você falhou como Sênior.

O Code Review e a Mentoria não são sobre encontrar erros de vírgula. São sobre **Construir Cultura**.

**O Pareto do Code Review:**
1. **Padrão e Linting é trabalho de máquina:** Não perca tempo reclamando de indentação ou aspas duplas no Code Review. Configure um Prettier ou ESLint no projeto e deixe o robô barrar isso automaticamente.
2. **Review Arquitetural:** O que você procura num Review é se o código atende ao requisito de negócio, se é seguro (não tem SQL Injection), e se não destruiu a arquitetura limpa (ex: Controller chamando o Banco de Dados direto).
3. **Feedback Construtivo, não Destrutivo:** Nunca diga "Esse código está horrível". Diga: "O que você acha de tentarmos abstrair essa lógica para um serviço para facilitar os testes?".

---

## 💻 Deep Dive (Passo a Passo)

### Passo 1: O PR (Pull Request) Tóxico vs O PR Sênior
**O Cenário:** Um Dev Júnior acabou de enviar o código de um novo botão de compra, mas ele colocou a regra de imposto repetida 3 vezes dentro da mesma tela.

**O Comentário do "Falso Sênior" (Arrogante):**
> ❌ "Código lixo. Princípio DRY. Você repetiu a variável do imposto 3 vezes. Arruma isso antes que vá para produção."

**O Comentário Sênior de Verdade (Mentor):**
> ✅ "Ótimo trabalho finalizando a tela a tempo, João! O botão ficou exatamente como o design pediu.
> Tenho apenas um ponto de melhoria: notei que a lógica do imposto foi repetida nas linhas 40, 50 e 60. Se a lei mudar no mês que vem, podemos esquecer de atualizar em um desses lugares.
> O que você acha de extrairmos esse cálculo para uma função de utilidade pura chamada `calcularImposto()`? Deixei um exemplo de como poderia ficar aqui embaixo. Me avisa se precisar de ajuda!"

### Passo 2: Mentoria por Pair Programming
Às vezes, um comentário no GitHub não basta. Quando o Júnior manda o mesmo PR errado pela 3ª vez, não adianta continuar comentando.

A ferramenta Sênior é puxar um **Pair Programming** (Programação em Par).
- **Você não pega o teclado.** Se você pegar e fizer, ele não aprende.
- Você pede para ele compartilhar a tela.
- Ele é o "Piloto" (digita). Você é o "Navegador" (dá as instruções lógicas).
- Você guia o pensamento: *"E se passarmos null pra essa função agora, o que acontece?"*, *"Vamos colocar um console.log aqui pra ver o que a API respondeu."*

### Passo 3: Tempo de Resposta de Code Review
O Code Review é **a tarefa de maior prioridade** do seu dia, mais do que escrever o seu próprio código.
Se o Júnior pediu um Review e você o deixa esperando por 3 dias porque "estava muito focado na sua tarefa", você bloqueou a esteira da empresa. O Júnior ficou 3 dias ocioso ou criando branches que vão dar conflito. O código do seu time apodrece quando o PR fica encalhado. Aprove PRs no mesmo dia.

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: O PR "Aprova Tudo" (LGTM - Looks Good To Me)
**O Sintoma:** Você recebe um PR com 50 arquivos alterados. Você não entende nada do que está ali, olha por cima em 10 segundos, e clica no botão "Approve" escrevendo "LGTM" pra se livrar logo do trabalho. 2 horas depois, o site cai em produção.
**A Solução Sênior:** Se o PR tem 50 arquivos, o PR está errado. PRs gigantes não podem ser revisados humanamente. A primeira atitude sênior é falar pro dev: "Esse PR está gigantesco. Vamos quebrar ele em 3 PRs menores? Um para a API, um para o Design e um para os Testes." Se precisar aprovar, baixe a branch na sua máquina e rode os testes.

### Erro 2: Discutir gosto pessoal
**O Sintoma:** Você e outro desenvolvedor passam 3 horas discutindo nos comentários do GitHub se a função deveria se chamar `getUser` ou `fetchUser`.
**A Solução:** Discussões no PR escalam para brigas porque não têm tom de voz. Code Review não é lugar de impor gosto pessoal de como VOCÊ faria se fosse você digitando. O código do outro resolve o problema de forma clara e legível, mesmo que não seja exatamente com a mesma sintaxe que você usaria? Se sim, aprove. Se há debate de regras da equipe, chame o time para uma reunião rápida, documentem a regra oficial no `README.md` da empresa, e encerrem o debate de vez.

---

## 🚀 Desafio Prático

**Contexto:** Você é Tech Lead. O seu melhor desenvolvedor Pleno acaba de enviar um Pull Request urgente para consertar um bug de login em produção. Ao analisar, você percebe que ele deixou um `console.log(senhaUsuario)` jogado na linha 25.
**Tarefa:**
Qual das opções abaixo é a atitude de um Tech Lead?
A) Deletar você mesmo a linha, fazer um commit forçado na branch dele, aprovar o seu próprio PR e jogar para produção.
B) Dar um Block no PR escrevendo: "Você está louco? Quer vazar a senha dos usuários no console do navegador? Corrige agora!".
C) Reprovar o PR explicando o vazamento de segurança crítico no comentário e aproveitando a oportunidade para sugerir que o time crie/configure uma regra de ESLint (`no-console` em ambiente de prod) para que o CI/CD (Pipeline) barre isso automaticamente da próxima vez.
