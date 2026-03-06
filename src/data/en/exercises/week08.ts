import { WeekExercises } from '@/types';

export const week08Exercises: WeekExercises = {
  weekNumber: 8,
  title: 'AI in Finance',
  questions: [
    {
      id: 'w08-q01',
      question: 'In the bias-variance tradeoff, a machine learning model with high flexibility (e.g., a deep neural network) typically exhibits:',
      options: [
        { label: 'A', text: 'High bias and high variance' },
        { label: 'B', text: 'Low bias and high variance' },
        { label: 'C', text: 'High bias and low variance' },
        { label: 'D', text: 'Low bias and low variance' },
      ],
      correctAnswer: 'B',
      explanation: 'A highly flexible model imposes few assumptions on the data (low bias) but its predictions can be unstable across different training samples (high variance). In contrast, GARCH has high bias (strong parametric assumptions) but low variance (stable predictions). The optimal model balances these two sources of error.',
    },
    {
      id: 'w08-q02',
      question: 'In a Random Forest model for volatility forecasting, feature importance is typically measured by:',
      options: [
        { label: 'A', text: 'The correlation between each feature and the target' },
        { label: 'B', text: 'The t-statistic of the feature\'s regression coefficient' },
        { label: 'C', text: 'The decrease in prediction accuracy when the feature\'s values are randomly permuted' },
        { label: 'D', text: 'The feature\'s standard deviation' },
      ],
      correctAnswer: 'C',
      explanation: 'Permutation importance measures how much the model\'s prediction error increases when a feature is randomly shuffled, breaking its relationship with the target. A large increase indicates the feature is important. This is model-agnostic and more reliable than impurity-based importance for correlated features.',
    },
    {
      id: 'w08-q03',
      question: 'In an LSTM neural network, the forget gate determines:',
      options: [
        { label: 'A', text: 'What new information to add to the cell state' },
        { label: 'B', text: 'What fraction of the previous cell state to discard' },
        { label: 'C', text: 'What output to produce for the current time step' },
        { label: 'D', text: 'The learning rate for backpropagation' },
      ],
      correctAnswer: 'B',
      explanation: 'The forget gate outputs a value between 0 and 1 for each element of the cell state. A value of 0 means "completely forget this information," while 1 means "fully retain it." For volatility forecasting, the forget gate can learn to discard old volatility patterns when a regime change occurs.',
    },
    {
      id: 'w08-q04',
      question: 'When comparing GJR-GARCH, Random Forest, and a Hybrid (GARCH + RF) model for daily volatility forecasting, the literature consistently finds:',
      options: [
        { label: 'A', text: 'Random Forest always dominates GARCH' },
        { label: 'B', text: 'GARCH always dominates Random Forest' },
        { label: 'C', text: 'All three models perform identically' },
        { label: 'D', text: 'The Hybrid model that uses GARCH conditional volatility as a feature in the Random Forest tends to produce the best forecasts' },
      ],
      correctAnswer: 'D',
      explanation: 'The hybrid approach leverages the structural knowledge encoded in GARCH (volatility clustering, leverage effect) as an input feature for the more flexible Random Forest. This consistently outperforms either approach alone because GARCH provides a strong "baseline forecast" that the ML model can refine using additional features. This result is supported by Christensen, Siggaard, and Veliyev (2023).',
    },
    {
      id: 'w08-q05',
      question: 'Which of the following is the most effective way to prevent overfitting in a Random Forest model?',
      options: [
        { label: 'A', text: 'Adding more features without filtering' },
        { label: 'B', text: 'Using a larger number of trees (n_estimators = 10,000)' },
        { label: 'C', text: 'Constraining tree depth (max_depth) and requiring a minimum number of samples per leaf' },
        { label: 'D', text: 'Training on the entire dataset without a train-test split' },
      ],
      correctAnswer: 'C',
      explanation: 'Regularization parameters like max_depth and min_samples_leaf constrain the complexity of individual trees, preventing them from memorizing noise in the training data. Adding more trees (B) reduces variance but does not prevent individual trees from overfitting. Adding unfiltered features (A) and training without a test split (D) both increase overfitting risk.',
    },
    {
      id: 'w08-q06',
      question: 'From a regulatory perspective, which model type is most suitable for Basel-compliant risk reporting?',
      options: [
        { label: 'A', text: 'A deep LSTM neural network with 10,000 parameters' },
        { label: 'B', text: 'A GJR-GARCH model with interpretable parameters' },
        { label: 'C', text: 'A Random Forest model with 500 trees' },
        { label: 'D', text: 'A black-box ensemble of neural networks' },
      ],
      correctAnswer: 'B',
      explanation: 'Regulatory frameworks (Basel accords, FSA guidelines) require that risk models be auditable and interpretable. GJR-GARCH has 5-7 parameters, each with clear economic meaning (alpha = shock impact, beta = persistence, gamma = leverage effect). Neural networks and large ensembles, while potentially more accurate, are difficult for regulators to audit. This is why the hybrid approach uses GARCH as the primary engine with ML as a supplementary monitoring tool.',
    },
    {
      id: 'w08-q07',
      question: 'A Random Forest reduces prediction variance compared to a single decision tree because:',
      options: [
        { label: 'A', text: 'Each tree is trained on a random bootstrap sample and a random subset of features, and the final prediction averages across all trees' },
        { label: 'B', text: 'Each tree uses the same data but different splitting criteria' },
        { label: 'C', text: 'The forest uses a deeper tree structure than individual trees' },
        { label: 'D', text: 'Random Forests do not use decision trees at all' },
      ],
      correctAnswer: 'A',
      explanation: 'The key mechanism of Random Forest is bagging (bootstrap aggregation) combined with random feature selection. Each tree sees a different random subset of observations and features, making the trees decorrelated. Averaging across many decorrelated trees reduces variance without increasing bias substantially. This is Breiman\'s (2001) fundamental insight.',
    },
    {
      id: 'w08-q08',
      question: 'When evaluating ML models for financial time series, standard k-fold cross-validation is problematic because:',
      options: [
        { label: 'A', text: 'It requires too much computation' },
        { label: 'B', text: 'It always produces biased estimates' },
        { label: 'C', text: 'It only works for classification tasks' },
        { label: 'D', text: 'It ignores the temporal ordering of data, potentially using future information to predict the past (look-ahead bias)' },
      ],
      correctAnswer: 'D',
      explanation: 'Standard k-fold cross-validation randomly shuffles observations into folds, which destroys the temporal ordering of financial time series. This allows the model to "see" future data during training, leading to overly optimistic performance estimates. For time series, one must use time-series split: train on data before a cutoff date and test on data after it.',
    },
  ],
};
