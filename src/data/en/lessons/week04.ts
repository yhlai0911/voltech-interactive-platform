import { WeekLesson } from '@/types';

export const week04Lesson: WeekLesson = {
  weekNumber: 4,
  title: 'Asymmetric Volatility — GJR-GARCH',
  subtitle: 'Bad news hits harder',
  duration: 120,
  prerequisites: [
    'Week 3 (GARCH(1,1), MLE, standardized residuals)',
    'Understanding of conditional variance and stationarity',
  ],
  learningObjectives: [
    'Explain the leverage effect and provide economic intuition for why negative returns increase volatility more than positive returns',
    'Specify and interpret the GJR-GARCH model, including the role of the asymmetry parameter gamma',
    'Construct and interpret the News Impact Curve for GARCH and GJR-GARCH',
    'Compare GJR-GARCH and EGARCH as alternative asymmetric specifications',
    'Estimate GJR-GARCH in Python and evaluate it against standard GARCH using AIC, BIC, and likelihood ratio tests',
  ],
  segments: [
    { id: 'w04-s01', title: 'Opening Story', duration: 8, type: 'story', content: 'Review the cliffhanger from Week 3: Alex\'s residual asymmetry. Hook: "A -3% day hits harder than a +3% day." Let students guess the ratio before revealing.', keyPoints: ['Alex noticed GARCH residuals are asymmetric after negative shocks', 'The leverage effect is the economic mechanism behind this pattern'] },
    { id: 'w04-s02', title: 'Leverage Effect', duration: 14, type: 'lecture', content: 'Lecture: two theories of asymmetric volatility. Balance-sheet leverage (Black, 1976): price falls -> debt-to-equity rises -> vol rises. Volatility feedback (Campbell & Hentschel, 1992): vol rises -> required return rises -> price falls.', keyPoints: ['Two channels predict the same observable pattern', 'Negative returns associated with larger volatility increases than positive returns', 'The effect is strong and pervasive across equity markets worldwide'] },
    { id: 'w04-s03', title: 'GJR-GARCH Model', duration: 16, type: 'lecture', content: 'Core lecture: write GJR equation with indicator function on the board. Walk through the asymmetry table (positive vs. negative shock impact). Compute asymmetry ratio (alpha+gamma)/alpha.', keyPoints: ['Indicator function I(r_{t-1} < 0) is the key innovation', 'Positive shock impact: alpha * r^2. Negative shock impact: (alpha + gamma) * r^2', 'Stationarity: alpha + gamma/2 + beta < 1 (indicator active half the time)'] },
    { id: 'w04-s04', title: 'News Impact Curve', duration: 12, type: 'lecture', content: 'Lecture: NIC as a diagnostic tool. Draw GARCH parabola (symmetric) vs. GJR parabola (kinked at zero). This is the key visual -- give students time to absorb.', keyPoints: ['NIC shows sigma_t^2 as a function of r_{t-1}, holding sigma_{t-1}^2 constant', 'GARCH: symmetric parabola. GJR-GARCH: asymmetric with kink at zero', 'The kink is the visual signature of the leverage effect'] },
    { id: 'w04-s05', title: 'Break', duration: 10, type: 'break', content: '10-minute break.' },
    { id: 'w04-s06', title: 'EGARCH Alternative', duration: 12, type: 'lecture', content: 'Lecture: EGARCH models ln(sigma_t^2), guaranteeing positive variance without constraints. Comparison table: GJR vs. EGARCH. Sign convention: GJR gamma > 0 = leverage; EGARCH gamma < 0 = leverage.', keyPoints: ['EGARCH uses log-variance formulation for automatic positivity', 'Sign convention differs between GJR and EGARCH', 'Both capture the same economic effect through different mechanisms'] },
    { id: 'w04-s07', title: 'Likelihood Ratio Test', duration: 6, type: 'lecture', content: 'Lecture: nested models and the LR test. LR = 2[L_GJR - L_GARCH] ~ chi^2(1). The key question: is gamma significantly different from zero? Critical value: 3.84 at 5%.', keyPoints: ['GARCH is nested in GJR-GARCH (set gamma = 0)', 'LR test has 1 degree of freedom (one extra parameter)', 'For equity indices, asymmetry is almost always significant'] },
    { id: 'w04-s08', title: 'Python Live Demo', duration: 17, type: 'demo', content: 'Run 4 code blocks: fit GARCH/GJR-GARCH/EGARCH, interpret GJR parameters and asymmetry ratio, plot the News Impact Curve for all three models, compare conditional volatility during COVID.', keyPoints: ['The arch_model call uses o=1 to add asymmetry', 'NIC plot is the visual highlight -- asymmetry is striking', 'COVID comparison shows GJR ramps up faster during crash'] },
    { id: 'w04-s09', title: 'Application and Diagnostics', duration: 13, type: 'activity', content: 'COVID crash comparison: GARCH vs. GJR-GARCH volatility paths. Show how GJR ramps up faster during consecutive negative days. Diagnostic checks: skewness improvement in residuals.', keyPoints: ['GJR-GARCH consistently estimates higher volatility during crashes', 'The gap is largest during sustained negative return periods', 'Skewness of residuals improves (closer to zero) with GJR'] },
    { id: 'w04-s10', title: 'Wrap-up and Mission', duration: 12, type: 'wrapup', content: 'Summarize 6 key takeaways. Explain Mission 4 deliverables: fit three models, NIC plot, COVID comparison, LR test, one-page memo. Tease Week 5: "Fitting is easy. Forecasting is hard."', keyPoints: ['Leverage effect: bad news increases vol more than good news', 'GJR-GARCH captures asymmetry with one extra parameter gamma', 'Ignoring asymmetry underestimates risk after market declines'] },
  ],
};
