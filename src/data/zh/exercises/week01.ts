import { WeekExercises } from '@/types';

export const week01Exercises: WeekExercises = {
  weekNumber: 1,
  title: '金融風險與報酬分配',
  questions: [
    {
      id: 'w01-q01',
      question: '為什麼在量化金融（Quantitative Finance）中，對數報酬率（Log Returns）比簡單報酬率更受青睞？',
      options: [
        { label: 'A', text: '它們總是比簡單報酬率大' },
        { label: 'B', text: '它們具有時間可加性（Time-Additive）：多期對數報酬率等於各單期對數報酬率之和' },
        { label: 'C', text: '它們總是正值' },
        { label: 'D', text: '它們不需要價格數據' },
      ],
      correctAnswer: 'B',
      explanation: '對數報酬率滿足 r_{t:t+k} = r_{t+1} + r_{t+2} + ... + r_{t+k}，使多期分析變得簡單直接。簡單報酬率則需要幾何複利：(1+R_{t:t+k}) = product of (1+R_i)。此外，對數報酬率在零附近具有對稱性。',
    },
    {
      id: 'w01-q02',
      question: '某金融報酬序列的超額峰度（Excess Kurtosis）為 8.5。這表示：',
      options: [
        { label: 'A', text: '該分配完全對稱' },
        { label: 'B', text: '該分配的尾部比常態分配更薄' },
        { label: 'C', text: '該分配的尾部比常態分配更厚（高狹峰，Leptokurtic）' },
        { label: 'D', text: '平均報酬率是標準差的 8.5 倍' },
      ],
      correctAnswer: 'C',
      explanation: '超額峰度 > 0 表示尾部比常態分配（Normal Distribution）更厚（高狹峰）。8.5 的數值在每日股票報酬率中相當典型，意味著極端事件的發生頻率遠高於常態分配的預測。超額峰度是原始四階動差減去 3，其中 3 是常態分配的峰度。',
    },
    {
      id: 'w01-q03',
      question: '股票報酬率的負偏態（Negative Skewness）意味著：',
      options: [
        { label: 'A', text: '大幅虧損的頻率高於相同幅度的大幅獲利' },
        { label: 'B', text: '分配是對稱的' },
        { label: 'C', text: '大幅獲利的頻率高於大幅虧損' },
        { label: 'D', text: '平均報酬率為負值' },
      ],
      correctAnswer: 'A',
      explanation: '負偏態意味著左尾更長、更厚。在金融意義上，大幅下跌的出現頻率高於等幅的大幅上漲。注意：這並不表示平均報酬率為負——偏態（Skewness）衡量的是不對稱性，而非報酬率的水準。',
    },
    {
      id: 'w01-q04',
      question: 'Jarque-Bera 檢定透過檢驗什麼來評估常態性？',
      options: [
        { label: 'A', text: '僅檢驗平均值和變異數' },
        { label: 'B', text: '僅檢驗偏態' },
        { label: 'C', text: '僅檢驗峰度' },
        { label: 'D', text: '同時聯合檢驗偏態和超額峰度' },
      ],
      correctAnswer: 'D',
      explanation: 'JB 統計量為 JB = (T/6)(S^2 + K^2/4)，將偏態 S 和超額峰度 K 結合為單一檢定。在虛無假設 H0：常態性下，JB 服從自由度為 2 的卡方分配（Chi-squared Distribution）。在 5% 顯著水準下，臨界值為 5.99。',
    },
    {
      id: 'w01-q05',
      question: '在每日股票報酬率對常態分配的 QQ 圖中，S 形曲線表示：',
      options: [
        { label: 'A', text: '報酬率完全符合常態分配' },
        { label: 'B', text: '報酬率的尾部比常態分配更厚' },
        { label: 'C', text: '報酬率的尾部比常態分配更薄' },
        { label: 'D', text: '樣本量太小' },
      ],
      correctAnswer: 'B',
      explanation: 'S 形曲線表示資料點在兩端偏離 45 度線：左尾更厚（點位在線的上方）且右尾更厚（點位在線的下方）。這是幾乎所有金融報酬序列中都能觀察到的典型厚尾（Fat Tail）特徵。',
    },
    {
      id: 'w01-q06',
      question: '與常態分配相比，自由度 nu = 5 的學生 t 分配（Student-t Distribution）：',
      options: [
        { label: 'A', text: '尾部更薄' },
        { label: 'B', text: '尾部完全相同' },
        { label: 'C', text: '尾部更厚，能更好地擬合金融報酬率' },
        { label: 'D', text: '無法用於金融建模' },
      ],
      correctAnswer: 'C',
      explanation: '學生 t 分配的尾部比常態分配更厚，由自由度參數 nu 控制。當 nu 趨近無窮大時，收斂至常態分配。對於股票報酬率，nu 約為 4-8 時通常能提供更好的擬合效果。t 分配將從第三週開始作為 GARCH 模型的誤差分配使用。',
    },
    {
      id: 'w01-q07',
      question: '基於常態分配的風險模型對 5 個標準差日虧損的機率低估了大約：',
      options: [
        { label: 'A', text: '約 4,000 倍（經驗值約 0.12% vs. 理論值約 0.00003%）' },
        { label: 'B', text: '約 2 倍' },
        { label: 'C', text: '約 10 倍' },
        { label: 'D', text: '沒有低估；常態模型是準確的' },
      ],
      correctAnswer: 'A',
      explanation: '5 個標準差的虧損在經驗上大約每 3 年發生一次（約 0.12%），而常態模型預測每 13,900 年才發生一次（約 0.00003%）。其比率約為 0.12/0.00003 = 4,000。',
    },
    {
      id: 'w01-q08',
      question: '以下哪項最能解釋為什麼混合低波動率和高波動率時期會產生厚尾？',
      options: [
        { label: 'A', text: '低波動率時期具有負報酬率' },
        { label: 'B', text: '混合不同變異數的常態分配會產生混合分配（Mixture Distribution），其尾部比任何單一常態成分更厚' },
        { label: 'C', text: '高波動率時期總是緊跟在崩盤之後' },
        { label: 'D', text: '厚尾只出現在新興市場' },
      ],
      correctAnswer: 'B',
      explanation: '當報酬率來自常態分配的混合體（部分具有小 sigma，部分具有大 sigma）時，無條件分配（Unconditional Distribution）會呈現超額峰度，即使每個條件分配都是常態的。這種波動率聚集（Volatility Clustering）效應是 GARCH 模型（第三週）背後的關鍵洞見。',
    },
  ],
};
