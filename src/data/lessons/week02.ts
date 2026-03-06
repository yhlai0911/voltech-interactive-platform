import { WeekLesson } from '@/types';

export const week02Lesson: WeekLesson = {
  weekNumber: 2,
  title: 'Measuring Volatility',
  subtitle: 'Many rulers, one truth',
  duration: 120,
  prerequisites: [
    'Week 1 (returns, distributional properties)',
    'Basic Python',
  ],
  learningObjectives: [
    'Compute historical volatility using rolling windows of different lengths',
    'Apply the EWMA model and explain why it responds faster to new information',
    'Define realized volatility and explain its advantages over close-to-close estimators',
    'Interpret the VIX index as the market\'s forward-looking volatility expectation',
    'Compare multiple volatility measures around the COVID-19 crisis period',
  ],
  segments: [
    { id: 'w02-s01', title: 'Review and Opening', duration: 8, type: 'story', content: 'Quick recap of Week 1 (fat tails, JB test). Opening hook: Kenji\'s question "How volatile are we right now?" Dr. Lin\'s metaphor: "You cannot use a single ruler."', keyPoints: ['Connect to Week 1 findings', 'Motivate time-varying volatility measurement'] },
    { id: 'w02-s02', title: 'Rolling Window Volatility', duration: 17, type: 'lecture', content: 'Lecture: rolling window formula (Eq. 2.1), bias-variance trade-off. Whiteboard: 20-day vs. 252-day window. Discuss equal-weighting limitation and ghosting artifacts.', keyPoints: ['Short window: responsive but noisy', 'Long window: smooth but slow', 'Equal weighting is a limitation: old data counts the same as recent'] },
    { id: 'w02-s03', title: 'EWMA', duration: 20, type: 'lecture', content: 'Lecture: recursive formula (Eq. 2.2), expanded form (Eq. 2.3). RiskMetrics lambda = 0.94 standard. Effective window: 1/(1-lambda) approximately 17 days. EWMA is a special case of GARCH(1,1) with omega = 0.', keyPoints: ['Exponentially declining weights prioritize recent data', 'lambda = 0.94 is the industry standard', 'No ghosting artifacts -- old data fades smoothly', 'EWMA is a special case of GARCH with no mean reversion'] },
    { id: 'w02-s04', title: 'Realized Volatility', duration: 10, type: 'lecture', content: 'Lecture: RV_t = sum of squared intraday returns. Quadratic variation and integrated variance. Practical note: 5-minute returns, microstructure noise.', keyPoints: ['Uses intraday data for more accurate daily volatility', 'Converges to true integrated variance as sampling increases', '5-minute sampling is the practical convention'] },
    { id: 'w02-s05', title: 'Break', duration: 10, type: 'break', content: '10-minute break.' },
    { id: 'w02-s06', title: 'The VIX', duration: 15, type: 'lecture', content: 'Lecture: forward-looking vs. backward-looking. VIX interpretation (VIX=20 means 20% annual vol). COVID-19 VIX spike to 82.69. Variance risk premium concept. Volatility smile/smirk.', keyPoints: ['VIX is derived from option prices -- forward-looking', 'VIX often leads realized volatility during crises', 'Variance risk premium: implied vol > realized vol on average'] },
    { id: 'w02-s07', title: 'Python Live Demo', duration: 15, type: 'demo', content: 'Run 3 code blocks: rolling volatility, EWMA function, VIX dashboard. Highlight COVID-19 period comparison. Students follow along.', keyPoints: ['Volatility dashboard comparing all measures', 'VIX spiked first, EWMA followed, rolling 252-day was useless'] },
    { id: 'w02-s08', title: 'Application', duration: 10, type: 'activity', content: 'Discuss Table 2.1 (speed of response during COVID-19). VIX led, EWMA followed, rolling 252-day was useless. Ask: "Which measure would you recommend for daily risk monitoring?"', keyPoints: ['Speed of detection matters enormously in risk management', 'A week\'s early warning could save hundreds of millions'] },
    { id: 'w02-s09', title: 'Stylized Facts and Discussion', duration: 10, type: 'discussion', content: 'Present 5 stylized facts of volatility: clustering, mean reversion, asymmetry, long memory, co-movement. Group discussion: which measure suits which job?', keyPoints: ['Rolling window captures none of the stylized facts well', 'EWMA captures clustering partially', 'No one-size-fits-all measure'] },
    { id: 'w02-s10', title: 'Wrap-up and Mission', duration: 5, type: 'wrapup', content: 'Summarize 6 key takeaways. Explain Mission 2 (volatility dashboard for 3 indices). Tease Week 3: "GARCH gives volatility a memory."', keyPoints: ['Volatility is not constant -- it clusters, mean-reverts, and responds asymmetrically', 'The right measure depends on the application'] },
  ],
};
