---
title: "Acessibilidade na Web"
keywords: ["html", "acessibilidade", "a11y", "wcag", "junior"]
module: "HTML + CSS Avançado"
lesson: "05 - Acessibilidade na Web"
---

# Aula 05 - Acessibilidade na Web (A11y)

## 🎯 O Conceito (Pareto 80/20)

Você fez um site lindo. Você envia o link para o cliente e ele responde: "Meu avô é daltônico e não consegue ler onde clicar" ou "Eu estava no ônibus, a internet tava fraca, a foto não carregou, e ficou só um quadrado branco vazio, o que era a foto?".

Acessibilidade (ou A11y, abreviação de "Accessibility") não é apenas fazer o site "praça pública" acessível para cadeirantes; é fazer a sua interface digital utilizável por pessoas cegas (com leitores de tela), daltônicas, pessoas com tremores nas mãos (que não conseguem usar mouse, apenas o teclado), ou pessoas simplesmente usando celular contra a luz do sol.

**O Pareto da Acessibilidade no HTML (O Mínimo Viável para a Lei):**
1. **Atributo `alt` em imagens:** O leitor de tela do cego lê o texto que você colocou no `alt` para explicar a foto.
2. **Navegação por Teclado:** O usuário TEM QUE conseguir navegar no seu site INTEIRO usando apenas a tecla `TAB` (avançar) e `ENTER` (clicar). O HTML Semântico (`<button>`, `<a>`, `<input>`) te dá isso de graça.
3. **Contraste de Cor:** Se a cor da letra for quase igual à do fundo, idosos e daltônicos não lerão.

---

## 💻 Deep Dive (Passo a Passo)

Vamos arrumar o código do Dev Júnior que desenhou a página usando apenas o mouse e a visão.

### Passo 1: A Imagem Acessível
Nunca deixe o atributo `alt` vazio. O cego não vê a imagem. Se não tiver `alt`, o leitor de tela tentará ler o nome do arquivo (`logo_final_v3_png.png`), o que é inútil.

```html
<!-- ❌ RUIM -->
<img src="grafico_lucro.jpg" />

<!-- ✅ BOM: Descreva exatamente o que a imagem significa -->
<img src="grafico_lucro.jpg" alt="Gráfico de barras mostrando um crescimento de 50% nos lucros em Março" />

<!-- ✅ BOM (Imagens decorativas): 
Se a imagem for só um efeitinho estético que não importa pro sentido do texto, coloque alt vazio. O leitor de tela PULA a imagem, e poupa o tempo do cego. -->
<img src="linha_decorativa.png" alt="" />
```

### Passo 2: O Foco do Teclado e o Outline
O desenvolvedor júnior costuma odiar aquela "bordinha azul ou preta" que aparece em volta do botão quando você clica nele ou passa o TAB (`outline`). E para deixar o design "bonitinho", ele adiciona no CSS: `outline: none;`.

**Isso destrói o uso de teclado.** Quem usa só o teclado precisa dessa borda azul pra saber onde ele está com o "cursor invisível" na página!

```css
/* ❌ CRIME DE ACESSIBILIDADE */
button:focus, a:focus {
  outline: none; 
}

/* ✅ SOLUÇÃO SÊNIOR: Se você acha a borda padrão feia, desenhe uma borda mais bonita para o Focus, mas NUNCA esconda o foco! */
button:focus {
  outline: none; /* Tira o padrão feio do navegador */
  box-shadow: 0 0 0 3px #00C853; /* Coloca um brilho verde estiloso e acessível em volta do botão */
}
```

### Passo 3: ARIA Attributes (Sinalização para o Leitor de Tela)
Se você criar um ícone de "X" num modal e ele não tiver nenhum texto por escrito, apenas uma div com um desenho CSS. O cego vai selecionar aquele X com o teclado, e o programa ficará em silêncio (não há texto pra ler).

Para componentes dinâmicos (Javascript), usamos o ARIA (Accessible Rich Internet Applications).

```html
<!-- O cego foca nesse botão e a voz do computador fala "Fechar janela" -->
<button aria-label="Fechar janela" onclick="fecharModal()">
  X
</button>

<!-- O cego precisa saber se a sanfona de texto está aberta ou fechada -->
<!-- O seu JavaScript muda o aria-expanded para 'true' quando o cara clica -->
<button aria-expanded="false" aria-controls="menu-id">
  Mostrar Opções
</button>
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Confiar no próprio olho para Contraste de Cores
**O Sintoma:** Você coloca um texto cinza claro em cima de um fundo cinza escuro. Você achou elegante ("Minimalista"), mas você recebe relatórios de que 30% dos usuários não encontram o botão.
**A Solução:** Há uma métrica matemática criada pelo Consórcio da Web (W3C) chamada *Contrast Ratio*. O contraste ideal para leitura deve ser de pelo menos **4.5:1**.
Em vez de chutar, use sites grátis como *Coolors Contrast Checker* ou baixe extensões pro Chrome onde você bota suas duas cores e ele apita "Aprovado" ou "Reprovado" para a lei de acessibilidade.

### Erro 2: Interatividade em Divs (`<div>` não é `<button>`)
**O Sintoma:** Você coloca um evento `onClick` do React num `<span>` ou numa `<div>` para fazê-los agir como um botão. Usuários de mouse clicam e funciona. Usuários de teclado chegam na página e não conseguem dar o "ENTER" nele, a página fica travada para eles.
**A Solução:** Repita o mantra: **Elementos interativos PRECISAM ser tags que nasceram pra isso (`<button>`, `<a>`, `<input>`)**. Eles herdam por padrão a magia de aceitar o teclado (`TAB` para mirar, `SPACE/ENTER` para atirar). Uma `<div>` é só um contêiner mudo e morto.

---

## 🚀 Desafio Prático

**Contexto:** Você está auditando o código de um estagiário na empresa.
**Tarefa:**
Encontre os **2 erros crassos** de acessibilidade neste código (um de HTML e um de CSS, baseados na aula) e escreva como você consertaria:

```html
<!-- HTML do estagiário -->
<img src="foto_perfil_usuario.png" />
<button class="btn-fechar" onclick="sairDoApp()">Sair</button>
```

```css
/* CSS do estagiário */
.btn-fechar {
  background-color: white;
  color: lightgray; /* O botão é branco com a letra cinza beeeem claro */
}

.btn-fechar:focus {
  outline: none;
}
```
