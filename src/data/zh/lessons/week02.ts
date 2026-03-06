import { WeekLesson } from '@/types';

export const week02Lesson: WeekLesson = {
  weekNumber: 2,
  title: '波動度衡量',
  subtitle: '多把尺，一個真相',
  duration: 120,
  prerequisites: [
    '第 1 週（報酬率、分配特性）',
    '基礎 Python',
  ],
  learningObjectives: [
    '使用不同長度的滾動窗口（Rolling Window）計算歷史波動度',
    '套用 EWMA 模型並解釋為何它對新資訊反應更快',
    '定義已實現波動度（Realized Volatility）並說明其相對於收盤價估計量的優勢',
    '將 VIX 指數解讀為市場前瞻性的波動度預期',
    '比較 COVID-19 危機期間多種波動度衡量方法的表現',
  ],
  segments: [
    { id: 'w02-s01', title: '回顧與開場', duration: 8, type: 'story', content: '快速回顧第 1 週（厚尾、JB 檢定）。開場引子：Kenji 的提問「我們現在的波動度有多大？」Dr. Lin 的比喻：「你不能只用一把尺。」', keyPoints: ['銜接第 1 週的發現', '引出時變波動度（Time-varying Volatility）衡量的動機'] },
    { id: 'w02-s02', title: '滾動窗口波動度', duration: 17, type: 'lecture', content: '講授：滾動窗口公式（公式 2.1），偏差-變異權衡（Bias-Variance Trade-off）。白板：20 日 vs. 252 日窗口。討論等權重的限制與幽靈效應（Ghosting Artifacts）。', keyPoints: ['短窗口：反應快但雜訊大', '長窗口：平滑但遲鈍', '等權重是一個限制：舊資料與新資料權重相同'] },
    { id: 'w02-s03', title: 'EWMA', duration: 20, type: 'lecture', content: '講授：遞迴公式（Recursive Formula，公式 2.2）、展開形式（公式 2.3）。RiskMetrics 標準 lambda = 0.94。有效窗口：1/(1-lambda) 約 17 日。EWMA 是 GARCH(1,1) 在 omega = 0 時的特例。', keyPoints: ['指數遞減權重優先考慮近期資料', 'lambda = 0.94 是業界標準', '無幽靈效應——舊資料平滑衰減', 'EWMA 是無均值回歸（Mean Reversion）的 GARCH 特例'] },
    { id: 'w02-s04', title: '已實現波動度', duration: 10, type: 'lecture', content: '講授：RV_t = 日內報酬率平方和。二次變差（Quadratic Variation）與積分變異數（Integrated Variance）。實務說明：5 分鐘報酬率、微結構雜訊。', keyPoints: ['使用日內資料獲得更精確的日波動度', '隨抽樣頻率增加，收斂至真實積分變異數', '5 分鐘抽樣是實務慣例'] },
    { id: 'w02-s05', title: '休息', duration: 10, type: 'break', content: '10 分鐘休息。' },
    { id: 'w02-s06', title: 'VIX 指數', duration: 15, type: 'lecture', content: '講授：前瞻性 vs. 回顧性。VIX 解讀（VIX=20 表示 20% 年化波動度）。COVID-19 期間 VIX 飆升至 82.69。變異數風險溢酬（Variance Risk Premium）概念。波動度微笑/偏斜。', keyPoints: ['VIX 衍生自選擇權價格——屬前瞻性指標', '危機期間 VIX 通常領先已實現波動度', '變異數風險溢酬：隱含波動度平均高於已實現波動度'] },
    { id: 'w02-s07', title: 'Python 現場示範', duration: 15, type: 'demo', content: '執行 3 段程式碼：滾動波動度、EWMA 函數、VIX 儀表板。重點關注 COVID-19 期間的比較。學生同步操作。', keyPoints: ['波動度儀表板比較所有衡量方法', 'VIX 最先飆升，EWMA 緊隨其後，滾動 252 日窗口完全無用'] },
    { id: 'w02-s08', title: '應用案例', duration: 10, type: 'activity', content: '討論表 2.1（COVID-19 期間的反應速度）。VIX 領先，EWMA 跟隨，滾動 252 日窗口無用。提問：「你會推薦哪種方法用於每日風險監控？」', keyPoints: ['偵測速度在風險管理中極為重要', '提前一週預警可能挽救數億元'] },
    { id: 'w02-s09', title: '典型化事實與討論', duration: 10, type: 'discussion', content: '呈現波動度的 5 個典型化事實（Stylized Facts）：群聚性、均值回歸、不對稱性、長記憶、共同移動。小組討論：哪種衡量方法適合哪種用途？', keyPoints: ['滾動窗口無法良好捕捉任何典型化事實', 'EWMA 部分捕捉了群聚性', '沒有一種萬用的衡量方法'] },
    { id: 'w02-s10', title: '總結與任務', duration: 5, type: 'wrapup', content: '歸納 6 個關鍵重點。說明任務 2（3 個指數的波動度儀表板）。預告第 3 週：「GARCH 賦予波動度記憶。」', keyPoints: ['波動度不是常數——它具群聚性、均值回歸性，且反應不對稱', '正確的衡量方法取決於應用場景'] },
  ],
};
