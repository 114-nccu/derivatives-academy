'use strict';
// 補充測試：動態掃描公開頁與 Options 101，並交叉驗算「實際 HTML」中的教學數字。
// 不固定商品數、章節數或 planned 卡片數；未來新增頁面不必修改這支測試。
// 原有 payoff.test.cjs、site.test.cjs 保持不變。
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const has = p => fs.existsSync(path.join(root, p));
const directories = p => fs.readdirSync(path.join(root, p), { withFileTypes: true })
  .filter(d => d.isDirectory()).map(d => d.name).sort();
const chapters = directories('options-101').filter(d => /^chapter-\d{2}$/.test(d));
const products = directories('products');
const pages = ['index.html', 'tests.html', 'lab/index.html',
  ...chapters.map(d => `options-101/${d}/index.html`),
  ...products.map(d => `products/${d}/index.html`)];
const homepage = read('index.html');
const localLinks = new Set();

assert.ok(chapters.length >= 2, 'Options 101 must include the first two chapters');
for (let i = 0; i < chapters.length; i++) {
  assert.equal(chapters[i], `chapter-${String(i + 1).padStart(2, '0')}`, 'Options 101 chapter numbers must be consecutive');
}
const chapterPill = homepage.match(/(\d+)\s*\/\s*(\d+) chapters released/);
assert.ok(chapterPill, 'homepage chapter summary missing');
assert.equal(Number(chapterPill[1]), chapters.length, 'homepage published chapter count is stale');
assert.equal(Number(chapterPill[2]), chapters.length, 'homepage total chapter count is stale');

for (const p of pages) {
  assert.ok(has(p), `missing ${p}`);
  const html = read(p);
  assert.match(html, /<meta name="viewport"/, `${p}: mobile viewport missing`);
  assert.match(html, /不構成投資建議/, `${p}: educational disclaimer missing`);
  assert.match(html, /<footer class="footer"/, `${p}: footer missing`);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const match of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    const url = match[2];
    if (/^(?:https?:|mailto:)/.test(url)) continue;
    assert.ok(url && !url.startsWith('/'), `${p}: invalid relative link ${url}`);
    if (url.startsWith('#')) {
      assert.ok(ids.has(url.slice(1)), `${p}: missing anchor ${url}`);
      continue;
    }
    const [dest, hash] = url.split('#');
    const resolved = path.resolve(root, path.dirname(p), dest);
    assert.ok(resolved === root || resolved.startsWith(root + path.sep), `${p}: link escaped project root`);
    assert.ok(fs.existsSync(resolved), `${p}: broken local link ${url}`);
    if (hash) {
      assert.ok(fs.statSync(resolved).isFile(), `${p}: anchor target must be a file`);
      assert.ok(fs.readFileSync(resolved, 'utf8').includes(`id="${hash}"`), `${p}: broken anchor ${url}`);
    }
    localLinks.add(`${p}:${url}`);
  }
}
for (const chapter of chapters) {
  const p = `options-101/${chapter}/index.html`;
  const html = read(p);
  assert.ok(homepage.includes(`href="${p}"`), `${p}: homepage link missing`);
  const chapterNumber = chapter.slice(-2);
  assert.ok(html.includes(`CHAPTER ${chapterNumber}`), `${p}: chapter heading missing`);
  if (Number(chapterNumber) >= 3) {
    assert.ok((html.match(/class="article-section"/g) || []).length >= 5, `${p}: expected course sections`);
    assert.ok((html.match(/<details class="quiz">/g) || []).length >= 2, `${p}: expected expandable Q&A`);
  }
}
// 不禁止 planned 卡片。商品數量由原有 site.test.cjs 自動核對。

const removeTags = s => s.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&(?:nbsp|lt|gt);/g, ' ').replace(/\s+/g, ' ').trim();
const number = text => {
  const normalized = String(text).replace(/−/g, '-');
  const m = normalized.match(/[+-]?\s*(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?/);
  assert.ok(m, `cannot parse number from: ${text}`);
  const parsed = Number(m[0].replace(/[\s,]/g, ''));
  return /^\s*-(?:USD|TWD)/.test(normalized) ? -Math.abs(parsed) : parsed;
};
const close = (actual, expected, label, tol = 0.01) => {
  assert.ok(Math.abs(actual - expected) <= tol,
    `${label}: displayed value ${actual}, independently computed value ${expected}`);
};
const rowsIn = (html, uniqueHeader) => {
  const tables = [...html.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/g)].map(m => m[1]);
  const table = tables.find(t => removeTags(t).includes(uniqueHeader));
  assert.ok(table, `missing teaching table with ${uniqueHeader}`);
  return [...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)]
    .map(m => [...m[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/g)].map(c => removeTags(c[1])));
};
const getRow = (rows, prefix) => {
  const row = rows.find(r => r[0]?.includes(prefix));
  assert.ok(row, `missing row ${prefix}`);
  return row;
};
let verifiedCells = 0;

// IRS: derive from the assumptions printed on the page, compare every displayed cash-flow row.
{
  const page = read('products/irs/index.html');
  const terms = rowsIn(page, '名目本金 N');
  const N = number(getRow(terms, '名目本金 N')[1]);
  const fixed = number(getRow(terms, '交易方向')[1]) / 100;
  const alpha = number(getRow(terms, '單期計息比例 α')[1]);
  for (const [rateText, floatingText, fixedText, netText] of rowsIn(page, '本期淨現金流').slice(1)) {
    const rate = number(rateText) / 100;
    close(number(floatingText), N * rate * alpha, `IRS floating coupon at ${rateText}`);
    close(number(fixedText), -N * fixed * alpha, `IRS fixed coupon at ${rateText}`);
    close(number(netText), N * (rate - fixed) * alpha, `IRS net cash flow at ${rateText}`);
    verifiedCells += 3;
  }
}

// Commodity Swap: validate the HTML table against its own K, Q assumptions.
{
  const page = read('products/commodity-swap/index.html');
  const terms = rowsIn(page, '合約數量 Q');
  const Q = number(getRow(terms, '合約數量 Q')[1]);
  const K = number(getRow(terms, '固定價格 K')[1]);
  for (const [priceText, swapText, physicalText, totalText] of rowsIn(page, 'Swap 淨額（USD）').slice(1)) {
    const P = number(priceText);
    close(number(swapText), (K - P) * Q, `Commodity Swap cash flow at ${P}`);
    close(number(physicalText), P * Q, `Commodity physical sales at ${P}`);
    close(number(totalText), K * Q, `Commodity combined proceeds at ${P}`);
    verifiedCells += 3;
  }
}

// Chapter 03: premium = intrinsic + time value in every actual table row.
{
  const page = read('options-101/chapter-03/index.html');
  for (const [kind, spotText, strikeText, premiumText, intrinsicText, timeText]
    of rowsIn(page, '時間價值').slice(1)) {
    const S = number(spotText), K = number(strikeText), premium = number(premiumText);
    const intrinsic = kind.toLowerCase().includes('put') ? Math.max(K-S,0) : Math.max(S-K,0);
    close(number(intrinsicText), intrinsic, `Ch03 ${kind}: intrinsic`);
    close(number(timeText), premium-intrinsic, `Ch03 ${kind}: time value`);
    verifiedCells += 2;
  }
}

// Chapter 04: validate the numbers displayed in the first- and second-order formula.
{
  const formula = removeTags(read('options-101/chapter-04/index.html'));
  const first = formula.match(/Delta × ΔS\s*=\s*([\d.]+)\s*×\s*([\d.]+)\s*=\s*\+?USD\s*([\d.]+)/);
  const second = formula.match(/([\d.]+)×([\d.]+)\s*\+\s*([\d.]+)×([\d.]+)×([\d.]+)²\s*=\s*\+?USD\s*([\d.]+)/);
  assert.ok(first && second, 'Ch04: displayed Delta/Gamma formulas not found');
  close(Number(first[3]),Number(first[1])*Number(first[2]), 'Ch04 Delta approximation');
  close(Number(second[6]),Number(second[1])*Number(second[2]) + Number(second[3])*Number(second[4])*Number(second[5])**2, 'Ch04 second-order approximation');
  verifiedCells += 2;
}

// Chapter 05: cross-check spread table and both protective-put examples shown in prose.
{
  const page = read('options-101/chapter-05/index.html');
  const formula = removeTags(page);
  const spread = formula.match(/Spread 到期 Net P&L\s*=\s*max\(Sₜ[−-](\d+),0\)\s*[−-]\s*max\(Sₜ[−-](\d+),0\)\s*[−-]\s*(\d+)/);
  assert.ok(spread, 'Ch05: spread formula not found');
  const [,lower,upper,debit] = spread.map(Number);
  for (const [spotText, payoffText, pnlText] of rowsIn(page, '兩腿 Payoff 合計').slice(1)) {
    const S = number(spotText), payoff = Math.max(S-lower,0)-Math.max(S-upper,0);
    close(number(payoffText),payoff,`Ch05 spread payoff at ${S}`);
    close(number(pnlText),payoff-debit,`Ch05 spread P&L at ${S}`);
    verifiedCells += 2;
  }
  const protective = formula.match(/Protective Put Net P&L\s*=\s*\(Sₜ\s*[−-]\s*(\d+)\)\s*\+\s*max\((\d+)\s*[−-]\s*Sₜ,0\)\s*[−-]\s*(\d+)/);
  assert.ok(protective,'Ch05 protective put formula not found');
  const [,purchase,putStrike,premium] = protective.map(Number);
  const examples = [...formula.matchAll(/若 Sₜ = USD\s*([\d,]+)[\s\S]*?合計\s*([+−-]?)USD\s*([\d,]+)／股/g)];
  assert.equal(examples.length,2,'Ch05: expected both protective put prose examples');
  for (const match of examples) {
    const S=number(match[1]), displayed=number((match[2]||'')+match[3]);
    close(displayed,(S-purchase)+Math.max(putStrike-S,0)-premium,`Ch05 protective put at ${S}`);
    verifiedCells++;
  }
}

// Chapter 06: compare printed FX option/forward scenario table with the input assumptions.
{
  const page = read('options-101/chapter-06/index.html');
  const formula = removeTags(page);
  const forward = formula.match(/遠期換匯成本\s*=\s*USD\s*([\d,]+)\s*×\s*([\d.]+)\s*=\s*TWD\s*([\d,]+)/);
  const option = formula.match(/買 USD Call 的簡化到期換匯成本\s*=\s*USD\s*([\d,]+)\s*×\s*\[min\(Sₜ,\s*([\d.]+)\)\s*\+\s*([\d.]+)\]/);
  assert.ok(forward && option,'Ch06: FX formulas not found');
  const N = number(forward[1]), K=Number(forward[2]), premium=Number(option[3]);
  close(number(forward[3]),N*K,'Ch06 forward headline example');
  close(number(option[1]),N,'Ch06 notional consistency',0);
  close(Number(option[2]),K,'Ch06 strike consistency',0);
  verifiedCells += 3;
  for (const [spotText, forwardText, optionText] of rowsIn(page, 'Option 方案').slice(1)) {
    const S=number(spotText);
    close(number(forwardText),N*K,`Ch06 forward at ${S}`);
    close(number(optionText),N*(Math.min(S,K)+premium),`Ch06 option at ${S}`);
    verifiedCells += 2;
  }
}

console.log(`PASS: ${pages.length} HTML pages / ${chapters.length} Options 101 chapters / ${products.length} products / ${localLinks.size} local links / ${verifiedCells} verified displayed financial values`);
