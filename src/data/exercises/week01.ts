import { WeekExercises } from '@/types';

export const week01Exercises: WeekExercises = {
  weekNumber: 1,
  title: 'Financial Risk and Return Distributions',
  questions: [
    {
      id: 'w01-q01',
      question: 'Why are log returns preferred over simple returns in quantitative finance?',
      options: [
        { label: 'A', text: 'They are always larger than simple returns' },
        { label: 'B', text: 'They are time-additive: multi-period log returns equal the sum of single-period log returns' },
        { label: 'C', text: 'They are always positive' },
        { label: 'D', text: 'They don\'t require price data' },
      ],
      correctAnswer: 'B',
      explanation: 'Log returns satisfy r_{t:t+k} = r_{t+1} + r_{t+2} + ... + r_{t+k}, which makes multi-period analysis straightforward. Simple returns require geometric compounding: (1+R_{t:t+k}) = product of (1+R_i). Additionally, log returns are symmetric around zero.',
    },
    {
      id: 'w01-q02',
      question: 'A financial return series has excess kurtosis of 8.5. This means:',
      options: [
        { label: 'A', text: 'The distribution is perfectly symmetric' },
        { label: 'B', text: 'The distribution has thinner tails than normal' },
        { label: 'C', text: 'The distribution has fatter tails than normal (leptokurtic)' },
        { label: 'D', text: 'The mean return is 8.5 times the standard deviation' },
      ],
      correctAnswer: 'C',
      explanation: 'Excess kurtosis > 0 indicates heavier tails than the normal distribution (leptokurtic). A value of 8.5 is typical for daily equity returns and means extreme events occur much more frequently than normal predicts. Excess kurtosis is the raw fourth moment minus 3, where 3 is the kurtosis of the normal distribution.',
    },
    {
      id: 'w01-q03',
      question: 'Negative skewness in equity returns implies:',
      options: [
        { label: 'A', text: 'Large losses are more frequent than large gains of equal magnitude' },
        { label: 'B', text: 'The distribution is symmetric' },
        { label: 'C', text: 'Large gains are more frequent than large losses' },
        { label: 'D', text: 'The mean return is negative' },
      ],
      correctAnswer: 'A',
      explanation: 'Negative skewness means the left tail is longer/heavier. In financial terms, large downside moves are more common than equivalently large upside moves. Note: this does not mean the average return is negative -- skewness measures asymmetry, not the level of returns.',
    },
    {
      id: 'w01-q04',
      question: 'The Jarque-Bera test evaluates normality by examining:',
      options: [
        { label: 'A', text: 'Only the mean and variance' },
        { label: 'B', text: 'Only the skewness' },
        { label: 'C', text: 'Only the kurtosis' },
        { label: 'D', text: 'Both skewness and excess kurtosis jointly' },
      ],
      correctAnswer: 'D',
      explanation: 'The JB statistic is JB = (T/6)(S^2 + K^2/4), which combines skewness S and excess kurtosis K into a single test. Under H0: normality, JB follows a chi-squared distribution with 2 degrees of freedom. The critical value at 5% is 5.99.',
    },
    {
      id: 'w01-q05',
      question: 'In a QQ plot of daily stock returns against the normal distribution, an S-shaped pattern indicates:',
      options: [
        { label: 'A', text: 'The returns are perfectly normal' },
        { label: 'B', text: 'The returns have fatter tails than the normal distribution' },
        { label: 'C', text: 'The returns have thinner tails than the normal distribution' },
        { label: 'D', text: 'The sample size is too small' },
      ],
      correctAnswer: 'B',
      explanation: 'The S-shape means points deviate from the 45-degree line at both extremes: the left tail is heavier (points above the line) and the right tail is heavier (points below the line). This is the classic fat-tail signature seen in virtually all financial return series.',
    },
    {
      id: 'w01-q06',
      question: 'Compared to the normal distribution, the Student-t distribution with nu = 5 degrees of freedom:',
      options: [
        { label: 'A', text: 'Has thinner tails' },
        { label: 'B', text: 'Has exactly the same tails' },
        { label: 'C', text: 'Has heavier tails, providing a better fit for financial returns' },
        { label: 'D', text: 'Cannot be used for financial modeling' },
      ],
      correctAnswer: 'C',
      explanation: 'The Student-t distribution has heavier tails than normal, controlled by the degrees-of-freedom parameter nu. As nu approaches infinity, it converges to the normal. For equity returns, nu of approximately 4-8 typically provides a much better fit. The t distribution will be used as the error distribution in GARCH models starting in Week 3.',
    },
    {
      id: 'w01-q07',
      question: 'A risk model based on the normal distribution underestimates the probability of a 5-sigma daily loss by approximately:',
      options: [
        { label: 'A', text: 'A factor of 4,000 (empirical approximately 0.12% vs. theoretical approximately 0.00003%)' },
        { label: 'B', text: 'A factor of 2' },
        { label: 'C', text: 'A factor of 10' },
        { label: 'D', text: 'It does not underestimate; the normal model is accurate' },
      ],
      correctAnswer: 'A',
      explanation: '5-sigma losses occur roughly every 3 years empirically (approximately 0.12%), while the normal model predicts once every 13,900 years (approximately 0.00003%). The ratio is approximately 0.12/0.00003 = 4,000.',
    },
    {
      id: 'w01-q08',
      question: 'Which of the following best explains why mixing periods of low and high volatility produces fat tails?',
      options: [
        { label: 'A', text: 'Low volatility periods have negative returns' },
        { label: 'B', text: 'Mixing normal distributions with different variances creates a mixture distribution that has heavier tails than any single normal component' },
        { label: 'C', text: 'High volatility periods always follow crashes' },
        { label: 'D', text: 'Fat tails only occur in emerging markets' },
      ],
      correctAnswer: 'B',
      explanation: 'When returns come from a mixture of normals (some with small sigma, some with large sigma), the unconditional distribution has excess kurtosis even though each conditional distribution is normal. This volatility clustering effect is the key insight behind GARCH models (Week 3).',
    },
  ],
};
