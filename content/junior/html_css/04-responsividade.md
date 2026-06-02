---
title: "Responsividade e Mobile-First"
keywords: ["css", "responsividade", "mobile-first", "media queries", "junior"]
module: "HTML + CSS Avançado"
lesson: "04 - Responsividade e Mobile-First"
---

# Aula 04 - Responsividade e Mobile-First

## 🎯 O Conceito (Pareto 80/20)

Na Aula 03 aprendemos que o Flexbox e o Grid permitem que as coisas fiquem lado a lado. Mas as coisas NÃO podem ficar lado a lado numa tela de iPhone 13; elas ficariam microscópicas. Elas precisam "quebrar" para baixo, empilhando verticalmente.

Isso é **Responsividade**: O site "responder" e se adaptar ao tamanho da tela.

A regra 80/20 da indústria atual é a metodologia **Mobile-First (Celular Primeiro)**.
- Antigamente, os desenvolvedores faziam o site lindo para Desktop. Depois, usavam código para tentar espremer o site num celular, e tudo quebrava.
- Hoje, **você escreve o CSS padrão pensando numa tela de celular** (onde tudo é uma coluna embaixo da outra, super simples). DEPOIS, você cria uma regra especial dizendo: "Se a tela for MAIOR que um tablet, mude o design para colocar lado a lado".

A ferramenta mágica do CSS para aplicar essas regras de tamanho é a **`@media query`**.

---

## 💻 Deep Dive (Passo a Passo)

Vamos construir o esqueleto de um site moderno Mobile-First.

### Passo 1: A Tag Viewport no HTML (Obrigatório)
Se você não colocar essa meta tag no seu `<head>` do HTML, os celulares vão achar que o seu site foi feito para computador, e vão aplicar um zoom horrendo para fora, deixando a letra minúscula.

```html
<!-- Se não tiver essa linha no HTML, o CSS responsivo não vai funcionar no celular! -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Passo 2: O CSS Base (Mobile)
Esqueça que existem computadores. Desenhe como se você visse apenas num celular.

```css
/* Código padrão é o celular. */
/* Colocamos os produtos empilhados um embaixo do outro no Flexbox (column). */
.container-produtos {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.produto {
  background-color: white;
  margin-bottom: 20px;
}
```

### Passo 3: A Media Query (Expandindo para Desktop)
Agora dizemos ao CSS: "Se a tela do usuário for de 768px de largura PARA CIMA (tamanho de um Tablet ou PC), cancele as regras de celular e aplique estas novas regras aqui".

```css
/* A mágica acontece dentro deste bloco */
@media (min-width: 768px) {
  
  .container-produtos {
    /* No PC, em vez de coluna vertical, colocamos lado a lado com espaço no meio */
    flex-direction: row;
    justify-content: space-between;
    padding: 50px; /* Mais espaço pra respirar no PC */
  }

}
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Usar `max-width` em vez de `min-width` (Quebrando a regra do Mobile-First)
**O Sintoma:** O seu CSS principal tem um design complexo de PC. As suas Media Queries usam `@media (max-width: 768px)` para consertar no celular. Seu site demora para carregar na rede 3G do celular porque o aparelho baixou um monte de imagens pesadas de desktop primeiro.
**A Causa:** Isso é a estratégia *Desktop-First*. Ela é pesada, difícil de debugar (você passa horas sobrescrevendo estilos) e antiquada.
**A Solução:** Vire a chave na sua cabeça. Faça o básico para telas pequenas fora das `media queries`. Use `@media (min-width: ...)` APENAS para adicionar complexidade quando a tela do usuário crescer.

### Erro 2: Unidades Absolutas (O horror do Pixels)
**O Sintoma:** Você escreveu `.menu { width: 400px; }`. Quando abre num celular de tela pequena (ex: iPhone SE com 320px de tela), o seu menu estoura para a direita, gerando uma rolagem horizontal no celular (o pior bug visual para a experiência do usuário).
**A Solução Sênior:** 
1. Use **Porcentagens (`%`)**: `width: 100%` se adapta ao pai.
2. Use **vw (Viewport Width)**: `width: 100vw` pega 100% da tela visível do dispositivo.
3. Se precisar limitar um tamanho máximo, combine porcentagem com limite máximo: `width: 100%; max-width: 400px;`. Assim, se a tela for minúscula, ele acompanha a tela; se for enorme, ele para em 400px!

---

## 🚀 Desafio Prático

**Contexto:** Você tem um layout de Grid de fotos no Instagram.
**Tarefa:**
Escreva mentalmente (ou num editor) as regras CSS (Mobile First) que façam o seguinte:
1. No celular (CSS padrão), a `.galeria-fotos` deve exibir apenas 1 foto por fileira. *(Dica: Use `display: grid` e defina 1 coluna de `1fr`)*.
2. Crie uma `@media query` para telas MAIORES ou iguais a `1024px`.
3. Dentro dessa media query, altere o CSS da `.galeria-fotos` para exibir 3 fotos por fileira (`1fr 1fr 1fr`).
