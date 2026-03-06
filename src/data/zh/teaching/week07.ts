import type { SegmentTeaching } from '@/types';

export const week07Teaching: SegmentTeaching[] = [
  // --- Segment 1: 開場故事 (w07-s01, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: '上課前，黑板上寫著兩個數字：3.0x 和 4.0x。學生們就座，盯著它們看。' },
      { type: 'lecture', character: 'drLin', text: '各位早安。看看這兩個數字。對一個管理一百億美元的基金來說，它們之間的差距代表十億美元的額外資本被閒置——無法用來投資的錢。誰能猜到它們代表什麼？' },
      { type: 'lecture', character: 'drLin', text: '這些是 Basel 資本乘數（Capital Multipliers）。3.0x 是綠燈區——你的模型受到信任。4.0x 是紅燈區——你的模型失敗了，監管機構強制你持有巨額資本緩衝。今天我們學習什麼區分了綠燈和紅燈。' },
      { type: 'lecture', character: 'alex', text: '所以一個糟糕的風險模型不只是給出錯誤的數字——它實際上讓基金損失數十億的被鎖定資本？' },
      { type: 'lecture', character: 'drLin', text: '完全正確。日本金融廳已經安排了對 Kenji VaR 模型的審計。我們有兩週時間準備一份完整的回測報告。如果模型失敗，基金需要持有更多資本，Kenji 要面對董事會。' },
      { type: 'check', question: '監管機構認定風險模型不合格，最重大的後果是什麼？', options: ['來自監管機構的罰款', '更高的資本要求，降低了投資報酬', '風險管理人員被解僱', '強制更換模型'], correctIndex: 1, onCorrect: '完全正確。更高的資本要求比任何罰款的成本都高得多——它們直接降低基金的獲利能力。', onWrong: '不太對。雖然罰款和人事變動都可能發生，但最具財務破壞力的後果是更高的資本要求，它鎖定了數十億的閒置資本。' },
      { type: 'lecture', character: 'drLin', text: '今天我們建構完整的回測工具組：Kupiec 檢定、Christoffersen 檢定、Basel 交通燈以及壓力測試。到最後，我們就能撰寫 Kenji 的 FSA 報告。' },
    ],
  },

  // --- Segment 2: 回測邏輯 (w07-s02, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '回測（Backtesting）的概念很簡單：將你的 VaR 預測與實際發生的結果進行比較。如果你的 99% VaR 是正確的，你應該看到突破——損失超過 VaR——大約百分之一的時間。' },
      { type: 'visual', component: 'FormulaDisplay', caption: '打擊序列定義', props: { formula: 'I_t = 1 \\text{ if } r_t < -\\text{VaR}_t, \\quad 0 \\text{ otherwise}' } },
      { type: 'lecture', character: 'drLin', text: '這個二元序列就是我們所說的打擊序列（Hit Sequence）。1 代表發生了突破——模型那天錯了。0 代表模型守住了。每一種回測方法都在分析這個序列。' },
      { type: 'lecture', character: 'alex', text: '所以我們需要兩件事成立：正確的總突破次數，以及突破應該隨機分散而不是聚集在一起？' },
      { type: 'lecture', character: 'drLin', text: '非常精確。這就是兩個性質：無條件覆蓋率（Unconditional Coverage）和獨立性（Independence）。一個突破次數正確但所有突破都聚集在同一週的模型是危險地有缺陷的——它在條件變化時未能適應。' },
      { type: 'check', question: '一個 VaR 模型在一年中產生了恰好正確的突破次數，但所有突破都發生在同一週。這是一個好模型嗎？', options: ['是，它有正確的突破率', '不是，聚集的突破表示模型未能適應', '取決於信賴水準', '是，只要 Kupiec 檢定通過就好'], correctIndex: 1, onCorrect: '正確！聚集意味著模型無法適應不斷變化的波動率條件，即使整體數量看起來沒問題。', onWrong: '再想想。即使總數正確，聚集性表示模型無法適應不斷變化的市場條件——這是一個嚴重的缺陷。' },
    ],
  },

  // --- Segment 3: Kupiec 檢定 (w07-s03, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '第一個正式檢定是 Kupiec 失敗比例檢定（Proportion of Failures Test）。直覺很直白：在 250 天的 99% 水準下，我們預期 2.5 次突破。我們觀察到 x 次突破。x 和 2.5 是否夠接近？' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Kupiec POF 概似比', props: { formula: 'LR_{uc} = -2 \\ln\\left[\\frac{p^x (1-p)^{T-x}}{\\hat{p}^x (1-\\hat{p})^{T-x}}\\right] \\sim \\chi^2(1)' } },
      { type: 'lecture', character: 'drLin', text: '我們比較兩個世界：一個是 p = 0.01——模型正確的世界；另一個是 p = x/T——讓數據告訴我們真實突破率的世界。兩個世界差距越大，檢定統計量越大。' },
      { type: 'lecture', character: 'priya', text: '5% 顯著水準的臨界值是卡方分配自由度 1 的 3.841。如果 LR 超過這個門檻，我們就拒絕該模型。' },
      { type: 'check', question: '一個 99% VaR 模型在 250 個交易日中產生了 7 次突破。預期次數是 2.5。Kupiec LR 統計量為 5.34。模型是否通過？', options: ['是，7 次接近 2.5', '否，LR 5.34 超過了臨界值 3.841', '沒有更多資訊無法判斷', '是，因為 7 在綠燈區'], correctIndex: 1, onCorrect: '正確！因為 5.34 > 3.841，我們拒絕模型校準正確的虛無假設。突破率顯著過高。', onWrong: '記住：當 LR 超過 3.841 時我們拒絕。這裡 5.34 > 3.841，所以模型未通過 Kupiec 檢定。' },
      { type: 'lecture', character: 'drLin', text: '一個關鍵的注意事項：Kupiec 檢定在只有 250 個觀測值時統計檢定力（Power）很低。它無法可靠地區分 1% 和 2% 的突破率。這是資料有限的回測之根本限制，不是檢定的缺陷。' },
      { type: 'lecture', character: 'alex', text: '而且這個檢定是雙邊的，對吧？它同時拒絕太多和太少的突破。250 天中零次突破意味著模型過於保守——機構不必要地持有了過多資本。' },
      { type: 'lecture', character: 'drLin', text: '完全正確。過於保守的模型浪費資本，就像激進的模型會產生風險一樣確實。監管機構要的是準確性，不只是安全性。' },
    ],
  },

  // --- Segment 4: Christoffersen 檢定 (w07-s04, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Kupiec 檢查的是次數，但時間點呢？一個模型可能以飛越的成績通過 Kupiec，卻把所有突破集中在一個糟糕的週。Christoffersen 檢定能捕捉到這一點。' },
      { type: 'visual', component: 'FormulaDisplay', caption: '突破獨立性的轉移矩陣', props: { formula: '\\pi_{01} = \\frac{n_{01}}{n_{00}+n_{01}}, \\quad \\pi_{11} = \\frac{n_{11}}{n_{10}+n_{11}}' } },
      { type: 'lecture', character: 'drLin', text: '我們建構一個二乘二的轉移矩陣（Transition Matrix）。行是昨天的狀態——突破或無突破。列是今天的狀態。我們計算每種轉換發生的次數：n_{00}、n_{01}、n_{10}、n_{11}。' },
      { type: 'lecture', character: 'priya', text: '獨立性意味著 pi_{01} 等於 pi_{11}。換句話說，今天發生突破的機率不取決於昨天是否有突破。如果 pi_{11} 較大，突破就在聚集——模型適應得太慢了。' },
      { type: 'lecture', character: 'drLin', text: '讓我在黑板上畫兩個序列。序列 A：10 天中第 3 天和第 7 天突破。分散得很好。序列 B：第 7、8、9 天突破。聚集的。兩者可能有類似的突破率，但 B 揭示了嚴重的模型缺陷。' },
      { type: 'visual', component: 'FormulaDisplay', caption: '條件覆蓋率檢定', props: { formula: 'LR_{cc} = LR_{uc} + LR_{ind} \\sim \\chi^2(2), \\quad \\text{Reject if } LR_{cc} > 5.991' } },
      { type: 'lecture', character: 'drLin', text: '條件覆蓋率檢定（Conditional Coverage Test）結合了兩個組成部分。在 5% 水準下，如果 LR_cc 超過卡方分配自由度 2 的 5.991，我們就拒絕。通過兩個檢定是監管接受的要求。' },
      { type: 'check', question: '一個模型通過了 Kupiec 檢定但未通過 Christoffersen 獨立性檢定。這代表什麼？', options: ['模型有正確的整體突破率但突破是聚集的', '模型有太多突破', '模型太保守', '模型在監管目的上是合格的'], correctIndex: 0, onCorrect: '完全正確。整體數量是對的，但時間點是錯的——突破聚集，代表模型無法適應不斷變化的條件。', onWrong: '通過 Kupiec 代表次數正確。未通過獨立性代表突破不夠分散——它們聚集在一起。模型無法適應。' },
    ],
  },

  // --- Segment 5: 休息 (w07-s05, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: '休息十分鐘。回來之後，我們進入監管世界——Basel 交通燈系統和壓力測試。' },
    ],
  },

  // --- Segment 6: Basel 交通燈 (w07-s06, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '歡迎回來。快速回顧：Kupiec 檢驗突破次數，Christoffersen 檢驗時間點。現在監管機構把一切綜合成一個簡單、強大的分類：Basel 交通燈。' },
      { type: 'visual', component: 'VaRBacktestChart', caption: 'Basel 交通燈區域和資本乘數' },
      { type: 'lecture', character: 'drLin', text: '綠燈區：250 天內 0 到 4 次突破，資本乘數 3.0x。黃燈區：5 到 9 次突破，乘數從 3.4x 到 3.85x 不等。紅燈區：10 次以上突破，乘數跳到 4.0x。' },
      { type: 'lecture', character: 'kenji', text: '對我這個基於 VaR 的市場風險為五十億美元的基金來說，綠燈區代表一百五十億的資本。紅燈區代表兩百億。那五十億的差距是閒置的錢——無法用來投資。財務成本是驚人的。' },
      { type: 'check', question: '請分類以下情況到 Basel 區域：一個模型在 250 天中有 4 次突破。', options: ['綠燈區（0-4 次突破）', '黃燈區（5-9 次突破）', '紅燈區（10 次以上突破）', '沒有檢定統計量無法分類'], correctIndex: 0, onCorrect: '正確！4 次突破落在綠燈區的 0-4 次邊界內。資本乘數為 3.0x。', onWrong: '4 次突破在綠燈區邊界內（0 到 4 次突破），所以資本乘數是 3.0x。' },
      { type: 'lecture', character: 'drLin', text: '在黃燈區，每多一次突破都要付出更多資本。5 次突破是 3.4x，6 次是 3.5x，一直到 9 次突破的 3.85x。每一次額外的突破在財務上都很重要。' },
      { type: 'lecture', character: 'alex', text: '銀行有沒有可能設計一個故意瞄準剛好 4 次突破的模型，以停留在綠燈區邊界？這似乎是在玩弄系統。' },
      { type: 'lecture', character: 'drLin', text: '好問題。監管機構通過質性審查和壓力測試要求來反制這一點。FRTB 改革也從 VaR 轉向預期短缺，這使得玩弄系統更加困難。系統有多層防禦。' },
    ],
  },

  // --- Segment 7: Python 實作示範 (w07-s07, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'priya', text: '讓我們在 Python 中執行完整的回測流程。我們要測試 GJR-GARCH VaR 模型，並為 Kenji 的 FSA 報告產生實際的數字。' },
      { type: 'visual', component: 'CodeDisplay', caption: '滾動 GJR-GARCH VaR 回測', props: { code: 'rolling_var_backtest(data, model="gjr-garch", dist="t", window=500)' } },
      { type: 'lecture', character: 'priya', text: '滾動回測使用 500 天窗口為每一天重新估計 GJR-GARCH 模型，然後計算一天前的 VaR。這需要 5 到 10 分鐘執行。' },
      { type: 'visual', component: 'VaRBacktestChart', caption: '報酬率 vs. VaR 邊界，標示突破點' },
      { type: 'lecture', character: 'alex', text: '看 VaR 邊界在 2020 年 3 月 COVID 期間如何調整。隨著模型捕捉到波動率飆升，它大幅擴張。你可以直觀地數出突破的次數。' },
      { type: 'lecture', character: 'priya', text: '現在看統計檢定。Kupiec 的 p 值遠高於 0.05，Christoffersen 的 p 值也高於 0.05。模型通過了兩個檢定，落在 Basel 綠燈區。' },
      { type: 'visual', component: 'VaRBacktestChart', caption: '累積突破圖 vs. 預期 1% 線' },
      { type: 'lecture', character: 'priya', text: '累積突破圖說明了全部的故事。實際的累積突破非常接近預期的 1% 線。當兩條線偏離時，模型就是校準不佳的。我們的緊密追蹤——這就是綠燈區的結果。' },
    ],
  },

  // --- Segment 8: 壓力測試 (w07-s08, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '回測驗證的是模型在我們已經觀察過的條件下的表現。但那些我們從未見過的情境呢？這就是壓力測試（Stress Testing）的用途。' },
      { type: 'lecture', character: 'drLin', text: '有兩種類型。歷史壓力測試（Historical Stress Tests）將真實危機重演——2008 年全球金融危機、2020 年 COVID-19、2016 年 Brexit——在當前投資組合上。假設壓力測試（Hypothetical Stress Tests）設計合理但前所未有的情境。' },
      { type: 'visual', component: 'FormulaDisplay', caption: '超額比率', props: { formula: '\\text{Exceedance Ratio} = \\frac{\\text{Scenario Loss}}{\\text{VaR (or ES)}}' } },
      { type: 'lecture', character: 'priya', text: '超額比率（Exceedance Ratio）告訴我們每個情境把我們推到風險測度之外多遠。比率 3.5 代表情境損失是 VaR 的 3.5 倍。超過 1 就代表情境超過了我們的每日風險估計。' },
      { type: 'visual', component: 'RiskMeasureDashboard', caption: '歷史和假設情境的壓力測試超額比率' },
      { type: 'check', question: '哪種壓力測試有助於評估歷史上從未發生過的情境？', options: ['歷史壓力測試', '假設壓力測試', 'Kupiec 回測', '蒙地卡羅 VaR'], correctIndex: 1, onCorrect: '正確！假設壓力測試設計合理但前所未有的情境，以測試模型在超越歷史經驗之外的韌性。', onWrong: '歷史測試重演過去的危機。假設壓力測試旨在評估前所未有但合理的情境。' },
      { type: 'lecture', character: 'drLin', text: '關鍵洞察：VaR 和 ES 是為日常風險管理設計的，不是為危機預測。壓力測試補充了回測無法涵蓋的極端條件的評估。' },
    ],
  },

  // --- Segment 9: 應用與討論 (w07-s09, 12 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '讓我們討論 FSA 報告的案例。VolTech 必須為日經 225 和 S&P 500 兩者呈報回測結果。以下是摘要數據。' },
      { type: 'visual', component: 'DataTable', caption: 'FSA 回測結果：日經和 S&P 500', props: { headers: ['Index', 'Breaches/500d', 'Kupiec p', 'Christoffersen p', 'Zone'], rows: [['Nikkei 225', '7', '0.265', '0.144', 'Green'], ['S&P 500', '5', '1.000', '0.571', 'Green']] } },
      { type: 'lecture', character: 'kenji', text: '日經的突破率較高——1.4% 對 1.0%。Kupiec 檢定通過了，但我應該擔心這個較高的比率嗎？' },
      { type: 'lecture', character: 'drLin', text: '好直覺。記住，Kupiec 檢定的統計檢定力很低。僅憑 500 個觀測值，它無法可靠地區分 1% 和 2%。我會把日經標記為需要持續監控，但它在統計上不顯著。' },
      { type: 'discuss_timer', durationMinutes: 5, prompt: '銀行能不能設計故意瞄準剛好 4 次突破的 VaR 模型來玩弄 Basel 系統？有什麼防護措施？', guidePoints: ['FRTB 改革從 VaR 轉向 ES', '質性的監管監督', '交易桌層級的測試要求', '從 VaR 轉向 ES 使玩弄更困難'] },
      { type: 'lecture', character: 'drLin', text: '記得 2008 年。許多銀行有綠燈區的 VaR 模型，但在危機中災難性地失敗。回測是回顧性的。在良好數據上驗證的模型可能在全新的條件下完全失敗。沒有單一的檢定能保證模型的充分性。' },
    ],
  },

  // --- Segment 10: 總結與任務 (w07-s10, 8 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '讓我總結六個關鍵要點。第一：回測通過將預測與已實現損失比較來驗證 VaR 模型。打擊序列是分析的根本對象。' },
      { type: 'lecture', character: 'drLin', text: '第二：Kupiec 檢驗無條件覆蓋率。第三：Christoffersen 增加獨立性檢驗。第四：Basel 交通燈將模型分類為綠、黃、紅三區，資本乘數遞增。第五：壓力測試評估回測無法涵蓋的極端情境。' },
      { type: 'lecture', character: 'drLin', text: '第六：一個模型可以通過所有回測，但在全新的條件下仍然災難性地失敗——正如我們從 2008 年全球金融危機中學到的。' },
      { type: 'lecture', character: 'drLin', text: '任務七：為日經 225 和 S&P 500 執行完整的回測流程。計算 Kupiec 和 Christoffersen 統計量，按 Basel 區域分類，執行三個歷史和兩個假設壓力測試情境，並撰寫 FSA 審計報告。' },
      { type: 'lecture', character: 'priya', text: '我一直在背景中建構一些東西。隨機森林（Random Forests）、LSTM，還有一個結合 GARCH 和機器學習的混合模型。QuantStar 宣稱有 50% 的改善。讓我們看看那是真的還是只是行銷話術。' },
      { type: 'lecture', character: 'kenji', text: '拿出證據來。下週：AI 能不能真的打敗我們過去七週建構的模型？答案可能會讓你驚訝。' },
    ],
  },
];
