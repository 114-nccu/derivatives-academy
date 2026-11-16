'use strict';
// 網站結構與連結檢查。商品清單「自動」從 products/ 與 content/ 掃描，新增商品時不需要修改本檔。
// 規則來源：AGENTS.md 第 2、3、4、6 節。若測試失敗，請修正內容或頁面，不要為了通過而修改本檔。
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const exists = f => fs.existsSync(path.join(root, f));
const mustExist = f => assert.ok(exists(f), `missing ${f}`);

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TYPES = ['derivative', 'structured'];
const MARKETS = ['fx', 'rates', 'commodity', 'equity'];
const SECTIONS = ['overview', 'structure', 'payoff', 'pricing', 'cases', 'risks', 'qa'];
const MD_HEADINGS = [
  '## 01. Product Overview｜商品介紹',
  '## 02. Product Structure｜交易結構',
  '## 03. Payoff & P&L｜損益分析',
  '## 04. Pricing Drivers｜定價因子',
  '## 05. Use Cases｜應用情境',
  '## 06. Risk Analysis｜風險分析',
  '## 07. Practical Q&A｜實務問答'
];

// 讀取內容稿開頭的欄位：- key: `value`
function readMeta(md, file) {
  const meta = {};
  for (const m of md.matchAll(/^- ([a-z_]+): `([^`]*)`\s*$/gm)) meta[m[1]] = m[2];
  for (const key of ['slug', 'product_type', 'market', 'status', 'numeric_examples']) {
    assert.ok(meta[key] !== undefined, `${file} 開頭缺少欄位「- ${key}: \`...\`」（格式見 templates/content-template.md）`);
  }
  return meta;
}

// ---------- 1. 必要檔案 ----------
for (const f of ['index.html', 'AGENTS.md', 'README.md', 'log.md', '.nojekyll', 'tests.html', 'lab/index.html',
  'options-101/chapter-01/index.html', 'options-101/chapter-02/index.html', 'assets/style.css', 'assets/payoff.js',
  'templates/product-template.html', 'templates/content-template.md']) mustExist(f);

// ---------- 2. 自動掃描商品 ----------
const pageSlugs = fs.readdirSync(path.join(root, 'products'), { withFileTypes: true })
  .filter(d => d.isDirectory()).map(d => d.name).sort();
const contentSlugs = fs.readdirSync(path.join(root, 'content'))
  .filter(f => f.endsWith('.md') && f !== 'README.md').map(f => f.replace(/\.md$/, '')).sort();

const homepage = read('index.html');
const published = [];
const publishedTypes = [];
const contentFiles = [];

for (const slug of contentSlugs) {
  const file = `content/${slug}.md`;
  assert.match(slug, SLUG, `${file}：檔名不符合 slug 規則`);
  const md = read(file);
  contentFiles.push(file);
  const meta = readMeta(md, file);
  assert.equal(meta.slug, slug, `${file}：slug 欄位必須等於檔名`);
  assert.ok(TYPES.includes(meta.product_type), `${file}：product_type 必須是 ${TYPES.join('/')}`);
  assert.ok(MARKETS.includes(meta.market), `${file}：market 必須是 ${MARKETS.join('/')}`);
  assert.ok(['draft', 'published'].includes(meta.status), `${file}：status 必須是 draft 或 published`);
  assert.equal(meta.numeric_examples, 'hypothetical', `${file}：numeric_examples 必須是 hypothetical`);

  // 七個標題齊全且順序正確
  let last = -1;
  for (const h of MD_HEADINGS) {
    const at = md.indexOf(h);
    assert.ok(at >= 0, `${file}：缺少標題「${h}」`);
    assert.ok(at > last, `${file}：標題「${h}」順序錯誤`);
    last = at;
  }

  const pagePath = `products/${slug}/index.html`;
  if (meta.status === 'draft') {
    assert.ok(!homepage.includes(`href="${pagePath}"`), `${file} 仍是 draft，首頁不可連到 ${pagePath}`);
    continue;
  }
  // published：頁面必須存在且與內容稿一致
  mustExist(pagePath);
  const html = read(pagePath);
  assert.ok(html.includes(`data-product-type="${meta.product_type}"`), `${pagePath}：data-product-type 與內容稿不一致`);
  assert.ok(html.includes(`data-market="${meta.market}"`), `${pagePath}：data-market 與內容稿不一致`);
  const sections = [...html.matchAll(/data-section="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(sections, SECTIONS, `${pagePath}：七段 data-section 缺漏或順序錯誤`);
  for (const id of SECTIONS) assert.ok(html.includes(`id="${id}"`), `${pagePath}：缺少 id="${id}"`);
  assert.ok(!/TODO/.test(html), `${pagePath}：仍有模板 TODO 未替換`);
  assert.ok(homepage.includes(`href="${pagePath}"`), `index.html：缺少連到 ${pagePath} 的已上線卡片`);
  published.push(slug);
  publishedTypes.push(meta.product_type);
}

// products/ 底下每個資料夾都必須有內容稿（先寫稿再做 HTML）
for (const slug of pageSlugs) {
  assert.ok(contentSlugs.includes(slug), `products/${slug}/ 沒有對應的 content/${slug}.md`);
  assert.ok(published.includes(slug), `products/${slug}/ 已有頁面，但 content/${slug}.md 的 status 不是 published`);
}

// 首頁計數與實際一致
const countPill = homepage.match(/(\d+) published \/ (\d+) planned/);
assert.ok(countPill, 'index.html：找不到「N published / M planned」計數');
assert.equal(Number(countPill[1]), published.length, `index.html：published 數字應為 ${published.length}`);
const plannedLibraryCards = (homepage.split('id="library"')[1] || '').split('</section>')[0]
  .match(/class="card card--planned"/g) || [];
assert.equal(Number(countPill[2]), plannedLibraryCards.length, `index.html：planned 數字應為 ${plannedLibraryCards.length}`);

// 首頁另外兩處數量：「N 個完整商品」「已上線：衍生性商品 X 項、結構型商品 Y 項」
const totalPill = homepage.match(/(\d+) 個完整商品/);
assert.ok(totalPill, 'index.html：找不到「N 個完整商品」');
assert.equal(Number(totalPill[1]), published.length, `index.html：「個完整商品」應為 ${published.length}`);
const byType = homepage.match(/已上線：衍生性商品 (\d+) 項、結構型商品 (\d+) 項/);
assert.ok(byType, 'index.html：找不到「已上線：衍生性商品 X 項、結構型商品 Y 項」');
const nDerivative = publishedTypes.filter(t => t === 'derivative').length;
const nStructured = publishedTypes.filter(t => t === 'structured').length;
assert.equal(Number(byType[1]), nDerivative, `index.html：已上線衍生性商品應為 ${nDerivative} 項`);
assert.equal(Number(byType[2]), nStructured, `index.html：已上線結構型商品應為 ${nStructured} 項`);

// 內容稿裡的站內連結：以 content/ 為基準必須能打開
let mdLinks = 0;
for (const file of contentFiles) {
  const md = read(file).replace(/<!--[\s\S]*?-->/g, '');
  for (const m of md.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|#)/.test(url)) continue;
    assert.ok(!url.startsWith('/'), `${file}：不可使用 / 開頭的絕對路徑：${url}`);
    const resolved = path.resolve(root, path.dirname(file), url.split('#')[0]);
    assert.ok(fs.existsSync(resolved), `${file}：連結失效（路徑要相對於 content/）：${url}`);
    mdLinks++;
  }
}

// ---------- 3. 所有公開頁面：聲明、viewport、相對連結 ----------
const pages = ['index.html', 'tests.html', 'lab/index.html', 'options-101/chapter-01/index.html',
  'options-101/chapter-02/index.html', ...published.map(s => `products/${s}/index.html`)];
let links = 0;
for (const file of pages) {
  const html = read(file);
  assert.match(html, /不構成投資建議/, `${file}：缺少「不構成投資建議」聲明`);
  assert.match(html, /<meta name="viewport"/, `${file}：缺少 mobile viewport`);
  // 允許的否定寫法：「非保本」「不是…保本」「不得／不可…「保本」」；其餘出現即視為宣傳用語
  const stripped = html.replace(/<[^>]+>/g, '')
    .replace(/非保本|不是一般保本|(不可|不得)[^。；]{0,12}「保本」「穩賺」「保證收益」/g, '');
  assert.ok(!/保本|穩賺|保證收益/.test(stripped),
    `${file}：出現「保本／穩賺／保證收益」字眼（只允許出現在否定的風險警示中）`);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]));
  for (const [, , url] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:)/.test(url)) continue;
    assert.ok(!url.startsWith('/'), `${file}：不可使用 / 開頭的絕對路徑：${url}`);
    assert.ok(url !== '#' && url !== '', `${file}：有空連結`);
    if (url.startsWith('#')) { assert.ok(ids.has(url.slice(1)), `${file}：找不到錨點 ${url}`); continue; }
    const [dest, hash] = url.split('#');
    const resolved = path.resolve(root, path.dirname(file), dest || '.');
    assert.ok(resolved === root || resolved.startsWith(root + path.sep), `${file}：連結超出專案：${url}`);
    assert.ok(fs.existsSync(resolved), `${file}：連結失效：${url}`);
    if (hash) {
      const target = fs.statSync(resolved).isFile() ? fs.readFileSync(resolved, 'utf8') : '';
      assert.ok(target.includes(`id="${hash}"`), `${file}：${url} 的目標頁找不到 #${hash}`);
    }
    links++;
  }
}

console.log(`PASS: ${published.length} published products (${published.join(', ')}) / ${pages.length} public pages / ${links} HTML links / ${mdLinks} Markdown links`);
