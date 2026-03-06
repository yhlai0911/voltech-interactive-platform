import type { SegmentTeaching } from '@/types';

export const week03Teaching: SegmentTeaching[] = [
  // ── Segment 1: Opening Story (w03-s01) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '歡迎回來，各位。上週我們學了四種衡量波動率的尺子——滾動窗口（Rolling Window）、EWMA、已實現波動率（Realized Volatility）和 VIX。EWMA 是最快的回顧性指標，但它沒有長期錨點。今天我們要問一個更大膽的問題。' },
      { type: 'lecture', character: 'alex', text: 'EWMA 告訴我們波動率「現在」是多少。但我們能不能預測它「明天」會是多少？這是我一直在想的問題。' },
      { type: 'lecture', character: 'drLin', text: 'Benoit Mandelbrot 曾說過：大的變化之後往往跟著大的變化。想想看。COVID 崩盤、2008 年金融危機、2024 年日圓套利交易平倉——平靜孕育平靜，混亂孕育混亂。這種可預測的模式就是我們的切入點。' },
      { type: 'check', question: '以下哪一個是金融報酬率中可預測的模式？', options: ['未來報酬率的方向', '未來報酬率的幅度（波動率叢聚）', '下週的確切價格水準', '明天報酬率的正負號'], correctIndex: 1, onCorrect: '完全正確！報酬率本身不可預測，但它們的幅度——波動率——遵循一種持續性模式。', onWrong: '不完全對。報酬率是不可預測的，但它們的幅度（波動率）會隨時間叢聚——大幅波動後跟著大幅波動。' },
      { type: 'lecture', character: 'narrator', text: 'Alex 想從衡量走向預測。波動率叢聚（Volatility Clustering）是使預測成為可能的關鍵可預測模式。' },
    ],
  },

  // ── Segment 2: Detecting Clustering (w03-s02) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '要偵測叢聚，我們需要一個每日波動率的代理變數。最簡單的是什麼？將報酬率平方。當你將報酬率平方時，正負號被消除，只留下幅度。一個大的正日和一個大的負日都會產生一個大的平方報酬率。' },
      { type: 'lecture', character: 'drLin', text: '現在，見證奇蹟的時刻。繪製原始報酬率隨時間的變化——它們看起來隨機，在零上下跳動，毫無規律。但繪製「平方」報酬率，突然你看到了持續性叢聚。平靜期。動盪期。它們交替出現，而且轉換是漸進的，不是瞬間的。' },
      { type: 'visual', component: 'ACFBarChart', caption: '原始報酬率的 ACF（平坦）vs. 平方報酬率的 ACF（持續衰減）' },
      { type: 'lecture', character: 'drLin', text: '自相關函數（ACF, Autocorrelation Function）揭示了全部故事。原始報酬率的 ACF 基本上是平坦的——報酬率方向不可預測。但平方報酬率的 ACF 顯示出強烈的正自相關，緩慢衰減至滯後期 50 甚至更遠。今天的波動率水準能預測明天的、下週的，甚至下個月的。' },
      { type: 'lecture', character: 'drLin', text: '我們用 Ljung-Box Q 統計量來正式化這一點。在無自相關的虛無假設下，Q 服從卡方分配。小的 p 值意味著我們拒絕虛無假設——叢聚是真實的。', note: 'Ljung-Box: Q(m) = T(T+2) * sum(rho_hat(k)^2 / (T-k)) ~ chi^2(m)' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Ljung-Box Q 統計量：用於檢定平方報酬率的自相關' },
      { type: 'lecture', character: 'drLin', text: '對於 S&P 500 的平方報酬率，10 期滯後的 Q 等於 187.3，p 值低於 0.001。無波動率叢聚的虛無假設被徹底粉碎。這是我們眼睛在 ACF 圖中已經看到的統計確認。' },
      { type: 'check', question: '為什麼平方報酬率的 ACF 顯示強烈的持續性，而原始報酬率的 ACF 幾乎是平坦的？', options: ['報酬率具有自相關但平方運算移除了它', '報酬率不可預測，但它們的幅度（波動率）具有持續性', '平方運算引入了人為的自相關', 'Ljung-Box 檢定只對平方數據有效'], correctIndex: 1, onCorrect: '完美。報酬率本身幾乎不可預測，但它們的平方值——波動率的代理——具有強烈的自相關。', onWrong: '再想想。原始報酬率沒有顯示規律是因為方向不可預測。平方報酬率顯示持續性是因為波動率本身會隨時間叢聚。' },
    ],
  },

  // ── Segment 3: The ARCH Model (w03-s03) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '我們已經確認波動率會叢聚。現在我們需要一個能捕捉這個模式並讓我們預測的「模型」。登場的是 Robert Engle 和 ARCH——自迴歸條件異質變異模型（Autoregressive Conditional Heteroskedasticity）。' },
      { type: 'lecture', character: 'drLin', text: '從報酬率分解開始。把這個記下來：r_t 等於 sigma_t 乘以 z_t。報酬率是一個隨時間變化的音量旋鈕——sigma_t——乘以一個隨機方向——z_t，它是均值為零、變異數為一的 i.i.d. 分配。', note: '報酬率分解：r_t = sigma_t * z_t，其中 z_t ~ i.i.d.(0, 1)' },
      { type: 'visual', component: 'FormulaDisplay', caption: '報酬率分解：r_t = sigma_t * z_t' },
      { type: 'lecture', character: 'drLin', text: '這是關鍵洞見。z_t 部分是不可預測的——這就是報酬率本身不可預測的原因。但 sigma_t 是可預測的——這就是平方報酬率有自相關的原因。我們要建模的是 sigma_t，而不是 r_t。' },
      { type: 'lecture', character: 'drLin', text: 'ARCH(q) 模型表示：sigma_t 的平方等於 omega 加上 alpha_i 乘以 r_{t-i} 的平方之和，i 從 1 到 q。今天的變異數取決於過去 q 個平方報酬率。我們需要 omega 嚴格為正，每個 alpha 非負。', note: 'ARCH(q): sigma_t^2 = omega + sum(alpha_i * r_{t-i}^2)' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'ARCH(q) 模型：sigma_t^2 = omega + alpha_1 * r_{t-1}^2 + ... + alpha_q * r_{t-q}^2' },
      { type: 'check', question: '在 ARCH 模型中，如果昨天的報酬率非常大，今天的條件變異數會怎樣？', options: ['它會下降，因為大幅報酬率會均值回歸', '它保持不變，因為 ARCH 忽略過去的報酬率', '它會增加，因為昨天的大平方報酬率會注入今天的變異數', '這取決於昨天報酬率的正負號'], correctIndex: 2, onCorrect: '完全正確！一個大的 r_{t-1} 意味著一個大的 r_{t-1}^2，這會推高 sigma_t^2。這就是 ARCH 捕捉叢聚的方式。', onWrong: '記住，ARCH 使用 r_{t-1}^2——一個大的平方報酬率會直接增加今天的變異數估計。這「就是」叢聚。' },
      { type: 'lecture', character: 'drLin', text: '但 ARCH 有一個問題。要捕捉我們在數據中看到的自相關緩慢衰減，需要很多滯後期——q 等於 20 或更多。這意味著要估計 20 多個參數。不實用。我們需要一種更簡約的方法。' },
    ],
  },

  // ── Segment 4: GARCH(1,1) (w03-s04) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Tim Bollerslev 在 1986 年有了一個精妙的想法。如果我們把昨天的「變異數」也加進來作為預測變數呢？這一個簡單的添加就把參數量從 20 多個減少到只需 3 個。' },
      { type: 'lecture', character: 'drLin', text: '這就是本課程最重要的公式。Sigma_t 的平方等於 omega 加上 alpha 乘以 r_{t-1} 的平方加上 beta 乘以 sigma_{t-1} 的平方。三個參數。這就是 GARCH(1,1)。', note: 'GARCH(1,1): sigma_t^2 = omega + alpha * r_{t-1}^2 + beta * sigma_{t-1}^2' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'GARCH(1,1): sigma_t^2 = omega + alpha * r_{t-1}^2 + beta * sigma_{t-1}^2' },
      { type: 'lecture', character: 'drLin', text: '讓我逐一說明每個參數。Omega 是變異數的基礎常數——把它想成是將波動率拉回基地的重力。沒有 omega，你得到的就是 EWMA。Alpha 是衝擊係數——昨天的意外多大程度上影響今天的波動率？典型值在 0.05 到 0.15 之間。高 alpha 意味著反應劇烈、尖銳的波動率。', note: 'omega > 0：基礎變異數 | alpha >= 0：衝擊反應 (0.05-0.15) | beta >= 0：持續性 (0.80-0.95)' },
      { type: 'lecture', character: 'drLin', text: 'Beta 是持續性係數——昨天的波動率有多少延續到今天？典型值在 0.80 到 0.95 之間。高 beta 意味著長記憶、緩慢衰減。模型會「記住」。' },
      { type: 'lecture', character: 'drLin', text: '為了使模型行為良好，我們需要 alpha 加 beta 嚴格小於 1。這是定態性條件（Stationarity Condition）——它確保波動率不會爆炸到無窮大。典型的股票數據給出 alpha 加 beta 在 0.95 到 0.99 之間。' },
      { type: 'lecture', character: 'drLin', text: '這是深層洞見。通過在方程中遞迴替代 sigma_{t-1} 的平方，你可以證明 GARCH(1,1) 等同於具有幾何衰減權重的 ARCH-無窮大。beta 參數編碼了整個無限歷史。三個參數真的就夠了。' },
      { type: 'lecture', character: 'drLin', text: '現在讓我把這和我們已知的聯繫起來。在你的筆記中把 EWMA 寫在 GARCH 下面。EWMA 把 omega 設為零且 alpha 加 beta 等於一。那加入 omega 改變了什麼？它創造了一個「基地」。波動率有了可以回歸的地方。沒有它，波動率就只是永遠漂移。' },
      { type: 'check', question: 'GARCH(1,1) 相對於 EWMA 的關鍵優勢是什麼？', options: ['GARCH 使用更多參數', 'GARCH 有一個波動率回歸的長期變異數', 'GARCH 忽略過去的平方報酬率', 'GARCH 總是產生較低的波動率估計'], correctIndex: 1, onCorrect: '完全正確！omega 項創造了一個長期錨點。衝擊後，GARCH 波動率會衰減回到這個基地。EWMA 則無限漂移。', onWrong: '關鍵在於 omega 項。它創造了一個長期變異數——一個波動率在衝擊後回歸的基地。EWMA 沒有這樣的錨點。' },
      { type: 'visual', component: 'VolatilityComparison', caption: 'GARCH 均值回歸 vs. EWMA 在波動率衝擊後的漂移' },
    ],
  },

  // ── Segment 5: Break (w03-s05) ──
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: '休息 10 分鐘。回來後，我們將推導長期變異數、探索半衰期（Half-Life），並了解波動率回到均衡的速度有多快。' },
    ],
  },

  // ── Segment 6: Mean Reversion and Half-Life (w03-s06) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '歡迎回來。讓我們推導長期變異數——我一直提到的基地。如果我們在 GARCH 方程中令 sigma_t 的平方等於 sigma_{t-1} 的平方並求解，得到 sigma-bar 的平方等於 omega 除以 (1 - alpha - beta)。', note: '長期變異數：sigma_bar^2 = omega / (1 - alpha - beta)' },
      { type: 'visual', component: 'FormulaDisplay', caption: '長期變異數：sigma_bar^2 = omega / (1 - alpha - beta)' },
      { type: 'lecture', character: 'drLin', text: '讓我把這變得具體。假設 omega 等於 0.000005，alpha 等於 0.08，beta 等於 0.90。那麼 sigma-bar 的平方等於 0.000005 除以 0.02，得到 0.00025。日波動率為 1.58%，年化約 25.1%。' },
      { type: 'lecture', character: 'drLin', text: '現在想想 EWMA。它把 omega 設為零且 alpha 加 beta 等於一。分母變成零——不存在有限的長期變異數。衝擊後，EWMA 波動率永遠漂移。它永遠回不了家。這就是 GARCH 的決定性優勢。' },
      { type: 'lecture', character: 'drLin', text: '波動率回歸到長期水準的速度有多快？我們用半衰期（Half-Life）來衡量：h 等於 ln(0.5) 除以 ln(alpha + beta)。這告訴我們衝擊衰減 50% 需要多少天。', note: '半衰期：h = ln(0.5) / ln(alpha + beta)' },
      { type: 'visual', component: 'FormulaDisplay', caption: '波動率衝擊的半衰期：h = ln(0.5) / ln(alpha + beta)' },
      { type: 'lecture', character: 'drLin', text: '例如：如果 alpha + beta = 0.97，則 h 等於 -0.693 除以 -0.0305，約 22.8 天。波動率衝擊大約需要 23 天半衰。如果持續性上升到 0.99，半衰期跳到 69 天。更高的持續性意味著更長的記憶。' },
      { type: 'check', question: '一個 GARCH 模型的 alpha + beta = 0.95。波動率衝擊衰減一半大約需要多少天？', options: ['大約 7 天', '大約 14 天', '大約 23 天', '大約 69 天'], correctIndex: 1, onCorrect: '正確！alpha + beta = 0.95 時，h = ln(0.5)/ln(0.95) = 約 13.5 天，大約 14 天。', onWrong: '使用公式：h = ln(0.5)/ln(0.95) = -0.693/(-0.0513) = 約 13.5，大約 14 天。' },
    ],
  },

  // ── Segment 7: MLE Overview (w03-s07) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '我們有了模型。但如何從實際數據中找到 omega、alpha 和 beta？我們需要最大概似估計法（Maximum Likelihood Estimation, MLE）。這個想法非常簡潔：哪組參數使觀測數據最有可能出現？' },
      { type: 'lecture', character: 'drLin', text: '對數概似函數（Log-Likelihood Function）長這樣：L 等於 -1/2 乘以 [ln(2*pi) + ln(sigma_t^2) + r_t^2/sigma_t^2] 的總和。當 sigma_t^2 太小時，最後一項會爆掉。當它太大時，對數項會主導。MLE 找到同時平衡兩者的最佳點。', note: 'L = -1/2 * sum[ln(2*pi) + ln(sigma_t^2) + r_t^2/sigma_t^2]' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'GARCH 對數概似函數' },
      { type: 'lecture', character: 'drLin', text: '在實務中，電腦執行數值最佳化來最大化這個函數——我們不需要手算。一個有用的擴展：從第一週我們知道報酬率有厚尾。對 z_t 使用 Student-t 分配而非常態分配可以容納這一點。它增加一個參數——自由度 nu，通常在 5 到 7 之間。' },
      { type: 'check', question: '最大概似估計法找到的是什麼？', options: ['最小化變異數的參數', '使觀測數據最有可能出現的參數', '產生最平滑波動率路徑的參數', '標準誤最小的參數'], correctIndex: 1, onCorrect: '完全正確。MLE 問的是：給定我們的數據，哪個 omega、alpha、beta 能最大化觀測到這些報酬率的機率？', onWrong: 'MLE 找到的是使觀測數據機率最大化的參數。它在問：什麼參數值使我們的數據最有可能出現？' },
    ],
  },

  // ── Segment 8: Python Live Demo (w03-s08) ──
  {
    steps: [
      { type: 'lecture', character: 'priya', text: '是時候在 Python 中估計一個真正的 GARCH 模型了。讓我展示三個數字如何捕捉 S&P 500 的整個波動率動態。打開你的筆電跟著做。' },
      { type: 'visual', component: 'CodeDisplay', caption: '程式區塊 1：下載 S&P 500 數據，並排繪製報酬率和平方報酬率' },
      { type: 'lecture', character: 'priya', text: '看看這兩個面板。原始報酬率隨機跳動。但平方報酬率顯示出明顯的叢聚——2017 年和 2019 年的平靜區塊，然後是 2020 年 3 月 COVID 的爆發。你的眼睛正在偵測 Ljung-Box 檢定將要確認的同一種自相關。' },
      { type: 'visual', component: 'CodeDisplay', caption: '程式區塊 2：原始 vs. 平方報酬率的 ACF + Ljung-Box 檢定' },
      { type: 'lecture', character: 'priya', text: '就是這個——ACF 比較圖。原始報酬率的 ACF 是平的，在每個滯後期都貼近零。平方報酬率的 ACF 從 0.2 以上開始，緩慢衰減到滯後期 50 以後。Ljung-Box Q 統計量的 p 值極小。叢聚不可否認。' },
      { type: 'visual', component: 'CodeDisplay', caption: '程式區塊 3：使用 arch 函式庫配適 Student-t 分配的 GARCH(1,1)' },
      { type: 'lecture', character: 'priya', text: '讓我帶你看輸出結果。Omega 非常小——約 0.000002，是常數基線。Alpha 約 0.08——中等衝擊反應。Beta 約 0.91——強持續性。合計 alpha + beta 等於 0.99。而 Student-t 自由度約為 6，確認了厚尾。' },
      { type: 'visual', component: 'CodeDisplay', caption: '程式區塊 4：繪製年化條件波動率，標示危機區間' },
      { type: 'lecture', character: 'priya', text: '這張圖展示了 GARCH 如何追蹤從 2015 到 2024 年的每一次體制轉變。注意波動率在 2020 年 3 月 COVID 崩盤時飆升，然後緩慢衰減回長期水準。這就是均值回歸的實際表現——正如數學所預測的。' },
      { type: 'visual', component: 'GARCHVolatilityDashboard', caption: 'GARCH 條件波動率隨時間變化圖，標示危機期間' },
    ],
  },

  // ── Segment 9: Application and Diagnostics (w03-s09) ──
  {
    steps: [
      { type: 'lecture', character: 'alex', text: '我把條件波動率圖投射到會議室螢幕上。看看 COVID 期間。崩盤前，模型估計使用的是截至 2020 年 1 月的數據，日波動率約 0.72%。然後在 2 月 24 日，S&P 500 單日下跌了 3.35%。' },
      { type: 'lecture', character: 'kenji', text: '那第一次衝擊後 GARCH 模型預測了什麼？' },
      { type: 'lecture', character: 'alex', text: '這就是起始問題。GARCH 計算次日的變異數為 omega + alpha 乘以 3.35 的平方 + beta 乘以 0.72 的平方。但 beta 是 0.90，這意味著 90% 的預測來自昨天的「平靜」變異數。只有 10% 來自新衝擊。預測結果是日波動率 1.21%。而接下來一週的已實現波動率？3.8%。GARCH 在第一天低估了 3.14 倍。' },
      { type: 'lecture', character: 'drLin', text: '這是根本性的限制。VIX 立即飆升，因為選擇權交易者主動將恐懼定價。GARCH 是被動反應的——它必須通過遞迴更新來累積證據。需要幾次衝擊才能追上。' },
      { type: 'lecture', character: 'drLin', text: '現在讓我們檢查模型在訓練數據上是否做好了它的工作。配適 GARCH 後，計算標準化殘差（Standardized Residuals）：z-hat_t 等於 r_t 除以 sigma-hat_t。如果模型正確，這些殘差應該是 i.i.d.，其平方不應有殘餘的自相關。', note: '標準化殘差：z_hat_t = r_t / sigma_hat_t 應為 i.i.d.' },
      { type: 'lecture', character: 'drLin', text: '對平方標準化殘差的 Ljung-Box 檢定給出 Q(10) = 8.2，p 值 = 0.61。GARCH 已成功吸收了波動率叢聚。平方殘差現在表現得像 i.i.d. 抽樣。' },
      { type: 'check', question: 'GARCH 過濾後，標準化殘差的偏態為 -0.31。這告訴我們什麼？', options: ['模型設定完美', 'GARCH 對正向和負向衝擊的處理完全相同，但壞消息實際上的衝擊更大', 'Student-t 分配是錯的', '數據不再有任何結構'], correctIndex: 1, onCorrect: '完全正確！GARCH 使用 r_{t-1}^2 來消除正負號。+3% 和 -3% 的報酬率產生相同的影響。但在現實中，負面衝擊對波動率的影響更大。這就是槓桿效應（Leverage Effect）——它指向第四週。', onWrong: '殘差中的負偏態揭示了 GARCH 無法區分好消息和壞消息。它將報酬率平方，消除了正負號。但壞消息比好消息衝擊更大——這就是我們下週要修正的不對稱性。' },
      { type: 'lecture', character: 'drLin', text: 'GARCH 使用 r_{t-1} 的平方，這消除了正負號。+3% 的報酬率和 -3% 的報酬率對波動率產生相同的影響。但在現實中，負面衝擊對波動率的影響更大。這就是槓桿效應（Leverage Effect）——也是第四週的主題。' },
    ],
  },

  // ── Segment 10: Wrap-up and Mission (w03-s10) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '讓我總結六個關鍵重點。第一，波動率會叢聚——大幅報酬率後往往跟著大幅報酬率。這是金融數據中最穩健的模式，通過 ACF 和平方報酬率的 Ljung-Box 檢定得到確認。' },
      { type: 'lecture', character: 'drLin', text: '第二，ARCH 開啟了一切。Engle 在 1982 年證明了今天的變異數取決於過去的平方報酬率。但 ARCH 需要很多參數。第三，GARCH(1,1) 佔主導地位。Bollerslev 在 1986 年加入了滯後變異數，將一切簡化為三個參數。Hansen 和 Lunde 在 2005 年測試了數百個模型——沒有任何模型能持續擊敗它。' },
      { type: 'lecture', character: 'drLin', text: '第四，均值回歸是 GARCH 相對於 EWMA 的關鍵優勢。長期變異數 sigma-bar 的平方提供了一個基地。第五，MLE 通過最大化觀測數據的機率來找到最佳參數。' },
      { type: 'lecture', character: 'drLin', text: '第六——限制。GARCH 對正向和負向衝擊的處理完全相同。殘差偏態告訴我們有些東西遺漏了。下週，我們修正這個問題。' },
      { type: 'lecture', character: 'drLin', text: '任務 3（Mission 3），你需要完成以下內容。在 Nikkei 225 和 S&P 500 上估計 GARCH(1,1)。報告參數、計算長期波動率和半衰期。繪製條件波動率隨時間的變化圖。對標準化殘差進行診斷檢查——Ljung-Box、偏態、峰度。' },
      { type: 'lecture', character: 'drLin', text: 'GARCH 消除了正負號。但壞消息比好消息衝擊更大。下週，我們讓模型擁有分辨好壞消息的眼睛。準備好迎接 GJR-GARCH 和槓桿效應。' },
      { type: 'lecture', character: 'priya', text: '嘿 Alex——你的 GARCH 模型是被動反應的，不是主動預測的。它等暴風雨來了才拉響警報。我的神經網路也許能做得更好。' },
      { type: 'lecture', character: 'alex', text: '證明給我看。' },
      { type: 'lecture', character: 'narrator', text: '那個挑戰從第五週開始。下週見。' },
    ],
  },
];
