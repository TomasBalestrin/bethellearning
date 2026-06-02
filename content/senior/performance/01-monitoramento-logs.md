---
title: "Monitoramento e Logs (Observabilidade)"
keywords: ["performance", "logs", "monitoramento", "datadog", "observabilidade", "senior"]
module: "Performance e Observabilidade"
lesson: "01 - Monitoramento e Logs"
---

# Aula 01 - Monitoramento e Logs (A Visão de Raio-X)

## 🎯 O Conceito (Pareto 80/20)

Você colocou o sistema em produção. O usuário envia um e-mail reclamando: "Tentei comprar a blusa e a tela travou!". 
Se a sua única ferramenta de investigação for `console.log()` ou ler o código e "tentar adivinhar" o que aconteceu, você não é um Sênior, é um Vidente.

**Observabilidade (O11y)** é a arte de conseguir ver dentro do motor do seu sistema enquanto o carro está a 100km/h na estrada, sem precisar parar o carro.

Os 3 Pilares da Observabilidade (80/20):
1. **Logs (O Diário):** "Ocorreu um Erro de Sintaxe às 15:42 na linha 14 do PagamentoService".
2. **Métricas (O Velocímetro):** "Nossa API está gastando em média 400ms para responder. Nossa CPU está em 95% de uso".
3. **Traces (O GPS):** "O usuário clicou no Front-end (10ms) -> O Front bateu no Microserviço A (50ms) -> Que bateu no Microserviço B (1200ms - O gargalo está aqui!)".

---

## 💻 Deep Dive (Passo a Passo)

### Passo 1: Logs Estruturados (JSON)
Escrever `console.log("Erro ao salvar usuário " + id)` é inútil em grande escala. Se você tiver 5 milhões de linhas de log no servidor, você não consegue pesquisar isso no painel de monitoramento.

O Padrão Ouro é o **Log Estruturado em JSON**. Ferramentas como Datadog, New Relic ou ELK (Elasticsearch) devoram JSON e permitem criar filtros poderosos.

```javascript
// ❌ RUIM (Log de Texto Solto)
console.log("Usuário 123 comprou a camisa azul e a transação falhou com erro timeout");

// ✅ BOM (Log Estruturado)
// Usando bibliotecas como Winston ou Pino no Node.js
logger.error({
  message: "Falha na transação de compra",
  userId: 123,
  produto: "camisa azul",
  erroCode: "TIMEOUT_API_BANCO",
  tempo_execucao_ms: 5400
});
```
*(No painel da empresa, você consegue digitar: `erroCode="TIMEOUT_API_BANCO"` e ver todos os usuários que sofreram o mesmo problema em 1 segundo).*

### Passo 2: Níveis de Severidade (Log Levels)
Não polua o servidor de logs com lixo. O custo de armazenamento de logs em empresas grandes chega a milhões de reais.

- **FATAL / ERROR:** Alerta vermelho. O sistema quebrou, o cliente perdeu dinheiro. Acorda o desenvolvedor de madrugada pelo PagerDuty.
- **WARN:** O sistema funcionou, mas algo está estranho. Ex: "API de terceiros demorou 10 segundos pra responder".
- **INFO:** Fluxos normais de negócio. "Usuário João logou no sistema". "Compra X aprovada".
- **DEBUG:** Dados absurdamente detalhados (ex: JSON inteiro do Payload). SÓ deve ser ativado em ambiente de teste/dev. Em Produção, log nível Debug desliga-se para economizar dinheiro.

### Passo 3: Métricas de Saúde (Health Checks)
Seu serviço precisa gritar que está vivo ou morto.
Você cria uma rota `GET /health` na sua API. O Load Balancer da AWS fica batendo nessa rota a cada 5 segundos.
- Se retornar `200 OK`, a AWS manda clientes pra ele.
- Se retornar `500`, a AWS sabe que o servidor "congelou", corta o tráfego dele, joga pro servidor reserva, e reinicia a máquina problemática automaticamente.

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: Logar PII (Personal Identifiable Information)
**O Sintoma:** Você criou um log maravilhoso que salva todo o objeto da requisição de compra. Semanas depois, uma auditoria de segurança da Lei Geral de Proteção de Dados (LGPD/GDPR) descobre que você está guardando CPFs, e-mails e senhas (em texto puro) no arquivo de Log da empresa, onde dezenas de estagiários têm acesso. A multa é milionária.
**A Solução Sênior:** *Sanitização de Logs.* Antes de imprimir qualquer objeto num `logger`, você usa funções de mascaramento para trocar senhas por `*****` e truncar cartões de crédito para `XXXX-XXXX-XXXX-1234`.

### Erro 2: A Fadiga de Alertas (Alert Fatigue)
**O Sintoma:** Você configurou o Datadog para mandar uma mensagem no Slack toda vez que der um `WARN` ou um erro 404 (Página não encontrada). O bot começa a mandar 3.000 mensagens por dia no Slack. A equipe silencia as notificações do canal. Um dia, o banco de dados principal explode, o bot manda mensagem, mas todo mundo tava com o canal mutado e a empresa morre.
**A Solução:** Alerta só existe para coisas Acionáveis. Se um alerta apita, um humano TEM que ir consertar. Se não precisa consertar na hora (ex: erro 404), não deve ser um Alerta (Notificação de celular), deve ser apenas uma Métrica (Gráfico para olhar de manhã na Daily).

---

## 🚀 Desafio Prático

**Contexto:** Você acabou de configurar a biblioteca `Winston` no backend da empresa para gerar Logs em JSON.
**Tarefa:**
Escreva o modelo JSON ideal (o que você passaria para o `logger.info(...)`) para registrar o momento exato em que um usuário altera a senha dele com sucesso. Garanta que o log forneça informações suficientes para uma auditoria futura saber "quem, quando e o que" aconteceu, mas sem cometer crimes de segurança e privacidade.
