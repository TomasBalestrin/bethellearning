---
title: "Web Performance e Core Web Vitals"
keywords: ["performance", "web vitals", "lcp", "cls", "lazy loading", "senior"]
module: "Performance e Observabilidade"
lesson: "03 - Web Performance e Core Web Vitals"
---

# Aula 03 - Web Performance (O Peso do Front-end)

## 🎯 O Conceito (Pareto 80/20)

Você comprou os melhores servidores na AWS e otimizou o banco de dados. A sua API responde em maravilhosos 50 milissegundos. Mas o usuário acessa o seu site pelo 3G do celular e a página demora 8 segundos para ficar pronta. A culpa não é do Backend. A culpa é do Payload do Front-end.

Se o seu site envia 5 Megabytes de JavaScript e Imagens gigantes para o celular do usuário, não há milagre de servidor que resolva a lerdeza. A internet física tem limites. E o Google pune sites lentos jogando-os para a página 5 das buscas.

**O Pareto da Web Performance (Os Core Web Vitals):**
Essas são as 3 métricas do Google pelas quais você, dev Sênior, será cobrado pela equipe de Marketing:
1. **LCP (Largest Contentful Paint):** Quanto tempo demora para a *maior coisa* da tela (geralmente uma foto Banner ou um bloco de texto grande) aparecer completamente. O ideal é abaixo de **2.5 segundos**.
2. **FID / INP (Interaction to Next Paint):** Quanto tempo demora entre o usuário tocar num botão da tela e o site reagir? (Mostra se a CPU do celular do usuário não está engasgada rodando o seu JavaScript superpesado). Ideal: **abaixo de 200ms**.
3. **CLS (Cumulative Layout Shift):** O terror do usuário. Sabe quando você vai clicar num botão "Comprar", uma imagem em cima carrega subitamente, empurra o botão pra baixo, e você acaba clicando sem querer num Anúncio? Isso é CLS (Mudança de Layout não planejada). O Google destrói sites com CLS alto.

---

## 💻 Deep Dive (Passo a Passo)

Vamos curar um site doente usando práticas modernas do Front-end (Next.js/React e Vanilla).

### Passo 1: Imagens Pesadas (Curando o LCP)
Um Junior salva uma foto do Banco de Imagens em PNG (3 Megabytes) e joga na tag `<img src="...">` com o tamanho forçado de `width="200"`. A foto fica pequena na tela, mas o celular ainda é obrigado a baixar os 3MB.

**A Cura:**
1. **Formato WebP/AVIF:** Ferramentas convertem seu PNG de 3MB num formato moderno `.webp` que pesa meros 100KB, com a MESMA qualidade visual.
2. **Lazy Loading:** Se você tem 100 fotos na página, não carregue as 100. Carregue só as duas primeiras que aparecem na tela (Above the Fold). As fotos de baixo só devem ser baixadas pelo 3G se o usuário rolar a tela (Scroll) até perto delas!
   *(O HTML5 resolve isso sozinho agora: `<img src="..." loading="lazy" />`).*

### Passo 2: CSS Bloqueante
O navegador é burro e ansioso. Quando ele lê uma tag `<link rel="stylesheet">` no topo do HTML, ele para tudo o que está fazendo, paralisa a tela num "branco" (Render-Blocking) e espera baixar o CSS de 2MB antes de desenhar 1 mísera palavra.

**A Cura (Critical CSS):**
As ferramentas modernas de build (Webpack/Vite/Next.js) separam o seu CSS. Elas injetam direto na tag `<head>` (em texto puro) *apenas* o CSS estritamente necessário para desenhar o topo da tela imediatamente. Todo o restante do CSS (botão do rodapé, painel modal) é baixado nos bastidores depois que o site já surgiu na cara do usuário.

### Passo 3: O Pesadelo do CLS (Pulo do Layout)
Por que a imagem empurra o botão para baixo depois de 3 segundos? Porque o HTML não sabia qual era a altura da imagem até a imagem terminar de fazer o download do servidor.

**A Cura (Aspect Ratio):**
Você precisa reservar o espaço físico "vazio" na tela ANTES da imagem chegar.
```html
<!-- Dando a largura e altura exatas ou a proporção.
O navegador vai desenhar um buraco vazio do tamanho exato da foto. Quando a foto carregar,
ela não vai empurrar absolutamente nada pra baixo. O Layout fica de pedra (CLS zero). -->
<img src="banner.jpg" width="800" height="400" />
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Bundles Gigantescos de JavaScript
**O Sintoma:** O Lighthouse do Google diz que você tem um arquivo `main.js` pesando 4MB. O seu INP é altíssimo porque o celular do usuário "congela" tentando processar e ler as 100.000 linhas desse JS de uma vez.
**A Causa:** Você importou a biblioteca inteira (ex: o pacote maravilhoso `lodash` ou o `moment.js`) e mandou tudo pro cliente, sendo que você só usa uma função microscópica `date()` da biblioteca.
**A Solução Sênior (Tree-Shaking e Code Splitting):**
1. *Code Splitting:* O JS da página "Meu Perfil" não deve ser enviado pro usuário se ele está na página "Home".
2. *Tree Shaking:* Configure os imports com cuidado para que as ferramentas como Vite joguem as funções inúteis do pacote fora antes de enviar para o cliente. Use o comando `npm run build` combinado com pacotes de "Bundle Analyzer" para olhar visualmente que biblioteca pesada está estragando seu arquivo de JS e substitua-a.

### Erro 2: Fonte Personalizada Fanciosa (FOIT / FOUT)
**O Sintoma:** O usuário acessa, o site fica totalmente invisível por 4 segundos, e então aparece todo o texto. (FOIT - Flash of Invisible Text).
**A Solução:** Adicionar `font-display: swap;` no seu arquivo CSS de fontes personalizadas. Isso obriga o navegador a desenhar o site imediatamente na cor e tamanho certos usando uma fonte vagabunda comum (Arial). Quando a fonte bonita e chique finalmente terminar o download, ele troca a letra sutilmente, salvando o SEO.

---

## 🚀 Desafio Prático

**Contexto:** Você é o Sênior encarregado de consertar a performance da HomePage do E-commerce feita em HTML puro, que atualmente tira nota 40/100 no Google PageSpeed Insights.
**Tarefa:**
Olhe a linha do banner principal desenhada pelo estagiário:
`<img src="banner-black-friday.png" class="banner-topo" />`

Aplicando as três regras vitais aprendidas (peso/formato, controle de pulo do layout, e prioridade de carregamento - atenção: esta é a foto PRINCIPAL do topo da tela, você **NÃO** quer aplicar lazy load nela!), reescreva esta linha HTML e explique as mudanças que você fez.
