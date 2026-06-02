---
title: "HTML Semântico e Forms"
keywords: ["html", "html5", "semantica", "forms", "junior"]
module: "HTML + CSS Avançado"
lesson: "01 - HTML Semântico e Forms"
---

# Aula 01 - HTML Semântico e Forms (A Estrutura Correta)

## 🎯 O Conceito (Pareto 80/20)

Fazer um site apenas com `<div>` e `<span>` é muito fácil. O problema é que o Google (SEO) e os Leitores de Tela para deficientes visuais odeiam sites feitos só com divs. Eles não conseguem entender o que é o título, o que é o menu e o que é o rodapé.

**HTML Semântico** é usar a tag correta para a intenção correta.
A regra 80/20 do HTML5 é decorar o layout principal:
- `<header>`: O topo da página (Menu, Logo).
- `<main>`: O conteúdo principal e único daquela página.
- `<article>`: Um bloco de conteúdo independente (um post de blog, um produto na loja).
- `<section>`: Uma seção temática dentro do `main` (ex: "Sobre nós", "Contato").
- `<footer>`: O rodapé.

**Forms (Formulários)** são o coração da internet (login, compra, comentários). Saber validá-los corretamente direto no HTML economiza horas de JavaScript.

---

## 💻 Deep Dive (Passo a Passo)

Vamos refatorar o código ruim de um dev iniciante para um código profissional.

### Passo 1: Limpando a "Sopa de Divs" (Div Soup)
O código abaixo funciona visualmente, mas é terrível para SEO.

```html
<!-- ❌ RUIM: Sopa de Divs -->
<div class="cabecalho">
  <div class="menu">Home | Contato</div>
</div>
<div class="conteudo">
  <div class="post">Meu primeiro Post!</div>
</div>
<div class="rodape">Fim</div>
```

```html
<!-- ✅ BOM: HTML5 Semântico -->
<header>
  <nav>Home | Contato</nav>
</header>
<main>
  <article>
    <h1>Meu primeiro Post!</h1>
  </article>
</main>
<footer>Fim</footer>
```

### Passo 2: O Formulário Profissional
Sempre conecte os `labels` aos `inputs`. Isso não é só capricho, é usabilidade: quando o usuário clica no texto, a caixa de digitar é selecionada magicamente!

```html
<form action="/enviar" method="POST">
  
  <!-- O 'for' do label deve ser igual ao 'id' do input -->
  <div>
    <label for="email_user">Seu melhor E-mail:</label>
    <input type="email" id="email_user" name="email" required>
  </div>
  
  <div>
    <label for="senha_user">Senha:</label>
    <input type="password" id="senha_user" name="senha" minlength="8" required>
  </div>
  
  <!-- O botão SEMPRE dentro do form, com type="submit" -->
  <button type="submit">Fazer Login</button>

</form>
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Múltiplas Tags `<h1>` na Página
**O Sintoma:** O seu site perde posições no Google (cai no ranking de pesquisa).
**A Causa:** Você usou `<h1>` porque "a fonte fica grande e negrito". O Google lê o `<h1>` como "O assunto principal desta página". Se você tem dez `<h1>`, a página perde foco.
**A Solução:** Só pode existir **UM único `<h1>`** por página HTML (ex: o título do Post ou o nome do Produto). Use CSS (`font-size: 32px; font-weight: bold;`) para aumentar letras de outros elementos, ou use `<h2>` e `<h3>` para subtítulos.

### Erro 2: O Botão dentro do Formulário que atualiza a página
**O Sintoma:** Você está usando React ou JS puro e tem um `<form>`. Quando você clica no `<button>` de salvar, a tela inteira pisca e todos os dados digitados somem antes de iren pro banco.
**A Causa:** O comportamento padrão do HTML quando você clica em um botão com `type="submit"` dentro de um form é mandar os dados pra URL e dar Refresh na aba do navegador.
**A Solução:** Você precisa capturar o "evento" do formulário com JavaScript e desligar o comportamento padrão com `e.preventDefault()`.
```javascript
const formulario = document.querySelector('form');
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault(); // Impede a tela de piscar/recarregar
  console.log("Agora posso pegar os dados e fazer o fetch tranquilo!");
});
```

---

## 🚀 Desafio Prático

**Contexto:** Você está refatorando o site de um restaurante para que pessoas com deficiência visual (que usam leitores de tela) consigam pedir comida.
**Tarefa:**
Olhe a linha abaixo:
`<div onclick="enviarPedido()" class="botao-bonito">Comprar</div>`

Embora seja possível clicar na div acima (por causa do onclick no JavaScript), ela é um desastre de acessibilidade, pois o navegador não sabe que isso deveria ser um botão (não dá para selecionar com a tecla TAB do teclado, por exemplo).
Reescreva essa linha usando a Tag Semântica correta para que ela aja de verdade como um botão clicável, mantendo a classe CSS.
