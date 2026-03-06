import type { SegmentTeaching } from '@/types';

export const week05Teaching: SegmentTeaching[] = [
  // --- Segment 1: Opening Story (w05-s01, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Before we begin, I want you to look at the board. Three model names: GARCH(1,1), GJR-GARCH(1,1), EGARCH(1,1). Which of these will produce the best volatility forecasts? Place your bets.' },
      { type: 'check', question: 'Which model do you think will win the forecasting horse race?', options: ['GARCH(1,1)', 'GJR-GARCH(1,1)', 'EGARCH(1,1)', 'None will be significantly different'], correctIndex: 1, onCorrect: 'Interesting choice! Let us see if GJR-GARCH lives up to the prediction.', onWrong: 'A reasonable guess. We will reveal the answer at the end of class.' },
      { type: 'lecture', character: 'narrator', text: 'At VolTech Analytics, Priya walks in carrying a laptop running a neural network. She challenges Alex directly.' },
      { type: 'lecture', character: 'priya', text: 'Let me pit my LSTM against your GARCH. Winner buys coffee for a year.' },
      { type: 'lecture', character: 'alex', text: 'You are on. But how do we decide the winner? We cannot just test on the same data we trained on.' },
      { type: 'lecture', character: 'drLin', text: 'A horse race. But we need fair rules. No testing on the training data. That is the golden rule of forecasting. Think of it this way: a student who memorizes exam answers does well on the practice exam but fails the real one. A model that memorizes past data fits beautifully in-sample but fails on new data.' },
      { type: 'lecture', character: 'drLin', text: 'Before we race, we need three things: a track, which is the rolling window; a referee, which is the loss functions; and a finish line, which is the statistical tests. Let us build each one.' },
    ],
  },

  // --- Segment 2: Forecasting Framework (w05-s02, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Imagine a timeline. The first portion is your training data, the in-sample period. The second portion is the test data, the out-of-sample period. In-sample evaluates how well the model fits past data. Out-of-sample evaluates how well it predicts new data. Only the latter matters for real forecasting.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Rolling window mechanism: a fixed-width window of W observations slides forward one day at a time', props: { formula: '\\text{Window: } \\{t-W+1,\\ldots,t\\} \\xrightarrow{\\text{forecast}} \\hat{\\sigma}_{t+1}^2' } },
      { type: 'lecture', character: 'drLin', text: 'Here is how the rolling window works. Say W equals 1000. First forecast: estimate on days 1 through 1000, forecast day 1001. Second forecast: estimate on days 2 through 1001, forecast day 1002. The window rolls forward by dropping the oldest observation and adding the newest.' },
      { type: 'check', question: 'What is the key advantage of a rolling window over an expanding window?', options: ['Rolling window uses more data', 'Rolling window adapts better to regime changes', 'Rolling window is computationally cheaper', 'Rolling window eliminates all forecast errors'], correctIndex: 1, onCorrect: 'Exactly. By dropping old data, the rolling window adapts to structural breaks and regime changes.', onWrong: 'Not quite. The rolling window drops old data, which helps it adapt to regime changes. An expanding window keeps all history, which can contaminate forecasts with stale regimes.' },
      { type: 'lecture', character: 'drLin', text: 'We forecast one day ahead because GARCH is designed for conditional variance forecasting. Multi-step-ahead forecasts require iterating the recursion, which compounds uncertainty. Start simple.' },
      { type: 'lecture', character: 'priya', text: 'One practical warning: for each of the roughly 1500 test days, we re-estimate the model from scratch. That means running maximum likelihood optimization 1500 times. The total computation takes 5 to 15 minutes. This is a real cost.' },
    ],
  },

  // --- Segment 3: Volatility Proxy Problem (w05-s03, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'We have our track. But there is a fundamental problem: what is the true volatility we are forecasting against? We never observe it directly. Volatility is latent. If you forecast temperature, you check the thermometer. For volatility, there is no thermometer.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Squared return as volatility proxy', props: { formula: 'E[r_t^2 \\mid \\mathcal{F}_{t-1}] = \\sigma_t^2 \\quad (\\text{when } \\mu = 0)' } },
      { type: 'lecture', character: 'drLin', text: 'The simplest proxy is the squared return, r-t-squared. It is an unbiased estimator of the conditional variance. But it is extremely noisy because it is based on a single observation per day. Using r-t-squared is like measuring temperature once per day with a thermometer that has a plus-or-minus 20 degree error. The average is correct, but any single reading is almost useless.' },
      { type: 'lecture', character: 'alex', text: 'Is there a better option?' },
      { type: 'lecture', character: 'drLin', text: 'Yes. Realized variance from intraday data. Sum of squared 5-minute returns. Much more precise because it uses about 78 observations per day instead of one. The R-squared in the Mincer-Zarnowitz regression jumps from 5 to 10 percent with r-t-squared to 30 to 50 percent with realized variance.' },
      { type: 'check', question: 'If model A beats model B using squared returns as the target, does it always beat B using realized variance?', options: ['Yes, rankings are always preserved', 'No, MSE and MAE can reverse rankings with different proxies', 'Only if both models use the same estimation window', 'Rankings only reverse for EGARCH models'], correctIndex: 1, onCorrect: 'Correct. MSE and MAE can produce reversed rankings with different proxies. This is exactly why we need QLIKE.', onWrong: 'Actually, MSE and MAE can produce reversed rankings depending on the proxy. This motivates using QLIKE, which is robust to proxy choice.' },
    ],
  },

  // --- Segment 4: Loss Functions (w05-s04, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Now we need the referee. How do we score each model? Three loss functions, each with different properties.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'RMSE: Root Mean Squared Error', props: { formula: 'RMSE = \\sqrt{\\frac{1}{T}\\sum_{t=1}^{T}(\\sigma_t^{2*} - \\hat{\\sigma}_t^2)^2}' } },
      { type: 'lecture', character: 'drLin', text: 'RMSE is the most familiar metric. It penalizes large errors heavily due to the squaring. If your forecast misses a big volatility spike, RMSE will punish you severely.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'MAE: Mean Absolute Error', props: { formula: 'MAE = \\frac{1}{T}\\sum_{t=1}^{T}|\\sigma_t^{2*} - \\hat{\\sigma}_t^2|' } },
      { type: 'lecture', character: 'drLin', text: 'MAE is more robust to outliers because it does not square the errors. But it is less sensitive to occasional large misses.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'QLIKE: the gold standard for volatility forecast evaluation', props: { formula: 'QLIKE = \\frac{1}{T}\\sum_{t=1}^{T}\\left[\\ln(\\hat{\\sigma}_t^2) + \\frac{\\sigma_t^{2*}}{\\hat{\\sigma}_t^2}\\right]' } },
      { type: 'lecture', character: 'drLin', text: 'QLIKE is the key loss function. Patton showed in 2011 that QLIKE produces consistent model rankings regardless of which proxy you use. MSE and MAE can flip rankings depending on the proxy. This makes QLIKE the gold standard for volatility forecast evaluation.' },
      { type: 'check', question: 'Why is QLIKE considered superior to RMSE for evaluating volatility forecasts?', options: ['QLIKE is easier to compute', 'QLIKE penalizes large errors more heavily', 'QLIKE produces consistent rankings regardless of the volatility proxy', 'QLIKE always produces smaller values'], correctIndex: 2, onCorrect: 'Exactly. Proxy-robustness is what makes QLIKE special.', onWrong: 'The key advantage is that QLIKE produces consistent model rankings regardless of whether you use squared returns, realized variance, or range-based proxies.' },
    ],
  },

  // --- Segment 5: Break (w05-s05, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: 'Ten-minute break. When we return, we learn how to test whether a forecast is truly efficient using the Mincer-Zarnowitz regression.' },
    ],
  },

  // --- Segment 6: Mincer-Zarnowitz Regression (w05-s06, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Welcome back. Quick recap: we have the rolling window as our track and three loss functions as referees. Now we need a formal statistical test of forecast quality: the Mincer-Zarnowitz regression.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Mincer-Zarnowitz regression for forecast efficiency', props: { formula: '\\sigma_t^{2*} = a + b \\cdot \\hat{\\sigma}_t^2 + u_t' } },
      { type: 'lecture', character: 'drLin', text: 'Regress the actual variance proxy on the forecast. Under a perfect forecast: a equals zero, meaning no bias; b equals one, meaning proportional response; and R-squared equals one hundred percent.' },
      { type: 'lecture', character: 'drLin', text: 'If a is greater than zero, the model systematically under-predicts volatility. If b is greater than one, the model underreacts. When true volatility doubles, the forecast increases by less than double. A well-calibrated model has a close to zero and b close to one.' },
      { type: 'lecture', character: 'drLin', text: 'We test the joint hypothesis that a equals zero and b equals one with an F-test. Rejection means the forecast is either biased, inefficient, or both.' },
      { type: 'lecture', character: 'alex', text: 'But what if the R-squared is only 5 or 10 percent? Does that mean the model is bad?' },
      { type: 'lecture', character: 'drLin', text: 'Great question. An R-squared of 5 to 10 percent against squared returns is perfectly normal for a good model. The proxy is so noisy that even perfect forecasts cannot explain more than about 10 percent of the variation. When you switch to realized variance, R-squared jumps to 30 to 50 percent. The model has not changed. Only the measurement quality improved.' },
      { type: 'check', question: 'In a Mincer-Zarnowitz regression, what does b < 1 indicate?', options: ['The model is unbiased', 'The model overreacts to shocks', 'The model underreacts to shocks', 'The model has no predictive power'], correctIndex: 1, onCorrect: 'Right. When b < 1, the forecast overreacts: it amplifies volatility changes more than the actual data warrants.', onWrong: 'When b < 1, the model overreacts. When true volatility changes by one unit, the forecast changes by more than one unit. When b > 1, the model underreacts.' },
    ],
  },

  // --- Segment 7: Python Live Demo (w05-s07, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'priya', text: 'Enough theory. Let us run the race and see who wins. Open the Python notebook and follow along.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Step 1: Import libraries, load S&P 500 data, compute log returns, define train/test split with W = 1000' },
      { type: 'lecture', character: 'priya', text: 'Step 1 loads our data and sets up the estimation window of 1000 days. Everything before day 1000 is our initial training set.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Step 2: Rolling forecast loop — re-estimate GARCH daily and store one-step-ahead forecasts' },
      { type: 'lecture', character: 'priya', text: 'This loop takes 3 to 5 minutes. For each day in the test period, we fit the model on the rolling window and store the forecast. No future data leakage. While it runs, notice the code structure: fit, forecast, roll forward, repeat.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Steps 3-4: Forecast visualization and Mincer-Zarnowitz regression results' },
      { type: 'lecture', character: 'priya', text: 'Look at the forecast time series tracking the realized proxy. The COVID-19 spike in March 2020 is clearly visible. And the MZ regression shows R-squared of about 7 percent against squared returns. That is expected and normal.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Steps 5-6: Loss function comparison table and Diebold-Mariano test' },
      { type: 'lecture', character: 'priya', text: 'Steps 5 and 6 compute RMSE, MAE, and QLIKE for all three models and run the Diebold-Mariano test between the top two. The DM test uses HAC standard errors because forecast errors are serially correlated. Naive standard errors would be too small.' },
    ],
  },

  // --- Segment 8: Horse Race Results (w05-s08, 10 min) ---
  {
    steps: [
      { type: 'visual', component: 'DataTable', caption: 'Volatility forecasting horse race results: RMSE, MAE, and QLIKE for three GARCH variants' },
      { type: 'lecture', character: 'drLin', text: 'Here are the results. GJR-GARCH wins on all three metrics. The leverage effect captured by the gamma term contains genuine predictive information about future volatility. Standard GARCH ignores this asymmetry entirely.' },
      { type: 'lecture', character: 'drLin', text: 'Now let us go back to our opening bets. Who voted for GJR-GARCH? Usually, few students choose it. Most expect the most complex model, EGARCH, to win. But simplicity with the right feature, the asymmetry term, beats raw complexity.' },
      { type: 'lecture', character: 'alex', text: 'The Diebold-Mariano test confirms that GJR significantly outperforms standard GARCH. But the margin between GJR and EGARCH is often not significant. The leverage effect is the key differentiator, not the specific functional form.' },
      { type: 'lecture', character: 'priya', text: 'And my LSTM? It beat GJR on RMSE by 2 percent but lost on QLIKE and took a hundred times longer to train. At daily horizons with standard features, GARCH is remarkably competitive.' },
      { type: 'lecture', character: 'drLin', text: 'Hansen and Lunde in 2005 tested 330 volatility models and found that few consistently beat GARCH(1,1). Three parameters capturing persistence and mean reversion are surprisingly hard to improve upon.' },
    ],
  },

  // --- Segment 9: Discussion (w05-s09, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Now that we have the results, let us discuss what they mean. The horse race answers WHICH model is best, but not WHY or WHETHER it matters economically.' },
      { type: 'discuss_timer', durationMinutes: 3, prompt: 'Kenji runs a pension fund regulated by the FSA. Should he use the most accurate model or the most interpretable one?', guidePoints: ['Pension funds need explainability for regulators', 'Hedge funds prioritize raw performance', 'A 2% improvement in RMSE may not translate to better portfolio outcomes', 'Context determines the right choice'] },
      { type: 'check', question: 'Does a 2% improvement in RMSE necessarily mean better portfolio performance?', options: ['Yes, lower RMSE always means better returns', 'No, you need to test economic value through portfolio variance targeting or VaR accuracy', 'Only if the improvement is statistically significant', 'Only for equity portfolios'], correctIndex: 1, onCorrect: 'Exactly. Statistical improvement and economic improvement are different things. Always test the economic value.', onWrong: 'A 2% RMSE improvement is a statistical metric. To know if it helps in practice, you need to test through portfolio variance targeting or VaR accuracy, not just statistical metrics.' },
      { type: 'lecture', character: 'drLin', text: 'The best approach is often hybrid: use GARCH output as a feature in machine learning. Forecast evaluation is not just a statistical exercise. It involves trade-offs between accuracy, complexity, interpretability, and economic value. The best model depends on your use case.' },
    ],
  },

  // --- Segment 10: Wrap-up and Mission (w05-s10, 5 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Let me leave you with six key takeaways. First, out-of-sample is the only honest test. A model that fits perfectly in-sample may fail out-of-sample due to overfitting.' },
      { type: 'lecture', character: 'drLin', text: 'Second, the rolling window ensures real-time simulation. Each forecast uses only information available at that point. Third, QLIKE is the gold standard because it produces consistent rankings regardless of the volatility proxy.' },
      { type: 'lecture', character: 'drLin', text: 'Fourth, the Mincer-Zarnowitz regression tests forecast efficiency. Low R-squared against squared returns is expected. Fifth, GJR-GARCH consistently outperforms standard GARCH because the leverage effect is real predictive information.' },
      { type: 'lecture', character: 'drLin', text: 'Sixth, the Diebold-Mariano test formally compares models. Without it, an observed RMSE difference could just be sampling noise.' },
      { type: 'lecture', character: 'drLin', text: 'For Mission 5, implement the rolling forecast horse race for three GARCH variants. Compute RMSE, MAE, and QLIKE. Run MZ regressions and DM tests. Create a comparison table and write a 200-word executive summary of findings.', note: 'Mission 5: Rolling forecast horse race with 3 GARCH variants, loss functions, MZ regressions, DM tests, comparison table, 200-word summary' },
      { type: 'lecture', character: 'kenji', text: 'You have shown me which model forecasts best. But the board does not care about RMSE. They want one number: how much can we lose tomorrow?' },
      { type: 'lecture', character: 'drLin', text: 'That is called Value-at-Risk. Next week, we translate volatility forecasts into the single most important risk number in finance. Three methods, one goal: answer the question every risk manager faces daily.' },
    ],
  },
];
