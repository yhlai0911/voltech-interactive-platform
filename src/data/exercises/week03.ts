import { WeekExercises } from '@/types';

export const week03Exercises: WeekExercises = {
  weekNumber: 3,
  title: 'Volatility Clustering and GARCH',
  questions: [
    {
      id: 'w03-q01',
      question: 'Volatility clustering refers to the empirical phenomenon that:',
      options: [
        { label: 'A', text: 'Returns are positively autocorrelated' },
        { label: 'B', text: 'Squared returns exhibit significant positive autocorrelation' },
        { label: 'C', text: 'Volatility is constant over time' },
        { label: 'D', text: 'Large positive returns are always followed by large negative returns' },
      ],
      correctAnswer: 'B',
      explanation: 'Volatility clustering means large returns (of either sign) tend to be followed by large returns, and small returns by small returns. This is detected by positive autocorrelation in squared returns r_t^2, not in raw returns r_t (which are approximately uncorrelated).',
    },
    {
      id: 'w03-q02',
      question: 'In the GARCH(1,1) model sigma_t^2 = omega + alpha * r_{t-1}^2 + beta * sigma_{t-1}^2, the parameters alpha and beta respectively represent:',
      options: [
        { label: 'A', text: 'The mean return and its variance' },
        { label: 'B', text: 'The short-run and long-run volatility levels' },
        { label: 'C', text: 'The shock coefficient (reaction to new information) and the persistence coefficient (memory of past variance)' },
        { label: 'D', text: 'The skewness and kurtosis of the return distribution' },
      ],
      correctAnswer: 'C',
      explanation: 'The parameter alpha captures how much yesterday\'s squared return (new shock) affects today\'s conditional variance, while beta captures how much of yesterday\'s conditional variance carries over. Typical equity values: alpha = 0.05-0.15, beta = 0.80-0.95.',
    },
    {
      id: 'w03-q03',
      question: 'Why does GARCH(1,1) require far fewer parameters than ARCH(q) to capture the slow decay of volatility autocorrelation?',
      options: [
        { label: 'A', text: 'GARCH uses a different distribution for the residuals' },
        { label: 'B', text: 'GARCH ignores past squared returns entirely' },
        { label: 'C', text: 'GARCH uses higher moments of the return distribution' },
        { label: 'D', text: 'GARCH(1,1) is equivalent to ARCH(infinity) with geometrically decaying weights, encoded by the single beta parameter' },
      ],
      correctAnswer: 'D',
      explanation: 'By repeatedly substituting sigma_{t-1}^2 into itself, GARCH(1,1) can be written as sigma_t^2 = omega/(1-beta) + alpha * sum(beta^{i-1} * r_{t-i}^2), which is an infinite-order ARCH with exponentially decaying coefficients. The beta term efficiently encodes the entire history.',
    },
    {
      id: 'w03-q04',
      question: 'What is the primary advantage of GARCH over EWMA for volatility modeling?',
      options: [
        { label: 'A', text: 'GARCH has a long-run variance anchor sigma_bar^2 = omega/(1-alpha-beta) that provides mean reversion' },
        { label: 'B', text: 'GARCH does not require historical data' },
        { label: 'C', text: 'GARCH always produces lower volatility estimates' },
        { label: 'D', text: 'GARCH is computationally faster than EWMA' },
      ],
      correctAnswer: 'A',
      explanation: 'EWMA is a special case of GARCH with omega = 0 (equivalently, IGARCH with alpha + beta = 1). Without omega, EWMA has no unconditional variance to revert to -- after a shock, volatility drifts with no anchor. GARCH\'s omega > 0 acts as a spring, pulling volatility back to its long-run level.',
    },
    {
      id: 'w03-q05',
      question: 'EWMA can be viewed as a special case of GARCH(1,1). What restriction on the GARCH parameters produces EWMA?',
      options: [
        { label: 'A', text: 'alpha = 0' },
        { label: 'B', text: 'omega = 0 (equivalently, alpha + beta = 1)' },
        { label: 'C', text: 'beta = 0' },
        { label: 'D', text: 'alpha = beta' },
      ],
      correctAnswer: 'B',
      explanation: 'Setting omega = 0 in GARCH(1,1) gives sigma_t^2 = alpha * r_{t-1}^2 + beta * sigma_{t-1}^2 with alpha + beta = 1. Identifying alpha = 1-lambda and beta = lambda yields the EWMA formula sigma_t^2 = (1-lambda)*r_{t-1}^2 + lambda*sigma_{t-1}^2. This is also called IGARCH (Integrated GARCH).',
    },
    {
      id: 'w03-q06',
      question: 'For a GARCH(1,1) model to be covariance stationary, which condition must hold?',
      options: [
        { label: 'A', text: 'omega > 1' },
        { label: 'B', text: 'alpha > beta' },
        { label: 'C', text: 'alpha + beta < 1' },
        { label: 'D', text: 'alpha + beta > 1' },
      ],
      correctAnswer: 'C',
      explanation: 'The stationarity condition alpha + beta < 1 ensures that the unconditional variance sigma_bar^2 = omega/(1-alpha-beta) is finite and positive. When alpha + beta = 1 (IGARCH), the unconditional variance is undefined. When alpha + beta > 1, variance forecasts grow without bound -- the model is explosive.',
    },
    {
      id: 'w03-q07',
      question: 'In Maximum Likelihood Estimation (MLE) of GARCH, the optimizer seeks parameter values that:',
      options: [
        { label: 'A', text: 'Minimize the sum of squared returns' },
        { label: 'B', text: 'Minimize the conditional variance at every time step' },
        { label: 'C', text: 'Maximize the number of parameters in the model' },
        { label: 'D', text: 'Maximize the probability of observing the actual return series given the model' },
      ],
      correctAnswer: 'D',
      explanation: 'MLE finds (omega, alpha, beta) that maximize the log-likelihood L = -1/2 * sum[ln(2*pi) + ln(sigma_t^2) + r_t^2/sigma_t^2]. Intuitively, this selects parameters that best explain the observed pattern of large and small returns through the time-varying variance sigma_t^2.',
    },
    {
      id: 'w03-q08',
      question: 'After fitting GARCH(1,1), the standardized residuals z_hat_t = r_t / sigma_hat_t still show excess kurtosis. The best remedy is to:',
      options: [
        { label: 'A', text: 'Use a Student-t distribution for the residuals instead of the normal distribution' },
        { label: 'B', text: 'Increase the GARCH order to (2,2)' },
        { label: 'C', text: 'Remove all outliers from the data' },
        { label: 'D', text: 'Switch to simple returns instead of log returns' },
      ],
      correctAnswer: 'A',
      explanation: 'Even after GARCH filtering, standardized residuals often retain fat tails. Using a Student-t distribution (with estimated degrees of freedom nu) accommodates this remaining kurtosis. Typical equity data yield nu = 5-7, confirming heavier tails than normal. Removing outliers (C) would discard precisely the most informative observations.',
    },
  ],
};
