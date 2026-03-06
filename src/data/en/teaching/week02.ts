import type { SegmentTeaching } from '@/types';

/**
 * Week 02 "Measuring Volatility" teaching script
 *
 * 10 segments (aligned 1:1 with lesson week02):
 *   seg 0: Review and Opening (w02-s01)              — 6 steps
 *   seg 1: Rolling Window Volatility (w02-s02)       — 8 steps
 *   seg 2: EWMA (w02-s03)                            — 8 steps
 *   seg 3: Realized Volatility (w02-s04)             — 5 steps
 *   seg 4: Break (w02-s05)                           — 1 step
 *   seg 5: The VIX (w02-s06)                         — 7 steps
 *   seg 6: Python Live Demo (w02-s07)                — 6 steps
 *   seg 7: Application (w02-s08)                     — 6 steps
 *   seg 8: Stylized Facts and Discussion (w02-s09)   — 7 steps
 *   seg 9: Wrap-up and Mission (w02-s10)             — 6 steps
 *                                              Total: ~60 steps
 */
export const week02Teaching: SegmentTeaching[] = [
  // ═══════════════════════════════════════════════════
  // Segment 0: Review and Opening (8 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Welcome back, everyone. Quick recap from last week: financial returns have fat tails with kurtosis far above zero, negative skewness, and the Jarque-Bera test crushes normality every time. The normal distribution is dangerously wrong in the tails.',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: 'Dr. Lin, I have been thinking all week. You showed me the problem with the distribution. But my board keeps asking a simpler question: how volatile is our portfolio RIGHT NOW?',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Excellent question, Kenji. And here is the key insight for today: you cannot use a single ruler to measure risk at all times. Today we learn four different rulers, and we will find out which one warned us fastest when COVID-19 hit.',
      },
      {
        type: 'lecture',
        character: 'alex',
        text: 'Can we not just compute the standard deviation of returns?',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'We can. But which returns? The last 20 days? The last year? The answer changes dramatically depending on the window you choose. That is where the difficulty lies.',
      },
      {
        type: 'check',
        question: 'Why is measuring "current" volatility more complex than just computing a standard deviation?',
        options: [
          'Standard deviation is too difficult to compute',
          'Volatility changes over time, so the answer depends on the measurement window and method',
          'We should use the mean instead of standard deviation',
          'Current volatility cannot be measured at all',
        ],
        correctIndex: 1,
        onCorrect: 'Exactly. Volatility is time-varying. Different windows and different methods give different answers, and the choice matters enormously for risk management.',
        onWrong: 'The key issue is that volatility changes over time. Computing a standard deviation over 20 days gives a very different answer than over 252 days. The measurement window and method matter enormously.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 1: Rolling Window Volatility (17 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: 'The simplest approach is the rolling window. Pick a window of N days, compute the standard deviation within that window, and slide forward one day at a time. It is intuitive and easy to implement.',
        note: 'Rolling window: sigma_roll = sqrt(1/(N-1) * sum(r_{t-i} - r_bar)^2)',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'Rolling window volatility: sigma_roll,t = sqrt(1/(N-1) * sum_{i=0}^{N-1} (r_{t-i} - r_bar)^2)',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'But here is the fundamental trade-off. A short window, say 20 days, is responsive to regime shifts but noisy. A long window, say 252 days, is smooth and stable but takes months to react. There is no universally correct window length.',
        note: 'Short window (N=20): responsive but noisy. Long window (N=252): smooth but slow.',
      },
      {
        type: 'visual',
        component: 'VolatilityComparison',
        caption: '20-day vs 252-day rolling window: responsiveness versus stability trade-off',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'There is a deeper problem with the rolling window: equal weighting. A return from 250 days ago counts exactly the same as yesterday\'s return. When markets shift abruptly, the rolling window is painfully slow to reflect the new reality.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'And watch out for ghosting artifacts. When an extreme observation drops out of the window after N days, there is a sudden artificial drop in volatility. This is purely an artifact of the hard boundary, and it can mislead risk managers.',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: 'In February 2020, our 252-day estimate was about 12%. By mid-March, actual volatility had exploded. But our yearly rolling window still included all of 2019\'s calm data. It was like measuring a hurricane with last summer\'s weather report.',
      },
      {
        type: 'check',
        question: 'What is the main limitation of the rolling window approach to measuring volatility?',
        options: [
          'It cannot be computed without intraday data',
          'It uses equal weights, so old data counts the same as recent data, making it slow to react',
          'It always overestimates volatility',
          'It requires a minimum of 1,000 observations',
        ],
        correctIndex: 1,
        onCorrect: 'Exactly. Equal weighting means old observations count just as much as recent ones. This makes the rolling window slow to detect regime changes, and it also produces ghosting artifacts when extreme observations drop out.',
        onWrong: 'The critical limitation is equal weighting. Every observation in the window, whether from yesterday or from months ago, receives identical weight. This makes the measure sluggish during regime shifts.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 2: EWMA (20 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: 'The equal-weighting problem has a natural solution: give more weight to recent data and let old data fade away exponentially. This is the Exponentially Weighted Moving Average, or EWMA.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Here is the most important formula in this chapter. Today\'s variance estimate is a blend of yesterday\'s estimate, with weight lambda, and yesterday\'s squared return, with weight one minus lambda. Simple and elegant.',
        note: 'EWMA: sigma_t^2 = lambda * sigma_{t-1}^2 + (1-lambda) * r_{t-1}^2',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'EWMA recursive formula: sigma_t^2 = lambda * sigma_{t-1}^2 + (1-lambda) * r_{t-1}^2',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'J.P. Morgan\'s RiskMetrics in 1996 standardized lambda at 0.94 for daily data. This means yesterday\'s squared return gets a weight of 0.06, and the effective window is approximately 1 divided by 1 minus 0.94, which is about 17 days. Old data fades smoothly; there is no hard boundary and no ghosting artifacts.',
        note: 'RiskMetrics standard: lambda = 0.94. Effective window ≈ 1/(1-0.94) = 17 days.',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'EWMA weight decay: w_i = (1-lambda) * lambda^{i-1}. Weights decline geometrically.',
      },
      {
        type: 'check',
        question: 'In the EWMA model with lambda = 0.94, what weight does yesterday\'s squared return receive?',
        options: [
          '0.94 (94%)',
          '0.06 (6%)',
          '0.50 (50%)',
          '0.01 (1%)',
        ],
        correctIndex: 1,
        onCorrect: 'Correct! Yesterday\'s squared return gets weight (1 - lambda) = 0.06, while the previous variance estimate carries forward with weight 0.94. This means new information updates the estimate gradually but meaningfully.',
        onWrong: 'The weight on yesterday\'s squared return is (1 - lambda) = 1 - 0.94 = 0.06. The previous variance estimate carries forward with weight lambda = 0.94. This is how EWMA blends old estimates with new information.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Here is an important preview for next week. EWMA is actually a special case of GARCH(1,1) with omega equal to zero and alpha plus beta equal to one. This means EWMA has no long-run mean to return to. Volatility just wanders. GARCH fixes this limitation by adding mean reversion.',
      },
      {
        type: 'check',
        question: 'What key property does EWMA lack that GARCH(1,1) provides?',
        options: [
          'The ability to use daily data',
          'Mean reversion toward a long-run volatility level',
          'The ability to handle negative returns',
          'Exponential weighting of observations',
        ],
        correctIndex: 1,
        onCorrect: 'Exactly! EWMA has no long-run mean, so the variance estimate can drift indefinitely. GARCH(1,1) includes a constant term omega that pulls the variance back toward a long-run equilibrium. This is a critical improvement.',
        onWrong: 'EWMA lacks mean reversion. Because alpha + beta = 1 and omega = 0 in EWMA, there is no long-run variance level for the estimate to return to. GARCH(1,1) fixes this by including a constant term that creates mean reversion.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 3: Realized Volatility (10 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Both the rolling window and EWMA use daily closing prices. But within each day, prices fluctuate continuously. Can we use that intraday information? The answer is yes, and it is called realized volatility.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Realized volatility is simply the sum of squared intraday returns. As the sampling frequency increases, this sum converges to the true integrated variance. It is the closest we can get to measuring actual volatility.',
        note: 'RV_t = sum of r_{t,j}^2. Converges to integrated variance as sampling increases.',
      },
      {
        type: 'visual',
        component: 'FormulaDisplay',
        caption: 'Realized volatility: RV_t = sum_{j=1}^{M} r_{t,j}^2, where M is the number of intraday intervals.',
      },
      {
        type: 'lecture',
        character: 'priya',
        text: 'We typically use 5-minute returns, which gives us 78 observations per trading day. Going to higher frequencies introduces microstructure noise. Bid-ask bounce distorts the estimate. Five minutes is the practical sweet spot.',
      },
      {
        type: 'check',
        question: 'Why do practitioners typically use 5-minute returns for realized volatility rather than 1-second returns?',
        options: [
          '1-second data is not available',
          'Higher frequency data introduces microstructure noise (bid-ask bounce) that distorts the estimate',
          '5-minute returns are easier to download',
          'Realized volatility only works with 5-minute data',
        ],
        correctIndex: 1,
        onCorrect: 'Correct! At very high frequencies, microstructure noise such as bid-ask bounce dominates the signal. Five-minute sampling strikes a balance between capturing intraday variation and avoiding noise contamination.',
        onWrong: 'The issue is microstructure noise. At very high frequencies, the bid-ask bounce and other market microstructure effects contaminate the measurement. Five-minute sampling is the practical compromise between information and noise.',
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
        text: 'Take a 10-minute break. When we return, we will examine the VIX, the market\'s forward-looking volatility gauge, and then build a complete volatility dashboard in Python.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 5: The VIX (15 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: 'The three methods we have covered so far are all backward-looking. They tell you what volatility WAS, not what the market expects it to BE. The VIX takes a fundamentally different approach: it extracts volatility expectations from options prices.',
        note: 'VIX: forward-looking implied volatility derived from S&P 500 option prices.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'The VIX is annualized. When VIX equals 20, the market expects about 20% annual volatility over the next 30 days. It is often called the fear gauge. Normal markets: 12 to 18. Elevated: 20 to 30. Crisis: above 30. Extreme panic: above 50.',
        note: 'VIX interpretation: 12-18 calm, 20-30 elevated, 30+ crisis, 50+ extreme panic',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'On March 16, 2020, the VIX reached 82.69, one of the highest readings in history. But here is the crucial observation: the VIX rose above 40 by late February, BEFORE the worst sell-off. Option traders price in fear before it fully materializes in realized returns.',
      },
      {
        type: 'visual',
        component: 'VolatilityTimeSeries',
        caption: 'VIX during COVID-19: spiked to 82.69 on March 16, 2020. Led the crash by several days.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'There is one more important concept: the variance risk premium. On average, implied volatility exceeds realized volatility. The difference is the premium that option sellers earn for bearing volatility risk. And the volatility smile or smirk in equity markets shows that the market explicitly prices in fat tails and negative skewness.',
        note: 'Variance risk premium: implied vol > realized vol on average.',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: 'So the VIX was screaming danger while our rolling window was still sleeping. If we had watched the VIX, we could have acted sooner.',
      },
      {
        type: 'check',
        question: 'What makes the VIX fundamentally different from rolling window volatility and EWMA?',
        options: [
          'The VIX uses more data points',
          'The VIX is forward-looking, derived from option prices, while rolling and EWMA are backward-looking',
          'The VIX is more accurate',
          'The VIX only works during crises',
        ],
        correctIndex: 1,
        onCorrect: 'Exactly! The VIX is derived from option prices and reflects the market\'s expectation of future volatility. Rolling window and EWMA only look at historical returns. This forward-looking nature is why VIX often leads during crises.',
        onWrong: 'The key distinction is directional: the VIX is forward-looking, extracted from option prices that embed expectations about future volatility. Rolling window and EWMA are backward-looking, computed from historical returns.',
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
        text: 'Time to build our volatility dashboard. We will compare rolling windows, EWMA, and the VIX for the S&P 500 around the COVID-19 period. Open your laptops and follow along.',
      },
      {
        type: 'visual',
        component: 'CodeDisplay',
        caption: 'Code Block 1: Download S&P 500 data and compute 20-day, 60-day, and 252-day rolling volatility (annualized).',
        props: { codeBlock: 1 },
      },
      {
        type: 'visual',
        component: 'CodeDisplay',
        caption: 'Code Block 2: Implement EWMA with lambda = 0.94. Manual for-loop for learning; in production use pandas.ewm().',
        props: { codeBlock: 2 },
      },
      {
        type: 'visual',
        component: 'CodeDisplay',
        caption: 'Code Block 3: Download VIX and plot all measures on one chart with the COVID-19 crash period highlighted.',
        props: { codeBlock: 3 },
      },
      {
        type: 'lecture',
        character: 'alex',
        text: 'Look at that dashboard. The VIX spiked first. EWMA followed within days. But the 252-day rolling window barely moved until April. It is like watching three weather stations report the same storm at different times.',
      },
      {
        type: 'visual',
        component: 'GARCHVolatilityDashboard',
        caption: 'Complete volatility dashboard: Rolling 20d, Rolling 252d, EWMA, and VIX during COVID-19.',
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
        text: 'Alex projects the volatility dashboard on the screen. Kenji traces the lines with his finger, comparing how each measure responded during the COVID-19 crisis.',
      },
      {
        type: 'visual',
        component: 'DataTable',
        caption: 'Table 2.1: Speed of response. Rolling 20d: 8.2% to 89.7%. Rolling 252d: 12.1% to 23.8%. EWMA: 10.5% to 83.4%. VIX: 13.7% to 82.7%.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'VIX led everything: it crossed 30% on February 24th, four days before the S&P 500 entered bear market territory. EWMA was the fastest backward-looking measure: exponential weighting meant the February sell-off immediately dominated the estimate. And the rolling 252-day was nearly useless, diluted by eight months of calm 2019 data even at the crisis peak.',
      },
      {
        type: 'lecture',
        character: 'kenji',
        text: 'EWMA would have given us a warning signal at least a week earlier than our 252-day window. That week could have saved us hundreds of millions of yen.',
      },
      {
        type: 'check',
        question: 'For daily risk monitoring of a portfolio, which volatility measure would you recommend as the primary backward-looking tool?',
        options: [
          'Rolling 252-day window for stability',
          'Rolling 20-day window for responsiveness',
          'EWMA with lambda = 0.94 for the best balance of responsiveness and smoothness',
          'Realized volatility from 5-minute returns',
        ],
        correctIndex: 2,
        onCorrect: 'Excellent choice. EWMA with lambda = 0.94 strikes the best balance for daily risk monitoring: it responds quickly to new information while remaining smooth enough to avoid false alarms.',
        onWrong: 'For daily risk monitoring, EWMA with lambda = 0.94 is generally the best backward-looking choice. It responds much faster than a 252-day window, is smoother than a 20-day window, and does not require intraday data like realized volatility.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'The lesson is clear: speed of detection matters enormously in risk management. A week\'s early warning could save hundreds of millions. The right measurement tool is not a luxury. It is a necessity.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // Segment 8: Stylized Facts and Discussion (10 min)
  // ═══════════════════════════════════════════════════
  {
    steps: [
      {
        type: 'lecture',
        character: 'drLin',
        text: 'EWMA is better than a fixed rolling window, but it is still relatively simple. Before we build better models, let us catalog what we know about volatility. There are five stylized facts that any good model must capture.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Fact one: clustering. Large returns tend to follow large returns. Fact two: mean reversion. Volatility tends to return to a long-run average. Fact three: asymmetry. Negative returns increase future volatility more than positive returns of the same magnitude.',
        note: 'Stylized facts: 1) clustering, 2) mean reversion, 3) asymmetry, 4) long memory, 5) co-movement',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Fact four: long memory. The autocorrelation of absolute returns decays very slowly. And fact five: co-movement. During crises, volatility increases across markets simultaneously. These five facts are the design specifications for any good volatility model.',
      },
      {
        type: 'check',
        question: 'Which stylized fact of volatility does the rolling window approach capture well?',
        options: [
          'Clustering',
          'Mean reversion',
          'Asymmetry',
          'None of the above; it captures none of them well',
        ],
        correctIndex: 3,
        onCorrect: 'Correct! The rolling window, with its equal weights and hard boundary, captures none of the five stylized facts particularly well. EWMA captures clustering partially. It takes GARCH and its extensions to address these properties systematically.',
        onWrong: 'The rolling window actually captures none of the stylized facts well. Its equal weights and hard boundary are poorly suited to the dynamic, asymmetric, mean-reverting nature of volatility. This motivates the more sophisticated models we will study.',
      },
      {
        type: 'discuss_timer',
        durationMinutes: 3,
        prompt: 'Consider five scenarios: a portfolio manager making monthly allocation decisions, a risk manager computing daily VaR, a derivatives trader pricing options, a regulator assessing systemic risk, and an academic researcher. Which volatility measure would you recommend for each?',
        guidePoints: [
          'Portfolio manager (monthly): rolling 60-252 day for stability',
          'Risk manager (daily VaR): EWMA or short rolling window for responsiveness',
          'Derivatives trader: VIX / implied volatility since options are forward-looking',
          'Regulator: multiple measures including realized volatility for accuracy',
          'Academic researcher: realized volatility as the gold standard benchmark',
        ],
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'The key takeaway is that there is no single best measure. The right ruler depends on the job. Portfolio managers need stability, so longer windows work. Risk managers need speed, so EWMA wins. Derivatives traders need forward-looking information, so VIX is king. And researchers want the gold standard, which is realized volatility.',
      },
      {
        type: 'check',
        question: 'A derivatives trader pricing equity options should primarily rely on which volatility measure?',
        options: [
          'Rolling 252-day historical volatility',
          'EWMA with lambda = 0.94',
          'Implied volatility (VIX or option-implied)',
          'Realized volatility from 5-minute returns',
        ],
        correctIndex: 2,
        onCorrect: 'Correct! Derivatives traders need forward-looking information since options are bets on future volatility. Implied volatility, derived from option prices themselves, is the natural and most relevant measure.',
        onWrong: 'Derivatives traders need forward-looking information because options are claims on future outcomes. Implied volatility, extracted from option prices, directly reflects market expectations and is the most relevant input for pricing.',
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
        text: 'Let me summarize today\'s six key takeaways. One: volatility is not constant. It clusters, mean-reverts, and responds asymmetrically to good and bad news. Two: the rolling window is simple and intuitive but equal weights make it slow and prone to ghosting artifacts.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Three: EWMA with lambda = 0.94 balances responsiveness and smoothness using exponential weights. Four: realized volatility is the gold standard when intraday data is available. Five: the VIX is forward-looking and often leads realized volatility during crises. And six: there is no one-size-fits-all measure. The right tool depends on the application.',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'For Mission 2, build a volatility dashboard for three indices: the Nikkei 225, S&P 500, and FTSE 100. Compute rolling volatility at 20, 60, and 252 days, plus EWMA. Create a comparison table and write a 200-word memo to Kenji recommending the best measure for daily risk monitoring.',
        note: 'Mission 2: volatility dashboard for 3 indices, rolling (20, 60, 252), EWMA, comparison table, 200-word memo',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'Bonus challenge: try EWMA with lambda values of 0.90, 0.94, and 0.97 on the Nikkei 225. Compare the responsiveness and smoothness. Which lambda would you choose for daily risk management?',
      },
      {
        type: 'lecture',
        character: 'priya',
        text: 'Alex, your dashboard is solid. But does EWMA actually PREDICT tomorrow\'s volatility? Or does it just describe what already happened?',
      },
      {
        type: 'lecture',
        character: 'drLin',
        text: 'That is exactly the right question, Priya. Next week, I am going to show you the model that started it all: GARCH. It gives volatility a memory, and it makes predictions we can test. Next week: GARCH, and discovering that volatility has a memory.',
      },
    ],
  },
];
