// install-browsers.js
const { installBrowsersForNpmInstall } = require('@playwright/test/lib/install/installer');

installBrowsersForNpmInstall()
  .then(() => {
    console.log('✅ Browsers Playwright instalados com sucesso!');
  })
  .catch((err) => {
    console.error('❌ Erro ao instalar browsers Playwright:', err);
    process.exit(1);
  });
