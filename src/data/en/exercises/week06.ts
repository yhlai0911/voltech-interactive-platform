import { WeekExercises } from '@/types';

export const week06Exercises: WeekExercises = {
  weekNumber: 6,
  title: 'Value-at-Risk',
  questions: [
    {
      id: 'w06-q01',
      question: 'The 99% 1-day Value-at-Risk of a portfolio is $5 million. This means:',
      options: [
        { label: 'A', text: 'The portfolio will lose exactly $5 million on the worst day' },
        { label: 'B', text: 'On 99 out of 100 trading days, the portfolio loss will not exceed $5 million' },
        { label: 'C', text: 'The portfolio will never lose more than $5 million' },
        { label: 'D', text: 'The expected daily loss is $5 million' },
      ],
      correctAnswer: 'B',
      explanation: 'VaR is a quantile-based measure: 99% VaR means there is a 1% probability that the daily loss exceeds $5 million. Equivalently, on 99 out of 100 days the loss stays below this threshold. VaR does not say anything about how severe the loss is when it exceeds the threshold.',
    },
    {
      id: 'w06-q02',
      question: 'A bank reports a 99% 1-day VaR. Over 250 trading days, approximately how many VaR breaches (days where the actual loss exceeds VaR) should be expected?',
      options: [
        { label: 'A', text: '0 -- VaR should never be breached' },
        { label: 'B', text: '25' },
        { label: 'C', text: '2-3' },
        { label: 'D', text: '10' },
      ],
      correctAnswer: 'C',
      explanation: 'With 99% confidence, the expected number of breaches is (1-0.99) x 250 = 2.5 per year. If the VaR model is well-calibrated, we should observe approximately 2-3 breaches. Fewer breaches suggest the model is too conservative; significantly more suggest it underestimates risk.',
    },
    {
      id: 'w06-q03',
      question: 'Which of the following is a key advantage of Historical Simulation VaR over Parametric VaR?',
      options: [
        { label: 'A', text: 'It adapts quickly to changing volatility regimes' },
        { label: 'B', text: 'It requires no distributional assumptions -- it uses the actual empirical distribution of past returns' },
        { label: 'C', text: 'It produces more conservative estimates during calm periods' },
        { label: 'D', text: 'It is computationally faster for large portfolios' },
      ],
      correctAnswer: 'B',
      explanation: 'Historical Simulation is non-parametric: it uses the actual sorted historical returns to determine the VaR quantile, without assuming normality, t-distribution, or any other distributional form. Its main disadvantage is that it is slow to adapt to regime changes, as the VaR depends on the full historical window.',
    },
    {
      id: 'w06-q04',
      question: 'Why does GARCH-based Parametric VaR adapt more quickly to market stress than Historical Simulation VaR?',
      options: [
        { label: 'A', text: 'It uses a longer historical window' },
        { label: 'B', text: 'It assigns equal weight to all past returns' },
        { label: 'C', text: 'It uses more data points' },
        { label: 'D', text: 'It updates the conditional volatility sigma_t daily based on recent returns, giving more weight to recent information' },
      ],
      correctAnswer: 'D',
      explanation: 'The GARCH model updates its conditional variance forecast daily using the recursive equation. A large negative return immediately increases sigma_t^2, which in turn increases the parametric VaR. Historical Simulation treats all returns in the window equally, so a single new observation has minimal impact on a 500-day window.',
    },
    {
      id: 'w06-q05',
      question: 'What is the fundamental weakness of Value-at-Risk that Expected Shortfall addresses?',
      options: [
        { label: 'A', text: 'VaR tells you the loss threshold but nothing about the severity of losses beyond that threshold' },
        { label: 'B', text: 'VaR cannot be computed for portfolios with options' },
        { label: 'C', text: 'VaR requires the normal distribution assumption' },
        { label: 'D', text: 'VaR is too conservative for practical risk management' },
      ],
      correctAnswer: 'A',
      explanation: 'VaR is a threshold measure: it identifies the boundary of the worst (1-alpha)% outcomes but says nothing about the average severity beyond that boundary. A portfolio with VaR = $10M could have average tail losses of $11M or $50M. Expected Shortfall (CVaR) measures the average loss given that VaR is breached, providing information about tail severity.',
    },
    {
      id: 'w06-q06',
      question: 'Expected Shortfall is called a "coherent" risk measure because it satisfies subadditivity. What does subadditivity mean in risk management?',
      options: [
        { label: 'A', text: 'Risk is always positive' },
        { label: 'B', text: 'Higher confidence levels produce higher risk estimates' },
        { label: 'C', text: 'The risk of a combined portfolio is less than or equal to the sum of the individual risks -- diversification always reduces risk' },
        { label: 'D', text: 'The risk measure is the same regardless of the currency used' },
      ],
      correctAnswer: 'C',
      explanation: 'Subadditivity means rho(X + Y) <= rho(X) + rho(Y), which formalizes the idea that diversification should not increase risk. VaR can violate this property: merging two portfolios can produce a combined VaR higher than the sum of individual VaRs. Expected Shortfall satisfies subadditivity, making it a coherent risk measure.',
    },
    {
      id: 'w06-q07',
      question: 'When computing Parametric VaR, using the Student-t distribution instead of the normal distribution results in:',
      options: [
        { label: 'A', text: 'A smaller VaR (less conservative)' },
        { label: 'B', text: 'A larger VaR because the t-distribution quantile is further in the tail than the normal quantile' },
        { label: 'C', text: 'No difference, since both distributions have the same quantiles' },
        { label: 'D', text: 'A VaR that does not depend on the volatility estimate' },
      ],
      correctAnswer: 'B',
      explanation: 'The Student-t distribution has heavier tails than the normal. For example, at the 1st percentile with nu = 7 degrees of freedom, t_{0.01,7} is approximately -2.998 compared to z_{0.01} = -2.326 for the normal. This produces a VaR that is roughly 29% larger, reflecting the higher probability of extreme losses.',
    },
    {
      id: 'w06-q08',
      question: 'The 99% Expected Shortfall is best described as:',
      options: [
        { label: 'A', text: 'The probability that VaR is exceeded' },
        { label: 'B', text: 'The maximum possible loss in the portfolio' },
        { label: 'C', text: 'The standard deviation of returns in the tail' },
        { label: 'D', text: 'The average loss on days when the loss exceeds VaR (i.e., the average loss in the worst 1% of outcomes)' },
      ],
      correctAnswer: 'D',
      explanation: 'Expected Shortfall (also called CVaR) at the 99% level measures the average severity of losses conditional on the loss exceeding VaR. For a normal distribution, the 99% ES is about 1.15 times VaR; for fat-tailed distributions, the ratio is larger (typically 1.2-1.4), indicating a heavier tail beyond VaR.',
    },
  ],
};
