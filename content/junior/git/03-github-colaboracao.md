---
title: "GitHub e Colaboração em Equipe"
keywords: ["git", "github", "pull request", "colaboracao", "junior"]
module: "Git + GitHub"
lesson: "03 - GitHub e Colaboração em Equipe"
---

# Aula 03 - GitHub e Colaboração em Equipe

## 🎯 O Conceito (Pareto 80/20)

Na Aula 02 nós fizemos um `Merge` localmente, no seu próprio computador.
Mas na vida real de uma empresa, **você não tem autorização para dar merge na branch `main` do servidor da empresa**. Se você der merge de um código com bugs, o sistema da empresa cai.

A solução da indústria é o **Pull Request (PR)**.
No GitHub (ou GitLab, Bitbucket), um PR é você dizendo: "Chefe/Colegas, eu criei uma branch e fiz uma tarefa. Por favor, revisem meu código, e se estiver bom, permitam que ele entre na branch principal (façam o Merge por mim)".

---

## 💻 Deep Dive (Passo a Passo)

Vamos simular o ciclo de vida real de um desenvolvedor pegando uma tarefa em uma empresa.

### Passo 1: Atualizando seu computador (A regra de ouro diária)
Antes de começar qualquer trabalho do dia, você precisa baixar o código que os outros programadores fizeram ontem.

```bash
# Vá para a branch principal
git checkout main

# Puxe todo o código atualizado do servidor do GitHub (origin)
git pull origin main
```

### Passo 2: A Branch da Tarefa e o Trabalho
Nunca programe direto na main!

```bash
# Crie sua branch de trabalho a partir da main recém-atualizada
git checkout -b feature/tela-de-perfil

# Trabalhe no código...
# Adicione os arquivos e faça o commit
git add .
git commit -m "Cria a tela de perfil"
```

### Passo 3: Enviando para a Nuvem e abrindo o PR
Sua branch só existe no seu computador. Agora você precisa enviá-la para o GitHub.

```bash
# Como a branch não existe no GitHub ainda, você usa -u (upstream) na primeira vez
git push -u origin feature/tela-de-perfil
```

Neste exato momento, se você abrir o site do GitHub no repositório da sua empresa, um botão verde gigante aparecerá dizendo **"Compare & pull request"**.
Você clica nele, preenche o que você fez, e aguarda um colega Sênior aprovar (Approve) ou pedir mudanças (Request Changes). Se for aprovado, ele clicará no botão verde **"Merge Pull Request"** lá no site!

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Push Rejeitado ("Updates were rejected because the remote contains work...")
**O Sintoma:** Você tenta dar `git push` na `main` e o terminal devolve um erro gigante bloqueando seu push.
**A Causa:** O Git proíbe o Push porque o GitHub "sabe" de arquivos novos que o seu computador ainda não sabe (seu colega mandou coisas pro GitHub enquanto você estava dormindo). Se o Git deixasse você fazer o Push, o seu código apagaria/sobrescreveria o do seu colega.
**A Solução:** Você precisa puxar o código do colega PRIMEIRO, antes de mandar o seu.
```bash
git pull origin main
# (Resolva conflitos, se houver, faça o commit do merge)
git push origin main
```

### Erro 2: O Desespero do `.gitignore` Atrasado
**O Sintoma:** Você se esqueceu de criar o `.gitignore`, comitou a pasta `node_modules` de 500MB e deu push para o GitHub. Você entra no desespero, cria o `.gitignore` e dá push de novo, mas a pasta continua lá no GitHub!
**A Causa:** O `.gitignore` só ignora arquivos NOVOS. Se o arquivo/pasta já entrou no sistema do Git, ele não o "esquece" sozinho.
**A Solução:** Forçar o Git a "esquecer" o cache daquela pasta, e depois fazer um novo commit.
```bash
# Remove a pasta inteira (-r) do controle do Git, mas não a deleta do seu PC (--cached)
git rm -r --cached node_modules/

# Agora adicione as mudanças (o Git entenderá que deletou a pasta)
git add .
git commit -m "Remove node_modules esquecida"
git push origin main
```

---

## 🚀 Desafio Prático

**Contexto:** Você terminou a tarefa da branch `corrige-bug-header`.
**Tarefa:**
Explique, como se falasse com o seu tech lead, o que acontece a partir do momento em que você dá um `git push origin corrige-bug-header`. Qual é a sua responsabilidade e qual é a do tech lead no processo do Pull Request no GitHub?
