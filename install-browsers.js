const { execSync } = require('child_process');

try {
  console.log('⏳ A instalar browsers do Playwright...');
  execSync('npx playwright install chromium', { stdio: 'inherit' });
  console.log('✅ Chromium instalado com sucesso!');
} catch (err) {
  console.error('❌ Erro ao instalar browsers do Playwright:', err);
  process.exit(1);
}
