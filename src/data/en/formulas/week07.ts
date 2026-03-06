import { WeekFormulas } from '@/types';

export const week07Formulas: WeekFormulas = {
  weekNumber: 7,
  title: 'VaR Backtesting and Risk Management',
  formulas: [
    {
      id: 'w07-f01',
      name: 'Hit Sequence (Breach Indicator)',
      latex: 'I_t = \\begin{cases} 1 & \\text{if } r_t < -\\text{VaR}_t \\\\ 0 & \\text{otherwise} \\end{cases}',
      description: 'Binary indicator that equals 1 when the actual return exceeds VaR (a breach) and 0 otherwise. The sequence of I_t values is analyzed for correct coverage and independence.',
      variables: {
        'I_t': 'Hit indicator at time t (1 = breach, 0 = no breach)',
        'r_t': 'Actual return at time t',
        '\\text{VaR}_t': 'Value-at-Risk forecast for time t',
      },
      weekIntroduced: 7,
    },
    {
      id: 'w07-f02',
      name: 'Kupiec POF Test (Unconditional Coverage)',
      latex: 'LR_{uc} = -2 \\ln \\frac{p^x (1-p)^{T-x}}{\\hat{p}^x (1-\\hat{p})^{T-x}} \\sim \\chi^2(1)',
      description: 'Likelihood ratio test comparing the expected breach rate p with the observed rate p-hat. Tests whether the overall proportion of breaches is consistent with the VaR confidence level.',
      variables: {
        'p': 'Expected breach rate (1 - alpha, e.g., 0.01 for 99% VaR)',
        '\\hat{p}': 'Observed breach rate: x / T',
        'x': 'Number of observed breaches',
        'T': 'Total number of out-of-sample days',
      },
      weekIntroduced: 7,
    },
    {
      id: 'w07-f03',
      name: 'Christoffersen Independence Test',
      latex: 'LR_{ind} = -2 \\ln \\frac{\\hat{\\pi}^{n_{01}+n_{11}}(1-\\hat{\\pi})^{n_{00}+n_{10}}}{\\hat{\\pi}_{01}^{n_{01}}(1-\\hat{\\pi}_{01})^{n_{00}} \\hat{\\pi}_{11}^{n_{11}}(1-\\hat{\\pi}_{11})^{n_{10}}} \\sim \\chi^2(1)',
      description: 'Tests whether VaR breaches are independent (not clustered). Compares the restricted model (equal transition probabilities) with the unrestricted Markov model.',
      variables: {
        'n_{ij}': 'Count of transitions from state i to state j',
        '\\hat{\\pi}': 'Unconditional breach probability',
        '\\hat{\\pi}_{01}': 'P(breach today | no breach yesterday)',
        '\\hat{\\pi}_{11}': 'P(breach today | breach yesterday)',
      },
      weekIntroduced: 7,
    },
    {
      id: 'w07-f04',
      name: 'Conditional Coverage Test',
      latex: 'LR_{cc} = LR_{uc} + LR_{ind} \\sim \\chi^2(2)',
      description: 'Joint test of unconditional coverage (correct breach rate) and independence (no clustering). Combines Kupiec and independence components.',
      variables: {
        'LR_{uc}': 'Unconditional coverage statistic (Kupiec)',
        'LR_{ind}': 'Independence statistic',
        'LR_{cc}': 'Conditional coverage statistic; reject if > 5.991',
      },
      weekIntroduced: 7,
    },
    {
      id: 'w07-f05',
      name: 'Transition Probability',
      latex: '\\hat{\\pi}_{ij} = \\frac{n_{ij}}{n_{i0} + n_{i1}}',
      description: 'Estimated probability of transitioning from state i to state j. Under independence, pi_01 should equal pi_11.',
      variables: {
        'n_{ij}': 'Number of transitions from state i to state j',
        '\\hat{\\pi}_{ij}': 'Estimated transition probability',
      },
      weekIntroduced: 7,
    },
    {
      id: 'w07-f06',
      name: 'Basel Traffic Light Zones',
      latex: '\\text{Zone} = \\begin{cases} \\text{Green} & x \\leq 4 \\quad (k = 3.0) \\\\ \\text{Yellow} & 5 \\leq x \\leq 9 \\quad (k = 3.4\\text{--}3.85) \\\\ \\text{Red} & x \\geq 10 \\quad (k = 4.0) \\end{cases}',
      description: 'Basel Committee classification based on VaR breaches over 250 trading days. Capital multiplier k increases with breach count, penalizing inaccurate models.',
      variables: {
        'x': 'Number of breaches in 250 trading days',
        'k': 'Capital multiplier applied to VaR for regulatory capital',
      },
      weekIntroduced: 7,
    },
    {
      id: 'w07-f07',
      name: 'Stress Test Exceedance Ratio',
      latex: '\\text{Exceedance Ratio} = \\frac{\\text{Scenario Loss}}{\\text{VaR (or ES)}}',
      description: 'Measures how many times the VaR (or ES) a given stress scenario exceeds. Ratio > 1 means the scenario loss exceeds the risk measure.',
      variables: {
        'Scenario Loss': 'Portfolio loss under the stress scenario',
        'VaR': 'Current Value-at-Risk estimate',
        'ES': 'Current Expected Shortfall estimate',
      },
      weekIntroduced: 7,
    },
  ],
};
