const express = require('express');
const { chromium } = require('playwright-chromium');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  const cidade = req.query.cidade || 'figueira-da-foz';
  const pagina = req.query.pagina || '1';

  const encodedCidade = encodeURIComponent(cidade);
  const url = `https://remax.pt/pt/comprar/imoveis/habitacao/coimbra/${encodedCidade}/r/t?s={"rg":"${cidade}"}&p=${pagina}&o=-PublishDate`;

  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const data = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.propertyCard'));
      return items.map(el => ({
        titulo: el.querySelector('.propertyCard-title')?.innerText?.trim() || null,
        preco: el.querySelector('.propertyCard-price')?.innerText?.trim() || null,
        imagem: el.querySelector('img')?.src || null,
        link: el.querySelector('a')?.href || null
      }));
    });

    await browser.close();
    res.json(data);
  } catch (err) {
    console.error('Erro no scraping:', err);
    res.status(500).json({ error: 'Erro no scraping' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});
