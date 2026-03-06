import { WeekFormulas } from '@/types';

export const week07Formulas: WeekFormulas = {
  weekNumber: 7,
  title: 'VaR 回測與風險管理',
  formulas: [
    {
      id: 'w07-f01',
      name: '命中序列（Hit Sequence，突破指標）',
      latex: 'I_t = \\begin{cases} 1 & \\text{if } r_t < -\\text{VaR}_t \\\\ 0 & \\text{otherwise} \\end{cases}',
      description: '二元指標，當實際報酬超過 VaR（發生突破）時等於 1，否則為 0。透過分析 I_t 序列來檢驗覆蓋率是否正確以及突破是否獨立。',
      variables: {
        'I_t': '時間 t 的命中指標（1 = 突破，0 = 未突破）',
        'r_t': '時間 t 的實際報酬',
        '\\text{VaR}_t': '時間 t 的風險值預測',
      },
      weekIntroduced: 7,
    },
    {
      id: 'w07-f02',
      name: 'Kupiec POF 檢定（無條件覆蓋率）',
      latex: 'LR_{uc} = -2 \\ln \\frac{p^x (1-p)^{T-x}}{\\hat{p}^x (1-\\hat{p})^{T-x}} \\sim \\chi^2(1)',
      description: '概似比檢定（Likelihood Ratio Test），比較預期突破率 p 與觀測突破率 p-hat。檢定突破的整體比例是否與 VaR 信賴水準一致。',
      variables: {
        'p': '預期突破率（1 - alpha，例如 99% VaR 時為 0.01）',
        '\\hat{p}': '觀測突破率：x / T',
        'x': '觀測到的突破次數',
        'T': '樣本外天數總計',
      },
      weekIntroduced: 7,
    },
    {
      id: 'w07-f03',
      name: 'Christoffersen 獨立性檢定',
      latex: 'LR_{ind} = -2 \\ln \\frac{\\hat{\\pi}^{n_{01}+n_{11}}(1-\\hat{\\pi})^{n_{00}+n_{10}}}{\\hat{\\pi}_{01}^{n_{01}}(1-\\hat{\\pi}_{01})^{n_{00}} \\hat{\\pi}_{11}^{n_{11}}(1-\\hat{\\pi}_{11})^{n_{10}}} \\sim \\chi^2(1)',
      description: '檢定 VaR 突破是否獨立（非叢聚）。比較受限模型（等轉移機率）與無限制馬可夫模型（Markov Model）。',
      variables: {
        'n_{ij}': '從狀態 i 轉移到狀態 j 的次數',
        '\\hat{\\pi}': '無條件突破機率',
        '\\hat{\\pi}_{01}': 'P(今天突破 | 昨天未突破)',
        '\\hat{\\pi}_{11}': 'P(今天突破 | 昨天突破)',
      },
      weekIntroduced: 7,
    },
    {
      id: 'w07-f04',
      name: '條件覆蓋率檢定（Conditional Coverage Test）',
      latex: 'LR_{cc} = LR_{uc} + LR_{ind} \\sim \\chi^2(2)',
      description: '無條件覆蓋率（正確突破率）與獨立性（無叢聚）的聯合檢定。結合 Kupiec 檢定與獨立性檢定的成分。',
      variables: {
        'LR_{uc}': '無條件覆蓋率統計量（Kupiec）',
        'LR_{ind}': '獨立性統計量',
        'LR_{cc}': '條件覆蓋率統計量；若 > 5.991 則拒絕',
      },
      weekIntroduced: 7,
    },
    {
      id: 'w07-f05',
      name: '轉移機率（Transition Probability）',
      latex: '\\hat{\\pi}_{ij} = \\frac{n_{ij}}{n_{i0} + n_{i1}}',
      description: '估計從狀態 i 轉移到狀態 j 的機率。在獨立性假設下，pi_01 應等於 pi_11。',
      variables: {
        'n_{ij}': '從狀態 i 轉移到狀態 j 的次數',
        '\\hat{\\pi}_{ij}': '估計的轉移機率',
      },
      weekIntroduced: 7,
    },
    {
      id: 'w07-f06',
      name: 'Basel 紅綠燈分區',
      latex: '\\text{Zone} = \\begin{cases} \\text{Green} & x \\leq 4 \\quad (k = 3.0) \\\\ \\text{Yellow} & 5 \\leq x \\leq 9 \\quad (k = 3.4\\text{--}3.85) \\\\ \\text{Red} & x \\geq 10 \\quad (k = 4.0) \\end{cases}',
      description: 'Basel 委員會根據 250 個交易日內的 VaR 突破次數進行分類。資本乘數 k 隨突破次數增加而提高，懲罰不準確的模型。',
      variables: {
        'x': '250 個交易日內的突破次數',
        'k': '用於法定資本的 VaR 資本乘數',
      },
      weekIntroduced: 7,
    },
    {
      id: 'w07-f07',
      name: '壓力測試超越比率（Stress Test Exceedance Ratio）',
      latex: '\\text{Exceedance Ratio} = \\frac{\\text{Scenario Loss}}{\\text{VaR (or ES)}}',
      description: '衡量壓力情境損失為 VaR（或 ES）的多少倍。比率 > 1 表示情境損失超過風險衡量值。',
      variables: {
        'Scenario Loss': '壓力情境下的投資組合損失',
        'VaR': '當前的風險值估計',
        'ES': '當前的預期短缺（Expected Shortfall）估計',
      },
      weekIntroduced: 7,
    },
  ],
};
