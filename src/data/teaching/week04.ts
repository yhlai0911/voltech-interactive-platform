import type { SegmentTeaching } from '@/types';

export const week04Teaching: SegmentTeaching[] = [
  // ── Segment 1: Opening Story (w04-s01) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Welcome back. Last week we built GARCH(1,1) — three parameters, mean reversion, the king of volatility models. But we left a cliffhanger. Alex, remind everyone what you found.' },
      { type: 'lecture', character: 'alex', text: 'I plotted the GARCH standardized residuals separately for up-days and down-days. The distributions were NOT the same. After negative returns, tomorrow\'s volatility was consistently higher than after positive returns of the same size. The residual skewness was -0.31 — GARCH could not explain this asymmetry.' },
      { type: 'lecture', character: 'drLin', text: 'Let me put this in concrete terms. After a minus 3 percent day and after a plus 3 percent day — do you think tomorrow\'s volatility is the same? Take a guess. What is the ratio?' },
      { type: 'check', question: 'For typical equity indices, how does a negative return\'s impact on tomorrow\'s volatility compare to a positive return of the same size?', options: ['They produce exactly the same volatility', 'Negative return produces about 1.5x the impact', 'Negative return produces about 3-4x the impact', 'Positive return actually produces more volatility'], correctIndex: 2, onCorrect: 'Right! For typical equity indices, negative returns produce roughly 3 to 4 times the impact on tomorrow\'s volatility. This is a massive asymmetry that GARCH completely ignores.', onWrong: 'The asymmetry is striking. A negative return typically produces 3 to 4 times the volatility impact of a positive return of the same absolute size. GARCH treats them identically — that is the problem.' },
      { type: 'lecture', character: 'narrator', text: 'This asymmetry — where bad news hits harder than good news — is called the leverage effect. Today we build a model that captures it.' },
    ],
  },

  // ── Segment 2: Leverage Effect (w04-s02) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Why does negative news increase volatility more than positive news? There are two compelling theories, and they both predict the same thing.' },
      { type: 'lecture', character: 'drLin', text: 'Theory one comes from Fischer Black in 1976 — the balance-sheet leverage channel. When a stock price falls, the market value of equity declines, but debt stays fixed. So the debt-to-equity ratio rises automatically. Higher leverage means higher financial risk, which means equity volatility goes up. Price falls, leverage rises, volatility rises.' },
      { type: 'lecture', character: 'drLin', text: 'Theory two is the volatility feedback effect from Campbell and Hentschel in 1992. This one runs the other way. If expected volatility increases for some reason, investors demand a higher return to compensate for the extra risk. For the stock to deliver a higher future return, its price must drop NOW. So an increase in expected volatility causes an immediate price decline.' },
      { type: 'lecture', character: 'drLin', text: 'Both channels predict the same observable pattern: negative returns are associated with larger increases in volatility than positive returns. And the effect is not subtle — it is strong and pervasive across equity markets worldwide.' },
      { type: 'lecture', character: 'kenji', text: 'This is exactly what happened to our portfolio in March 2020. The market dropped day after day, and each day the next day\'s realized volatility was much higher than our symmetric GARCH model predicted. We were systematically underestimating risk.' },
      { type: 'check', question: 'Which statement best describes the leverage effect?', options: ['Volatility increases after both positive and negative returns equally', 'Only negative returns affect future volatility', 'Negative returns increase future volatility MORE than positive returns of the same magnitude', 'The leverage effect only exists in the Japanese equity market'], correctIndex: 2, onCorrect: 'Exactly. Both positive and negative returns affect volatility, but the impact is asymmetric — negative shocks produce a disproportionately larger increase.', onWrong: 'Both positive and negative returns affect volatility. The leverage effect means that negative returns produce a LARGER increase in volatility than positive returns of the same absolute size.' },
      { type: 'check', question: 'Why would a stock price decline increase equity volatility through the balance-sheet channel?', options: ['Because investors panic and sell', 'Because the debt-to-equity ratio rises, increasing financial risk', 'Because the company issues more debt', 'Because interest rates increase'], correctIndex: 1, onCorrect: 'Right. When equity value falls while debt stays fixed, the firm becomes more leveraged, increasing financial risk and thus equity volatility.', onWrong: 'The balance-sheet channel: price falls, equity value drops, debt unchanged, D/E ratio rises, financial risk increases, volatility rises.' },
    ],
  },

  // ── Segment 3: GJR-GARCH Model (w04-s03) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'We need a model that treats good news and bad news differently. That is exactly what Glosten, Jagannathan, and Runkle proposed in 1993. The GJR-GARCH model.' },
      { type: 'lecture', character: 'drLin', text: 'Here is the equation. Sigma_t squared equals omega plus alpha times r_{t-1} squared plus gamma times r_{t-1} squared times the indicator I of r_{t-1} less than zero, plus beta times sigma_{t-1} squared. The new piece is that gamma term.', note: 'GJR-GARCH: sigma_t^2 = omega + alpha * r_{t-1}^2 + gamma * r_{t-1}^2 * I(r_{t-1} < 0) + beta * sigma_{t-1}^2' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'GJR-GARCH equation with indicator function I(r_{t-1} < 0)' },
      { type: 'lecture', character: 'drLin', text: 'The indicator function I of r_{t-1} less than zero is like a light switch. It is ON — equals 1 — when yesterday\'s return was negative. It is OFF — equals 0 — when positive. When ON, the model adds gamma times r_{t-1} squared as a penalty for bad news.' },
      { type: 'lecture', character: 'drLin', text: 'Let me show you what this means with numbers. Suppose alpha equals 0.03 and gamma equals 0.12. If yesterday\'s return was positive 2 percent: the impact on variance is alpha times 4, which equals 0.12. If yesterday\'s return was negative 2 percent: the impact is alpha plus gamma times 4, which equals 0.60. Five times larger! One parameter — gamma — creates this entire asymmetry.', note: 'Positive shock: alpha * r^2 | Negative shock: (alpha + gamma) * r^2 | Asymmetry ratio: (alpha + gamma) / alpha' },
      { type: 'lecture', character: 'drLin', text: 'We define the asymmetry ratio as alpha plus gamma divided by alpha. This single number tells you how many times larger the negative shock impact is. For typical equity indices, the ratio falls between 3 and 5.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Asymmetry ratio = (alpha + gamma) / alpha; Stationarity: alpha + gamma/2 + beta < 1' },
      { type: 'lecture', character: 'drLin', text: 'For stationarity, the condition becomes alpha plus gamma over 2 plus beta less than 1. Why gamma over 2? Because the indicator function is active only about half the time — returns are roughly symmetric around zero, so negative days occur about 50 percent of the time.' },
      { type: 'check', question: 'In a GJR-GARCH model with alpha = 0.04 and gamma = 0.12, what is the asymmetry ratio?', options: ['3.0', '4.0', '0.25', '12.0'], correctIndex: 1, onCorrect: 'Correct! (0.04 + 0.12) / 0.04 = 0.16 / 0.04 = 4.0. A negative shock has 4 times the impact of a positive shock.', onWrong: 'The asymmetry ratio is (alpha + gamma) / alpha = (0.04 + 0.12) / 0.04 = 4.0.' },
    ],
  },

  // ── Segment 4: News Impact Curve (w04-s04) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'The News Impact Curve is the most revealing way to compare volatility models. It plots tomorrow\'s variance as a function of today\'s return, holding everything else constant at the long-run level.' },
      { type: 'lecture', character: 'drLin', text: 'For standard GARCH, the NIC is a symmetric U-shaped parabola centered at zero. A plus 3 percent shock and a minus 3 percent shock produce exactly the same variance. The model cannot tell good news from bad news.' },
      { type: 'lecture', character: 'drLin', text: 'Now draw the GJR-GARCH NIC. It is an asymmetric parabola with a kink right at zero. The left branch — negative returns — rises much more steeply than the right branch. This kink is the visual signature of the leverage effect. Give yourselves time to absorb this picture — it is the most important chart in today\'s lecture.' },
      { type: 'visual', component: 'NewsImpactCurve', caption: 'News Impact Curve: GARCH (symmetric parabola) vs. GJR-GARCH (asymmetric with kink at zero)' },
      { type: 'lecture', character: 'drLin', text: 'Look at both NICs on the same axes. At r_{t-1} equals negative 4 percent, the GJR variance is much higher than the GARCH variance. At r_{t-1} equals positive 4 percent, they are similar. The gap widens as the magnitude of negative shocks increases. That is the whole story in one picture.' },
      { type: 'check', question: 'On the News Impact Curve, where is the biggest difference between GARCH and GJR-GARCH?', options: ['At small positive returns', 'At zero returns', 'At large negative returns', 'At large positive returns'], correctIndex: 2, onCorrect: 'Exactly! The gap is largest at large negative shocks, where the gamma term in GJR-GARCH adds a substantial penalty that GARCH completely misses.', onWrong: 'The difference is largest at large negative returns. The GJR gamma term activates for negative shocks, pushing variance far above what GARCH estimates. At positive returns, both models give similar results.' },
    ],
  },

  // ── Segment 5: Break (w04-s05) ──
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: 'Take a 10-minute break. When we return, we explore the EGARCH alternative, learn the likelihood ratio test, and run the models in Python.' },
    ],
  },

  // ── Segment 6: EGARCH Alternative (w04-s06) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Daniel Nelson proposed an alternative in 1991: instead of modeling variance directly, model the LOG of variance. Since the exponential of anything is always positive, the variance is automatically positive — no parameter constraints needed.' },
      { type: 'lecture', character: 'drLin', text: 'The EGARCH equation is: natural log of sigma_t squared equals omega plus alpha times the quantity absolute value of z_{t-1} minus its expected value, plus gamma times z_{t-1}, plus beta times log of sigma_{t-1} squared. Notice it uses the standardized residual z_{t-1} instead of the raw return.', note: 'EGARCH: ln(sigma_t^2) = omega + alpha*(|z_{t-1}| - E[|z|]) + gamma*z_{t-1} + beta*ln(sigma_{t-1}^2)' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'EGARCH model: log-variance formulation with standardized residuals' },
      { type: 'lecture', character: 'drLin', text: 'Now here is a critical warning that trips up students every year. In GJR-GARCH, gamma greater than zero indicates the leverage effect. In EGARCH, gamma LESS THAN zero indicates the same leverage effect. The sign convention is reversed! Always check which model you are looking at before interpreting gamma.' },
      { type: 'lecture', character: 'drLin', text: 'Let me compare the two models. GJR models sigma_t squared directly, requires non-negativity constraints, and has a piecewise linear NIC with a kink at zero. EGARCH models log sigma_t squared, needs no constraints because exp is always positive, and has an exponential NIC. Both capture the same economic effect through different mathematical mechanisms.' },
      { type: 'lecture', character: 'priya', text: 'Both capture asymmetry well. GJR is more intuitive and easier to explain to regulators. EGARCH is more flexible and guarantees positive variance without constraints. For a client report, I would recommend GJR for interpretability.' },
      { type: 'check', question: 'In EGARCH, a gamma estimate of -0.15 indicates:', options: ['No leverage effect', 'The leverage effect — negative returns increase vol more than positive returns', 'The opposite of the leverage effect', 'The model is misspecified'], correctIndex: 1, onCorrect: 'Right! In EGARCH, a negative gamma means the same thing as a positive gamma in GJR-GARCH: negative shocks increase volatility more. The sign convention is reversed.', onWrong: 'In EGARCH, gamma < 0 indicates the leverage effect. This is the opposite sign convention from GJR-GARCH where gamma > 0 indicates leverage. Same economic effect, different mathematical representation.' },
    ],
  },

  // ── Segment 7: Likelihood Ratio Test (w04-s07) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'We have two asymmetric models now. But is the asymmetry actually statistically significant? Maybe gamma is not really different from zero. We need a formal test.' },
      { type: 'lecture', character: 'drLin', text: 'Here is the key insight: standard GARCH is NESTED within GJR-GARCH. If you set gamma to zero in the GJR equation, you get exactly the GARCH equation. So we can use a likelihood ratio test to ask: does adding gamma significantly improve the model?' },
      { type: 'lecture', character: 'drLin', text: 'The test statistic is LR equals 2 times the quantity L_GJR minus L_GARCH, where L is the log-likelihood. Under the null hypothesis that gamma equals zero, LR follows a chi-squared distribution with 1 degree of freedom — because GJR has exactly one more parameter. The critical value at 5 percent is 3.84.', note: 'LR = 2 * [L_GJR - L_GARCH] ~ chi^2(1). Critical value at 5%: 3.84' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Likelihood Ratio Test: LR = 2[L_GJR - L_GARCH] ~ chi^2(1)' },
      { type: 'lecture', character: 'drLin', text: 'If LR exceeds 3.84, we reject the null. That means asymmetry is statistically significant — using GARCH instead of GJR-GARCH loses important information about how the market responds to shocks. For equity indices, the test almost always rejects. The leverage effect is that strong.' },
      { type: 'check', question: 'If the log-likelihood of GJR-GARCH is -3450.2 and of GARCH is -3458.1, what is the LR statistic and should we reject H0: gamma = 0?', options: ['LR = 7.9, do not reject', 'LR = 15.8, reject — asymmetry is significant', 'LR = 7.9, reject — asymmetry is significant', 'LR = 3.84, exactly at the boundary'], correctIndex: 1, onCorrect: 'Right! LR = 2 * (-3450.2 - (-3458.1)) = 2 * 7.9 = 15.8. Since 15.8 > 3.84, we strongly reject gamma = 0.', onWrong: 'LR = 2 * (L_GJR - L_GARCH) = 2 * (-3450.2 + 3458.1) = 2 * 7.9 = 15.8. This far exceeds the critical value of 3.84, so we reject H0 — asymmetry is highly significant.' },
    ],
  },

  // ── Segment 8: Python Live Demo (w04-s08) ──
  {
    steps: [
      { type: 'lecture', character: 'priya', text: 'Time to let the data speak. I am going to fit all three models — GARCH, GJR-GARCH, and EGARCH — on S&P 500 data with Student-t distributions. Open your laptops.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Code Block 1: Fit GARCH(1,1), GJR-GARCH(1,1), and EGARCH(1,1) — model comparison table' },
      { type: 'lecture', character: 'priya', text: 'Look at the comparison table. Both GJR and EGARCH have lower AIC and BIC than standard GARCH. The asymmetry clearly matters. EGARCH might have a slight edge statistically, but GJR is more interpretable.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Code Block 2: GJR-GARCH parameters, asymmetry ratio, persistence, long-run vol, half-life' },
      { type: 'lecture', character: 'priya', text: 'The asymmetry ratio comes out around 3.5 to 4.0. A negative return has roughly 3.5 to 4 times the impact on tomorrow\'s volatility compared to a positive return. This confirms the leverage effect is economically substantial, not just statistically significant.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Code Block 3: News Impact Curve for all three models on the same chart' },
      { type: 'lecture', character: 'priya', text: 'Here it is — the News Impact Curve for all three models on one chart. GARCH is the symmetric parabola. GJR has the kink at zero with a steeper left branch. EGARCH curves exponentially. The difference at large negative shocks is dramatic.' },
      { type: 'visual', component: 'NewsImpactCurve', caption: 'NIC comparison: GARCH (symmetric), GJR-GARCH (kinked), EGARCH (exponential)' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Code Block 4: GARCH vs. GJR-GARCH conditional volatility during COVID (Oct 2019 – Sep 2020)' },
      { type: 'lecture', character: 'priya', text: 'This is the COVID comparison chart. Look at March 2020 — GJR-GARCH consistently estimates HIGHER volatility than standard GARCH during the crash. Each consecutive negative day activates the gamma term, compounding the gap day after day. The LR test confirms: the improvement is highly significant.' },
      { type: 'visual', component: 'VolatilityTimeSeries', caption: 'Conditional volatility comparison: GARCH vs. GJR-GARCH during COVID-19' },
    ],
  },

  // ── Segment 9: Application and Diagnostics (w04-s09) ──
  {
    steps: [
      { type: 'lecture', character: 'alex', text: 'Let me present the COVID case study numbers. Average GARCH volatility during the crash: 52.3 percent annualized. Average GJR-GARCH volatility: 61.8 percent. That is a 9.5 percentage point gap. GARCH was 15.4 percent lower than GJR during the worst period.' },
      { type: 'lecture', character: 'kenji', text: 'What does that mean for VaR — the actual risk number my compliance team cares about?' },
      { type: 'lecture', character: 'alex', text: 'On the peak day, GARCH VaR was 11.50 percent while GJR VaR was 13.80 percent. The GARCH VaR understated risk by roughly 17 percent on the worst single day. For a pension fund managing billions, that capital adequacy gap is enormous.' },
      { type: 'lecture', character: 'drLin', text: 'Why is the gap largest during the crash? Each negative day activates the gamma term. With an asymmetry ratio around 3.8, each negative day has nearly four times the volatility impact in GJR compared to GARCH. And these effects compound through the beta times sigma squared channel — yesterday\'s higher GJR variance feeds into today\'s estimate.' },
      { type: 'lecture', character: 'drLin', text: 'Let me check the diagnostics. Residual skewness: GARCH residuals have skewness of about negative 0.31. GJR-GARCH residuals are closer to zero. By giving negative shocks extra weight, GJR partially accounts for the asymmetry. And Ljung-Box on the squared standardized residuals gives large p-values — the model adequately captures the volatility dynamics.' },
      { type: 'discuss_timer', durationMinutes: 3, prompt: 'The leverage effect is strongest for equities. Would you expect the same asymmetry for gold? For USD/JPY? Discuss with your neighbor.', guidePoints: ['Gold has no debt-to-equity mechanism — gamma may be near zero', 'USD/JPY has no leverage channel but rapid depreciations may trigger central bank fears', 'The leverage effect is fundamentally an equity phenomenon'] },
      { type: 'check', question: 'Why does ignoring asymmetry matter most during market crashes?', options: ['Because crashes are rare events', 'Because consecutive negative days compound the gamma effect, widening the gap between GARCH and GJR', 'Because GARCH cannot estimate parameters during crashes', 'Because asymmetric models are more stable numerically'], correctIndex: 1, onCorrect: 'Exactly. During crashes, you get consecutive negative days. Each one activates gamma, and the compound effect through beta * sigma^2 makes the gap between GARCH and GJR grow larger every day.', onWrong: 'During crashes, negative returns occur on consecutive days. Each day activates the gamma penalty in GJR, and this effect compounds through the persistence term, making the volatility gap between GARCH and GJR grow wider and wider.' },
      { type: 'lecture', character: 'david', text: 'Your GJR model clearly fits better. The NIC and the LR test are compelling. But can it PREDICT tomorrow\'s risk? Fitting yesterday\'s data is the easy part. Forecasting the future is hard.' },
    ],
  },

  // ── Segment 10: Wrap-up and Mission (w04-s10) ──
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Let me wrap up with six key takeaways. First, the leverage effect: negative returns increase future volatility more than positive returns of the same magnitude. Both the balance-sheet channel and the volatility feedback channel explain this.' },
      { type: 'lecture', character: 'drLin', text: 'Second, GJR-GARCH extends standard GARCH with an indicator function that gives negative shocks extra weight. One additional parameter — gamma — captures the entire asymmetry. Third, the News Impact Curve is the key diagnostic tool. GARCH gives a symmetric parabola. GJR gives an asymmetric one with a kink at zero.' },
      { type: 'lecture', character: 'drLin', text: 'Fourth, EGARCH models log-variance, guaranteeing positivity. But watch the sign convention — gamma less than zero means leverage in EGARCH. Fifth, the likelihood ratio test formally confirms whether gamma is significantly different from zero. For equities, it almost always is.' },
      { type: 'lecture', character: 'drLin', text: 'And sixth — the practical impact. Ignoring asymmetry underestimates risk after market declines, precisely when accurate risk measurement matters most. The VaR gap can be 15 to 17 percent on peak crisis days.' },
      { type: 'lecture', character: 'drLin', text: 'For Mission 4, here is your assignment. Fit GARCH, GJR-GARCH, and EGARCH on both the Nikkei 225 and S&P 500. Report the asymmetry ratios. Plot the News Impact Curve for all three models. Create a COVID comparison chart. Run the likelihood ratio test. And write a one-page memo to Kenji explaining which model his pension fund should use and why.' },
      { type: 'lecture', character: 'drLin', text: 'Bonus challenge: fit GJR-GARCH to five asset classes — S&P 500, Nikkei, FTSE 100, Gold, and USD/JPY. Compare gamma across assets. Where is asymmetry strongest? Where is it weakest or even reversed?' },
      { type: 'lecture', character: 'david', text: 'Fitting is easy. Forecasting is hard.' },
      { type: 'lecture', character: 'priya', text: 'I have been running out-of-sample tests. GARCH, GJR, EGARCH, and my LSTM. The results are... interesting.' },
      { type: 'lecture', character: 'narrator', text: 'Next week we enter the world of volatility forecasting — where models are judged not by how well they fit the past, but by how well they predict the future. The horse race begins. See you in Week 5.' },
    ],
  },
];
