import { WeekExercises } from '@/types';

export const week03Exercises: WeekExercises = {
  weekNumber: 3,
  title: '波動率聚集與 GARCH',
  questions: [
    {
      id: 'w03-q01',
      question: '波動率聚集（Volatility Clustering）是指以下的經驗現象：',
      options: [
        { label: 'A', text: '報酬率呈正自相關' },
        { label: 'B', text: '報酬率平方具有顯著的正自相關（Autocorrelation）' },
        { label: 'C', text: '波動率隨時間保持不變' },
        { label: 'D', text: '大幅正報酬之後總是跟隨大幅負報酬' },
      ],
      correctAnswer: 'B',
      explanation: '波動率聚集意味著大報酬率（無論正負）之後傾向跟隨大報酬率，小報酬率之後跟隨小報酬率。這可以透過報酬率平方 r_t^2 的正自相關來偵測，而非原始報酬率 r_t（其近似不相關）。',
    },
    {
      id: 'w03-q02',
      question: '在 GARCH(1,1) 模型 sigma_t^2 = omega + alpha * r_{t-1}^2 + beta * sigma_{t-1}^2 中，參數 alpha 和 beta 分別代表：',
      options: [
        { label: 'A', text: '平均報酬率及其變異數' },
        { label: 'B', text: '短期和長期波動率水準' },
        { label: 'C', text: '衝擊係數（Shock Coefficient，對新資訊的反應）和持續性係數（Persistence Coefficient，對過去變異數的記憶）' },
        { label: 'D', text: '報酬率分配的偏態和峰度' },
      ],
      correctAnswer: 'C',
      explanation: '參數 alpha 捕捉昨日報酬率平方（新衝擊）對今日條件變異數（Conditional Variance）的影響程度，而 beta 捕捉昨日條件變異數延續至今日的程度。股票的典型值：alpha = 0.05-0.15，beta = 0.80-0.95。',
    },
    {
      id: 'w03-q03',
      question: '為什麼 GARCH(1,1) 比 ARCH(q) 用更少的參數就能捕捉波動率自相關的緩慢衰減？',
      options: [
        { label: 'A', text: 'GARCH 使用不同的殘差分配' },
        { label: 'B', text: 'GARCH 完全忽略過去的報酬率平方' },
        { label: 'C', text: 'GARCH 使用報酬率分配的高階動差' },
        { label: 'D', text: 'GARCH(1,1) 等價於具有幾何衰減權重的 ARCH(infinity)，由單一 beta 參數編碼' },
      ],
      correctAnswer: 'D',
      explanation: '透過反覆將 sigma_{t-1}^2 代入自身，GARCH(1,1) 可以寫成 sigma_t^2 = omega/(1-beta) + alpha * sum(beta^{i-1} * r_{t-i}^2)，即一個具有指數衰減係數的無限階 ARCH。beta 項有效地編碼了整段歷史。',
    },
    {
      id: 'w03-q04',
      question: 'GARCH 相對於 EWMA 在波動率建模中的主要優勢是什麼？',
      options: [
        { label: 'A', text: 'GARCH 具有長期變異數錨定值（Long-run Variance Anchor）sigma_bar^2 = omega/(1-alpha-beta)，提供均值回歸（Mean Reversion）' },
        { label: 'B', text: 'GARCH 不需要歷史數據' },
        { label: 'C', text: 'GARCH 總是產生較低的波動率估計' },
        { label: 'D', text: 'GARCH 的計算速度比 EWMA 更快' },
      ],
      correctAnswer: 'A',
      explanation: 'EWMA 是 GARCH 在 omega = 0 時的特殊情況（即 IGARCH，alpha + beta = 1）。沒有 omega，EWMA 沒有無條件變異數可供回歸——衝擊之後，波動率會漫無目的地漂移。GARCH 的 omega > 0 就像一根彈簧，將波動率拉回其長期水準。',
    },
    {
      id: 'w03-q05',
      question: 'EWMA 可視為 GARCH(1,1) 的特殊情況。對 GARCH 參數施加什麼限制可得到 EWMA？',
      options: [
        { label: 'A', text: 'alpha = 0' },
        { label: 'B', text: 'omega = 0（等價於 alpha + beta = 1）' },
        { label: 'C', text: 'beta = 0' },
        { label: 'D', text: 'alpha = beta' },
      ],
      correctAnswer: 'B',
      explanation: '在 GARCH(1,1) 中令 omega = 0，得到 sigma_t^2 = alpha * r_{t-1}^2 + beta * sigma_{t-1}^2，其中 alpha + beta = 1。令 alpha = 1-lambda、beta = lambda，即得 EWMA 公式 sigma_t^2 = (1-lambda)*r_{t-1}^2 + lambda*sigma_{t-1}^2。這也稱為整合型 GARCH（Integrated GARCH, IGARCH）。',
    },
    {
      id: 'w03-q06',
      question: 'GARCH(1,1) 模型要滿足共變異數定態性（Covariance Stationarity），需要哪個條件成立？',
      options: [
        { label: 'A', text: 'omega > 1' },
        { label: 'B', text: 'alpha > beta' },
        { label: 'C', text: 'alpha + beta < 1' },
        { label: 'D', text: 'alpha + beta > 1' },
      ],
      correctAnswer: 'C',
      explanation: '定態性條件 alpha + beta < 1 確保無條件變異數 sigma_bar^2 = omega/(1-alpha-beta) 為有限正值。當 alpha + beta = 1（IGARCH）時，無條件變異數未定義。當 alpha + beta > 1 時，變異數預測值會無限增長——模型是爆炸性的。',
    },
    {
      id: 'w03-q07',
      question: '在 GARCH 的最大概似估計（Maximum Likelihood Estimation, MLE）中，最佳化器尋找的參數值是：',
      options: [
        { label: 'A', text: '最小化報酬率平方和' },
        { label: 'B', text: '最小化每個時間步的條件變異數' },
        { label: 'C', text: '最大化模型中的參數數量' },
        { label: 'D', text: '在給定模型下，最大化觀測到實際報酬序列的機率' },
      ],
      correctAnswer: 'D',
      explanation: 'MLE 尋找使對數概似函數 L = -1/2 * sum[ln(2*pi) + ln(sigma_t^2) + r_t^2/sigma_t^2] 最大化的 (omega, alpha, beta)。直觀來說，這選擇了最能透過時變變異數 sigma_t^2 解釋所觀察到的大小報酬率模式的參數。',
    },
    {
      id: 'w03-q08',
      question: '擬合 GARCH(1,1) 後，標準化殘差 z_hat_t = r_t / sigma_hat_t 仍然呈現超額峰度。最佳的補救方法是：',
      options: [
        { label: 'A', text: '使用學生 t 分配（Student-t Distribution）替代常態分配作為殘差分配' },
        { label: 'B', text: '將 GARCH 階數提高到 (2,2)' },
        { label: 'C', text: '從數據中移除所有極端值' },
        { label: 'D', text: '從對數報酬率切換為簡單報酬率' },
      ],
      correctAnswer: 'A',
      explanation: '即使經過 GARCH 過濾，標準化殘差通常仍保留厚尾特徵。使用學生 t 分配（估計自由度 nu）可以容納這些殘餘的峰度。典型的股票數據 nu = 5-7，證實尾部比常態分配更厚。移除極端值（C）會丟棄恰好是最具資訊量的觀測值。',
    },
  ],
};
