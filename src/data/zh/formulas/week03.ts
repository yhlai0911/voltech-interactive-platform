import { WeekFormulas } from '@/types';

export const week03Formulas: WeekFormulas = {
  weekNumber: 3,
  title: '波動度叢聚與 GARCH',
  formulas: [
    {
      id: 'w03-f01',
      name: '報酬分解（Return Decomposition）',
      latex: 'r_t = \\sigma_t \\, z_t, \\quad z_t \\sim \\text{i.i.d.}(0,1)',
      description: '報酬等於一個隨時間變化的「音量旋鈕」（條件波動度 sigma_t）乘以一個隨機的「方向」（標準化衝擊 z_t）。',
      variables: {
        'r_t': '時間 t 的報酬率',
        '\\sigma_t': '時間 t 的條件標準差',
        'z_t': '標準化衝擊，獨立抽取自均值為 0、變異數為 1 的分配',
      },
      weekIntroduced: 3,
    },
    {
      id: 'w03-f02',
      name: 'ARCH(q) 模型',
      latex: '\\sigma_t^2 = \\omega + \\sum_{i=1}^{q} \\alpha_i \\, r_{t-i}^2',
      description: '自迴歸條件異質變異數（Autoregressive Conditional Heteroskedasticity）模型。今天的變異數取決於過去的平方報酬。需要 omega > 0 且 alpha_i >= 0。',
      variables: {
        '\\sigma_t^2': '時間 t 的條件變異數',
        '\\omega': '常數基準變異數（> 0）',
        '\\alpha_i': '第 i 期落後的 ARCH 係數（>= 0）',
        'q': '階數——平方報酬的落後期數',
      },
      weekIntroduced: 3,
    },
    {
      id: 'w03-f03',
      name: 'GARCH(1,1) 模型',
      latex: '\\sigma_t^2 = \\omega + \\alpha \\, r_{t-1}^2 + \\beta \\, \\sigma_{t-1}^2',
      description: '廣義 ARCH（Generalized ARCH）。加入前一期變異數作為預測因子，大幅減少參數。三個數字即可捕捉大多數金融資產的波動度動態。',
      variables: {
        '\\omega': '變異數基準水準（> 0）',
        '\\alpha': '衝擊係數——對新資訊的反應（>= 0），通常為 0.05-0.15',
        '\\beta': '持續性係數——對過去變異數的記憶（>= 0），通常為 0.80-0.95',
      },
      example: '定態性要求 alpha + beta < 1。典型股票值：alpha + beta = 0.95-0.99。',
      weekIntroduced: 3,
    },
    {
      id: 'w03-f04',
      name: '長期變異數（Long-Run Variance）',
      latex: '\\bar{\\sigma}^2 = \\frac{\\omega}{1 - \\alpha - \\beta}',
      description: 'GARCH 波動度趨向的無條件（長期）變異數。這是 EWMA 所缺少的「基準值」（因為 EWMA 設定 omega = 0）。',
      variables: {
        '\\bar{\\sigma}^2': '長期（無條件）變異數',
        '\\omega': 'GARCH 常數項',
        '\\alpha + \\beta': '持續性，定態性要求必須 < 1',
      },
      weekIntroduced: 3,
    },
    {
      id: 'w03-f05',
      name: '波動度半衰期（Volatility Half-Life）',
      latex: 'h = \\frac{\\ln(0.5)}{\\ln(\\alpha + \\beta)}',
      description: '波動度衝擊衰減 50% 所需的天數。在典型持續性 0.95-0.99 下，半衰期範圍為 14 至 69 天。',
      variables: {
        'h': '半衰期（天）',
        '\\alpha + \\beta': '持續性參數',
      },
      example: '若 alpha + beta = 0.97，h = ln(0.5)/ln(0.97) = 22.8 天。',
      weekIntroduced: 3,
    },
    {
      id: 'w03-f06',
      name: '高斯對數概似函數（Gaussian Log-Likelihood）',
      latex: '\\mathcal{L} = -\\frac{1}{2}\\sum_{t=1}^{T} \\left[\\ln(2\\pi) + \\ln(\\sigma_t^2) + \\frac{r_t^2}{\\sigma_t^2}\\right]',
      description: '常態殘差下 GARCH 的對數概似函數。最大概似估計法（MLE）找出使此函數最大化的 omega、alpha、beta。',
      variables: {
        '\\mathcal{L}': '對數概似值',
        'T': '觀測值數量',
        '\\sigma_t^2': '時間 t 的條件變異數（由 GARCH 遞迴計算）',
      },
      weekIntroduced: 3,
    },
    {
      id: 'w03-f07',
      name: 'Ljung-Box 檢定',
      latex: 'Q(m) = T(T+2)\\sum_{k=1}^{m}\\frac{\\hat{\\rho}(k)^2}{T-k} \\sim \\chi^2(m)',
      description: '檢定平方報酬（GARCH 前）或平方標準化殘差（GARCH 後）的自相關性。小 p 值確認波動度叢聚（Volatility Clustering）的存在。',
      variables: {
        'Q(m)': '使用 m 個落後期的 Ljung-Box 檢定統計量',
        '\\hat{\\rho}(k)': '第 k 期落後的樣本自相關係數',
        'T': '觀測值數量',
      },
      weekIntroduced: 3,
    },
    {
      id: 'w03-f08',
      name: '標準化殘差（Standardized Residuals）',
      latex: '\\hat{z}_t = \\frac{r_t}{\\hat{\\sigma}_t}',
      description: '若 GARCH 模型正確，標準化殘差應表現為獨立同分配的抽樣，其平方不應有殘餘的自相關性。',
      variables: {
        '\\hat{z}_t': '時間 t 的標準化殘差',
        'r_t': '觀測報酬率',
        '\\hat{\\sigma}_t': '估計的條件波動度',
      },
      weekIntroduced: 3,
    },
  ],
};
