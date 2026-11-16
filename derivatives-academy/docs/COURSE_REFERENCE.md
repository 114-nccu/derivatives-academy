# 課堂來源與自行延伸對照｜Derivatives Academy

> 本專案**未直接沿用老師示範網站的程式碼**，因此以下列三類標註來源：**【課堂方法參考】／【本專案設計與 AI 協作實作】／【後續修訂與驗收】**。

## 一、參考來源與範圍

1. 老師提供的課堂講義《09 換你當老闆：Agentic Work 與 AI 工作現場》：
   - **第 3、14–16 頁**：AI Agent 與 Harness 的概念，以及規則檔在開發環境中的角色。
   - **第 18–19 頁**：交辦工作須明確說明成品、限制、驗收方式。
   - **第 21–24 頁**：建立專案資料夾、使用 `AGENTS.md`／`CLAUDE.md`、新工作先讀取規則。
   - **第 26–28 頁**：「呆一布講義」的示範資料夾與公開網站成果。
2. 講義第 28 頁的公開範例：[呆一布講義](https://diveai-lab.github.io/diveai-lessons/)（作為課堂方法與組織方式的參考；非本專案程式碼來源）。
3. 該範例的公開 GitHub repository [`diveai-lab/diveai-lessons`](https://github.com/diveai-lab/diveai-lessons) 中的 `CLAUDE.md`：規劃階段閱讀，參考其**規則寫法與檔案分工**，包括「先寫內容稿、再生成網頁」、以 `log.md` 記錄會影響後續的變更、網址路徑一律用英文小寫 slug、新增頁面後回首頁加入口卡片。本專案依金融教學需求重新撰寫為自己的 `AGENTS.md`，**未複製其文字、程式碼、版型或素材**。

## 二、哪些是課堂方法參考？

| 標註 | 參考概念 | Derivatives Academy 的對應 |
|---|---|---|
| 【課堂方法參考】 | 用「成品／限制／驗收」交辦任務 | `AGENTS.md` 第 1、4–9 節：頁面成品、金融禁用事項、技術限制、測試與回報 |
| 【課堂方法參考】 | 讓 AI 在新工作前閱讀專案規則 | `AGENTS.md` 第 0、7 節：讀取順序與新商品 Plan → Draft → Review → Build → Link → Test → QA Report → Log |
| 【課堂方法參考】 | 規則、內容、網站檔案分開管理 | 將內容置於 `content/`、頁面置於 `products/`、共用版型與素材置於 `templates/`、`assets/` |
| 【課堂方法參考】 | 老師 repo `CLAUDE.md`：先寫內容稿再生成網頁、`log.md` 變更紀錄、英文 slug、首頁入口卡片 | `AGENTS.md` 第 3、6、7 節：`content/<slug>.md` 先於 `products/<slug>/index.html`、slug 規則、首頁卡片與數量更新、`log.md` 紀錄 |

## 三、哪些是本專案設計與 AI 協作實作？

| 標註 | 具體成果 | 檔案位置 |
|---|---|---|
| 【本專案設計與 AI 協作實作】 | 繁體中文金融教育主題、衍生性商品／結構型商品 × 外匯／利率／商品／股權雙層分類 | `AGENTS.md`、`index.html` |
| 【本專案設計與 AI 協作實作】 | 七段商品內容標準與先寫 Markdown 的內容模板 | `templates/`、`content/`、`products/` |
| 【本專案設計與 AI 協作實作】 | FX Forward、FX Vanilla Option、DCI 教學頁與 Options 101 前兩章 | `products/`、`options-101/` |
| 【本專案設計與 AI 協作實作】 | 四部位選擇權到期損益模擬器與計算函數 | `lab/`、`assets/payoff.js`、`assets/simulator.js` |
| 【本專案設計與 AI 協作實作】 | 可執行的金融損益測試、內容結構與連結檢查 | `tests/`、`tests.html`、`.github/workflows/ci.yml` |

## 四、哪些是後續修訂？

| 標註 | 調整內容 | 檢查依據 |
|---|---|---|
| 【後續修訂與驗收】 | 讓新增商品不被固定三商品的測試邏輯阻擋 | `tests/site.test.cjs` 自動掃描 `products/` |
| 【後續修訂與驗收】 | 修正 Markdown 內容稿內部連結，檢查首頁商品數量及分類 | `tests/site.test.cjs`、`log.md` |
| 【後續修訂與驗收】 | 將品質驗證頁的即時公式測試與歷史檢查快照分開 | `tests.html`、`docs/QA.md`、`log.md` |
| 【後續修訂與驗收】 | 新增本份課堂來源與專案延伸對照 | `README.md`、`docs/SUBMISSION.md`、`AGENTS.md`、本檔 |

## 五、來源與誠實揭露原則

- 本專案**參考老師的課堂開發方法**，但**未直接使用老師講義網站的 HTML/CSS/JS 原始碼或素材**；不將參考概念寫成「直接從老師程式改寫」。
- 目前網站與規則由 AI 協作開發；「自行延伸」指本作業的選題與需求規格，**不代表每行程式均由本人手寫**。
- 產品數字使用假設資料；AI 的公式驗算不等於專案擁有者完成金融專業人工驗收。
- GitHub Pages 發布及「新對話新增 FX Swap」須於實際完成後才可記錄，不得提前聲稱驗收通過。實際開發與測試記錄請見 `log.md`。
