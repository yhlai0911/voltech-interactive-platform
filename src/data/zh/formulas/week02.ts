import { WeekFormulas } from '@/types';

export const week02Formulas: WeekFormulas = {
  weekNumber: 2,
  title: '波動度衡量',
  formulas: [
    {
      id: 'w02-f01',
      name: '滾動窗口波動度（Rolling Window Volatility）',
      latex: '\\hat{\\sigma}_{t}^{\\text{roll}} = \\sqrt{\\frac{1}{N-1} \\sum_{i=0}^{N-1} (r_{t-i} - \\bar{r}_{t,N})^2}',
      description: '在 N 個觀測值的滾動窗口內的報酬標準差。年化時乘以 sqrt(252)。',
      variables: {
        '\\hat{\\sigma}_{t}^{\\text{roll}}': '時間 t 的滾動窗口波動度',
        'N': '窗口長度（例如 20、60 或 252 天）',
        'r_{t-i}': 'i 期前的報酬率',
        '\\bar{r}_{t,N}': '窗口內報酬率的滾動平均',
      },
      example: '常見選擇：20 天（短期）、60 天（中期）、252 天（長期，約 1 年）。',
      weekIntroduced: 2,
    },
    {
      id: 'w02-f02',
      name: 'EWMA 變異數（遞迴式）',
      latex: '\\hat{\\sigma}_t^2 = \\lambda \\, \\hat{\\sigma}_{t-1}^2 + (1-\\lambda) \\, r_{t-1}^2',
      description: '指數加權移動平均（Exponentially Weighted Moving Average）變異數。今天的估計值是昨天的估計值與昨天平方報酬的加權混合。RiskMetrics 標準：lambda = 0.94。',
      variables: {
        '\\hat{\\sigma}_t^2': '時間 t 的 EWMA 變異數估計',
        '\\lambda': '衰減因子（0 < lambda < 1），通常為 0.94',
        'r_{t-1}': '前一期報酬率',
      },
      example: '當 lambda = 0.94 時，有效觀測數量為 1/(1-0.94) = 16.7 天。',
      weekIntroduced: 2,
    },
    {
      id: 'w02-f03',
      name: 'EWMA 變異數（展開式）',
      latex: '\\hat{\\sigma}_t^2 = (1-\\lambda) \\sum_{i=1}^{\\infty} \\lambda^{i-1} \\, r_{t-i}^2',
      description: 'EWMA 變異數表示為所有過去平方報酬的加權總和，權重以幾何遞減。',
      variables: {
        '\\lambda^{i-1}': 'i 期前報酬的權重，以幾何方式遞減',
      },
      weekIntroduced: 2,
    },
    {
      id: 'w02-f04',
      name: 'EWMA 權重',
      latex: 'w_i = (1-\\lambda)\\lambda^{i-1}',
      description: '在 EWMA 模型中分配給 i 期前報酬的權重。權重總和為 1，並以幾何方式遞減。',
      variables: {
        'w_i': 'i 期前報酬的權重',
        '\\lambda': '衰減因子',
      },
      weekIntroduced: 2,
    },
    {
      id: 'w02-f05',
      name: '已實現波動度（Realized Volatility）',
      latex: 'RV_t = \\sum_{j=1}^{M} r_{t,j}^2',
      description: '日內平方報酬的總和。隨著取樣頻率的增加，已實現波動度收斂至當日的真實積分變異數。',
      variables: {
        'RV_t': '第 t 天的已實現波動度',
        'M': '日內報酬區間數（5 分鐘報酬通常為 78）',
        'r_{t,j}': '第 t 天的第 j 個日內報酬',
      },
      example: '以 6.5 小時交易日、5 分鐘為間隔計算，M = 78。',
      weekIntroduced: 2,
    },
    {
      id: 'w02-f06',
      name: 'VIX 解讀',
      latex: '\\text{VIX} = V\\% \\Rightarrow \\text{Daily vol} \\approx \\frac{V}{\\sqrt{252}}\\%',
      description: 'VIX 代表從選擇權價格推導的 S&P 500 預期年化波動度。除以 sqrt(252) 可得預期每日波動度。',
      variables: {
        'V': 'VIX 值（年化百分比）',
      },
      example: 'VIX = 20 表示約 20% 年化波動度，或 20/sqrt(252) = 1.26% 每日波動度。',
      weekIntroduced: 2,
    },
    {
      id: 'w02-f07',
      name: '年化轉換（Annualization）',
      latex: '\\sigma_{\\text{annual}} = \\sigma_{\\text{daily}} \\times \\sqrt{252}',
      description: '將每日波動度轉換為年化波動度，乘以每年交易天數的平方根。',
      variables: {
        '\\sigma_{\\text{annual}}': '年化波動度',
        '\\sigma_{\\text{daily}}': '每日波動度',
        '252': '每年交易天數',
      },
      weekIntroduced: 2,
    },
  ],
};
