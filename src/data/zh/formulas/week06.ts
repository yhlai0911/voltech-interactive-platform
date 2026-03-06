import { WeekFormulas } from '@/types';

export const week06Formulas: WeekFormulas = {
  weekNumber: 6,
  title: '風險值（Value-at-Risk）',
  formulas: [
    {
      id: 'w06-f01',
      name: 'VaR 定義',
      latex: 'P(L_t > \\text{VaR}_\\alpha) = 1 - \\alpha',
      description: '在信賴水準 alpha 下的風險值（Value-at-Risk）是以機率 1 - alpha 被超過的損失門檻。對於 99% VaR，超過 VaR 的機率為 1%。',
      variables: {
        'L_t': '時間 t 的投資組合損失',
        '\\text{VaR}_\\alpha': '信賴水準 alpha 下的風險值',
        '\\alpha': '信賴水準（例如 99% 時為 0.99）',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f02',
      name: '投資組合 VaR',
      latex: '\\text{VaR}_\\alpha = -V \\cdot q_{1-\\alpha}(r_t)',
      description: 'VaR 以金額表示：投資組合價值乘以報酬分位數。負號將分位數（負值）轉換為正的損失值。',
      variables: {
        'V': '投資組合價值',
        'q_{1-\\alpha}(r_t)': '報酬分配的 (1-alpha) 分位數',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f03',
      name: '歷史模擬法 VaR（Historical Simulation）',
      latex: '\\text{VaR}_{\\alpha}^{HS} = -r_{(\\lfloor(1-\\alpha) \\times W\\rfloor)}',
      description: '將 W 個歷史報酬從最差到最佳排序。VaR 為第 (1-alpha)*W 個最差報酬。無需分配假設。',
      variables: {
        'W': '歷史窗口中的觀測值數量（例如 500）',
        'r_{(k)}': '第 k 個順序統計量（第 k 個最差報酬）',
        '\\alpha': '信賴水準',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f04',
      name: '參數法 VaR（常態分配）',
      latex: '\\text{VaR}_\\alpha = -(\\mu_t + z_{1-\\alpha} \\cdot \\sigma_t)',
      description: '在常態分配假設下，使用 GARCH 條件波動度計算的 VaR。z 分位數決定信賴水準。',
      variables: {
        '\\mu_t': '條件平均報酬',
        'z_{1-\\alpha}': '標準常態分位數（99% 時 z_{0.01} = -2.326）',
        '\\sigma_t': '來自 GARCH 模型的條件標準差',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f05',
      name: '參數法 VaR（Student-t 分配）',
      latex: '\\text{VaR}_\\alpha = -(\\mu_t + t_{1-\\alpha,\\nu} \\cdot s_t)',
      description: '在 Student-t 分配下，使用 GARCH 波動度與調整後標準差計算的 VaR。產生比常態分配更大（更保守）的 VaR。',
      variables: {
        '\\mu_t': '條件平均報酬',
        't_{1-\\alpha,\\nu}': '自由度為 nu 的 Student-t 分位數',
        's_t': '調整後標準差：s_t = sigma_t * sqrt((nu-2)/nu)',
        '\\nu': 'GARCH-t 估計的自由度',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f06',
      name: 'Student-t 尺度因子',
      latex: 's_t = \\sigma_t \\sqrt{\\frac{\\nu - 2}{\\nu}}',
      description: '將 GARCH 條件波動度調整為 Student-t 分配的單位變異數。這是必要的，因為自由度為 nu 的 t 分配其變異數為 nu/(nu-2)。',
      variables: {
        '\\sigma_t': '來自 GARCH 的條件標準差',
        '\\nu': '自由度',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f07',
      name: '預期短缺（Expected Shortfall, CVaR）',
      latex: '\\text{ES}_\\alpha = -E[r_t \\mid r_t < -\\text{VaR}_\\alpha]',
      description: '在 VaR 被突破時的平均損失。始終大於 VaR。是滿足次可加性的一致性風險衡量指標（Coherent Risk Measure）。',
      variables: {
        'r_t': '時間 t 的報酬率',
        '\\text{VaR}_\\alpha': '信賴水準 alpha 下的風險值',
        '\\text{ES}_\\alpha': '預期短缺（始終 >= VaR）',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f08',
      name: '次可加性公理（Subadditivity Axiom）',
      latex: '\\rho(X + Y) \\leq \\rho(X) + \\rho(Y)',
      description: '分散投資不應增加風險。VaR 可能違反此性質；預期短缺（Expected Shortfall）始終滿足。這是一致性風險衡量指標的四個公理之一。',
      variables: {
        '\\rho': '風險衡量指標',
        'X, Y': '投資組合部位',
      },
      weekIntroduced: 6,
    },
  ],
};
