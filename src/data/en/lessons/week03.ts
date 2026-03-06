import { WeekLesson } from '@/types';

export const week03Lesson: WeekLesson = {
  weekNumber: 3,
  title: 'Volatility Clustering and GARCH',
  subtitle: 'Taming the beast',
  duration: 120,
  prerequisites: [
    'Week 2 (EWMA, rolling volatility)',
    'Basic understanding of autocorrelation',
  ],
  learningObjectives: [
    'Identify volatility clustering in return series and test for it using the ACF of squared returns and the Ljung-Box test',
    'Explain the ARCH model and its role as the foundation of conditional volatility modeling',
    'Derive and interpret the GARCH(1,1) model, including the roles of omega, alpha, and beta',
    'Connect GARCH to EWMA and explain why GARCH adds mean reversion',
    'Estimate a GARCH(1,1) model using maximum likelihood in Python and interpret the output',
  ],
  segments: [
    { id: 'w03-s01', title: 'Opening Story', duration: 8, type: 'story', content: 'Read the VolTech dialogue. Hook: "Can we PREDICT volatility, not just measure it?" Mandelbrot quote: "Large changes tend to be followed by large changes."', keyPoints: ['Alex wants to move from measurement to prediction', 'Volatility clustering is the key predictable pattern'] },
    { id: 'w03-s02', title: 'Detecting Clustering', duration: 12, type: 'lecture', content: 'Lecture: squared returns as volatility proxy. Show ACF plots: raw returns (flat) vs. squared returns (persistent). Introduce Ljung-Box Q statistic.', keyPoints: ['Returns are uncorrelated but squared returns are strongly autocorrelated', 'Ljung-Box test formalizes the test for autocorrelation'] },
    { id: 'w03-s03', title: 'The ARCH Model', duration: 15, type: 'lecture', content: 'Lecture: return decomposition r_t = sigma_t * z_t. ARCH(q) equation on board. Activity: "What happens if yesterday\'s return was huge?"', keyPoints: ['Return = time-varying volatility times random shock', 'ARCH(q): today\'s variance depends on past squared returns', 'ARCH captures clustering but requires many lags'] },
    { id: 'w03-s04', title: 'GARCH(1,1)', duration: 17, type: 'lecture', content: 'Core lecture: sigma_t^2 = omega + alpha * r_{t-1}^2 + beta * sigma_{t-1}^2. Walk through parameter anatomy table. Discuss stationarity (alpha + beta < 1).', keyPoints: ['omega: base variance, alpha: shock reaction, beta: memory/persistence', 'GARCH(1,1) = ARCH(infinity) with geometrically decaying weights', 'Only 3 parameters capture volatility dynamics for most assets'] },
    { id: 'w03-s05', title: 'Break', duration: 10, type: 'break', content: '10-minute break.' },
    { id: 'w03-s06', title: 'Mean Reversion and Half-Life', duration: 13, type: 'lecture', content: 'Derive long-run variance sigma_bar^2 = omega/(1-alpha-beta). Compare GARCH vs. EWMA (the missing omega). Half-life example: alpha+beta=0.97 gives h=23 days.', keyPoints: ['GARCH has a long-run anchor that EWMA lacks', 'Half-life measures how quickly volatility returns to equilibrium', 'Typical half-lives: 14 to 69 days'] },
    { id: 'w03-s07', title: 'MLE Overview', duration: 7, type: 'lecture', content: 'Lecture: log-likelihood function, numerical optimization. Mention Student-t extension for fat tails. Keep conceptual -- details come in Python demo.', keyPoints: ['MLE finds parameters maximizing the probability of observed data', 'Student-t residuals improve fit by accommodating fat tails'] },
    { id: 'w03-s08', title: 'Python Live Demo', duration: 16, type: 'demo', content: 'Run 4 code blocks: clustering visualization, ACF/Ljung-Box, GARCH fitting, conditional volatility plot. Students follow along.', keyPoints: ['ACF comparison is the "wow moment"', 'arch library handles GARCH estimation', 'Conditional volatility plot tracks every crisis'] },
    { id: 'w03-s09', title: 'Application and Diagnostics', duration: 10, type: 'activity', content: 'Discuss COVID crash case: pre-COVID estimation, onset problem. Show standardized residuals and Ljung-Box after GARCH. Ask: "Why is residual skewness still negative?"', keyPoints: ['GARCH is reactive, not proactive -- the onset problem', 'Standardized residuals should be i.i.d. if model is correct', 'Negative skewness in residuals points to Week 4'] },
    { id: 'w03-s10', title: 'Wrap-up and Mission', duration: 12, type: 'wrapup', content: 'Summarize 6 key takeaways. Explain Mission 3 deliverables. Tease Week 4: "GARCH erases the sign. But bad news hits harder than good news."', keyPoints: ['Volatility clusters, ARCH started it, GARCH(1,1) dominates', 'Mean reversion is the key advantage over EWMA', 'Limitation: GARCH treats positive and negative shocks identically'] },
  ],
};
