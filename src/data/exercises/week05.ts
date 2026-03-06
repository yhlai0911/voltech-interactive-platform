import { WeekExercises } from '@/types';

export const week05Exercises: WeekExercises = {
  weekNumber: 5,
  title: 'Volatility Forecasting',
  questions: [
    {
      id: 'w05-q01',
      question: 'What is the key difference between in-sample fit and out-of-sample forecasting?',
      options: [
        { label: 'A', text: 'In-sample uses more data than out-of-sample' },
        { label: 'B', text: 'Out-of-sample evaluates predictions on data the model has never seen during estimation' },
        { label: 'C', text: 'In-sample is always more accurate than out-of-sample' },
        { label: 'D', text: 'There is no practical difference between the two' },
      ],
      correctAnswer: 'B',
      explanation: 'Out-of-sample forecasting tests a model\'s ability to predict data it was not trained on. A model can fit past data perfectly (high in-sample fit) while performing poorly on new data due to overfitting -- memorizing noise rather than learning genuine patterns.',
    },
    {
      id: 'w05-q02',
      question: 'The QLIKE loss function for volatility forecasting is defined as:',
      options: [
        { label: 'A', text: '(1/T) * sum of (sigma_t^{2*} - hat_sigma_t^2)^2' },
        { label: 'B', text: '(1/T) * sum of |sigma_t^{2*} - hat_sigma_t^2|' },
        { label: 'C', text: '(1/T) * sum of [ln(hat_sigma_t^2) + sigma_t^{2*} / hat_sigma_t^2]' },
        { label: 'D', text: '(1/T) * sum of [(sigma_t^{2*} - hat_sigma_t^2) / hat_sigma_t^2]^2' },
      ],
      correctAnswer: 'C',
      explanation: 'QLIKE (quasi-likelihood loss) penalizes relative forecast errors and is particularly valuable because it produces consistent model rankings regardless of which volatility proxy is used (Patton, 2011). Option (A) is MSE, and (B) is MAE.',
    },
    {
      id: 'w05-q03',
      question: 'In the Mincer-Zarnowitz regression sigma_t^{2*} = a + b * hat_sigma_t^2 + u_t, what does rejection of H0: a = 0, b = 1 indicate?',
      options: [
        { label: 'A', text: 'The model perfectly predicts volatility' },
        { label: 'B', text: 'The forecast errors are normally distributed' },
        { label: 'C', text: 'The volatility proxy is unreliable' },
        { label: 'D', text: 'The forecast is biased or inefficient' },
      ],
      correctAnswer: 'D',
      explanation: 'Rejection of H0: a = 0, b = 1 means the forecast does not efficiently use available information. If a != 0, there is a systematic bias. If b != 1, the forecast either overreacts (b < 1) or underreacts (b > 1) to changes in volatility.',
    },
    {
      id: 'w05-q04',
      question: 'In a rolling-window forecasting procedure with window size W = 1000, the second forecast is estimated using observations:',
      options: [
        { label: 'A', text: '1, 2, ..., 1000 (same as the first)' },
        { label: 'B', text: '2, 3, ..., 1001' },
        { label: 'C', text: '1, 2, ..., 1001 (expanding)' },
        { label: 'D', text: '501, 502, ..., 1500' },
      ],
      correctAnswer: 'B',
      explanation: 'In a rolling window, the estimation sample always contains exactly W observations. For the first forecast, we estimate on {1, ..., 1000} and forecast day 1001. For the second forecast, we roll forward: estimate on {2, ..., 1001} and forecast day 1002. Option (C) describes an expanding window.',
    },
    {
      id: 'w05-q05',
      question: 'Why is the squared return r_t^2 a problematic volatility proxy?',
      options: [
        { label: 'A', text: 'It is an unbiased but extremely noisy estimate of daily variance' },
        { label: 'B', text: 'It always overestimates true volatility' },
        { label: 'C', text: 'It cannot be computed without intraday data' },
        { label: 'D', text: 'It is biased toward zero' },
      ],
      correctAnswer: 'A',
      explanation: 'The squared return r_t^2 is an unbiased estimator of the conditional variance, but it is extremely noisy because it is based on a single observation. This noise causes all models to appear inaccurate (low R^2 in MZ regressions), though model rankings are generally preserved. Realized variance is much more precise.',
    },
    {
      id: 'w05-q06',
      question: 'The Diebold-Mariano test evaluates whether:',
      options: [
        { label: 'A', text: 'A model\'s parameters are statistically significant' },
        { label: 'B', text: 'A model\'s residuals are normally distributed' },
        { label: 'C', text: 'Two models have significantly different predictive accuracy' },
        { label: 'D', text: 'A model\'s forecast is unbiased' },
      ],
      correctAnswer: 'C',
      explanation: 'The Diebold-Mariano (DM) test compares the predictive accuracy of two competing models. It tests H0: E[d_t] = 0, where d_t is the loss differential. The test uses HAC (Newey-West) standard errors to account for serial correlation. If |DM| > 1.96, one model significantly outperforms the other.',
    },
    {
      id: 'w05-q07',
      question: 'Which loss function is most robust to the choice of volatility proxy?',
      options: [
        { label: 'A', text: 'MSE (Mean Squared Error)' },
        { label: 'B', text: 'MAE (Mean Absolute Error)' },
        { label: 'C', text: 'R^2 from OLS regression' },
        { label: 'D', text: 'QLIKE (Quasi-Likelihood Loss)' },
      ],
      correctAnswer: 'D',
      explanation: 'Patton (2011) showed that QLIKE produces consistent model rankings regardless of which volatility proxy is used (r_t^2, realized variance, or range-based). MSE and MAE can produce different rankings depending on the proxy because they are more sensitive to the noise level in the target variable.',
    },
    {
      id: 'w05-q08',
      question: 'In empirical studies of equity indices, which model typically produces the best out-of-sample volatility forecasts at the daily horizon?',
      options: [
        { label: 'A', text: 'Standard GARCH(1,1)' },
        { label: 'B', text: 'GJR-GARCH(1,1) or other asymmetric models' },
        { label: 'C', text: 'GARCH(3,3) with many parameters' },
        { label: 'D', text: 'Deep learning models (LSTM, Transformer)' },
      ],
      correctAnswer: 'B',
      explanation: 'Asymmetric models such as GJR-GARCH consistently outperform standard GARCH for equity indices because the leverage effect (negative returns increase volatility more than positive returns) contains genuinely predictive information. Adding more GARCH lags typically hurts due to overfitting. Deep learning models are competitive at longer horizons but rarely beat GARCH-family models at the daily horizon.',
    },
  ],
};
