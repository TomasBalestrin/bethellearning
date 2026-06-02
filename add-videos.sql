-- Adicionar vídeos em todas as aulas que não têm
-- Trilha Intermediária - JavaScript
UPDATE lessons SET video_url = 'https://www.youtube.com/embed/PkZNo7MFNFg' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Intermediária%' AND l.title LIKE '%Variáveis%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/DHvZLI7Db8E' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Intermediária%' AND l.title LIKE '%Operadores%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/gigtS_5KOqo' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Intermediária%' AND l.title LIKE '%Funções%' LIMIT 1);

-- Trilha Intermediária - React
UPDATE lessons SET video_url = 'https://www.youtube.com/embed/SqcY0GlETPk' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Intermediária%' AND l.title LIKE '%Introdução ao React%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/0riS4qKBC84' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Intermediária%' AND l.title LIKE '%Componentes%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/1DKtIwXxaDc' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Intermediária%' AND l.title LIKE '%Estado%' LIMIT 1);

-- Trilha Intermediária - Bancos de Dados
UPDATE lessons SET video_url = 'https://www.youtube.com/embed/FR4KE9YKNZ4' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Intermediária%' AND l.title LIKE '%SQL%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/oa3xB0OnyIU' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Intermediária%' AND l.title LIKE '%Relacionamentos%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/d5wpJ5VimSU' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Intermediária%' AND l.title LIKE '%Índices%' LIMIT 1);

-- Trilha Avançada - Node.js
UPDATE lessons SET video_url = 'https://www.youtube.com/embed/TlB_eWDSMt4' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Avançada%' AND l.title LIKE '%Node%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/l8WPWK9mS5M' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Avançada%' AND l.title LIKE '%REST%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/2QQnTRYvhlw' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Avançada%' AND l.title LIKE '%Banco de Dados%' LIMIT 1);

-- Trilha Avançada - Arquitetura
UPDATE lessons SET video_url = 'https://www.youtube.com/embed/v_L9xjIJvXU' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Avançada%' AND l.title LIKE '%Padrões%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/j6ow-UemzBc' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Avançada%' AND l.title LIKE '%Microserviços%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/oJRIrNQOQ3s' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Avançada%' AND l.title LIKE '%Escalabilidade%' LIMIT 1);

-- Trilha Avançada - DevOps
UPDATE lessons SET video_url = 'https://www.youtube.com/embed/3c-iBn73dRM' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Avançada%' AND l.title LIKE '%Docker%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/VnvRFRk_51k' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Avançada%' AND l.title LIKE '%CI%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/W541erWGrWE' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Avançada%' AND l.title LIKE '%Monitoramento%' LIMIT 1);

-- Mobile Development
UPDATE lessons SET video_url = 'https://www.youtube.com/embed/fDcRZJiXzIU' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Mobile%' AND l.title LIKE '%Fundamentos%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/0-S5a0eS84c' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Mobile%' AND l.title LIKE '%React Native%' AND l.title LIKE '%Básico%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/1DKtIwXxaDc' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Mobile%' AND l.title LIKE '%React Native%' AND l.title LIKE '%Avançado%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/6sU8pIl6MyY' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Mobile%' AND l.title LIKE '%Flutter%' AND l.title LIKE '%Fundamentos%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/jM3VkXvPlgE' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Mobile%' AND l.title LIKE '%Flutter%' AND l.title LIKE '%UI%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/uI0Z8NUWUw0' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Mobile%' AND l.title LIKE '%Integração%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/nQBIUFHYnW0' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Mobile%' AND l.title LIKE '%Persistência%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/3ERiUWW3MYI' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Mobile%' AND l.title LIKE '%Publicação%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/K7xLMhQp8Ew' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Mobile%' AND l.title LIKE '%Otimização%' LIMIT 1);

-- Cloud & DevOps
UPDATE lessons SET video_url = 'https://www.youtube.com/embed/dEQjB8zF6Hy8' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Cloud%' AND l.title LIKE '%Fundamentos%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/ZccSNzP9OAc' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Cloud%' AND l.title LIKE '%AWS%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/eQAIojcsgRQ' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Cloud%' AND l.title LIKE '%Azure%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/BNHR6IQJKZw' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Cloud%' AND l.title LIKE '%Google Cloud%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/3c-iBn73dRM' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Cloud%' AND l.title LIKE '%Docker%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/X48VuDVv0Z0' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Cloud%' AND l.title LIKE '%Kubernetes%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/VnvRFRk_51k' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Cloud%' AND l.title LIKE '%CI%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/bLr_xDuEsLI' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Cloud%' AND l.title LIKE '%Infraestrutura%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/W541erWGrWE' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Cloud%' AND l.title LIKE '%Monitoramento%' LIMIT 1);

-- Segurança & Compliance
UPDATE lessons SET video_url = 'https://www.youtube.com/embed/bPiofmZAsi0' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Segurança%' AND l.title LIKE '%Fundamentos%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/jhXCTbFnK8o' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Segurança%' AND l.title LIKE '%Criptografia%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/2nnIHHLvYEw' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Segurança%' AND l.title LIKE '%Autenticação%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/GyAsCCAB228' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Segurança%' AND l.title LIKE '%APIs%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/V8j1grrqtqM' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Segurança%' AND l.title LIKE '%Banco de Dados%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/BkY_1aPR_5s' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Segurança%' AND l.title LIKE '%Frontend%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/8Y6mWhBF-ks' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Segurança%' AND l.title LIKE '%Compliance%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/4r1SCsNvzMY' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Segurança%' AND l.title LIKE '%Testes%' LIMIT 1);

UPDATE lessons SET video_url = 'https://www.youtube.com/embed/eFXHesPbNBI' 
WHERE id = (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.title LIKE '%Segurança%' AND l.title LIKE '%Resposta%' LIMIT 1);
