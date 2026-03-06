import type { SegmentTeaching } from '@/types';

export const week05Teaching: SegmentTeaching[] = [
  // --- Segment 1: 開場故事 (w05-s01, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '在我們開始之前，請看黑板上的三個模型名稱：GARCH(1,1)、GJR-GARCH(1,1)、EGARCH(1,1)。哪一個會產生最好的波動率預測？下注吧。' },
      { type: 'check', question: '你認為哪個模型會贏得預測競賽？', options: ['GARCH(1,1)', 'GJR-GARCH(1,1)', 'EGARCH(1,1)', '不會有顯著差異'], correctIndex: 1, onCorrect: '有趣的選擇！讓我們看看 GJR-GARCH 能不能不負期望。', onWrong: '合理的猜測。我們會在課程結束時揭曉答案。' },
      { type: 'lecture', character: 'narrator', text: '在 VolTech Analytics，Priya 帶著一台運行神經網路的筆電走進來。她直接向 Alex 下戰帖。' },
      { type: 'lecture', character: 'priya', text: '讓我用我的 LSTM 對決你的 GARCH。輸的人請贏家喝一年的咖啡。' },
      { type: 'lecture', character: 'alex', text: '成交。但我們怎麼決定勝負？我們不能用訓練用的數據來測試。' },
      { type: 'lecture', character: 'drLin', text: '一場賽馬。但我們需要公平的規則。不能在訓練數據上測試。這是預測的黃金法則。你可以這樣想：一個背答案的學生在模擬考上表現很好，但真正考試時就失敗了。一個記憶過去數據的模型在樣本內擬合得很漂亮，但在新數據上就失敗了。' },
      { type: 'lecture', character: 'drLin', text: '在比賽之前，我們需要三樣東西：一條賽道——滾動窗口（Rolling Window）；一個裁判——損失函數（Loss Functions）；以及一條終點線——統計檢定。讓我們一一建構。' },
    ],
  },

  // --- Segment 2: 預測框架 (w05-s02, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '想像一條時間線。前半段是訓練數據，稱為樣本內（In-sample）期間。後半段是測試數據，稱為樣本外（Out-of-sample）期間。樣本內評估模型擬合過去數據的好壞。樣本外評估它預測新數據的能力。只有後者才是真正預測力的衡量。' },
      { type: 'visual', component: 'FormulaDisplay', caption: '滾動窗口機制：一個固定寬度的 W 個觀測值窗口每天向前滑動一天', props: { formula: '\\text{Window: } \\{t-W+1,\\ldots,t\\} \\xrightarrow{\\text{forecast}} \\hat{\\sigma}_{t+1}^2' } },
      { type: 'lecture', character: 'drLin', text: '滾動窗口的運作方式如下。假設 W = 1000。第一個預測：用第 1 到 1000 天估計，預測第 1001 天。第二個預測：用第 2 到 1001 天估計，預測第 1002 天。窗口通過丟掉最舊的觀測值、加入最新的觀測值向前滾動。' },
      { type: 'check', question: '滾動窗口相較於擴展窗口（Expanding Window）的主要優勢是什麼？', options: ['滾動窗口使用更多數據', '滾動窗口更能適應市場狀態變化（Regime Changes）', '滾動窗口計算成本更低', '滾動窗口能消除所有預測誤差'], correctIndex: 1, onCorrect: '完全正確。通過丟棄舊數據，滾動窗口能適應結構性斷裂和市場狀態變化。', onWrong: '不太對。滾動窗口丟棄舊數據，有助於適應市場狀態變化。擴展窗口保留所有歷史，可能被過期的市場狀態數據所污染。' },
      { type: 'lecture', character: 'drLin', text: '我們做一天前的預測，因為 GARCH 是為條件變異數預測而設計的。多步預測需要迭代遞迴，會累積不確定性。先從簡單的開始。' },
      { type: 'lecture', character: 'priya', text: '一個實務上的提醒：對於大約 1500 個測試日中的每一天，我們都要從頭重新估計模型。這意味著要執行 1500 次最大概似最佳化。總計算時間約 5 到 15 分鐘。這是實際的成本。' },
    ],
  },

  // --- Segment 3: 波動率代理問題 (w05-s03, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '我們有了賽道。但有一個根本問題：我們預測的「真實」波動率到底是什麼？我們從來沒有直接觀測到它。波動率是隱性的（Latent）。如果你預測溫度，你可以看溫度計。但波動率沒有溫度計。' },
      { type: 'visual', component: 'FormulaDisplay', caption: '平方報酬率作為波動率代理', props: { formula: 'E[r_t^2 \\mid \\mathcal{F}_{t-1}] = \\sigma_t^2 \\quad (\\text{when } \\mu = 0)' } },
      { type: 'lecture', character: 'drLin', text: '最簡單的代理是平方報酬率 r_t^2。它是條件變異數的不偏估計量。但它的雜訊極大，因為每天只有一個觀測值。使用 r_t^2 就像用一支誤差範圍為正負 20 度的溫度計每天量一次溫度。平均值是對的，但任何單次讀數幾乎沒用。' },
      { type: 'lecture', character: 'alex', text: '有更好的選擇嗎？' },
      { type: 'lecture', character: 'drLin', text: '有。來自日內數據的已實現變異數（Realized Variance）。5 分鐘平方報酬率的加總。精確得多，因為每天使用約 78 個觀測值而非一個。Mincer-Zarnowitz 迴歸中的 R 平方從使用 r_t^2 的 5% 到 10% 跳升到使用已實現變異數的 30% 到 50%。' },
      { type: 'check', question: '如果模型 A 在使用平方報酬率作為目標時贏了模型 B，它在使用已實現變異數時是否一定也贏？', options: ['是，排名總是一致的', '否，MSE 和 MAE 可能因代理不同而反轉排名', '只有在兩個模型使用相同估計窗口時才是', '排名只對 EGARCH 模型會反轉'], correctIndex: 1, onCorrect: '正確。MSE 和 MAE 可能因代理不同而反轉排名。這正是我們需要 QLIKE 的原因。', onWrong: '事實上，MSE 和 MAE 可能根據代理不同而反轉排名。這推動了使用 QLIKE 的需要——它對代理的選擇是穩健的。' },
    ],
  },

  // --- Segment 4: 損失函數 (w05-s04, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '現在我們需要裁判。我們如何為每個模型打分？三個損失函數，各有不同的特性。' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'RMSE：均方根誤差', props: { formula: 'RMSE = \\sqrt{\\frac{1}{T}\\sum_{t=1}^{T}(\\sigma_t^{2*} - \\hat{\\sigma}_t^2)^2}' } },
      { type: 'lecture', character: 'drLin', text: 'RMSE 是最常見的指標。由於平方運算，它對大誤差懲罰很重。如果你的預測錯過了一個大幅波動率飆升，RMSE 會嚴厲懲罰你。' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'MAE：平均絕對誤差', props: { formula: 'MAE = \\frac{1}{T}\\sum_{t=1}^{T}|\\sigma_t^{2*} - \\hat{\\sigma}_t^2|' } },
      { type: 'lecture', character: 'drLin', text: 'MAE 對異常值更穩健，因為它不對誤差平方。但它對偶爾的大幅失誤較不敏感。' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'QLIKE：波動率預測評估的黃金標準', props: { formula: 'QLIKE = \\frac{1}{T}\\sum_{t=1}^{T}\\left[\\ln(\\hat{\\sigma}_t^2) + \\frac{\\sigma_t^{2*}}{\\hat{\\sigma}_t^2}\\right]' } },
      { type: 'lecture', character: 'drLin', text: 'QLIKE 是最關鍵的損失函數。Patton 在 2011 年證明，QLIKE 無論你使用哪種代理，都能產生一致的模型排名。MSE 和 MAE 可能因代理不同而翻轉排名。這使 QLIKE 成為波動率預測評估的黃金標準。' },
      { type: 'check', question: '為什麼 QLIKE 被認為優於 RMSE 來評估波動率預測？', options: ['QLIKE 比較容易計算', 'QLIKE 對大誤差懲罰更重', 'QLIKE 無論使用哪種波動率代理都能產生一致的排名', 'QLIKE 總是產生更小的數值'], correctIndex: 2, onCorrect: '完全正確。代理穩健性（Proxy-robustness）是 QLIKE 的特殊之處。', onWrong: 'QLIKE 的關鍵優勢在於：無論你使用平方報酬率、已實現變異數還是區間波動率代理，它都能產生一致的模型排名。' },
    ],
  },

  // --- Segment 5: 休息 (w05-s05, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: '休息十分鐘。回來之後，我們學習如何用 Mincer-Zarnowitz 迴歸檢驗預測是否真正有效。' },
    ],
  },

  // --- Segment 6: Mincer-Zarnowitz 迴歸 (w05-s06, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '歡迎回來。快速回顧：我們有滾動窗口作為賽道，三個損失函數作為裁判。現在我們需要一個正式的預測品質統計檢定：Mincer-Zarnowitz 迴歸。' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Mincer-Zarnowitz 迴歸：預測效率檢驗', props: { formula: '\\sigma_t^{2*} = a + b \\cdot \\hat{\\sigma}_t^2 + u_t' } },
      { type: 'lecture', character: 'drLin', text: '將實際變異數代理對預測值做迴歸。在完美預測下：a 等於零，代表沒有偏差；b 等於一，代表比例反應正確；R 平方等於百分之百。' },
      { type: 'lecture', character: 'drLin', text: '如果 a 大於零，模型系統性地低估波動率。如果 b 大於一，模型反應不足——真實波動率翻倍時，預測增幅不到一倍。一個校準良好的模型應該 a 接近零，b 接近一。' },
      { type: 'lecture', character: 'drLin', text: '我們用 F 檢定來檢驗 a = 0 且 b = 1 的聯合假設。拒絕代表預測有偏差、無效率，或兩者兼有。' },
      { type: 'lecture', character: 'alex', text: '但如果 R 平方只有 5% 或 10% 呢？這是不是代表模型很差？' },
      { type: 'lecture', character: 'drLin', text: '好問題。對平方報酬率做迴歸時，R 平方 5% 到 10% 對一個好模型來說完全正常。代理本身雜訊太大，即使完美的預測也無法解釋超過約 10% 的變異。當你改用已實現變異數時，R 平方跳到 30% 到 50%。模型沒變。只是測量品質提升了。' },
      { type: 'check', question: '在 Mincer-Zarnowitz 迴歸中，b < 1 代表什麼？', options: ['模型是不偏的', '模型過度反應（Overreacts）', '模型反應不足（Underreacts）', '模型沒有預測力'], correctIndex: 1, onCorrect: '正確。當 b < 1 時，預測過度反應：它放大了波動率的變化，超過了實際數據的幅度。', onWrong: '當 b < 1 時，模型過度反應。真實波動率變化一個單位時，預測變化超過一個單位。當 b > 1 時，模型反應不足。' },
    ],
  },

  // --- Segment 7: Python 實作示範 (w05-s07, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'priya', text: '理論夠了。讓我們實際跑一場比賽看誰贏。打開 Python 筆記本，跟著做。' },
      { type: 'visual', component: 'CodeDisplay', caption: '步驟 1：匯入函式庫，載入 S&P 500 數據，計算對數報酬率，定義 W = 1000 的訓練/測試分割' },
      { type: 'lecture', character: 'priya', text: '步驟 1 載入數據並設定 1000 天的估計窗口。第 1000 天之前的所有數據是我們的初始訓練集。' },
      { type: 'visual', component: 'CodeDisplay', caption: '步驟 2：滾動預測迴圈——每天重新估計 GARCH 並儲存一步前預測' },
      { type: 'lecture', character: 'priya', text: '這個迴圈需要 3 到 5 分鐘。對測試期間的每一天，我們在滾動窗口上擬合模型並儲存預測。沒有未來數據洩漏。運行時注意程式碼結構：擬合、預測、向前滾動、重複。' },
      { type: 'visual', component: 'CodeDisplay', caption: '步驟 3-4：預測視覺化和 Mincer-Zarnowitz 迴歸結果' },
      { type: 'lecture', character: 'priya', text: '看預測時間序列追蹤已實現代理的表現。2020 年 3 月的 COVID-19 飆升清晰可見。而 MZ 迴歸對平方報酬率顯示 R 平方約 7%。這是預期中的，完全正常。' },
      { type: 'visual', component: 'CodeDisplay', caption: '步驟 5-6：損失函數比較表和 Diebold-Mariano 檢定' },
      { type: 'lecture', character: 'priya', text: '步驟 5 和 6 計算所有三個模型的 RMSE、MAE 和 QLIKE，並在前兩名之間執行 Diebold-Mariano 檢定。DM 檢定使用 HAC 標準誤，因為預測誤差具有序列相關性。原始標準誤會太小。' },
    ],
  },

  // --- Segment 8: 競賽結果 (w05-s08, 10 min) ---
  {
    steps: [
      { type: 'visual', component: 'DataTable', caption: '波動率預測競賽結果：三種 GARCH 變體的 RMSE、MAE 和 QLIKE' },
      { type: 'lecture', character: 'drLin', text: '結果揭曉。GJR-GARCH 在所有三個指標上都勝出。gamma 項捕捉到的槓桿效應包含了對未來波動率的真正預測資訊。標準 GARCH 完全忽略了這個不對稱性。' },
      { type: 'lecture', character: 'drLin', text: '現在回顧我們一開始的投票。誰投了 GJR-GARCH？通常很少學生選它。大多數人期望最複雜的模型 EGARCH 會勝出。但帶著正確特徵——不對稱項——的簡潔模型勝過了純粹的複雜性。' },
      { type: 'lecture', character: 'alex', text: 'Diebold-Mariano 檢定確認 GJR 顯著優於標準 GARCH。但 GJR 和 EGARCH 之間的差距通常不顯著。槓桿效應才是關鍵的差異因素，而非特定的函數形式。' },
      { type: 'lecture', character: 'priya', text: '那我的 LSTM 呢？它在 RMSE 上贏了 GJR 2%，但在 QLIKE 上輸了，而且訓練時間長了一百倍。在標準特徵的日頻預測上，GARCH 的競爭力出奇地強。' },
      { type: 'lecture', character: 'drLin', text: 'Hansen 和 Lunde 在 2005 年測試了 330 個波動率模型，發現很少有模型能穩定地打敗 GARCH(1,1)。三個參數捕捉持續性和均值回歸，出乎意料地難以超越。' },
    ],
  },

  // --- Segment 9: 討論 (w05-s09, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '現在我們有了結果，讓我們討論這些結果的含義。競賽回答了「哪個」模型最好，但沒有回答「為什麼」或「它在經濟上是否重要」。' },
      { type: 'discuss_timer', durationMinutes: 3, prompt: 'Kenji 管理的退休基金受金融廳（FSA）監管。他應該使用最精確的模型還是最容易解釋的模型？', guidePoints: ['退休基金需要向監管機構解釋模型的可解釋性', '避險基金優先考慮原始績效', 'RMSE 改善 2% 未必轉化為更好的投資組合表現', '情境決定了正確的選擇'] },
      { type: 'check', question: 'RMSE 改善 2% 是否一定意味著更好的投資組合績效？', options: ['是，較低的 RMSE 總是意味著更好的報酬', '否，你需要通過投資組合變異數目標化或 VaR 準確度來檢驗經濟價值', '只有在改善是統計顯著的時候', '只適用於股票投資組合'], correctIndex: 1, onCorrect: '完全正確。統計改善和經濟改善是不同的事情。永遠要檢驗經濟價值。', onWrong: 'RMSE 改善 2% 是一個統計指標。要知道它在實務中是否有幫助，你需要通過投資組合變異數目標化或 VaR 準確度來檢驗，而不僅僅是統計指標。' },
      { type: 'lecture', character: 'drLin', text: '最好的方法通常是混合式的：用 GARCH 的輸出作為機器學習的特徵。預測評估不只是一個統計練習。它涉及準確性、複雜性、可解釋性和經濟價值之間的取捨。最好的模型取決於你的使用情境。' },
    ],
  },

  // --- Segment 10: 總結與任務 (w05-s10, 5 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '讓我留給你們六個關鍵要點。第一，樣本外才是唯一誠實的測試。一個在樣本內完美擬合的模型可能因過度擬合（Overfitting）而在樣本外失敗。' },
      { type: 'lecture', character: 'drLin', text: '第二，滾動窗口確保即時模擬。每個預測只使用該時間點可得的資訊。第三，QLIKE 是黃金標準，因為它無論使用哪種波動率代理都能產生一致的排名。' },
      { type: 'lecture', character: 'drLin', text: '第四，Mincer-Zarnowitz 迴歸檢驗預測效率。對平方報酬率的低 R 平方是預期中的。第五，GJR-GARCH 穩定地優於標準 GARCH，因為槓桿效應是真實的預測資訊。' },
      { type: 'lecture', character: 'drLin', text: '第六，Diebold-Mariano 檢定正式比較模型。沒有它，觀察到的 RMSE 差異可能只是抽樣雜訊。' },
      { type: 'lecture', character: 'drLin', text: '任務五：對三種 GARCH 變體實作滾動預測競賽。計算 RMSE、MAE 和 QLIKE。執行 MZ 迴歸和 DM 檢定。建立比較表格並撰寫 200 字的研究發現執行摘要。', note: '任務 5：三種 GARCH 變體的滾動預測競賽、損失函數、MZ 迴歸、DM 檢定、比較表格、200 字摘要' },
      { type: 'lecture', character: 'kenji', text: '你已經向我展示了哪個模型預測最好。但董事會不在乎 RMSE。他們要一個數字：明天我們最多能虧多少？' },
      { type: 'lecture', character: 'drLin', text: '那就叫做風險值（Value-at-Risk, VaR）。下週，我們把波動率預測轉化為金融中最重要的單一風險數字。三種方法，一個目標：回答每位風險管理者每天都要面對的問題。' },
    ],
  },
];
