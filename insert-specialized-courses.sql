-- ============================================
-- TRILHA: MOBILE DEVELOPMENT
-- ============================================

-- Obter ID da trilha Mobile Development
SET @mobile_id = (SELECT id FROM courses WHERE title = 'Mobile Development' LIMIT 1);

-- Módulo 1: Fundamentos Mobile
INSERT INTO modules (course_id, title, description, order_index) 
VALUES (@mobile_id, 'Fundamentos Mobile', 'Conceitos básicos de desenvolvimento mobile', 1);
SET @mobile_mod1 = LAST_INSERT_ID();

-- Aulas do Módulo 1
INSERT INTO lessons (module_id, title, description, content, exercises, order_index) VALUES
(@mobile_mod1, 'Diferenças Web vs Mobile', 'Entenda as principais diferenças entre desenvolvimento web e mobile',
'<h2>Diferenças Web vs Mobile</h2><p>O desenvolvimento mobile possui características únicas que o diferenciam do web:</p><h3>Características Mobile</h3><ul><li><strong>Tela Pequena:</strong> Interfaces devem ser otimizadas para telas menores</li><li><strong>Touch Interactions:</strong> Gestos táteis ao invés de mouse/teclado</li><li><strong>Offline First:</strong> Aplicações devem funcionar sem internet</li><li><strong>Performance:</strong> Menos recursos disponíveis que em desktops</li><li><strong>Bateria:</strong> Otimização de consumo é crítica</li></ul>',
'[{"id": 1, "title": "Qual é a altura mínima para um botão em mobile?", "type": "multiple_choice", "options": ["24px", "48px", "72px", "100px"], "correct": 1}]', 1),

(@mobile_mod1, 'Escolhendo o Framework Certo', 'Comparação entre React Native, Flutter e outras opções',
'<h2>Escolhendo o Framework Certo</h2><h3>React Native</h3><p><strong>Vantagens:</strong> Usa JavaScript/React, comunidade grande, muitas bibliotecas, hot reload</p><h3>Flutter</h3><p><strong>Vantagens:</strong> Performance excepcional, UI consistente, Material Design built-in</p>',
'[{"id": 1, "title": "Qual framework oferece melhor performance?", "type": "multiple_choice", "options": ["React Native", "Flutter", "Xamarin", "Ionic"], "correct": 1}]', 2),

(@mobile_mod1, 'Setup do Ambiente de Desenvolvimento', 'Configurar ferramentas e emuladores',
'<h2>Setup do Ambiente</h2><h3>Para React Native</h3><pre><code>npm install -g react-native-cli\nnpx react-native init MyApp</code></pre><h3>Para Flutter</h3><pre><code>flutter create my_app\nflutter run</code></pre>',
'[{"id": 1, "title": "Qual comando verifica dependências no Flutter?", "type": "multiple_choice", "options": ["flutter check", "flutter doctor", "flutter verify", "flutter setup"], "correct": 1}]', 3);

-- Módulo 2: React Native
INSERT INTO modules (course_id, title, description, order_index) 
VALUES (@mobile_id, 'React Native', 'Desenvolvimento com React Native', 2);
SET @mobile_mod2 = LAST_INSERT_ID();

INSERT INTO lessons (module_id, title, description, content, exercises, order_index) VALUES
(@mobile_mod2, 'React Native Básico', 'Componentes, JSX e estrutura básica',
'<h2>React Native Básico</h2><h3>Componentes Principais</h3><p><strong>View:</strong> Container básico</p><p><strong>Text:</strong> Para exibir texto</p><p><strong>ScrollView:</strong> Para conteúdo rolável</p><p><strong>FlatList:</strong> Para listas otimizadas</p>',
'[{"id": 1, "title": "Qual componente é usado para exibir texto?", "type": "multiple_choice", "options": ["View", "Text", "Paragraph", "Label"], "correct": 1}]', 1),

(@mobile_mod2, 'Navegação em React Native', 'React Navigation e rotas',
'<h2>Navegação em React Native</h2><h3>React Navigation</h3><p>Biblioteca padrão para navegação em React Native</p><h3>Tipos de Navegação</h3><ul><li><strong>Stack:</strong> Pilha de telas</li><li><strong>Tab:</strong> Abas na parte inferior</li><li><strong>Drawer:</strong> Menu lateral</li></ul>',
'[{"id": 1, "title": "Qual é o tipo de navegação mais comum?", "type": "multiple_choice", "options": ["Stack", "Drawer", "Tab", "Modal"], "correct": 0}]', 2),

(@mobile_mod2, 'Hooks e State Management', 'useState, useEffect e Context API',
'<h2>Hooks em React Native</h2><h3>useState</h3><p>Hook para gerenciar estado local</p><h3>useEffect</h3><p>Hook para efeitos colaterais</p><h3>Context API</h3><p>Para compartilhar estado globalmente</p>',
'[{"id": 1, "title": "Qual hook é para efeitos colaterais?", "type": "multiple_choice", "options": ["useState", "useEffect", "useContext", "useReducer"], "correct": 1}]', 3);

-- Módulo 3: Flutter & Dart
INSERT INTO modules (course_id, title, description, order_index) 
VALUES (@mobile_id, 'Flutter & Dart', 'Desenvolvimento com Flutter', 3);
SET @mobile_mod3 = LAST_INSERT_ID();

INSERT INTO lessons (module_id, title, description, content, exercises, order_index) VALUES
(@mobile_mod3, 'Dart Fundamentos', 'Sintaxe e conceitos básicos de Dart',
'<h2>Dart Fundamentos</h2><h3>Tipos de Dados</h3><p>String, int, double, bool, List, Map</p><h3>Funções</h3><p>Funções com tipos de retorno, arrow functions, parâmetros nomeados</p>',
'[{"id": 1, "title": "Qual é a sintaxe de arrow function em Dart?", "type": "multiple_choice", "options": ["=>", "->", "~>", "=>"], "correct": 0}]', 1),

(@mobile_mod3, 'Widgets e UI em Flutter', 'Construindo interfaces com widgets',
'<h2>Widgets em Flutter</h2><h3>Widgets Comuns</h3><ul><li><strong>Scaffold:</strong> Estrutura básica</li><li><strong>Container:</strong> Box com padding/margin</li><li><strong>Row/Column:</strong> Layouts</li><li><strong>ListView:</strong> Lista rolável</li></ul>',
'[{"id": 1, "title": "Qual widget é para layout vertical?", "type": "multiple_choice", "options": ["Row", "Column", "Stack", "Flex"], "correct": 1}]', 2),

(@mobile_mod3, 'State Management em Flutter', 'StatefulWidget e Provider',
'<h2>State Management em Flutter</h2><h3>StatefulWidget</h3><p>Widget com estado mutável</p><h3>Provider Package</h3><p>Solução de state management escalável</p>',
'[{"id": 1, "title": "Qual método atualiza UI em StatefulWidget?", "type": "multiple_choice", "options": ["update()", "refresh()", "setState()", "rebuild()"], "correct": 2}]', 3);

-- ============================================
-- TRILHA: CLOUD & DEVOPS AVANÇADO
-- ============================================

SET @cloud_id = (SELECT id FROM courses WHERE title = 'Cloud & DevOps Avançado' LIMIT 1);

-- Módulo 1: Fundamentos Cloud
INSERT INTO modules (course_id, title, description, order_index) 
VALUES (@cloud_id, 'Fundamentos Cloud', 'Conceitos básicos de Cloud Computing', 1);
SET @cloud_mod1 = LAST_INSERT_ID();

INSERT INTO lessons (module_id, title, description, content, exercises, order_index) VALUES
(@cloud_mod1, 'Modelos de Cloud', 'IaaS, PaaS, SaaS e On-Premises',
'<h2>Modelos de Cloud</h2><h3>IaaS (Infrastructure as a Service)</h3><p>Você gerencia: aplicações, dados, runtime, middleware, SO</p><h3>PaaS (Platform as a Service)</h3><p>Você gerencia: aplicações, dados</p><h3>SaaS (Software as a Service)</h3><p>Você gerencia: nada (tudo é gerenciado pelo provedor)</p>',
'[{"id": 1, "title": "Em qual modelo você gerencia o SO?", "type": "multiple_choice", "options": ["SaaS", "PaaS", "IaaS", "Nenhum"], "correct": 2}]', 1),

(@cloud_mod1, 'Provedores Cloud Principais', 'AWS, Azure, GCP e alternativas',
'<h2>Provedores Cloud</h2><h3>AWS (Amazon Web Services)</h3><p>Maior provedor, maior variedade de serviços</p><h3>Azure (Microsoft)</h3><p>Integração com ecossistema Microsoft</p><h3>GCP (Google Cloud Platform)</h3><p>Foco em dados e machine learning</p>',
'[{"id": 1, "title": "Qual provedor tem maior variedade de serviços?", "type": "multiple_choice", "options": ["AWS", "Azure", "GCP", "IBM"], "correct": 0}]', 2),

(@cloud_mod1, 'Vantagens e Desafios da Cloud', 'Escalabilidade, custo, segurança',
'<h2>Vantagens da Cloud</h2><ul><li>Escalabilidade automática</li><li>Pay-as-you-go</li><li>Disponibilidade global</li><li>Segurança gerenciada</li></ul><h2>Desafios</h2><ul><li>Custo pode ser imprevisível</li><li>Lock-in do provedor</li><li>Complexidade de gerenciamento</li></ul>',
'[{"id": 1, "title": "Qual é uma vantagem da cloud?", "type": "multiple_choice", "options": ["Menor custo inicial", "Escalabilidade automática", "Sem necessidade de internet", "Sem latência"], "correct": 1}]', 3);

-- Módulo 2: Containerização
INSERT INTO modules (course_id, title, description, order_index) 
VALUES (@cloud_id, 'Containerização', 'Docker e containerização de aplicações', 2);
SET @cloud_mod2 = LAST_INSERT_ID();

INSERT INTO lessons (module_id, title, description, content, exercises, order_index) VALUES
(@cloud_mod2, 'Docker Fundamentos', 'Imagens, containers e Docker Compose',
'<h2>Docker</h2><h3>Imagem</h3><p>Template para criar containers</p><h3>Container</h3><p>Instância em execução de uma imagem</p><h3>Dockerfile</h3><p>Arquivo que define como construir uma imagem</p>',
'[{"id": 1, "title": "O que é um container Docker?", "type": "multiple_choice", "options": ["Uma máquina virtual", "Uma instância de imagem", "Um arquivo de configuração", "Um servidor"], "correct": 1}]', 1),

(@cloud_mod2, 'Orquestração com Kubernetes', 'Pods, Services, Deployments',
'<h2>Kubernetes</h2><h3>Pod</h3><p>Unidade mínima no Kubernetes</p><h3>Service</h3><p>Expõe pods para acesso externo</p><h3>Deployment</h3><p>Gerencia replicação de pods</p>',
'[{"id": 1, "title": "Qual é a unidade mínima no Kubernetes?", "type": "multiple_choice", "options": ["Container", "Pod", "Node", "Cluster"], "correct": 1}]', 2),

(@cloud_mod2, 'CI/CD Pipelines', 'GitHub Actions, GitLab CI, Jenkins',
'<h2>CI/CD</h2><h3>Continuous Integration</h3><p>Automatizar testes a cada commit</p><h3>Continuous Deployment</h3><p>Automatizar deploy em produção</p>',
'[{"id": 1, "title": "O que é CI/CD?", "type": "multiple_choice", "options": ["Código e Dados", "Integração e Deploy", "Configuração e Documentação", "Nenhuma"], "correct": 1}]', 3);

-- Módulo 3: Infraestrutura como Código
INSERT INTO modules (course_id, title, description, order_index) 
VALUES (@cloud_id, 'Infraestrutura como Código', 'Terraform, CloudFormation, Ansible', 3);
SET @cloud_mod3 = LAST_INSERT_ID();

INSERT INTO lessons (module_id, title, description, content, exercises, order_index) VALUES
(@cloud_mod3, 'Terraform Fundamentos', 'Definir infraestrutura com código',
'<h2>Terraform</h2><h3>HCL (HashiCorp Configuration Language)</h3><p>Linguagem declarativa para infraestrutura</p><h3>Providers</h3><p>Plugins para diferentes provedores (AWS, Azure, GCP)</p>',
'[{"id": 1, "title": "O que é Terraform?", "type": "multiple_choice", "options": ["Banco de dados", "Infraestrutura como Código", "Linguagem de programação", "Framework web"], "correct": 1}]', 1),

(@cloud_mod3, 'CloudFormation vs Terraform', 'Comparação e quando usar cada um',
'<h2>CloudFormation vs Terraform</h2><h3>CloudFormation</h3><p>Nativo da AWS, JSON/YAML</p><h3>Terraform</h3><p>Multi-cloud, HCL, mais flexível</p>',
'[{"id": 1, "title": "Qual é nativo da AWS?", "type": "multiple_choice", "options": ["Terraform", "CloudFormation", "Ansible", "Puppet"], "correct": 1}]', 2),

(@cloud_mod3, 'Monitoramento e Logging', 'CloudWatch, Datadog, ELK Stack',
'<h2>Monitoramento</h2><h3>CloudWatch</h3><p>Serviço de monitoramento da AWS</p><h3>Datadog</h3><p>Plataforma de observabilidade</p><h3>ELK Stack</h3><p>Elasticsearch, Logstash, Kibana</p>',
'[{"id": 1, "title": "O que é ELK Stack?", "type": "multiple_choice", "options": ["Linguagem de programação", "Elasticsearch, Logstash, Kibana", "Serviço da AWS", "Framework web"], "correct": 1}]', 3);

-- ============================================
-- TRILHA: SEGURANÇA & COMPLIANCE
-- ============================================

SET @security_id = (SELECT id FROM courses WHERE title = 'Segurança & Compliance' LIMIT 1);

-- Módulo 1: Fundamentos de Segurança
INSERT INTO modules (course_id, title, description, order_index) 
VALUES (@security_id, 'Fundamentos de Segurança', 'OWASP Top 10 e princípios de segurança', 1);
SET @security_mod1 = LAST_INSERT_ID();

INSERT INTO lessons (module_id, title, description, content, exercises, order_index) VALUES
(@security_mod1, 'OWASP Top 10', 'As 10 vulnerabilidades mais críticas',
'<h2>OWASP Top 10</h2><ol><li>Injection (SQL, Command, LDAP)</li><li>Broken Authentication</li><li>Sensitive Data Exposure</li><li>XML External Entities (XXE)</li><li>Broken Access Control</li><li>Security Misconfiguration</li><li>Cross-Site Scripting (XSS)</li><li>Insecure Deserialization</li><li>Using Components with Known Vulnerabilities</li><li>Insufficient Logging & Monitoring</li></ol>',
'[{"id": 1, "title": "Qual é a vulnerabilidade #1 do OWASP Top 10?", "type": "multiple_choice", "options": ["XSS", "Injection", "Authentication", "CSRF"], "correct": 1}]', 1),

(@security_mod1, 'Princípios de Segurança', 'Confidentiality, Integrity, Availability',
'<h2>Princípios CIA</h2><h3>Confidentiality</h3><p>Dados só acessíveis por pessoas autorizadas</p><h3>Integrity</h3><p>Dados não podem ser alterados sem autorização</p><h3>Availability</h3><p>Dados devem estar disponíveis quando necessário</p>',
'[{"id": 1, "title": "O que é Confidentiality?", "type": "multiple_choice", "options": ["Dados sempre disponíveis", "Dados só para autorizados", "Dados não alteráveis", "Nenhuma"], "correct": 1}]', 2),

(@security_mod1, 'Defesa em Profundidade', 'Múltiplas camadas de segurança',
'<h2>Defesa em Profundidade</h2><p>Não confie em uma única camada de segurança</p><ul><li>Firewall</li><li>Autenticação</li><li>Criptografia</li><li>Logging</li><li>Monitoramento</li></ul>',
'[{"id": 1, "title": "O que é Defesa em Profundidade?", "type": "multiple_choice", "options": ["Uma camada forte", "Múltiplas camadas", "Firewall apenas", "Criptografia apenas"], "correct": 1}]', 3);

-- Módulo 2: Criptografia
INSERT INTO modules (course_id, title, description, order_index) 
VALUES (@security_id, 'Criptografia', 'Simétrica, Assimétrica, Hashing', 2);
SET @security_mod2 = LAST_INSERT_ID();

INSERT INTO lessons (module_id, title, description, content, exercises, order_index) VALUES
(@security_mod2, 'Criptografia Simétrica', 'AES, DES, 3DES',
'<h2>Criptografia Simétrica</h2><p>Mesma chave para criptografar e descriptografar</p><h3>AES (Advanced Encryption Standard)</h3><p>Padrão atual, 128, 192 ou 256 bits</p><h3>DES/3DES</h3><p>Legado, não recomendado para novos projetos</p>',
'[{"id": 1, "title": "Qual é o padrão atual de criptografia simétrica?", "type": "multiple_choice", "options": ["DES", "3DES", "AES", "RSA"], "correct": 2}]', 1),

(@security_mod2, 'Criptografia Assimétrica', 'RSA, ECC, ECDSA',
'<h2>Criptografia Assimétrica</h2><p>Chave pública para criptografar, chave privada para descriptografar</p><h3>RSA</h3><p>Amplamente usado, baseado em fatoração</p><h3>ECC (Elliptic Curve Cryptography)</h3><p>Mais eficiente que RSA</p>',
'[{"id": 1, "title": "Qual é o algoritmo assimétrico mais usado?", "type": "multiple_choice", "options": ["AES", "RSA", "MD5", "SHA1"], "correct": 1}]', 2),

(@security_mod2, 'Hashing e Funções Hash', 'MD5, SHA, bcrypt',
'<h2>Hashing</h2><p>Função unidirecional que gera hash de dados</p><h3>MD5/SHA1</h3><p>Quebrados, não use para senhas</p><h3>SHA-256/SHA-512</h3><p>Seguros para dados</p><h3>bcrypt/Argon2</h3><p>Ideais para senhas (lento por design)</p>',
'[{"id": 1, "title": "Qual função é ideal para senhas?", "type": "multiple_choice", "options": ["MD5", "SHA-256", "bcrypt", "SHA1"], "correct": 2}]', 3);

-- Módulo 3: Autenticação & Autorização
INSERT INTO modules (course_id, title, description, order_index) 
VALUES (@security_id, 'Autenticação & Autorização', 'OAuth, JWT, SAML', 3);
SET @security_mod3 = LAST_INSERT_ID();

INSERT INTO lessons (module_id, title, description, content, exercises, order_index) VALUES
(@security_mod3, 'OAuth 2.0', 'Delegação de autenticação',
'<h2>OAuth 2.0</h2><p>Protocolo de autorização, não de autenticação</p><h3>Fluxo Authorization Code</h3><p>Mais seguro para aplicações web</p><h3>Fluxo Implicit</h3><p>Para SPAs, menos seguro</p>',
'[{"id": 1, "title": "OAuth 2.0 é um protocolo de?", "type": "multiple_choice", "options": ["Autenticação", "Autorização", "Criptografia", "Logging"], "correct": 1}]', 1),

(@security_mod3, 'JWT (JSON Web Tokens)', 'Tokens stateless para autenticação',
'<h2>JWT</h2><p>Token contém informações do usuário</p><h3>Estrutura</h3><p>Header.Payload.Signature</p><h3>Vantagens</h3><p>Stateless, escalável, mobile-friendly</p>',
'[{"id": 1, "title": "Qual é a estrutura de um JWT?", "type": "multiple_choice", "options": ["Header.Body", "Header.Payload.Signature", "Token.Data", "User.Password"], "correct": 1}]', 2),

(@security_mod3, 'SAML vs OAuth vs OpenID Connect', 'Comparação de protocolos',
'<h2>Comparação</h2><h3>SAML</h3><p>Enterprise, XML-based, autenticação</p><h3>OAuth</h3><p>Autorização, delegação</p><h3>OpenID Connect</h3><p>Camada de autenticação sobre OAuth</p>',
'[{"id": 1, "title": "Qual protocolo é mais usado em enterprise?", "type": "multiple_choice", "options": ["OAuth", "JWT", "SAML", "Basic Auth"], "correct": 2}]', 3);

-- ============================================
-- Verificação Final
-- ============================================

SELECT COUNT(*) as total_courses FROM courses;
SELECT COUNT(*) as total_modules FROM modules;
SELECT COUNT(*) as total_lessons FROM lessons;
