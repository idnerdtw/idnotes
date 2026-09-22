// Run with Node.js and Playwright/Chromium installed; no production data is changed.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
const notes = JSON.parse(fs.readFileSync(path.join(root, 'notes.json'), 'utf8'));
const fixtures = [
  {id: 'test-flu', title: '肺移植 A 型流感治療', updated: '2026-09-17', type: 'reading-note', takeaway: 'Fixture only', tags: ['移植', '流感', '抗病毒治療'], keywords: ['influenza'], url: 'notes/lung-tx-influenza-a.html'},
  {id: 'test-pjp', title: '非 HIV PJP 的輔助 corticosteroid', updated: '2026-09-20', type: 'reading-note', takeaway: 'Fixture only', tags: ['PJP', '類固醇', '重症'], keywords: ['PCP', 'hypoxemia'], url: 'notes/pic-nonhiv-pjp-steroid.html'}
];
const source = fs.readFileSync(path.join(root, 'search.js'), 'utf8');
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const target = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
  if (!target.startsWith(root + path.sep) || !fs.existsSync(target)) { res.writeHead(404).end(); return; }
  const types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json'};
  res.setHeader('Content-Type', (types[path.extname(target)] || 'text/plain') + '; charset=utf-8');
  res.end(fs.readFileSync(target));
});
(async () => {
  let browser;
  const errors = [];
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    browser = await chromium.launch({headless: true, executablePath: process.env.CHROMIUM_PATH || undefined});
    const page = await browser.newPage({viewport: {width: 1280, height: 1000}});
    page.on('pageerror', error => errors.push(error.message));
    const base = `http://127.0.0.1:${server.address().port}`;
    // Smoke-check the real published index before deterministic fixture cases.
    for (const prefix of ['', '/docs']) {
      await page.goto(base + prefix + '/');
      assert.equal(await page.locator('.card').count(), Math.min(20, notes.length));
    }
    await page.addInitScript(data => {
      Object.defineProperty(window, 'IDNOTES', {get: () => data, set: () => {}});
    }, fixtures);
    for (const entry of [base + '/', base + '/docs/', pathToFileURL(path.join(root, 'index.html')).href, pathToFileURL(path.join(root, 'docs/index.html')).href]) {
      await page.goto(entry);
      assert.equal(await page.locator('.card').count(), fixtures.length);
      assert.equal(await page.locator('.card h2 a').first().textContent(), '非 HIV PJP 的輔助 corticosteroid');
      assert.equal(await page.locator('#tag-cloud button').count(), 6);
      await page.locator('#q').fill('ＰＣＰ');
      assert.equal(await page.locator('.card').count(), 1);
      await page.locator('#q').press('ArrowDown');
      assert.equal(await page.locator('#q').getAttribute('aria-activedescendant'), 'suggest-0');
      await page.locator('#q').press('Escape');
      assert.equal(await page.locator('#suggest').isVisible(), false);
      await page.locator('#q').fill('');
      await page.locator('#tag-cloud button[data-tag="移植"]').click();
      assert.equal(await page.locator('.card').count(), 1);
      await page.locator('#q').fill('influenza');
      assert.equal(await page.locator('.card').count(), 1);
      await page.locator('#q').fill('PCP');
      assert.equal(await page.locator('.card').count(), 0);
      assert.equal(await page.locator('#tag-cloud button[data-tag="移植"]').textContent(), '移植 (0)');
      assert.equal(await page.locator('#active-tag button').isVisible(), true);
      await page.locator('#active-tag button').click();
      assert.equal(await page.locator('.card').count(), 1);
      await page.locator('[data-type="journal-club"]').click();
      assert.match(await page.locator('.empty-state').textContent(), /內容待補/);
      await page.locator('#clear-filters').click();
      assert.equal(await page.locator('.card').count(), fixtures.length);
      assert.equal(await page.locator('#q').inputValue(), '');
      await page.locator('.card-tags button').first().click();
      assert.equal(await page.locator('.card').count(), 1);
      await page.locator('#clear-filters').click();
      await page.locator('.topics summary').click();
      assert.equal(await page.locator('#tag-cloud').isVisible(), false);
      await page.locator('.topics summary').click();
      await page.locator('#q').fill('PJP hypoxemia');
      assert.equal(await page.locator('.card').count(), 1);
      await page.locator('#q').press('ArrowDown');
      await page.locator('#q').press('Enter');
      await page.waitForURL('**/notes/pic-nonhiv-pjp-steroid.html');
      assert.equal(await page.locator('h1').count(), 1);
    }
    for (const prefix of ['', '/docs']) {
      for (const note of notes) {
        const response = await page.request.get(base + prefix + '/' + note.url);
        assert.equal(response.status(), 200);
      }
    }
    // Simulate growth without modifying notes.json, production pages, or article URLs.
    const synthetic = Array.from({length: 45}, (_, i) => ({
      ...fixtures[0], id: `test-${i}`, title: `Fixture ${String(i).padStart(2, '0')}`,
      updated: i < 30 ? '2026-09-01' : '2026-09-21',
      tags: ['共通', `主題 ${i}`, '測試'], keywords: ['fixture', `unique${i}`]
    }));
    const context = await browser.newContext({viewport: {width: 375, height: 812}});
    await context.addInitScript(data => {
      Object.defineProperty(window, 'IDNOTES', {get: () => data, set: () => {}});
    }, synthetic);
    const large = await context.newPage();
    large.on('pageerror', error => errors.push(error.message));
    await large.goto(base + '/');
    assert.equal(await large.locator('.card').count(), 20);
    assert.equal(await large.locator('.card h2 a').first().textContent(), 'Fixture 30');
    assert.equal(await large.locator('#tag-cloud button:visible').count(), 16);
    assert.equal(await large.locator('#tag-cloud button[data-tag="共通"]').textContent(), '共通 (45)');
    await large.locator('#more-tags').click();
    assert.equal(await large.locator('#tag-cloud button:visible').count(), 47);
    await large.locator('#tag-cloud button[data-tag="主題 44"]').click();
    await large.locator('#more-tags').click();
    assert.equal(await large.locator('#tag-cloud button[data-tag="主題 44"]').isVisible(), true);
    assert.equal(await large.locator('.card').count(), 1);
    await large.locator('#clear-filters').click();
    await large.locator('#load-more').click();
    assert.equal(await large.locator('.card').count(), 40);
    assert.equal(await large.locator(':focus').textContent(), 'Fixture 05');
    await large.locator('#load-more').click();
    assert.equal(await large.locator('.card').count(), 45);
    assert.equal(await large.locator('#load-more').isVisible(), false);
    await large.locator('#q').fill('fixture');
    assert.equal(await large.locator('.card').count(), 20);
    assert.equal(await large.locator('#suggest [role=option]').count(), 8);
    await large.locator('#q').press('ArrowUp');
    assert.equal(await large.locator('#q').getAttribute('aria-activedescendant'), 'suggest-7');
    await large.locator('#q').press('Escape');
    assert.equal(await large.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await large.close();
    await context.close();
    await page.close();
    const preview = await browser.newPage({viewport: {width: 1280, height: 1000}});
    await preview.goto(base + '/');
    await preview.screenshot({path: path.join(os.tmpdir(), 'idnotes-desktop.png'), fullPage: true});
    await preview.setViewportSize({width: 375, height: 812});
    assert.equal(await preview.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await preview.screenshot({path: path.join(os.tmpdir(), 'idnotes-mobile.png'), fullPage: true});
    assert.deepEqual(errors, []);
    // Ensure the generated deployment uses exactly the verified implementation.
    assert.equal(fs.readFileSync(path.join(root, 'docs/search.js'), 'utf8'), source);
    console.log('PASS: root/docs + file://; aliases, topics/type intersections, reset, keyboard navigation, links, 45-article loading, tag expansion, mobile width, no browser errors.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
