---
title: "TDD e Code Coverage"
keywords: ["tdd", "test-driven development", "code coverage", "istanbul", "pleno"]
module: "Testes e Qualidade de Código"
lesson: "03 - TDD e Code Coverage"
---

# Aula 03 - TDD e Code Coverage (Medindo o Valor Real)

## 🎯 O Conceito (Pareto 80/20)

Testar o código é essencial. Mas *quando* testar e *como* saber se testamos o suficiente?

**1. TDD (Test-Driven Development):**
Não é apenas uma forma de testar, é uma **técnica de Design de Arquitetura**. Ao escrever o teste ANTES do código, você se força a projetar a função como um cliente a usaria (pensando em parâmetros e retornos úteis), gerando um código com baixíssimo acoplamento e altíssima testabilidade (já que ele nasceu testável).

**2. Code Coverage (Cobertura de Código):**
Métricas matemáticas que dizem "Quantos % das suas linhas de código foram executadas durante a bateria de testes?". Excelente para achar buracos, péssimo se usado como "meta de vaidade" pela gestão (100% de cobertura de código ruim não evita bugs).

---

## 💻 Deep Dive (Passo a Passo)

Vamos construir um validador de senha simples usando TDD real (O Ciclo Red-Green-Refactor).

### O Ciclo Sagrado do TDD
1. 🔴 **Red (Falha):** Escreva o teste, rode, e veja ele quebrar vermelho (afinal, a função nem existe).
2. 🟢 **Green (Passa):** Escreva o código MAIS BURRO POSSÍVEL para fazer a barra ficar verde.
3. 🔵 **Refactor (Limpa):** Melhore o código, com a confiança de que o teste te protege.

### Passo 1: O Teste Vermelho (Red)
Crie `senhaValidator.test.js`:

```javascript
// Importamos a função que AINDA NÃO EXISTE
import { validarSenha } from './senhaValidator';

test('senhas com menos de 8 caracteres devem ser invalidas', () => {
  // Chamamos a função e esperamos que retorne false
  expect(validarSenha('1234567')).toBe(false);
});
```
*Se você rodar o Jest, ele vai falhar (vermelho). Ótimo.*

### Passo 2: O Código Verde (Green)
Crie `senhaValidator.js`:
```javascript
export function validarSenha(senha) {
  // Código estúpido, porém o MÍNIMO para fazer o teste passar
  if (senha.length < 8) return false;
  return true;
}
```
*Rode o Jest. Passou (Verde)!*

### Passo 3: Refatorando e Expandindo (Refactor)
Vamos adicionar uma nova regra: "Deve ter pelo menos um número".
Escreva o teste primeiro!
```javascript
test('senhas sem número devem ser invalidas', () => {
  expect(validarSenha('abcdefghi')).toBe(false); // Tem mais de 8 chars, mas sem número
});
```
*Rode o Jest. Vermelho.*

Vá no código e faça passar (Verde):
```javascript
export function validarSenha(senha) {
  if (senha.length < 8) return false;
  // O MÍNIMO de código para passar:
  if (!/\d/.test(senha)) return false; 
  return true;
}
```
*Verde.* Agora que estamos protegidos por dois testes, você pode **Refatorar** a função para deixá-la mais bonita (ex: juntando numa única linha com Expressão Regular) sem medo de estragar as regras originais.

### Passo 4: Code Coverage (Métrica)
No Jest, rode `npx jest --coverage`.
Ele gerará um relatório em texto e uma pasta HTML mostrando as **Branches** (Ramificações). Se você não escreveu um teste passando uma senha perfeita (mais de 8 caracteres e com número), a linha do `return true;` nunca foi executada. Sua cobertura estará em 80%.

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: A Vaidade dos 100% (The Coverage Trap)
**O Sintoma:** A equipe é cobrada para ter 100% de Coverage. Os desenvolvedores começam a escrever testes "zumbis", que chamam todas as funções do sistema, mas não usam `expect()` para validar nada.
**A Solução:** Cobertura de Linhas não garante nada. O Pareto do TDD diz que você deve buscar de **70% a 80% de cobertura**, focando **100% de cobertura apenas nas regras de negócio financeiras/críticas do Domínio**. Funções visuais ou métodos getter/setter de model podem ser ignorados.

### Erro 2: TDD para tudo e a Morte por Refatoração
**O Sintoma:** Você gasta 3 dias fazendo TDD para criar uma tela de "Quem Somos" que não tem lógica nenhuma, apenas HTML.
**A Solução:** Não use TDD para UI (User Interface). TDD é fenomenal para Lógica Pura (Backend e Regras Matemáticas). Para telas de interface que o designer muda de cor toda semana, usar TDD gera um custo altíssimo de retrabalho para zero benefício prático.

---

## 🚀 Desafio Prático

**Contexto:** Você está desenvolvendo um módulo de E-commerce. A função calcula o valor do frete. Se for Sul/Sudeste é R$ 20. Se for Norte/Nordeste é R$ 50. E se a compra for maior que R$ 200, o frete é grátis (R$ 0).
**Tarefa:**
Faça o fluxo completo do TDD **mentalmente ou num bloco de notas**:
1. Quais seriam os **3 testes unitários iniciais** que você escreveria antes de abrir o código? (Escreva a frase do `test("deve...")` e o que você faria de `expect`).
2. Tente rascunhar o código (Green) que atende apenas ao primeiro teste, ignorando os outros dois temporariamente.
