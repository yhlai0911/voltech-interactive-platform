import type { SegmentTeaching } from '@/types';

/**
 * Week 02 「衡量波動率」教學腳本
 *
 * 10 segments (aligned 1:1 with lesson week02):
 *   seg 0: Review and Opening (w02-s01)              — 6 steps
 *   seg 1: Rolling Window Volatility (w02-s02)       — 8 steps
 *   seg 2: EWMA (w02-s03)                            — 8 steps
 *   seg 3: Realized Volatility (w02-s04)             — 5 steps
 *   seg 4: Break (w02-s05)                           — 1 step
 *   seg 5: The VIX (w02-s06)                         — 7 steps
 *   seg 6: Python Live Demo (w02-s07)                — 6 steps
 *   seg 7: Application (w02-s08)                     — 6 steps
 *   seg 8: Stylized Facts and Discussion (w02-s09)   — 7 steps
 *   seg 9: Wrap-up and Mission (w02-s10)             — 6 steps
 *                                              Total: ~60 steps
 */
export const week02Teaching: SegmentTeaching[] = [
  // ═══════════════════════════════════════════════════
  // Segment 0: Review and Opening (8 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: '歡迎回來，各位。快速回顧上週的內容：金融報酬率具有遠高於零的峰度所代表的厚尾（Fat Tails）、負偏態（Negative Skewness），而且 Jarque-Bera 檢定每次都粉碎常態性假設。常態分配在尾部是危險地錯誤的。',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: 'Dr. Lin，我整週都在思考。你已經展示了分配的問題。但我的董事會一直在問一個更簡單的問題：我們的投資組合「現在」的波動率到底有多大？',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '很好的問題，Kenji。而今天的關鍵洞見是：你不能用一把尺子在所有時候衡量風險。今天我們學習四種不同的尺子，並找出哪一種在 COVID-19 來襲時最先發出警告。',
      },
      {
        type: 'lecture',
        character: 'alex',
        text: '我們不能就直接計算報酬率的標準差嗎？',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '可以。但是哪些報酬率？最近 20 天的？還是最近一年的？答案會根據你選擇的窗口而大幅改變。這就是困難所在。',
      },
      {
        type: 'check',
        question: '為什麼衡量「目前」波動率比計算一個標準差更複雜？',
        options: [
          '標準差太難計算了',
          '波動率隨時間變化，所以答案取決於衡量窗口和方法',
          '我們應該用均值而不是標準差',
          '目前的波動率根本無法被衡量',
        ],
        correctIndex: 1,
        onCorrect: '完全正確。波動率是隨時間變化的（Time-Varying）。不同的窗口和方法會給出不同的答案，而這個選擇對風險管理至關重要。',
        onWrong: '關鍵問題在於波動率會隨時間變化。用 20 天計算的標準差和用 252 天計算的會給出非常不同的答案。衡量窗口和方法的選擇至關重要。',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 1: Rolling Window Volatility (17 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: '最簡單的方法是滾動窗口（Rolling Window）。選擇一個 N 天的窗口，計算該窗口內的標準差，然後每次向前滑動一天。直觀且容易實作。',
        note: '滾動窗口：sigma_roll = sqrt(1/(N-1) * sum(r_{t-i} - r_bar)^2)',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: '滾動窗口波動率：sigma_roll,t = sqrt(1/(N-1) * sum_{i=0}^{N-1} (r_{t-i} - r_bar)^2)',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '但這裡有一個根本性的取捨。短窗口（例如 20 天）對體制變化反應靈敏但雜訊大。長窗口（例如 252 天）平滑穩定但反應遲鈍。沒有一個普遍正確的窗口長度。',
        note: '短窗口（N=20）：反應快但雜訊大。長窗口（N=252）：平滑但遲緩。',
      },
      {
        type: 'visual',
        component: 'VolatilityComparison',
        caption: '20 天 vs 252 天滾動窗口：反應性與穩定性的取捨',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '滾動窗口有一個更深層的問題：等權重（Equal Weighting）。250 天前的報酬率和昨天的報酬率權重完全相同。當市場突然轉變時，滾動窗口反映新現實的速度痛苦地慢。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '而且要小心幽靈效應（Ghosting Artifacts）。當一個極端觀測值在 N 天後離開窗口時，波動率會出現突然的人為下降。這純粹是硬邊界的假象，可能會誤導風險管理者。',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: '在 2020 年 2 月，我們的 252 天估計值大約是 12%。到了 3 月中旬，實際波動率已經爆炸。但我們的年度滾動窗口仍然包含了 2019 年所有的平靜數據。這就像用去年夏天的天氣報告來衡量一場颶風。',
      },
      {
        type: 'check',
        question: '滾動窗口法衡量波動率的主要限制是什麼？',
        options: [
          '沒有日內數據就無法計算',
          '它使用等權重，所以舊數據和最近的數據權重相同，使得反應遲緩',
          '它總是高估波動率',
          '它至少需要 1,000 個觀測值',
        ],
        correctIndex: 1,
        onCorrect: '完全正確。等權重意味著舊觀測值和最近的觀測值權重一樣。這使得滾動窗口難以察覺體制變化，而且當極端觀測值離開窗口時還會產生幽靈效應。',
        onWrong: '關鍵限制是等權重。窗口中的每個觀測值，無論是昨天的還是幾個月前的，都獲得相同的權重。這使得該指標在體制轉變期間反應遲鈍。',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 2: EWMA (20 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: '等權重問題有一個自然的解決方案：給近期數據更多權重，讓舊數據以指數方式衰減。這就是指數加權移動平均（Exponentially Weighted Moving Average），簡稱 EWMA。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '這是本章最重要的公式。今天的變異數估計是昨天估計值（權重為 lambda）和昨天平方報酬率（權重為 1 減 lambda）的混合。簡潔而優雅。',
        note: 'EWMA: sigma_t^2 = lambda * sigma_{t-1}^2 + (1-lambda) * r_{t-1}^2',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'EWMA 遞迴公式：sigma_t^2 = lambda * sigma_{t-1}^2 + (1-lambda) * r_{t-1}^2',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'J.P. Morgan 在 1996 年的 RiskMetrics 中將日數據的 lambda 標準化為 0.94。這表示昨天的平方報酬率獲得 0.06 的權重，有效窗口大約是 1 除以 (1 - 0.94)，約為 17 天。舊數據平滑地衰減；沒有硬邊界，也沒有幽靈效應。',
        note: 'RiskMetrics 標準：lambda = 0.94。有效窗口 ≈ 1/(1-0.94) = 17 天。',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'EWMA 權重衰減：w_i = (1-lambda) * lambda^{i-1}。權重以幾何方式遞減。',
      },
      {
        type: 'check',
        question: '在 lambda = 0.94 的 EWMA 模型中，昨天的平方報酬率獲得多少權重？',
        options: [
          '0.94（94%）',
          '0.06（6%）',
          '0.50（50%）',
          '0.01（1%）',
        ],
        correctIndex: 1,
        onCorrect: '正確！昨天的平方報酬率獲得 (1 - lambda) = 0.06 的權重，而之前的變異數估計以 0.94 的權重延續。這意味著新資訊會逐步但有意義地更新估計值。',
        onWrong: '昨天平方報酬率的權重是 (1 - lambda) = 1 - 0.94 = 0.06。之前的變異數估計以 lambda = 0.94 的權重延續。這就是 EWMA 如何融合舊估計和新資訊的方式。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '這裡有一個重要的預告，為下週做準備。EWMA 實際上是 GARCH(1,1) 的特例，其中 omega 等於零且 alpha 加 beta 等於一。這意味著 EWMA 沒有長期均值可以回歸。波動率只是漫無目的地漂移。GARCH 通過加入均值回歸（Mean Reversion）修正了這個限制。',
      },
      {
        type: 'check',
        question: 'EWMA 缺少而 GARCH(1,1) 提供的關鍵性質是什麼？',
        options: [
          '使用日數據的能力',
          '回歸長期波動率水準的均值回歸性',
          '處理負報酬率的能力',
          '觀測值的指數加權',
        ],
        correctIndex: 1,
        onCorrect: '完全正確！EWMA 沒有長期均值，所以變異數估計可以無限漂移。GARCH(1,1) 包含一個常數項 omega，將變異數拉回長期均衡水準。這是一個關鍵的改進。',
        onWrong: 'EWMA 缺乏均值回歸性。因為 EWMA 中 alpha + beta = 1 且 omega = 0，所以沒有一個長期變異數水準讓估計值回歸。GARCH(1,1) 通過包含一個常數項來創造均值回歸，修正了這個問題。',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 3: Realized Volatility (10 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: '滾動窗口和 EWMA 都使用每日收盤價。但在每一天之內，價格是持續波動的。我們能利用這些日內資訊嗎？答案是可以的，這就叫做已實現波動率（Realized Volatility）。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '已實現波動率就是日內報酬率平方和的總和。隨著取樣頻率的增加，這個總和會收斂到真實的積分變異數（Integrated Variance）。這是我們最接近衡量實際波動率的方法。',
        note: 'RV_t = sum of r_{t,j}^2。隨著取樣頻率增加，收斂至積分變異數。',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: '已實現波動率：RV_t = sum_{j=1}^{M} r_{t,j}^2，其中 M 是日內區間數。',
      },
      {
        type: 'lecture',
        character: 'priya',
        text: '我們通常使用 5 分鐘報酬率，每個交易日可得到 78 個觀測值。更高頻率會引入微結構雜訊（Microstructure Noise）。買賣價差跳動（Bid-Ask Bounce）會扭曲估計值。5 分鐘是實務上的最佳平衡點。',
      },
      {
        type: 'check',
        question: '為什麼從業者通常使用 5 分鐘報酬率來計算已實現波動率，而不是 1 秒鐘報酬率？',
        options: [
          '1 秒鐘的數據無法取得',
          '更高頻率的數據會引入微結構雜訊（買賣價差跳動），扭曲估計值',
          '5 分鐘報酬率比較容易下載',
          '已實現波動率只能用 5 分鐘數據',
        ],
        correctIndex: 1,
        onCorrect: '正確！在非常高的頻率下，買賣價差跳動等微結構雜訊會主導訊號。5 分鐘取樣在捕捉日內變化和避免雜訊汙染之間取得平衡。',
        onWrong: '問題在於微結構雜訊。在非常高的頻率下，買賣價差跳動和其他市場微結構效應會汙染衡量結果。5 分鐘取樣是資訊量和雜訊之間的實務折衷。',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 4: Break (10 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'narrator',
        text: '休息 10 分鐘。回來後，我們將探討 VIX——市場前瞻性波動率指標，然後在 Python 中建構完整的波動率儀表板。',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 5: The VIX (15 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: '我們目前介紹的三種方法都是回顧性的（Backward-Looking）。它們告訴你波動率「過去是」多少，而非市場預期它「將是」多少。VIX 採取一種根本不同的方法：它從選擇權（Options）價格中萃取波動率預期。',
        note: 'VIX：從 S&P 500 選擇權價格推導出的前瞻性隱含波動率（Implied Volatility）。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'VIX 是年化的。當 VIX 等於 20 時，市場預期未來 30 天的年化波動率約為 20%。它常被稱為恐懼指標（Fear Gauge）。正常市場：12 到 18。偏高：20 到 30。危機：超過 30。極度恐慌：超過 50。',
        note: 'VIX 解讀：12-18 平靜, 20-30 偏高, 30+ 危機, 50+ 極度恐慌',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '在 2020 年 3 月 16 日，VIX 達到 82.69，是史上最高紀錄之一。但關鍵觀察是：VIX 在 2 月底就已升至 40 以上，「早於」最嚴重的拋售潮。選擇權交易者在恐懼完全反映在已實現報酬率之前就已定價。',
      },
      {
        type: 'visual',
        component: 'VolatilityTimeSeries',
        caption: 'COVID-19 期間的 VIX：2020 年 3 月 16 日飆升至 82.69。領先崩盤數天。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '還有一個重要概念：變異數風險溢價（Variance Risk Premium）。平均而言，隱含波動率超過已實現波動率。這個差異就是選擇權賣方因承擔波動率風險而獲得的溢價。而股票市場中的波動率微笑（Volatility Smile）或波動率偏斜（Smirk）顯示市場明確地為厚尾和負偏態定價。',
        note: '變異數風險溢價：隱含波動率 > 已實現波動率（平均而言）。',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: '所以當我們的滾動窗口還在沉睡時，VIX 已經在尖叫危險。如果我們當時有關注 VIX，就能更早採取行動。',
      },
      {
        type: 'check',
        question: 'VIX 與滾動窗口波動率和 EWMA 的根本區別是什麼？',
        options: [
          'VIX 使用更多數據點',
          'VIX 是前瞻性的（Forward-Looking），來自選擇權價格，而滾動窗口和 EWMA 是回顧性的',
          'VIX 更準確',
          'VIX 只在危機時有效',
        ],
        correctIndex: 1,
        onCorrect: '完全正確！VIX 來自選擇權價格，反映市場對未來波動率的預期。滾動窗口和 EWMA 只看歷史報酬率。這種前瞻性正是 VIX 在危機中常常領先的原因。',
        onWrong: '關鍵區別是方向性：VIX 是前瞻性的，從嵌入未來波動率預期的選擇權價格中萃取。滾動窗口和 EWMA 是回顧性的，從歷史報酬率計算。',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 6: Python Live Demo (15 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'priya',
        text: '是時候建構我們的波動率儀表板了。我們將比較 S&P 500 在 COVID-19 期間的滾動窗口、EWMA 和 VIX。打開你的筆電跟著做。',
      },
      {
        type: 'visual',
        component: 'CodeDisplay',
        caption: '程式區塊 1：下載 S&P 500 數據，計算 20 天、60 天和 252 天滾動波動率（年化）。',
        props: { codeBlock: 1 },
      },
      {
        type: 'visual',
        component: 'CodeDisplay',
        caption: '程式區塊 2：以 lambda = 0.94 實作 EWMA。為學習目的使用手動迴圈；生產環境中使用 pandas.ewm()。',
        props: { codeBlock: 2 },
      },
      {
        type: 'visual',
        component: 'CodeDisplay',
        caption: '程式區塊 3：下載 VIX 並將所有指標繪製在同一圖表上，標示 COVID-19 崩盤期間。',
        props: { codeBlock: 3 },
      },
      {
        type: 'lecture',
        character: 'alex',
        text: '看看這個儀表板。VIX 最先飆升。EWMA 在幾天內跟上。但 252 天滾動窗口直到 4 月才有明顯反應。就像看三個氣象站在不同時間報告同一場暴風雨。',
      },
      {
        type: 'visual',
        component: 'GARCHVolatilityDashboard',
        caption: '完整波動率儀表板：COVID-19 期間的滾動 20 天、滾動 252 天、EWMA 和 VIX。',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 7: Application (10 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'narrator',
        text: 'Alex 將波動率儀表板投射到螢幕上。Kenji 用手指沿著曲線比較每種衡量方法在 COVID-19 危機期間的反應。',
      },
      {
        type: 'visual',
        component: 'DataTable',
        caption: '表 2.1：反應速度。滾動 20 天：8.2% 到 89.7%。滾動 252 天：12.1% 到 23.8%。EWMA：10.5% 到 83.4%。VIX：13.7% 到 82.7%。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'VIX 領先一切：它在 2 月 24 日就突破 30%，比 S&P 500 進入熊市早了四天。EWMA 是最快的回顧性指標：指數加權意味著 2 月的拋售立即主導了估計值。而 252 天滾動窗口幾乎毫無用處，即使在危機高峰期也被 2019 年 8 個月的平靜數據所稀釋。',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: 'EWMA 本可以比我們的 252 天窗口至少早一週給出預警信號。那一週本可以為我們節省數億日圓。',
      },
      {
        type: 'check',
        question: '對於投資組合的每日風險監控，你會推薦哪個波動率指標作為主要的回顧性工具？',
        options: [
          '252 天滾動窗口以求穩定',
          '20 天滾動窗口以求反應快',
          'lambda = 0.94 的 EWMA，在反應性和平滑性之間取得最佳平衡',
          '5 分鐘報酬率的已實現波動率',
        ],
        correctIndex: 2,
        onCorrect: '很好的選擇。lambda = 0.94 的 EWMA 為每日風險監控提供了最佳平衡：它對新資訊反應迅速，同時又足夠平滑以避免誤報。',
        onWrong: '對於每日風險監控，lambda = 0.94 的 EWMA 通常是最佳的回顧性選擇。它比 252 天窗口反應快得多，比 20 天窗口更平滑，而且不像已實現波動率那樣需要日內數據。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '教訓很明確：偵測速度在風險管理中至關重要。提前一週的預警可以節省數億元。正確的衡量工具不是奢侈品，而是必需品。',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 8: Stylized Facts and Discussion (10 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: 'EWMA 比固定滾動窗口好，但它仍然相對簡單。在我們建構更好的模型之前，讓我們先整理已知的波動率特性。有五個典型化事實（Stylized Facts），任何好的模型都必須捕捉。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '事實一：叢聚（Clustering）。大幅報酬率後傾向跟著大幅報酬率。事實二：均值回歸（Mean Reversion）。波動率傾向回歸長期平均值。事實三：不對稱性（Asymmetry）。負報酬率比同等幅度的正報酬率更能增加未來的波動率。',
        note: '典型化事實：1) 叢聚, 2) 均值回歸, 3) 不對稱性, 4) 長記憶, 5) 共同運動',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '事實四：長記憶（Long Memory）。絕對報酬率的自相關衰減非常緩慢。事實五：共同運動（Co-movement）。在危機期間，各市場的波動率同時上升。這五個事實是任何優良波動率模型的設計規格。',
      },
      {
        type: 'check',
        question: '滾動窗口法能很好地捕捉哪個波動率的典型化事實？',
        options: [
          '叢聚',
          '均值回歸',
          '不對稱性',
          '以上皆非；它無法很好地捕捉任何一個',
        ],
        correctIndex: 3,
        onCorrect: '正確！滾動窗口的等權重和硬邊界使其無法很好地捕捉這五個典型化事實中的任何一個。EWMA 部分捕捉了叢聚。需要 GARCH 及其擴展模型才能系統性地處理這些特性。',
        onWrong: '滾動窗口實際上無法很好地捕捉任何一個典型化事實。其等權重和硬邊界不適合波動率動態、不對稱、均值回歸的本質。這激發了我們將要學習的更複雜模型。',
      },
      {
        type: 'discuss_timer',
        durationMinutes: 3,
        prompt: '考慮五種情境：做月度配置決策的投資組合經理、計算每日 VaR 的風險管理者、為選擇權定價的衍生品交易員、評估系統性風險的監管者，以及學術研究者。你會為每位推薦哪種波動率指標？',
        guidePoints: [
          '投資組合經理（月度）：60-252 天滾動窗口以求穩定',
          '風險管理者（每日 VaR）：EWMA 或短期滾動窗口以求反應快',
          '衍生品交易員：VIX / 隱含波動率，因為選擇權是前瞻性的',
          '監管者：多種指標，包括已實現波動率以求準確',
          '學術研究者：已實現波動率作為黃金標準基準',
        ],
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '關鍵要點是沒有單一最佳指標。正確的尺子取決於工作。投資組合經理需要穩定性，所以較長窗口適用。風險管理者需要速度，所以 EWMA 勝出。衍生品交易員需要前瞻性資訊，所以 VIX 為王。研究者需要黃金標準，也就是已實現波動率。',
      },
      {
        type: 'check',
        question: '為股票選擇權定價的衍生品交易員應主要依賴哪種波動率指標？',
        options: [
          '252 天歷史波動率',
          'lambda = 0.94 的 EWMA',
          '隱含波動率（Implied Volatility）（VIX 或選擇權隱含）',
          '5 分鐘報酬率的已實現波動率',
        ],
        correctIndex: 2,
        onCorrect: '正確！衍生品交易員需要前瞻性資訊，因為選擇權是對未來波動率的押注。從選擇權價格本身推導出的隱含波動率是最自然、最相關的指標。',
        onWrong: '衍生品交易員需要前瞻性資訊，因為選擇權是對未來結果的索償。從選擇權價格萃取的隱含波動率直接反映市場預期，是最相關的定價輸入。',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 9: Wrap-up and Mission (5 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: '讓我總結今天的六個關鍵重點。第一：波動率不是常數。它會叢聚、均值回歸，並對好消息和壞消息做出不對稱的反應。第二：滾動窗口簡單直觀，但等權重使其反應遲緩且容易產生幽靈效應。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '第三：lambda = 0.94 的 EWMA 利用指數權重在反應性和平滑性之間取得平衡。第四：已實現波動率在有日內數據時是黃金標準。第五：VIX 是前瞻性的，在危機中常常領先於已實現波動率。第六：沒有放諸四海皆準的指標。正確的工具取決於應用場景。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '任務 2（Mission 2）：為三個指數建構波動率儀表板：Nikkei 225、S&P 500 和 FTSE 100。計算 20、60、252 天的滾動波動率，加上 EWMA。建立比較表格並撰寫 200 字備忘錄給 Kenji，推薦每日風險監控的最佳指標。',
        note: '任務 2：3 個指數的波動率儀表板，滾動（20, 60, 252），EWMA，比較表格，200 字備忘錄',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '加分挑戰：嘗試在 Nikkei 225 上使用 lambda 分別為 0.90、0.94 和 0.97 的 EWMA。比較反應性和平滑性。你會選擇哪個 lambda 值進行每日風險管理？',
      },
      {
        type: 'lecture',
        character: 'priya',
        text: 'Alex，你的儀表板做得很扎實。但 EWMA 真的能「預測」明天的波動率嗎？還是它只是描述了已經發生的事情？',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '這正是正確的問題，Priya。下週，我將向你們展示開啟一切的模型：GARCH。它賦予波動率記憶，並做出我們可以檢驗的預測。下週：GARCH，發現波動率具有記憶。',
      },
    ],
  },
];
