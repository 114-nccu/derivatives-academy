# Derivatives Academy｜衍生性金融商品互動知識庫

**Learn the Structure. Understand the Risk.**

這是一個可直接部署至 **GitHub Pages** 的繁體中文靜態教學網站，使用原生 HTML、CSS、JavaScript，**不需要 API Key、套件安裝或建置程序**。

## 網站內容

- **Options 101**：第 1 章選擇權基本概念、第 2 章四大部位與到期損益；第 3–6 章在首頁標示為「規劃中」。
- **三篇完整商品頁**：FX Forward、FX Vanilla Option、DCI。每頁都具統一七段（Product Overview → Product Structure → Payoff & P&L → Pricing Drivers → Use Cases → Risk Analysis → Practical Q&A）。
- **Option Payoff Lab**：四種選擇權部位、即時可調參數與到期淨損益曲線。
- **雙層分類**：`derivative / structured` × `fx / rates / commodity / equity`。
- **品質驗證頁**：`tests.html`（網頁頁尾「品質驗證」）在瀏覽器即時執行 15 項固定測試；右側為標註日期的本機檢查**歷史快照**，後續版本的實際驗收結果以 `log.md` 為準。
- **規則與擴充**：`AGENTS.md` 規定 AI 新增商品的準備、內容、檔案、檢查及回報流程。

## 課堂參考與本專案延伸（來源標註）

本專案的**工作方法**參考老師第九週《換你當老闆：Agentic Work 與 AI 工作現場》與課堂「呆一布講義」範例；**不是**直接下載、Fork 或改寫老師示範網站的原始碼。網站內容、專案專用規則、互動功能與驗收腳本，則是依本作業主題重新規劃，並在 AI 輔助下完成。以下標示參考的概念與本專案實際延伸的部分，不將「參考開發方法」誤寫成「沿用程式碼」。

| 標註 | 老師課堂的概念或範例 | 本專案如何應用／延伸 |
|---|---|---|
| **【課堂方法參考】** | 第 18 頁：交辦時說明「成品、限制、驗收」 | `AGENTS.md` 明定商品頁成品格式、禁止事項、可執行測試及人工檢查 |
| **【課堂方法參考】** | 第 22–24 頁：以 `AGENTS.md`／`CLAUDE.md` 保存專案規則，讓新工作能先讀取 | 建立本專案的 `AGENTS.md`，規範先讀文件、先有內容稿，再新增頁面及記錄變更 |
| **【課堂方法參考】** | 老師公開 repo `diveai-lab/diveai-lessons` 的 `CLAUDE.md`：先寫內容稿再生成網頁、`log.md` 變更紀錄、英文 slug、新頁面加首頁卡片 | `AGENTS.md` 第 3、6、7 節採用相同的工作順序與紀錄方式，內容依金融教學重新撰寫，未複製其文字或程式碼 |
| **【課堂方法參考】** | 第 26–28 頁：「呆一布講義」以規則檔、內容、素材、網頁分工 | 依金融教學需求區分 `content/`、`products/`、`templates/`、`assets/`；未複製示範網站版型或素材 |
| **【本專案設計與 AI 協作實作】** | — | 衍生性金融商品主題、雙層分類、固定七段商品內容、Options 101、三個商品教學頁 |
| **【本專案設計與 AI 協作實作】** | — | 四種選擇權部位的 Payoff Lab、公式測試、網站結構及站內連結檢查 |
| **【後續修訂與驗收】** | 課堂強調明確驗收與持續改善規則 | 將自動檢查與人工檢查分開、修正 Markdown 路徑、改善品質驗證頁；各次實際修改見 `log.md` |

**課堂參考資料：** 老師提供的《09 換你當老闆》PDF（上述頁碼）；[課堂「呆一布講義」展示網站](https://diveai-lab.github.io/diveai-lessons/)（PDF 第 28 頁提供的連結）；該網站的公開 repository [`diveai-lab/diveai-lessons`](https://github.com/diveai-lab/diveai-lessons) 中的 `CLAUDE.md`。更詳細的來源對照與標註原則見 [`docs/COURSE_REFERENCE.md`](docs/COURSE_REFERENCE.md)。

> 本專案採用 AI 協作開發；「自行設計與延伸」是指本作業的選題、規格與成果，不表示每一行程式均由本人手寫。金融內容的最終核實與公開發布仍由專案擁有者負責。

## 如何先在電腦上看網站

下載或解壓縮後，直接用瀏覽器開啟根目錄 `index.html`。所有站內連結使用相對路徑，沒有外部依賴。互動工具與瀏覽器測試可以在本機直接開啟。

也可以在專案資料夾執行 `python -m http.server 8000`，再開啟 `http://localhost:8000/`。

## 如何上傳 GitHub 並公開 GitHub Pages

### 方法 A：GitHub Desktop（方便確認整個資料夾結構）

1. 解壓縮後，確認 `index.html`、`AGENTS.md`、`README.md` 在 **derivatives-academy 的根目錄**。
2. 使用 GitHub Desktop 將此資料夾建立為 Repository（例如 `derivatives-academy`），Commit 後 Publish Repository，設為 **Public**。
3. 在 GitHub 網站中進入該 Repository → **Settings → Pages**。
4. **Build and deployment → Source = Deploy from a branch**。
5. **Branch = main / (root)** → Save。
6. 待 GitHub Pages 發布後按 **Visit site**，實際確認首頁、商品頁、模擬器與 `tests.html` 都能打開。

### 方法 B：終端機（已設定 git + GitHub 驗證時）

請先在 GitHub 網站建立同名 **Public** 空 Repository，再於本專案根目錄執行：

```bash
git init
git add .
git commit -m "Initial Derivatives Academy website and AGENTS rules"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/derivatives-academy.git
git push -u origin main
```

`YOUR_USERNAME` 必須換成**你自己的 GitHub 帳號**。上面命令不會替你建立 GitHub 遠端 Repo，也不會自動啟用 Pages；請再依方法 A 的 Steps 3–6 設定。

**提醒：不能直接把 ZIP 當作網站上傳**；應先解壓縮，確保 GitHub Repository 的根目錄看得到 `index.html` 和各子資料夾。GitHub 網頁的 Upload files 功能在不同瀏覽器對資料夾拖曳支援可能不同，若檔案結構沒有完整保留，請使用 GitHub Desktop 或 git 指令。

公開網址通常是：`https://YOUR_USERNAME.github.io/derivatives-academy/`，須待實際發布後才可填入繳交內容。

官方指南：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 可執行驗收

**不需要 Node：** 用瀏覽器開啟 `tests.html`，預期顯示 `15 / 15 項通過`。

**若已安裝 Node：** 在專案根目錄執行：

```bash
node tests/payoff.test.cjs
node tests/site.test.cjs
```

GitHub Actions 會在每次 push/PR 時執行這兩項 Node 測試；瀏覽器 `tests.html` 仍需自行開啟，手機版與金融內容仍需人工確認。完整清單見 `docs/QA.md`。

## AI 如何繼續擴充？

將 Repo 交給可讀寫本機檔案的 AI 開發工具，在**新的對話**要求：

> 請先完整閱讀 AGENTS.md、README.md、log.md，然後為本網站新增 FX Swap 商品頁。依七段標準完成內容稿與網頁，填入兩層分類，更新首頁入口、執行測試，最後列出修改檔案與仍需我人工核實的金融內容。

AI 應依規則處理檔案與測試，但**金融正確性、網站驗收與最終發布都需由專案擁有者確認**。參考 `AGENTS.md` 第 7–10 節。

## 專案檔案

```text
.
├── index.html
├── AGENTS.md
├── README.md
├── log.md
├── tests.html
├── .nojekyll
├── .github/workflows/ci.yml
├── assets/
│   ├── style.css
│   ├── main.js
│   ├── payoff.js
│   ├── simulator.js
│   └── test-browser.js
├── options-101/
│   ├── chapter-01/index.html
│   └── chapter-02/index.html
├── products/
│   ├── fx-forward/index.html
│   ├── fx-vanilla-option/index.html
│   └── dci/index.html
├── lab/index.html
├── content/
│   ├── README.md
│   ├── fx-forward.md
│   ├── fx-vanilla-option.md
│   └── dci.md
├── templates/
│   ├── content-template.md
│   └── product-template.html
├── tests/
│   ├── test-cases.js
│   ├── payoff.test.cjs
│   └── site.test.cjs
└── docs/
    ├── QA.md
    ├── COURSE_REFERENCE.md
    └── SUBMISSION.md
```

## 重要聲明

- 網站用於教育，不提供個別投資建議或即時報價。
- 網站所有數字示例均為**假設數據**，不是實際銀行或客戶資料。
- DCI 示例只呈現特定假設契約，不代表所有 DCI 的結構或轉換規則。
- 尚未取得使用者 GitHub Repository；此壓縮包本身**不是已部署的網站**。
