import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const hashedPassword = await bcrypt.hash('Gaiano12@', 10);

try {
  await conn.execute(
    'INSERT INTO users (openId, email, password, name, role, createdAt, updatedAt, lastSignedIn) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), NOW())',
    ['admin-tomasbalestrin', 'tomasbalestrin@gmail.com', hashedPassword, 'Tomas Balestrin', 'admin']
  );
  console.log('✅ Usuário admin criado com sucesso!');
  console.log('📧 Email: tomasbalestrin@gmail.com');
  console.log('🔑 Senha: Gaiano12@');
  console.log('👑 Role: admin');
} catch (err) {
  if (err.code === 'ER_DUP_ENTRY') {
    console.log('⚠️ Usuário já existe. Atualizando senha e role...');
    await conn.execute(
      'UPDATE users SET password = ?, role = ?, name = ?, openId = ?, updatedAt = NOW() WHERE email = ?',
      [hashedPassword, 'admin', 'Tomas Balestrin', 'admin-tomasbalestrin', 'tomasbalestrin@gmail.com']
    );
    console.log('✅ Usuário atualizado com sucesso!');
    console.log('📧 Email: tomasbalestrin@gmail.com');
    console.log('🔑 Senha: Gaiano12@');
    console.log('👑 Role: admin');
  } else {
    console.error('❌ Erro:', err);
  }
}

await conn.end();
process.exit(0);
