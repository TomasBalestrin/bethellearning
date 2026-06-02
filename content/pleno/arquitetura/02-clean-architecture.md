---
title: "Clean Architecture e Padrões de Design"
keywords: ["clean architecture", "design patterns", "arquitetura", "pleno"]
module: "Arquitetura e Design de Código"
lesson: "02 - Clean Architecture e Padrões de Design"
---

# Aula 02 - Clean Architecture e Padrões de Design

## 🎯 O Conceito (Pareto 80/20)

Na transição para Pleno, você começa a desenhar não apenas "como o código resolve o problema", mas **"onde o código deve morar"**.

A Clean Architecture foca em proteger as "Regras de Negócio" do resto do mundo. O núcleo do seu sistema não deve saber se os dados vêm de uma API HTTP, de uma fila Kafka ou de um arquivo CSV.
- **A Regra de Ouro (A Regra da Dependência):** As setas de dependência devem sempre apontar para **DENTRO**. O Banco de Dados depende do Casos de Uso, e nunca o Caso de Uso depende do Banco de Dados.

Os Padrões de Design (Design Patterns) são as ferramentas para implementar isso. Os mais usados no dia a dia são: **Factory** (criar objetos), **Strategy** (trocar regras) e **Observer** (escutar eventos).

---

## 💻 Deep Dive (Passo a Passo)

Vamos construir o fluxo de "Cadastrar Usuário" aplicando a Clean Architecture no Node.js.

### Passo 1: O Domínio e as Regras de Negócio (O Núcleo)
A camada mais interna. Não tem banco de dados, não tem Express. Apenas JavaScript puro.

Crie `UserEntity.js`:
```javascript
// Entidade de Domínio
class User {
  constructor(nome, email, idade) {
    if (idade < 18) throw new Error("Usuário deve ser maior de idade");
    if (!email.includes("@")) throw new Error("Email inválido");
    
    this.nome = nome;
    this.email = email;
    this.idade = idade;
  }
}
```

### Passo 2: O Caso de Uso (A Orquestração)
O Caso de Uso dita a receita do bolo. Ele não bate no banco, ele **pede** para alguém bater no banco.

Crie `RegistrarUsuarioUseCase.js`:
```javascript
class RegistrarUsuarioUseCase {
  // Injeção de Dependência: Passamos o repositório pelo construtor
  constructor(userRepository, emailSender) {
    this.userRepository = userRepository;
    this.emailSender = emailSender;
  }

  async executar(dados) {
    // 1. Instancia e valida a Entidade
    const newUser = new User(dados.nome, dados.email, dados.idade);
    
    // 2. Salva no banco (mas o caso de uso não sabe se é SQL ou Mongo!)
    await this.userRepository.salvar(newUser);
    
    // 3. Envia boas vindas
    await this.emailSender.enviar(newUser.email, "Bem vindo!");
  }
}
```

### Passo 3: Os Adaptadores (Controllers e Repositories)
Agora sim lidamos com o "Mundo Exterior" (HTTP e SQL). 

Crie `UserController.js`:
```javascript
// O Controller só traduz Req/Res HTTP para o formato do Caso de Uso
class UserController {
  constructor(registrarUseCase) {
    this.registrarUseCase = registrarUseCase;
  }

  async handleRequest(req, res) {
    try {
      await this.registrarUseCase.executar(req.body);
      res.status(201).json({ message: "Sucesso" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
```

Crie a implementação do Repositório (que satisfaz a interface esperada pelo Caso de Uso):
```javascript
class PostgresUserRepository {
  async salvar(user) {
    await db.query("INSERT INTO users (nome, email) VALUES ($1, $2)", [user.nome, user.email]);
  }
}
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Vazamento de Infraestrutura para o Domínio
**O Sintoma:** O seu `UserEntity` ou `UseCase` importa bibliotecas como `express`, `mongoose` ou `@prisma/client`.
**O Motivo:** Você feriu a Regra da Dependência. Se o Prisma atualizar e quebrar, seu núcleo de negócios quebra junto.
**A Solução:** Crie "Interfaces/Portas" abstratas que o Prisma deve obedecer nas camadas mais externas (Repositorios). O Caso de Uso só fala com a abstração.

### Erro 2: Arquitetura "Cebola" para projetos simples (Overengineering)
**O Sintoma:** Você precisa criar 5 pastas (`models`, `repositories`, `useCases`, `controllers`, `dtos`) e escrever 300 linhas de código só para fazer um CRUD simples de "Cadastrar Categoria".
**A Solução:** A Clean Architecture não é obrigatória para tudo. Aplique nos módulos *Core* do seu negócio (ex: Faturamento). Para cadastros cru (Telas de Admin simples), fazer direto no Controller é aceitável na vida real.

---

## 🚀 Desafio Prático

**Contexto:** Você tem um Caso de Uso `ProcessarPagamentoUseCase`. Atualmente, ele salva os dados da transação localmente num arquivo de texto usando `fs.writeFileSync`.
**Tarefa:**
1. Seguindo a Clean Architecture, crie um `FileTransactionRepository` que implemente um método `salvar()`.
2. Injete esse Repositório no seu Caso de Uso.
3. Agora o cliente pediu para mudar: ao invés de salvar em arquivo de texto, deve salvar num banco MySQL. Crie o `MySQLTransactionRepository` e mostre como você alteraria a inicialização da aplicação (sem alterar UMA linha sequer do `ProcessarPagamentoUseCase`) para começar a usar o MySQL.
