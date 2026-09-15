const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const svg = fs.readFileSync(__dirname + '/mock/_logo.svg', 'utf8').trim();
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 1 });
  await p.setContent(`<body style="margin:0"><div id="m" style="width:512px;height:512px">${svg.replace('<svg','<svg width="512" height="512"')}</div></body>`);
  await (await p.$('#m')).screenshot({ path: __dirname + '/../mockups/logo.png', omitBackground: true });
  // white wordmark tile for dark slides is drawn in pptx; also export a yellow bolt only
  await b.close(); console.log('logo done');
})();
