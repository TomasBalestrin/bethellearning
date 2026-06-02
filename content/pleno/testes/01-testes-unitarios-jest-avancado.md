---
title: "Testes Unitários com Jest (Avançado)"
keywords: ["testes unitarios", "jest", "mock", "spy", "pleno"]
module: "Testes e Qualidade de Código"
lesson: "01 - Testes Unitários com Jest (Avançado)"
---

# Aula 01 - Testes Unitários com Jest (Avançado)

## 🎯 O Conceito (Pareto 80/20)

Na trilha Junior, vimos como testar se `2 + 2 = 4`. Mas no mundo real, seu código não é apenas matemática. O código real tem **dependências** impuras: ele acessa o Banco de Dados, faz chamadas HTTP para o MercadoPago, e usa `setTimeout`.

O objetivo principal de um teste unitário avançado é garantir que a **lógica do SEU arquivo** funcione, *ignorando completamente* as dependências externas. Para isolar seu arquivo do resto do mundo, usamos **Mocks** (funções falsas completas) e **Spies** (espiões que monitoram funções existentes).

---

## 💻 Deep Dive (Passo a Passo)

Vamos testar um serviço que busca um usuário na API e formata o nome dele.

### Passo 1: O Código Original
Crie o arquivo `usuarioService.js`:

```javascript
import { fetchDaApi Externa } from './api';

export async function buscarEFormatarUsuario(id) {
  // AQUI está o problema: não queremos fazer requests de verdade nos testes!
  const usuarioRaw = await fetchDaApiExterna(`/users/${id}`);
  
  if (!usuarioRaw) throw new Error("Não achou");
  
  return `O usuário é: ${usuarioRaw.nome.toUpperCase()}`;
}
```

### Passo 2: O Mock no Jest
Nós não vamos bater na API real. Vamos "mockar" (falsificar) a dependência.

Crie `usuarioService.test.js`:

```javascript
import { buscarEFormatarUsuario } from './usuarioService';
// Importamos a função original apenas para "capturá-la"
import { fetchDaApiExterna } from './api'; 

// 1. Diga ao Jest para sequestrar (mockar) este arquivo
jest.mock('./api');

test('deve formatar o nome do usuario retornado pela API', async () => {
  // 2. Controlamos a resposta falsa. Quando nossa função chamar a API,
  // ela não vai pra internet, ela vai receber este objeto mágico:
  fetchDaApiExterna.mockResolvedValue({ id: 1, nome: "maria" });

  // 3. Executamos NOSSA função
  const resultado = await buscarEFormatarUsuario(1);

  // 4. Verificamos a NOSSA lógica (o toUpperCase e a formatação funcionaram?)
  expect(resultado).toBe("O usuário é: MARIA");
  
  // 5. Garantimos que a nossa função chamou a dependência com os parâmetros certos
  expect(fetchDaApiExterna).toHaveBeenCalledWith('/users/1');
});
```

### Passo 3: Spies (Espiões)
Enquanto o `jest.mock` substitui o módulo todo, o `jest.spyOn` permite que você deixe a função real rodar, mas instala uma "câmera" escondida nela.

```javascript
const videoPlayer = {
  tocar: () => console.log('Playing vídeo real...'),
};

test('espiando se o player tocou', () => {
  // Coloca uma câmera no método 'tocar' do objeto 'videoPlayer'
  const spy = jest.spyOn(videoPlayer, 'tocar');
  
  videoPlayer.tocar();
  
  // Verifica a gravação da câmera
  expect(spy).toHaveBeenCalledTimes(1);
  
  // Remove a câmera para não estragar outros testes
  spy.mockRestore(); 
});
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Testes Vazando (Mocks afetando outros testes)
**O Sintoma:** O "Teste A" passa quando rodado sozinho. O "Teste B" passa sozinho. Mas quando você roda `npm test` (os dois juntos), o Teste B quebra dizendo que o banco foi chamado 5 vezes.
**A Solução:** Mocks têm memória. Se o Teste A chamou a função falsa 4 vezes, o Teste B começa achando que ela já foi chamada 4 vezes. Limpe tudo entre cada teste:
```javascript
afterEach(() => {
  jest.clearAllMocks(); // Zera o contador de 'toHaveBeenCalledTimes'
});
```

### Erro 2: Escrevendo Testes que Testam os Mocks (Falso Positivo)
**O Sintoma:** Você escreve um mock, e então faz um `expect(meuMock()).toBe(mockReturn)`. Você comemora que o teste passou, mas seu código quebrou em produção.
**A Causa:** Você não chamou a *sua* função que você queria testar, você chamou a função *falsa* diretamente. Teste sempre a saída do SEU código.

---

## 🚀 Desafio Prático

**Contexto:** Você escreveu uma função chamada `enviarRelatorioMensal(usuario)` que verifica se hoje é o dia 1º do mês; se for, ela dispara a função de enviar email.
**Tarefa:**
1. A função nativa `new Date()` do JavaScript sempre retorna a data de "hoje" (o momento exato da execução). 
2. Pesquise na documentação do Jest como você pode usar Mocks ou Spies para **congelar o tempo**. Descubra como "enganar" a função `new Date()` para que ela ache que hoje é exatamente o dia 1º de Janeiro de 2025, garantindo que seu teste do relatório mensal funcione perfeitamente em qualquer dia do ano em que for rodado.
