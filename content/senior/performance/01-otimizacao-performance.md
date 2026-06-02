---
title: "Otimização de Performance"
keywords: ["performance", "otimizacao", "profiling", "senior"]
module: "Performance, Escalabilidade e Observabilidade"
lesson: "01 - Otimização de Performance"
---

# Aula 01 - Otimização de Performance (Indo Além do Código)

Otimizar performance não é "fazer tudo rodar o mais rápido possível sempre". É **identificar os gargalos (bottlenecks) que realmente importam** e otimizá-los. Otimização prematura é a raiz de todo o mal (Donald Knuth).

## 1. Profiling (A Regra de Ouro)
Nunca otimize código "achando" que ele está lento. **Sempre meça primeiro**.
Use ferramentas de *Profiling* (como a aba *Performance* no Chrome DevTools, ou o *Node.js Profiler*). O *Profiler* te dirá: "A função X consumiu 80% do tempo de CPU", e é lá que você foca.

## 2. Níveis de Otimização (O Pareto da Performance)
Do maior impacto ao menor:
1. **Redução de Chamadas de Rede (Network I/O):** É o maior ladrão de performance. Em vez de fazer 10 requisições HTTP para buscar 10 usuários, faça 1 requisição passando uma lista de 10 IDs.
2. **Caching:** Se um cálculo ou busca no banco não muda muito, guarde a resposta (Redis/Memcached). (Ver aula de System Design).
3. **Bancos de Dados (Índices e Queries):** Se o banco demora 3 segundos para responder, não adianta otimizar o loop em JavaScript. Adicione um **Índice (Index)** na coluna frequentemente pesquisada (ex: buscar por e-mail sem índice força uma varredura completa na tabela).
4. **Algoritmos (Complexidade Ciclomática):** Reduzir um algoritmo de `O(N^2)` (dois *loops* aninhados) para `O(N)` (usando *HashMaps*/Objetos para busca).

## 3. Otimizações de Frontend Clássicas
- **Code Splitting / Lazy Loading:** Não envie um arquivo `bundle.js` de 5MB no primeiro carregamento. Divida o código e carregue a página de configurações apenas quando o usuário clicar em "Configurações" (`import()` dinâmico).
- **Tree Shaking:** Remova o código não utilizado (Módulos ES6 ajudam nisso com *bundlers* como Webpack ou Vite).
- **Compressão e Minificação:** Sempre envie arquivos via GZIP ou Brotli, e garanta que estão minificados.
- **Imagens Otimizadas:** Use formatos modernos (WebP/AVIF) e tags `<picture>` para servir tamanhos adequados para cada tela.

## Exercício Prático
1. Um usuário reclama que uma tela que exibe "Os 10 produtos mais vendidos de todos os tempos" demora 5 segundos para carregar. A consulta no banco de dados é pesada. Sendo que esses dados mudam muito lentamente, como você otimizaria essa entrega?
2. Abra a aba "Network" do Chrome DevTools no site da sua empresa (ou num site famoso). Ordene os recursos pelo "Tempo" de carregamento e pelo "Tamanho" (`Size`). Qual é o maior gargalo?

## Referências
- [Web Vitals (Google)](https://web.dev/vitals/)
- [High Performance Browser Networking - Ilya Grigorik](https://hpbn.co/)
