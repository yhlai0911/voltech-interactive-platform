import { WeekExercises } from '@/types';

export const week02Exercises: WeekExercises = {
  weekNumber: 2,
  title: 'Measuring Volatility',
  questions: [
    {
      id: 'w02-q01',
      question: 'A key limitation of the rolling window volatility estimator is that it:',
      options: [
        { label: 'A', text: 'Requires intraday data' },
        { label: 'B', text: 'Cannot be annualized' },
        { label: 'C', text: 'Assigns equal weight to all observations within the window, making it slow to react to regime changes' },
        { label: 'D', text: 'Always overestimates volatility' },
      ],
      correctAnswer: 'C',
      explanation: 'The rolling window treats every observation inside the window equally. A return from 250 days ago counts the same as yesterday\'s return. When markets shift abruptly (e.g., COVID-19 in March 2020), the long rolling window is diluted by months of calm data and responds slowly.',
    },
    {
      id: 'w02-q02',
      question: 'In the EWMA model with lambda = 0.94, the effective number of observations (mean lag) is approximately:',
      options: [
        { label: 'A', text: '94 days' },
        { label: 'B', text: '17 days' },
        { label: 'C', text: '252 days' },
        { label: 'D', text: '6 days' },
      ],
      correctAnswer: 'B',
      explanation: 'The effective number of observations is 1/(1-lambda) = 1/(1-0.94) = 1/0.06 = 16.7 days. This means the EWMA with lambda = 0.94 behaves roughly like a 17-day weighted average, but with exponentially declining weights rather than a hard cut-off.',
    },
    {
      id: 'w02-q03',
      question: 'Compared to rolling window volatility, the EWMA model avoids "ghosting artifacts" because:',
      options: [
        { label: 'A', text: 'Old observations fade smoothly rather than dropping out abruptly after N days' },
        { label: 'B', text: 'It uses intraday data' },
        { label: 'C', text: 'It includes a mean-reversion term' },
        { label: 'D', text: 'It requires a longer data history' },
      ],
      correctAnswer: 'A',
      explanation: 'With a rolling window, an extreme observation contributes to the estimate for exactly N days and then vanishes, causing a sudden artificial drop in the volatility estimate. EWMA avoids this because every observation\'s weight decays geometrically -- the crash fades gradually, never abruptly disappearing.',
    },
    {
      id: 'w02-q04',
      question: 'Realized volatility (RV_t) differs from rolling window and EWMA estimates primarily because it:',
      options: [
        { label: 'A', text: 'Uses monthly data instead of daily' },
        { label: 'B', text: 'Requires options prices' },
        { label: 'C', text: 'Is a forward-looking measure' },
        { label: 'D', text: 'Uses intraday returns to measure within-day price variation' },
      ],
      correctAnswer: 'D',
      explanation: 'Realized volatility is computed as the sum of squared intraday returns: RV_t = sum of r_{t,j}^2. It exploits within-day price movements (typically 5-minute returns, M = 78 for a 6.5-hour trading day) to produce a more accurate daily volatility estimate than close-to-close methods.',
    },
    {
      id: 'w02-q05',
      question: 'The CBOE Volatility Index (VIX) is best described as:',
      options: [
        { label: 'A', text: 'A backward-looking measure based on historical standard deviation' },
        { label: 'B', text: 'A measure of trading volume in the S&P 500' },
        { label: 'C', text: 'A forward-looking measure of expected 30-day S&P 500 volatility, derived from option prices' },
        { label: 'D', text: 'An average of rolling window estimates across major indices' },
      ],
      correctAnswer: 'C',
      explanation: 'The VIX extracts the market\'s expectation of 30-day volatility from S&P 500 index option prices. It is forward-looking (reflects expected future volatility) and annualized (VIX = 20 means approximately 20% annualized, or 20/sqrt(252) = 1.26% daily). The VIX often leads realized volatility during crises.',
    },
    {
      id: 'w02-q06',
      question: 'Which of the following is a "stylized fact" of financial volatility?',
      options: [
        { label: 'A', text: 'Volatility is constant over time' },
        { label: 'B', text: 'Large returns tend to be followed by large returns (volatility clustering)' },
        { label: 'C', text: 'Positive and negative returns affect future volatility equally' },
        { label: 'D', text: 'Volatility across different markets is uncorrelated' },
      ],
      correctAnswer: 'B',
      explanation: 'Volatility clustering is one of the most robust stylized facts in finance: large returns (positive or negative) tend to be followed by large returns, and small returns by small returns. Formally, returns are uncorrelated but their absolute values are positively autocorrelated.',
    },
    {
      id: 'w02-q07',
      question: 'The variance risk premium refers to the observation that:',
      options: [
        { label: 'A', text: 'On average, implied volatility (e.g., VIX) exceeds realized volatility, so option sellers earn a premium for bearing volatility risk' },
        { label: 'B', text: 'Realized volatility always exceeds implied volatility' },
        { label: 'C', text: 'The VIX and rolling window volatility are always equal' },
        { label: 'D', text: 'Higher volatility always leads to higher returns' },
      ],
      correctAnswer: 'A',
      explanation: 'The variance risk premium is the difference between implied volatility (from option prices) and subsequently realized volatility. On average, this premium is positive -- option sellers earn compensation for bearing the risk that volatility could spike unexpectedly. This is one of the most robust findings in empirical finance.',
    },
    {
      id: 'w02-q08',
      question: 'A risk manager, a portfolio manager, and a derivatives trader each need a volatility estimate. Which statement is most accurate?',
      options: [
        { label: 'A', text: 'All three should use the same 252-day rolling window' },
        { label: 'B', text: 'The risk manager should use VIX; the others should use EWMA' },
        { label: 'C', text: 'The portfolio manager needs the most responsive measure' },
        { label: 'D', text: 'No single volatility measure is optimal for all purposes; the choice depends on the application, time horizon, and data availability' },
      ],
      correctAnswer: 'D',
      explanation: 'The textbook emphasizes that different users need different measures: risk managers need responsiveness (EWMA, short rolling window, or VIX), portfolio managers may prefer stability (longer rolling windows), and derivatives traders need forward-looking implied volatility. The right "ruler" depends on the job.',
    },
  ],
};
