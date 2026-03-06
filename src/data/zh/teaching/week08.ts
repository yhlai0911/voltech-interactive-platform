import type { SegmentTeaching } from '@/types';

export const week08Teaching: SegmentTeaching[] = [
  // --- Segment 1: 開場故事 (w08-s01, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: '上課前黑板上寫著：「QuantStar 宣稱比 GARCH 改善了 50%。這可信嗎？」學生們就座，交換著懷疑的目光。' },
      { type: 'lecture', character: 'drLin', text: '各位早安。這是我們的最後一堂課。在我們開始之前，看看黑板上的那個宣稱。50% 的改善。在我們相信之前，應該問哪些問題？' },
      { type: 'lecture', character: 'alex', text: '他們用的是什麼指標？基準模型是什麼？比較是樣本內還是樣本外？涵蓋什麼時間段？' },
      { type: 'lecture', character: 'drLin', text: '非常好。這些正是正確的問題。QuantStar Analytics 向 Kenji 推銷一套每年 250 萬美元的 ML 風險管理系統。他們聲稱它將徹底改革他的風險管理。我的反應：讓我們自己來測試。' },
      { type: 'lecture', character: 'priya', text: '我已經在背景中建構隨機森林（Random Forest）和 LSTM 模型好幾週了。讓我們做一個嚴謹的正面對決——樣本外，用正確的損失函數，不作弊。' },
      { type: 'lecture', character: 'kenji', text: '我有三個選項擺在桌上。選項 A：保持 GARCH，低成本且經過驗證。選項 B：換成 QuantStar 的 ML 系統，每年 250 萬美元。選項 C：建立結合兩者的混合模型。今天結束前，我需要一個建議。' },
      { type: 'lecture', character: 'drLin', text: '在我們讓 ML 與 GARCH 比賽之前，我們需要理解這兩種方法的根本差異。這意味著要理解偏差-變異數權衡（Bias-Variance Tradeoff）。' },
    ],
  },

  // --- Segment 2: ML vs. 計量經濟學 (w08-s02, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '有兩種根本不同的建模哲學。計量經濟學（Econometrics）從理論出發，估計少量參數，優先考慮可解釋性。機器學習（Machine Learning）從數據出發，學習複雜模式，優先考慮預測精確度。' },
      { type: 'visual', component: 'BiasVarianceDecomposition', caption: '偏差-變異數權衡分解' },
      { type: 'lecture', character: 'drLin', text: '總預測誤差分解為三個部分：偏差的平方、變異數和不可約化的雜訊。你可以通過增加模型靈活性來減少偏差，或通過增加結構來減少變異數，但你無法同時最小化兩者。這是根本性的張力。' },
      { type: 'lecture', character: 'drLin', text: '這樣想。GARCH 是一把剛性的尺子：它每次量得大致正確——高偏差、低變異數，5 到 7 個參數。神經網路是一把柔軟的捲尺：它能捕捉細微的曲線，但每次讀數可能不同——低偏差、高變異數，數千個參數。' },
      { type: 'visual', component: 'BiasVarianceDecomposition', caption: 'U 形測試誤差曲線：從欠擬合到過擬合', props: { showUCurve: true } },
      { type: 'lecture', character: 'drLin', text: '在經典的 U 形測試誤差曲線上，GARCH 位於左側，參數少。深度神經網路位於右側，參數多。金融波動率的關鍵問題是：最佳平衡點在哪裡？嘈雜的金融數據在短期預測上通常偏好高偏差的模型。' },
      { type: 'check', question: '在偏差-變異數權衡中，像 GARCH 這樣高偏差、低變異數的模型傾向於：', options: ['過度擬合訓練數據', '給出一致但略有偏差的預測', '完美捕捉複雜的非線性模式', '需要非常大的數據集才能運作'], correctIndex: 1, onCorrect: '完全正確。高偏差意味著平均來說略有偏差，但低變異數意味著它以相同的方式一致地偏差——這對嘈雜的金融數據實際上是有用的。', onWrong: '高偏差、低變異數的模型給出穩定的預測，平均可能略有偏差。它是欠擬合而非過擬合。' },
      { type: 'lecture', character: 'alex', text: '所以 ML 的優勢在有更豐富的特徵和更長的時間跨度時增長，但 GARCH 在短期波動率預測上可能實際上會贏，因為數據太嘈雜了？' },
      { type: 'lecture', character: 'drLin', text: '這就是假設。讓我們用實證來驗證。' },
    ],
  },

  // --- Segment 3: 隨機森林 (w08-s03, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '讓我們從最可解釋的 ML 模型開始：隨機森林（Random Forest）。它是決策樹的集合體——就像詢問五百位專家然後取平均意見。' },
      { type: 'lecture', character: 'drLin', text: '單一決策樹根據特徵值來分割數據。對波動率來說：如果昨天的報酬率低於 -2%，且 5 天滾動波動率超過 1.5%，那就預測高波動率。簡單且可解釋，但極容易過度擬合。' },
      { type: 'visual', component: 'FeatureImportanceChart', caption: '隨機森林：去相關決策樹的集合' },
      { type: 'lecture', character: 'priya', text: '隨機森林通過 Breiman 在 2001 年的洞察解決了過擬合問題：在隨機的自助抽樣（Bootstrap）樣本上用隨機的特徵子集訓練每棵樹。對去相關的樹取平均降低了變異數而不增加偏差。' },
      { type: 'lecture', character: 'drLin', text: '但關鍵是：優質的特徵比模型複雜度更重要。對波動率預測，我們從原始數據中工程化特徵——滯後報酬率、平方報酬率、絕對報酬率、5 天、10 天和 22 天的滾動波動率。' },
      { type: 'check', question: '為什麼隨機森林要取多棵決策樹的平均而不是使用單一深樹？', options: ['單一樹訓練太慢', '對去相關的樹取平均降低變異數同時維持低偏差', '多棵樹比較容易解釋', '單一樹無法學習非線性模式'], correctIndex: 1, onCorrect: '正確！每棵樹都有雜訊，但因為它們在不同的數據子集上用不同的特徵訓練，它們的誤差是去相關的，取平均就能抵消雜訊。', onWrong: '關鍵洞察是對去相關的樹取平均降低了預測變異數。每棵樹以不同方式過擬合，所以平均化就能抵消個別的誤差。' },
      { type: 'lecture', character: 'priya', text: '我們如何知道哪些特徵重要？排列重要性（Permutation Importance）：隨機打亂一個特徵並測量預測誤差的增加。增加越大代表模型越依賴那個特徵。它與模型無關且非常直覺。' },
      { type: 'lecture', character: 'drLin', text: '我們還需要正則化（Regularization）：最大深度限制樹的大小、每個葉節點的最小樣本數避免記憶雜訊、每次分割的最大特徵數維持去相關性。這些約束防止森林簡單地記憶訓練數據。' },
    ],
  },

  // --- Segment 4: LSTM 直覺 (w08-s04, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '隨機森林將每個觀測值當作獨立的。但金融數據有時間結構——昨天很重要。登場的是 LSTM：一個有記憶的神經網路。' },
      { type: 'lecture', character: 'drLin', text: '把 LSTM 想成一本有選擇性的日記。每天它做三個決定：我應該忘記昨天的記錄嗎，因為市場狀態變了？我應該記下今天的事件嗎，因為它很重要？根據我記得的一切，我預測什麼？' },
      { type: 'visual', component: 'LSTMGatesDiagram', caption: 'LSTM 架構：遺忘閘、輸入閘和輸出閘' },
      { type: 'lecture', character: 'priya', text: '遺忘閘（Forget Gate）決定在市場狀態變化時是否丟棄舊資訊。輸入閘（Input Gate）過濾今天的報酬率是否重要到需要更新記憶。輸出閘（Output Gate）根據記住的一切決定最終的波動率預測。' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'LSTM 細胞狀態更新', props: { formula: 'c_t = f_t \\odot c_{t-1} + i_t \\odot \\tilde{c}_t' } },
      { type: 'lecture', character: 'drLin', text: '細胞狀態（Cell State）是長期記憶。它選擇性地遺忘舊資訊並加入新資訊，跨越多個時間步驟傳遞依賴關係。這是相較於標準神經網路的關鍵優勢。' },
      { type: 'lecture', character: 'alex', text: '所以 GARCH 用 5 個參數和一個明確的公式來學習波動率聚集，而 LSTM 用數千個參數從數據中發現類似的模式，而無需被告知公式。GARCH 高效；LSTM 靈活。' },
      { type: 'check', question: '為什麼標準的 k 折交叉驗證不適合評估時間序列模型？', options: ['計算成本太高', '它打亂了時間順序，造成前視偏差（Look-ahead Bias）', '需要太多折數', '它只適用於分類任務'], correctIndex: 1, onCorrect: '完全正確！打亂時間序列數據讓模型在訓練時偷看未來資訊，產生人為偏高的結果，無法推廣。', onWrong: '關鍵問題是時間順序。標準 k 折打亂數據，讓模型在未來數據上訓練、在過去數據上測試——這是一種前視偏差。' },
      { type: 'lecture', character: 'drLin', text: '永遠使用時間序列分割（Time-series Split）：在截止點之前的所有數據上訓練，在之後的所有數據上測試。不打亂，不洩漏未來資訊。QuantStar 應該這樣測試的——根據他們 50% 改善的宣稱，我強烈懷疑他們沒有。' },
    ],
  },

  // --- Segment 5: 休息 (w08-s05, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: '休息十分鐘。回來之後：實際的正面對決。GARCH 對決隨機森林對決 LSTM。真相揭曉的時刻。' },
    ],
  },

  // --- Segment 6: Python 實作示範 (w08-s06, 20 min) ---
  {
    steps: [
      { type: 'lecture', character: 'priya', text: '歡迎回來。三個模型已經準備好比賽了。讓我們看看誰贏——用正確的樣本外評估。打開 Python 筆記本，跟著做。' },
      { type: 'visual', component: 'CodeDisplay', caption: '特徵工程：滯後報酬率、平方報酬率、滾動波動率', props: { code: 'features = engineer_volatility_features(returns, lags=[1,2,5], windows=[5,10,22])' } },
      { type: 'lecture', character: 'priya', text: '我們從 S&P 500 報酬率計算了 15 個特徵——滯後報酬率、平方報酬率、絕對報酬率和滾動波動率。訓練-測試分割嚴格按時間順序：前 70% 訓練，後 30% 測試。不打亂，不洩漏未來資訊。' },
      { type: 'visual', component: 'CodeDisplay', caption: 'GJR-GARCH 基準 vs. 隨機森林 vs. LSTM', props: { code: 'results = compare_models(garch_forecast, rf_forecast, lstm_forecast, realized_vol)' } },
      { type: 'lecture', character: 'priya', text: 'GJR-GARCH 基準是我們七週的主力。隨機森林使用 500 棵樹加正則化。LSTM 使用 64 個隱藏單元和 20 天的回看窗口。' },
      { type: 'visual', component: 'FeatureImportanceChart', caption: '隨機森林特徵重要性——「頓悟時刻」' },
      { type: 'lecture', character: 'alex', text: '看特徵重要性圖！滾動波動率特徵完全主導——5 天和 22 天的 rvol 是最重要的特徵。隨機森林獨立地發現了 GARCH 在設計上就已編碼的東西！' },
      { type: 'visual', component: 'VolatilityComparison', caption: '正面對決模型比較：RMSE、MAE、QLIKE' },
      { type: 'lecture', character: 'priya', text: '這是裁決。隨機森林在 RMSE 上贏了 GARCH，但在 QLIKE 上輸了。LSTM 有競爭力但不佔主導。排名取決於你用哪個指標——而這正是 QuantStar 通過挑選指標所掩蓋的。' },
    ],
  },

  // --- Segment 7: 混合模型 (w08-s07, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'GARCH 和 ML 都不是絕對的贏家。但如果我們把它們結合起來呢？如果我們把 GARCH 的結構知識作為隨機森林的一個特徵呢？' },
      { type: 'visual', component: 'FormulaDisplay', caption: '混合模型：GARCH 作為隨機森林的特徵', props: { formula: '\\hat{\\sigma}^2_{t+1} = f_{RF}(r_{t-1}, r^2_{t-1}, rvol_{5d}, \\ldots, \\hat{\\sigma}^2_{t,GARCH})' } },
      { type: 'lecture', character: 'drLin', text: 'GARCH 提供一個強大的基準預測，編碼了波動率聚集和槓桿效應。隨機森林然後可以用 GARCH 無法納入的額外特徵來精煉這個預測。整體大於部分之和。' },
      { type: 'visual', component: 'VolatilityComparison', caption: '混合模型在所有指標上超越兩個單獨方法', props: { showHybrid: true } },
      { type: 'lecture', character: 'priya', text: '混合模型在所有指標上都超越了單獨的 GARCH 和單獨的隨機森林。而且看特徵重要性：GARCH 條件變異數排在前三名。ML 模型知道 GARCH 是有價值的。' },
      { type: 'lecture', character: 'drLin', text: '現在讓我們回應 QuantStar 50% 改善的宣稱。他們的評估是樣本內的，帶有前視偏差。用正確的時間序列分割，單獨的 RF 相較於 GARCH 的改善只有 1% 到 7%，不是 50%。這個宣稱在方法論上是有缺陷的。' },
      { type: 'check', question: '為什麼混合模型（GARCH + 隨機森林）超越了兩個單獨的方法？', options: ['它只是使用更多數據', 'GARCH 提供結構知識，隨機森林可以用額外特徵來精煉', '隨機森林修正了 GARCH 的誤差', '它在更長的時間段上訓練'], correctIndex: 1, onCorrect: '完全正確。GARCH 提供理論驅動的強大基準，隨機森林增加了靈活性以捕捉 GARCH 無法建模的模式。', onWrong: '關鍵是互補性：GARCH 貢獻了波動率動態的結構知識，隨機森林增加了靈活性以納入 GARCH 無法建模的額外特徵。' },
      { type: 'lecture', character: 'alex', text: '在 COVID-19 危機期間，混合模型比單獨的 GARCH 提前 1.5 天對波動率飆升做出反應。在危機管理中，這種早期預警可以拯救數百萬。' },
    ],
  },

  // --- Segment 8: 裁決 (w08-s08, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Alex，是時候向 Kenji 的投資委員會呈報你的建議了。三個選項，一個建議。帶我們看看你的分析。' },
      { type: 'lecture', character: 'alex', text: '選項 A：只保留 GARCH——低成本、經過驗證、符合 Basel 規範，但適應緩慢。選項 B：換成 QuantStar 的 ML——每年 250 萬昂貴、供應商鎖定，而且他們 50% 的宣稱已被推翻。選項 C：混合模型——最佳表現，RMSE 改善 7%，同時保持可解釋性。' },
      { type: 'check', question: '根據呈報的證據，你會向 Kenji 推薦哪個選項？', options: ['選項 A：只保留 GARCH', '選項 B：換成 QuantStar ML', '選項 C：部署混合模型', '選項 D：等待更好的 AI 模型'], correctIndex: 2, onCorrect: '這與證據一致。混合模型結合了 GARCH 的可解釋性和監管合規性，以及 ML 的適應性和靈活性。', onWrong: '根據正面對決的比較，混合模型在所有方面超越兩個單獨的方法，同時保持監管合規性。選項 C 是最有證據支持的選擇。' },
      { type: 'lecture', character: 'alex', text: '我的建議：選項 C。部署混合模型作為主要預測引擎。保持 GJR-GARCH 作為監管報告模型。使用 ML 層作為補充監控和危機早期預警。' },
      { type: 'lecture', character: 'drLin', text: '最後一個細微之處。監管模型必須是可審計的。GARCH 有 5 到 7 個可解釋的參數，可以通過 FSA 審查。有一萬個參數的神經網路不行。這就是為什麼混合模型使用 GARCH 作為監管引擎，ML 作為監控層。' },
    ],
  },

  // --- Segment 9: 討論：AI 倫理與未來 (w08-s09, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '這是本學期最後一次課堂討論。讓我們退一步，思考更大的圖景——金融中的 AI 不只是一個技術問題。它是一個倫理和系統性的問題。' },
      { type: 'discuss_timer', durationMinutes: 5, prompt: '如果每個大型基金都使用相同的 AI 模型，它們可能在市場壓力時做出完全相同的反應——同時賣出相同的資產。AI 羊群效應是否是一個現實的系統性風險問題？', guidePoints: ['連結到 2008 年的高斯聯結函數（Gaussian Copula）危機', '模型多樣性作為防護措施', '來自歷史訓練數據的演算法偏差', '人類監督的要求'] },
      { type: 'lecture', character: 'kenji', text: '我以前見過這種情況。2008 年，所有人都在信用衍生性商品上使用相同的高斯聯結函數模型。當模型崩潰時，所有人同時衝向出口。AI 羊群效應可能會造成同樣的動態，但速度更快。' },
      { type: 'lecture', character: 'priya', text: '工作取代是另一個問題。但我認為更多的是工作轉型而非取代。新角色需要金融知識和 AI 技能的結合——正是本課程一直在教授的組合。' },
      { type: 'lecture', character: 'drLin', text: '模型多樣性和人類監督是不可或缺的防護措施。每次金融危機的教訓都是一樣的：當每個人都依賴相同的模型時，失敗模式就變成了系統性的。AI 不會改變這個根本事實——它會放大它。' },
    ],
  },

  // --- Segment 10: 總結與課程回顧 (w08-s10, 5 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: '讓我最後一次帶你們走過八週的旅程。第一週：分配和常態性的失敗。第二週：波動率及其隨時間變化的本質。第三和第四週：GARCH 家族。第五週：預測評估。' },
      { type: 'lecture', character: 'drLin', text: '第六週：VaR 和預期短缺。第七週：回測和壓力測試。今天，第八週：AI 遇見金融。每一週都建立在前一週的基礎上，它們共同形成了一套完整的風險管理工具組。' },
      { type: 'lecture', character: 'drLin', text: '關鍵要點。ML 和 GARCH 是互補的，不是競爭的。混合模型勝出：GARCH 提供結構骨幹，ML 增加靈活性。特徵工程（Feature Engineering）是 ML 在金融中成功的關鍵。永遠用嚴謹的樣本外測試來質疑供應商的宣稱。' },
      { type: 'lecture', character: 'drLin', text: '你們的最終任務——任務八——撰寫一份給 Kenji 投資委員會的綜合建議報告。包含模型比較、混合模型結果、監管考量和你的風險評估。這是總結性的交付成果。' },
      { type: 'lecture', character: 'drLin', text: 'Alex，最後一個想法。工具會變，但原則不變。理解你的數據。質疑你的假設。誠實地測試你的模型。學習的旅程永遠不會真正結束。' },
      { type: 'lecture', character: 'alex', text: '謝謝你，Dr. Lin。也謝謝各位。從分配到 AI，八週的旅程——在第一天我不會相信這是可能的。風險管理的未來在於所有方法的智慧整合。' },
    ],
  },
];
