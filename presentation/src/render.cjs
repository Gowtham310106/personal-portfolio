const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
const DIR = __dirname + '/mock';
const logo = fs.readFileSync(DIR + '/_logo.svg', 'utf8').trim();

(async () => {
  const files = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  for (const f of files) {
    const src = fs.readFileSync(path.join(DIR, f), 'utf8').split('__LOGO__').join(logo);
    const tmp = path.join(DIR, '_r_' + f);
    fs.writeFileSync(tmp, src);
    await page.goto('file://' + tmp);
    await page.waitForTimeout(300);
    const ids = await page.$$eval('section.board', els => els.map(e => e.id));
    for (const id of ids) {
      const el = await page.$('#' + id);
      await el.screenshot({ path: `${__dirname}/../mockups/${id}.png` });
      console.log('rendered', id);
    }
    fs.unlinkSync(tmp);
  }
  await browser.close();
})();
