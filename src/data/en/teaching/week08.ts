import type { SegmentTeaching } from '@/types';

export const week08Teaching: SegmentTeaching[] = [
  // --- Segment 1: Opening Story (w08-s01, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: 'Written on the board before class: "QuantStar claims 50% improvement over GARCH. Is this plausible?" Students take their seats and exchange skeptical glances.' },
      { type: 'lecture', character: 'drLin', text: 'Good morning. This is our final class. Before we begin, I want you to look at that claim on the board. Fifty percent improvement. What questions should we ask before we believe it?' },
      { type: 'lecture', character: 'alex', text: 'What metric are they using? What is the baseline model? Is the comparison in-sample or out-of-sample? Over what time period?' },
      { type: 'lecture', character: 'drLin', text: 'Excellent. Those are exactly the right questions. QuantStar Analytics has approached Kenji with a two-and-a-half million dollar per year ML-based risk system. They claim it will revolutionize his risk management. My reaction: let us test it ourselves.' },
      { type: 'lecture', character: 'priya', text: 'I have been building Random Forest and LSTM models in the background for weeks now. Let us do a rigorous head-to-head comparison -- out-of-sample, with proper loss functions, no cheating.' },
      { type: 'lecture', character: 'kenji', text: 'I have three options on the table. Option A: keep GARCH, which is low cost and proven. Option B: replace everything with QuantStar\'s ML system at two-and-a-half million per year. Option C: build a hybrid that combines both. By the end of today, I need a recommendation.' },
      { type: 'lecture', character: 'drLin', text: 'Before we race ML against GARCH, we need to understand the fundamental difference between these two approaches. That means understanding the bias-variance tradeoff.' },
    ],
  },

  // --- Segment 2: ML vs. Econometrics (w08-s02, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'There are two fundamentally different philosophies of modeling. Econometrics starts with theory, estimates few parameters, and prioritizes interpretability. Machine learning starts with data, learns complex patterns, and prioritizes prediction accuracy.' },
      { type: 'visual', component: 'BiasVarianceDecomposition', caption: 'Bias-variance tradeoff decomposition' },
      { type: 'lecture', character: 'drLin', text: 'The total prediction error decomposes into three parts: bias squared, variance, and irreducible noise. You can reduce bias by adding model flexibility, or reduce variance by adding structure, but you cannot minimize both simultaneously. This is the fundamental tension.' },
      { type: 'lecture', character: 'drLin', text: 'Think of it this way. GARCH is a rigid ruler: it measures approximately correctly every time -- high bias, low variance, five to seven parameters. A neural network is a flexible tape measure: it can capture subtle curves but might give different readings each time -- low bias, high variance, thousands of parameters.' },
      { type: 'visual', component: 'BiasVarianceDecomposition', caption: 'U-shaped test error curve: underfitting to overfitting', props: { showUCurve: true } },
      { type: 'lecture', character: 'drLin', text: 'On the classic U-shaped test error curve, GARCH sits on the left side with few parameters. Deep neural networks sit on the right with many parameters. The key question for financial volatility: where is the sweet spot? Noisy financial data often favors higher-bias models at short horizons.' },
      { type: 'check', question: 'In the bias-variance tradeoff, a model with high bias and low variance (like GARCH) tends to:', options: ['Overfit the training data', 'Give consistent but slightly inaccurate predictions', 'Capture complex nonlinear patterns perfectly', 'Require very large datasets to work'], correctIndex: 1, onCorrect: 'Exactly. High bias means it is slightly wrong on average, but low variance means it is consistently wrong in the same way -- which is actually useful for noisy financial data.', onWrong: 'A high-bias, low-variance model gives stable predictions that may be slightly inaccurate on average. It underfits rather than overfits.' },
      { type: 'lecture', character: 'alex', text: 'So the ML advantage grows when we have richer features and longer time horizons, but GARCH might actually win for short-horizon volatility forecasting because the data is so noisy?' },
      { type: 'lecture', character: 'drLin', text: 'That is the hypothesis. Let us test it empirically.' },
    ],
  },

  // --- Segment 3: Random Forest (w08-s03, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Let us start with the most interpretable ML model: Random Forest. It is an ensemble of decision trees -- like asking five hundred experts and averaging their opinions.' },
      { type: 'lecture', character: 'drLin', text: 'A single decision tree splits the data based on feature values. For volatility: if yesterday\'s return was below negative two percent AND the five-day rolling volatility exceeds 1.5%, then predict high volatility. Simple and interpretable, but terribly overfit-prone.' },
      { type: 'visual', component: 'FeatureImportanceChart', caption: 'Random Forest: ensemble of decorrelated decision trees' },
      { type: 'lecture', character: 'priya', text: 'Random Forest fixes the overfitting problem through Breiman\'s insight from 2001: train each tree on a random bootstrap sample with a random subset of features. Averaging decorrelated trees reduces variance without increasing bias.' },
      { type: 'lecture', character: 'drLin', text: 'But here is the crucial part: quality features matter more than model complexity. For volatility forecasting, we engineer features from raw data -- lagged returns, squared returns, absolute returns, rolling volatilities at five, ten, and twenty-two day windows.' },
      { type: 'check', question: 'Why does Random Forest average many decision trees instead of using a single deep tree?', options: ['A single tree is too slow to train', 'Averaging decorrelated trees reduces variance while maintaining low bias', 'Multiple trees are easier to interpret', 'A single tree cannot learn nonlinear patterns'], correctIndex: 1, onCorrect: 'Correct! Each individual tree is noisy, but because they are trained on different data subsets with different features, their errors are decorrelated and averaging cancels out the noise.', onWrong: 'The key insight is that averaging decorrelated trees reduces prediction variance. Each tree overfits differently, so averaging smooths out the individual errors.' },
      { type: 'lecture', character: 'priya', text: 'How do we know which features matter? Permutation importance: randomly shuffle one feature and measure the increase in prediction error. A large increase means the model relied heavily on that feature. It is model-agnostic and very intuitive.' },
      { type: 'lecture', character: 'drLin', text: 'We also need regularization: max depth to limit tree size, minimum samples per leaf to avoid memorizing noise, and max features per split to maintain decorrelation. These constraints prevent the forest from simply memorizing the training data.' },
    ],
  },

  // --- Segment 4: LSTM Intuition (w08-s04, 15 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Random Forest treats each observation independently. But financial data has temporal structure -- yesterday matters. Enter the LSTM: a neural network with memory.' },
      { type: 'lecture', character: 'drLin', text: 'Think of LSTM as a selective diary. Every day, it makes three decisions: Should I forget yesterday\'s entry because the regime changed? Should I write today\'s event because it is important? And based on everything I remember, what do I predict?' },
      { type: 'visual', component: 'LSTMGatesDiagram', caption: 'LSTM architecture: forget, input, and output gates' },
      { type: 'lecture', character: 'priya', text: 'The forget gate decides whether to discard old information when regimes change. The input gate filters whether today\'s return is important enough to update memory. And the output gate determines the final volatility forecast based on everything remembered.' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'LSTM cell state update', props: { formula: 'c_t = f_t \\odot c_{t-1} + i_t \\odot \\tilde{c}_t' } },
      { type: 'lecture', character: 'drLin', text: 'The cell state is the long-term memory. It selectively forgets old information and adds new information, carrying dependencies across many time steps. This is the key advantage over standard neural networks.' },
      { type: 'lecture', character: 'alex', text: 'So GARCH learns volatility clustering with five parameters and an explicit formula, while LSTM discovers similar patterns from data using thousands of parameters without being told the formula. GARCH is efficient; LSTM is flexible.' },
      { type: 'check', question: 'Why is standard k-fold cross-validation inappropriate for evaluating time series models?', options: ['It is computationally too expensive', 'It shuffles temporal order, causing look-ahead bias', 'It requires too many folds', 'It only works for classification tasks'], correctIndex: 1, onCorrect: 'Exactly! Shuffling time series data allows the model to peek at future information during training, creating artificially good results that do not generalize.', onWrong: 'The critical issue is temporal ordering. Standard k-fold shuffles the data, letting the model train on future data and test on past data -- a form of look-ahead bias.' },
      { type: 'lecture', character: 'drLin', text: 'Always use time-series split: train on everything before a cutoff, test on everything after. No shuffling, no future leakage. This is how QuantStar should have tested -- and based on their claim of fifty percent improvement, I strongly suspect they did not.' },
    ],
  },

  // --- Segment 5: Break (w08-s05, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'narrator', text: 'Ten-minute break. When we return: the actual head-to-head comparison. GARCH versus Random Forest versus LSTM. The moment of truth.' },
    ],
  },

  // --- Segment 6: Python Live Demo (w08-s06, 20 min) ---
  {
    steps: [
      { type: 'lecture', character: 'priya', text: 'Welcome back. I have three models ready to race. Let us see who wins -- with proper out-of-sample evaluation. Open the Python notebook and follow along.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'Feature engineering: lagged returns, squared returns, rolling volatilities', props: { code: 'features = engineer_volatility_features(returns, lags=[1,2,5], windows=[5,10,22])' } },
      { type: 'lecture', character: 'priya', text: 'We compute fifteen features from S&P 500 returns -- lagged returns, squared returns, absolute returns, and rolling volatilities. The train-test split is strictly chronological: first seventy percent for training, last thirty percent for testing. No shuffling, no future leakage.' },
      { type: 'visual', component: 'CodeDisplay', caption: 'GJR-GARCH baseline vs. Random Forest vs. LSTM', props: { code: 'results = compare_models(garch_forecast, rf_forecast, lstm_forecast, realized_vol)' } },
      { type: 'lecture', character: 'priya', text: 'The GJR-GARCH baseline is our seven-week workhorse. The Random Forest uses 500 trees with regularization. The LSTM uses 64 hidden units and 20-day lookback windows.' },
      { type: 'visual', component: 'FeatureImportanceChart', caption: 'Random Forest feature importance -- the "aha moment"' },
      { type: 'lecture', character: 'alex', text: 'Look at the feature importance chart! The rolling volatility features completely dominate -- rvol at five days and twenty-two days are the top features. The Random Forest independently discovered what GARCH encodes by design!' },
      { type: 'visual', component: 'VolatilityComparison', caption: 'Head-to-head model comparison: RMSE, MAE, QLIKE' },
      { type: 'lecture', character: 'priya', text: 'Here is the verdict. The Random Forest beats GARCH on RMSE but loses on QLIKE. The LSTM is competitive but not dominant. The rankings depend on which metric you use -- and this is exactly what QuantStar obscured by cherry-picking their metric.' },
    ],
  },

  // --- Segment 7: Hybrid Model (w08-s07, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Neither GARCH nor ML is definitively better. But what if we combined them? What if we used GARCH\'s structural knowledge as a feature in the Random Forest?' },
      { type: 'visual', component: 'FormulaDisplay', caption: 'Hybrid model: GARCH as a feature in Random Forest', props: { formula: '\\hat{\\sigma}^2_{t+1} = f_{RF}(r_{t-1}, r^2_{t-1}, rvol_{5d}, \\ldots, \\hat{\\sigma}^2_{t,GARCH})' } },
      { type: 'lecture', character: 'drLin', text: 'GARCH provides a strong baseline forecast encoding volatility clustering and the leverage effect. The Random Forest can then refine this forecast using additional features that GARCH cannot incorporate. The whole is greater than the sum of its parts.' },
      { type: 'visual', component: 'VolatilityComparison', caption: 'Hybrid model outperforms both standalone approaches', props: { showHybrid: true } },
      { type: 'lecture', character: 'priya', text: 'The hybrid outperforms both standalone GARCH and standalone Random Forest across all metrics. And look at the feature importance: the GARCH conditional variance ranks in the top three. The ML model knows that GARCH is valuable.' },
      { type: 'lecture', character: 'drLin', text: 'Now let us address QuantStar\'s fifty percent improvement claim. Their evaluation was in-sample with look-ahead bias. With proper time-series splits, the standalone RF improvement over GARCH is only one to seven percent, not fifty. The claim was methodologically flawed.' },
      { type: 'check', question: 'Why does the hybrid model (GARCH + Random Forest) outperform both standalone approaches?', options: ['It simply uses more data', 'GARCH provides structural knowledge that the Random Forest can refine with additional features', 'The Random Forest corrects GARCH errors', 'It trains on a longer time period'], correctIndex: 1, onCorrect: 'Exactly. GARCH provides a strong baseline encoding theory-driven patterns, and the Random Forest adds flexibility to capture patterns that GARCH cannot.', onWrong: 'The key is complementarity: GARCH contributes structural knowledge about volatility dynamics, and the Random Forest adds flexibility to incorporate additional features beyond what GARCH can model.' },
      { type: 'lecture', character: 'alex', text: 'During the COVID-19 crisis, the hybrid model responded one-and-a-half days faster than standalone GARCH to the volatility spike. In crisis management, that kind of early warning can save millions.' },
    ],
  },

  // --- Segment 8: The Verdict (w08-s08, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Alex, it is time to present your recommendation to Kenji\'s investment committee. Three options, one recommendation. Walk us through your analysis.' },
      { type: 'lecture', character: 'alex', text: 'Option A: keep GARCH only -- low cost, proven, Basel-compliant, but slow to adapt. Option B: replace with QuantStar ML -- expensive at two-and-a-half million per year, vendor lock-in, and their fifty-percent claim is debunked. Option C: the hybrid -- best performance with seven percent RMSE improvement while maintaining interpretability.' },
      { type: 'check', question: 'Based on the evidence presented, which option would you recommend to Kenji?', options: ['Option A: Keep GARCH only', 'Option B: Replace with QuantStar ML', 'Option C: Deploy the hybrid model', 'Option D: Wait for better AI models'], correctIndex: 2, onCorrect: 'That matches the evidence. The hybrid combines GARCH\'s interpretability and regulatory compliance with ML\'s adaptability and flexibility.', onWrong: 'Based on the head-to-head comparison, the hybrid outperforms both standalone approaches while maintaining regulatory compliance. Option C is the strongest evidence-based choice.' },
      { type: 'lecture', character: 'alex', text: 'My recommendation: Option C. Deploy the hybrid model as the primary forecasting engine. Maintain GJR-GARCH as the regulatory reporting model. Use the ML layer for supplementary monitoring and crisis early warning.' },
      { type: 'lecture', character: 'drLin', text: 'One final nuance. Regulatory models must be auditable. GARCH with five to seven interpretable parameters passes FSA review. Neural networks with ten thousand parameters do not. That is why the hybrid uses GARCH as the regulatory engine and ML as the monitoring layer.' },
    ],
  },

  // --- Segment 9: Discussion: AI Ethics and Future (w08-s09, 10 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'This is the last class discussion of the semester. Let us step back and think about the bigger picture -- AI in finance is not just a technical question. It is an ethical and systemic one.' },
      { type: 'discuss_timer', durationMinutes: 5, prompt: 'If every major fund uses the same AI models, they might all react identically to market stress -- selling the same assets simultaneously. Is AI herding a realistic systemic risk concern?', guidePoints: ['Connect to the Gaussian copula crisis of 2008', 'Model diversity as a safeguard', 'Algorithmic bias from historical training data', 'Human oversight requirements'] },
      { type: 'lecture', character: 'kenji', text: 'I have seen this before. In 2008, everyone was using the same Gaussian copula model for credit derivatives. When the model broke, everyone ran for the exit at the same time. AI herding could create the same dynamic but faster.' },
      { type: 'lecture', character: 'priya', text: 'Job displacement is another concern. But I think it is more job transformation than displacement. The new roles require both finance knowledge and AI skills -- exactly the combination this course has been teaching.' },
      { type: 'lecture', character: 'drLin', text: 'Model diversity and human oversight are essential safeguards. The lesson from every financial crisis is the same: when everyone relies on the same model, the failure mode becomes systemic. AI does not change this fundamental truth -- it amplifies it.' },
    ],
  },

  // --- Segment 10: Wrap-up and Course Summary (w08-s10, 5 min) ---
  {
    steps: [
      { type: 'lecture', character: 'drLin', text: 'Let me take you through the eight-week journey one final time. Week 1: distributions and the failure of normality. Week 2: volatility and its time-varying nature. Weeks 3 and 4: the GARCH family. Week 5: forecasting evaluation.' },
      { type: 'lecture', character: 'drLin', text: 'Week 6: VaR and Expected Shortfall. Week 7: backtesting and stress testing. And today, Week 8: AI meets finance. Each week built on the previous one, and together they form a complete risk management toolkit.' },
      { type: 'lecture', character: 'drLin', text: 'The key takeaways. ML and GARCH are complementary, not competing. Hybrid models win: GARCH provides the structural backbone, ML adds flexibility. Feature engineering is the key to ML success in finance. And always question vendor claims with rigorous out-of-sample testing.' },
      { type: 'lecture', character: 'drLin', text: 'For your final mission -- Mission 8 -- you will write a comprehensive recommendation report to Kenji\'s investment committee. Include the model comparison, hybrid results, regulatory considerations, and your risk assessment. This is the capstone deliverable.' },
      { type: 'lecture', character: 'drLin', text: 'Alex, one last thought. The tools change, but the principles endure. Understand your data. Question your assumptions. Test your models honestly. The journey of learning never truly ends.' },
      { type: 'lecture', character: 'alex', text: 'Thank you, Dr. Lin. And thank you everyone. From distributions to AI in eight weeks -- I would not have believed it was possible on day one. The future of risk management is intelligent integration of all approaches.' },
    ],
  },
];
