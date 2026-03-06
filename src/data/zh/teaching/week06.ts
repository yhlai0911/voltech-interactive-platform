import type { SegmentTeaching } from '@/types';

export const week06Teaching: SegmentTeaching[] = [
  // --- Segment 1: 開場故事 (w06-s01, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '看黑板。一個問題：明天我們最多能虧多少？花一點時間想想。你們會怎麼回答？' },
      { type: 'lecture', character: 'narrator', text: '學生們交頭接耳。有人說「全部」。其他人給出模糊的答案。沒有人給出精確的數字。' },
      { type: 'lecture', character: 'drLin', text: '這是每位風險管理者每天都必須回答的問題。答案叫做風險值（Value-at-Risk），簡稱 VaR。它是 Kenji 的董事會向金融廳（FSA）報告時要求的那一個數字。' },
      { type: 'lecture', character: 'drLin', text: '在修復 Kenji 壞掉的風險模型之前，我們需要正確理解 VaR。不是教科書版本。而是監管機構要求、交易員害怕的版本。' },
      { type: 'lecture', character: 'kenji', text: '在第一週，我用常態分配的標準參數化 VaR 說每日最大損失是 4.2%。實際損失是 18%。模型錯誤時就是這樣的結果。' },
      { type: 'lecture', character: 'drLin', text: '現在我們用所有的 GARCH 工具來正確重建 VaR。VaR 有三個要素：信賴水準（Confidence Level），你想要多有把握；持有期間（Holding Period），你持有部位多久；以及報酬率分配（Return Distribution），什麼模型驅動數字。其他一切都從這三個選擇衍生而來。' },
    ],
  },

  // --- Segment 2: VaR 定義 (w06-s02, 15 min) ---
  {
    steps: [
      { type: 'visual', component: 'FormulaDisplay', caption: 'VaR 定義：以 1 - alpha 的機率被超過的損失門檻', props: { formula: 'P(L_t > VaR_\\alpha) = 1 - \\alpha' } },
      { type: 'lecture', character: 'drLin', text: '在信賴水準 alpha 下的 VaR 是以 (1 - alpha) 的機率被超過的損失門檻。對 99% VaR 而言，在任何一天有 1% 的機率實際損失會超過 VaR。' },
      { type: 'lecture', character: 'drLin', text: '讓我具體化。99% 的 1 天 VaR 為 1000 萬美元代表：在 100 個交易日中的 99 天，投資組合的損失不會超過 1000 萬。在那 100 天中的 1 個壞日子，損失可能是 1000 萬、5000 萬或 5 億。VaR 不會告訴你。' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'VaR 的投資組合形式', props: { formula: 'VaR_\\alpha = -V \\cdot q_{1-\\alpha}(r_t)' } },
      { type: 'lecture', character: 'drLin', text: '投資組合價值乘以報酬率分位數。負號將負分位數轉換為正的損失數字。風險系統就是這樣報告的。' },
      { type: 'check', question: '一家銀行報告 99% 的 1 天 VaR。在 250 個交易日中，應該有多少天損失超過 VaR？', options: ['0 天', '1 天', '2.5 天', '25 天'], correctIndex: 2, onCorrect: '完全正確。(1 - 0.99) 乘以 250 等於 2.5。我們預期會有突破。零次突破代表模型太保守了。', onWrong: '預期的次數是 (1 - 0.99) 乘以 250 = 2.5 天。我們實際上預期會有一些突破。零次突破意味著模型過於保守。' },
      { type: 'lecture', character: 'drLin', text: '為什麼是 99% 而不是 95%？監管機構如 Basel 和 FSA 要求 99% 來計算資本。內部風險限額通常使用 95% 以獲得更靈敏的信號。更高的信賴水準意味著更大的 VaR、更多的資本準備、更安全但成本更高。' },
    ],
  },

  // --- Segment 3: 三種 VaR 方法 (w06-s03, 20 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '現在我們知道 VaR 是什麼了。問題是：如何計算？三種方法，三種哲學。' },
      { type: 'visual', component: 'FormulaDisplay', caption: '方法一：歷史模擬法——排序過去報酬率，取分位數', props: { formula: 'VaR_{HS} = -r_{((1-\\alpha) \\cdot W)} \\quad \\text{(sorted returns)}' } },
      { type: 'lecture', character: 'drLin', text: '歷史模擬法（Historical Simulation）：將過去 W 天的日報酬率從最差到最好排序。VaR 就是 (1 - alpha) 水準的分位數。對 99% VaR 且 W = 500 而言，就是第 5 差的報酬率。不需要分配假設。' },
      { type: 'lecture', character: 'drLin', text: '把歷史模擬法想成只看後視鏡開車。如果身後的路是平坦的，你就假設前方的路也會一樣。這在你遇到後視鏡裡沒有的急轉彎之前都行得通。' },
      { type: 'visual', component: 'FormulaDisplay', caption: '方法二：參數化 VaR——常態和 Student-t 分配', props: { formula: 'VaR_\\alpha^{Normal} = -(\\mu_t + z_{1-\\alpha} \\cdot \\sigma_t), \\quad VaR_\\alpha^{t} = -(\\mu_t + t_{1-\\alpha,\\nu} \\cdot s_t)' } },
      { type: 'lecture', character: 'drLin', text: '參數化 VaR（Parametric VaR）使用 GARCH 的條件波動率。99% 的 z 分位數是 -2.326。但使用自由度為 7 的 Student-t 分配時，分位數是 -2.998。這產生約大 29% 的 VaR。t 分配更厚的尾部帶來了真實的差異。' },
      { type: 'lecture', character: 'drLin', text: '參數化 VaR 就像使用一張每天更新的數學藍圖。如果你昨天踩到坑洞，明天的預測會通過 GARCH 的 sigma 更新立即調整。' },
      { type: 'lecture', character: 'drLin', text: '方法三：蒙地卡羅模擬（Monte Carlo）。從擬合的 GARCH 模型中模擬數千個可能的報酬率。排序模擬報酬率並取分位數。暴力但極其靈活。它適用於任何分配和任何投資組合結構。' },
      { type: 'check', question: '哪種 VaR 方法在突然的市場崩盤時適應最快？', options: ['歷史模擬法', '帶 GARCH 的參數化 VaR', '固定參數的蒙地卡羅', '所有方法適應速度相同'], correctIndex: 1, onCorrect: '正確。基於 GARCH 的參數化 VaR 每天更新 sigma_t，所以在幾天內就能反應。歷史模擬法被窗口中數百個平靜日所稀釋。', onWrong: '帶 GARCH 的參數化 VaR 適應最快，因為 sigma_t 通過 GARCH 遞迴每天更新。歷史模擬法需要數週，因為 500 天窗口稀釋了新資訊。' },
      { type: 'lecture', character: 'kenji', text: '我應該用哪種方法做 FSA 報告？' },
      { type: 'lecture', character: 'drLin', text: '全部都用。如果它們結果不一致，這個不一致本身就是關於模型不確定性的有價值資訊。' },
    ],
  },

  // --- Segment 4: 休息 (w06-s04, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: '休息十分鐘。回來之後，我們探討 VaR 最根本的弱點以及 Basel III 採用的解決方案。' },
    ],
  },

  // --- Segment 5: 預期短缺 (w06-s05, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '歡迎回來。我們有三種方法計算 VaR。但 VaR 有一個根本性的盲點。讓我來揭露它。' },
      { type: 'lecture', character: 'drLin', text: '兩個投資組合都有 99% VaR 為 1000 萬美元。它們風險一樣大嗎？投資組合 A 最差 1% 的損失平均為 1100 萬。投資組合 B 最差 1% 的損失平均為 5000 萬。VaR 無法區分它們。' },
      { type: 'lecture', character: 'drLin', text: 'VaR 就是通往「壞房間」的門。它告訴你門在哪裡，但不告訴你裡面有什麼。預期短缺（Expected Shortfall, ES）打開門，測量裡面的平均損害。' },
      { type: 'visual', component: 'FormulaDisplay', caption: '預期短缺：在 VaR 被突破時的平均損失', props: { formula: 'ES_\\alpha = -E[r_t \\mid r_t < -VaR_\\alpha]' } },
      { type: 'lecture', character: 'drLin', text: 'ES 是在 VaR 被突破時的平均損失。它總是大於或等於 VaR。在常態分配下，99% ES 約為 VaR 的 1.15 倍。在肥尾分配下，比率為 VaR 的 1.2 到 1.4 倍。' },
      { type: 'lecture', character: 'drLin', text: '舉個具體例子。500 個觀測值，99% VaR，最差的 5 個報酬率可能是 -8.2%、-7.1%、-5.9%、-5.3% 和 -4.8%。VaR = 4.8%。ES 是五個的平均：6.26%。ES 捕捉的是嚴重程度。VaR 只捕捉門檻。' },
      { type: 'visual', component: 'RiskMeasureDashboard', caption: 'VaR 是門檻；ES 衡量超過 VaR 的平均尾部損失' },
      { type: 'lecture', character: 'drLin', text: 'ES 是一個一致性風險測度（Coherent Risk Measure），滿足四個公理。關鍵的一個是次可加性（Subadditivity）：合併投資組合的風險不應超過個別風險之和。分散化應該降低風險。VaR 可能違反此性質。考慮兩個各有 2% 違約機率的債券。個別 99% VaR 都是零。但合併投資組合有 3.96% 的機率至少一個違約，所以合併 VaR 是正的。零加零不應該得到正數。' },
      { type: 'check', question: '為什麼 Basel III FRTB 從 VaR 轉向 ES 來計算市場風險資本？', options: ['ES 比較容易計算', 'ES 總是比 VaR 小', 'ES 滿足次可加性且捕捉尾部嚴重程度', 'ES 需要更少的假設'], correctIndex: 2, onCorrect: '完全正確。ES 是一致的——特別是次可加性——而且它捕捉壞日子到底有多壞。', onWrong: 'Basel III 選擇 ES，因為它滿足次可加性——分散化永遠降低風險——而且它捕捉尾部嚴重程度——衡量超過 VaR 門檻後事情有多糟。' },
    ],
  },

  // --- Segment 6: Python 實作示範 (w06-s06, 20 min) ---
  {
    steps: [
      { type: 'lecture', character: 'priya', text: '讓我們在 Python 中實作所有三種 VaR 方法和 ES。我們來看看它們在 COVID-19 崩盤期間的表現——打垮 Kenji 原始模型的那個事件。' },
      { type: 'visual', component: 'CodeDisplay', caption: '步驟 1：下載 S&P 500 數據，計算對數報酬率，擬合帶 Student-t 誤差的 GJR-GARCH(1,1)' },
      { type: 'lecture', character: 'priya', text: '步驟 1 擬合我們第五週的 GJR-GARCH 模型作為波動率引擎。這給了我們參數化 VaR 所需的條件 sigma。' },
      { type: 'visual', component: 'CodeDisplay', caption: '步驟 2：500 天滾動窗口的歷史模擬法 VaR' },
      { type: 'lecture', character: 'priya', text: '步驟 2 實作 500 天窗口的歷史模擬法。觀察 VaR 估計值如何隨時間變化。平靜期間，HS VaR 很低。只有在危機報酬率進入窗口後才飆升。' },
      { type: 'visual', component: 'CodeDisplay', caption: '步驟 3：使用 GARCH 搭配常態和 Student-t 分位數的參數化 VaR' },
      { type: 'lecture', character: 'priya', text: '步驟 3 計算常態和 Student-t 分位數的參數化 VaR。注意參數化 VaR 在大幅報酬率出現後幾天內就能調整。' },
      { type: 'visual', component: 'VaRBacktestChart', caption: 'COVID-19 VaR 比較：2020 年 3 月期間，HS VaR 落後參數化 VaR 數週' },
      { type: 'lecture', character: 'priya', text: '這是關鍵的圖表。在 COVID 崩盤期間，參數化 VaR 隨著 sigma 更新立即飆升。歷史模擬法需要數週才能追上，因為 500 天窗口稀釋了新資訊。而且看看常態和 t 分配 VaR 之間的差距。在壓力期間差距更大。' },
      { type: 'lecture', character: 'priya', text: '最後是 ES 結果與 VaR 的對照。對 Student-t 模型，ES 對 VaR 的比率約為 1.25 到 1.35，表示超過 VaR 門檻後有顯著的尾部風險。對常態模型，比率只有約 1.15。t 分配的肥尾使 ES 大幅增加。' },
    ],
  },

  // --- Segment 7: 應用：COVID 崩盤 (w06-s07, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '我們有了工具。現在把它們應用到 Kenji 的實際問題：他應該向 FSA 報告哪種 VaR 方法？' },
      { type: 'visual', component: 'VolatilityTimeSeries', caption: 'COVID-19 崩盤期間（2020 年 2-4 月）的 VaR 方法比較' },
      { type: 'lecture', character: 'drLin', text: '2020 年 3 月 16 日，歷史模擬法 VaR 仍基於危機前的數據。GARCH 參數化 VaR 已經翻倍了。歷史模擬法在一個月內就有超過 10 次突破。這個延遲差點讓 Kenji 的基金失去 Basel 綠燈區的資格。' },
      { type: 'check', question: '如果你是 Kenji，你會向 FSA 報告哪種 VaR 方法？', options: ['只用歷史模擬法', '常態分配的參數化 VaR', 'Student-t 分配的 GJR-GARCH 參數化 VaR', '報告全部三種並解釋差異'], correctIndex: 3, onCorrect: '非常好。實務上的最佳做法是報告多種方法。GJR-GARCH 搭配 Student-t 是首要推薦，但展示全部三種能證明穩健性。', onWrong: '雖然 Student-t 的 GJR-GARCH 是最強的單一選擇，但最佳做法是報告全部三種方法。它們之間的差異本身就是有價值的風險資訊。' },
      { type: 'lecture', character: 'drLin', text: '還有順循環性（Procyclicality）問題。當波動率飆升時，VaR 增加，迫使基金賣出風險資產以滿足資本要求。這個拋售進一步增加波動率，進一步增加 VaR。一個惡性循環。這是監管機構仍在解決的系統性風險問題。' },
    ],
  },

  // --- Segment 8: 討論——VaR 辯論 (w06-s08, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'VaR 是金融中使用最廣泛的風險測度，但它也有激烈的批評者。讓我們來審視這場辯論。' },
      { type: 'discuss_timer', durationMinutes: 3, prompt: 'Nassim Taleb 稱 VaR 為「江湖騙術」。他的論點是：VaR 衡量正常損失的邊界，但對極端損失一無所知。Taleb 說得對嗎？', guidePoints: ['VaR 告訴你門在哪裡，但不告訴你門後面有什麼', 'ES 通過衡量尾部嚴重程度來回應這個批評', '一家銀行可能 VaR 是 1000 萬，但尾部損失可達 5 億', '然而 VaR 作為每日溝通工具仍然不可或缺'] },
      { type: 'check', question: '如果 HS VaR 說是 800 萬而參數化 VaR 說是 1200 萬，你應該報告什麼？', options: ['總是報告較低的數字', '總是報告較高的數字', '取兩個估計值的平均', '報告最保守的估計並解釋差距'], correctIndex: 3, onCorrect: '正確。方法間的差距本身就是有資訊的。它反映了模型不確定性，應該清楚地傳達。', onWrong: '最佳做法是報告最保守的估計並解釋差異。差距本身就是關於模型不確定性的有用資訊。' },
      { type: 'lecture', character: 'drLin', text: 'VaR 不完美但不可或缺。ES 處理了它的部分弱點。關鍵的教訓是沒有單一風險指標就足夠了。好的風險管理同時使用多種測度加上壓力測試。' },
    ],
  },

  // --- Segment 9: 總結與任務 (w06-s09, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '讓我用六個關鍵要點來總結。第一，VaR 是基於分位數的測度：以 (1 - alpha) 的機率被超過的損失門檻。三個要素：信賴水準、持有期間和報酬率分配。' },
      { type: 'lecture', character: 'drLin', text: '第二，歷史模擬法是非參數的但適應緩慢。帶 GARCH 的參數化 VaR 適應迅速但依賴分配假設。蒙地卡羅靈活但計算成本高。' },
      { type: 'lecture', character: 'drLin', text: '第三，Student-t VaR 比常態 VaR 更保守，因為 t 分配有更厚的尾部。在較高的信賴水準下差異更大。' },
      { type: 'lecture', character: 'drLin', text: '第四，VaR 忽略尾部嚴重程度。預期短缺衡量 VaR 被突破時的平均損失，捕捉 VaR 遺漏的部分。第五，ES 是一致性風險測度且滿足次可加性。分散化永遠降低 ES，但可能增加 VaR。' },
      { type: 'lecture', character: 'drLin', text: '第六，Basel III FRTB 從 VaR 轉向 ES 來計算市場風險資本，認識到尾部嚴重程度對系統性風險的重要性。' },
      { type: 'lecture', character: 'drLin', text: '任務六：用三種方法計算日經 225 和 S&P 500 的 VaR。比較 95% 和 99% 信賴水準。計算每種方法的 ES。建立比較儀表板並撰寫 200 字的風險評估。', note: '任務 6：日經 225 和 S&P 500 的三種 VaR 方法，95% 和 99% 信賴水準，每種方法的 ES，比較儀表板，200 字風險評估' },
      { type: 'lecture', character: 'kenji', text: '我們有了 VaR 和 ES。但 FSA 要求證明我們的模型確實有效。他們要看回測（Backtest）結果。' },
      { type: 'lecture', character: 'drLin', text: '這代表我們需要檢驗 VaR 預測是否真的正確。下週：FSA 審計。他們會計算我們的突破次數、檢驗是否聚集，並用 Basel 交通燈系統分類。綠燈、黃燈或紅燈。每種顏色的財務成本是巨大的。' },
      { type: 'lecture', character: 'drLin', text: 'Kupiec 檢定檢查突破次數是否正確。Christoffersen 檢定檢查突破是否獨立。除了回測之外：壓力測試（Stress Tests）重演歷史危機並想像假設情境。VaR 告訴你正常日子的狀況。壓力測試告訴你最糟日子的狀況。下週見。' },
    ],
  },
];
