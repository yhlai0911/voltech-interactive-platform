import { WeekFormulas } from '@/types';

export const week06Formulas: WeekFormulas = {
  weekNumber: 6,
  title: 'Value-at-Risk',
  formulas: [
    {
      id: 'w06-f01',
      name: 'VaR Definition',
      latex: 'P(L_t > \\text{VaR}_\\alpha) = 1 - \\alpha',
      description: 'Value-at-Risk at confidence level alpha is the loss threshold exceeded with probability 1 - alpha. For 99% VaR, there is a 1% chance of exceeding VaR.',
      variables: {
        'L_t': 'Portfolio loss at time t',
        '\\text{VaR}_\\alpha': 'Value-at-Risk at confidence level alpha',
        '\\alpha': 'Confidence level (e.g., 0.99 for 99%)',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f02',
      name: 'VaR in Portfolio Terms',
      latex: '\\text{VaR}_\\alpha = -V \\cdot q_{1-\\alpha}(r_t)',
      description: 'VaR expressed as a dollar amount: portfolio value times the return quantile. The negative sign converts the quantile (negative) to a positive loss.',
      variables: {
        'V': 'Portfolio value',
        'q_{1-\\alpha}(r_t)': '(1-alpha) quantile of the return distribution',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f03',
      name: 'Historical Simulation VaR',
      latex: '\\text{VaR}_{\\alpha}^{HS} = -r_{(\\lfloor(1-\\alpha) \\times W\\rfloor)}',
      description: 'Sort W historical returns from worst to best. VaR is the (1-alpha)*W-th worst return. No distributional assumptions required.',
      variables: {
        'W': 'Number of historical observations in the window (e.g., 500)',
        'r_{(k)}': 'k-th order statistic (k-th worst return)',
        '\\alpha': 'Confidence level',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f04',
      name: 'Parametric VaR (Normal)',
      latex: '\\text{VaR}_\\alpha = -(\\mu_t + z_{1-\\alpha} \\cdot \\sigma_t)',
      description: 'VaR under normal distribution assumption using GARCH conditional volatility. The z-quantile determines the confidence level.',
      variables: {
        '\\mu_t': 'Conditional mean return',
        'z_{1-\\alpha}': 'Standard normal quantile (z_{0.01} = -2.326 for 99%)',
        '\\sigma_t': 'Conditional standard deviation from GARCH model',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f05',
      name: 'Parametric VaR (Student-t)',
      latex: '\\text{VaR}_\\alpha = -(\\mu_t + t_{1-\\alpha,\\nu} \\cdot s_t)',
      description: 'VaR under Student-t distribution using GARCH volatility with rescaled standard deviation. Produces larger (more conservative) VaR than normal.',
      variables: {
        '\\mu_t': 'Conditional mean return',
        't_{1-\\alpha,\\nu}': 'Student-t quantile with nu degrees of freedom',
        's_t': 'Rescaled standard deviation: s_t = sigma_t * sqrt((nu-2)/nu)',
        '\\nu': 'Degrees of freedom from GARCH-t estimation',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f06',
      name: 'Student-t Scale Factor',
      latex: 's_t = \\sigma_t \\sqrt{\\frac{\\nu - 2}{\\nu}}',
      description: 'Rescales GARCH conditional volatility to unit variance for the Student-t distribution. Required because the t-distribution with nu df has variance nu/(nu-2).',
      variables: {
        '\\sigma_t': 'Conditional standard deviation from GARCH',
        '\\nu': 'Degrees of freedom',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f07',
      name: 'Expected Shortfall (CVaR)',
      latex: '\\text{ES}_\\alpha = -E[r_t \\mid r_t < -\\text{VaR}_\\alpha]',
      description: 'Average loss given that VaR is breached. Always larger than VaR. A coherent risk measure that satisfies subadditivity.',
      variables: {
        'r_t': 'Return at time t',
        '\\text{VaR}_\\alpha': 'Value-at-Risk at confidence level alpha',
        '\\text{ES}_\\alpha': 'Expected Shortfall (always >= VaR)',
      },
      weekIntroduced: 6,
    },
    {
      id: 'w06-f08',
      name: 'Subadditivity Axiom',
      latex: '\\rho(X + Y) \\leq \\rho(X) + \\rho(Y)',
      description: 'Diversification should not increase risk. VaR can violate this property; Expected Shortfall always satisfies it. One of four axioms of coherent risk measures.',
      variables: {
        '\\rho': 'Risk measure',
        'X, Y': 'Portfolio positions',
      },
      weekIntroduced: 6,
    },
  ],
};
