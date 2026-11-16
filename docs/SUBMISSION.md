# 繳交文字範例（發布後再補上實際網址與測試結果）

## 標題

`[學校簡稱] [學號] [系級] [姓名] Derivatives Academy`

## 1. 專案簡介

我建立了「Derivatives Academy｜衍生性金融商品互動知識庫」，以繁體中文介紹衍生性金融商品與結構型投資商品，特別針對尚未修習選擇權課程的初學者。目前包含 Options 101 前兩章、FX Forward、FX Vanilla Option、DCI 與後續依 AGENTS.md 擴充的 FX Swap 四篇商品教學，以及可切換四種部位的選擇權到期損益模擬器。

網站採用「商品類型 × 標的市場」雙層分類，每篇商品使用固定七段架構（商品介紹、交易結構、損益分析、定價因子、應用情境、風險分析、實務問答），並註明金融案例假設與投資風險。

### 課堂參考與自行延伸

這次的設計參考老師第九週《換你當老闆》講義中「交辦時說明成品、限制與驗收」、以 `AGENTS.md`／`CLAUDE.md` 保存開發規則，以及「呆一布講義」把規則、內容和網頁分開管理的工作方式；規劃時也閱讀了該範例公開 repository 裡的 `CLAUDE.md`，參考其「先寫內容稿再生成網頁」「用 log.md 記錄變更」等規則寫法。我將這些方法應用在衍生性金融商品教學，與 AI 協作設計雙層商品分類、統一七段頁面、Options 101、Payoff Lab，以及能重複執行的測試流程。**本專案參考的是開發方法，並非直接修改或複製老師示範網站的原始碼。** 參考依據及具體延伸對照表已整理在 Repository 的 `README.md` 與 `docs/COURSE_REFERENCE.md`。

## 2. GitHub Repository

`https://github.com/114-nccu/derivatives-academy`

## 3. 網頁連結

`https://114-nccu.github.io/derivatives-academy/`（FX Swap 新版是否已部署，上傳後再檢查）

## 4. AGENTS.md

Repository 根目錄的 [`AGENTS.md`](https://github.com/114-nccu/derivatives-academy/blob/main/AGENTS.md)。

我在 `AGENTS.md` 定義網站目的、雙層分類、七段固定教學模板、檔案命名、先撰寫內容稿再製作網頁的順序、金融事實與資料安全限制，以及自動測試和人工驗收的標準。

## 5. 新對話擴充實驗：規則如何幫助 AI？

我以原本的完整專案與 **AGENTS.md v1.0** 開啟全新 AI 開發對話，請 AI 新增 FX Swap，先依照七段模板產生 `content/fx-swap.md`（draft），經過金融公式與兩腿現金流審核後，才允許進入 Build。AI 接著建立 `products/fx-swap/index.html`、更新首頁四個已發布商品入口及數量，並執行原有 Node 測試，沒有擅自改動既有測試、CSS 與原本三篇商品。

**已在本機重新確認：** `node tests/payoff.test.cjs` PASS（14 個計算案例、3 個無效輸入）；`node tests/site.test.cjs` PASS（4 商品、9 頁、123 個 HTML 站內連結、9 個 Markdown 連結）。金融示例使用 USD/TWD 假設匯率及利率，已核對近遠端現金流與 Swap Points，並區分到期相對價值和整體 Net P&L。

**規則迭代：** 實驗顯示 v1.0 沒有明確要求區分 FX Swap 的跨日現金流、到期相對價值、MTM 與整體損益，也未統一點數單位、非 Spot 近端交割、頁面篇幅／數字精度及瀏覽器被阻擋時的處理。據此修訂 **AGENTS.md v1.1**；屬於規格改善，並非虛構 AI 曾有金融數值錯誤。

**待完成／不得冒稱已完成：** 新版 FX Swap 在正式 GitHub Pages 的部署與手動點擊、瀏覽器 375／768／1280px 的獨立檢查、公開頁面 `tests.html` 即時結果，仍須以實際操作核實。另一 AI 曾回報九頁三種寬度皆 PASS，但本次環境無法重現，故不能以此取代完整證據。Commit 連結亦須以上傳後 GitHub 真正產生的網址填寫。

- FX Swap 擴充 Git Commit：`[完成上傳後填入真實 URL]`
- v1.1 規則修訂 Git Commit：`[完成上傳後填入真實 URL]`
- 公開網站驗收：`[親自測試並記錄通過項目／日期]`

> 保留 GitHub 既有 Commit 歷史。不可為了重建演示流程而重寫已存在的提交紀錄。
