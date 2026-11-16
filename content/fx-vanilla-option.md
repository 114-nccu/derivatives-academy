# FX Vanilla Option｜一般外匯選擇權

- slug: `fx-vanilla-option`
- product_type: `derivative`
- market: `fx`
- status: `published`
- numeric_examples: `hypothetical`
- level: `入門／中階`
- summary: `在匯率避險與保留有利市場變動之間取捨，理解 Call、Put、Premium 與非對稱損益。`

## 01. Product Overview｜商品介紹

**FX Vanilla Option（一般外匯選擇權）**使買方支付權利金後，取得在指定條件下以特定匯率買入或賣出某種貨幣的**權利，而非義務**。賣方收取權利金，則承擔相對應的履約義務。

建議先讀 [**Options 101 第 1 章**](../options-101/chapter-01/index.html) 與 [**第 2 章**](../options-101/chapter-02/index.html)，理解 Call / Put 與到期損益。

> **說明：** 本頁報價採 **USD/TWD = 每 1 USD 可交換的 TWD 數量**。下文「USD Call」指買進美元／賣出台幣的權利；同一外匯選擇權也可從另一幣別角度描述，須清楚界定行權方向與貨幣。

## 02. Product Structure｜交易結構

假設台灣進口商三個月後需買進 USD 100,000，可購買以 USD/TWD 為標的的 **USD Call / TWD Put**。假設歐式、到期現金結算，條件如下：

| 欄位 | 教學假設 |
|---|---|
| 方向 | Long USD Call / TWD Put |
| 履約價 K | 32.00 TWD per USD |
| 名目本金 | USD 100,000 |
| 權利金 | 0.30 TWD per USD（共 TWD 30,000） |
| 履約型態 | 歐式；到期現金結算（僅供示範） |

實際外匯選擇權可能採不同的權利金報價基礎、交割幣別和結算條款，不能將此示例套用至所有銀行商品。

## 03. Payoff & P&L｜損益分析

這個買入美元 Call 的到期**淨損益**（以新台幣計）為：

```formula
Net P&L = max(Sₜ − K, 0) × USD 本金 − 已付權利金 (TWD)
```

| 到期 USD/TWD | 選擇權內含價值 (TWD) | 扣權利金後淨損益 |
|---|---|---|
| 31.00 | 0 | −30,000 |
| 32.00 | 0 | −30,000 |
| 33.00 | 100,000 | +70,000 |

[開啟四種選擇權 Payoff 模擬器 ↗](../lab/index.html)

> **補充：** 模擬器採一般標的價格、每單位權利金的數學模型；外匯選擇權應額外考慮基準與報價貨幣、權利金幣別及交割方式。

## 04. Pricing Drivers｜定價因子

選擇權權利金與即期匯率、履約價、剩餘期間、兩種貨幣利率，以及**隱含波動率（Implied Volatility, IV）**等因素有關。以相同其他條件為前提，波動率上升通常會提高一般買權或賣權的理論價值。

**內含價值（Intrinsic Value）**是現在立即按標的價格衡量、對買方有利的價差部分。**時間價值（Time Value）**是權利金超出內含價值的部分。到期前可能仍有時間價值，所以不能將到期 Payoff 公式當成交易期間的市價模型。

> **說明：** Options 101 第 3 章「Option Pricing & IV」尚在規劃，故本頁已提供最低必要定義，**不放尚未完成的章節連結**。未來可延伸介紹適用於標準外匯選擇權的 Garman–Kohlhagen 架構。

## 05. Use Cases｜應用情境

### 進口商需要美元，但仍想保留美元貶值時的機會

採用美元買權後，如果美元明顯升值，選擇權價值可部分抵銷買美元的成本上升；如果美元貶值，企業可以選擇不履約並在市場買入美元，但權利金為已發生成本。

這和 FX Forward 的主要差異在於：**Forward 直接鎖定未來換匯價格；Option 支付權利金換取非對稱的保護**。兩者孰優，取決於市場走勢、權利金、預算與風險偏好。

## 06. Risk Analysis｜風險分析

- **買方權利金成本：**如果到期價外，整筆已付權利金可能損失。
- **賣方尾部風險：**未避險的 Short Call 理論上可能面臨不設上限的價格風險。
- **市場與波動率風險：**到期前的價值受 IV、時間與利率等影響。
- **交割與合約風險：**不同契約條款與行權時間會改變實際結果。

> **⚠ 風險提醒：** 網站只提供教學用途，不構成投資建議；Long / Short 風險不能只看到期一個情境。

## 07. Practical Q&A｜實務問答

### Q1：買一個 USD Call，就一定會賺嗎？

不是。即使市場方向看對，漲幅也可能不足以覆蓋權利金，導致淨損失。

### Q2：為什麼要付 Premium？

權利金是買方取得選擇權的價格，也是對賣方承擔義務的補償。

### Q3：外匯選擇權可以直接套股票選擇權的公式嗎？

Payoff 直覺相似，但實際外匯選擇權涉及兩種貨幣、利率與報價幣別，完整定價需使用相應模型與契約定義。

延伸閱讀：[Options Industry Council — Options Basics](https://www.optionseducation.org/optionsoverview/options-basics)；[Leverage & Risk](https://www.optionseducation.org/optionsoverview/leverage-risk)。

---

**下一篇：** [DCI](../products/dci/index.html)：觀察選擇權如何被嵌入結構型投資商品。
