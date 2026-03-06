import { WeekFormulas } from '@/types';

export const week05Formulas: WeekFormulas = {
  weekNumber: 5,
  title: '波動度預測',
  formulas: [
    {
      id: 'w05-f01',
      name: '均方誤差（Mean Squared Error, MSE）',
      latex: '\\text{MSE} = \\frac{1}{T} \\sum_{t=1}^{T} (\\sigma_t^{2*} - \\hat{\\sigma}_t^2)^2',
      description: '已實現波動度代理值與預測值之間的平方差平均值。對大誤差給予嚴重懲罰。',
      variables: {
        '\\sigma_t^{2*}': '已實現波動度代理值（例如平方報酬）',
        '\\hat{\\sigma}_t^2': '預測的條件變異數',
        'T': '樣本外觀測值數量',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f02',
      name: '均方根誤差（Root Mean Squared Error, RMSE）',
      latex: '\\text{RMSE} = \\sqrt{\\frac{1}{T} \\sum_{t=1}^{T} (\\sigma_t^{2*} - \\hat{\\sigma}_t^2)^2}',
      description: 'MSE 的平方根。單位與變異數相同，更易於解讀。',
      variables: {
        '\\sigma_t^{2*}': '已實現波動度代理值',
        '\\hat{\\sigma}_t^2': '預測的條件變異數',
        'T': '樣本外觀測值數量',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f03',
      name: '平均絕對誤差（Mean Absolute Error, MAE）',
      latex: '\\text{MAE} = \\frac{1}{T} \\sum_{t=1}^{T} |\\sigma_t^{2*} - \\hat{\\sigma}_t^2|',
      description: '代理值與預測值之間的絕對差平均值。相較 MSE 對離群值更為穩健。',
      variables: {
        '\\sigma_t^{2*}': '已實現波動度代理值',
        '\\hat{\\sigma}_t^2': '預測的條件變異數',
        'T': '樣本外觀測值數量',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f04',
      name: 'QLIKE（準概似損失函數）',
      latex: '\\text{QLIKE} = \\frac{1}{T} \\sum_{t=1}^{T} \\left( \\ln(\\hat{\\sigma}_t^2) + \\frac{\\sigma_t^{2*}}{\\hat{\\sigma}_t^2} \\right)',
      description: '懲罰相對預測誤差。無論使用何種波動度代理值，都能產生一致的模型排名（Patton, 2011）。',
      variables: {
        '\\hat{\\sigma}_t^2': '預測的條件變異數',
        '\\sigma_t^{2*}': '已實現波動度代理值',
        'T': '樣本外觀測值數量',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f05',
      name: 'Mincer-Zarnowitz 迴歸',
      latex: '\\sigma_t^{2*} = a + b \\, \\hat{\\sigma}_t^2 + u_t',
      description: '將已實現代理值對預測值進行迴歸以檢定預測效率性。完美預測意味著 a=0、b=1。',
      variables: {
        '\\sigma_t^{2*}': '已實現波動度代理值',
        '\\hat{\\sigma}_t^2': '預測的條件變異數',
        'a': '截距（偏差項）',
        'b': '斜率（反應程度）；b<1 = 過度反應，b>1 = 反應不足',
        'u_t': '誤差項',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f06',
      name: 'Mincer-Zarnowitz F 檢定',
      latex: 'H_0: a = 0, \\; b = 1',
      description: '預測效率性的聯合假設檢定。拒絕表示預測有偏差或效率不足。',
      variables: {
        'a': '無偏預測下應為零',
        'b': '有效率預測下應為一',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f07',
      name: 'Diebold-Mariano 檢定統計量',
      latex: 'DM = \\frac{\\bar{d}}{\\hat{\\sigma}_{\\bar{d}}} \\xrightarrow{d} N(0,1)',
      description: '檢定兩個模型的預測準確度是否有顯著差異。使用 HAC 標準誤來處理損失差序列的序列相關性。',
      variables: {
        '\\bar{d}': '兩個模型之間的平均損失差',
        '\\hat{\\sigma}_{\\bar{d}}': '平均差的 HAC（Newey-West）標準誤',
        'd_t': '損失差：L(模型 1) - L(模型 2)',
      },
      weekIntroduced: 5,
    },
    {
      id: 'w05-f08',
      name: '損失差（Loss Differential）',
      latex: 'd_t = L(\\hat{\\sigma}_{1,t}^2) - L(\\hat{\\sigma}_{2,t}^2)',
      description: '兩個競爭模型在時間 t 的損失函數值之差。正值表示模型 1 損失較高（模型 2 較佳）。',
      variables: {
        'L(\\cdot)': '損失函數（例如平方誤差或 QLIKE）',
        '\\hat{\\sigma}_{1,t}^2': '模型 1 的預測值',
        '\\hat{\\sigma}_{2,t}^2': '模型 2 的預測值',
      },
      weekIntroduced: 5,
    },
  ],
};
