import type { SegmentTeaching } from '@/types';

/**
 * Week 01 「金融風險與報酬分配」教學腳本
 *
 * 10 segments (aligned 1:1 with lesson week01):
 *   seg 0: Opening Story (w01-s01)              — 8 steps
 *   seg 1: Returns (w01-s02)                    — 8 steps
 *   seg 2: Normal Distribution (w01-s03)        — 7 steps
 *   seg 3: Fat Tails and Moments (w01-s04)      — 8 steps
 *   seg 4: Break (w01-s05)                      — 1 step
 *   seg 5: QQ Plot and JB Test (w01-s06)        — 7 steps
 *   seg 6: Python Live Demo (w01-s07)           — 6 steps
 *   seg 7: Application (w01-s08)                — 6 steps
 *   seg 8: Discussion (w01-s09)                 — 5 steps
 *   seg 9: Wrap-up and Mission (w01-s10)        — 5 steps
 *                                        Total: ~61 steps
 */
export const week01Teaching: SegmentTeaching[] = [
  // ═══════════════════════════════════════════════════
  // Segment 0: Opening Story (10 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: '歡迎各位。在我們開始之前，請看黑板上的兩個數字：14,000 和 3。你們覺得這兩個數字代表什麼？花一點時間猜猜看。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '在常態分配（Normal Distribution）下，5 個標準差的損失應該每 14,000 年才發生一次。但在現實中，大約每 3 年就會發生一次。這個差距正是金融風險管理的核心問題，也正是我們今天要深入了解的。',
      },
      {
        type: 'lecture',
        character: 'narrator',
        text: 'Alex Chen 在第一天來到 VolTech Analytics。三台大螢幕顯示著即時市場數據。角落的白板上寫滿了希臘字母和半擦掉的方程式。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Alex，歡迎加入團隊。讓我跟你說說我們最新的客戶。Kenji Tanaka 在日本一家最大的退休基金管理交易部門。在 2020 年 3 月，他的投資組合在一週內損失了 18%，而風險模型預測的最大可能損失只有 4.2%。',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: '標準參數型 VaR（Value at Risk）。假設常態分配。我們的供應商說這是業界標準。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '這確實「是」業界標準。而這正是問題所在。',
      },
      {
        type: 'check',
        question: 'Kenji 的 VaR 模型預測最大週損失為 4.2%，但實際損失為 18%。最可能的根本原因是什麼？',
        options: [
          '模型使用了太短的數據窗口',
          '模型假設報酬率服從常態分配，低估了尾部風險（Tail Risk）',
          '模型有程式錯誤',
          '那一週市場被操縱了',
        ],
        correctIndex: 1,
        onCorrect: '完全正確。常態分配將極端事件的機率設得微乎其微，但在現實中這些事件發生的頻率遠高於此。這就是厚尾問題（Fat-Tail Problem）。',
        onWrong: '雖然數據窗口和實作方式確實重要，但根本問題在於分配假設。常態分配大幅低估了極端損失的機率。這就是今天的核心課題。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '在我們修復 Kenji 的風險模型之前，我們需要先了解它為什麼會失效。我們需要看看金融報酬率「實際上」長什麼樣子，而不是教科書「假設」它們長什麼樣。',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 1: Returns (15 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'check',
        question: '為什麼我們分析報酬率（Returns）而不是直接分析價格？',
        options: [
          '報酬率比較容易計算',
          '價格是非定態的（Non-stationary），會隨時間向上漂移，而報酬率則圍繞穩定的均值波動',
          '價格比報酬率包含更多雜訊',
          '報酬率總是正的',
        ],
        correctIndex: 1,
        onCorrect: '沒錯。價格是非定態的，意味著其統計特性會隨時間變化。報酬率近似定態（Stationary），因此適合用於統計建模。',
        onWrong: '關鍵原因是定態性（Stationarity）。價格傾向於隨時間向上漂移，使其均值和變異數不穩定。報酬率圍繞相對穩定的均值波動，這對任何統計分析都是必要的。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '報酬率最簡單的定義就是價格的百分比變化。我們稱之為簡單報酬率（Simple Return）。',
        note: 'Simple return: R_t = (P_t - P_{t-1}) / P_{t-1}',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: '簡單報酬率公式：R_t = (P_t - P_{t-1}) / P_{t-1}',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '在量化金融中，我們通常偏好使用對數報酬率（Log Return）。它等於價格比率的自然對數。對數報酬率的優點在於它具有時間可加性（Time-Additivity）：一週的對數報酬率就是五天日對數報酬率的總和。',
        note: 'Log return: r_t = ln(P_t / P_{t-1}) = ln(1 + R_t)',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: '對數報酬率：r_t = ln(P_t / P_{t-1})。關鍵性質：時間可加性。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '這裡有一個實用的近似。當 x 很小時，ln(1+x) 約等於 x。因此當報酬率低於 5% 時，簡單報酬率和對數報酬率幾乎相同。只有在大幅波動時，兩者的差異才會顯著。',
        note: '近似：ln(1+x) ≈ x for small x',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '可以這樣理解。在訊號處理中，你分析訊號的頻譜。在金融中，我們分析報酬率的分配。同樣的概念，不同的領域。',
      },
      {
        type: 'check',
        question: '哪個性質使得對數報酬率在多期分析中特別有用？',
        options: [
          '它們總是正值',
          '它們具有時間可加性：多期報酬率等於各單期報酬率的總和',
          '它們需要較少的數據來計算',
          '它們消除了統計檢定的需要',
        ],
        correctIndex: 1,
        onCorrect: '正確！時間可加性是最關鍵的優勢。如果你想要一個月的報酬率，只需加總所有日對數報酬率即可。使用簡單報酬率則需要連乘，這會使事情複雜化。',
        onWrong: '關鍵性質是時間可加性。任何期間的對數報酬率等於所有子期間對數報酬率的總和。這大幅簡化了多期分析。',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 2: Normal Distribution (15 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: '現在我們知道了什麼是報酬率，讓我們來看標準模型。自 1900 年 Bachelier 以來，預設假設都是報酬率服從常態分配（Normal Distribution），僅由兩個參數完整描述：均值（Mean）和變異數（Variance）。',
        note: '高斯模型：r_t ~ N(mu, sigma^2)',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: '高斯模型（Gaussian Model）：r_t ~ N(mu, sigma^2)。僅兩個參數就能描述整個分配。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '在常態分配下，極端事件的機率以指數速度衰減。以下是著名的 sigma 法則：68.3% 的觀測值落在正負一個 sigma 之內。95.4% 在兩個 sigma 之內。99.7% 在三個 sigma 之內。5 個 sigma 事件的機率大約是 0.00003%。',
        note: '±1σ: 68.3% | ±2σ: 95.4% | ±3σ: 99.7% | 5σ: ~1 in 3.5 million',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'Sigma 法則：±1σ = 68.3%, ±2σ = 95.4%, ±3σ = 99.7%, 5σ ≈ 每 13,900 年一次',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '但現實是這樣的。從 1990 年到 2024 年，S&P 500 至少經歷了 20 次超過 5 個 sigma 的日波動。本該數千年才發生一次的事件，卻在每十年間多次出現。常態分配在尾部是危險地錯誤的。',
      },
      {
        type: 'check',
        question: '在常態分配下，5 個 sigma 的日損失應該多久發生一次？',
        options: [
          '大約每年一次',
          '大約每十年一次',
          '大約每 13,900 年一次',
          '它永遠不應該發生',
        ],
        correctIndex: 2,
        onCorrect: '正確！在常態分配下，5 個 sigma 事件大約每 13,900 年發生一次。然而在真實市場中，我們大約每 3 年就會看到這樣的事件。這個巨大的差異正是為什麼常態模型會失敗。',
        onWrong: '在常態分配下，5 個 sigma 事件大約每 13,900 年發生一次。事實上大約每 3 年就會發生一次，這說明常態模型大幅低估了尾部風險。',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: '所以你是在告訴我，我們的模型是建立在一個謊言之上？',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 3: Fat Tails and Moments (15 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: '不是謊言，Kenji。是一種近似。常態分配在一般情況下運作得還不錯。但「還不錯」和「足以安全管理退休基金」是完全不同的標準。要了解報酬率如何偏離常態性，我們需要看的不只是均值和變異數。我們需要第三和第四動差（Moments）。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '第三動差是偏態（Skewness）。它衡量不對稱性。公式是 z 分數三次方的平均值。立方保留了符號，所以負報酬會把它拉向左邊。大多數股票報酬率序列呈現負偏態，意味著大幅損失比大幅獲利更常見。',
        note: '偏態：S = 0 對稱, S < 0 左尾較重（大幅損失更頻繁）',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: '偏態（Skewness）：S < 0 表示負偏態（極端損失多於極端獲利）',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '第四動差是超額峰度（Excess Kurtosis）。它是 z 分數四次方的平均值，再減去 3。四次方會放大極端值，所以厚尾會推高它。當峰度等於零時，尾部大小與常態分配相同。當它為正值時，尾部更厚。金融報酬率具有強烈的尖峰厚尾性（Leptokurtic）。',
        note: '超額峰度：K = 0 常態, K > 0 厚尾（尖峰厚尾）',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: '超額峰度（Excess Kurtosis）：K > 0 表示厚尾。金融報酬率通常 K >> 0。',
      },
      {
        type: 'check',
        question: 'S&P 500 日報酬率的超額峰度是多少？大多數人猜 0 到 3。',
        options: [
          '大約 0（與常態分配相同）',
          '大約 3',
          '大約 10 或更高',
          '大約 -2（比常態分配更薄）',
        ],
        correctIndex: 2,
        onCorrect: '驚訝嗎？S&P 500 日報酬率的超額峰度通常為 10 或更高。這意味著極端事件的頻率遠高於常態分配所預測的。',
        onWrong: '答案是大約 10 或更高！大多數人嚴重低估了金融報酬率的厚尾程度。這個巨大的峰度意味著極端事件的機率遠高於常態分配的預測。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '一個有前景的解決方案是 Student-t 分配。它具有較重的尾部，由自由度參數 nu 控制。對於典型的股票報酬率，nu 值在 4 到 8 之間能提供比常態分配好得多的擬合。我們將從第三週起在 GARCH 模型中大量使用它。',
      },
      {
        type: 'lecture',
        character: 'alex',
        text: '所以厚尾意味著極端事件比常態分配預測的更頻繁。而負偏態意味著大幅下跌比大幅上漲更可能。這正是 Kenji 的投資組合所發生的事情。',
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
        text: '休息 10 分鐘。回來後，我們將學習如何正式檢定常態性，並使用 QQ plot 和 Jarque-Bera 檢定來視覺化偏離程度。',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 5: QQ Plot and JB Test (15 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: '歡迎回來。快速回顧：我們了解到報酬率具有遠高於零的峰度所代表的厚尾，以及負偏態。現在，我們如何正式檢定常態性並視覺化偏離程度？',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'QQ plot 將你觀測數據的分位數與理論常態分位數進行比較。如果數據真的是常態的，點會整齊地落在 45 度線上。但對於金融報酬率，你幾乎總是會看到 S 形曲線，這代表厚尾。',
      },
      {
        type: 'visual',
        component: 'QQPlotDisplay',
        caption: 'QQ plot 解讀：點在線上 = 常態；S 形 = 厚尾',
      },
      {
        type: 'check',
        question: '在金融報酬率的 QQ plot 上，你預期會看到什麼模式？',
        options: [
          '點完美落在 45 度線上',
          'S 形曲線，兩端的點飛離直線',
          '一條水平線',
          '沒有規律的隨機散佈',
        ],
        correctIndex: 1,
        onCorrect: '完全正確！S 形是厚尾的視覺指紋。左端高於直線的點表示左尾更重；右端低於直線的點表示右尾更重。',
        onWrong: '金融報酬率在 QQ plot 上幾乎總是呈現 S 形曲線。S 形是厚尾的視覺特徵，也是金融中最常見的偏離常態性的現象。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Jarque-Bera 檢定將這個視覺檢查形式化。它將偏態和峰度合併成一個檢定統計量：JB 等於 T 除以 6，乘以 S 的平方加上 K 的平方除以 4。在常態性的虛無假設下，JB 服從自由度為 2 的卡方分配。如果 JB 超過 5.99，我們就拒絕常態性。',
        note: 'JB = (T/6)(S² + K²/4)。若 JB > 5.99（5% 顯著水準下的卡方臨界值），則拒絕常態性',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'Jarque-Bera 檢定：JB = (T/6)(S² + K²/4)。若 JB > 5.99 則拒絕常態性。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '在實務中，金融報酬率序列產生的 JB 統計量動輒數百甚至數千。p 值基本上為零。反對常態性的證據不僅在統計上顯著，而且是壓倒性的。',
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
        text: '理論很重要，但讓我們用真實數據來驗證。Alex，打開你的筆電。我們要拉取實際市場數據，親眼看看這些效應。',
      },
      {
        type: 'visual',
        component: 'CodeDisplay',
        caption: '程式區塊 1：匯入函式庫，使用 yfinance 下載 S&P 500 數據，計算對數報酬率。',
        props: { codeBlock: 1 },
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '我們先下載 S&P 500 的日數據並計算對數報酬率。現在讓我們看看描述統計。注意偏態和峰度的值。',
      },
      {
        type: 'visual',
        component: 'CodeDisplay',
        caption: '程式區塊 2：計算描述統計（均值、標準差、偏態、超額峰度）並執行 Jarque-Bera 檢定。',
        props: { codeBlock: 2 },
      },
      {
        type: 'visual',
        component: 'CodeDisplay',
        caption: '程式區塊 3：產生直方圖搭配常態分配疊圖和 QQ plot。QQ plot 是「驚嘆時刻」。',
        props: { codeBlock: 3 },
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '看看直方圖：峰值比常態曲線更高，尾部更厚。分配是尖峰厚尾的。而 QQ plot，那個無法忽視的 S 形，就是常態性被拒絕的視覺證據。每一個飛離 45 度線的點，都代表一個常態模型認為基本不可能發生的極端事件。',
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
        text: '午餐工作後，Alex 向團隊展示研究結果。螢幕上顯示 Kenji 退休基金股票投資組合的直方圖和 QQ plot。',
      },
      {
        type: 'lecture',
        character: 'alex',
        text: '以下是 Kenji 投資組合的結果。偏態為 -0.73。超額峰度為 13.4。Jarque-Bera 統計量為 4,892，p 值幾乎為零。數據在「吶喊」：這不是常態分配。',
      },
      {
        type: 'visual',
        component: 'DataTable',
        caption: '表 1.1：尾部機率比較。損失 > 3σ 的機率：常態 0.13% vs. 實際 1.7%。損失 > 5σ 的機率：常態 0.00003% vs. 實際 0.12%。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '看看尾部機率的比較。在常態模型下，5 個 sigma 的損失應該每 13,900 年發生一次。在 Kenji 的數據中，大約每 3 年就發生一次。一萬四千年對比三年。常態模型在尾部是危險地錯誤的。',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: '一萬四千年對比三年。現在我理解為什麼我的董事會如此憤怒了。',
      },
      {
        type: 'check',
        question: '你正在向 Kenji 的退休基金董事會做簡報。你會怎麼告訴他們目前的風險模型？',
        options: [
          '模型沒問題；2020 年 3 月是百年一遇的事件',
          '模型有根本性的缺陷，因為它假設常態尾部；我們需要厚尾模型',
          '模型只需要更長的數據窗口',
          '我們應該完全停止使用量化模型',
        ],
        correctIndex: 1,
        onCorrect: '完全正確。問題不是運氣不好或數據不足。分配假設本身就是錯的。像 Student-t 分配這樣的厚尾模型對於誠實的風險評估是不可或缺的。',
        onWrong: '2020 年 3 月不是一次性事件。數據顯示極端損失每隔幾年就會發生。根本原因在於分配假設。任何建立在常態性假設上的風險模型都會系統性地低估大額損失。我們需要厚尾替代方案。',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 8: Discussion (10 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: '現在我們已經看到了問題，讓我們討論「為什麼」金融報酬率是非常態的。至少有五個因素。第一：波動率叢聚（Volatility Clustering）。平靜期後跟著動盪期。我們將在第三週用 GARCH 來建模。第二：槓桿效應（Leverage Effect）。壞消息比好消息更能增加波動率。第四週的 GJR-GARCH 將涵蓋這個主題。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '第三：羊群行為（Herding Behavior）。投資者集體恐慌性拋售會放大下行波動。第四：資訊不對稱（Information Asymmetry），壞消息傳播得比好消息快。第五：市場微結構（Market Microstructure），包括交易暫停、追繳保證金和強制平倉，這些都會造成突然的跳躍。',
      },
      {
        type: 'discuss_timer',
        durationMinutes: 3,
        prompt: '分組討論，選擇五個因素之一，解釋它如何導致厚尾或負偏態。準備好報告你們的推理。',
        guidePoints: [
          '波動率叢聚：混合平靜期和動盪期會產生厚尾，即使每個時期近似常態',
          '槓桿效應：壞消息比好消息更能推升波動率，導致負偏態',
          '羊群行為：協調性拋售放大下行波動',
          '資訊不對稱：壞消息傳播更快，導致更劇烈的下跌',
          '微結構：追繳保證金和強制平倉產生連鎖性價格跳躍',
        ],
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '很棒的討論。這些因素中有些可以用更好的統計模型來捕捉，比如叢聚和槓桿效應。其他的則需要行為或制度面的解釋。這正是我們需要完整八週課程的原因。每一週，我們都會增加另一層的理解。',
      },
      {
        type: 'check',
        question: '哪個造成非常態性的因素將在第三週由 GARCH 直接建模？',
        options: [
          '羊群行為',
          '資訊不對稱',
          '波動率叢聚',
          '市場微結構',
        ],
        correctIndex: 2,
        onCorrect: '正確！GARCH 專門設計來捕捉波動率叢聚，即大幅報酬率後傾向跟著大幅報酬率的趨勢。這是金融數據中最重要的典型化事實（Stylized Facts）之一。',
        onWrong: 'GARCH 模型專門設計來捕捉波動率叢聚：平靜和動盪時期傾向於聚集在一起的實證觀察。羊群行為和資訊不對稱是行為性的，而微結構涉及制度性機制。',
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
        text: '讓我們用五個關鍵重點做總結。第一：永遠使用報酬率而非價格，因為報酬率近似定態且具有時間可加性。第二：常態性假設失敗。報酬率呈現厚尾和負偏態，極端損失的頻率遠高於常態分配的預測。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '第三：四個動差很重要。僅有均值和變異數是完全不夠的。第四：QQ plot 和 Jarque-Bera 檢定是你的第一線診斷工具。第五：任何建立在常態性假設上的風險模型都會系統性地低估大額損失。這不是理論上的好奇心；它讓 Kenji 的基金損失了數億元。',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: '任務 1（Mission 1）：下載三個指數的數據：S&P 500、Nikkei 225 和 FTSE 100。對每個指數計算四個動差，執行 Jarque-Bera 檢定，繪製直方圖和 QQ plot。建立比較表格並撰寫 200 字的執行摘要。',
        note: '任務 1：3 個指數，4 個動差，JB 檢定，直方圖，QQ plot，比較表格，200 字摘要',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: '你讓我看到了問題。現在讓我看看你能不能衡量它。我們的投資組合「現在」的波動率到底有多大？',
      },
      {
        type: 'lecture',
        character: 'priya',
        text: '你不能用一把尺子在所有時候衡量風險。下週，我們學習衡量波動率，並發現它從不靜止。',
      },
    ],
  },
];
