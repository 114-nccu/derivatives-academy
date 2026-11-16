# 商品英文名｜商品中文名

- slug: `product-slug`
- product_type: `derivative`
- market: `fx`
- status: `draft`
- numeric_examples: `hypothetical`
- level: `入門／中階`
- summary: `一句話說明這個商品在解決什麼問題（會用在頁首與首頁卡片）。`

<!--
使用方式：複製本檔為 content/<slug>.md，替換所有內容後再做 HTML。
開頭欄位規則（tests/site.test.cjs 會檢查，格式必須一字不差：「- 欄位: `值`」）：
- slug：與檔名相同，只能用小寫英文、數字、中橫線。
- product_type：derivative 或 structured。
- market：fx、rates、commodity、equity。
- status：draft（只有內容稿，首頁不可連結）或 published（必須已有 products/<slug>/index.html 與首頁卡片）。
- numeric_examples：固定填 hypothetical。
內文格式：
- 公式用 ```formula 區塊。
- 提示框用引用：「> **說明：**」「> **補充：**」「> **⚠ 風險提醒：**」。
- 表格用 Markdown 表格。
- 連結路徑要「相對於檔案自己的位置」，兩邊寫法不同：
  - 內容稿 content/<slug>.md：../options-101/chapter-02/index.html、../products/dci/index.html、../lab/index.html
  - 商品頁 products/<slug>/index.html：../../options-101/chapter-02/index.html、../dci/index.html、../../lab/index.html
  tests/site.test.cjs 會分別檢查兩邊的連結都能打開。
- 未查證的金融事實標「（待查證）」，不得自行補齊。
七個 ## 標題的文字與順序不可更改。
-->

## 01. Product Overview｜商品介紹

先用白話說明這是什麼、解決什麼問題、適合誰讀，再給正式定義。

> **說明：** 商品類型：…（derivative／structured）｜標的市場：…。報價方向：例如 USD/TWD 32.00 = 1 USD 兌 32.00 TWD。

## 02. Product Structure｜交易結構

| 假設條款 | 說明 |
|---|---|
| 交易方向 | … |
| 名目本金 | …（幣別） |
| 期限 | … |
| 價格／匯率／利率 | …（假設） |
| 到期條件 | … |

## 03. Payoff & P&L｜損益分析

```formula
到期損益 = …（寫清楚單位與幣別）
```

| 到期情境 | 計算 | 結果 |
|---|---|---|
| 不利情境 | … | … |
| 中性情境 | … | … |
| 有利情境 | … | … |

說明這是到期 Payoff、扣除成本的 Net P&L，還是到期前市價。

## 04. Pricing Drivers｜定價因子

列出影響價格的因子與模型假設；不得虛構銀行報價。

## 05. Use Cases｜應用情境

### 案例：（匿名或虛構對象）

情境、需求、使用方式、限制；標示所有數字為假設。

## 06. Risk Analysis｜風險分析

- **市場風險：**…
- **信用風險：**…
- **流動性／提前解約風險：**…
- **最差情境：**…

> **⚠ 風險提醒：** 本頁為教學用途，不構成投資建議。

## 07. Practical Q&A｜實務問答

### Q1：…

…

### Q2：…

…

### Q3：…

…
