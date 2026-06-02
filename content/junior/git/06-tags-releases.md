---
title: "Tags e Releases (Versionamento Semântico)"
keywords: ["git", "tags", "releases", "semver", "junior"]
module: "Git + GitHub"
lesson: "06 - Tags e Releases"
---

# Aula 06 - Tags e Releases (Versionamento Semântico)

## 🎯 O Conceito (Pareto 80/20)

Como você sabe se o aplicativo do banco que está no seu celular é a versão mais nova? O nome do aplicativo não é "App do Banco Final_agora_vai". Ele é a versão **"v2.4.1"**.

O Git permite que você pegue um commit específico do seu histórico (ex: aquele commit perfeito que você quer mandar para a loja de aplicativos) e coloque uma "Etiqueta" inamovível nele: A **Tag**.
Enquanto branches se movem a cada commit, uma Tag é uma tatuagem no histórico que aponta eternamente para aquela versão do código.

**Semantic Versioning (SemVer - A Regra 80/20 do Mercado)**
As tags seguem um padrão universal com três números: `v[MAJOR].[MINOR].[PATCH]` (Ex: `v2.4.1`).
- **PATCH (1):** Correção de Bug invisível pro usuário (ex: botão alinhado).
- **MINOR (4):** Feature Nova compatível com o passado (ex: aba de mensagens adicionada).
- **MAJOR (2):** Quebra de Compatibilidade (ex: mudou todo o layout e a API antiga parou de funcionar).

---

## 💻 Deep Dive (Passo a Passo)

Vamos finalizar a primeira versão "Pronta" da nossa loja virtual e lançá-la.

### Passo 1: Criando a Tag Localmente
Certifique-se de que está na branch principal (a que tem o código estável) e que o `git status` está limpo.

```bash
git checkout main

# Criando uma Tag anotada (-a) com uma mensagem explicativa (-m)
# Como é a primeira versão funcional, lançamos a v1.0.0
git tag -a v1.0.0 -m "Lançamento inicial da loja com carrinho e checkout"

# Verificando se a tag existe na sua máquina
git tag
```

### Passo 2: Mandando a Tag para a Nuvem
O comando comum `git push origin main` manda commits, **não manda Tags**. Tags ficam retidas no seu PC até você mandá-las explicitamente.

```bash
# Mandar apenas a tag v1.0.0
git push origin v1.0.0

# Ou, se tiver criado várias tags e quiser mandar todas:
git push origin --tags
```

### Passo 3: O Release no GitHub
A Tag é um conceito puro do Git. Mas no GitHub, você pode transformar essa Tag em um **Release**.
O Release é uma tela bonita no GitHub onde você escreve as "Release Notes" (O que mudou nesta versão) e permite que usuários façam download do arquivo `.zip` daquele ponto exato do código.
*(Isso é feito clicando no link "Releases" na barra lateral direita do repositório no GitHub).*

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Errei a Tag e mandei pra Nuvem!
**O Sintoma:** Você tagueou a `v1.0.0`, deu push para o GitHub, e no minuto seguinte lembrou de um bug crítico. Você corrigiu o bug, mas a tag `v1.0.0` está apontando para o commit antigo com o bug!
**A Causa:** Tags são (ou deveriam ser) imutáveis.
**A Solução (A Forma Sênior):** Não mexa no passado. Se a v1 saiu quebrada e você arrumou um bug, o SemVer manda você lançar uma versão "Patch". Faça o commit de correção e crie a tag `v1.0.1`.
**A Solução (O Desespero - Só faça se NINGUÉM baixou o app):** Você pode deletar a tag na sua máquina e no GitHub, e criar de novo.
```bash
# Apaga a tag da sua máquina
git tag -d v1.0.0
# Apaga a tag do servidor do GitHub (cuidado, comando perigoso)
git push origin :refs/tags/v1.0.0
```

### Erro 2: O Descompasso do SemVer
**O Sintoma:** O programador Junior corrige a margem de um botão e altera a versão de `v1.2.0` para `v2.0.0`. O chefe enlouquece.
**A Regra:** MAJOR (primeiro número) é para refatorações totais ou quebra de dependências. MINOR é feature. PATCH é bug fix ou ajuste CSS. Suba os números corretamente.

---

## 🚀 Desafio Prático

**Contexto:** Você desenvolveu uma biblioteca de ícones para a empresa, que atualmente está na versão **`v1.4.2`**.
**Tarefa:**
Qual versão (Tag) você deve criar após concluir cada um dos seguintes cenários independentes:
1. Você resolveu um bug no ícone de "Home" que não estava centralizado.
2. Você apagou 50 ícones velhos do pacote, quebrando o sistema de todo mundo que importava esses ícones.
3. Você adicionou 5 ícones novos ao pacote (sem estragar o que já existia).
