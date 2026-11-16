# 方案 C 全內容擴充版｜驗收報告（2026-11-16）

## 目的與範圍

本版在已上線的 FX Swap v1.1 專案**本機副本**中補齊六項規劃中的入口：

- Options 101：`chapter-03`（Pricing & IV）、`chapter-04`（Greeks）、`chapter-05`（Strategies）、`chapter-06`（Applied Derivatives）。
- 衍生商品：`IRS`（`derivative + rates`）和 `Commodity Swap`（`derivative + commodity`），均同步建立 `content/*.md` 七段稿與 `products/*/index.html` 正式頁。
- 更新首頁卡片與總數：6 published / 0 planned，5 個衍生性商品 + 1 個結構型商品；Options 101 6 / 6。

## 本機測試結果

| 測試 | 實際執行結果 | 測試範圍 |
|---|---|---|
| `node tests/payoff.test.cjs` | PASS | 原有 14 個計算案例＋3 個無效輸入 |
| `node tests/site.test.cjs` | PASS | 6 商品／11 個**原測試涵蓋** HTML 頁／155 HTML 連結／10 Markdown 連結 |
| `node tests/course.test.cjs` | PASS | 15 個 HTML 頁、144 條站內連結、四章折疊問答，另根據頁面輸入值重新計算並核對 41 個實際顯示的金融數值 |

三支測試都在 2026-11-16 本機重新執行。新增 `course.test.cjs` 作為**補充測試**，原有兩支測試程式未更動，亦未以放寬測試條件規避失敗。**後續修正：** 最初版本曾寫死六個商品及零張規劃中卡片，已改為自動掃描。以隔離的本機副本模擬新增第 7 個商品 `ccs` 與 1 張規劃中卡片，`site.test.cjs` 和 `course.test.cjs` 均 PASS；故意把 IRS 網頁的 +12,500 改錯為 +12,501，`course.test.cjs` 如預期 FAIL，恢復正確金額後 PASS。這些模擬僅用於測試，不納入正式專案。

## 尚未驗證的事項（不標示 PASS）

- 使用 Playwright + Chromium 嘗試 `file://` 與本機 HTTP 網址，皆得到 `net::ERR_BLOCKED_BY_ADMINISTRATOR`，因此**未完成** 15 頁在 375px／768px／1280px 的瀏覽器渲染、無水平溢位與 console 檢查。
- **流程例外／待審核：** 這次方案 C 先生成 IRS、Commodity Swap 草稿與 HTML，未在建置前停下來取得擁有者逐項 Review，與 `AGENTS.md` 的 Plan → Draft → Review → Build 順序不完全一致；不能事後假稱已完成審稿。尚待擁有者逐章複核金融內容，並檢查所有外部參考連結。此版本只能當作候選，不能視為金融人工驗收完成。
- 尚未部署 GitHub Pages；若選擇沿用既有 FX Swap v1.1 作業繳交版，不應將方案 C 的 6 商品／6 課程數字冒稱已上線。
- Repo 可能缺少 `.nojekyll` 或 `.github/workflows/ci.yml` 隱藏檔（來自另一份檢查回報），完整 ZIP 已包含兩檔，但網頁手動上傳後必須**在 GitHub 確認真的存在**。

## 版本與回退

- 既有 `derivatives-academy-fx-swap-v1.1-final.zip` 及公開 GitHub Pages **均未被本機建置修改**。
- 只有當擁有者完成金融審核、連結檢查、真實瀏覽器驗收，並手動將檔案更新到 Repository，才能把此版本稱為「已發布」。
- FX Swap 新對話擴充仍是 `AGENTS.md` 可重複使用性的主要證據。全部卡片填滿，不影響未來再新增新頁面的可擴充性。
