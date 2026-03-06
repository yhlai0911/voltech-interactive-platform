import { WeekExercises } from '@/types';

export const week07Exercises: WeekExercises = {
  weekNumber: 7,
  title: 'VaR Backtesting and Risk Management',
  questions: [
    {
      id: 'w07-q01',
      question: 'In the Kupiec (POF) test for a 99% VaR model, the null hypothesis states that:',
      options: [
        { label: 'A', text: 'The VaR model always overestimates risk' },
        { label: 'B', text: 'The observed breach rate equals the expected rate p = 1 - alpha = 0.01' },
        { label: 'C', text: 'The VaR model produces zero breaches' },
        { label: 'D', text: 'The breach rate is greater than 5%' },
      ],
      correctAnswer: 'B',
      explanation: 'The Kupiec test\'s null hypothesis is H0: p-hat = p, where p = 1 - alpha. For a 99% VaR model, p = 0.01. The test checks whether the observed proportion of breaches is statistically consistent with a 1% expected rate using a likelihood ratio statistic LR_uc ~ chi-squared(1).',
    },
    {
      id: 'w07-q02',
      question: 'The Christoffersen conditional coverage test extends the Kupiec test by additionally examining:',
      options: [
        { label: 'A', text: 'Whether the VaR level is set too conservatively' },
        { label: 'B', text: 'Whether the model uses a normal or t-distribution' },
        { label: 'C', text: 'Whether VaR breaches are independent of each other (no clustering)' },
        { label: 'D', text: 'Whether the portfolio has positive skewness' },
      ],
      correctAnswer: 'C',
      explanation: 'The Christoffersen test combines unconditional coverage (Kupiec) with an independence test. It uses transition probabilities pi_ij = P(I_t = j | I_{t-1} = i) to detect clustering. The joint conditional coverage statistic is LR_cc = LR_uc + LR_ind ~ chi-squared(2).',
    },
    {
      id: 'w07-q03',
      question: 'Under the Basel traffic light system, a 99% VaR model with 3 breaches in 250 trading days is classified as:',
      options: [
        { label: 'A', text: 'Green zone (acceptable), capital multiplier 3.0x' },
        { label: 'B', text: 'Yellow zone (questionable), capital multiplier 3.5x' },
        { label: 'C', text: 'Red zone (rejected), capital multiplier 4.0x' },
        { label: 'D', text: 'Cannot be determined without the Kupiec test result' },
      ],
      correctAnswer: 'A',
      explanation: 'The Basel traffic light system classifies models by the number of breaches over 250 days: green (0-4), yellow (5-9), red (>=10). With 3 breaches, the model is in the green zone and retains the minimum capital multiplier of 3.0x.',
    },
    {
      id: 'w07-q04',
      question: 'Which statement best distinguishes stress testing from backtesting?',
      options: [
        { label: 'A', text: 'Stress testing uses historical data; backtesting uses hypothetical scenarios' },
        { label: 'B', text: 'Backtesting requires the Christoffersen test; stress testing does not' },
        { label: 'C', text: 'Both methods test the same thing using different statistical tests' },
        { label: 'D', text: 'Stress testing evaluates extreme/hypothetical scenarios; backtesting validates model accuracy under normal conditions' },
      ],
      correctAnswer: 'D',
      explanation: 'Backtesting compares VaR predictions against realized losses to check model calibration under typical market conditions. Stress testing evaluates how the portfolio performs under extreme scenarios (historical crises or hypothetical shocks). Both are required for a complete regulatory risk assessment.',
    },
    {
      id: 'w07-q05',
      question: 'In the Christoffersen framework, "independence" of VaR breaches means:',
      options: [
        { label: 'A', text: 'Breaches in different asset classes are uncorrelated' },
        { label: 'B', text: 'The probability of a breach today is the same regardless of whether a breach occurred yesterday (pi_11 = pi_01)' },
        { label: 'C', text: 'The number of breaches is always exactly equal to the expected count' },
        { label: 'D', text: 'Breaches only occur during market crises' },
      ],
      correctAnswer: 'B',
      explanation: 'Independence means the transition probabilities satisfy pi_01 = pi_11, i.e., the probability of a breach today does not depend on whether yesterday was also a breach. If pi_11 > pi_01, breaches are clustered, indicating the model adapts too slowly to changing market conditions (e.g., rising volatility during crises).',
    },
    {
      id: 'w07-q06',
      question: 'The Kupiec test statistic follows a chi-squared(1) distribution, while the Christoffersen conditional coverage test statistic follows a:',
      options: [
        { label: 'A', text: 'chi-squared(1) distribution' },
        { label: 'B', text: 'Normal distribution' },
        { label: 'C', text: 'chi-squared(2) distribution' },
        { label: 'D', text: 'Student-t distribution with nu = T - 1 degrees of freedom' },
      ],
      correctAnswer: 'C',
      explanation: 'The conditional coverage test combines two components: LR_cc = LR_uc + LR_ind. The unconditional coverage component has 1 degree of freedom and the independence component also has 1 degree of freedom. The sum therefore follows chi-squared(2) under the null. Reject if LR_cc > 5.991.',
    },
    {
      id: 'w07-q07',
      question: 'A VaR model produces 7 breaches in the most recent 250 trading days. Under the Basel traffic light system, what is the consequence?',
      options: [
        { label: 'A', text: 'Yellow zone: the capital multiplier increases to 3.65x, and the model faces regulatory scrutiny' },
        { label: 'B', text: 'Green zone: no action required' },
        { label: 'C', text: 'Red zone: the model must be replaced immediately' },
        { label: 'D', text: 'The model automatically passes all regulatory requirements' },
      ],
      correctAnswer: 'A',
      explanation: 'Seven breaches fall in the yellow zone (5-9 breaches). The Basel multiplier for 7 breaches is 3.65x (compared to the green zone minimum of 3.0x). This means the institution must hold approximately 22% more capital against market risk. The model faces increased regulatory scrutiny but is not automatically rejected.',
    },
    {
      id: 'w07-q08',
      question: 'Which of the following correctly describes the two main types of stress tests?',
      options: [
        { label: 'A', text: 'Statistical stress tests and parametric stress tests' },
        { label: 'B', text: 'Historical stress tests (replaying actual crises) and hypothetical stress tests (designing plausible but unprecedented scenarios)' },
        { label: 'C', text: 'Forward-looking stress tests and backward-looking stress tests' },
        { label: 'D', text: 'Only the central bank can design stress test scenarios' },
      ],
      correctAnswer: 'B',
      explanation: 'Historical stress tests replay known crisis events (e.g., GFC 2008, COVID-19 2020) through the current portfolio to estimate losses. Hypothetical stress tests design plausible scenarios that have not yet occurred (e.g., a simultaneous crash in all Asian markets). Both approaches provide complementary information about portfolio vulnerability.',
    },
  ],
};
