---
title: "Branches e Merge"
keywords: ["git", "branch", "merge", "junior"]
module: "Git + GitHub"
lesson: "02 - Branches e Merge"
---

# Aula 02 - Branches e Merge (O Poder dos Universos Paralelos)

## 🎯 O Conceito (Pareto 80/20)

Em projetos reais, ninguém faz o código direto no arquivo principal (`main` ou `master`). Se o código principal quebrar, a empresa perde dinheiro na hora.

**A Regra do Ouro do Trabalho em Equipe:** O código principal é sagrado. Quando você vai criar uma nova funcionalidade (ex: uma tela de login), você cria uma **Branch** (Ramificação). 
A Branch é um "universo paralelo". Você clona todo o código principal para a sua *Branch*, trabalha lá sem afetar ninguém, e só quando estiver testado e pronto, você "costura" a sua branch de volta ao código principal. Essa costura se chama **Merge**.

---

## 💻 Deep Dive (Passo a Passo)

Vamos simular o dia a dia criando uma feature nova em segurança.

### Passo 1: Criando o Universo Paralelo (A Branch)
Você acabou de receber a tarefa de mudar a cor do botão na loja.

```bash
# 1. Veja em que mundo (branch) você está agora. O asterisco (*) diz qual é a sua branch atual.
git branch
# Resultado provável: * main

# 2. Crie a nova branch
git branch botao-azul

# 3. Viaje (mude) para a nova branch
git checkout botao-azul

# MACETE SÊNIOR (Faz o passo 2 e 3 de uma vez só!):
# git checkout -b botao-azul
```

### Passo 2: Trabalhando e Salvando na Branch
Agora você edita o código (muda o CSS do botão) e faz o "Save Game" padrão. Isso NÃO afeta a `main`.

```bash
git add .
git commit -m "Muda cor do botao para azul"
```

### Passo 3: O Retorno e a Costura (O Merge)
Seu botão está lindo. A tarefa acabou. Precisamos juntar seu trabalho à `main`.

```bash
# 1. Volte para a branch principal (main)
git checkout main

# 2. Peça ao Git para puxar ("Merge") a branch botao-azul para DENTRO da main
git merge botao-azul

# 3. Como a branch botao-azul cumpriu seu propósito, podemos apagá-la para não acumular lixo
git branch -d botao-azul
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: O Aterrorizante Conflito de Merge (Merge Conflict)
**O Sintoma:** Você roda `git merge minha-feature` e o Git grita um erro gigante de conflito (`Automatic merge failed; fix conflicts and then commit the result.`).
**A Causa:** Você tentou costurar duas linhas do tempo onde a MESMA LINHA do mesmo arquivo foi alterada. Você e seu colega alteraram a Linha 15 do `index.html`. O Git é inteligente, mas não sabe adivinhar qual alteração está certa, então ele congela e pede ajuda humana.
**A Solução:** 
1. Abra o arquivo no VS Code. Ele estará cheio de "símbolos estranhos" (ex: `<<<<<<< HEAD` e `======`).
2. O VS Code vai te dar opções clicáveis em verde/azul: "Aceitar Atual", "Aceitar Recebido" ou "Aceitar Ambos".
3. Clique na opção correta (decidida com a sua equipe).
4. Rode `git add .` e `git commit` para finalizar a costura da paz.

### Erro 2: Fazer o Merge na branch errada
**O Sintoma:** Você queria mandar a `feature` pra `main`, mas deu merge da `main` pra dentro da `feature`.
**A Solução:** Lembre-se desta regra que salva vidas: **"Eu puxo você para mim"**. Você tem que sempre estar DE PÉ (`git checkout`) na branch que VAI RECEBER o código (geralmente a `main`), e então puxar o nome da branch que tem o código (`git merge feature`).

---

## 🚀 Desafio Prático

**Contexto:** Você está trabalhando no arquivo `index.html`.
**Tarefa:**
Escreva (mentalmente) a sequência de comandos Git para:
1. Sair da `main` e ir direto para uma nova branch chamada `nova-nav-bar`.
2. Após alterar o código, adicionar e commitar com a mensagem "Cria nav bar moderna".
3. Voltar para a `main`.
4. Juntar o código da `nova-nav-bar` na `main`.
