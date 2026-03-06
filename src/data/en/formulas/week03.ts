import { WeekFormulas } from '@/types';

export const week03Formulas: WeekFormulas = {
  weekNumber: 3,
  title: 'Volatility Clustering and GARCH',
  formulas: [
    {
      id: 'w03-f01',
      name: 'Return Decomposition',
      latex: 'r_t = \\sigma_t \\, z_t, \\quad z_t \\sim \\text{i.i.d.}(0,1)',
      description: 'A return equals a time-varying "volume knob" (conditional volatility sigma_t) multiplied by a random "direction" (standardized shock z_t).',
      variables: {
        'r_t': 'Return at time t',
        '\\sigma_t': 'Conditional standard deviation at time t',
        'z_t': 'Standardized shock, drawn independently from a distribution with mean 0 and variance 1',
      },
      weekIntroduced: 3,
    },
    {
      id: 'w03-f02',
      name: 'ARCH(q) Model',
      latex: '\\sigma_t^2 = \\omega + \\sum_{i=1}^{q} \\alpha_i \\, r_{t-i}^2',
      description: 'Autoregressive Conditional Heteroskedasticity model. Today\'s variance depends on past squared returns. Requires omega > 0 and alpha_i >= 0.',
      variables: {
        '\\sigma_t^2': 'Conditional variance at time t',
        '\\omega': 'Constant baseline variance (> 0)',
        '\\alpha_i': 'ARCH coefficient for lag i (>= 0)',
        'q': 'Order -- number of lags of squared returns',
      },
      weekIntroduced: 3,
    },
    {
      id: 'w03-f03',
      name: 'GARCH(1,1) Model',
      latex: '\\sigma_t^2 = \\omega + \\alpha \\, r_{t-1}^2 + \\beta \\, \\sigma_{t-1}^2',
      description: 'Generalized ARCH. Adds yesterday\'s variance as a predictor, dramatically reducing parameters. Three numbers capture volatility dynamics for most financial assets.',
      variables: {
        '\\omega': 'Base level of variance (> 0)',
        '\\alpha': 'Shock coefficient -- reaction to new information (>= 0), typically 0.05-0.15',
        '\\beta': 'Persistence coefficient -- memory of past variance (>= 0), typically 0.80-0.95',
      },
      example: 'Stationarity requires alpha + beta < 1. Typical equity values: alpha + beta = 0.95-0.99.',
      weekIntroduced: 3,
    },
    {
      id: 'w03-f04',
      name: 'Long-Run Variance',
      latex: '\\bar{\\sigma}^2 = \\frac{\\omega}{1 - \\alpha - \\beta}',
      description: 'The unconditional (long-run) variance that GARCH volatility gravitates toward. This is the "home base" that EWMA lacks (since EWMA sets omega = 0).',
      variables: {
        '\\bar{\\sigma}^2': 'Long-run (unconditional) variance',
        '\\omega': 'GARCH constant term',
        '\\alpha + \\beta': 'Persistence, must be < 1 for stationarity',
      },
      weekIntroduced: 3,
    },
    {
      id: 'w03-f05',
      name: 'Volatility Half-Life',
      latex: 'h = \\frac{\\ln(0.5)}{\\ln(\\alpha + \\beta)}',
      description: 'The number of days for a volatility shock to decay by 50%. With typical persistence of 0.95-0.99, half-lives range from 14 to 69 days.',
      variables: {
        'h': 'Half-life in days',
        '\\alpha + \\beta': 'Persistence parameter',
      },
      example: 'If alpha + beta = 0.97, h = ln(0.5)/ln(0.97) = 22.8 days.',
      weekIntroduced: 3,
    },
    {
      id: 'w03-f06',
      name: 'Gaussian Log-Likelihood',
      latex: '\\mathcal{L} = -\\frac{1}{2}\\sum_{t=1}^{T} \\left[\\ln(2\\pi) + \\ln(\\sigma_t^2) + \\frac{r_t^2}{\\sigma_t^2}\\right]',
      description: 'The log-likelihood function for GARCH with normal residuals. MLE finds omega, alpha, beta that maximize this function.',
      variables: {
        '\\mathcal{L}': 'Log-likelihood value',
        'T': 'Number of observations',
        '\\sigma_t^2': 'Conditional variance at time t (computed recursively from GARCH)',
      },
      weekIntroduced: 3,
    },
    {
      id: 'w03-f07',
      name: 'Ljung-Box Test',
      latex: 'Q(m) = T(T+2)\\sum_{k=1}^{m}\\frac{\\hat{\\rho}(k)^2}{T-k} \\sim \\chi^2(m)',
      description: 'Tests for autocorrelation in squared returns (before GARCH) or squared standardized residuals (after GARCH). Small p-value confirms volatility clustering.',
      variables: {
        'Q(m)': 'Ljung-Box test statistic with m lags',
        '\\hat{\\rho}(k)': 'Sample autocorrelation at lag k',
        'T': 'Number of observations',
      },
      weekIntroduced: 3,
    },
    {
      id: 'w03-f08',
      name: 'Standardized Residuals',
      latex: '\\hat{z}_t = \\frac{r_t}{\\hat{\\sigma}_t}',
      description: 'If the GARCH model is correct, standardized residuals should behave like i.i.d. draws with no remaining autocorrelation in their squares.',
      variables: {
        '\\hat{z}_t': 'Standardized residual at time t',
        'r_t': 'Observed return',
        '\\hat{\\sigma}_t': 'Estimated conditional volatility',
      },
      weekIntroduced: 3,
    },
  ],
};
