---
title: "Testes Unitários com Jest"
keywords: ["javascript", "jest", "testes", "tdd", "junior"]
module: "JavaScript Moderno (ES6+)"
lesson: "07 - Testes Unitários com Jest"
---

# Aula 07 - Testes Unitários com Jest (Dormindo em Paz)

## 🎯 O Conceito (Pareto 80/20)

Em projetos reais, você fará uma alteração num arquivo. O seu código vai funcionar, mas, sem que você saiba, ele vai quebrar silenciosamente outra página do sistema que usava aquele mesmo arquivo. O cliente descobrirá o erro em produção na sexta-feira à noite.

A única forma de impedir isso são os **Testes Automatizados**.
Você escreve pequenos robôs que testam seu código a cada vez que você clica em Salvar.

O framework mais famoso do mundo para testes em JavaScript (e React) é o **Jest**. O coração do teste é a asserção (o `expect`), que significa: "Eu passo este valor X para minha função, e eu **espero** que ela devolva Y".

---

## 💻 Deep Dive (Passo a Passo)

Vamos construir e testar uma função simples de Desconto de Loja.

### Passo 1: O Arquivo do Código (O Alvo)
Crie o arquivo que vai conter a regra de negócio do seu site, chamado `loja.js`:

```javascript
// loja.js
export function calcularTotalComDesconto(preco, cupom) {
  if (cupom === "VIP20") {
    return preco * 0.8; // 20% de desconto
  }
  
  if (cupom === "VIP50") {
    return preco * 0.5; // 50% de desconto
  }

  // Se for um cupom inventado ou vazio, não dá desconto.
  return preco;
}
```

### Passo 2: O Arquivo de Teste (O Robô)
A convenção é criar um arquivo com o mesmo nome, mas terminando em `.test.js`. O Jest vai varrer sua pasta procurando arquivos com essa terminação.

Crie o arquivo `loja.test.js`:

```javascript
// loja.test.js
import { calcularTotalComDesconto } from './loja';

// A função 'describe' cria um bloco (uma caixa) para agrupar testes da loja
describe("Módulo de Loja e Cupons", () => {

  // A função 'test' é o robô individual
  test("deve dar 20% de desconto com cupom VIP20", () => {
    // 1. Executamos a nossa função real
    const precoResultante = calcularTotalComDesconto(100, "VIP20");
    
    // 2. Fazemos a Asserção (Eu espero que o preço final SEJA IGUAL a 80)
    expect(precoResultante).toBe(80);
  });

  // Outro teste pra testar o outro caminho (If do VIP50)
  test("deve dar 50% de desconto com cupom VIP50", () => {
    const precoResultante = calcularTotalComDesconto(100, "VIP50");
    expect(precoResultante).toBe(50);
  });

  // O mais importante: testar o ERRO! E se passar cupom falso?
  test("não deve aplicar desconto se o cupom for inválido", () => {
    const precoResultante = calcularTotalComDesconto(100, "CUPOM_FALSO");
    expect(precoResultante).toBe(100);
  });

});
```

### Passo 3: Rodando o Teste no Terminal
Quando você abre o seu terminal e digita `npm test` (ou `npx jest`), a tela ficará verde com o aviso: `✓ deve dar 20% de desconto...`

Se amanhã outro programador entrar no seu `loja.js` e mudar o código de 20% para 10% por acidente, quando ele rodar o teste, a tela vai explodir em vermelho. O teste impediu um bug de ir pro ar!

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Testar objetos usando `.toBe()`
**O Sintoma:** Você testou uma função que devolve um Array `[1, 2, 3]` e fez o teste: `expect(resultado).toBe([1, 2, 3])`. O teste falha e diz em vermelho que `[1,2,3]` não é igual a `[1,2,3]`.
**A Causa e Solução:** Em JavaScript, listas e objetos nunca são estritamente iguais a menos que apontem para o mesmo lugar na memória do computador. O `toBe()` checa a memória (identidade). Para listas ou objetos (estruturas completas), use sempre o **`.toEqual()`** em vez de `.toBe()`. Ele checa se o "conteúdo" é idêntico!

### Erro 2: O Falso Positivo em Testes Assíncronos
**O Sintoma:** Você testou uma função que consulta uma API com Promise (`await`). O seu teste passa (fica verde), mas quando você quebra o código propositalmente, o teste continua passando!
**A Causa:** O Jest terminou de executar a linha do seu `test` antes da Promise da API retornar do servidor. Ele não "esperou", logo, ele achou que deu tudo certo.
**A Solução:** Testes assíncronos precisam da palavra `async` e `await` também.
```javascript
test("deve buscar o usuario na api", async () => {
  const usuario = await buscarUsuario(1);
  expect(usuario.nome).toBe("Ana");
});
```

---

## 🚀 Desafio Prático

**Contexto:** Você está criando o formulário de cadastro de um e-commerce.
**Tarefa:**
Sem olhar para as respostas acima (mas podendo pesquisar a documentação do Jest):
Escreva um teste estruturado para uma função `validarEmail(email)`. 
1. Crie o bloco `describe("Validação de Email", () => {...})`.
2. Escreva o `test` para o cenário Positivo: envie "ana@email.com" e espere o retorno ser `true` usando o método `expect(...).toBeTruthy()`.
3. Escreva o `test` para o cenário Negativo: envie um email sem o '@' e espere o retorno ser `false` usando o método `expect(...).toBeFalsy()`.
