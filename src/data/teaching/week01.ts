import type { SegmentTeaching } from '@/types';

/**
 * Week 01 "Financial Risk and Return Distributions" teaching script
 *
 * 10 segments (aligned 1:1 with lesson week01):
 *   seg 0: Opening Story (w01-s01)              — 8 steps
 *   seg 1: Returns (w01-s02)                    — 8 steps
 *   seg 2: Normal Distribution (w01-s03)        — 7 steps
 *   seg 3: Fat Tails and Moments (w01-s04)      — 8 steps
 *   seg 4: Break (w01-s05)                      — 1 step
 *   seg 5: QQ Plot and JB Test (w01-s06)        — 7 steps
 *   seg 6: Python Live Demo (w01-s07)           — 6 steps
 *   seg 7: Application (w01-s08)                — 6 steps
 *   seg 8: Discussion (w01-s09)                 — 5 steps
 *   seg 9: Wrap-up and Mission (w01-s10)        — 5 steps
 *                                        Total: ~61 steps
 */
export const week01Teaching: SegmentTeaching[] = [
  // ═══════════════════════════════════════════════════
  // Segment 0: Opening Story (10 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Welcome everyone. Before we begin, let me draw your attention to two numbers on the board: 14,000 and 3. What do you think these numbers represent? Take a moment and guess.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Under the normal distribution, a 5-sigma loss should happen once every 14,000 years. In reality, it happens roughly every 3 years. This gap is the central problem of financial risk management, and it is exactly what we are here to understand.',
      },
      {
        type: 'lecture',
        character: 'narrator',
        text: 'Alex Chen arrives at VolTech Analytics on his first day. Three large monitors display real-time market data. A whiteboard in the corner is covered in Greek letters and half-erased equations.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Alex, welcome to the team. Let me tell you about our newest client. Kenji Tanaka runs the trading desk at one of Japan\'s largest pension funds. In March 2020, his portfolio lost 18% in a single week, when the risk model said the maximum possible loss was 4.2%.',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: 'Standard parametric VaR. Normal distribution assumption. Our vendor said it was industry standard.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'It IS the industry standard. That is precisely the problem.',
      },
      {
        type: 'check',
        question: 'Kenji\'s VaR model predicted a maximum weekly loss of 4.2%, but the actual loss was 18%. What is the most likely root cause?',
        options: [
          'The model used too short a data window',
          'The model assumed returns follow a normal distribution, which underestimates tail risk',
          'The model had a coding error',
          'The market was manipulated that week',
        ],
        correctIndex: 1,
        onCorrect: 'Exactly right. The normal distribution assigns negligible probability to extreme events, but in reality these events happen far more often. This is the fat-tail problem.',
        onWrong: 'While data windows and implementation matter, the fundamental issue is the distributional assumption. The normal distribution drastically underestimates the probability of extreme losses. That is the core lesson today.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Before we can fix Kenji\'s risk model, we need to understand why it broke. We need to look at what financial returns actually look like, not what textbooks assume they look like.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 1: Returns (15 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'check',
        question: 'Why do we analyze returns rather than prices directly?',
        options: [
          'Returns are easier to calculate',
          'Prices are non-stationary and drift upward over time, while returns fluctuate around a stable mean',
          'Prices contain more noise than returns',
          'Returns are always positive',
        ],
        correctIndex: 1,
        onCorrect: 'Exactly. Prices are non-stationary, meaning their statistical properties change over time. Returns are approximately stationary, which makes them suitable for statistical modeling.',
        onWrong: 'The key reason is stationarity. Prices tend to drift upward over time, making their mean and variance non-constant. Returns fluctuate around a relatively stable mean, which is essential for any statistical analysis.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'The simplest definition of a return is the percentage change in price. We call this the simple return.',
        note: 'Simple return: R_t = (P_t - P_{t-1}) / P_{t-1}',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'Simple return formula: R_t = (P_t - P_{t-1}) / P_{t-1}',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Now, in quantitative finance we usually prefer the log return. It equals the natural logarithm of the price ratio. The beauty of log returns is that they are time-additive: a weekly log return is simply the sum of five daily log returns.',
        note: 'Log return: r_t = ln(P_t / P_{t-1}) = ln(1 + R_t)',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'Log return: r_t = ln(P_t / P_{t-1}). Key property: time additivity.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Here is a useful approximation. For small values of x, the natural log of one plus x is approximately equal to x. So when returns are under 5%, simple and log returns are nearly identical. The distinction matters mainly for large moves.',
        note: 'Approximation: ln(1+x) ≈ x for small x',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Think of it this way. In signal processing, you analyze the spectrum of a signal. In finance, we analyze the distribution of returns. Same idea, different domain.',
      },
      {
        type: 'check',
        question: 'Which property makes log returns especially useful for multi-period analysis?',
        options: [
          'They are always positive',
          'They are time-additive: the multi-period return is the sum of single-period returns',
          'They require less data to compute',
          'They eliminate the need for statistical tests',
        ],
        correctIndex: 1,
        onCorrect: 'Correct! Time additivity is the key advantage. If you want the return over a month, just add up the daily log returns. With simple returns, you would need to multiply, which complicates things.',
        onWrong: 'The critical property is time additivity. The log return over any period equals the sum of the sub-period log returns. This simplifies multi-period analysis enormously.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 2: Normal Distribution (15 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Now that we know what returns are, let us look at the standard model. Since Bachelier in 1900, the default assumption has been that returns follow a normal distribution, fully described by just two parameters: the mean and the variance.',
        note: 'Gaussian model: r_t ~ N(mu, sigma^2)',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'The Gaussian model: r_t ~ N(mu, sigma^2). Only two parameters describe the entire distribution.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Under the normal distribution, the probability of extreme events decays exponentially fast. Here are the famous sigma rules: 68.3% of observations fall within plus or minus one sigma. 95.4% within two sigma. And 99.7% within three sigma. A 5-sigma event has a probability of roughly 0.00003%.',
        note: '±1σ: 68.3% | ±2σ: 95.4% | ±3σ: 99.7% | 5σ: ~1 in 3.5 million',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'Sigma rules: ±1σ = 68.3%, ±2σ = 95.4%, ±3σ = 99.7%, 5σ ≈ once every 13,900 years',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'But here is the reality check. The S&P 500 has experienced at least 20 daily moves exceeding five sigma between 1990 and 2024. Events that should happen once every several thousand years have happened multiple times per decade. The normal distribution is dangerously wrong in the tails.',
      },
      {
        type: 'check',
        question: 'Under the normal distribution, how often should a 5-sigma daily loss occur?',
        options: [
          'About once per year',
          'About once per decade',
          'About once every 13,900 years',
          'It should never occur',
        ],
        correctIndex: 2,
        onCorrect: 'Correct! A 5-sigma event under the normal distribution should happen approximately once every 13,900 years. Yet in real markets, we see such events roughly every 3 years. This enormous discrepancy is why the normal model fails.',
        onWrong: 'Under the normal distribution, a 5-sigma event should happen about once every 13,900 years. The fact that it actually occurs every 3 years or so demonstrates that the normal model massively underestimates tail risk.',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: 'So you are telling me our model was built on a lie?',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 3: Fat Tails and Moments (15 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Not a lie, Kenji. An approximation. The normal distribution works reasonably well for typical conditions. But reasonably well and safe for managing a pension fund are very different standards. To understand HOW returns deviate from normality, we need to look beyond mean and variance. We need the third and fourth moments.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'The third moment is skewness. It measures asymmetry. The formula is the average of cubed z-scores. Cubing preserves the sign, so negative returns pull it left. Most equity return series exhibit negative skewness, meaning large losses are more frequent than large gains.',
        note: 'Skewness: S = 0 symmetric, S < 0 left tail heavier (more large losses)',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'Skewness: S < 0 means negatively skewed (more extreme losses than gains)',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'The fourth moment is excess kurtosis. It is the average of fourth-power z-scores, minus 3. The fourth power amplifies extreme values, so fat tails push it high. When kurtosis equals zero, we have normal-sized tails. When it is positive, the tails are fat. Financial returns are strongly leptokurtic.',
        note: 'Excess kurtosis: K = 0 normal, K > 0 fat tails (leptokurtic)',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'Excess kurtosis: K > 0 means fat tails. Financial returns typically show K >> 0.',
      },
      {
        type: 'check',
        question: 'What is the excess kurtosis of the S&P 500 daily returns? Most people guess 0 to 3.',
        options: [
          'About 0 (same as normal)',
          'About 3',
          'About 10 or higher',
          'About -2 (thinner than normal)',
        ],
        correctIndex: 2,
        onCorrect: 'Surprised? The S&P 500 daily returns typically show excess kurtosis of 10 or higher. This means extreme events are massively more frequent than the normal distribution predicts.',
        onWrong: 'The answer is about 10 or higher! Most people drastically underestimate the fat tails of financial returns. This enormous kurtosis means the probability of extreme events is far greater than normal predicts.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'One promising remedy is the Student-t distribution. It has heavier tails controlled by the degrees-of-freedom parameter nu. For typical equity returns, a nu of 4 to 8 provides a much better fit than the normal. We will use it extensively in GARCH models starting Week 3.',
      },
      {
        type: 'lecture',
        character: 'alex',
        text: 'So fat tails mean extreme events happen more often than normal predicts. And negative skewness means big drops are more likely than big jumps. That is exactly what happened to Kenji\'s portfolio.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 4: Break (10 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'narrator',
        text: 'Take a 10-minute break. When we return, we will learn how to formally test for normality and visualize the departure using QQ plots and the Jarque-Bera test.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 5: QQ Plot and JB Test (15 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Welcome back. Quick recap: we learned that returns have fat tails with kurtosis far above zero, and negative skewness. Now, how do we formally test normality and visualize departures?',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'A QQ plot compares the quantiles of your observed data against theoretical normal quantiles. If the data are truly normal, the points fall neatly along a straight 45-degree line. But for financial returns, you almost always see an S-shaped curve, which means fat tails.',
      },
      {
        type: 'visual',
        component: 'QQPlotDisplay',
        caption: 'QQ plot interpretation: points on the line = normal; S-shape = fat tails',
      },
      {
        type: 'check',
        question: 'On a QQ plot of financial returns, what pattern would you expect to see?',
        options: [
          'Points falling perfectly on the 45-degree line',
          'An S-shaped curve with points flying off the line at both ends',
          'A flat horizontal line',
          'Random scatter with no pattern',
        ],
        correctIndex: 1,
        onCorrect: 'Exactly! The S-shape is the visual fingerprint of fat tails. Points above the line at the left end indicate a heavier left tail; points below the line at the right end indicate a heavier right tail.',
        onWrong: 'Financial returns almost always show an S-shaped curve on a QQ plot. The S-shape is the visual signature of fat tails, the most common departure from normality in finance.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'The Jarque-Bera test formalizes this visual check. It combines skewness and kurtosis into a single test statistic: JB equals T over 6, times the quantity S-squared plus K-squared over 4. Under the null hypothesis of normality, JB follows a chi-squared distribution with 2 degrees of freedom. We reject normality if JB exceeds 5.99.',
        note: 'JB = (T/6)(S² + K²/4). Reject normality if JB > 5.99 (chi-squared critical value at 5%)',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'Jarque-Bera test: JB = (T/6)(S² + K²/4). Reject normality if JB > 5.99.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'In practice, financial return series produce JB statistics in the hundreds or thousands. The p-value is essentially zero. The evidence against normality is not just statistically significant; it is overwhelming.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 6: Python Live Demo (15 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'priya',
        text: 'Theory is important, but let us see it with real data. Alex, open your laptop. We are going to pull actual market data and see these effects for ourselves.',
      },
      {
        type: 'visual',
        component: 'CodeDisplay',
        caption: 'Code Block 1: Import libraries, download S&P 500 data with yfinance, compute log returns.',
        props: { codeBlock: 1 },
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'We start by downloading S&P 500 daily data and computing the log returns. Now let us look at the descriptive statistics. Pay attention to the skewness and kurtosis values.',
      },
      {
        type: 'visual',
        component: 'CodeDisplay',
        caption: 'Code Block 2: Compute descriptive statistics (mean, std, skewness, excess kurtosis) and run the Jarque-Bera test.',
        props: { codeBlock: 2 },
      },
      {
        type: 'visual',
        component: 'CodeDisplay',
        caption: 'Code Block 3: Generate histogram with normal overlay and QQ plot. The QQ plot is the "wow moment."',
        props: { codeBlock: 3 },
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Look at the histogram: the peak is taller and the tails are heavier than the normal curve. The distribution is leptokurtic. And the QQ plot, that unmistakable S-shape, is the visual proof that normality is rejected. Every point flying off the 45-degree line represents an extreme event that the normal model said was essentially impossible.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 7: Application (10 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'narrator',
        text: 'After a working lunch, Alex presents findings to the team. The screen shows the histogram and QQ plot of Kenji\'s pension fund equity portfolio.',
      },
      {
        type: 'lecture',
        character: 'alex',
        text: 'Here are the results for Kenji\'s portfolio. Skewness is negative 0.73. Excess kurtosis is 13.4. The Jarque-Bera statistic is 4,892 with a p-value of essentially zero. The data is screaming: this is not normal.',
      },
      {
        type: 'visual',
        component: 'DataTable',
        caption: 'Table 1.1: Tail probability comparison. Prob(loss > 3σ): Normal 0.13% vs. Actual 1.7%. Prob(loss > 5σ): Normal 0.00003% vs. Actual 0.12%.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Look at the tail probability comparison. Under the normal model, a 5-sigma loss should happen once every 13,900 years. In Kenji\'s data, it happened roughly every 3 years. Fourteen thousand years versus three years. The normal model is dangerously wrong in the tails.',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: 'Fourteen thousand years versus three years. Now I understand why my board was furious.',
      },
      {
        type: 'check',
        question: 'You are presenting to Kenji\'s pension fund board. What would you tell them about their current risk model?',
        options: [
          'The model is fine; March 2020 was a once-in-a-lifetime event',
          'The model is fundamentally flawed because it assumes normal tails; we need fat-tailed models',
          'The model just needs a longer data window',
          'We should stop using quantitative models entirely',
        ],
        correctIndex: 1,
        onCorrect: 'Exactly. The issue is not bad luck or insufficient data. The distributional assumption itself is wrong. Fat-tailed models like the Student-t distribution are essential for honest risk assessment.',
        onWrong: 'March 2020 was not a one-off. The data shows extreme losses occur every few years. The root cause is the distributional assumption. Any risk model built on normality will systematically underestimate large losses. We need fat-tailed alternatives.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 8: Discussion (10 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Now that we have seen the problem, let us discuss WHY financial returns are non-normal. There are at least five contributing factors. First: volatility clustering. Calm periods followed by turbulent periods. We will model this with GARCH in Week 3. Second: the leverage effect. Bad news increases volatility more than good news. Week 4 covers this with GJR-GARCH.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Third: herding behavior. Investors panic-selling together amplifies downside moves. Fourth: information asymmetry, where bad news spreads faster than good news. And fifth: market microstructure, including trading halts, margin calls, and forced liquidations that create sudden jumps.',
      },
      {
        type: 'discuss_timer',
        durationMinutes: 3,
        prompt: 'In groups, pick one of the five factors and explain how it contributes to fat tails or negative skewness. Be ready to present your reasoning.',
        guidePoints: [
          'Volatility clustering: mixing calm and turbulent periods creates fat tails even if each period is approximately normal',
          'Leverage effect: bad news drives volatility up more than good news, causing negative skewness',
          'Herding: coordinated selling amplifies downside moves',
          'Information asymmetry: bad news travels faster, leading to sharper drops',
          'Microstructure: margin calls and forced liquidation create cascading price jumps',
        ],
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Excellent discussions. Some of these factors can be captured by better statistical models, like clustering and leverage. Others require behavioral or institutional explanations. This is precisely why we need an entire eight-week course. Each week, we add another layer of understanding.',
      },
      {
        type: 'check',
        question: 'Which factor causing non-normality will be directly modeled by GARCH in Week 3?',
        options: [
          'Herding behavior',
          'Information asymmetry',
          'Volatility clustering',
          'Market microstructure',
        ],
        correctIndex: 2,
        onCorrect: 'Correct! GARCH is specifically designed to capture volatility clustering, the tendency for large returns to be followed by large returns. This is one of the most important stylized facts of financial data.',
        onWrong: 'GARCH models are designed to capture volatility clustering: the empirical observation that calm and turbulent periods tend to group together. Herding and information asymmetry are behavioral, while microstructure involves institutional mechanisms.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 9: Wrap-up and Mission (5 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Let us wrap up with five key takeaways. One: always work with returns, not prices, because returns are approximately stationary and time-additive. Two: normality fails. Returns exhibit fat tails and negative skewness, so extreme losses are far more frequent than normal predicts.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Three: four moments matter. Mean and variance alone are woefully insufficient. Four: QQ plots and the Jarque-Bera test are your first-line diagnostic tools. And five: any risk model built on normality will systematically underestimate large losses. This is not a theoretical curiosity; it cost Kenji\'s fund hundreds of millions.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'For Mission 1, download data for three indices: the S&P 500, Nikkei 225, and FTSE 100. For each, compute the four moments, run the Jarque-Bera test, and create the histogram and QQ plot. Build a comparison table and write a 200-word executive summary.',
        note: 'Mission 1: 3 indices, 4 moments, JB test, histogram, QQ plot, comparison table, 200-word summary',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: 'You have shown me the problem. Now show me you can measure it. How volatile is our portfolio RIGHT NOW?',
      },
      {
        type: 'lecture',
        character: 'priya',
        text: 'You cannot use a single ruler to measure risk at all times. Next week, we learn to measure volatility and discover that it never stays still.',
      },
    ],
  },
];
