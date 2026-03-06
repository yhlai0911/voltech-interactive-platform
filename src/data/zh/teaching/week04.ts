import type { SegmentTeaching } from '@/types';

export const week04Teaching: SegmentTeaching[] = [
  // ── Segment 1: Opening Story (w04-s01) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '歡迎回來。上週我們建構了 GARCH(1,1)——三個參數、均值回歸（Mean Reversion）、波動率模型之王。但我們留下了一個懸念。Alex，提醒大家你發現了什麼。' },
      { type: 'lecture', character: 'alex', text: '我分別繪製了上漲日和下跌日的 GARCH 標準化殘差。兩者的分配「不」一樣。在負報酬率之後，次日的波動率始終高於同等幅度正報酬率之後的波動率。殘差偏態為 -0.31——GARCH 無法解釋這種不對稱性。' },
      { type: 'lecture', character: 'drLin', text: '讓我用具體數字來說明。在 -3% 的一天之後和 +3% 的一天之後——你覺得次日的波動率一樣嗎？猜猜看。比率是多少？' },
      { type: 'check', question: '對於典型的股票指數，負報酬率對次日波動率的影響與同等幅度正報酬率相比如何？', options: ['它們產生完全相同的波動率', '負報酬率產生約 1.5 倍的影響', '負報酬率產生約 3-4 倍的影響', '正報酬率實際上產生更多波動率'], correctIndex: 2, onCorrect: '沒錯！對於典型的股票指數，負報酬率產生的波動率影響大約是正報酬率的 3 到 4 倍。這是一個巨大的不對稱性，而 GARCH 完全忽略了它。', onWrong: '不對稱性是驚人的。負報酬率通常產生正報酬率 3 到 4 倍的波動率影響。GARCH 對它們一視同仁——這就是問題所在。' },
      { type: 'lecture', character: 'narrator', text: '這種不對稱性——壞消息比好消息衝擊更大——被稱為槓桿效應（Leverage Effect）。今天我們建構一個能捕捉它的模型。' },
    ],
  },

  // ── Segment 2: Leverage Effect (w04-s02) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '為什麼負面消息比正面消息更能增加波動率？有兩個令人信服的理論，而且它們都預測同樣的結果。' },
      { type: 'lecture', character: 'drLin', text: '理論一來自 Fischer Black 在 1976 年的資產負債表槓桿管道（Balance-Sheet Leverage Channel）。當股價下跌時，股權的市值下降，但債務保持不變。因此負債股權比自動上升。更高的槓桿意味著更高的財務風險，從而意味著股權波動率上升。股價下跌、槓桿上升、波動率上升。' },
      { type: 'lecture', character: 'drLin', text: '理論二是 Campbell 和 Hentschel 在 1992 年提出的波動率回饋效應（Volatility Feedback Effect）。這個理論方向相反。如果預期波動率因某種原因增加，投資者會要求更高的報酬率來補償額外的風險。為了讓股票在未來提供更高的報酬率，其價格必須「現在」下跌。所以預期波動率的增加會導致即時的價格下跌。' },
      { type: 'lecture', character: 'drLin', text: '兩個管道都預測同樣的可觀察模式：負報酬率與比正報酬率更大的波動率增加相關。而且效應不是微小的——它在全球股票市場中都是強烈且普遍的。' },
      { type: 'lecture', character: 'kenji', text: '這正是 2020 年 3 月我們投資組合發生的事情。市場一天接一天下跌，而每一天次日的已實現波動率都遠高於我們對稱的 GARCH 模型所預測的。我們系統性地低估了風險。' },
      { type: 'check', question: '以下哪個陳述最能描述槓桿效應？', options: ['波動率在正報酬率和負報酬率之後同等增加', '只有負報酬率會影響未來的波動率', '負報酬率對未來波動率的影響比同等幅度的正報酬率「更大」', '槓桿效應只存在於日本股票市場'], correctIndex: 2, onCorrect: '完全正確。正報酬率和負報酬率都會影響波動率，但影響是不對稱的——負面衝擊產生不成比例的更大增加。', onWrong: '正報酬率和負報酬率都會影響波動率。槓桿效應意味著負報酬率產生的波動率增加比同等絕對值的正報酬率「更大」。' },
      { type: 'check', question: '為什麼股價下跌會通過資產負債表管道增加股權波動率？', options: ['因為投資者恐慌拋售', '因為負債股權比上升，增加了財務風險', '因為公司發行更多債務', '因為利率上升'], correctIndex: 1, onCorrect: '正確。當股權價值下降而債務不變時，公司的槓桿增加，財務風險增加，從而波動率上升。', onWrong: '資產負債表管道：股價下跌、股權價值下降、債務不變、負債股權比上升、財務風險增加、波動率上升。' },
    ],
  },

  // ── Segment 3: GJR-GARCH Model (w04-s03) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '我們需要一個對好消息和壞消息區別對待的模型。這正是 Glosten、Jagannathan 和 Runkle 在 1993 年提出的。GJR-GARCH 模型。' },
      { type: 'lecture', character: 'drLin', text: '這是方程式。Sigma_t 的平方等於 omega + alpha 乘以 r_{t-1} 的平方 + gamma 乘以 r_{t-1} 的平方乘以指示函數 I(r_{t-1} < 0) + beta 乘以 sigma_{t-1} 的平方。新增的部分就是那個 gamma 項。', note: 'GJR-GARCH: sigma_t^2 = omega + alpha * r_{t-1}^2 + gamma * r_{t-1}^2 * I(r_{t-1} < 0) + beta * sigma_{t-1}^2' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'GJR-GARCH 方程式，含指示函數 I(r_{t-1} < 0)' },
      { type: 'lecture', character: 'drLin', text: '指示函數（Indicator Function）I(r_{t-1} < 0) 就像一個電燈開關。當昨天的報酬率為負時它是「開」——等於 1。為正時是「關」——等於 0。當開啟時，模型對壞消息增加 gamma 乘以 r_{t-1} 的平方作為懲罰。' },
      { type: 'lecture', character: 'drLin', text: '讓我用數字說明這意味著什麼。假設 alpha = 0.03，gamma = 0.12。如果昨天報酬率為正 2%：對變異數的影響是 alpha 乘以 4，等於 0.12。如果昨天報酬率為負 2%：影響是 (alpha + gamma) 乘以 4，等於 0.60。大了五倍！一個參數——gamma——創造了這整個不對稱性。', note: '正向衝擊：alpha * r^2 | 負向衝擊：(alpha + gamma) * r^2 | 不對稱比率：(alpha + gamma) / alpha' },
      { type: 'lecture', character: 'drLin', text: '我們定義不對稱比率（Asymmetry Ratio）為 (alpha + gamma) / alpha。這一個數字告訴你負面衝擊的影響是正面衝擊的多少倍。對於典型的股票指數，比率在 3 到 5 之間。' },
      { type: 'visual', component: 'FormulaDisplay', caption: '不對稱比率 = (alpha + gamma) / alpha；定態性：alpha + gamma/2 + beta < 1' },
      { type: 'lecture', character: 'drLin', text: '定態性條件變為 alpha + gamma/2 + beta < 1。為什麼是 gamma/2？因為指示函數大約只在一半的時間是啟動的——報酬率大致對稱於零，所以負日大約佔 50% 的時間。' },
      { type: 'check', question: '在一個 alpha = 0.04、gamma = 0.12 的 GJR-GARCH 模型中，不對稱比率是多少？', options: ['3.0', '4.0', '0.25', '12.0'], correctIndex: 1, onCorrect: '正確！(0.04 + 0.12) / 0.04 = 0.16 / 0.04 = 4.0。負面衝擊的影響是正面衝擊的 4 倍。', onWrong: '不對稱比率是 (alpha + gamma) / alpha = (0.04 + 0.12) / 0.04 = 4.0。' },
    ],
  },

  // ── Segment 4: News Impact Curve (w04-s04) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '新聞衝擊曲線（News Impact Curve, NIC）是比較波動率模型最具啟發性的方式。它繪製的是在其他條件固定於長期水準的情況下，次日變異數作為今日報酬率函數的圖形。' },
      { type: 'lecture', character: 'drLin', text: '對於標準 GARCH，NIC 是一個以零為中心的對稱 U 形拋物線。+3% 的衝擊和 -3% 的衝擊產生完全相同的變異數。模型無法區分好消息和壞消息。' },
      { type: 'lecture', character: 'drLin', text: '現在畫 GJR-GARCH 的 NIC。它是一個在零點有折點的不對稱拋物線。左支——負報酬率——比右支上升得陡得多。這個折點就是槓桿效應的視覺特徵。給自己時間消化這張圖——它是今天最重要的圖表。' },
      { type: 'visual', component: 'NewsImpactCurve', caption: '新聞衝擊曲線：GARCH（對稱拋物線）vs. GJR-GARCH（在零點有折點的不對稱曲線）' },
      { type: 'lecture', character: 'drLin', text: '在同一座標軸上看兩條 NIC。在 r_{t-1} = -4% 時，GJR 的變異數遠高於 GARCH。在 r_{t-1} = +4% 時，兩者相似。隨著負面衝擊幅度的增加，差距越來越大。這就是整個故事的一張圖。' },
      { type: 'check', question: '在新聞衝擊曲線上，GARCH 和 GJR-GARCH 之間最大的差異在哪裡？', options: ['在小的正報酬率處', '在零報酬率處', '在大的負報酬率處', '在大的正報酬率處'], correctIndex: 2, onCorrect: '完全正確！差距在大的負面衝擊時最大，因為 GJR-GARCH 的 gamma 項增加了一個 GARCH 完全遺漏的顯著懲罰。', onWrong: '差異在大的負報酬率處最大。GJR 的 gamma 項在負面衝擊時啟動，將變異數推到遠高於 GARCH 的估計。在正報酬率處，兩個模型給出相似的結果。' },
    ],
  },

  // ── Segment 5: Break (w04-s05) ──
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: '休息 10 分鐘。回來後，我們探討 EGARCH 替代方案、學習概似比檢定（Likelihood Ratio Test），並在 Python 中執行模型。' },
    ],
  },

  // ── Segment 6: EGARCH Alternative (w04-s06) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Daniel Nelson 在 1991 年提出了一個替代方案：不直接建模變異數，而是建模變異數的「對數」。由於任何數的指數函數都是正的，變異數自動為正——不需要參數約束。' },
      { type: 'lecture', character: 'drLin', text: 'EGARCH 方程式是：ln(sigma_t^2) = omega + alpha * (|z_{t-1}| - E[|z|]) + gamma * z_{t-1} + beta * ln(sigma_{t-1}^2)。注意它使用標準化殘差 z_{t-1} 而非原始報酬率。', note: 'EGARCH: ln(sigma_t^2) = omega + alpha*(|z_{t-1}| - E[|z|]) + gamma*z_{t-1} + beta*ln(sigma_{t-1}^2)' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'EGARCH 模型：對數變異數公式，使用標準化殘差' },
      { type: 'lecture', character: 'drLin', text: '現在有一個關鍵的警告，每年都會絆倒學生。在 GJR-GARCH 中，gamma 大於零表示槓桿效應。在 EGARCH 中，gamma「小於」零表示同樣的槓桿效應。符號慣例是相反的！在解讀 gamma 之前永遠要確認你在看哪個模型。' },
      { type: 'lecture', character: 'drLin', text: '讓我比較兩個模型。GJR 直接建模 sigma_t^2，需要非負性約束，NIC 是在零點有折點的分段線性。EGARCH 建模 ln(sigma_t^2)，不需要約束因為 exp 總是正的，NIC 是指數形的。兩者通過不同的數學機制捕捉同樣的經濟效應。' },
      { type: 'lecture', character: 'priya', text: '兩者都能很好地捕捉不對稱性。GJR 更直觀且更容易向監管者解釋。EGARCH 更靈活且無需約束即可保證正變異數。對於客戶報告，我會推薦 GJR 以求可解釋性。' },
      { type: 'check', question: '在 EGARCH 中，gamma 估計值為 -0.15 表示：', options: ['沒有槓桿效應', '存在槓桿效應——負報酬率比正報酬率更能增加波動率', '槓桿效應的反面', '模型設定錯誤'], correctIndex: 1, onCorrect: '正確！在 EGARCH 中，負的 gamma 和 GJR-GARCH 中正的 gamma 意思相同：負面衝擊更能增加波動率。符號慣例是相反的。', onWrong: '在 EGARCH 中，gamma < 0 表示槓桿效應。這和 GJR-GARCH 中 gamma > 0 表示槓桿的符號慣例相反。同樣的經濟效應，不同的數學表示。' },
    ],
  },

  // ── Segment 7: Likelihood Ratio Test (w04-s07) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '我們現在有兩個不對稱模型。但不對稱性是否真的在統計上顯著？也許 gamma 真的和零沒有差異。我們需要一個正式的檢定。' },
      { type: 'lecture', character: 'drLin', text: '這是關鍵洞見：標準 GARCH 是「嵌套」在 GJR-GARCH 中的。如果你在 GJR 方程中將 gamma 設為零，你就得到了 GARCH 方程。所以我們可以使用概似比檢定（Likelihood Ratio Test）來問：加入 gamma 是否顯著改善了模型？' },
      { type: 'lecture', character: 'drLin', text: '檢定統計量是 LR = 2 * (L_GJR - L_GARCH)，其中 L 是對數概似值。在 gamma = 0 的虛無假設下，LR 服從自由度為 1 的卡方分配——因為 GJR 恰好多了一個參數。5% 顯著水準的臨界值是 3.84。', note: 'LR = 2 * [L_GJR - L_GARCH] ~ chi^2(1)。5% 臨界值：3.84' },
      { type: 'visual', component: 'FormulaDisplay', caption: '概似比檢定：LR = 2[L_GJR - L_GARCH] ~ chi^2(1)' },
      { type: 'lecture', character: 'drLin', text: '如果 LR 超過 3.84，我們拒絕虛無假設。這意味著不對稱性在統計上顯著——使用 GARCH 而非 GJR-GARCH 會丟失關於市場如何反應衝擊的重要資訊。對於股票指數，檢定幾乎總是拒絕。槓桿效應就是那麼強。' },
      { type: 'check', question: '如果 GJR-GARCH 的對數概似值為 -3450.2，GARCH 為 -3458.1，LR 統計量是多少？我們是否應該拒絕 H0: gamma = 0？', options: ['LR = 7.9，不拒絕', 'LR = 15.8，拒絕——不對稱性顯著', 'LR = 7.9，拒絕——不對稱性顯著', 'LR = 3.84，恰好在邊界'], correctIndex: 1, onCorrect: '正確！LR = 2 * (-3450.2 - (-3458.1)) = 2 * 7.9 = 15.8。由於 15.8 > 3.84，我們強力拒絕 gamma = 0。', onWrong: 'LR = 2 * (L_GJR - L_GARCH) = 2 * (-3450.2 + 3458.1) = 2 * 7.9 = 15.8。這遠超臨界值 3.84，所以我們拒絕 H0——不對稱性高度顯著。' },
    ],
  },

  // ── Segment 8: Python Live Demo (w04-s08) ──
  {
    steps: [
      { type: 'lecture', character: 'priya', text: '是時候讓數據說話了。我要配適三個模型——GARCH、GJR-GARCH 和 EGARCH——都使用 Student-t 分配的 S&P 500 數據。打開你的筆電。' },
      { type: 'visual', component: 'CodeDisplay', caption: '程式區塊 1：配適 GARCH(1,1)、GJR-GARCH(1,1) 和 EGARCH(1,1)——模型比較表' },
      { type: 'lecture', character: 'priya', text: '看看比較表。GJR 和 EGARCH 的 AIC 和 BIC 都比標準 GARCH 低。不對稱性確實重要。EGARCH 在統計上可能有輕微優勢，但 GJR 更易解釋。' },
      { type: 'visual', component: 'CodeDisplay', caption: '程式區塊 2：GJR-GARCH 參數、不對稱比率、持續性、長期波動率、半衰期' },
      { type: 'lecture', character: 'priya', text: '不對稱比率約為 3.5 到 4.0。負報酬率對次日波動率的影響大約是正報酬率的 3.5 到 4 倍。這確認了槓桿效應不只在統計上顯著，在經濟上也很顯著。' },
      { type: 'visual', component: 'CodeDisplay', caption: '程式區塊 3：三個模型在同一圖表上的新聞衝擊曲線' },
      { type: 'lecture', character: 'priya', text: '就是這個——三個模型的新聞衝擊曲線在同一張圖上。GARCH 是對稱拋物線。GJR 在零點有折點，左支更陡。EGARCH 呈指數曲線。在大的負面衝擊處差異很大。' },
      { type: 'visual', component: 'NewsImpactCurve', caption: 'NIC 比較：GARCH（對稱）、GJR-GARCH（有折點）、EGARCH（指數形）' },
      { type: 'visual', component: 'CodeDisplay', caption: '程式區塊 4：COVID 期間（2019年10月-2020年9月）GARCH vs. GJR-GARCH 條件波動率' },
      { type: 'lecture', character: 'priya', text: '這是 COVID 比較圖。看看 2020 年 3 月——GJR-GARCH 在崩盤期間始終估計出比標準 GARCH 更高的波動率。每一個連續的負日都啟動 gamma 項，日復一日地擴大差距。概似比檢定確認：改善高度顯著。' },
      { type: 'visual', component: 'VolatilityTimeSeries', caption: '條件波動率比較：COVID-19 期間的 GARCH vs. GJR-GARCH' },
    ],
  },

  // ── Segment 9: Application and Diagnostics (w04-s09) ──
  {
    steps: [
      { type: 'lecture', character: 'alex', text: '讓我展示 COVID 案例研究的數字。崩盤期間 GARCH 的平均波動率：年化 52.3%。GJR-GARCH 的平均波動率：61.8%。差距 9.5 個百分點。在最糟的時期 GARCH 比 GJR 低了 15.4%。' },
      { type: 'lecture', character: 'kenji', text: '這對 VaR——我的合規團隊關心的實際風險數字——意味著什麼？' },
      { type: 'lecture', character: 'alex', text: '在峰值日，GARCH VaR 為 11.50%，而 GJR VaR 為 13.80%。GARCH VaR 在最糟的那一天低估了約 17% 的風險。對於管理數十億的退休基金，這個資本充足率差距是巨大的。' },
      { type: 'lecture', character: 'drLin', text: '為什麼差距在崩盤期間最大？每一個負日都啟動 gamma 項。在不對稱比率約 3.8 的情況下，每個負日在 GJR 中的波動率影響幾乎是 GARCH 的四倍。而這些效應通過 beta * sigma^2 管道複合——昨天較高的 GJR 變異數注入今天的估計。' },
      { type: 'lecture', character: 'drLin', text: '讓我檢查診斷結果。殘差偏態：GARCH 殘差的偏態約為 -0.31。GJR-GARCH 殘差更接近零。通過給負面衝擊額外權重，GJR 部分解釋了不對稱性。而平方標準化殘差的 Ljung-Box 檢定給出大 p 值——模型充分捕捉了波動率動態。' },
      { type: 'discuss_timer', durationMinutes: 3, prompt: '槓桿效應在股票中最強。你預期黃金也有同樣的不對稱性嗎？美元/日圓呢？和鄰座同學討論。', guidePoints: ['黃金沒有負債股權機制——gamma 可能接近零', '美元/日圓沒有槓桿管道，但快速貶值可能觸發央行恐懼', '槓桿效應從根本上是股票特有的現象'] },
      { type: 'check', question: '為什麼忽視不對稱性在市場崩盤時最為嚴重？', options: ['因為崩盤是罕見事件', '因為連續的負日會複合 gamma 效應，擴大 GARCH 和 GJR 之間的差距', '因為 GARCH 在崩盤期間無法估計參數', '因為不對稱模型在數值上更穩定'], correctIndex: 1, onCorrect: '完全正確。崩盤期間會出現連續的負日。每一天都啟動 gamma，而通過 beta * sigma^2 的複合效應使 GARCH 和 GJR 之間的波動率差距日益擴大。', onWrong: '崩盤期間，負報酬率出現在連續的交易日。每一天都在 GJR 中啟動 gamma 懲罰，而這個效應通過持續性項複合，使 GARCH 和 GJR 之間的波動率差距越來越大。' },
      { type: 'lecture', character: 'david', text: '你的 GJR 模型明顯擬合更好。NIC 和概似比檢定都很有說服力。但它能「預測」明天的風險嗎？擬合昨天的數據是容易的部分。預測未來很難。' },
    ],
  },

  // ── Segment 10: Wrap-up and Mission (w04-s10) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '讓我用六個關鍵重點做總結。第一，槓桿效應：負報酬率比同等幅度的正報酬率更能增加未來的波動率。資產負債表管道和波動率回饋管道都解釋了這一點。' },
      { type: 'lecture', character: 'drLin', text: '第二，GJR-GARCH 用一個指示函數擴展了標準 GARCH，給負面衝擊額外的權重。一個額外的參數——gamma——捕捉了整個不對稱性。第三，新聞衝擊曲線是關鍵的診斷工具。GARCH 給出對稱拋物線。GJR 給出在零點有折點的不對稱拋物線。' },
      { type: 'lecture', character: 'drLin', text: '第四，EGARCH 建模對數變異數，保證正性。但注意符號慣例——在 EGARCH 中 gamma < 0 表示槓桿效應。第五，概似比檢定正式確認 gamma 是否顯著異於零。對於股票，幾乎總是顯著的。' },
      { type: 'lecture', character: 'drLin', text: '第六——實務影響。忽略不對稱性會在市場下跌後低估風險，而這恰好是準確風險衡量最重要的時候。VaR 差距在危機峰值日可達 15 到 17%。' },
      { type: 'lecture', character: 'drLin', text: '任務 4（Mission 4），你的作業如下。在 Nikkei 225 和 S&P 500 上配適 GARCH、GJR-GARCH 和 EGARCH。報告不對稱比率。繪製三個模型的新聞衝擊曲線。製作 COVID 比較圖。執行概似比檢定。撰寫一頁備忘錄給 Kenji，解釋他的退休基金應該使用哪個模型以及原因。' },
      { type: 'lecture', character: 'drLin', text: '加分挑戰：對五個資產類別配適 GJR-GARCH——S&P 500、Nikkei、FTSE 100、黃金和美元/日圓。比較各資產的 gamma。哪裡的不對稱性最強？哪裡最弱甚至反轉？' },
      { type: 'lecture', character: 'david', text: '擬合很容易。預測很難。' },
      { type: 'lecture', character: 'priya', text: '我一直在進行樣本外測試。GARCH、GJR、EGARCH，還有我的 LSTM。結果...很有趣。' },
      { type: 'lecture', character: 'narrator', text: '下週我們進入波動率預測的世界——模型不是用擬合過去的好壞來評判，而是用預測未來的好壞。賽馬開始。第五週見。' },
    ],
  },
];
