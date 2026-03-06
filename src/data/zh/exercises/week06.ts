import { WeekExercises } from '@/types';

export const week06Exercises: WeekExercises = {
  weekNumber: 6,
  title: '風險值',
  questions: [
    {
      id: 'w06-q01',
      question: '某投資組合的 99% 1 日風險值（Value-at-Risk, VaR）為 500 萬美元。這表示：',
      options: [
        { label: 'A', text: '該投資組合在最糟糕的一天恰好虧損 500 萬美元' },
        { label: 'B', text: '在 100 個交易日中有 99 天，投資組合的虧損不會超過 500 萬美元' },
        { label: 'C', text: '該投資組合永遠不會虧損超過 500 萬美元' },
        { label: 'D', text: '預期每日虧損為 500 萬美元' },
      ],
      correctAnswer: 'B',
      explanation: 'VaR 是一個基於分位數的衡量指標：99% VaR 意味著每日虧損超過 500 萬美元的機率為 1%。等價地，在 100 天中有 99 天虧損保持在此門檻之下。VaR 不提供任何關於超過門檻後虧損嚴重程度的資訊。',
    },
    {
      id: 'w06-q02',
      question: '一家銀行報告 99% 1 日 VaR。在 250 個交易日中，預期大約有多少次 VaR 突破（Breach，即實際虧損超過 VaR 的天數）？',
      options: [
        { label: 'A', text: '0 次——VaR 不應該被突破' },
        { label: 'B', text: '25 次' },
        { label: 'C', text: '2-3 次' },
        { label: 'D', text: '10 次' },
      ],
      correctAnswer: 'C',
      explanation: '在 99% 信心水準下，預期突破次數為 (1-0.99) x 250 = 2.5 次/年。如果 VaR 模型校準良好，我們應該觀察到大約 2-3 次突破。較少的突破次數表示模型過於保守；顯著較多則表示模型低估了風險。',
    },
    {
      id: 'w06-q03',
      question: '相較於參數法 VaR（Parametric VaR），歷史模擬法 VaR（Historical Simulation VaR）的一個關鍵優勢是：',
      options: [
        { label: 'A', text: '它能快速適應變化的波動率機制' },
        { label: 'B', text: '它不需要分配假設——直接使用過去報酬率的實際經驗分配' },
        { label: 'C', text: '它在平靜時期產生更保守的估計' },
        { label: 'D', text: '對大型投資組合的計算速度更快' },
      ],
      correctAnswer: 'B',
      explanation: '歷史模擬法是非參數方法（Nonparametric）：它使用實際排序的歷史報酬率來確定 VaR 分位數，不假設常態分配、t 分配或任何其他分配形式。其主要缺點是對機制轉換（Regime Change）的適應速度慢，因為 VaR 取決於整個歷史窗口。',
    },
    {
      id: 'w06-q04',
      question: '為什麼基於 GARCH 的參數法 VaR 比歷史模擬法 VaR 更能快速適應市場壓力？',
      options: [
        { label: 'A', text: '它使用更長的歷史窗口' },
        { label: 'B', text: '它對所有過去報酬率賦予相同權重' },
        { label: 'C', text: '它使用更多的數據點' },
        { label: 'D', text: '它根據近期報酬率每日更新條件波動率 sigma_t，賦予近期資訊更大的權重' },
      ],
      correctAnswer: 'D',
      explanation: 'GARCH 模型使用遞迴方程式每日更新其條件變異數預測。一個大的負報酬率會立即增加 sigma_t^2，進而增加參數法 VaR。歷史模擬法對窗口內所有報酬率一視同仁，因此一個新觀測值對 500 天窗口的影響極小。',
    },
    {
      id: 'w06-q05',
      question: '預期短缺（Expected Shortfall, ES）解決了風險值（VaR）的什麼根本弱點？',
      options: [
        { label: 'A', text: 'VaR 告訴你損失門檻，但對超過該門檻後的損失嚴重程度一無所知' },
        { label: 'B', text: 'VaR 無法對含有選擇權的投資組合計算' },
        { label: 'C', text: 'VaR 需要常態分配假設' },
        { label: 'D', text: 'VaR 在實際風險管理中過於保守' },
      ],
      correctAnswer: 'A',
      explanation: 'VaR 是一個門檻指標：它識別最差 (1-alpha)% 結果的邊界，但對超過該邊界的平均嚴重程度一無所知。一個 VaR = 1000 萬美元的投資組合，其平均尾部損失可能是 1100 萬美元或 5000 萬美元。預期短缺（CVaR）衡量的是在 VaR 被突破時的平均損失，提供尾部嚴重程度的資訊。',
    },
    {
      id: 'w06-q06',
      question: '預期短缺被稱為「一致性」（Coherent）風險衡量指標，因為它滿足次可加性（Subadditivity）。次可加性在風險管理中意味著什麼？',
      options: [
        { label: 'A', text: '風險總是正值' },
        { label: 'B', text: '更高的信心水準產生更高的風險估計' },
        { label: 'C', text: '合併投資組合的風險小於或等於各個別風險之和——分散投資（Diversification）總是降低風險' },
        { label: 'D', text: '風險衡量指標不受使用幣別的影響' },
      ],
      correctAnswer: 'C',
      explanation: '次可加性意味著 rho(X + Y) <= rho(X) + rho(Y)，形式化了分散投資不應增加風險的概念。VaR 可能違反此性質：合併兩個投資組合可能產生高於個別 VaR 總和的合併 VaR。預期短缺滿足次可加性，使其成為一致性風險衡量指標。',
    },
    {
      id: 'w06-q07',
      question: '計算參數法 VaR 時，使用學生 t 分配（Student-t Distribution）而非常態分配會導致：',
      options: [
        { label: 'A', text: '較小的 VaR（較不保守）' },
        { label: 'B', text: '較大的 VaR，因為 t 分配的分位數比常態分配的分位數在尾部更遠' },
        { label: 'C', text: '沒有差異，因為兩種分配具有相同的分位數' },
        { label: 'D', text: 'VaR 不再依賴波動率估計' },
      ],
      correctAnswer: 'B',
      explanation: '學生 t 分配的尾部比常態分配更厚。例如，在自由度 nu = 7 的第 1 百分位數，t_{0.01,7} 約為 -2.998，而常態分配的 z_{0.01} = -2.326。這產生約 29% 更大的 VaR，反映了極端損失的更高機率。',
    },
    {
      id: 'w06-q08',
      question: '99% 預期短缺（Expected Shortfall）最佳的描述是：',
      options: [
        { label: 'A', text: 'VaR 被超過的機率' },
        { label: 'B', text: '投資組合的最大可能損失' },
        { label: 'C', text: '尾部報酬率的標準差' },
        { label: 'D', text: '在損失超過 VaR 的日子裡的平均損失（即最差 1% 結果中的平均損失）' },
      ],
      correctAnswer: 'D',
      explanation: '預期短缺（又稱 CVaR）在 99% 水準下衡量的是在損失超過 VaR 條件下的平均損失嚴重程度。對於常態分配，99% ES 約為 VaR 的 1.15 倍；對於厚尾分配，該比率更大（通常 1.2-1.4），表示 VaR 以外的尾部更重。',
    },
  ],
};
