---
title: "Cloud e Containers (Docker)"
keywords: ["estrategia", "docker", "cloud", "containers", "kubernetes", "senior"]
module: "Estratégia Técnica"
lesson: "03 - Cloud e Containers (Docker)"
---

# Aula 03 - Cloud e Containers (O Navio de Carga)

## 🎯 O Conceito (Pareto 80/20)

Você não pode mandar o seu notebook pra nuvem. No seu computador local, você instalou o Node versão 18, o PostgreSQL versão 14, colocou uma variável de ambiente chamada `SENHA=123`, e tem um sistema operacional Windows.
A AWS usa computadores Linux vazios. O seu código vai chegar lá, não vai achar o Node 18, e vai quebrar. É o clássico "Na minha máquina funciona".

A solução da humanidade para a logística mundial foi o **Contêiner de Navio**. O guindaste do porto não precisa saber se dentro da caixa de metal tem carros, laranjas ou TVs. Ele pega a caixa padrão e bota no navio.

O **Docker** faz exatamente isso com software. Ele embala o seu código, a versão EXATA do Node, o banco de dados e as senhas dentro de uma "caixa virtual impenetrável" (Container). Você manda essa caixa inteira pra nuvem. A AWS (Navio) roda a caixa sem nem saber o que tem dentro. **Se rodou no seu Docker local, VAI rodar na nuvem 100% igual.**

---

## 💻 Deep Dive (Passo a Passo)

Vamos entender como fabricar essa caixa e entregá-la.

### Passo 1: A Receita do Bolo (O `Dockerfile`)
Para o Docker criar a caixa com o seu site dentro, você tem que escrever um manual de instruções (uma receita) chamado `Dockerfile` na raiz do seu projeto.

```dockerfile
# Dockerfile
# 1. Pegue um computador limpo e instale o Linux com Node versão 18
FROM node:18-alpine

# 2. Entre na pasta "app" dentro desse computador novo
WORKDIR /app

# 3. Copie o arquivo de pacotes do MEU notebook para dentro dessa caixa
COPY package.json ./

# 4. Rode a instalação de pacotes lá dentro
RUN npm install

# 5. Agora copie o resto do meu código (os arquivos JS, HTML) pra dentro da caixa
COPY . .

# 6. Avise a caixa que o nosso servidor web vai abrir na porta 3000
EXPOSE 3000

# 7. O grande comando final: O que a caixa deve rodar quando for ligada?
CMD ["npm", "start"]
```

### Passo 2: Construindo e Rodando
Com a receita pronta no seu projeto, você dá a ordem pro programa Docker (que você precisa ter instalado no PC).

```bash
# LÊ a receita (Dockerfile) e CONSTRÓI a caixa (Imagem). 
# Dá o nome (-t) de 'meu-site-maravilhoso'. (Atenção ao ponto no final, significa "aqui nesta pasta").
docker build -t meu-site-maravilhoso .

# LIGA a caixa! (Vira um Container rodando). 
# E conecta a porta 3000 do meu computador físico com a porta 3000 da caixa virtual.
docker run -p 3000:3000 meu-site-maravilhoso
```

### Passo 3: O Navio Gigante (Kubernetes e Cloud)
Agora que a caixa (`Imagem`) está pronta, a AWS não se importa se é Node, Python ou Java.
Você faz o upload (Push) dessa Imagem para um armazém da nuvem (Docker Hub ou ECR da AWS).

**O Kubernetes (K8s):**
Se o seu site crescer e virar o iFood, você não precisa de 1 caixa rodando. Você precisa de 50 caixas idênticas. Se uma quebrar, outra tem que nascer no lugar em milissegundos.
O Docker cria a caixa. O **Kubernetes** é o "Comandante do Navio". Ele é um programa monstruoso do Google que gerencia milhares de containers ao mesmo tempo. Você diz pro K8s: *"Quero que você mantenha 5 caixas vivas e divida as visitas entre elas"*, e ele cuida do resto pra sempre.

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Esquecer o `.dockerignore`
**O Sintoma:** Você roda `docker build` no seu PC e demora 15 minutos para gerar a Imagem. O arquivo final ficou com absurdos 3 Gigabytes de peso. A AWS cobra caro pra hospedar isso.
**A Causa:** Lembra do comando `COPY . .` no Dockerfile? Ele copia a pasta do seu projeto INTEIRA para dentro da caixa. Isso inclui a gigantesca pasta `node_modules` que você já tinha no seu Windows, que não serve pra nada no Linux da caixa (afinal, a caixa dá o seu próprio `npm install`).
**A Solução:** Crie um arquivo `.dockerignore` (igual ao gitignore) e coloque `node_modules/` e `.env` lá dentro. A caixa ficará leve e segura.

### Erro 2: O Container perdeu a memória (Falta de Volumes)
**O Sintoma:** Você rodou o Banco de Dados do PostgreSQL dentro do Docker. Adicionou 5 clientes novos. Desligou o computador para dormir. No dia seguinte, ligou o Docker de novo e os clientes sumiram!
**A Aterrorizante Verdade Sênior:** **Containers são Efêmeros (Descartáveis).** Tudo o que for salvo no "HD Virtual" de um container morre para sempre e é desintegrado quando o container desliga.
**A Solução:** Você precisa usar **Volumes**. O Volume é um comando (`-v`) que manda o Docker furar a parede virtual e salvar os dados no HD *real* e físico da sua máquina. Quando o container reiniciar, ele puxa os dados reais de volta.
(Mas na vida real de nuvem, regra de ouro: Nunca tente hospedar Banco de Dados dentro do Kubernetes. Alugue o Banco de Dados gerenciado da AWS (RDS) e deixe os Containers apenas para os arquivos de código/API).

---

## 🚀 Desafio Prático

**Contexto:** Você está numa entrevista de Engenharia de Plataforma.
**Tarefa:**
O entrevistador diz: "Nosso arquiteto sugeriu colocarmos o nosso site NodeJS e o nosso banco de dados MongoDB dentro do **mesmo arquivo Dockerfile** e rodar tudo junto na mesma caixa. O que você, como Sênior, acha dessa decisão?"
Escreva sua resposta embasada, indicando se é uma boa ideia, o que aconteceria se o site tivesse 10.000 acessos simultâneos e precisasse "clonar" o NodeJS (escalar), e como deveria ser a arquitetura moderna correta com containers.
