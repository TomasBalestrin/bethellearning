---
title: "Rebase Avançado e Resolução de Conflitos"
keywords: ["git", "rebase", "conflitos", "avancado", "junior"]
module: "Git + GitHub"
lesson: "04 - Rebase Avançado e Resolução de Conflitos"
---

# Aula 04 - Rebase Avançado e Resolução de Conflitos (O Modo "História Limpa")

## 🎯 O Conceito (Pareto 80/20)

Até agora, você aprendeu o `git merge` para unir branches. O Merge é seguro, mas ele cria um "nó" no histórico de commits (conhecido como "Merge Commit"). Num time de 20 pessoas, o histórico vira uma teia de aranha incompreensível.

A alternativa limpa adotada por grandes empresas é o **`git rebase`**.
"Rebase" (Re-basear) significa pegar a sua branch e **mudar a base dela**. Se a `main` avançou 5 commits enquanto você trabalhava, o `rebase` arranca os seus commits do passado e os "planta" magicamente no topo da `main` atual, como se você tivesse começado a trabalhar hoje! O histórico fica numa linha reta perfeita.

---

## 💻 Deep Dive (Passo a Passo)

### Passo 1: Como fazer o Rebase
A regra número um: **Só faça rebase na sua branch isolada, nunca na branch main.**

```bash
# 1. Você está na sua branch (feature-x) e precisa puxar as novidades da main
git checkout main
git pull origin main

# 2. Volte para a sua branch
git checkout feature-x

# 3. Mágica: "Coloque todos os meus commits da feature-x EM CIMA da main mais recente"
git rebase main
```

### Passo 2: E se der Conflito?
No `merge`, você resolve todos os conflitos de uma vez num mega-commit. No `rebase`, como ele está aplicando os seus commits um por um em cima da `main`, ele para a cada commit que der erro.

```bash
# O terminal diz "CONFLICT... Resolve all conflicts manually".
# 1. Abra o VS Code e resolva a linha que está com conflito.
# 2. Quando terminar, avise o Git que o conflito do arquivo está resolvido:
git add .

# 3. NÃO DE COMMIT! Avise o rebase para continuar aplicando o resto:
git rebase --continue
```
*Dica de sobrevivência: Se você se assustar com os conflitos do Rebase e quiser cancelar tudo, digite `git rebase --abort`. Ele cancela e volta sua branch ao estado original.*

### Passo 3: O Push Force (`--force`)
Se você já tinha enviado sua `feature-x` para o GitHub antes de fazer o rebase, seu histórico local ficou totalmente diferente do histórico na nuvem. Se você tentar um `git push`, o GitHub vai bloquear. Você precisa forçar a reescrita do histórico no servidor.

```bash
# O '--force-with-lease' é uma versão mais segura do '--force'. 
# Ele joga seu novo histórico para o servidor, sobrescrevendo a branch antiga.
git push --force-with-lease origin feature-x
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Perdi meus commits com um Force Push errado!
**O Sintoma:** Você estava na branch errada ou sobrescreveu o trabalho de um colega e quer voltar no tempo, mas o `git log` nem mostra mais os commits antigos.
**A Solução Sênior:** Use o `git reflog`. É o diário ultra-secreto do Git. Ele registra TODOS os comandos e movimentos que você fez, até mesmo commits apagados ou "rebaseados" fora da existência. Você pode pegar a hash (o código de letras e números) do commit perdido e fazer um `git checkout <hash>` para salvá-lo!

### Erro 2: Squash (Limpeza de Histórico)
**O Sintoma:** Você fez 10 commits com mensagens idiotas como "arruma bug", "agora vai", "wip", "teste final" na sua branch. Se você abrir um Pull Request, o tech lead vai brigar com o seu histórico sujo.
**A Solução:** Rebase Interativo!
```bash
# Permite editar, fundir ou apagar os últimos 5 commits
git rebase -i HEAD~5
```
Isso abrirá o VIM. Mude a palavra `pick` para `squash` nos commits de baixo, e o Git vai fundir todos eles num commit único e limpo!

---

## 🚀 Desafio Prático

**Contexto:** Seu colega acabou de dar merge na `main` de um arquivo que você também estava alterando na sua branch. 
**Tarefa:** 
Você tentou fazer um `git rebase main` para trazer as mudanças, mas o Git travou no meio reclamando de conflito num arquivo HTML. 
Quais os três passos que você deve dar para sair dessa situação com sucesso e terminar o rebase?
