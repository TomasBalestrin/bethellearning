---
title: "CSS Grid Essentials"
keywords: ["css", "grid", "layout", "responsivo", "junior"]
module: "HTML + CSS Avançado"
lesson: "03 - CSS Grid Essentials"
---

# Aula 03 - CSS Grid Essentials (O Mapa da Cidade)

## 🎯 O Conceito (Pareto 80/20)

Na Aula 02, aprendemos o Flexbox (Layout de 1 dimensão: controla Linhas OU Colunas).
Para montar um layout inteiro de site (o esqueleto estrutural), onde você precisa pensar em Linhas E Colunas SIMULTANEAMENTE (Layout de 2 dimensões), o **CSS Grid** é a única ferramenta perfeita para o trabalho.

Imagine o CSS Grid como as ruas de uma cidade vista de cima, formando "quarteirões". Você define as avenidas verticais e as horizontais, e o navegador posiciona as `divs` perfeitamente nas quadras vazias.

**O Pareto do Grid:**
- `grid-template-columns`: Define quantas colunas verticais a cidade vai ter e o tamanho delas.
- `grid-template-rows`: Define as linhas horizontais.
- `gap`: O asfalto da rua (o espaço entre os prédios).

---

## 💻 Deep Dive (Passo a Passo)

Vamos montar um painel (Dashboard) no estilo Pinterest ou Galeria de Fotos.

### Passo 1: Desenhando as Ruas da Cidade
No HTML, você tem o Pai e os Filhos.
```html
<div class="grade-pai">
  <div class="foto">Foto 1</div>
  <div class="foto">Foto 2</div>
  <div class="foto">Foto 3</div>
  <div class="foto">Foto 4</div>
</div>
```

No CSS, você liga o `display: grid` no Pai.

```css
.grade-pai {
  display: grid;
  
  /* Crio 3 colunas. A primeira tem 200px. A segunda 200px. A terceira 200px. */
  grid-template-columns: 200px 200px 200px;
  
  /* Crio o espaçamento entre as fotos (20px de espaço vazio) */
  gap: 20px;
}
```

### Passo 2: A Mágica do `fr` (Fração)
Usar `px` no Grid é terrível para celulares (não é responsivo). A revolução do Grid foi inventar a unidade **`fr`** (fração do espaço livre).
Se você colocar `1fr 1fr 1fr`, o navegador divide a tela do dispositivo perfeitamente em 3 pedaços idênticos.

```css
.grade-pai {
  display: grid;
  
  /* O repeat(3, 1fr) é um atalho para escrever 1fr 1fr 1fr */
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

### Passo 3: Colocando um filho para ocupar 2 quarteirões
Às vezes você quer uma foto gigante na galeria. O Grid permite que um filho invada o espaço de outra coluna!

```css
/* Isso vai no CSS da foto específica que você quer aumentar */
.foto-destaque {
  /* Ocupe da linha vertical 1 até a linha vertical 3 */
  /* (O que significa ocupar 2 colunas inteiras de largura!) */
  grid-column: 1 / 3;
}
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Não saber se usa Flexbox ou Grid
**O Sintoma:** Você passa horas tentando fazer o layout da página inteira usando Flexbox com `width: 30%` e `margin`, e tudo se quebra em monitores maiores.
**A Solução de Arquiteto:** 
- Use **CSS Grid** para o Macro-layout (Montar o cabeçalho, a barra lateral e o miolo do site).
- Use **Flexbox** para o Micro-layout (alinhar o ícone com o texto dentro do botão, ou alinhar o avatar do usuário com o nome dele no header).

### Erro 2: O Conteúdo quebrando a largura do `fr`
**O Sintoma:** Você definiu `1fr 1fr`. Deveriam ser duas colunas de tamanhos iguais. Mas a primeira coluna tem uma URL gigante de texto que não tem quebra de linha. De repente, a primeira coluna fica com 80% da tela e esmaga a segunda.
**A Causa:** O `1fr` significa "1 parte do espaço restante", mas a menos que você force, o tamanho mínimo da coluna é o tamanho do conteúdo dentro dela (`min-content`).
**A Solução:** Para garantir que a coluna NUNCA passe da sua proporção exata, não importa o tamanho do conteúdo bizarro lá dentro, você pode usar a função `minmax(0, 1fr)`. Assim o mínimo é zero, obrigando o texto a quebrar de linha ou criar barras de rolagem, respeitando o layout da grade.

---

## 🚀 Desafio Prático

**Contexto:** Você está desenvolvendo a vitrine de produtos da loja.
**Tarefa:**
Você construiu uma vitrine (`<div class="vitrine">`) com o seguinte CSS:
```css
.vitrine {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
```
Isso mostra 4 produtos por fileira.
Mas o designer enviou uma nova tela exigindo que a barra lateral de filtros ("Preços, Cores, Marcas") ocupe **25%** da tela no canto esquerdo, e os produtos ocupem o resto do espaço (**75%**) do lado direito.

Sem usar `repeat()`, como você reescreveria a linha `grid-template-columns` para ter apenas 2 colunas, sendo a da esquerda com o tamanho de 1 fração e a da direita com o tamanho de 3 frações?
