---
title: "CI/CD e Automação de Pipelines"
keywords: ["estrategia", "ci/cd", "pipelines", "github actions", "deploy", "senior"]
module: "Estratégia Técnica"
lesson: "01 - CI/CD e Automação de Pipelines"
---

# Aula 01 - CI/CD e Automação de Pipelines (O Robô Fabril)

## 🎯 O Conceito (Pareto 80/20)

Na época de Júnior, fazer "Deploy" significava abrir um programa de FTP (como o FileZilla), pegar os arquivos `.js` da sua máquina e arrastar para a pasta do servidor. Se a sua internet caísse na metade, o site da empresa saía do ar. 

O Sênior **jamais** toca no servidor de produção. Quem atualiza o site é um Robô. Esse robô é a esteira de CI/CD (Continuous Integration / Continuous Deployment).

**O Pareto do CI/CD:**
1. **CI (Continuous Integration - Integração Contínua):** Toda vez que um dev envia um código para o GitHub (PR aberto), o robô liga um computador temporário na nuvem, baixa o código dele, **roda todos os testes automatizados (Jest)** e checa se há erros de Linting. Se um teste falhar, o robô bloqueia o botão de Merge. Ninguém junta código quebrado na `main`.
2. **CD (Continuous Deployment - Entrega Contínua):** Quando o PR é aprovado e o código cai na branch `main`, o robô empacota (Build) o projeto sozinho e joga na AWS/Vercel automaticamente. O site é atualizado em segundos sem intervenção humana.

---

## 💻 Deep Dive (Passo a Passo)

Vamos construir o cérebro do robô usando **GitHub Actions**, a ferramenta de CI/CD mais famosa do mundo (já embutida no GitHub).

### Passo 1: O Arquivo YAML
Pipelines não são escritos em JavaScript. São escritos em formato `.yml`.
Você deve criar um arquivo EXATAMENTE neste caminho do seu projeto: `.github/workflows/deploy.yml`.

```yaml
# deploy.yml
# 1. Qual é o nome do robô?
name: Pipeline de Producao

# 2. Quando o robô deve acordar? (Gatilho / Trigger)
on:
  push:
    branches:
      - main # Só roda quando alguém enviar código direto na branch principal

# 3. O que o robô deve fazer? (Jobs)
jobs:
  testar-e-deployar:
    # O robô precisa alugar um computador pra trabalhar. Vamos pegar um Linux (Ubuntu).
    runs-on: ubuntu-latest

    # Os passos (Steps) que o robô vai executar na tela preta do terminal
    steps:
      # Passo 1: O robô entra na conta do GitHub e baixa os arquivos do projeto
      - name: Baixando o código
        uses: actions/checkout@v3

      # Passo 2: O robô instala o Node.js no computador alugado
      - name: Instalando o Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      # Passo 3: O robô baixa os pacotes (node_modules)
      - name: Rodando npm install
        run: npm ci

      # Passo 4: O GRANDE TESTE! Se essa linha falhar, o robô explode e o processo para aqui.
      - name: Verificando Testes Unitários
        run: npm run test

      # Passo 5: O Deploy final. (Aqui você rodaria os comandos pra mandar pra AWS)
      - name: Mandar para Produção
        run: echo "Sucesso! Testes passaram. Jogando o site pro ar."
```

### Passo 2: A Segurança (Secrets)
No Passo 5 do código acima, o robô vai precisar do login e senha do seu servidor da AWS para fazer o upload do site. 
Se você escrever `senha: 123456` dentro do arquivo `.yml`, o mundo inteiro vai ver (já que o código fica no repositório).

**O Padrão Sênior:**
Você vai nas configurações (Settings) do seu Repositório no site do GitHub, acha a aba "Secrets", e salva lá: `AWS_PASSWORD = 123456`.
No arquivo `.yml`, você puxa a variável mágica que só o robô consegue ler na hora H:
`run: ./script-de-upload.sh --senha ${{ secrets.AWS_PASSWORD }}`

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: "It works on my machine" (Funciona na minha máquina)
**O Sintoma:** O seu código roda perfeitamente no seu computador. Mas quando você dá `git push`, o Pipeline falha miseravelmente no passo "Rodando npm install" com milhares de erros.
**A Causa Sênior:** Na sua máquina Windows você estava usando a versão do Node `14.x` antiga que você instalou em 2020. No Pipeline (`deploy.yml`), você mandou o robô usar o Node `18.x`. Bibliotecas quebraram por incompatibilidade de versão.
**A Solução:** Garanta paridade de ambiente. Use sempre ferramentas como NVM (Node Version Manager) ou Docker para que o seu computador rode a versão estritamente idêntica à que o robô vai rodar na nuvem.

### Erro 2: O Pipeline Mega Lento
**O Sintoma:** Todo Pull Request que você abre demora 25 minutos para o robô aprovar. A equipe passa o dia tomando café e o desenvolvimento trava.
**A Causa:** O robô do GitHub baixa todos os 5.000 pacotes do `node_modules` do zero toda vez que roda.
**A Solução (Caching):** Ensine o robô a usar Cache. Adicione um "Step" no arquivo `.yml` que salva a pasta `node_modules`. Da próxima vez que o robô rodar, ele não baixa da internet, ele puxa do cache do próprio GitHub, e o tempo de build cai de 25 minutos para 2 minutos.

---

## 🚀 Desafio Prático

**Contexto:** Sua equipe aprovou que agora é OBRIGATÓRIO garantir que nenhum arquivo do código possua falhas de formatação (o ESLint deve rodar) e todos os testes automatizados devem passar.
**Tarefa:**
Qual a grande diferença técnica de comportamento entre eu configurar o gatilho (Trigger) do Pipeline para rodar num `push: branches: - main` VERSUS eu configurar o gatilho para rodar num `pull_request: branches: - main` em termos de segurança para proteger a branch principal? (Dica: Pense no momento cronológico em que o erro vai estourar).
