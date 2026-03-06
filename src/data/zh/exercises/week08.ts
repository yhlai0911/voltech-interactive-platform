import { WeekExercises } from '@/types';

export const week08Exercises: WeekExercises = {
  weekNumber: 8,
  title: '人工智慧在金融中的應用',
  questions: [
    {
      id: 'w08-q01',
      question: '在偏差-變異數權衡（Bias-Variance Tradeoff）中，一個高靈活性的機器學習模型（例如深度神經網路）通常表現為：',
      options: [
        { label: 'A', text: '高偏差和高變異數' },
        { label: 'B', text: '低偏差和高變異數' },
        { label: 'C', text: '高偏差和低變異數' },
        { label: 'D', text: '低偏差和低變異數' },
      ],
      correctAnswer: 'B',
      explanation: '高靈活性的模型對數據施加的假設較少（低偏差），但其預測在不同訓練樣本間可能不穩定（高變異數）。相比之下，GARCH 具有高偏差（強參數假設）但低變異數（穩定的預測）。最佳模型在這兩個誤差來源之間取得平衡。',
    },
    {
      id: 'w08-q02',
      question: '在用於波動率預測的隨機森林（Random Forest）模型中，特徵重要性（Feature Importance）通常透過什麼方式衡量？',
      options: [
        { label: 'A', text: '每個特徵與目標之間的相關係數' },
        { label: 'B', text: '特徵迴歸係數的 t 統計量' },
        { label: 'C', text: '當特徵的值被隨機排列（Permutation）後，預測準確度的下降幅度' },
        { label: 'D', text: '特徵的標準差' },
      ],
      correctAnswer: 'C',
      explanation: '排列重要性（Permutation Importance）衡量當一個特徵被隨機打亂、打破其與目標的關係後，模型預測誤差增加多少。增加越大表示特徵越重要。這種方法與模型無關（Model-agnostic），對相關特徵來說比基於不純度（Impurity）的重要性更可靠。',
    },
    {
      id: 'w08-q03',
      question: '在 LSTM 神經網路中，遺忘門（Forget Gate）決定：',
      options: [
        { label: 'A', text: '什麼新資訊要加入細胞狀態' },
        { label: 'B', text: '要丟棄前一細胞狀態（Cell State）的多大比例' },
        { label: 'C', text: '當前時間步要產生什麼輸出' },
        { label: 'D', text: '反向傳播的學習率' },
      ],
      correctAnswer: 'B',
      explanation: '遺忘門為細胞狀態的每個元素輸出一個 0 到 1 之間的值。0 意味著「完全遺忘此資訊」，1 意味著「完全保留」。在波動率預測中，遺忘門可以學會在機制轉換（Regime Change）發生時丟棄舊的波動率模式。',
    },
    {
      id: 'w08-q04',
      question: '在比較 GJR-GARCH、隨機森林和混合模型（Hybrid，GARCH + RF）用於日頻波動率預測時，文獻一致發現：',
      options: [
        { label: 'A', text: '隨機森林總是優於 GARCH' },
        { label: 'B', text: 'GARCH 總是優於隨機森林' },
        { label: 'C', text: '三個模型表現完全相同' },
        { label: 'D', text: '將 GARCH 條件波動率作為特徵輸入隨機森林的混合模型，往往產生最佳預測' },
      ],
      correctAnswer: 'D',
      explanation: '混合方法利用 GARCH 中編碼的結構知識（波動率聚集、槓桿效應）作為更靈活的隨機森林的輸入特徵。這一致優於單獨使用任一方法，因為 GARCH 提供了一個強力的「基線預測」（Baseline Forecast），機器學習模型可以利用額外特徵來加以改進。此結果獲 Christensen, Siggaard, and Veliyev（2023）的支持。',
    },
    {
      id: 'w08-q05',
      question: '以下哪種方法最能有效防止隨機森林模型的過度擬合（Overfitting）？',
      options: [
        { label: 'A', text: '不加篩選地增加更多特徵' },
        { label: 'B', text: '使用更多的樹（n_estimators = 10,000）' },
        { label: 'C', text: '限制樹的深度（max_depth）並要求每個葉節點的最小樣本數' },
        { label: 'D', text: '在整個數據集上訓練，不進行訓練-測試拆分' },
      ],
      correctAnswer: 'C',
      explanation: '正則化參數（Regularization）如 max_depth 和 min_samples_leaf 約束單棵樹的複雜度，防止它們記住訓練數據中的噪音。增加更多的樹（B）可以降低變異數，但不能防止單棵樹過度擬合。不加篩選地添加特徵（A）和不做測試拆分的訓練（D）都會增加過度擬合的風險。',
    },
    {
      id: 'w08-q06',
      question: '從監管角度來看，哪種模型類型最適合符合 Basel 合規的風險報告？',
      options: [
        { label: 'A', text: '具有 10,000 個參數的深度 LSTM 神經網路' },
        { label: 'B', text: '具有可解釋參數的 GJR-GARCH 模型' },
        { label: 'C', text: '具有 500 棵樹的隨機森林模型' },
        { label: 'D', text: '神經網路的黑箱集成模型' },
      ],
      correctAnswer: 'B',
      explanation: '監管框架（Basel 協定、FSA 準則）要求風險模型具有可審計性（Auditability）和可解釋性（Interpretability）。GJR-GARCH 只有 5-7 個參數，每個都有明確的經濟意義（alpha = 衝擊影響、beta = 持續性、gamma = 槓桿效應）。神經網路和大型集成模型雖然可能更準確，但難以接受監管審計。這就是為什麼混合方法以 GARCH 作為主要引擎，機器學習僅作為輔助監控工具。',
    },
    {
      id: 'w08-q07',
      question: '隨機森林比單棵決策樹（Decision Tree）降低預測變異數的原因是：',
      options: [
        { label: 'A', text: '每棵樹在隨機自助法樣本（Bootstrap Sample）和隨機子集特徵上訓練，最終預測取所有樹的平均值' },
        { label: 'B', text: '每棵樹使用相同的數據但不同的分裂準則' },
        { label: 'C', text: '森林使用比單棵樹更深的樹結構' },
        { label: 'D', text: '隨機森林根本不使用決策樹' },
      ],
      correctAnswer: 'A',
      explanation: '隨機森林的關鍵機制是裝袋法（Bagging, Bootstrap Aggregation）結合隨機特徵選擇。每棵樹看到不同的隨機子集觀測值和特徵，使各樹之間去相關。對許多去相關的樹取平均可以降低變異數，同時不會大幅增加偏差。這是 Breiman（2001）的根本洞見。',
    },
    {
      id: 'w08-q08',
      question: '在評估金融時間序列的機器學習模型時，標準的 k 折交叉驗證（k-fold Cross-Validation）存在問題，因為：',
      options: [
        { label: 'A', text: '它需要太多的計算量' },
        { label: 'B', text: '它總是產生有偏的估計' },
        { label: 'C', text: '它只適用於分類任務' },
        { label: 'D', text: '它忽略數據的時間順序，可能使用未來資訊來預測過去（前視偏誤，Look-ahead Bias）' },
      ],
      correctAnswer: 'D',
      explanation: '標準 k 折交叉驗證隨機將觀測值打亂分配到各折，這破壞了金融時間序列的時間順序。這使模型在訓練期間能夠「看到」未來數據，導致過於樂觀的表現估計。對於時間序列，必須使用時間序列拆分（Time-series Split）：在截止日期之前的數據上訓練，在之後的數據上測試。',
    },
  ],
};
