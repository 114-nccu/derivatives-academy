# Development Log

## 2026-11-16 — Initial Deliverable / AGENTS.md v1.0

**Changed**
- 建立 Derivatives Academy 首頁與深藍／青綠色共用設計系統。
- 完成 Options 101 Chapter 01 / 02。
- 完成 FX Forward、FX Vanilla Option、DCI 三篇七段商品教學頁；包含雙層分類標籤與內容稿。
- 完成四種基本選擇權部位的互動到期淨損益曲線及瀏覽器測試頁。
- 建立 AGENTS.md v1.0、可複用頁面模板、Node 結構／公式測試與 GitHub Actions CI。

**Tests**
- 2026-11-16 本機已執行：`node tests/payoff.test.cjs` → PASS（14 個案例、3 個輸入驗證）；`node tests/site.test.cjs` → PASS（3 篇商品、8 個公開頁面、116 個相對檔案連結）。JavaScript 語法檢查亦 PASS。
- 瀏覽器視覺驗收：自動化瀏覽器被執行環境限制攔截，未取得畫面截圖，無法宣稱真實瀏覽器／手機版已通過。

**Manual QA**
- 需檢查 375px、768px、1280px 無整頁橫向捲動及頁面導覽。
- 金融內容使用教學假設，仍應由提交者人工逐頁複核。

**Unverified / Not performed**
- 尚未上傳使用者自己的 GitHub Repository，亦尚未取得正式 GitHub Pages 公開 URL。
- 尚未在**新的獨立 AI 對話**執行 FX Swap 擴充實驗；因此沒有可報告的 v1→v1.1 實測差異或 Git Commit 證據。

**Next**
- 完成上述 QA；上傳並公開 Pages；在新 AI 開發對話執行 FX Swap 擴充測試，依實際問題更新 AGENTS.md。

## 2026-11-16 — 上傳前修正（仍為 AGENTS.md v1.0，尚未進行新對話擴充實驗）

**Changed**
- `tests/site.test.cjs`：改為自動掃描 `content/` 與 `products/`，不再寫死三個商品；移除「FX Swap 不可有連結」的寫死檢查（該檢查會讓新增 FX Swap 時測試必定失敗）。新增檢查：內容稿開頭欄位格式、內容稿與頁面分類一致、每個商品頁都有內容稿、首頁連到每個已發布商品、首頁 published／planned 計數、禁用「保本／穩賺／保證收益」宣傳用語。
- `content/*.md`：三份內容稿原本是由 HTML 去除標籤產生，表格與提示框被壓成一行。依現有 HTML 重新整理成可讀的 Markdown（表格、公式區塊、提示框、粗體、連結），並補上 `slug`、`level`、`summary` 欄位。文字內容與網頁一致，未改動金融內容。
- 新增 `templates/content-template.md`；`AGENTS.md` 第 0、2、3、7、8 節補上：內容稿欄位的確切格式、`draft／published` 狀態、首頁卡片與計數更新方式、「不得為了通過測試而修改測試」。
- `index.html`：移除首頁沒有資料意義的裝飾長條圖；計數由「3 published / 6 planned」更正為「3 published / 3 planned」。
- `products/fx-forward/index.html`：註明 31.85 為假設成交報價，與第 04 段理論值 31.844 不同的原因。
- `README.md`：移除與本專案無關的 Colab 字樣；檔案樹加入內容稿模板。

**Tests**
- `node tests/payoff.test.cjs` → PASS（14 個案例、3 個輸入驗證）；`node tests/site.test.cjs` → PASS（3 篇商品、8 個公開頁面）。
- 測試有效性模擬（在暫存副本進行，未保留）：正確新增 FX Swap（內容稿＋頁面＋首頁卡片＋計數）→ PASS；以下錯誤皆被擋下（exit 1）：忘記改首頁計數、頁面缺一段、內容稿欄位格式錯、只有頁面沒有內容稿、出現「保本」宣傳字眼、首頁沒有加卡片、內容稿與頁面分類不一致。
- 本機 Chrome（file://）以 375／768／1280px 開啟 8 個頁面：皆無整頁水平捲動、無 console 錯誤；`tests.html` 顯示 15 / 15 通過。

**Unverified / Not performed**
- 外部參考連結（BIS、SEC Investor.gov、OIC）尚未逐一確認網址與標題。
- 尚未上傳 GitHub、尚未取得 GitHub Pages 公開網址、尚未進行新對話 FX Swap 擴充實驗。

## 2026-11-16 — 第二次驗收後修正（仍為 AGENTS.md v1.0）

**Changed**
- `content/*.md`：7 個站內連結原本是以商品頁位置寫的相對路徑，在 `content/` 底下打不開；改為相對於 `content/` 的正確路徑（fx-forward 1 個、fx-vanilla-option 4 個、dci 2 個）。網頁 HTML 未改。
- `templates/content-template.md`、`AGENTS.md` 第 6 節：寫明內容稿與商品頁的相對路徑寫法不同，從內容稿做 HTML 時要換算。
- `tests/site.test.cjs`：新增檢查內容稿裡的站內連結；新增首頁「N 個完整商品」與「已上線：衍生性商品 X 項、結構型商品 Y 項」兩處數量檢查（依內容稿分類自動計算）。
- `AGENTS.md` 第 7 節：明列首頁三處數量與右側內容清單都要更新。

**Tests**
- `node tests/payoff.test.cjs` → PASS；`node tests/site.test.cjs` → PASS（3 篇商品、8 個頁面、116 個 HTML 連結、7 個 Markdown 連結）。
- 暫存副本模擬：正確新增 FX Swap → PASS（4 篇商品、8 個 Markdown 連結）；10 種錯誤皆被擋下（exit 1）：忘改 published 計數、忘改「N 個完整商品」、忘改分類數量、內容稿用了商品頁路徑、少一段、欄位格式錯、沒有內容稿、出現「穩賺」、首頁沒有卡片、分類不一致。

**仍未自動檢查（需人工）**
- 首頁右側內容清單（FX Forward／FX Option／DCI 列表）是否加上新商品。
- 內容稿與網頁的文字是否逐句一致；金融內容正確性由擁有者人工複核。

## 2026-11-16 — 網頁呈現調整（給讀者看的內容 vs 開發紀錄分開）

**Changed**
- 8 個頁面的頂部導覽移除「測試結果」，頁尾連結改名為「品質驗證」。
- `tests.html` 改為「品質驗證報告」：損益公式案例仍在瀏覽器即時執行；結構與版面列為「2026-11-16 本機檢查紀錄」並註明之後以 `log.md` 為準；移除「需要人工檢查」區塊（人工驗收清單保留在 `docs/QA.md`）。
- 首頁：「尚未開放，無死連結」改為「即將推出」；擴充說明改寫為讀者用語的「後續擴充路線」；按鈕改為「查看品質驗證」。

**Tests**
- `node tests/site.test.cjs` → PASS（3 篇商品、8 個頁面、108 個 HTML 連結〔少了 8 個導覽連結〕、7 個 Markdown 連結）；`node tests/payoff.test.cjs` → PASS。
- 本機 Chrome 375／768／1280px：8 個頁面無水平捲動、無 console 錯誤；品質驗證頁顯示 15 / 15 通過。

**Note**
- 品質驗證頁寫的是「數值範例已依公式驗算（AI 輔助）」，未宣稱擁有者人工複核。擁有者完成逐頁複核後，再更新該頁與本紀錄。

## 2026-11-16 — QA 紀錄與擴充規則澄清（AGENTS.md v1.0；非新對話擴充實驗）

**Changed**
- `AGENTS.md` 第 7 節：新增 QA Report 步驟，明確區分瀏覽器即時損益驗算與歷史檢查快照；只有對新版實際重測，才能更新快照的日期、商品／頁面數及通過範圍。未重測不得沿用舊結果宣稱新版已通過。
- `docs/QA.md`：說明 `[ ]` 是重複使用的當次驗收模板，歷次實際結果與未完成事項記在 `log.md`，並說明快照更新條件。
- `README.md`、`tests.html`：將「最近一次」改成明確的「帶日期的本機檢查歷史快照」，避免將舊紀錄誤讀為即時驗收。

**Tests**
- 本次僅調整文件及 `tests.html` 的說明文字，未變更商品金融數字、Payoff 公式、頁面架構或測試判斷條件。
- 本次在修改後重新執行 `node tests/payoff.test.cjs` → PASS（14 個損益案例＋3 個無效輸入檢查）；`node tests/site.test.cjs` → PASS（3 個已發布商品、8 個公開 HTML 頁、108 個 HTML 站內連結、7 個 Markdown 連結）。另外 `node --check` 檢查 `assets/test-browser.js`、`assets/payoff.js`、`assets/simulator.js` → PASS。

**Manual QA / Unverified**
- 本次修改未重新執行 Chrome 375／768／1280px 畫面驗收，也未重新進行金融內容人工複核；2026-11-16 先前紀錄保留為歷史檢查快照。
- GitHub Pages 正式網址與「新對話新增 FX Swap」實驗仍未執行；不得聲稱已完成。

## 2026-11-16 — 課堂參考與自行延伸的來源標註（文件更新；AGENTS.md 仍為 v1.0）

**Changed**
- `README.md`：新增「課堂參考與本專案延伸」對照表，區分課堂方法參考、專案設計與 AI 協作實作、後續驗收修訂；附講義頁碼與老師講義網站連結。
- `docs/COURSE_REFERENCE.md`：新增完整對照，說明沒有直接使用老師示範網站的 HTML/CSS/JS 程式碼，並保留 AI 協作與本人金融內容驗收責任的區別。
- `docs/SUBMISSION.md`：新增可直接用於繳交的第一人稱「課堂參考與自行延伸」說明。
- `AGENTS.md`：新增第 11 節，規定後續維護來源標註時不得誤述程式碼的取得方式或人工作業比例。

**Tests**
- 本次僅修改 Markdown 文件，未更動商品 HTML、CSS、JavaScript、測試程式或財務公式。
- `node tests/payoff.test.cjs` → PASS（14 個損益案例 + 3 個無效輸入檢查）。
- `node tests/site.test.cjs` → PASS（3 個已發布商品、8 個 HTML 頁面、108 個 HTML 連結、7 個 Markdown 連結）。
- 本次未重新執行瀏覽器畫面測試或金融內容人工驗收。

**Unverified**
- 未執行 GitHub Pages 發布或新對話 FX Swap 實驗；不得當作已完成。

## 2026-11-16 — 來源標註補正（文件更新；AGENTS.md 仍為 v1.0）

**Changed**
- `docs/COURSE_REFERENCE.md`、`README.md` 對照表、`docs/SUBMISSION.md`：補列實際參考過的來源——老師公開 repository `diveai-lab/diveai-lessons` 的 `CLAUDE.md`（規劃階段閱讀；參考「先寫內容稿再生成網頁」、`log.md` 變更紀錄、英文 slug、首頁入口卡片等規則寫法），並註明未複製其文字、程式碼、版型或素材。
- `docs/COURSE_REFERENCE.md`：刪除開頭提及其他作業的句子。

**Tests**
- 僅修改 Markdown 文件。`node tests/payoff.test.cjs` → PASS；`node tests/site.test.cjs` → PASS（3 個已發布商品、8 個 HTML 頁面、108 個 HTML 連結、7 個 Markdown 連結）。

## 2026-11-16 — 補強 AGENTS.md 網頁設計規範（文件更新，仍為 v1.0）

**Changed**
- `AGENTS.md` 第 6 節新增「6.1 視覺設計規範」，逐項對照 `assets/style.css` 既有色彩變數、字型、最大寬度、卡片與七段教學元件、資訊與風險配色、900px／650px 響應式斷點及鍵盤操作需求；原導覽與程式限制移至 6.2。
- 本次只補足 AI 開發者可沿用的視覺規則，未修改既有 HTML、CSS、JavaScript、金融內容或測試程式。

**Tests**
- `node tests/payoff.test.cjs` → PASS（14 個計算案例＋3 個無效輸入檢查）。
- `node tests/site.test.cjs` → PASS（3 個已發布商品、8 個 HTML 頁面、108 個 HTML 連結、7 個 Markdown 連結）。
- `node --check assets/payoff.js`、`node --check assets/simulator.js` → PASS。

**Manual QA / Unverified**
- 本次僅更新文件，未重新執行瀏覽器視覺檢查或金融內容人工複核；先前紀錄仍是歷史快照。
- 尚未由本次工作確認 GitHub Pages 公開部署；尚未在新對話完成 FX Swap 擴充實驗，因此 `AGENTS.md` 不標記為 v1.1。
