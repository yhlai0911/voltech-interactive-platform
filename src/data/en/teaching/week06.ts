import type { SegmentTeaching } from '@/types';

export const week06Teaching: SegmentTeaching[] = [
  // --- Segment 1: Opening Story (w06-s01, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Look at the board. One question: what is the maximum we can lose tomorrow? Take a moment. What would you answer?' },
      { type: 'lecture', character: 'narrator', text: 'Students murmur. Some say everything. Others give vague answers. None are precise.' },
      { type: 'lecture', character: 'drLin', text: 'This is the question every risk manager must answer every single day. The answer is called Value-at-Risk, or VaR. It is the one number that Kenji\'s board demands for the FSA report.' },
      { type: 'lecture', character: 'drLin', text: 'Before we can fix Kenji\'s broken risk model, we need to understand VaR properly. Not the textbook version. The version that regulators demand and traders fear.' },
      { type: 'lecture', character: 'kenji', text: 'In Week 1, my standard parametric VaR with normal distribution said the maximum daily loss was 4.2 percent. The actual loss was 18 percent. That is what happens when the model is wrong.' },
      { type: 'lecture', character: 'drLin', text: 'Now we rebuild VaR properly with all the GARCH machinery behind it. VaR has three ingredients: confidence level, which is how sure you want to be; holding period, which is how long you hold the position; and the return distribution, which is what model drives the numbers. Everything else follows from these three choices.' },
    ],
  },

  // --- Segment 2: VaR Definition (w06-s02, 15 min) ---
  {
    steps: [
      { type: 'visual', component: 'FormulaDisplay', caption: 'VaR definition: loss threshold exceeded with probability 1 - alpha', props: { formula: 'P(L_t > VaR_\\alpha) = 1 - \\alpha' } },
      { type: 'lecture', character: 'drLin', text: 'Value-at-Risk at confidence level alpha is the loss threshold exceeded with probability one minus alpha. For 99 percent VaR, there is a 1 percent chance that the actual loss exceeds VaR on any given day.' },
      { type: 'lecture', character: 'drLin', text: 'Let me make this concrete. 99 percent 1-day VaR of 10 million dollars means: on 99 out of 100 trading days, the portfolio loss will not exceed 10 million. On that 1 bad day out of 100, the loss could be 10 million, 50 million, or 500 million. VaR does not tell you.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'VaR in portfolio terms', props: { formula: 'VaR_\\alpha = -V \\cdot q_{1-\\alpha}(r_t)' } },
      { type: 'lecture', character: 'drLin', text: 'Portfolio value times the return quantile. The negative sign converts the negative quantile to a positive loss number. This is how risk systems report it.' },
      { type: 'check', question: 'A bank reports 99% 1-day VaR. Over 250 trading days, how many days should the loss exceed VaR?', options: ['0 days', '1 day', '2.5 days', '25 days'], correctIndex: 2, onCorrect: 'Exactly. (1 - 0.99) times 250 equals 2.5. We expect breaches. Zero breaches means the model is too conservative.', onWrong: 'The expected number is (1 - 0.99) times 250, which equals 2.5 days. We actually expect some breaches. Zero breaches would mean the model is overly conservative.' },
      { type: 'lecture', character: 'drLin', text: 'Why 99 percent instead of 95? Regulators like Basel and the FSA require 99 percent for capital calculations. Internal risk limits often use 95 percent for more responsive signals. Higher confidence means larger VaR, more capital reserves, safer but more expensive.' },
    ],
  },

  // --- Segment 3: Three VaR Methods (w06-s03, 20 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Now we know what VaR means. The question is: how do we compute it? Three methods, three philosophies.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Method 1: Historical Simulation — sort past returns, pick the quantile', props: { formula: 'VaR_{HS} = -r_{((1-\\alpha) \\cdot W)} \\quad \\text{(sorted returns)}' } },
      { type: 'lecture', character: 'drLin', text: 'Historical Simulation: sort the last W daily returns from worst to best. VaR is the quantile at the 1-minus-alpha level. For 99 percent VaR with W equals 500, it is the 5th worst return. No distributional assumptions needed.' },
      { type: 'lecture', character: 'drLin', text: 'Think of Historical Simulation as driving by looking only in the rearview mirror. If the road behind you was smooth, you assume the road ahead will be too. This works until you hit a sharp curve that was not in your mirror.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Method 2: Parametric VaR with normal and Student-t distributions', props: { formula: 'VaR_\\alpha^{Normal} = -(\\mu_t + z_{1-\\alpha} \\cdot \\sigma_t), \\quad VaR_\\alpha^{t} = -(\\mu_t + t_{1-\\alpha,\\nu} \\cdot s_t)' } },
      { type: 'lecture', character: 'drLin', text: 'Parametric VaR uses GARCH conditional volatility. The z-quantile for 99 percent is negative 2.326. But with a Student-t distribution with 7 degrees of freedom, the quantile is negative 2.998. That produces about 29 percent larger VaR. The heavier tails of the t-distribution make a real difference.' },
      { type: 'lecture', character: 'drLin', text: 'Parametric VaR is like using a mathematical blueprint that updates daily. If you hit a pothole yesterday, tomorrow\'s forecast adjusts immediately through the GARCH sigma update.' },
      { type: 'lecture', character: 'drLin', text: 'Method three: Monte Carlo. Simulate thousands of possible returns from the fitted GARCH model. Sort the simulated returns and take the quantile. Brute force but extremely flexible. It works for any distribution and any portfolio structure.' },
      { type: 'check', question: 'Which VaR method adapts fastest to a sudden market crash?', options: ['Historical Simulation', 'Parametric VaR with GARCH', 'Monte Carlo with fixed parameters', 'All adapt at the same speed'], correctIndex: 1, onCorrect: 'Correct. GARCH-based parametric VaR updates sigma_t daily, so it reacts within days. Historical Simulation is diluted by hundreds of calm days in its window.', onWrong: 'Parametric VaR with GARCH adapts fastest because sigma_t updates daily through the GARCH recursion. Historical Simulation takes weeks because the 500-day window dilutes new information.' },
      { type: 'lecture', character: 'kenji', text: 'Which method should I use for the FSA report?' },
      { type: 'lecture', character: 'drLin', text: 'All of them. And if they disagree, that disagreement itself is valuable information about your model uncertainty.' },
    ],
  },

  // --- Segment 4: Break (w06-s04, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: 'Ten-minute break. When we return, we address VaR\'s most fundamental weakness and the solution that Basel III adopted.' },
    ],
  },

  // --- Segment 5: Expected Shortfall (w06-s05, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Welcome back. We have three methods to compute VaR. But VaR has a fundamental blind spot. Let me expose it.' },
      { type: 'lecture', character: 'drLin', text: 'Two portfolios both have 99 percent VaR of 10 million dollars. Are they equally risky? Portfolio A\'s worst 1 percent losses average 11 million. Portfolio B\'s worst 1 percent losses average 50 million. VaR cannot distinguish them.' },
      { type: 'lecture', character: 'drLin', text: 'VaR is the door to the bad room. It tells you where the door is, but not what is inside. Expected Shortfall opens the door and measures the average damage inside.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Expected Shortfall: average loss given VaR breach', props: { formula: 'ES_\\alpha = -E[r_t \\mid r_t < -VaR_\\alpha]' } },
      { type: 'lecture', character: 'drLin', text: 'Expected Shortfall is the average loss given that VaR is breached. It is always greater than or equal to VaR. For the normal distribution, 99 percent ES is about 1.15 times VaR. For fat-tailed distributions, the ratio is 1.2 to 1.4 times.' },
      { type: 'lecture', character: 'drLin', text: 'Here is a concrete example. With 500 observations and 99 percent VaR, the 5 worst returns might be negative 8.2, negative 7.1, negative 5.9, negative 5.3, and negative 4.8 percent. VaR equals 4.8 percent. ES equals the average of all five: 6.26 percent. ES captures the severity. VaR captures only the threshold.' },
      { type: 'visual', component: 'RiskMeasureDashboard', caption: 'VaR is a threshold; ES measures the average tail loss beyond VaR' },
      { type: 'lecture', character: 'drLin', text: 'ES is a coherent risk measure satisfying four axioms. The critical one is subadditivity: the risk of a combined portfolio should not exceed the sum of individual risks. Diversification should reduce risk. VaR can violate this. Consider two bonds each with 2 percent default probability. Individual 99 percent VaR is zero. But the combined portfolio has a 3.96 percent chance of at least one default, so combined VaR is positive. Zero plus zero should not give a positive number.' },
      { type: 'check', question: 'Why did Basel III FRTB shift from VaR to ES for market risk capital?', options: ['ES is easier to compute', 'ES is always smaller than VaR', 'ES satisfies subadditivity and captures tail severity', 'ES requires fewer assumptions'], correctIndex: 2, onCorrect: 'Exactly. ES is coherent, especially the subadditivity property, and it captures how bad the bad days actually are.', onWrong: 'Basel III chose ES because it satisfies subadditivity, meaning diversification always reduces risk, and it captures tail severity, meaning it measures how bad things get beyond the VaR threshold.' },
    ],
  },

  // --- Segment 6: Python Live Demo (w06-s06, 20 min) ---
  {
    steps: [
      { type: 'lecture', character: 'priya', text: 'Let us implement all three VaR methods and ES in Python. We will see how they behave during the COVID-19 crash, the event that broke Kenji\'s original model.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Step 1: Download S&P 500 data, compute log returns, fit GJR-GARCH(1,1) with Student-t errors' },
      { type: 'lecture', character: 'priya', text: 'Step 1 fits our GJR-GARCH model from Week 5 as the volatility engine. This gives us the conditional sigma we need for parametric VaR.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Step 2: Historical Simulation VaR with 500-day rolling window' },
      { type: 'lecture', character: 'priya', text: 'Step 2 implements Historical Simulation with a 500-day window. Watch how the VaR estimate changes over time. During calm periods, HS VaR is low. It spikes only after crisis returns enter the window.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Step 3: Parametric VaR using GARCH with normal and Student-t quantiles' },
      { type: 'lecture', character: 'priya', text: 'Step 3 computes parametric VaR with both normal and Student-t quantiles. Notice how parametric VaR adapts within days of a large return.' },
      { type: 'visual', component: 'VaRBacktestChart', caption: 'COVID-19 VaR comparison: HS VaR lagged behind parametric VaR by weeks during March 2020' },
      { type: 'lecture', character: 'priya', text: 'This is the key chart. During the COVID crash, parametric VaR spikes immediately as sigma updates. Historical Simulation takes weeks to catch up because the 500-day window dilutes new information. And look at the gap between normal and t VaR. It widens during stress.' },
      { type: 'lecture', character: 'priya', text: 'Finally, the ES results alongside VaR. For the Student-t model, the ES-to-VaR ratio is about 1.25 to 1.35, indicating meaningful tail risk beyond the VaR threshold. For the normal model, the ratio is only about 1.15. The fat tails of the t-distribution make ES substantially larger.' },
    ],
  },

  // --- Segment 7: Application: COVID Crash (w06-s07, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'We have the tools. Now let us apply them to Kenji\'s actual problem: which VaR method should he report to the FSA?' },
      { type: 'visual', component: 'VolatilityTimeSeries', caption: 'VaR method comparison during the COVID-19 crash period (February-April 2020)' },
      { type: 'lecture', character: 'drLin', text: 'On March 16, 2020, Historical Simulation VaR was still based on pre-crisis data. Parametric VaR with GARCH had already doubled. Historical Simulation had over 10 breaches in a single month. This lag nearly cost Kenji\'s fund its green zone status under Basel.' },
      { type: 'check', question: 'If you were Kenji, which VaR method would you report to the FSA?', options: ['Historical Simulation only', 'Parametric VaR with normal distribution', 'GJR-GARCH parametric VaR with Student-t', 'Report all three and explain differences'], correctIndex: 3, onCorrect: 'Excellent. Real-world best practice is to report multiple methods. GJR-GARCH with Student-t is the primary recommendation, but showing all three demonstrates robustness.', onWrong: 'While GJR-GARCH with Student-t is the strongest single choice, best practice is to report all three methods. The differences between them are themselves valuable risk information.' },
      { type: 'lecture', character: 'drLin', text: 'There is also the procyclicality problem. When volatility spikes, VaR increases, forcing the fund to sell risky assets to meet capital requirements. This selling further increases volatility, further increasing VaR. A vicious spiral. This is a systemic risk concern that regulators are still grappling with.' },
    ],
  },

  // --- Segment 8: Discussion — The VaR Debate (w06-s08, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'VaR is the most widely used risk measure in finance, yet it has fierce critics. Let us examine the debate.' },
      { type: 'discuss_timer', durationMinutes: 3, prompt: 'Nassim Taleb called VaR "charlatanry." His argument: VaR measures the boundary of normal losses but says nothing about extreme losses. Is Taleb right?', guidePoints: ['VaR tells you where the door is but not what is behind it', 'ES addresses this criticism by measuring tail severity', 'A bank could have VaR of 10 million but face a 500 million tail loss', 'Yet VaR remains indispensable as a daily communication tool'] },
      { type: 'check', question: 'What if HS VaR says 8 million and parametric VaR says 12 million? What should you report?', options: ['Always report the lower number', 'Always report the higher number', 'Average the two estimates', 'Report the most conservative estimate and explain the gap'], correctIndex: 3, onCorrect: 'Correct. The gap between methods is itself informative. It indicates model uncertainty and should be communicated clearly.', onWrong: 'Best practice is to report the most conservative estimate and explain the difference. The gap itself is useful information about model uncertainty.' },
      { type: 'lecture', character: 'drLin', text: 'VaR is imperfect but indispensable. ES addresses some of its weaknesses. The key lesson is that no single risk metric is sufficient. Good risk management uses multiple measures and stress testing together.' },
    ],
  },

  // --- Segment 9: Wrap-up and Mission (w06-s09, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Let me wrap up with six key takeaways. First, VaR is a quantile-based measure: the loss threshold exceeded with probability 1 minus alpha. Three ingredients: confidence level, holding period, and return distribution.' },
      { type: 'lecture', character: 'drLin', text: 'Second, Historical Simulation is non-parametric but slow to adapt. Parametric VaR with GARCH adapts quickly but depends on distributional assumptions. Monte Carlo is flexible but computationally expensive.' },
      { type: 'lecture', character: 'drLin', text: 'Third, Student-t VaR is more conservative than normal VaR because the t-distribution has heavier tails. The difference grows at higher confidence levels.' },
      { type: 'lecture', character: 'drLin', text: 'Fourth, VaR ignores tail severity. Expected Shortfall measures the average loss given a VaR breach, capturing what VaR misses. Fifth, ES is coherent and satisfies subadditivity. Diversification always reduces ES but can increase VaR.' },
      { type: 'lecture', character: 'drLin', text: 'Sixth, Basel III FRTB shifted from VaR to ES for market risk capital, recognizing that tail severity matters for systemic risk.' },
      { type: 'lecture', character: 'drLin', text: 'For Mission 6, compute VaR using all three methods for the Nikkei 225 and S&P 500. Compare 95 percent and 99 percent confidence levels. Compute ES for each method. Create a comparison dashboard and write a 200-word risk assessment.', note: 'Mission 6: Three VaR methods on Nikkei 225 & S&P 500, 95% and 99% confidence, ES for each, comparison dashboard, 200-word risk assessment' },
      { type: 'lecture', character: 'kenji', text: 'We have VaR and ES. But the FSA wants proof that our model actually works. They want to see backtest results.' },
      { type: 'lecture', character: 'drLin', text: 'That means we need to test whether our VaR predictions were actually correct. Next week: the FSA audit. They will count our breaches, test for clustering, and classify us using the Basel traffic light system. Green, yellow, or red. The financial cost of each color is massive.' },
      { type: 'lecture', character: 'drLin', text: 'The Kupiec test checks if we have the right number of breaches. The Christoffersen test checks if breaches are independent. And beyond backtesting: stress tests that replay historical crises and imagine hypothetical ones. VaR tells you about normal days. Stress tests tell you about the worst days. See you next week.' },
    ],
  },
];
