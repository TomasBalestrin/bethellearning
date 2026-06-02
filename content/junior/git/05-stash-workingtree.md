---
title: "Trabalhando com Stash e Working Tree"
keywords: ["git", "stash", "working tree", "arquivos temporarios", "junior"]
module: "Git + GitHub"
lesson: "05 - Trabalhando com Stash e Working Tree"
---

# Aula 05 - Trabalhando com Stash e Working Tree (Escondendo a Sujeira)

## 🎯 O Conceito (Pareto 80/20)

Você está no meio de uma tarefa complexa na sua branch. O código está todo quebrado pela metade. De repente, o chefe liga: "Tem um bug na página principal, corrige agora!". 

Você não pode dar `git commit` num código quebrado. E se você der `git checkout main` para arrumar o bug, o Git vai bloquear a troca de branch porque você tem "arquivos modificados soltos" (A sua Working Tree está suja).

A solução mágica é o **`git stash`**.
O Stash funciona como uma "gaveta de rascunhos". Ele pega as suas alterações não-comitadas, joga na gaveta e limpa a sua área de trabalho para ela ficar idêntica ao último commit. Você faz o que precisa fazer e depois puxa os arquivos da gaveta de volta.

---

## 💻 Deep Dive (Passo a Passo)

### Passo 1: Guardando o Trabalho pela Metade (Stash)
Seus arquivos estão editados e você precisa mudar de branch urgentemente.

```bash
# 1. Veja o que está sujo
git status
# (Mostra index.html modificado)

# 2. Jogue tudo na gaveta com uma mensagem (o "save" opcional é para colocar nome, ajuda muito)
git stash save "Trabalhando no rodapé pela metade"

# 3. Veja o status novamente
git status
# (Sua pasta está limpa! Nothing to commit. working tree clean)
```

### Passo 2: Indo resolver o incêndio e Voltando
Agora que sua mesa está limpa, você pode trocar de contexto sem medo.

```bash
# Vá para a main, crie a branch do bug, conserte, faça merge. Tudo normal.
git checkout main
git checkout -b hotfix-bug-critico
# (... resolve o bug, commita ...)

# Volte para a sua branch de trabalho que você estava antes
git checkout feature-rodape
```

### Passo 3: Recuperando o Trabalho (Stash Pop)
Você voltou pra sua branch, mas o código antigo sumiu. Lembre-se, está na gaveta!

```bash
# Lista todas as gavetas (você pode ter feito vários stashes)
git stash list

# Puxa a primeira gaveta do topo e aplica os arquivos de volta no código
# O "pop" tira da gaveta e deleta a cópia do stash.
git stash pop
```
*(Se desse conflito, o Stash Pop pararia e pediria para você arrumar os arquivos com ">>>>", exatamente como no Merge).*

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: O `git stash` ignorou meu arquivo novo!
**O Sintoma:** Você criou um arquivo totalmente novo (ex: `novo-estilo.css`), nunca rodou `git add` nele. Quando você dá `git stash`, o Git guarda suas alterações nos arquivos antigos, mas joga um erro e não deixa você mudar de branch por causa do arquivo novo não-rastreado (Untracked).
**A Solução:** O `stash` por padrão ignora arquivos que o Git nunca conheceu. Se quiser varrer arquivos não-rastreados pra gaveta também, use a flag `-u`:
```bash
git stash -u
# ou
git stash save -u "incluindo arquivos untracked"
```

### Erro 2: Perdi um arquivo alterado antes de Stash/Commit
**O Sintoma:** Você alterou um arquivo e, sem querer, rodou `git checkout -- arquivo.js` ou `git restore arquivo.js`. O Git substituiu a versão atual pela do último commit, deletando seu trabalho das últimas 3 horas.
**A Verdade Dura:** O Git é invencível **depois** que a informação entra no banco de dados dele (Add/Commit/Stash). Alterações *soltas* na Working Tree (Working Directory) que não foram para o Stash nem Staging não podem ser recuperadas pelo Git se descartadas. A única salvação é se o seu VS Code manteve o arquivo em memória no "Local History" (Histórico da IDE). **Moral da história: Commite ou dê Stash frequentemente.**

---

## 🚀 Desafio Prático

**Contexto:** Você tem 3 alterações soltas na sua máquina e esqueceu o que eram.
**Tarefa:**
Qual comando você digita no terminal para ver **apenas as diferenças exatas de linhas** entre o código "limpo" do último commit e a sua Working Tree suja, antes de fazer um `git stash`? (Dica: o comando é usado para ver as diferenças/diff).
