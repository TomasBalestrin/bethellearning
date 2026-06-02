---
title: "Estratégias de Branching (Git Flow e GitHub Flow)"
keywords: ["git", "git flow", "github flow", "branching", "junior"]
module: "Git + GitHub"
lesson: "07 - Estratégias de Branching"
---

# Aula 07 - Estratégias de Branching (O Modo Empresa)

## 🎯 O Conceito (Pareto 80/20)

Você sabe os comandos, agora você precisa saber a "Cultura da Empresa". Se cada desenvolvedor criar branches com nomes aleatórios e jogar o código para onde quiser, o projeto vira um caos em uma semana.

As empresas adotam "Estratégias de Branching", que são acordos de cavalheiros sobre como o código flui do seu computador até a Produção (o servidor real onde o cliente usa).

Existem 2 estratégias dominantes no mercado (80/20):
1. **GitHub Flow:** Super simples, rápido e direto. Usado em startups e projetos de implantação contínua (web).
2. **Git Flow:** Complexo, seguro e burocrático. Usado em bancos, grandes corporações e aplicativos de celular.

---

## 💻 Deep Dive (Passo a Passo)

Vamos entender como cada fluxo se organiza.

### O GitHub Flow (A Velocidade)
Você tem apenas **UMA** branch protegida: a `main`. A regra de ouro é: "O código na `main` sempre deve estar funcionando perfeitamente em Produção".

**O Ciclo do GitHub Flow:**
1. A partir da `main`, você cria uma branch descritiva (ex: `feature/nova-home`).
2. Trabalha localmente e dá commits na branch.
3. Abre um Pull Request (PR) contra a `main`.
4. Os colegas revisam e aprovam.
5. Faz o Merge na `main`. O sistema automaticamente pega o código e joga no site real. Fim!

*Nomes comuns no GitHub Flow:* `feature/xxx`, `bugfix/xxx`.

### O Git Flow (A Burocracia Segura)
Criado há muitos anos, o Git Flow divide o projeto em múltiplas branches eternas e temporárias. Aqui a `main` é sagrada, mas você trabalha em uma branch chamada `develop`.

**O Ciclo do Git Flow:**
1. **Branch `develop`:** É o "campo de obras". Você e todos os devs tiram suas branches (`feature/...`) daqui e mandam de volta pra cá. O que está na `develop` NÃO vai para produção (o cliente não vê).
2. **Branch `release`:** Quando a equipe decide que juntou código suficiente na `develop`, eles fecham um "pacote" e criam a branch `release/v2.0`. Apenas correções de bugs de última hora entram aqui. Nenhuma funcionalidade nova.
3. **Branch `main` (ou `master`):** Após testarem a `release` exaustivamente, o código finalmente é mesclado na `main` com uma Tag de versão (`v2.0`). O cliente recebe a atualização!
4. **Branch `hotfix`:** Se o site caiu no meio da madrugada em produção, você tira um `hotfix/` direto da `main`, conserta o desastre, joga de volta na `main` e na `develop`.

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Trabalhar na feature esquecendo a vida real (Branches Obsoletas)
**O Sintoma:** Você trabalha numa branch `feature/gigante` por 3 semanas sem abrir PR e sem dar `pull`. Quando você finalmente tenta dar merge na `main` (ou na `develop`), descobre que a arquitetura do sistema foi toda mudada e você tem 400 conflitos impossíveis de resolver.
**A Solução Sênior:** Nenhuma branch deveria viver mais do que 2 a 3 dias. Tarefas grandes devem ser divididas em "Pull Requests invisíveis" (features desligadas para o usuário, mas já presentes no código). Sempre, religiosamente todo dia, puxe o código da `main` (`git pull origin main`) para dentro da sua branch local para evitar descolamento de realidade.

### Erro 2: O caos dos nomes de branch
**O Sintoma:** Você tem branches como `andre-tela`, `arruma-isso`, `feature-3-final`. Ninguém sabe do que se trata.
**A Solução (Padrão de Indústria):** Siga um padrão combinando "tipo / ID do Jira ou Trello / nome curto".
Exemplos perfeitos:
`feature/TKT-102-botao-login`
`bugfix/TKT-103-corrige-erro-carrinho`
`hotfix/banco-de-dados-fora`

---

## 🚀 Desafio Prático

**Contexto:** Você acabou de entrar como programador Júnior numa agência bancária rigorosa que utiliza o **Git Flow** clássico. 
**Tarefa:**
O gerente liga avisando que o botão de fazer transferência parou de funcionar em produção no celular de todos os clientes. Qual tipo de branch (`feature`, `develop`, `release` ou `hotfix`) você deve criar? De ONDE você cria essa branch (de que branch você fará o `checkout -b`) e para ONDE você a enviará de volta quando o problema estiver resolvido?
