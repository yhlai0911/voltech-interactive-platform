import type { SegmentTeaching } from '@/types';

export const week07Teaching: SegmentTeaching[] = [
  // --- Segment 1: Opening Story (w07-s01, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: 'Before class begins, two numbers are written on the board: 3.0x and 4.0x. Students take their seats and stare at them.' },
      { type: 'lecture', character: 'drLin', text: 'Good morning everyone. Look at these two numbers. For a fund managing ten billion dollars, the difference between them is one billion in additional capital that sits idle -- money you cannot invest. Who can guess what they represent?' },
      { type: 'lecture', character: 'drLin', text: 'These are Basel capital multipliers. 3.0x is the green zone -- your model is trusted. 4.0x is the red zone -- your model has failed, and the regulator forces you to hold a massive capital buffer. Today we learn what separates green from red.' },
      { type: 'lecture', character: 'alex', text: 'So a bad risk model does not just give wrong numbers -- it literally costs the fund billions in locked-up capital?' },
      { type: 'lecture', character: 'drLin', text: 'Exactly. The Japan FSA has scheduled an audit of Kenji\'s VaR model. We have two weeks to prepare a full backtesting report. If the model fails, the fund holds more capital and Kenji faces the board.' },
      { type: 'check', question: 'What is the most significant consequence of a regulator finding a risk model inadequate?', options: ['A fine from the regulatory agency', 'Higher capital requirements that reduce investment returns', 'Termination of the risk manager', 'Mandatory model replacement'], correctIndex: 1, onCorrect: 'Exactly. Higher capital requirements are far more costly than any fine -- they directly reduce the fund\'s ability to generate returns.', onWrong: 'Not quite. While fines and personnel changes can happen, the most financially damaging consequence is higher capital requirements, which lock up billions in idle capital.' },
      { type: 'lecture', character: 'drLin', text: 'Today we build the complete backtesting toolkit: the Kupiec test, the Christoffersen test, the Basel traffic light, and stress testing. By the end, we can write Kenji\'s FSA report.' },
    ],
  },

  // --- Segment 2: Backtesting Logic (w07-s02, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Backtesting is simple in concept: compare your VaR predictions against what actually happened. If your 99% VaR is correct, you should see breaches -- losses exceeding VaR -- about one percent of the time.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Hit sequence definition', props: { formula: 'I_t = 1 \\text{ if } r_t < -\\text{VaR}_t, \\quad 0 \\text{ otherwise}' } },
      { type: 'lecture', character: 'drLin', text: 'This binary sequence is what we call the hit sequence. A one means a breach occurred -- the model was wrong that day. A zero means the model held. Every backtesting method analyzes this sequence.' },
      { type: 'lecture', character: 'alex', text: 'So we need two things to be true: the right total number of breaches, and the breaches should be spread out randomly rather than bunched together?' },
      { type: 'lecture', character: 'drLin', text: 'Precisely. Those are the two properties: unconditional coverage and independence. A model that gets the count right but clusters all breaches in one week is dangerously flawed -- it failed to adapt when conditions changed.' },
      { type: 'check', question: 'A VaR model produces exactly the correct number of breaches over a year, but all breaches occur in a single week. Is this a good model?', options: ['Yes, it has the correct breach rate', 'No, the clustered breaches indicate the model fails to adapt', 'It depends on the confidence level', 'Yes, as long as the Kupiec test passes'], correctIndex: 1, onCorrect: 'Right! Clustering means the model does not adapt to changing volatility conditions, even if the overall count looks fine.', onWrong: 'Think again. Even with the correct total count, clustering signals that the model cannot adapt to changing market conditions -- a serious flaw.' },
    ],
  },

  // --- Segment 3: Kupiec Test (w07-s03, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'The first formal test is the Kupiec Proportion of Failures test. The intuition is straightforward: we expected 2.5 breaches in 250 days at the 99% level. We observed x breaches. Is x close enough to 2.5?' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Kupiec POF likelihood ratio', props: { formula: 'LR_{uc} = -2 \\ln\\left[\\frac{p^x (1-p)^{T-x}}{\\hat{p}^x (1-\\hat{p})^{T-x}}\\right] \\sim \\chi^2(1)' } },
      { type: 'lecture', character: 'drLin', text: 'We compare two worlds: one where p equals 0.01, meaning the model is correct, and one where p equals x over T, meaning we let the data tell us the true breach rate. The further apart these worlds are, the larger the test statistic.' },
      { type: 'lecture', character: 'priya', text: 'The critical value at 5% significance is 3.841 from the chi-squared distribution with one degree of freedom. If LR exceeds that threshold, we reject the model.' },
      { type: 'check', question: 'A 99% VaR model produces 7 breaches in 250 trading days. The expected number was 2.5. The Kupiec LR statistic is 5.34. Does the model pass?', options: ['Yes, 7 breaches is close to 2.5', 'No, LR of 5.34 exceeds the critical value of 3.841', 'Cannot determine without more information', 'Yes, because 7 is in the green zone'], correctIndex: 1, onCorrect: 'Correct! Since 5.34 > 3.841, we reject the null hypothesis that the model is correctly calibrated. The breach rate is significantly too high.', onWrong: 'Remember: we reject when LR exceeds 3.841. Here, 5.34 > 3.841, so the model fails the Kupiec test.' },
      { type: 'lecture', character: 'drLin', text: 'One critical caveat: the Kupiec test has low statistical power with only 250 observations. It cannot reliably distinguish a 1% breach rate from a 2% rate. This is a fundamental limitation of backtesting with limited data, not a bug in the test.' },
      { type: 'lecture', character: 'alex', text: 'And the test is two-sided, right? It rejects both too many and too few breaches. Zero breaches in 250 days means the model is too conservative -- the institution is holding excess capital unnecessarily.' },
      { type: 'lecture', character: 'drLin', text: 'Exactly. An overly conservative model wastes capital just as surely as an aggressive model creates risk. The regulator wants accuracy, not just safety.' },
    ],
  },

  // --- Segment 4: Christoffersen Test (w07-s04, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Kupiec checks the count, but what about timing? A model could pass Kupiec with flying colors while clustering all its breaches in one terrible week. The Christoffersen test catches this.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Transition matrix for breach independence', props: { formula: '\\pi_{01} = \\frac{n_{01}}{n_{00}+n_{01}}, \\quad \\pi_{11} = \\frac{n_{11}}{n_{10}+n_{11}}' } },
      { type: 'lecture', character: 'drLin', text: 'We build a two-by-two transition matrix. The rows are yesterday\'s state -- breach or no breach. The columns are today\'s state. We count how often each transition occurs: n-zero-zero, n-zero-one, n-one-zero, n-one-one.' },
      { type: 'lecture', character: 'priya', text: 'Independence means pi-zero-one equals pi-one-one. In other words, the probability of a breach today is the same regardless of whether yesterday was a breach. If pi-one-one is larger, breaches cluster -- the model adapts too slowly.' },
      { type: 'lecture', character: 'drLin', text: 'Let me draw two sequences on the board. Sequence A: breaches at days 3 and 7 out of 10. Nicely spread out. Sequence B: breaches at days 7, 8, and 9. Clustered. Both could have similar breach rates, but B reveals a serious model deficiency.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Conditional coverage test', props: { formula: 'LR_{cc} = LR_{uc} + LR_{ind} \\sim \\chi^2(2), \\quad \\text{Reject if } LR_{cc} > 5.991' } },
      { type: 'lecture', character: 'drLin', text: 'The conditional coverage test combines both components. We reject at five percent if LR-cc exceeds 5.991 from chi-squared with two degrees of freedom. Passing both tests is required for regulatory acceptance.' },
      { type: 'check', question: 'A model passes the Kupiec test but fails the Christoffersen independence test. What does this mean?', options: ['The model has the correct overall breach rate but breaches are clustered', 'The model has too many breaches', 'The model is too conservative', 'The model is fine for regulatory purposes'], correctIndex: 0, onCorrect: 'Exactly. The overall count is right, but the timing is wrong -- breaches cluster, meaning the model fails to adapt to changing conditions.', onWrong: 'Passing Kupiec means the count is correct. Failing independence means breaches are not spread out -- they cluster. The model fails to adapt.' },
    ],
  },

  // --- Segment 5: Break (w07-s05, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: 'Ten-minute break. When we return, we enter the regulatory world -- the Basel traffic light system and stress testing.' },
    ],
  },

  // --- Segment 6: Basel Traffic Light (w07-s06, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Welcome back. Quick recap: Kupiec tests the breach count, Christoffersen tests the timing. Now the regulator synthesizes everything into a simple, powerful classification: the Basel traffic light.' },
      { type: 'visual', component: 'VaRBacktestChart', caption: 'Basel traffic light zones and capital multipliers' },
      { type: 'lecture', character: 'drLin', text: 'Green zone: zero to four breaches in 250 days, capital multiplier of 3.0x. Yellow zone: five to nine breaches, multipliers ranging from 3.4x to 3.85x. Red zone: ten or more breaches, multiplier jumps to 4.0x.' },
      { type: 'lecture', character: 'kenji', text: 'For my fund with five billion in VaR-based market risk, green zone means fifteen billion in capital. Red zone means twenty billion. That five billion difference is money sitting idle -- it cannot be invested. The financial cost is staggering.' },
      { type: 'check', question: 'Classify the following into Basel zones: a model with 4 breaches in 250 days.', options: ['Green zone (0-4 breaches)', 'Yellow zone (5-9 breaches)', 'Red zone (10+ breaches)', 'Cannot classify without test statistics'], correctIndex: 0, onCorrect: 'Right! Four breaches falls within the green zone boundary of 0-4 breaches. The multiplier is 3.0x.', onWrong: 'Four breaches is within the green zone boundary (0 to 4 breaches), so the capital multiplier is 3.0x.' },
      { type: 'lecture', character: 'drLin', text: 'In the yellow zone, each additional breach costs more capital. Five breaches gives 3.4x, six gives 3.5x, all the way up to nine breaches at 3.85x. Every single extra breach matters financially.' },
      { type: 'lecture', character: 'alex', text: 'Could a bank design a model that deliberately aims for exactly four breaches to stay at the green zone boundary? That seems like gaming the system.' },
      { type: 'lecture', character: 'drLin', text: 'Great question. Regulators counter this with qualitative reviews and stress testing requirements. The FRTB reforms also shift from VaR to Expected Shortfall, which makes gaming much harder. The system has layers of defense.' },
    ],
  },

  // --- Segment 7: Python Live Demo (w07-s07, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'priya', text: 'Let us run the full backtesting pipeline in Python. We are going to test our GJR-GARCH VaR model and generate the actual numbers for Kenji\'s FSA report.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Rolling GJR-GARCH VaR backtest', props: { code: 'rolling_var_backtest(data, model="gjr-garch", dist="t", window=500)' } },
      { type: 'lecture', character: 'priya', text: 'The rolling backtest re-estimates the GJR-GARCH model for each day using a 500-day window, then computes the one-day-ahead VaR. This takes five to ten minutes to run.' },
      { type: 'visual', component: 'VaRBacktestChart', caption: 'Returns vs. VaR boundary with breach markers' },
      { type: 'lecture', character: 'alex', text: 'Look at how the VaR boundary adapts during the COVID period in March 2020. It widens dramatically as the model captures the volatility spike. You can actually count the breaches visually.' },
      { type: 'lecture', character: 'priya', text: 'Now the statistical tests. The Kupiec p-value is well above 0.05, and the Christoffersen p-value is also above 0.05. The model passes both tests and falls in the Basel green zone.' },
      { type: 'visual', component: 'VaRBacktestChart', caption: 'Cumulative breach plot vs. expected 1% line' },
      { type: 'lecture', character: 'priya', text: 'The cumulative breach plot tells the full story. The actual cumulative breaches track very close to the expected one percent line. When the lines diverge, the model is miscalibrated. Ours stays tight -- that is a green zone result.' },
    ],
  },

  // --- Segment 8: Stress Testing (w07-s08, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Backtesting validates the model under conditions we have already observed. But what about scenarios we have never seen? That is where stress testing comes in.' },
      { type: 'lecture', character: 'drLin', text: 'There are two types. Historical stress tests replay actual crises -- the Global Financial Crisis of 2008, COVID-19 in 2020, Brexit in 2016 -- through the current portfolio. Hypothetical stress tests design plausible but unprecedented scenarios.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Exceedance ratio', props: { formula: '\\text{Exceedance Ratio} = \\frac{\\text{Scenario Loss}}{\\text{VaR (or ES)}}' } },
      { type: 'lecture', character: 'priya', text: 'The exceedance ratio tells us how far beyond our risk measure each scenario pushes us. A ratio of 3.5 means the scenario loss is three and a half times the VaR. Anything above one means the scenario exceeds our daily risk estimate.' },
      { type: 'visual', component: 'RiskMeasureDashboard', caption: 'Stress test exceedance ratios for historical and hypothetical scenarios' },
      { type: 'check', question: 'Which type of stress test helps evaluate scenarios that have never occurred in history?', options: ['Historical stress test', 'Hypothetical stress test', 'Kupiec backtest', 'Monte Carlo VaR'], correctIndex: 1, onCorrect: 'Correct! Hypothetical stress tests design plausible unprecedented scenarios to test model resilience beyond historical experience.', onWrong: 'Historical tests replay past crises. Hypothetical stress tests are designed to evaluate unprecedented but plausible scenarios.' },
      { type: 'lecture', character: 'drLin', text: 'Key insight: VaR and ES are designed for day-to-day risk management, not crisis prediction. Stress tests complement backtesting by exploring the extreme conditions that backtesting simply cannot cover.' },
    ],
  },

  // --- Segment 9: Application and Discussion (w07-s09, 12 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Let us discuss the FSA report case. VolTech must present backtesting results for both the Nikkei 225 and S&P 500. Here is the summary data.' },
      { type: 'visual', component: 'DataTable', caption: 'FSA backtest results: Nikkei and S&P 500', props: { headers: ['Index', 'Breaches/500d', 'Kupiec p', 'Christoffersen p', 'Zone'], rows: [['Nikkei 225', '7', '0.265', '0.144', 'Green'], ['S&P 500', '5', '1.000', '0.571', 'Green']] } },
      { type: 'lecture', character: 'kenji', text: 'The Nikkei has a higher breach rate -- 1.4 percent versus 1.0 percent. The Kupiec test passes, but should I be concerned about that elevated rate?' },
      { type: 'lecture', character: 'drLin', text: 'Good instinct. Remember, the Kupiec test has low power. It cannot reliably distinguish one percent from two percent with only 500 observations. I would flag the Nikkei for monitoring but it is not statistically significant.' },
      { type: 'discuss_timer', durationMinutes: 5, prompt: 'Could banks design VaR models that deliberately aim for exactly 4 breaches to game the Basel system? What safeguards exist?', guidePoints: ['FRTB reforms shifting from VaR to ES', 'Qualitative regulatory oversight', 'Desk-level testing requirements', 'The move from VaR to ES makes gaming harder'] },
      { type: 'lecture', character: 'drLin', text: 'Remember 2008. Many banks had green-zone VaR models that failed catastrophically during the crisis. Backtesting is backward-looking. A model validated on benign data may completely fail under novel conditions. No single test guarantees model adequacy.' },
    ],
  },

  // --- Segment 10: Wrap-up and Mission (w07-s10, 8 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Let me summarize the six key takeaways. First: backtesting validates VaR models by comparing predictions to realized losses. The hit sequence is the fundamental object of analysis.' },
      { type: 'lecture', character: 'drLin', text: 'Second: Kupiec tests unconditional coverage. Third: Christoffersen adds independence. Fourth: the Basel traffic light classifies models into green, yellow, and red zones with increasing capital multipliers. Fifth: stress testing evaluates extreme scenarios that backtesting cannot cover.' },
      { type: 'lecture', character: 'drLin', text: 'And sixth: a model can pass all backtests and still fail catastrophically under novel conditions, as we learned from the 2008 Global Financial Crisis.' },
      { type: 'lecture', character: 'drLin', text: 'For Mission 7, you will run the full backtesting pipeline for both the Nikkei 225 and S&P 500. Compute the Kupiec and Christoffersen statistics, classify under Basel zones, run three historical and two hypothetical stress scenarios, and write the FSA audit report.' },
      { type: 'lecture', character: 'priya', text: 'I have been building something in the background. Random Forests, LSTMs, and a hybrid that combines GARCH with machine learning. QuantStar claims fifty percent improvement. Let us see if that is real or just marketing.' },
      { type: 'lecture', character: 'kenji', text: 'Show me the evidence. Next week: can AI actually beat the models we have built over the past seven weeks? The answer may surprise you.' },
    ],
  },
];
