import { WeekFormulas } from '@/types';

export const week05Formulas: WeekFormulas = {
  weekNumber: 5,
  title: 'Volatility Forecasting',
  formulas: [
    {
      id: 'w05-f01',
      name: 'Mean Squared Error (MSE)',
      latex: '\\text{MSE} = \\frac{1}{T} \\sum_{t=1}^{T} (\\sigma_t^{2*} - \\hat{\\sigma}_t^2)^2',
      description: 'Average of squared differences between realized volatility proxy and forecast. Heavily penalizes large errors.',
      variables: {
        '\\sigma_t^{2*}': 'Realized volatility proxy (e.g., squared return)',
        '\\hat{\\sigma}_t^2': 'Forecasted conditional variance',
        'T': 'Number of out-of-sample observations',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f02',
      name: 'Root Mean Squared Error (RMSE)',
      latex: '\\text{RMSE} = \\sqrt{\\frac{1}{T} \\sum_{t=1}^{T} (\\sigma_t^{2*} - \\hat{\\sigma}_t^2)^2}',
      description: 'Square root of MSE. Same units as variance, making it easier to interpret.',
      variables: {
        '\\sigma_t^{2*}': 'Realized volatility proxy',
        '\\hat{\\sigma}_t^2': 'Forecasted conditional variance',
        'T': 'Number of out-of-sample observations',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f03',
      name: 'Mean Absolute Error (MAE)',
      latex: '\\text{MAE} = \\frac{1}{T} \\sum_{t=1}^{T} |\\sigma_t^{2*} - \\hat{\\sigma}_t^2|',
      description: 'Average absolute difference between proxy and forecast. More robust to outliers than MSE.',
      variables: {
        '\\sigma_t^{2*}': 'Realized volatility proxy',
        '\\hat{\\sigma}_t^2': 'Forecasted conditional variance',
        'T': 'Number of out-of-sample observations',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f04',
      name: 'QLIKE (Quasi-Likelihood Loss)',
      latex: '\\text{QLIKE} = \\frac{1}{T} \\sum_{t=1}^{T} \\left( \\ln(\\hat{\\sigma}_t^2) + \\frac{\\sigma_t^{2*}}{\\hat{\\sigma}_t^2} \\right)',
      description: 'Penalizes relative forecast errors. Produces consistent model rankings regardless of the volatility proxy used (Patton, 2011).',
      variables: {
        '\\hat{\\sigma}_t^2': 'Forecasted conditional variance',
        '\\sigma_t^{2*}': 'Realized volatility proxy',
        'T': 'Number of out-of-sample observations',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f05',
      name: 'Mincer-Zarnowitz Regression',
      latex: '\\sigma_t^{2*} = a + b \\, \\hat{\\sigma}_t^2 + u_t',
      description: 'Regresses realized proxy on forecast to test forecast efficiency. Perfect forecast implies a=0, b=1.',
      variables: {
        '\\sigma_t^{2*}': 'Realized volatility proxy',
        '\\hat{\\sigma}_t^2': 'Forecasted conditional variance',
        'a': 'Intercept (bias term)',
        'b': 'Slope (responsiveness); b<1 = overreaction, b>1 = underreaction',
        'u_t': 'Error term',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f06',
      name: 'Mincer-Zarnowitz F-test',
      latex: 'H_0: a = 0, \\; b = 1',
      description: 'Joint hypothesis test for forecast efficiency. Rejection means the forecast is biased or inefficient.',
      variables: {
        'a': 'Should be zero for unbiased forecasts',
        'b': 'Should be one for efficient forecasts',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f07',
      name: 'Diebold-Mariano Test Statistic',
      latex: 'DM = \\frac{\\bar{d}}{\\hat{\\sigma}_{\\bar{d}}} \\xrightarrow{d} N(0,1)',
      description: 'Tests whether two models have significantly different predictive accuracy. Uses HAC standard errors to account for serial correlation in loss differentials.',
      variables: {
        '\\bar{d}': 'Mean loss differential between two models',
        '\\hat{\\sigma}_{\\bar{d}}': 'HAC (Newey-West) standard error of the mean differential',
        'd_t': 'Loss differential: L(model 1) - L(model 2)',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f08',
      name: 'Loss Differential',
      latex: 'd_t = L(\\hat{\\sigma}_{1,t}^2) - L(\\hat{\\sigma}_{2,t}^2)',
      description: 'Difference in loss function values between two competing models at time t. Positive means model 1 has higher loss (model 2 is better).',
      variables: {
        'L(\\cdot)': 'Loss function (e.g., squared error or QLIKE)',
        '\\hat{\\sigma}_{1,t}^2': 'Forecast from model 1',
        '\\hat{\\sigma}_{2,t}^2': 'Forecast from model 2',
      },
      weekIntroduced: 5,
    },
  ],
};
