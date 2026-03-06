import { WeekFormulas } from '@/types';

export const week04Formulas: WeekFormulas = {
  weekNumber: 4,
  title: 'Asymmetric Volatility — GJR-GARCH',
  formulas: [
    {
      id: 'w04-f01',
      name: 'GJR-GARCH(1,1) Model',
      latex: '\\sigma_t^2 = \\omega + \\alpha \\, r_{t-1}^2 + \\gamma \\, r_{t-1}^2 \\, \\mathbb{I}(r_{t-1} < 0) + \\beta \\, \\sigma_{t-1}^2',
      description: 'Extends GARCH by adding an indicator function that activates gamma only when the previous return is negative. This gives bad news an extra kick on volatility.',
      variables: {
        '\\omega': 'Base variance (> 0)',
        '\\alpha': 'Response to all shocks (>= 0)',
        '\\gamma': 'Asymmetry coefficient -- additional impact of negative shocks',
        '\\beta': 'Persistence (>= 0)',
        '\\mathbb{I}(r_{t-1} < 0)': 'Indicator function: equals 1 when r_{t-1} < 0, and 0 otherwise',
      },
      example: 'Typical equity values: alpha = 0.02-0.05, gamma = 0.10-0.15, beta = 0.85-0.92.',
      weekIntroduced: 4,
    },
    {
      id: 'w04-f02',
      name: 'Effective Shock Impact',
      latex: '\\text{Positive: } \\alpha \\, r_{t-1}^2 \\qquad \\text{Negative: } (\\alpha + \\gamma) \\, r_{t-1}^2',
      description: 'For positive shocks, the effective coefficient is alpha. For negative shocks, it is alpha + gamma. The ratio (alpha + gamma)/alpha is the asymmetry ratio.',
      variables: {
        '\\alpha': 'Coefficient for positive shocks',
        '\\alpha + \\gamma': 'Coefficient for negative shocks',
      },
      example: 'If alpha = 0.03 and gamma = 0.12, the asymmetry ratio = 0.15/0.03 = 5.0x.',
      weekIntroduced: 4,
    },
    {
      id: 'w04-f03',
      name: 'Asymmetry Ratio',
      latex: '\\text{Asymmetry Ratio} = \\frac{\\alpha + \\gamma}{\\alpha}',
      description: 'Measures how many times larger the impact of negative shocks is compared to positive shocks. Typical equity indices: 3-5x.',
      variables: {
        '\\alpha + \\gamma': 'Effective negative shock coefficient',
        '\\alpha': 'Effective positive shock coefficient',
      },
      weekIntroduced: 4,
    },
    {
      id: 'w04-f04',
      name: 'GJR-GARCH Stationarity Condition',
      latex: '\\alpha + \\frac{\\gamma}{2} + \\beta < 1',
      description: 'The gamma/2 term arises because, under a symmetric distribution, the indicator I(r_{t-1} < 0) is active approximately half the time on average.',
      variables: {
        '\\gamma/2': 'Average contribution of the asymmetry term',
        '\\alpha + \\gamma/2 + \\beta': 'Effective persistence for GJR-GARCH',
      },
      weekIntroduced: 4,
    },
    {
      id: 'w04-f05',
      name: 'GJR-GARCH Long-Run Variance',
      latex: '\\bar{\\sigma}^2 = \\frac{\\omega}{1 - \\alpha - \\gamma/2 - \\beta}',
      description: 'The unconditional variance for GJR-GARCH, incorporating the average effect of the asymmetry term.',
      variables: {
        '\\bar{\\sigma}^2': 'Long-run (unconditional) variance',
        '\\omega': 'GJR-GARCH constant term',
      },
      weekIntroduced: 4,
    },
    {
      id: 'w04-f06',
      name: 'EGARCH(1,1) Model',
      latex: '\\ln(\\sigma_t^2) = \\omega + \\alpha\\left(|z_{t-1}| - \\mathbb{E}[|z_{t-1}|]\\right) + \\gamma \\, z_{t-1} + \\beta \\, \\ln(\\sigma_{t-1}^2)',
      description: 'Models the log-variance, guaranteeing sigma_t^2 > 0 without parameter constraints. Asymmetry enters through the signed standardized residual z_{t-1}.',
      variables: {
        '\\ln(\\sigma_t^2)': 'Log of conditional variance',
        'z_{t-1}': 'Standardized residual r_{t-1}/sigma_{t-1}',
        '\\gamma': 'Asymmetry parameter (gamma < 0 indicates leverage in EGARCH)',
        '\\mathbb{E}[|z_{t-1}|]': 'Expected absolute value of z (= sqrt(2/pi) under Gaussian)',
      },
      weekIntroduced: 4,
    },
    {
      id: 'w04-f07',
      name: 'News Impact Curve (GJR)',
      latex: '\\text{NIC}(r_{t-1}) = \\omega + \\alpha \\, r_{t-1}^2 + \\gamma \\, r_{t-1}^2 \\, \\mathbb{I}(r_{t-1}<0) + \\beta \\, \\bar{\\sigma}^2',
      description: 'Plots tomorrow\'s conditional variance as a function of today\'s return, holding sigma_{t-1}^2 at its unconditional level. GJR-GARCH NIC is an asymmetric parabola with a kink at r_{t-1} = 0.',
      variables: {
        '\\text{NIC}(r_{t-1})': 'Conditional variance as a function of shock',
        '\\bar{\\sigma}^2': 'Long-run variance used as the fixed reference',
      },
      weekIntroduced: 4,
    },
    {
      id: 'w04-f08',
      name: 'Likelihood Ratio Test',
      latex: 'LR = 2\\left[\\mathcal{L}_{\\text{GJR}} - \\mathcal{L}_{\\text{GARCH}}\\right] \\sim \\chi^2(1)',
      description: 'Tests whether the asymmetry parameter gamma is significantly different from zero. Since GARCH is nested in GJR-GARCH, the test has 1 degree of freedom. Reject H0: gamma = 0 if LR > 3.84 at 5% significance.',
      variables: {
        '\\mathcal{L}_{\\text{GJR}}': 'Log-likelihood of the GJR-GARCH model',
        '\\mathcal{L}_{\\text{GARCH}}': 'Log-likelihood of the standard GARCH model',
        '\\chi^2(1)': 'Chi-squared distribution with 1 degree of freedom',
      },
      example: 'Critical value at 5%: 3.84. At 1%: 6.63.',
      weekIntroduced: 4,
    },
  ],
};
