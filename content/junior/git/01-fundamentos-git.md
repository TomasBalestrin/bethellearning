---
title: "Fundamentos de Git (init, add, commit, push, pull)"
keywords: ["git", "github", "versionamento", "commit", "junior"]
module: "Git + GitHub"
lesson: "01 - Fundamentos de Git"
---

# Aula 01 - Fundamentos de Git (Salvar o Jogo)

## 🎯 O Conceito (Pareto 80/20)

Trabalhar sem Git é como jogar um videogame sem o "Save Game". Se você morrer (fizer um erro terrível no código), você volta para o início.

O Git é um sistema de "Save Game" super poderoso. Cada vez que você salva, ele cria uma "fotografia" do código. Se algo quebrar amanhã, você pode viajar no tempo e restaurar a fotografia de ontem.

Os 5 comandos que você usará todo santo dia (o 80/20 do Git):
1. `git init` (Inicia o jogo)
2. `git add` (Prepara a foto)
3. `git commit` (Bate a foto)
4. `git push` (Manda a foto pra nuvem do GitHub)
5. `git pull` (Puxa a foto que seu colega tirou lá da nuvem)

---

## 💻 Deep Dive (Passo a Passo)

Abra o terminal na pasta do seu projeto e vamos lá.

### Passo 1: O Início (`git init` e `git status`)
Antes de tudo, o seu projeto não tem Git. Vamos ligá-lo.

```bash
# Liga o rastreamento do Git nesta pasta
git init

# O comando MAIS IMPORTANTE da sua vida. 
# Ele diz "como está a situação atual?". Use ele o tempo todo.
git status
```
*Se você rodar `git status`, ele vai mostrar arquivos em vermelho, dizendo: "Eu vi esses arquivos, mas não estou salvando eles ainda".*

### Passo 2: Preparando a Câmera (`git add`)
O Git não salva tudo automaticamente. Você tem que dizer o que quer salvar. A Área de Preparação chama-se "Staging Area".

```bash
# Adiciona um arquivo específico na foto
git add index.html

# O MACETE: Adiciona TODOS os arquivos de uma vez
git add .
```
*Se você rodar `git status` agora, os arquivos estarão verdes! Prontos para a foto.*

### Passo 3: Batendo a Foto (`git commit`)
A foto precisa ter uma legenda dizendo o que mudou. Essa legenda chama-se *Commit Message*.

```bash
# O -m significa "message" (mensagem)
git commit -m "Cria a estrutura inicial do HTML da loja"
```

### Passo 4: Nuvem (`git push` e `git pull`)
O código está salvo no *seu* computador. Se ele queimar, você perde tudo. O GitHub é o pendrive na nuvem.

```bash
# (Assumindo que você já conectou esta pasta com o repositório do GitHub)

# Manda o código pro GitHub (na branch principal, a main)
git push origin main

# Puxa o código que um colega fez e jogou no GitHub
git pull origin main
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Commitar arquivos inúteis/secretos
**O Sintoma:** Você rodou `git add .` e sem querer enviou a pasta `node_modules` (que pesa 500MB) e um arquivo `.env` contendo a senha do banco de dados para o GitHub aberto a todo mundo.
**A Solução:** NUNCA esqueça de criar um arquivo chamado `.gitignore` logo após o `git init`. Coloque os nomes das pastas que o Git deve ficar cego. Exemplo do conteúdo do `.gitignore`:
```text
node_modules/
.env
.DS_Store
```

### Erro 2: A mensagem de commit vazia (Tela do VIM)
**O Sintoma:** Você digitou apenas `git commit` sem o `-m "mensagem"`. De repente, a tela do seu terminal vira uma tela preta cheia de "~", e nenhuma tecla do teclado parece funcionar para sair disso. Você está preso no editor VIM.
**A Solução (O Desespero de Todo Dev):** Para sair do VIM e não salvar nada:
1. Aperte a tecla `ESC` no seu teclado.
2. Digite: `:q!` 
3. Aperte `ENTER`. Você voltará ao terminal normal.

---

## 🚀 Desafio Prático

**Contexto:** Você está criando o projeto do seu portfólio.
**Tarefa:**
Abra o terminal do seu computador (ou use um ambiente simulado) e faça mentalmente o passo a passo:
1. Você acabou de alterar o arquivo `estilos.css` mudando a cor do fundo para azul.
2. Qual comando você roda para ver que o `estilos.css` foi modificado (em vermelho)?
3. Qual comando você roda para colocar essa alteração no "Staging" (ficar verde)?
4. Qual comando você roda para salvar definitivamente criando a foto "Muda fundo para azul"?
