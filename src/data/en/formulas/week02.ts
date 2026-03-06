import { WeekFormulas } from '@/types';

export const week02Formulas: WeekFormulas = {
  weekNumber: 2,
  title: 'Measuring Volatility',
  formulas: [
    {
      id: 'w02-f01',
      name: 'Rolling Window Volatility',
      latex: '\\hat{\\sigma}_{t}^{\\text{roll}} = \\sqrt{\\frac{1}{N-1} \\sum_{i=0}^{N-1} (r_{t-i} - \\bar{r}_{t,N})^2}',
      description: 'Standard deviation of returns within a rolling window of N observations. To annualize, multiply by sqrt(252).',
      variables: {
        '\\hat{\\sigma}_{t}^{\\text{roll}}': 'Rolling window volatility at time t',
        'N': 'Window length (e.g., 20, 60, or 252 days)',
        'r_{t-i}': 'Return i periods ago',
        '\\bar{r}_{t,N}': 'Rolling mean of returns within the window',
      },
      example: 'Common choices: 20 days (short-term), 60 days (medium-term), 252 days (long-term, approximately 1 year).',
      weekIntroduced: 2,
    },
    {
      id: 'w02-f02',
      name: 'EWMA Variance (Recursive)',
      latex: '\\hat{\\sigma}_t^2 = \\lambda \\, \\hat{\\sigma}_{t-1}^2 + (1-\\lambda) \\, r_{t-1}^2',
      description: 'Exponentially Weighted Moving Average variance. Today\'s estimate is a blend of yesterday\'s estimate and yesterday\'s squared return. RiskMetrics standard: lambda = 0.94.',
      variables: {
        '\\hat{\\sigma}_t^2': 'EWMA variance estimate at time t',
        '\\lambda': 'Decay factor (0 < lambda < 1), typically 0.94',
        'r_{t-1}': 'Previous period return',
      },
      example: 'With lambda = 0.94, the effective number of observations is 1/(1-0.94) = 16.7 days.',
      weekIntroduced: 2,
    },
    {
      id: 'w02-f03',
      name: 'EWMA Variance (Expanded)',
      latex: '\\hat{\\sigma}_t^2 = (1-\\lambda) \\sum_{i=1}^{\\infty} \\lambda^{i-1} \\, r_{t-i}^2',
      description: 'The EWMA variance expressed as a weighted sum of all past squared returns, with geometrically declining weights.',
      variables: {
        '\\lambda^{i-1}': 'Weight on the return i periods ago, declining geometrically',
      },
      weekIntroduced: 2,
    },
    {
      id: 'w02-f04',
      name: 'EWMA Weights',
      latex: 'w_i = (1-\\lambda)\\lambda^{i-1}',
      description: 'The weight assigned to the return i periods ago in the EWMA model. Weights sum to 1 and decline geometrically.',
      variables: {
        'w_i': 'Weight on the return i periods ago',
        '\\lambda': 'Decay factor',
      },
      weekIntroduced: 2,
    },
    {
      id: 'w02-f05',
      name: 'Realized Volatility',
      latex: 'RV_t = \\sum_{j=1}^{M} r_{t,j}^2',
      description: 'Sum of squared intraday returns. As sampling frequency increases, RV converges to the true integrated variance of the day.',
      variables: {
        'RV_t': 'Realized volatility on day t',
        'M': 'Number of intraday return intervals (typically 78 for 5-minute returns)',
        'r_{t,j}': 'j-th intraday return on day t',
      },
      example: 'For a 6.5-hour trading day with 5-minute intervals, M = 78.',
      weekIntroduced: 2,
    },
    {
      id: 'w02-f06',
      name: 'VIX Interpretation',
      latex: '\\text{VIX} = V\\% \\Rightarrow \\text{Daily vol} \\approx \\frac{V}{\\sqrt{252}}\\%',
      description: 'The VIX represents expected annualized S&P 500 volatility from option prices. Divide by sqrt(252) to get expected daily volatility.',
      variables: {
        'V': 'VIX value (annualized percentage)',
      },
      example: 'VIX = 20 means approximately 20% annualized volatility, or 20/sqrt(252) = 1.26% daily.',
      weekIntroduced: 2,
    },
    {
      id: 'w02-f07',
      name: 'Annualization',
      latex: '\\sigma_{\\text{annual}} = \\sigma_{\\text{daily}} \\times \\sqrt{252}',
      description: 'Convert daily volatility to annualized volatility by multiplying by the square root of trading days per year.',
      variables: {
        '\\sigma_{\\text{annual}}': 'Annualized volatility',
        '\\sigma_{\\text{daily}}': 'Daily volatility',
        '252': 'Trading days per year',
      },
      weekIntroduced: 2,
    },
  ],
};
