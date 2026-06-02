---
title: "TypeScript Essencial"
keywords: ["typescript", "tipos", "interfaces", "generics", "pleno"]
module: "JavaScript / TypeScript Avançado"
lesson: "01 - TypeScript Essencial"
---

# Aula 01 - TypeScript Essencial (A Base do Código Escalável)

## 🎯 O Conceito (Pareto 80/20)
Como desenvolvedor Pleno, você não escreve código apenas para o computador entender, mas para **sua equipe entender e escalar de forma segura**. O TypeScript (TS) é uma das ferramentas com maior retorno sobre investimento para qualidade de código.

Embora TypeScript possua centenas de recursos, 80% do tempo você usará:
1. **Tipagem Estática:** Definir formatos de variáveis e retornos de funções.
2. **Interfaces vs Types:** Criar "contratos" para objetos.
3. **Generics:** Criar funções e componentes reutilizáveis.
4. **Utility Types:** Manipular tipos existentes (ex: transformar todos os campos em opcionais).

---

## 💻 Deep Dive (Passo a Passo)

Vamos construir juntos um gerenciador de usuários simples e tipado, abordando os erros mais comuns.

### Passo 1: Entendendo a diferença entre `type` e `interface`
Muitos desenvolvedores travam ao decidir qual usar. A regra de ouro é:
- Use **`interface`** para definir o formato de objetos e contratos de APIs (são extensíveis facilmente).
- Use **`type`** para apelidar tipos primitivos, criar combinações (Union/Intersection) ou mapeamentos complexos.

Crie um arquivo `usuarios.ts` e adicione o seguinte:

```typescript
// 1. Usando TYPE para Unions (valores específicos permitidos)
type Role = "ADMIN" | "USER" | "GUEST";

// 2. Usando INTERFACE para objetos
interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: Role;
  telefone?: string; // O '?' torna o campo opcional
}

// 3. Estendendo uma Interface
interface ClienteVIP extends Usuario {
  limiteCredito: number;
}
```

### Passo 2: O Poder dos Generics `<T>`
E se precisarmos de uma função que retorne o primeiro elemento de **qualquer** tipo de array (números, strings, ou Usuários)? Se usarmos `any`, perderemos a inteligência da IDE. A solução são os **Generics**.

Adicione ao seu arquivo:

```typescript
// 'T' é um "placeholder" genérico para o tipo que será passado
function pegarPrimeiroElemento<T>(array: T[]): T | undefined {
  return array[0];
}

const numeros = [10, 20, 30];
// O TS deduz inteligentemente que 'primeiroNumero' é do tipo 'number'
const primeiroNumero = pegarPrimeiroElemento(numeros);

const usuarios: Usuario[] = [
  { id: 1, nome: "Ana", email: "ana@email.com", role: "USER" }
];
// O TS deduz que 'primeiroUser' é do tipo 'Usuario'
const primeiroUser = pegarPrimeiroElemento(usuarios);
```

### Passo 3: Utility Types que Salvam Vidas
Para atualizar um usuário, não precisamos mandar todos os campos. O utilitário `Partial<T>` faz isso por nós.

```typescript
// Partial transforma todas as propriedades de Usuario em opcionais
function atualizarUsuario(id: number, dadosAtualizados: Partial<Usuario>) {
  console.log(`Atualizando usuário ${id} com:`, dadosAtualizados);
  // Lógica de atualização no banco...
}

// Funciona! Passamos apenas o email.
atualizarUsuario(1, { email: "novo@email.com" }); 
```

Outro utilitário muito usado no frontend é o `Omit<T, K>`, perfeito para remover senhas antes de enviar dados para a tela:

```typescript
type UsuarioParaFrontend = Omit<Usuario, 'telefone' | 'role'>;
// O tipo gerado terá apenas: { id: number, nome: string, email: string }
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: `Object is of type 'unknown'`
Isso ocorre porque o TypeScript parou de assumir `any` em blocos `try/catch`. 
**Como resolver:** Você precisa verificar o tipo do erro antes de acessá-lo.
```typescript
try {
  throw new Error("Falha na rede");
} catch (error) {
  // ERRADO: console.log(error.message); 
  
  // CORRETO:
  if (error instanceof Error) {
    console.log(error.message);
  }
}
```

### Erro 2: Excesso de uso do `any`
O `any` desliga o TypeScript. **Não use `any`**. 
**Como resolver:** Se você não sabe o que uma API de terceiros vai retornar, use `unknown`. O `unknown` obriga você a fazer validações (ex: `typeof variavel === 'string'`) antes de poder usá-lo.

---

## 🚀 Desafio Prático

**Contexto:** Você está construindo a API de um E-commerce.
**Tarefa:** Crie um arquivo `ecommerce.ts` que implemente:
1. Uma `interface Produto` com: `id` (número), `nome` (texto), `preco` (número), e `categorias` (array de textos).
2. Um `type RespostaAPI<T>` que seja um objeto com duas propriedades: `data` (do tipo genérico `T`) e `status` (número).
3. Uma função `buscarProduto(id)` que simule uma busca assíncrona (usando `Promise`) e retorne uma `RespostaAPI<Produto>`.
4. Uma função `atualizarPreco(id, dados)` onde os `dados` não podem incluir o `nome` nem `categorias` do produto (Dica: combine `Partial` com `Pick` ou `Omit`).

**Critério de Aceite:** O código não deve apresentar nenhum aviso de tipagem vermelha no seu editor de código.
