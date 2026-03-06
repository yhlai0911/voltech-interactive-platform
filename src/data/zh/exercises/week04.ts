import { WeekExercises } from '@/types';

export const week04Exercises: WeekExercises = {
  weekNumber: 4,
  title: '非對稱波動率 — GJR-GARCH',
  questions: [
    {
      id: 'w04-q01',
      question: '股票市場中的槓桿效應（Leverage Effect）是指以下現象：',
      options: [
        { label: 'A', text: '正報酬率比負報酬率更能增加波動率' },
        { label: 'B', text: '波動率不受報酬率方向影響，保持恆定' },
        { label: 'C', text: '負報酬率比相同幅度的正報酬率更能增加未來波動率' },
        { label: 'D', text: '槓桿比率（Leverage Ratio）對股票波動率沒有影響' },
      ],
      correctAnswer: 'C',
      explanation: '槓桿效應（Black, 1976）描述報酬率與波動率之間的非對稱關係：當股價下跌時，公司的負債權益比（Debt-to-Equity Ratio）自動上升，增加財務風險，從而推高股權波動率。第二個管道——波動率反饋效應（Volatility Feedback Effect）也預測相同模式：預期波動率上升要求更高的預期報酬率，因此價格立即下跌。',
    },
    {
      id: 'w04-q02',
      question: '在 GJR-GARCH(1,1) 模型中，指標函數（Indicator Function）I(r_{t-1} < 0) 的作用是：',
      options: [
        { label: 'A', text: '從估計中移除所有負報酬率' },
        { label: 'B', text: '僅在前一期報酬率為負時啟動額外參數 gamma' },
        { label: 'C', text: '確保條件變異數始終為正' },
        { label: 'D', text: '無論正負號，將所有衝擊的影響加倍' },
      ],
      correctAnswer: 'B',
      explanation: '指標函數在 r_{t-1} < 0 時等於 1，否則等於 0。它充當一個開關：當昨日報酬率為負時，項 gamma * r_{t-1}^2 被加入變異數方程式中，給壞消息一個額外的衝擊。當昨日報酬率為正時，指標為零，模型的行為與標準 GARCH 相同。',
    },
    {
      id: 'w04-q03',
      question: '一個 GJR-GARCH(1,1) 模型估計得到 alpha = 0.03 和 gamma = 0.12。非對稱比率（Asymmetry Ratio）為：',
      options: [
        { label: 'A', text: '(alpha + gamma)/alpha = 5.0，意味著負衝擊的影響是正衝擊的 5 倍' },
        { label: 'B', text: 'gamma / alpha = 4.0' },
        { label: 'C', text: 'alpha / gamma = 0.25' },
        { label: 'D', text: 'alpha + gamma = 0.15' },
      ],
      correctAnswer: 'A',
      explanation: '對於正衝擊，有效係數為 alpha = 0.03。對於負衝擊，有效係數為 alpha + gamma = 0.03 + 0.12 = 0.15。非對稱比率 = 0.15/0.03 = 5.0。這意味著相同絕對大小的負報酬率對明日條件變異數的影響是正報酬率的 5 倍。',
    },
    {
      id: 'w04-q04',
      question: 'EGARCH(1,1) 模型與 GJR-GARCH(1,1) 的根本區別是什麼？',
      options: [
        { label: 'A', text: 'EGARCH 使用簡單報酬率而非對數報酬率' },
        { label: 'B', text: 'EGARCH 完全忽略非對稱性' },
        { label: 'C', text: 'EGARCH 無法用最大概似法估計' },
        { label: 'D', text: 'EGARCH 對 ln(sigma_t^2) 而非 sigma_t^2 建模，無需參數約束即可保證變異數始終為正' },
      ],
      correctAnswer: 'D',
      explanation: 'EGARCH（Nelson, 1991）對對數變異數 ln(sigma_t^2) 建模。由於任何實數的指數函數都是正的，sigma_t^2 = exp(...) > 0 自動成立——不需要對 alpha 或 beta 施加正值約束。相比之下，GJR-GARCH 需要 omega > 0、alpha >= 0、beta >= 0 來確保 sigma_t^2 > 0。',
    },
    {
      id: 'w04-q05',
      question: 'GJR-GARCH 模型的新聞衝擊曲線（News Impact Curve, NIC）：',
      options: [
        { label: 'A', text: '是一條直線' },
        { label: 'B', text: '與標準 GARCH 的 NIC 相同' },
        { label: 'C', text: '是一條非對稱拋物線，左側（負報酬率）比右側更陡，在 r_{t-1} = 0 處有一個折點' },
        { label: 'D', text: '顯示報酬率與股價之間的關係' },
      ],
      correctAnswer: 'C',
      explanation: '新聞衝擊曲線將明日的條件變異數 sigma_t^2 繪製為今日報酬率 r_{t-1} 的函數，同時將 sigma_{t-1}^2 固定在無條件水準。對於 GARCH，NIC 是對稱拋物線。對於 GJR-GARCH，左分支（負 r_{t-1}）的斜率與 alpha + gamma 成正比，右分支斜率與 alpha 成正比，在零點形成一個明顯的「折點」。',
    },
    {
      id: 'w04-q06',
      question: 'GJR-GARCH(1,1) 的定態性條件（Stationarity Condition）為 alpha + gamma/2 + beta < 1。gamma/2 項出現的原因是：',
      options: [
        { label: 'A', text: '模型使用一半的數據進行估計' },
        { label: 'B', text: '在對稱分配下，指標 I(r_{t-1} < 0) 大約有一半的時間處於啟動狀態' },
        { label: 'C', text: 'gamma 參數在模型中總是除以 2' },
        { label: 'D', text: 'EGARCH 的定態性條件也使用 gamma/2' },
      ],
      correctAnswer: 'B',
      explanation: '當報酬率的分配在零附近對稱時（這近似成立），I(r_{t-1} < 0) 的無條件期望值為 1/2。因此，gamma 項平均貢獻 gamma/2 到持續性（Persistence），得到定態性條件 alpha + gamma/2 + beta < 1 以及長期變異數 sigma_bar^2 = omega/(1 - alpha - gamma/2 - beta)。',
    },
    {
      id: 'w04-q07',
      question: '為了檢驗非對稱參數 gamma 是否具有統計顯著性，我們使用概似比檢定（Likelihood Ratio Test）。由於標準 GARCH 巢套於 GJR-GARCH（gamma = 0），檢定統計量為：',
      options: [
        { label: 'A', text: 'LR = 2[L_GJR - L_GARCH] ~ chi^2(1)，在 5% 水準下臨界值為 3.84' },
        { label: 'B', text: 'LR = L_GJR / L_GARCH' },
        { label: 'C', text: 'LR = AIC_GJR - AIC_GARCH' },
        { label: 'D', text: '概似比檢定不能用於巢套 GARCH 模型' },
      ],
      correctAnswer: 'A',
      explanation: '概似比檢定比較受限模型（GARCH，gamma = 0）和未受限模型（GJR-GARCH）的對數概似值。統計量 LR = 2[L_GJR - L_GARCH] 服從自由度為 1 的卡方分配（一個額外參數）。若 LR > 3.84，則在 5% 水準下拒絕 H0: gamma = 0，確認非對稱性具有統計顯著性。',
    },
    {
      id: 'w04-q08',
      question: '如果風險管理者在市場顯著下跌後使用標準 GARCH 而非 GJR-GARCH 來計算 VaR，VaR 估計值可能會：',
      options: [
        { label: 'A', text: '與 GJR-GARCH 估計完全相同' },
        { label: 'B', text: '高於 GJR-GARCH 的估計' },
        { label: 'C', text: '對某些資產較高、對其他資產較低，無法預測' },
        { label: 'D', text: '低於 GJR-GARCH 的估計，因為 GARCH 低估了負衝擊的波動率影響' },
      ],
      correctAnswer: 'D',
      explanation: '市場下跌後，GJR-GARCH 對負報酬率平方施加完整的 alpha + gamma 係數，產生比標準 GARCH（僅使用 alpha）更高的條件變異數。更高的變異數意味著更高的 VaR 估計。標準 GARCH 在市場下跌後系統性地低估風險——而這恰恰是準確風險衡量最為關鍵的時刻。',
    },
  ],
};
