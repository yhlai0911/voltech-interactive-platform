import { WeekExercises } from '@/types';

export const week04Exercises: WeekExercises = {
  weekNumber: 4,
  title: 'Asymmetric Volatility — GJR-GARCH',
  questions: [
    {
      id: 'w04-q01',
      question: 'The leverage effect in equity markets refers to the phenomenon that:',
      options: [
        { label: 'A', text: 'Positive returns increase volatility more than negative returns' },
        { label: 'B', text: 'Volatility is constant regardless of return direction' },
        { label: 'C', text: 'Negative returns increase future volatility more than positive returns of the same magnitude' },
        { label: 'D', text: 'Leverage ratios have no impact on stock volatility' },
      ],
      correctAnswer: 'C',
      explanation: 'The leverage effect (Black, 1976) describes the asymmetric relationship between returns and volatility: when a stock price falls, the firm\'s debt-to-equity ratio rises automatically, increasing financial risk and thus equity volatility. A second channel (volatility feedback effect) also predicts the same pattern: rising expected volatility requires higher expected returns, so prices drop immediately.',
    },
    {
      id: 'w04-q02',
      question: 'In the GJR-GARCH(1,1) model, the indicator function I(r_{t-1} < 0) serves to:',
      options: [
        { label: 'A', text: 'Remove all negative returns from the estimation' },
        { label: 'B', text: 'Activate the extra parameter gamma only when the previous return is negative' },
        { label: 'C', text: 'Ensure the conditional variance is always positive' },
        { label: 'D', text: 'Double the impact of all shocks regardless of sign' },
      ],
      correctAnswer: 'B',
      explanation: 'The indicator function equals 1 when r_{t-1} < 0 and 0 otherwise. It acts as a switch: when yesterday\'s return was negative, the term gamma * r_{t-1}^2 is added to the variance equation, giving bad news an extra kick. When yesterday\'s return was positive, the indicator is zero, and the model behaves like standard GARCH.',
    },
    {
      id: 'w04-q03',
      question: 'A GJR-GARCH(1,1) model is estimated with alpha = 0.03 and gamma = 0.12. The asymmetry ratio is:',
      options: [
        { label: 'A', text: '(alpha + gamma)/alpha = 5.0, meaning negative shocks have 5 times the impact of positive shocks' },
        { label: 'B', text: 'gamma / alpha = 4.0' },
        { label: 'C', text: 'alpha / gamma = 0.25' },
        { label: 'D', text: 'alpha + gamma = 0.15' },
      ],
      correctAnswer: 'A',
      explanation: 'For positive shocks, the effective coefficient is alpha = 0.03. For negative shocks, it is alpha + gamma = 0.03 + 0.12 = 0.15. The asymmetry ratio = 0.15/0.03 = 5.0. This means a negative return has 5 times the impact on tomorrow\'s conditional variance compared to a positive return of the same absolute size.',
    },
    {
      id: 'w04-q04',
      question: 'How does the EGARCH(1,1) model differ fundamentally from GJR-GARCH(1,1)?',
      options: [
        { label: 'A', text: 'EGARCH uses simple returns instead of log returns' },
        { label: 'B', text: 'EGARCH ignores asymmetry entirely' },
        { label: 'C', text: 'EGARCH cannot be estimated by maximum likelihood' },
        { label: 'D', text: 'EGARCH models ln(sigma_t^2) rather than sigma_t^2, guaranteeing the variance is always positive without parameter constraints' },
      ],
      correctAnswer: 'D',
      explanation: 'EGARCH (Nelson, 1991) models the log-variance ln(sigma_t^2). Since the exponential of any real number is positive, sigma_t^2 = exp(...) > 0 automatically -- no positivity constraints on alpha or beta are needed. In contrast, GJR-GARCH requires omega > 0, alpha >= 0, beta >= 0 to ensure sigma_t^2 > 0.',
    },
    {
      id: 'w04-q05',
      question: 'The News Impact Curve (NIC) for a GJR-GARCH model:',
      options: [
        { label: 'A', text: 'Is a straight line' },
        { label: 'B', text: 'Is identical to the NIC for standard GARCH' },
        { label: 'C', text: 'Is an asymmetric parabola, steeper on the left (negative returns) than on the right, with a kink at r_{t-1} = 0' },
        { label: 'D', text: 'Shows the relationship between returns and stock prices' },
      ],
      correctAnswer: 'C',
      explanation: 'The NIC plots tomorrow\'s conditional variance sigma_t^2 as a function of today\'s return r_{t-1}, holding sigma_{t-1}^2 at its unconditional level. For GARCH, the NIC is a symmetric parabola. For GJR-GARCH, the left branch (negative r_{t-1}) has slope proportional to alpha + gamma, while the right branch has slope proportional to alpha, creating a visible "kink" at zero.',
    },
    {
      id: 'w04-q06',
      question: 'The stationarity condition for GJR-GARCH(1,1) is alpha + gamma/2 + beta < 1. The gamma/2 term appears because:',
      options: [
        { label: 'A', text: 'The model uses half the data for estimation' },
        { label: 'B', text: 'Under a symmetric distribution, the indicator I(r_{t-1} < 0) is active approximately half the time' },
        { label: 'C', text: 'The gamma parameter is always divided by 2 in the model' },
        { label: 'D', text: 'EGARCH uses gamma/2 in its stationarity condition as well' },
      ],
      correctAnswer: 'B',
      explanation: 'The unconditional expectation of I(r_{t-1} < 0) is 1/2 when the distribution of returns is symmetric around zero (which is approximately true). Therefore, on average, the gamma term contributes gamma/2 to the persistence, giving the stationarity condition alpha + gamma/2 + beta < 1 and the long-run variance sigma_bar^2 = omega/(1 - alpha - gamma/2 - beta).',
    },
    {
      id: 'w04-q07',
      question: 'To test whether the asymmetry parameter gamma is statistically significant, we use a likelihood ratio test. Since standard GARCH is nested in GJR-GARCH (with gamma = 0), the test statistic is:',
      options: [
        { label: 'A', text: 'LR = 2[L_GJR - L_GARCH] ~ chi^2(1), with critical value 3.84 at 5%' },
        { label: 'B', text: 'LR = L_GJR / L_GARCH' },
        { label: 'C', text: 'LR = AIC_GJR - AIC_GARCH' },
        { label: 'D', text: 'The LR test cannot be used for nested GARCH models' },
      ],
      correctAnswer: 'A',
      explanation: 'The likelihood ratio test compares the log-likelihoods of the restricted (GARCH, gamma = 0) and unrestricted (GJR-GARCH) models. The statistic LR = 2[L_GJR - L_GARCH] follows a chi^2 distribution with 1 degree of freedom (one additional parameter). If LR > 3.84, we reject H0: gamma = 0 at the 5% level, confirming that asymmetry is statistically significant.',
    },
    {
      id: 'w04-q08',
      question: 'If a risk manager computes VaR using standard GARCH instead of GJR-GARCH after a significant market decline, the VaR estimate will likely be:',
      options: [
        { label: 'A', text: 'Exactly the same as GJR-GARCH' },
        { label: 'B', text: 'Higher than the GJR-GARCH estimate' },
        { label: 'C', text: 'Higher for some assets and lower for others, unpredictably' },
        { label: 'D', text: 'Lower than the GJR-GARCH estimate, because GARCH underestimates the volatility impact of negative shocks' },
      ],
      correctAnswer: 'D',
      explanation: 'After a market decline, GJR-GARCH applies the full alpha + gamma coefficient to the squared negative return, producing a higher conditional variance than standard GARCH (which uses only alpha). Higher variance means a higher VaR estimate. Standard GARCH systematically underestimates risk after market drops -- precisely when accurate risk measurement is most critical.',
    },
  ],
};
