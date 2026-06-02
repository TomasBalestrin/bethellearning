---
title: "Princípios SOLID"
keywords: ["solid", "arquitetura", "design patterns", "pleno"]
module: "Arquitetura e Design de Código"
lesson: "01 - Princípios SOLID"
---

# Aula 01 - Princípios SOLID (O Pareto da Arquitetura)

## 🎯 O Conceito (Pareto 80/20)

Os princípios SOLID são a base para que o sistema possa **crescer sem quebrar o que já existe**. O desenvolvedor Júnior escreve o código no arquivo mais próximo; o Pleno decide qual a responsabilidade de cada arquivo.

O foco da nossa aula é o "20% que traz 80% do resultado": **SRP** e **OCP**.
- **S (Single Responsibility Principle):** Uma classe, função ou componente deve ter **apenas um** motivo para mudar. (Separe cálculo de exibição).
- **O (Open/Closed Principle):** Entidades abertas para extensão, fechadas para modificação. (Adicione coisas novas criando arquivos novos, e não colocando um `if/else` gigante num arquivo existente).

---

## 💻 Deep Dive (Passo a Passo)

Vamos refatorar um código real que "funciona", mas quebra os princípios SOLID, tornando a manutenção um pesadelo.

### Passo 1: Identificando o Problema (Violação do SRP)
Crie o arquivo `RelatorioApp.js`:

```javascript
// ❌ RUIM: Esse arquivo faz tudo! Busca do banco, calcula, cria PDF e envia email.
class RelatorioFinanceiro {
  async processarRelatorioMensal() {
    // 1. Acesso a dados
    const dados = await database.query("SELECT * FROM vendas");
    
    // 2. Regra de Negócio
    let lucro = 0;
    dados.forEach(v => lucro += (v.valor - v.custo));
    
    // 3. Apresentação / Infraestrutura
    const pdf = new PDFGenerator();
    pdf.write(`O lucro foi: ${lucro}`);
    pdf.save('/relatorios/lucro.pdf');
  }
}
```
**Por que é ruim?** Se a regra de imposto mudar, você edita essa classe. Se a biblioteca de PDF atualizar, você edita essa classe. Se o banco mudar para API... adivinha? Você edita essa classe.

### Passo 2: Refatorando para o SRP (Responsabilidade Única)
Vamos quebrar essa classe em pedaços lógicos.

```javascript
// ✅ BOM: Cada um faz só o seu trabalho
class VendasRepository {
  async buscarVendas() { return await database.query("SELECT * FROM vendas"); }
}

class CalculadoraLucro {
  calcular(vendas) { return vendas.reduce((acc, v) => acc + (v.valor - v.custo), 0); }
}

class RelatorioPDF {
  gerar(lucro) { /* logica do PDF */ }
}

// O orquestrador (Caso de Uso) apenas coordena os especialistas:
class ProcessarRelatorioUseCase {
  constructor(repo, calc, pdf) {
    this.repo = repo;
    this.calc = calc;
    this.pdf = pdf;
  }
  async executar() {
    const vendas = await this.repo.buscarVendas();
    const lucro = this.calc.calcular(vendas);
    this.pdf.gerar(lucro);
  }
}
```

### Passo 3: O Princípio Open/Closed (OCP) na prática
O OCP diz que não deveríamos alterar o código antigo quando o chefe pede uma *Feature* nova.

```javascript
// ❌ RUIM: Um switch-case gigante
class ProcessadorDePagamento {
  pagar(tipo, valor) {
    if (tipo === 'PIX') { console.log("Fazendo PIX"); }
    else if (tipo === 'CARTAO') { console.log("Cobrando Cartão"); }
    // O chefe pediu Boleto? Vai ter que alterar essa classe e arriscar quebrar o PIX!
  }
}
```

A solução é usar Polimorfismo ou a injeção de estratégias (Strategy Pattern).

```javascript
// ✅ BOM: Injeção de dependência via parâmetro
class PagamentoPix { processar(v) { console.log("PIX de " + v); } }
class PagamentoCartao { processar(v) { console.log("CARTÃO de " + v); } }
class PagamentoBoleto { processar(v) { console.log("BOLETO de " + v); } }

class ProcessadorDePagamento {
  // A classe 'Processador' está FECHADA para modificação.
  // Se o chefe pedir 'Bitcoin', não tocamos aqui! Apenas criamos a classe 'PagamentoBitcoin'.
  pagar(estrategiaDePagamento, valor) {
    estrategiaDePagamento.processar(valor);
  }
}

const processador = new ProcessadorDePagamento();
processador.pagar(new PagamentoBoleto(), 100);
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Fragmentação Extrema ("Shotgun Surgery")
**O Sintoma:** Ao separar responsabilidades demais, para criar uma simples funcionalidade você precisa alterar 12 arquivos diferentes. Você aplicou o SRP ao extremo.
**A Solução:** Coesão. Coisas que mudam juntas devem estar agrupadas. Não separe a validação de email da classe de validação de usuário se elas só servem para a mesma coisa. O equilíbrio é a chave do Sênior.

### Erro 2: Injeção de Dependência Circular
**O Sintoma:** O Servico A depende do Servico B, e o Servico B injeta o Servico A. O NodeJS joga um erro `Cannot read property 'X' of undefined`.
**A Solução:** Se A depende de B e B de A, provavelmente eles deveriam ser uma classe só (violação de SRP/Coesão) ou existe um Servico C escondido que ambos deveriam chamar.

---

## 🚀 Desafio Prático

**Contexto:** Você tem um componente no front-end React/Vue chamado `PerfilUsuario`. Atualmente ele exibe o avatar, tem uma função interna `fazerLogin()`, uma função `salvarTemaEscuroNoLocalStorage()`, e busca os dados de amigos numa API.
**Tarefa:** 
1. Desenhe (em um arquivo de texto ou pseudo-código) como você quebraria esse componente usando os princípios SOLID.
2. Extraia a lógica do LocalStorage para um utilitário, a busca da API para um Service/Hook, e mantenha o componente `PerfilUsuario` apenas renderizando HTML.
3. Se adicionarmos a funcionalidade de "Tema Alto Contraste", você precisaria alterar o componente HTML ou apenas o arquivo utilitário de Tema?
