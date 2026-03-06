import { WeekExercises } from '@/types';

export const week07Exercises: WeekExercises = {
  weekNumber: 7,
  title: 'VaR 回溯測試與風險管理',
  questions: [
    {
      id: 'w07-q01',
      question: '在對 99% VaR 模型進行 Kupiec（POF）檢定時，虛無假設（Null Hypothesis）為：',
      options: [
        { label: 'A', text: 'VaR 模型總是高估風險' },
        { label: 'B', text: '觀察到的突破率等於預期突破率 p = 1 - alpha = 0.01' },
        { label: 'C', text: 'VaR 模型產生零次突破' },
        { label: 'D', text: '突破率大於 5%' },
      ],
      correctAnswer: 'B',
      explanation: 'Kupiec 檢定的虛無假設為 H0: p-hat = p，其中 p = 1 - alpha。對於 99% VaR 模型，p = 0.01。該檢定使用概似比統計量 LR_uc ~ chi-squared(1) 來檢查觀察到的突破比例是否與 1% 的預期比率統計上一致。',
    },
    {
      id: 'w07-q02',
      question: 'Christoffersen 條件覆蓋檢定（Conditional Coverage Test）在 Kupiec 檢定的基礎上額外檢驗：',
      options: [
        { label: 'A', text: 'VaR 水準是否設定得過於保守' },
        { label: 'B', text: '模型使用的是常態分配還是 t 分配' },
        { label: 'C', text: 'VaR 突破是否相互獨立（無聚集現象）' },
        { label: 'D', text: '投資組合是否具有正偏態' },
      ],
      correctAnswer: 'C',
      explanation: 'Christoffersen 檢定結合了無條件覆蓋（Kupiec）和獨立性檢定。它使用轉移機率（Transition Probabilities）pi_ij = P(I_t = j | I_{t-1} = i) 來偵測聚集現象。聯合條件覆蓋統計量為 LR_cc = LR_uc + LR_ind ~ chi-squared(2)。',
    },
    {
      id: 'w07-q03',
      question: '根據 Basel 交通燈系統（Traffic Light System），一個 99% VaR 模型在 250 個交易日中出現 3 次突破，被歸類為：',
      options: [
        { label: 'A', text: '綠燈區（可接受），資本乘數 3.0 倍' },
        { label: 'B', text: '黃燈區（有疑慮），資本乘數 3.5 倍' },
        { label: 'C', text: '紅燈區（被否決），資本乘數 4.0 倍' },
        { label: 'D', text: '沒有 Kupiec 檢定結果就無法判定' },
      ],
      correctAnswer: 'A',
      explanation: 'Basel 交通燈系統根據 250 天內的突破次數對模型進行分類：綠燈（0-4 次）、黃燈（5-9 次）、紅燈（>=10 次）。3 次突破，模型處於綠燈區，維持最低資本乘數 3.0 倍。',
    },
    {
      id: 'w07-q04',
      question: '以下哪個陳述最能區分壓力測試（Stress Testing）和回溯測試（Backtesting）？',
      options: [
        { label: 'A', text: '壓力測試使用歷史數據；回溯測試使用假設情境' },
        { label: 'B', text: '回溯測試需要 Christoffersen 檢定；壓力測試不需要' },
        { label: 'C', text: '兩種方法使用不同的統計檢定來測試相同的事物' },
        { label: 'D', text: '壓力測試評估極端/假設情境；回溯測試在正常條件下驗證模型準確性' },
      ],
      correctAnswer: 'D',
      explanation: '回溯測試將 VaR 預測與已實現損失進行比較，以檢查模型在典型市場條件下的校準。壓力測試評估投資組合在極端情境下的表現（歷史危機或假設衝擊）。完整的監管風險評估同時需要兩者。',
    },
    {
      id: 'w07-q05',
      question: '在 Christoffersen 框架中，VaR 突破的「獨立性」（Independence）意味著：',
      options: [
        { label: 'A', text: '不同資產類別的突破不相關' },
        { label: 'B', text: '今日發生突破的機率不受昨日是否發生突破的影響（pi_11 = pi_01）' },
        { label: 'C', text: '突破次數總是恰好等於預期次數' },
        { label: 'D', text: '突破只在市場危機期間發生' },
      ],
      correctAnswer: 'B',
      explanation: '獨立性意味著轉移機率滿足 pi_01 = pi_11，即今日發生突破的機率不取決於昨日是否也發生了突破。若 pi_11 > pi_01，突破呈聚集現象，表示模型對變化的市場條件（例如危機期間波動率上升）適應太慢。',
    },
    {
      id: 'w07-q06',
      question: 'Kupiec 檢定統計量服從 chi-squared(1) 分配，而 Christoffersen 條件覆蓋檢定統計量服從：',
      options: [
        { label: 'A', text: 'chi-squared(1) 分配' },
        { label: 'B', text: '常態分配' },
        { label: 'C', text: 'chi-squared(2) 分配' },
        { label: 'D', text: '自由度為 nu = T - 1 的學生 t 分配' },
      ],
      correctAnswer: 'C',
      explanation: '條件覆蓋檢定結合了兩個成分：LR_cc = LR_uc + LR_ind。無條件覆蓋成分有 1 個自由度，獨立性成分也有 1 個自由度。因此總和在虛無假設下服從 chi-squared(2)。若 LR_cc > 5.991 則拒絕。',
    },
    {
      id: 'w07-q07',
      question: '一個 VaR 模型在最近 250 個交易日中產生了 7 次突破。根據 Basel 交通燈系統，後果為：',
      options: [
        { label: 'A', text: '黃燈區：資本乘數增加到 3.65 倍，模型面臨監管審查' },
        { label: 'B', text: '綠燈區：不需要採取行動' },
        { label: 'C', text: '紅燈區：模型必須立即更換' },
        { label: 'D', text: '模型自動通過所有監管要求' },
      ],
      correctAnswer: 'A',
      explanation: '7 次突破落入黃燈區（5-9 次突破）。7 次突破的 Basel 乘數為 3.65 倍（相比綠燈區最低的 3.0 倍）。這意味著機構必須額外持有約 22% 的市場風險資本。模型面臨更嚴格的監管審查，但不會被自動否決。',
    },
    {
      id: 'w07-q08',
      question: '以下哪項正確描述了壓力測試的兩種主要類型？',
      options: [
        { label: 'A', text: '統計壓力測試和參數壓力測試' },
        { label: 'B', text: '歷史壓力測試（重演實際危機）和假設壓力測試（設計合理但前所未有的情境）' },
        { label: 'C', text: '前瞻性壓力測試和回顧性壓力測試' },
        { label: 'D', text: '只有中央銀行能設計壓力測試情境' },
      ],
      correctAnswer: 'B',
      explanation: '歷史壓力測試將已知的危機事件（如 2008 年全球金融危機、2020 年 COVID-19）透過當前投資組合重新模擬，以估計損失。假設壓力測試設計合理但尚未發生的情境（如所有亞洲市場同時崩盤）。兩種方法提供關於投資組合脆弱性的互補資訊。',
    },
  ],
};
