---
title: "Autenticação Avançada (JWT, OAuth2)"
keywords: ["jwt", "oauth2", "autenticacao", "backend", "pleno"]
module: "APIs e Backend Integration"
lesson: "02 - Autenticação Avançada (JWT, OAuth2)"
---

# Aula 02 - Autenticação Avançada (JWT, OAuth2)

## 🎯 O Conceito (Pareto 80/20)

Segurança é inegociável. A mudança de Junior para Pleno envolve entender como proteger rotas não apenas "escondendo o botão no HTML", mas **validando cada requisição no servidor**.

Existem duas formas principais de autenticação em APIs modernas:
1. **JSON Web Tokens (JWT):** O servidor cria um "Passaporte" assinado e entrega ao frontend. O frontend anexa esse passaporte (Token) em cada requisição (no Header: `Authorization: Bearer <token>`). A grande vantagem? É *Stateless*. O servidor valida a assinatura matematicamente, sem precisar consultar o banco de dados toda vez.
2. **OAuth2 / OIDC:** Quando você quer que o usuário faça login com o Google/Apple em vez de gerenciar senhas você mesmo. Você delega a responsabilidade da senha para terceiros.

---

## 💻 Deep Dive (Passo a Passo)

Vamos entender na prática como um JWT é gerado e validado usando Node.js e a biblioteca `jsonwebtoken`.

### Passo 1: Gerando o Token no Login
Quando o usuário acerta a senha, o servidor "assina" um token.
*Atenção: Instale usando `npm i jsonwebtoken`*

```javascript
const jwt = require('jsonwebtoken');

// Esta chave DEVE vir do seu arquivo .env e NUNCA estar no código!
const SECRET_KEY = "super_secreto_em_producao";

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  
  // 1. Validar no banco (Simulação)
  if (email === "admin@teste.com" && senha === "123") {
    
    // 2. Criar o Payload (Dados públicos). NUNCA COLOQUE SENHAS AQUI.
    const payload = {
      userId: 42,
      role: "admin"
    };

    // 3. Assinar o token (Ele expira em 1 hora)
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ erro: "Credenciais Inválidas" });
  }
});
```

### Passo 2: O Middleware de Proteção
Para proteger a rota `/dashboard`, não podemos confiar no frontend. Precisamos de um *Middleware* que intercepte a requisição, pegue o Token do Header e verifique a assinatura.

```javascript
function verificarToken(req, res, next) {
  // O token geralmente vem como "Bearer eyJhbGc..." no cabeçalho Authorization
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) return res.status(401).json({ erro: "Token não fornecido" });

  // Remove a palavra "Bearer " para pegar só o hash
  const token = authHeader.split(' ')[1];

  try {
    // A função verify testa matematicamente se fomos nós que assinamos este token e se não expirou
    const dadosDecodificados = jwt.verify(token, SECRET_KEY);
    
    // Injetamos os dados do usuário na requisição para a próxima função usar!
    req.user = dadosDecodificados; 
    
    next(); // Passa o fluxo para a rota real
  } catch (error) {
    return res.status(403).json({ erro: "Token inválido ou expirado" });
  }
}
```

### Passo 3: Usando a Rota Protegida
Agora basta plugar o middleware na rota.

```javascript
// A requisição só entra aqui se passar pelo middleware verificarToken
app.get('/dashboard', verificarToken, (req, res) => {
  res.json({ 
    mensagem: "Bem vindo à área secreta!", 
    dadosDoUsuario: req.user // Acesso aos dados extraídos do Payload!
  });
});
```

---

## 🛠️ Troubleshooting (Resolvendo Erros Comuns)

### Erro 1: XSS roubando seu JWT
**O Sintoma:** Você salva o JWT no `localStorage`. Um hacker consegue rodar um script malicioso no seu site (via um comentário ou input não sanitizado), escreve `localStorage.getItem('token')` e rouba a sessão do usuário.
**A Solução Sênior:** Use Cookies `HttpOnly`. O servidor, em vez de retornar o token no JSON, envia no cabeçalho `Set-Cookie: token=xyz; HttpOnly`. O navegador guarda isso com segurança e o JavaScript (e os hackers) **não conseguem** ler esse cookie. O navegador o anexa automaticamente nas próximas requisições.

### Erro 2: JWT sem possibilidade de Logout
**O Sintoma:** O usuário clica em "Sair", você apaga o token do frontend, mas se alguém tiver copiado esse token, ele continua funcionando no servidor até o tempo expirar.
**A Solução:** O JWT clássico não tem como ser "revogado" (porque não consultamos o banco). Para alta segurança, use o padrão de **Refresh Tokens**: O Token de Acesso vive apenas 10 minutos. O Refresh Token vive 7 dias e fica salvo no banco. No Logout, você apaga o Refresh Token no banco. 

---

## 🚀 Desafio Prático

**Contexto:** Sua API possui três níveis de acesso: "USER", "EDITOR" e "ADMIN". O payload do seu JWT salva a `role` do usuário.
**Tarefa:**
1. Escreva um segundo Middleware chamado `somenteAdmin(req, res, next)`.
2. Este middleware deve assumir que roda *depois* do `verificarToken`, então `req.user` já existe.
3. Se o `req.user.role` não for "ADMIN", retorne `403 Forbidden` com a mensagem "Acesso negado".
4. Se for "ADMIN", chame `next()`.
5. Mostre como você conectaria os DOIS middlewares em uma rota de deleção (ex: `app.delete('/usuarios/:id')`).
