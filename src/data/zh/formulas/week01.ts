import { WeekFormulas } from '@/types';

export const week01Formulas: WeekFormulas = {
  weekNumber: 1,
  title: '金融風險與報酬分配',
  formulas: [
    {
      id: 'w01-f01',
      name: '簡單報酬率（Simple Return）',
      latex: 'R_t = \\frac{P_t - P_{t-1}}{P_{t-1}}',
      description: '從一個時期到下一個時期的算術百分比價格變動。',
      variables: {
        'R_t': '時間 t 的簡單報酬率',
        'P_t': '時間 t 的收盤價',
        'P_{t-1}': '時間 t-1 的收盤價',
      },
      weekIntroduced: 1,
    },
    {
      id: 'w01-f02',
      name: '對數報酬率（Log Return）',
      latex: 'r_t = \\ln\\!\\left(\\frac{P_t}{P_{t-1}}\\right) = \\ln(1 + R_t)',
      description: '連續複利報酬率。對數報酬率具有時間可加性且關於零對稱，是計量金融中的標準用法。',
      variables: {
        'r_t': '時間 t 的對數報酬率',
        'P_t': '時間 t 的收盤價',
        'P_{t-1}': '時間 t-1 的收盤價',
        'R_t': '時間 t 的簡單報酬率',
      },
      example: '當報酬率較小（低於 5%）時，ln(1+x) 近似等於 x，因此簡單報酬率與對數報酬率幾乎相同。',
      weekIntroduced: 1,
    },
    {
      id: 'w01-f03',
      name: '偏態（Skewness）（第三動差）',
      latex: 'S = \\frac{1}{T} \\sum_{t=1}^{T} \\left(\\frac{r_t - \\bar{r}}{\\hat{\\sigma}}\\right)^{3}',
      description: '衡量報酬分配的不對稱性。負偏態表示大幅虧損比大幅獲利更頻繁。',
      variables: {
        'S': '偏態係數',
        'T': '觀測值數量',
        'r_t': '時間 t 的報酬率',
        '\\bar{r}': '樣本平均報酬率',
        '\\hat{\\sigma}': '樣本標準差',
      },
      example: 'S = 0：對稱（常態）。S < 0：左偏（較多大幅虧損）。S > 0：右偏。',
      weekIntroduced: 1,
    },
    {
      id: 'w01-f04',
      name: '超額峰態（Excess Kurtosis）（第四動差）',
      latex: 'K = \\frac{1}{T} \\sum_{t=1}^{T} \\left(\\frac{r_t - \\bar{r}}{\\hat{\\sigma}}\\right)^{4} - 3',
      description: '衡量尾部相對於常態分配的厚重程度。減去 3 是因為常態分配的原始峰態為 3。',
      variables: {
        'K': '超額峰態',
        'T': '觀測值數量',
        'r_t': '時間 t 的報酬率',
        '\\bar{r}': '樣本平均報酬率',
        '\\hat{\\sigma}': '樣本標準差',
      },
      example: 'K = 0：常峰態（Mesokurtic，常態尾部）。K > 0：高峰態（Leptokurtic，厚尾）。每日股票報酬的 K 值通常為 5-20+。',
      weekIntroduced: 1,
    },
    {
      id: 'w01-f05',
      name: 'Jarque-Bera 檢定統計量',
      latex: 'JB = \\frac{T}{6}\\left(S^2 + \\frac{K^2}{4}\\right) \\sim \\chi^2(2)',
      description: '將偏態與超額峰態合併為單一常態性檢定。在 5% 顯著水準下，若 JB > 5.99 則拒絕常態假設。',
      variables: {
        'JB': 'Jarque-Bera 檢定統計量',
        'T': '觀測值數量',
        'S': '偏態係數',
        'K': '超額峰態',
        '\\chi^2(2)': '自由度為 2 的卡方分配',
      },
      example: '金融報酬序列的 JB 值通常高達數百甚至數千，提供了壓倒性的非常態證據。',
      weekIntroduced: 1,
    },
    {
      id: 'w01-f06',
      name: '常態尾部機率',
      latex: 'P(Z < -1) = 15.87\\%, \\; P(Z < -2) = 2.28\\%, \\; P(Z < -3) = 0.13\\%, \\; P(Z < -5) = 0.00003\\%',
      description: '標準常態分配下的主要單側尾部機率。在現實中，金融尾部事件發生的頻率遠高於此。',
      variables: {
        'Z': '標準常態隨機變數',
      },
      weekIntroduced: 1,
    },
  ],
};
