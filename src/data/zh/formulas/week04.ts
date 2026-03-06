import { WeekFormulas } from '@/types';

export const week04Formulas: WeekFormulas = {
  weekNumber: 4,
  title: '非對稱波動度 — GJR-GARCH',
  formulas: [
    {
      id: 'w04-f01',
      name: 'GJR-GARCH(1,1) 模型',
      latex: '\\sigma_t^2 = \\omega + \\alpha \\, r_{t-1}^2 + \\gamma \\, r_{t-1}^2 \\, \\mathbb{I}(r_{t-1} < 0) + \\beta \\, \\sigma_{t-1}^2',
      description: '透過加入指標函數（Indicator Function）擴展 GARCH，只在前一期報酬為負時啟動 gamma。這使壞消息對波動度產生額外衝擊。',
      variables: {
        '\\omega': '基準變異數（> 0）',
        '\\alpha': '對所有衝擊的反應（>= 0）',
        '\\gamma': '非對稱係數——負向衝擊的額外影響',
        '\\beta': '持續性（>= 0）',
        '\\mathbb{I}(r_{t-1} < 0)': '指標函數：當 r_{t-1} < 0 時等於 1，否則為 0',
      },
      example: '典型股票值：alpha = 0.02-0.05，gamma = 0.10-0.15，beta = 0.85-0.92。',
      weekIntroduced: 4,
    },
    {
      id: 'w04-f02',
      name: '有效衝擊影響（Effective Shock Impact）',
      latex: '\\text{Positive: } \\alpha \\, r_{t-1}^2 \\qquad \\text{Negative: } (\\alpha + \\gamma) \\, r_{t-1}^2',
      description: '對正向衝擊，有效係數為 alpha。對負向衝擊，有效係數為 alpha + gamma。比值 (alpha + gamma)/alpha 即為非對稱比率。',
      variables: {
        '\\alpha': '正向衝擊的係數',
        '\\alpha + \\gamma': '負向衝擊的係數',
      },
      example: '若 alpha = 0.03 且 gamma = 0.12，非對稱比率 = 0.15/0.03 = 5.0 倍。',
      weekIntroduced: 4,
    },
    {
      id: 'w04-f03',
      name: '非對稱比率（Asymmetry Ratio）',
      latex: '\\text{Asymmetry Ratio} = \\frac{\\alpha + \\gamma}{\\alpha}',
      description: '衡量負向衝擊影響是正向衝擊的多少倍。典型股票指數約為 3-5 倍。',
      variables: {
        '\\alpha + \\gamma': '有效負向衝擊係數',
        '\\alpha': '有效正向衝擊係數',
      },
      weekIntroduced: 4,
    },
    {
      id: 'w04-f04',
      name: 'GJR-GARCH 定態性條件',
      latex: '\\alpha + \\frac{\\gamma}{2} + \\beta < 1',
      description: 'gamma/2 項的出現是因為在對稱分配下，指標 I(r_{t-1} < 0) 平均約有一半時間為啟動狀態。',
      variables: {
        '\\gamma/2': '非對稱項的平均貢獻',
        '\\alpha + \\gamma/2 + \\beta': 'GJR-GARCH 的有效持續性',
      },
      weekIntroduced: 4,
    },
    {
      id: 'w04-f05',
      name: 'GJR-GARCH 長期變異數',
      latex: '\\bar{\\sigma}^2 = \\frac{\\omega}{1 - \\alpha - \\gamma/2 - \\beta}',
      description: 'GJR-GARCH 的無條件變異數，納入非對稱項的平均效果。',
      variables: {
        '\\bar{\\sigma}^2': '長期（無條件）變異數',
        '\\omega': 'GJR-GARCH 常數項',
      },
      weekIntroduced: 4,
    },
    {
      id: 'w04-f06',
      name: 'EGARCH(1,1) 模型',
      latex: '\\ln(\\sigma_t^2) = \\omega + \\alpha\\left(|z_{t-1}| - \\mathbb{E}[|z_{t-1}|]\\right) + \\gamma \\, z_{t-1} + \\beta \\, \\ln(\\sigma_{t-1}^2)',
      description: '對對數變異數建模，保證 sigma_t^2 > 0 而無需參數約束。非對稱性透過帶符號的標準化殘差 z_{t-1} 引入。',
      variables: {
        '\\ln(\\sigma_t^2)': '條件變異數的對數',
        'z_{t-1}': '標準化殘差 r_{t-1}/sigma_{t-1}',
        '\\gamma': '非對稱參數（在 EGARCH 中 gamma < 0 表示槓桿效應）',
        '\\mathbb{E}[|z_{t-1}|]': 'z 的期望絕對值（在高斯分配下 = sqrt(2/pi)）',
      },
      weekIntroduced: 4,
    },
    {
      id: 'w04-f07',
      name: '新聞衝擊曲線（News Impact Curve）（GJR）',
      latex: '\\text{NIC}(r_{t-1}) = \\omega + \\alpha \\, r_{t-1}^2 + \\gamma \\, r_{t-1}^2 \\, \\mathbb{I}(r_{t-1}<0) + \\beta \\, \\bar{\\sigma}^2',
      description: '將明天的條件變異數繪製為今天報酬的函數，同時固定 sigma_{t-1}^2 於其無條件水準。GJR-GARCH 的新聞衝擊曲線是一條在 r_{t-1} = 0 處有折點的非對稱拋物線。',
      variables: {
        '\\text{NIC}(r_{t-1})': '條件變異數作為衝擊的函數',
        '\\bar{\\sigma}^2': '作為固定參考的長期變異數',
      },
      weekIntroduced: 4,
    },
    {
      id: 'w04-f08',
      name: '概似比檢定（Likelihood Ratio Test）',
      latex: 'LR = 2\\left[\\mathcal{L}_{\\text{GJR}} - \\mathcal{L}_{\\text{GARCH}}\\right] \\sim \\chi^2(1)',
      description: '檢定非對稱參數 gamma 是否顯著異於零。由於 GARCH 是 GJR-GARCH 的巢狀模型，檢定自由度為 1。在 5% 顯著水準下，若 LR > 3.84 則拒絕 H0: gamma = 0。',
      variables: {
        '\\mathcal{L}_{\\text{GJR}}': 'GJR-GARCH 模型的對數概似值',
        '\\mathcal{L}_{\\text{GARCH}}': '標準 GARCH 模型的對數概似值',
        '\\chi^2(1)': '自由度為 1 的卡方分配',
      },
      example: '5% 臨界值：3.84。1% 臨界值：6.63。',
      weekIntroduced: 4,
    },
  ],
};
