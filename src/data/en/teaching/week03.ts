import type { SegmentTeaching } from '@/types';

export const week03Teaching: SegmentTeaching[] = [
  // ── Segment 1: Opening Story (w03-s01) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Welcome back, everyone. Last week we learned four rulers for measuring volatility — rolling window, EWMA, realized volatility, and VIX. EWMA was the fastest backward-looking measure, but it has no long-run anchor. Today we ask a bolder question.' },
      { type: 'lecture', character: 'alex', text: 'EWMA tells us what volatility IS right now. But can we forecast what it will be TOMORROW? That is the question I cannot stop thinking about.' },
      { type: 'lecture', character: 'drLin', text: 'Benoit Mandelbrot once said: large changes tend to be followed by large changes. Think about that. COVID crash, the 2008 financial crisis, the 2024 yen carry trade unwind — calm begets calm, and chaos begets chaos. That predictable pattern is our way in.' },
      { type: 'check', question: 'Which of the following is a predictable pattern in financial returns?', options: ['The direction of future returns', 'The magnitude of future returns (volatility clustering)', 'The exact price level next week', 'The sign of tomorrow\'s return'], correctIndex: 1, onCorrect: 'Exactly! Returns themselves are unpredictable, but their magnitude — volatility — follows a persistent pattern.', onWrong: 'Not quite. Returns are unpredictable, but their magnitude (volatility) clusters over time — large moves follow large moves.' },
      { type: 'lecture', character: 'narrator', text: 'Alex wants to move from measurement to prediction. Volatility clustering is the key predictable pattern that makes this possible.' },
    ],
  },

  // ── Segment 2: Detecting Clustering (w03-s02) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'To detect clustering, we need a proxy for daily volatility. The simplest one? Square the return. When you square a return, you erase the sign and focus purely on magnitude. A big positive day and a big negative day both give a large squared return.' },
      { type: 'lecture', character: 'drLin', text: 'Now here is the magic. Plot raw returns over time — they look random, bouncing above and below zero with no pattern. But plot SQUARED returns, and suddenly you see persistent clusters. Calm periods. Turbulent periods. They alternate, and the transitions are gradual, not instant.' },
      { type: 'visual', component: 'ACFBarChart', caption: 'ACF of raw returns (flat) vs. ACF of squared returns (persistent decay)' },
      { type: 'lecture', character: 'drLin', text: 'The autocorrelation function tells the full story. The ACF of raw returns is essentially flat — no predictability in the direction of returns. But the ACF of squared returns shows strong positive autocorrelation decaying slowly out to lag 50 and beyond. Today\'s volatility level predicts tomorrow\'s, next week\'s, even next month\'s.' },
      { type: 'lecture', character: 'drLin', text: 'We formalize this with the Ljung-Box Q statistic. Under the null hypothesis of no autocorrelation, Q follows a chi-squared distribution. A small p-value means we reject the null — clustering is real.', note: 'Ljung-Box: Q(m) = T(T+2) * sum(rho_hat(k)^2 / (T-k)) ~ chi^2(m)' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Ljung-Box Q statistic for testing autocorrelation in squared returns' },
      { type: 'lecture', character: 'drLin', text: 'For S&P 500 squared returns, Q at 10 lags equals 187.3 with a p-value below 0.001. The null hypothesis of no volatility clustering is absolutely crushed. This is the statistical confirmation of what our eyes already saw in the ACF plot.' },
      { type: 'check', question: 'Why does the ACF of squared returns show strong persistence while the ACF of raw returns is nearly flat?', options: ['Returns are autocorrelated but squaring removes it', 'Returns are unpredictable but their magnitude (volatility) is persistent', 'Squaring introduces artificial autocorrelation', 'The Ljung-Box test only works on squared data'], correctIndex: 1, onCorrect: 'Perfect. Returns themselves are nearly unpredictable, but their squared values — a proxy for volatility — are strongly autocorrelated.', onWrong: 'Think again. Raw returns show no pattern because direction is unpredictable. Squared returns show persistence because volatility itself clusters over time.' },
    ],
  },

  // ── Segment 3: The ARCH Model (w03-s03) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'We have confirmed that volatility clusters. Now we need a MODEL that captures this pattern and lets us forecast. Enter Robert Engle and ARCH — the Autoregressive Conditional Heteroskedasticity model.' },
      { type: 'lecture', character: 'drLin', text: 'Start with the return decomposition. Write this down: r_t equals sigma_t times z_t. The return is a time-varying volume knob — sigma_t — multiplied by a random direction — z_t, which is i.i.d. with mean zero and variance one.', note: 'Return decomposition: r_t = sigma_t * z_t, where z_t ~ i.i.d.(0, 1)' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Return decomposition: r_t = sigma_t * z_t' },
      { type: 'lecture', character: 'drLin', text: 'Here is the key insight. The z_t part is unpredictable — that is why returns themselves are unpredictable. But sigma_t is predictable — that is why squared returns are autocorrelated. We model sigma_t, not r_t.' },
      { type: 'lecture', character: 'drLin', text: 'The ARCH(q) model says: sigma_t squared equals omega plus the sum of alpha_i times r_{t-i} squared, for i from 1 to q. Today\'s variance depends on the past q squared returns. We need omega strictly positive and each alpha non-negative.', note: 'ARCH(q): sigma_t^2 = omega + sum(alpha_i * r_{t-i}^2)' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'ARCH(q) model: sigma_t^2 = omega + alpha_1 * r_{t-1}^2 + ... + alpha_q * r_{t-q}^2' },
      { type: 'check', question: 'In the ARCH model, what happens to today\'s conditional variance if yesterday\'s return was extremely large?', options: ['It decreases because large returns are mean-reverting', 'It stays the same because ARCH ignores past returns', 'It increases because yesterday\'s large squared return feeds into today\'s variance', 'It depends on the sign of yesterday\'s return'], correctIndex: 2, onCorrect: 'Exactly! A large r_{t-1} means a large r_{t-1}^2, which pushes up sigma_t^2. That is how ARCH captures clustering.', onWrong: 'Remember, ARCH uses r_{t-1}^2 — a large squared return directly increases today\'s variance estimate. That IS clustering.' },
      { type: 'lecture', character: 'drLin', text: 'But here is the problem with ARCH. To capture the slow decay of autocorrelation we see in the data, we need many lags — q equals 20 or more. That means estimating 20-plus parameters. Not practical. We need a more parsimonious approach.' },
    ],
  },

  // ── Segment 4: GARCH(1,1) (w03-s04) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Tim Bollerslev had a brilliant idea in 1986. What if we add yesterday\'s VARIANCE as a predictor? This single addition reduces the parameter count from 20-plus down to just 3.' },
      { type: 'lecture', character: 'drLin', text: 'Here it is — the most important formula in this course. Sigma_t squared equals omega plus alpha times r_{t-1} squared plus beta times sigma_{t-1} squared. Three parameters. That is GARCH(1,1).', note: 'GARCH(1,1): sigma_t^2 = omega + alpha * r_{t-1}^2 + beta * sigma_{t-1}^2' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'GARCH(1,1): sigma_t^2 = omega + alpha * r_{t-1}^2 + beta * sigma_{t-1}^2' },
      { type: 'lecture', character: 'drLin', text: 'Let me walk you through each parameter. Omega is the constant base level of variance — think of it as gravity pulling volatility back to a home base. Without omega, you get EWMA. Alpha is the shock coefficient — how much does yesterday\'s surprise move today\'s volatility? Typical values range from 0.05 to 0.15. High alpha means reactive, spiky volatility.', note: 'omega > 0: base variance | alpha >= 0: shock reaction (0.05-0.15) | beta >= 0: persistence (0.80-0.95)' },
      { type: 'lecture', character: 'drLin', text: 'Beta is the persistence coefficient — how much of yesterday\'s volatility carries over into today? Typical values range from 0.80 to 0.95. High beta means long memory, slow decay. The model remembers.' },
      { type: 'lecture', character: 'drLin', text: 'For the model to be well-behaved, we need alpha plus beta strictly less than 1. This is the stationarity condition — it ensures volatility does not explode to infinity. Typical equity values give alpha plus beta somewhere between 0.95 and 0.99.' },
      { type: 'lecture', character: 'drLin', text: 'Here is the deep insight. By substituting sigma_{t-1} squared recursively into the equation, you can show that GARCH(1,1) is equivalent to ARCH-infinity with geometrically decaying weights. The beta parameter encodes the entire infinite history. Three parameters are genuinely enough.' },
      { type: 'lecture', character: 'drLin', text: 'Now let me connect this to what we already know. Write EWMA below GARCH on your notes. EWMA sets omega to zero and alpha plus beta equals one. So what does adding omega change? It creates a HOME BASE. Volatility has somewhere to return to. Without it, volatility just drifts forever.' },
      { type: 'check', question: 'What is the key advantage of GARCH(1,1) over EWMA?', options: ['GARCH uses more parameters', 'GARCH has a long-run variance that volatility reverts to', 'GARCH ignores past squared returns', 'GARCH always produces lower volatility estimates'], correctIndex: 1, onCorrect: 'Exactly! The omega term creates a long-run anchor. After a shock, GARCH volatility decays back to this home base. EWMA drifts indefinitely.', onWrong: 'The key is the omega term. It creates a long-run variance — a home base that volatility returns to after shocks. EWMA has no such anchor.' },
      { type: 'visual', component: 'VolatilityComparison', caption: 'GARCH mean reversion vs. EWMA drift after a volatility shock' },
    ],
  },

  // ── Segment 5: Break (w03-s05) ──
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: 'Take a 10-minute break. When we return, we will derive the long-run variance, explore half-life, and see how fast volatility decays back to equilibrium.' },
    ],
  },

  // ── Segment 6: Mean Reversion and Half-Life (w03-s06) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Welcome back. Let us derive the long-run variance — the home base I keep mentioning. If we set sigma_t squared equal to sigma_{t-1} squared in the GARCH equation and solve, we get sigma-bar squared equals omega divided by one minus alpha minus beta.', note: 'Long-run variance: sigma_bar^2 = omega / (1 - alpha - beta)' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Long-run variance: sigma_bar^2 = omega / (1 - alpha - beta)' },
      { type: 'lecture', character: 'drLin', text: 'Let me make this concrete. Suppose omega equals 0.000005, alpha equals 0.08, beta equals 0.90. Then sigma-bar squared equals 0.000005 divided by 0.02, which gives 0.00025. The daily volatility is 1.58 percent, or about 25.1 percent annualized.' },
      { type: 'lecture', character: 'drLin', text: 'Now think about EWMA. It sets omega to zero and alpha plus beta equals one. The denominator becomes zero — no finite long-run variance exists. After a shock, EWMA volatility drifts permanently. It never comes home. This is GARCH\'s decisive advantage.' },
      { type: 'lecture', character: 'drLin', text: 'How fast does volatility return to its long-run level? We measure this with the half-life: h equals natural log of 0.5 divided by natural log of alpha plus beta. This tells us how many days for a shock to decay by 50 percent.', note: 'Half-life: h = ln(0.5) / ln(alpha + beta)' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Half-life of volatility shocks: h = ln(0.5) / ln(alpha + beta)' },
      { type: 'lecture', character: 'drLin', text: 'Example: if alpha plus beta equals 0.97, then h equals negative 0.693 divided by negative 0.0305, giving us about 22.8 days. A volatility shock takes roughly 23 days to half-decay. If persistence rises to 0.99, the half-life jumps to 69 days. Higher persistence means longer memory.' },
      { type: 'check', question: 'A GARCH model has alpha + beta = 0.95. Approximately how many days does it take for a volatility shock to decay by half?', options: ['About 7 days', 'About 14 days', 'About 23 days', 'About 69 days'], correctIndex: 1, onCorrect: 'Right! With alpha + beta = 0.95, h = ln(0.5)/ln(0.95) = about 13.5 days, so roughly 14 days.', onWrong: 'Use the formula: h = ln(0.5)/ln(0.95) = -0.693/(-0.0513) = about 13.5, so roughly 14 days.' },
    ],
  },

  // ── Segment 7: MLE Overview (w03-s07) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'We have the model. But how do we find omega, alpha, and beta from actual data? We need Maximum Likelihood Estimation — MLE. The idea is beautifully simple: which set of parameters makes the observed data most probable?' },
      { type: 'lecture', character: 'drLin', text: 'The log-likelihood function looks like this: L equals negative one-half times the sum of log 2 pi, plus log sigma_t squared, plus r_t squared divided by sigma_t squared. When sigma_t squared is too small, the last term blows up. When it is too large, the log term dominates. MLE finds the sweet spot that balances both.', note: 'L = -1/2 * sum[ln(2*pi) + ln(sigma_t^2) + r_t^2/sigma_t^2]' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'GARCH log-likelihood function' },
      { type: 'lecture', character: 'drLin', text: 'In practice, a computer runs numerical optimization to maximize this function — we do not need to solve it by hand. One useful extension: from Week 1 we know returns have fat tails. Using a Student-t distribution for z_t instead of the normal accommodates this. It adds one parameter — the degrees of freedom nu, typically between 5 and 7.' },
      { type: 'check', question: 'What does Maximum Likelihood Estimation find?', options: ['The parameters that minimize the variance', 'The parameters that make the observed data most probable', 'The parameters that produce the smoothest volatility path', 'The parameters with the smallest standard errors'], correctIndex: 1, onCorrect: 'Exactly. MLE asks: given our data, which omega, alpha, beta maximize the probability of having observed these returns?', onWrong: 'MLE finds the parameters that maximize the probability of the observed data. It is asking: what parameter values make our data most likely?' },
    ],
  },

  // ── Segment 8: Python Live Demo (w03-s08) ──
  {
    steps: [
      { type: 'lecture', character: 'priya', text: 'Time to estimate a real GARCH model in Python. Let me show you how three numbers capture the entire volatility dynamics of the S&P 500. Open your laptops and follow along.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Code Block 1: Download S&P 500 data, plot returns and squared returns side by side' },
      { type: 'lecture', character: 'priya', text: 'Look at the two panels. Raw returns bounce randomly. But squared returns show clear clusters — calm patches in 2017 and 2019, then the COVID explosion in March 2020. Your eyes are detecting the same autocorrelation the Ljung-Box test will confirm.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Code Block 2: ACF of raw vs. squared returns + Ljung-Box test' },
      { type: 'lecture', character: 'priya', text: 'There it is — the ACF comparison plot. Raw return ACF is flat, hugging zero at every lag. Squared return ACF starts above 0.2 and decays slowly past lag 50. The Ljung-Box Q statistic has a tiny p-value. Clustering is undeniable.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Code Block 3: Fit GARCH(1,1) with Student-t distribution using the arch library' },
      { type: 'lecture', character: 'priya', text: 'Let me walk through the output. Omega is very small — about 0.000002, the constant baseline. Alpha is about 0.08 — moderate shock reaction. Beta is about 0.91 — strong persistence. Together, alpha plus beta equals 0.99. And the Student-t degrees of freedom is around 6, confirming fat tails.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Code Block 4: Plot annualized conditional volatility with crisis bands highlighted' },
      { type: 'lecture', character: 'priya', text: 'This single chart shows GARCH tracking every regime shift from 2015 to 2024. Notice how volatility spikes during the COVID crash in March 2020, then slowly decays back to the long-run level. That is mean reversion in action — exactly what the math predicts.' },
      { type: 'visual', component: 'GARCHVolatilityDashboard', caption: 'GARCH conditional volatility over time with crisis periods highlighted' },
    ],
  },

  // ── Segment 9: Application and Diagnostics (w03-s09) ──
  {
    steps: [
      { type: 'lecture', character: 'alex', text: 'I projected the conditional volatility plot on the conference room screen. Look at the COVID period. Before the crash, the model was estimated on data ending January 2020 with a calm daily vol of about 0.72 percent. Then on February 24th, the S&P 500 drops 3.35 percent in a single day.' },
      { type: 'lecture', character: 'kenji', text: 'So what did the GARCH model forecast after that first shock?' },
      { type: 'lecture', character: 'alex', text: 'That is the onset problem. GARCH computed the next day\'s variance as omega plus alpha times 3.35 squared plus beta times 0.72 squared. But beta is 0.90, which means 90 percent of the forecast comes from yesterday\'s CALM variance. Only 10 percent from the new shock. The forecast was 1.21 percent daily vol. The realized volatility over the next week? 3.8 percent. GARCH underestimated by a factor of 3.14 on Day 1.' },
      { type: 'lecture', character: 'drLin', text: 'This is the fundamental limitation. VIX spiked immediately because option traders proactively price in fear. GARCH is reactive — it must accumulate evidence through recursive updates. It takes several shocks to catch up.' },
      { type: 'lecture', character: 'drLin', text: 'Now let us check whether the model is doing its job on the data it was trained on. After fitting GARCH, compute the standardized residuals: z-hat_t equals r_t divided by sigma-hat_t. If the model is correct, these should be i.i.d. with no remaining autocorrelation in their squares.', note: 'Standardized residuals: z_hat_t = r_t / sigma_hat_t should be i.i.d.' },
      { type: 'lecture', character: 'drLin', text: 'The Ljung-Box test on squared standardized residuals gives Q of 10 equal to 8.2 with a p-value of 0.61. GARCH has successfully absorbed the volatility clustering. The squared residuals now behave like i.i.d. draws.' },
      { type: 'check', question: 'After GARCH filtering, the standardized residuals show skewness of -0.31. What does this tell us?', options: ['The model is perfectly specified', 'GARCH treats positive and negative shocks identically, but bad news actually hits harder', 'The Student-t distribution is wrong', 'The data has no remaining structure'], correctIndex: 1, onCorrect: 'Exactly! GARCH uses r_{t-1}^2 which erases the sign. A +3% and -3% return produce the same impact. But in reality, negative shocks increase volatility more. This is the leverage effect — and it points us to Week 4.', onWrong: 'The negative skewness in residuals reveals that GARCH cannot distinguish between good and bad news. It squares the return, erasing the sign. But bad news hits harder than good news — that asymmetry is what we fix next week.' },
      { type: 'lecture', character: 'drLin', text: 'GARCH uses r_{t-1} squared, which erases the sign. A positive 3 percent return and a negative 3 percent return produce the same impact on volatility. But in reality, negative shocks increase volatility more. This is the leverage effect — and it is the topic of Week 4.' },
    ],
  },

  // ── Segment 10: Wrap-up and Mission (w03-s10) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Let me summarize the six key takeaways. First, volatility clusters — large returns tend to be followed by large returns. This is the most robust pattern in financial data, confirmed by the ACF and Ljung-Box test on squared returns.' },
      { type: 'lecture', character: 'drLin', text: 'Second, ARCH started it. Engle in 1982 showed that today\'s variance depends on past squared returns. But ARCH needs many parameters. Third, GARCH(1,1) dominates. Bollerslev in 1986 added lagged variance, reducing everything to three parameters. Hansen and Lunde in 2005 tested hundreds of models — nothing consistently beats it.' },
      { type: 'lecture', character: 'drLin', text: 'Fourth, mean reversion is GARCH\'s key advantage over EWMA. The long-run variance sigma-bar squared provides a home base. Fifth, MLE finds the optimal parameters by maximizing the probability of the observed data.' },
      { type: 'lecture', character: 'drLin', text: 'And sixth — the limitation. GARCH treats positive and negative shocks identically. The residual skewness tells us something is missing. Next week, we fix this.' },
      { type: 'lecture', character: 'drLin', text: 'For Mission 3, here is what I need from you. Estimate GARCH(1,1) on both the Nikkei 225 and S&P 500. Report the parameters, compute the long-run volatility and half-life. Plot the conditional volatility over time. Run diagnostic checks on the standardized residuals — Ljung-Box, skewness, kurtosis.' },
      { type: 'lecture', character: 'drLin', text: 'GARCH erases the sign. But bad news hits harder than good news. Next week, we give the model eyes to tell the difference. Get ready for GJR-GARCH and the leverage effect.' },
      { type: 'lecture', character: 'priya', text: 'Hey Alex — your GARCH model is reactive, not proactive. It waits for the storm to arrive before raising the alarm. My neural network might do better.' },
      { type: 'lecture', character: 'alex', text: 'Prove it.' },
      { type: 'lecture', character: 'narrator', text: 'That challenge starts in Week 5. See you next week.' },
    ],
  },
];
