import { WeekExercises } from '@/types';

export const week02Exercises: WeekExercises = {
  weekNumber: 2,
  title: '衡量波動率',
  questions: [
    {
      id: 'w02-q01',
      question: '滾動窗口波動率（Rolling Window Volatility）估計量的一個主要限制是：',
      options: [
        { label: 'A', text: '需要日內數據' },
        { label: 'B', text: '無法年化' },
        { label: 'C', text: '對窗口內所有觀測值賦予相同權重，使其對機制轉換（Regime Change）的反應遲緩' },
        { label: 'D', text: '總是高估波動率' },
      ],
      correctAnswer: 'C',
      explanation: '滾動窗口對窗口內的每個觀測值一視同仁。250 天前的報酬率與昨天的報酬率權重相同。當市場突然變化時（例如 2020 年 3 月的 COVID-19），長滾動窗口被數月的平靜數據稀釋，反應緩慢。',
    },
    {
      id: 'w02-q02',
      question: '在 lambda = 0.94 的 EWMA 模型中，有效觀測值數（平均滯後期數）大約為：',
      options: [
        { label: 'A', text: '94 天' },
        { label: 'B', text: '17 天' },
        { label: 'C', text: '252 天' },
        { label: 'D', text: '6 天' },
      ],
      correctAnswer: 'B',
      explanation: '有效觀測值數為 1/(1-lambda) = 1/(1-0.94) = 1/0.06 = 16.7 天。這意味著 lambda = 0.94 的 EWMA 大致相當於 17 天的加權平均，但使用指數遞減的權重而非硬性截斷。',
    },
    {
      id: 'w02-q03',
      question: '相較於滾動窗口波動率，EWMA 模型避免了「鬼影效應（Ghosting Artifacts）」，因為：',
      options: [
        { label: 'A', text: '舊觀測值平滑地衰減，而非在 N 天後突然消失' },
        { label: 'B', text: '它使用日內數據' },
        { label: 'C', text: '它包含均值回歸項' },
        { label: 'D', text: '它需要更長的數據歷史' },
      ],
      correctAnswer: 'A',
      explanation: '在滾動窗口中，一個極端觀測值恰好貢獻 N 天然後消失，導致波動率估計值突然人為下降。EWMA 避免了這個問題，因為每個觀測值的權重呈幾何衰減——崩盤的影響逐漸消退，永遠不會突然消失。',
    },
    {
      id: 'w02-q04',
      question: '已實現波動率（Realized Volatility, RV_t）與滾動窗口和 EWMA 估計的主要區別在於：',
      options: [
        { label: 'A', text: '使用月頻數據而非日頻' },
        { label: 'B', text: '需要選擇權價格' },
        { label: 'C', text: '是前瞻性的衡量指標' },
        { label: 'D', text: '使用日內報酬率來衡量盤中價格變動' },
      ],
      correctAnswer: 'D',
      explanation: '已實現波動率的計算方式為日內報酬率的平方和：RV_t = sum of r_{t,j}^2。它利用盤中的價格變動（通常為 5 分鐘報酬率，6.5 小時交易日的 M = 78）來產生比收盤價對收盤價方法更精確的日波動率估計。',
    },
    {
      id: 'w02-q05',
      question: 'CBOE 波動率指數（VIX）最佳的描述是：',
      options: [
        { label: 'A', text: '基於歷史標準差的回顧性指標' },
        { label: 'B', text: '衡量 S&P 500 交易量的指標' },
        { label: 'C', text: '從選擇權價格推導出的前瞻性指標，衡量 S&P 500 預期 30 天波動率' },
        { label: 'D', text: '各主要指數滾動窗口估計的平均值' },
      ],
      correctAnswer: 'C',
      explanation: 'VIX 從 S&P 500 指數選擇權（Index Options）價格中萃取市場對 30 天波動率的預期。它是前瞻性的（反映預期未來波動率）且已年化（VIX = 20 表示約 20% 年化波動率，即 20/sqrt(252) = 1.26% 日波動率）。在危機期間，VIX 通常領先於已實現波動率。',
    },
    {
      id: 'w02-q06',
      question: '以下哪項是金融波動率的「程式化事實（Stylized Fact）」？',
      options: [
        { label: 'A', text: '波動率隨時間保持不變' },
        { label: 'B', text: '大報酬率之後通常跟隨大報酬率（波動率聚集，Volatility Clustering）' },
        { label: 'C', text: '正報酬率和負報酬率對未來波動率的影響相同' },
        { label: 'D', text: '不同市場之間的波動率不相關' },
      ],
      correctAnswer: 'B',
      explanation: '波動率聚集是金融學中最穩健的程式化事實之一：大報酬率（無論正負）之後傾向跟隨大報酬率，小報酬率之後跟隨小報酬率。正式來說，報酬率本身不相關，但其絕對值呈正自相關（Autocorrelation）。',
    },
    {
      id: 'w02-q07',
      question: '變異數風險溢酬（Variance Risk Premium）指的是以下觀察到的現象：',
      options: [
        { label: 'A', text: '平均而言，隱含波動率（Implied Volatility，如 VIX）超過已實現波動率，因此選擇權賣方因承擔波動率風險而獲得溢酬' },
        { label: 'B', text: '已實現波動率總是超過隱含波動率' },
        { label: 'C', text: 'VIX 和滾動窗口波動率總是相等' },
        { label: 'D', text: '更高的波動率總是帶來更高的報酬率' },
      ],
      correctAnswer: 'A',
      explanation: '變異數風險溢酬是隱含波動率（來自選擇權價格）與隨後已實現波動率之間的差異。平均而言，這個溢酬為正——選擇權賣方因承擔波動率可能突然飆升的風險而獲得補償。這是實證金融學中最穩健的發現之一。',
    },
    {
      id: 'w02-q08',
      question: '一位風險管理者、一位投資組合經理和一位衍生性商品交易員各自需要波動率估計。以下哪個陳述最準確？',
      options: [
        { label: 'A', text: '三人都應使用相同的 252 天滾動窗口' },
        { label: 'B', text: '風險管理者應使用 VIX；其他人應使用 EWMA' },
        { label: 'C', text: '投資組合經理需要最靈敏的衡量方法' },
        { label: 'D', text: '沒有單一的波動率衡量方法適用於所有目的；選擇取決於應用場景、時間範圍和數據可得性' },
      ],
      correctAnswer: 'D',
      explanation: '教材強調不同使用者需要不同的衡量方法：風險管理者需要靈敏度（EWMA、短滾動窗口或 VIX），投資組合經理可能偏好穩定性（較長的滾動窗口），衍生性商品交易員需要前瞻性的隱含波動率。正確的「尺」取決於工作需求。',
    },
  ],
};
