import { WeekFormulas } from '@/types';

export const week01Formulas: WeekFormulas = {
  weekNumber: 1,
  title: 'Financial Risk and Return Distributions',
  formulas: [
    {
      id: 'w01-f01',
      name: 'Simple Return',
      latex: 'R_t = \\frac{P_t - P_{t-1}}{P_{t-1}}',
      description: 'The arithmetic percentage change in price from one period to the next.',
      variables: {
        'R_t': 'Simple return at time t',
        'P_t': 'Closing price at time t',
        'P_{t-1}': 'Closing price at time t-1',
      },
      weekIntroduced: 1,
    },
    {
      id: 'w01-f02',
      name: 'Log Return',
      latex: 'r_t = \\ln\\!\\left(\\frac{P_t}{P_{t-1}}\\right) = \\ln(1 + R_t)',
      description: 'The continuously compounded return. Log returns are time-additive and symmetric around zero, making them the standard in quantitative finance.',
      variables: {
        'r_t': 'Log return at time t',
        'P_t': 'Closing price at time t',
        'P_{t-1}': 'Closing price at time t-1',
        'R_t': 'Simple return at time t',
      },
      example: 'For small returns (under 5%), ln(1+x) is approximately x, so simple and log returns are nearly identical.',
      weekIntroduced: 1,
    },
    {
      id: 'w01-f03',
      name: 'Skewness (Third Moment)',
      latex: 'S = \\frac{1}{T} \\sum_{t=1}^{T} \\left(\\frac{r_t - \\bar{r}}{\\hat{\\sigma}}\\right)^{3}',
      description: 'Measures the asymmetry of the return distribution. Negative skewness indicates more frequent large losses than large gains.',
      variables: {
        'S': 'Skewness',
        'T': 'Number of observations',
        'r_t': 'Return at time t',
        '\\bar{r}': 'Sample mean return',
        '\\hat{\\sigma}': 'Sample standard deviation',
      },
      example: 'S = 0: symmetric (normal). S < 0: left-skewed (more large losses). S > 0: right-skewed.',
      weekIntroduced: 1,
    },
    {
      id: 'w01-f04',
      name: 'Excess Kurtosis (Fourth Moment)',
      latex: 'K = \\frac{1}{T} \\sum_{t=1}^{T} \\left(\\frac{r_t - \\bar{r}}{\\hat{\\sigma}}\\right)^{4} - 3',
      description: 'Measures the heaviness of tails relative to a normal distribution. We subtract 3 because the normal has raw kurtosis of 3.',
      variables: {
        'K': 'Excess kurtosis',
        'T': 'Number of observations',
        'r_t': 'Return at time t',
        '\\bar{r}': 'Sample mean return',
        '\\hat{\\sigma}': 'Sample standard deviation',
      },
      example: 'K = 0: mesokurtic (normal tails). K > 0: leptokurtic (fat tails). Daily stock returns often have K of 5-20+.',
      weekIntroduced: 1,
    },
    {
      id: 'w01-f05',
      name: 'Jarque-Bera Test Statistic',
      latex: 'JB = \\frac{T}{6}\\left(S^2 + \\frac{K^2}{4}\\right) \\sim \\chi^2(2)',
      description: 'Combines skewness and excess kurtosis into a single normality test. Reject normality if JB > 5.99 at the 5% significance level.',
      variables: {
        'JB': 'Jarque-Bera test statistic',
        'T': 'Number of observations',
        'S': 'Skewness',
        'K': 'Excess kurtosis',
        '\\chi^2(2)': 'Chi-squared distribution with 2 degrees of freedom',
      },
      example: 'Financial return series produce JB values in the hundreds or thousands, providing overwhelming evidence against normality.',
      weekIntroduced: 1,
    },
    {
      id: 'w01-f06',
      name: 'Normal Tail Probabilities',
      latex: 'P(Z < -1) = 15.87\\%, \\; P(Z < -2) = 2.28\\%, \\; P(Z < -3) = 0.13\\%, \\; P(Z < -5) = 0.00003\\%',
      description: 'Key one-sided tail probabilities under the standard normal distribution. In reality, financial tail events are far more frequent.',
      variables: {
        'Z': 'Standard normal random variable',
      },
      weekIntroduced: 1,
    },
  ],
};
