import { WeekExercises } from '@/types';

export const week05Exercises: WeekExercises = {
  weekNumber: 5,
  title: '波動率預測',
  questions: [
    {
      id: 'w05-q01',
      question: '樣本內擬合（In-sample Fit）和樣本外預測（Out-of-sample Forecasting）之間的關鍵區別是什麼？',
      options: [
        { label: 'A', text: '樣本內使用比樣本外更多的數據' },
        { label: 'B', text: '樣本外是在模型估計過程中從未見過的數據上評估預測能力' },
        { label: 'C', text: '樣本內總是比樣本外更準確' },
        { label: 'D', text: '兩者之間沒有實際差異' },
      ],
      correctAnswer: 'B',
      explanation: '樣本外預測測試模型對其未曾在訓練中使用的數據的預測能力。一個模型可能完美擬合過去的數據（高樣本內擬合度），但由於過度擬合（Overfitting）——記住噪音而非學習真實模式——在新數據上表現不佳。',
    },
    {
      id: 'w05-q02',
      question: 'QLIKE 損失函數（Quasi-Likelihood Loss）用於波動率預測的定義為：',
      options: [
        { label: 'A', text: '(1/T) * sum of (sigma_t^{2*} - hat_sigma_t^2)^2' },
        { label: 'B', text: '(1/T) * sum of |sigma_t^{2*} - hat_sigma_t^2|' },
        { label: 'C', text: '(1/T) * sum of [ln(hat_sigma_t^2) + sigma_t^{2*} / hat_sigma_t^2]' },
        { label: 'D', text: '(1/T) * sum of [(sigma_t^{2*} - hat_sigma_t^2) / hat_sigma_t^2]^2' },
      ],
      correctAnswer: 'C',
      explanation: 'QLIKE（擬概似損失）懲罰相對預測誤差，其特別有價值之處在於，無論使用哪種波動率代理變數，都能產生一致的模型排序（Patton, 2011）。選項 (A) 是 MSE，選項 (B) 是 MAE。',
    },
    {
      id: 'w05-q03',
      question: '在 Mincer-Zarnowitz 迴歸 sigma_t^{2*} = a + b * hat_sigma_t^2 + u_t 中，拒絕 H0: a = 0, b = 1 表示什麼？',
      options: [
        { label: 'A', text: '模型完美預測波動率' },
        { label: 'B', text: '預測誤差呈常態分配' },
        { label: 'C', text: '波動率代理變數不可靠' },
        { label: 'D', text: '預測存在偏誤（Bias）或無效率' },
      ],
      correctAnswer: 'D',
      explanation: '拒絕 H0: a = 0, b = 1 意味著預測未能有效利用可用資訊。若 a != 0，存在系統性偏誤。若 b != 1，預測對波動率變化的反應過度（b < 1）或反應不足（b > 1）。',
    },
    {
      id: 'w05-q04',
      question: '在窗口大小 W = 1000 的滾動窗口預測程序中，第二次預測是使用哪些觀測值來估計的？',
      options: [
        { label: 'A', text: '1, 2, ..., 1000（與第一次相同）' },
        { label: 'B', text: '2, 3, ..., 1001' },
        { label: 'C', text: '1, 2, ..., 1001（擴展窗口）' },
        { label: 'D', text: '501, 502, ..., 1500' },
      ],
      correctAnswer: 'B',
      explanation: '在滾動窗口中，估計樣本始終包含恰好 W 個觀測值。第一次預測時，我們在 {1, ..., 1000} 上估計並預測第 1001 天。第二次預測時，窗口向前滾動：在 {2, ..., 1001} 上估計並預測第 1002 天。選項 (C) 描述的是擴展窗口（Expanding Window）。',
    },
    {
      id: 'w05-q05',
      question: '為什麼報酬率平方 r_t^2 作為波動率代理變數存在問題？',
      options: [
        { label: 'A', text: '它是每日變異數的無偏但噪音極大的估計量' },
        { label: 'B', text: '它總是高估真實波動率' },
        { label: 'C', text: '沒有日內數據就無法計算' },
        { label: 'D', text: '它偏向於零' },
      ],
      correctAnswer: 'A',
      explanation: '報酬率平方 r_t^2 是條件變異數的無偏估計量（Unbiased Estimator），但由於它僅基於單一觀測值，噪音極大。這種噪音使所有模型看起來都不準確（MZ 迴歸中 R^2 低），但模型排序通常是保留的。已實現變異數（Realized Variance）則精確得多。',
    },
    {
      id: 'w05-q06',
      question: 'Diebold-Mariano 檢定評估的是：',
      options: [
        { label: 'A', text: '模型的參數是否具有統計顯著性' },
        { label: 'B', text: '模型的殘差是否呈常態分配' },
        { label: 'C', text: '兩個模型的預測準確度是否存在顯著差異' },
        { label: 'D', text: '模型的預測是否無偏' },
      ],
      correctAnswer: 'C',
      explanation: 'Diebold-Mariano（DM）檢定比較兩個競爭模型的預測準確度。它檢驗 H0: E[d_t] = 0，其中 d_t 是損失差異。檢定使用 HAC（Newey-West）標準誤來處理序列相關性（Serial Correlation）。若 |DM| > 1.96，則一個模型顯著優於另一個。',
    },
    {
      id: 'w05-q07',
      question: '哪個損失函數對波動率代理變數的選擇最為穩健（Robust）？',
      options: [
        { label: 'A', text: 'MSE（均方誤差，Mean Squared Error）' },
        { label: 'B', text: 'MAE（平均絕對誤差，Mean Absolute Error）' },
        { label: 'C', text: 'OLS 迴歸的 R^2' },
        { label: 'D', text: 'QLIKE（擬概似損失，Quasi-Likelihood Loss）' },
      ],
      correctAnswer: 'D',
      explanation: 'Patton（2011）證明，無論使用哪種波動率代理變數（r_t^2、已實現變異數或極差法），QLIKE 都能產生一致的模型排序。MSE 和 MAE 可能因代理變數不同而產生不同排序，因為它們對目標變數中的噪音水準更為敏感。',
    },
    {
      id: 'w05-q08',
      question: '在股票指數的實證研究中，哪個模型通常在日頻水準上產生最佳的樣本外波動率預測？',
      options: [
        { label: 'A', text: '標準 GARCH(1,1)' },
        { label: 'B', text: 'GJR-GARCH(1,1) 或其他非對稱模型' },
        { label: 'C', text: '具有多參數的 GARCH(3,3)' },
        { label: 'D', text: '深度學習模型（LSTM、Transformer）' },
      ],
      correctAnswer: 'B',
      explanation: '非對稱模型如 GJR-GARCH 在股票指數上一致優於標準 GARCH，因為槓桿效應（負報酬率比正報酬率更能增加波動率）包含真正的預測性資訊。增加更多 GARCH 滯後階數通常因過度擬合而適得其反。深度學習模型在較長期限上具有競爭力，但在日頻水準上很少能勝過 GARCH 族模型。',
    },
  ],
};
