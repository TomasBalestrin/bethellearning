---
title: "Padrões Arquiteturais Avançados"
keywords: ["system design", "arquitetura", "event sourcing", "cqrs", "bff", "senior"]
module: "System Design & Arquitetura de Sistemas"
lesson: "03 - Padrões Arquiteturais Avançados"
---

# Aula 03 - Padrões Arquiteturais Avançados (Armas de Sênior)

## 🎯 O Conceito (Pareto 80/20)

Você domina o Monolito e entende a dor dos Microserviços. Agora vamos olhar para 3 Padrões de Design (Design Patterns) Arquiteturais modernos que resolvem problemas muito específicos que as grandes empresas (Uber, Netflix, Nubank) enfrentam no dia a dia.

**O Pareto dos Padrões Arquiteturais:**
1. **CQRS (Command Query Responsibility Segregation):** Separar a rota de LEITURA da rota de ESCRITA. O banco de dados que salva dados não é o mesmo que mostra dados.
2. **Event Sourcing (A Máquina do Tempo):** Em vez de salvar o "estado atual" do banco de dados (ex: Saldo = R$ 50), você salva TODOS os eventos matemáticos que ocorreram desde a criação da conta.
3. **BFF (Backend for Frontend):** A API do celular precisa de telas e dados diferentes da API do site Web. Criamos uma "API Meio-de-Campo" focada só em montar a tela perfeita para aquele dispositivo.

---

## 💻 Deep Dive (Passo a Passo)

### Padrão 1: CQRS (Separando Leitura e Escrita)
**O Problema:** Num E-commerce, 99% das pessoas estão navegando (fazendo `SELECT` / Leitura) e 1% está comprando (fazendo `INSERT` / Escrita). Se você usa o mesmo Banco de Dados para os dois, quando chega a Black Friday, as leituras pesadas derrubam o banco, e as vendas falham.
**A Solução CQRS:**
- Você tem um Banco Relacional Primário (PostgreSQL) focado apenas em Escrita (Commands). Ele é rápido e seguro.
- Toda vez que ele salva algo, ele envia a versão "mastigada" do dado para um Banco de Leitura Secundário (Elasticsearch ou MongoDB).
- O Frontend do site quando pesquisa produtos, consulta APENAS o banco de leitura (Queries), que aguenta milhões de acessos. Se o Elasticsearch cair, as pessoas não veem a vitrine, mas o Banco de Escrita continua vivo para processar pagamentos já iniciados.

### Padrão 2: Event Sourcing (O Banco de Eventos)
Usado maciçamente por Bancos e Sistemas Contábeis.
**O Problema:** O seu SQL tradicional diz `Saldo: R$ 50`. Mas COMO chegamos nesse saldo? O banco tradicional apaga/sobrescreve (`UPDATE`) os rastros antigos.
**A Solução Event Sourcing:**
Você NÃO usa a palavra `UPDATE` nem `DELETE`. O seu banco de dados é um livro razão infinito (Append-Only Log).
Você salva os eventos:
1. `ContaCriada` (Saldo 0)
2. `DepositoRealizado (+100)`
3. `SaqueRealizado (-50)`

Para saber o saldo atual (a "Projeção"), o sistema pega todos os eventos desde a linha 1 e soma os valores.
**A Vantagem Oculta:** Se o sistema bugar e alguém hackear o saldo para R$ 1 milhão, você apaga a projeção, lê o log de eventos originais de trás pra frente e reconstrói o banco de dados inteiro matematicamente de forma imutável. Você cria uma verdadeira máquina do tempo.

### Padrão 3: BFF (Backend for Frontend)
**O Problema:** A Netflix tem a API Geral de Filmes. O aplicativo da TV precisa de imagens pesadas e descrições longas. O aplicativo de Celular de 3 polegadas precisa só do título e uma fotinha, e internet de celular é lenta. Se ambos usarem a mesma "API Geral", o celular vai baixar 5 megabytes atoa.
**A Solução BFF:**
A equipe que faz o App de Celular cria seu PRÓPRIO Backend (API em Node). Esse Backend de Celular faz as requisições complexas para os diversos microserviços internos da Netflix, espreme/junta todas as informações num pacotinho super leve de JSON, e manda pro App de celular. O BFF atua como um tradutor perfeito.

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: O Atraso do CQRS (Eventual Consistency)
**O Sintoma:** O usuário atualiza a foto de perfil. O App faz um refresh na página para mostrar a foto nova, mas a foto VELHA continua aparecendo. O usuário clica em F5 furiosamente. Segundos depois a foto muda sozinha.
**A Causa:** É o "Atraso de Replicação" (Replication Lag). O usuário salvou a foto no Banco Primário (Write), mas a engrenagem que copia a foto para o Banco de Leitura (Read) atrasou 2 segundos. O app leu o banco vazio e mostrou a foto antiga.
**A Solução (UX Engineering):** Aceite que a consistência eventual existe. A engenharia de Front-end salva o dia. Quando o usuário mandar a foto, o Front-end faz um "Optimistic UI Update": ele injeta a foto nova localmente na tela fingindo que já deu certo, mascarando o delay do backend pros olhos do cliente.

### Erro 2: O Banco Event Sourcing ficou lento
**O Sintoma:** O usuário tem a conta bancária há 10 anos, contendo 50.000 transações. Todo dia que ele abre o App do celular, o sistema pega os 50.000 eventos, soma e subtrai do zero para mostrar o saldo atual na tela de login. O cálculo começa a demorar 5 segundos.
**A Solução:** *Snapshots (Fotografias).* O Event Sourcing exige Snapshots. De tempos em tempos (ex: a cada 100 eventos ou a cada 30 dias), o sistema salva um "Estado Atual" oficial. Assim, quando o usuário logar, o sistema lê o Snapshot do mês passado (Saldo R$ 5.000) e processa apenas os últimos 5 eventos recentes, resultando em leitura instantânea.

---

## 🚀 Desafio Prático

**Contexto:** Você é arquiteto em uma corretora de Criptomoedas (onde os valores mudam a cada segundo).
**Tarefa:**
Qual dos 3 padrões arquiteturais estudados nesta aula você usaria no Banco de Dados principal responsável pelas carteiras digitais, para garantir que você NUNCA perca o histórico detalhado de todas as compras e vendas de moedas feitas pelo usuário, e por que a opção de usar `UPDATE` tradicional num banco MySQL seria considerada um risco de fraude enorme neste cenário?
