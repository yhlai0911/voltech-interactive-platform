import { WeekLesson } from '@/types';

export const week04Lesson: WeekLesson = {
  weekNumber: 4,
  title: '不對稱波動度 — GJR-GARCH',
  subtitle: '壞消息衝擊更大',
  duration: 120,
  prerequisites: [
    '第 3 週（GARCH(1,1)、MLE、標準化殘差）',
    '對條件變異數與定態性的理解',
  ],
  learningObjectives: [
    '解釋槓桿效應（Leverage Effect），並提供負報酬比正報酬更大幅增加波動度的經濟直覺',
    '設定並解讀 GJR-GARCH 模型，包括不對稱參數 gamma 的角色',
    '建構並解讀 GARCH 與 GJR-GARCH 的新聞衝擊曲線（News Impact Curve）',
    '比較 GJR-GARCH 與 EGARCH 作為替代的不對稱模型設定',
    '在 Python 中估計 GJR-GARCH，並使用 AIC、BIC 與概似比檢定（Likelihood Ratio Test）與標準 GARCH 進行比較評估',
  ],
  segments: [
    { id: 'w04-s01', title: '開場故事', duration: 8, type: 'story', content: '回顧第 3 週的伏筆：Alex Chen 發現的殘差不對稱性。引子：「-3% 的衝擊比 +3% 更猛烈。」讓學生在揭曉前先猜測比率。', keyPoints: ['Alex Chen 注意到 GARCH 殘差在負衝擊後呈現不對稱', '槓桿效應（Leverage Effect）是此模式背後的經濟機制'] },
    { id: 'w04-s02', title: '槓桿效應', duration: 14, type: 'lecture', content: '講授：不對稱波動度的兩種理論。資產負債表槓桿（Black, 1976）：價格下跌 → 負債權益比上升 → 波動度上升。波動度回饋（Campbell & Hentschel, 1992）：波動度上升 → 要求報酬率上升 → 價格下跌。', keyPoints: ['兩種管道預測相同的可觀察模式', '負報酬伴隨比正報酬更大的波動度增幅', '此效應在全球股票市場中強烈且普遍存在'] },
    { id: 'w04-s03', title: 'GJR-GARCH 模型', duration: 16, type: 'lecture', content: '核心講授：在白板上寫出帶有指示函數（Indicator Function）的 GJR 方程式。逐一解析不對稱表格（正衝擊 vs. 負衝擊影響）。計算不對稱比率 (alpha+gamma)/alpha。', keyPoints: ['指示函數 I(r_{t-1} < 0) 是關鍵創新', '正衝擊影響：alpha * r^2。負衝擊影響：(alpha + gamma) * r^2', '定態條件：alpha + gamma/2 + beta < 1（指示函數有一半時間為啟動狀態）'] },
    { id: 'w04-s04', title: '新聞衝擊曲線', duration: 12, type: 'lecture', content: '講授：新聞衝擊曲線（News Impact Curve, NIC）作為診斷工具。畫出 GARCH 拋物線（對稱）vs. GJR 拋物線（在零點處有轉折）。這是關鍵視覺化——給學生時間吸收。', keyPoints: ['NIC 顯示 sigma_t^2 作為 r_{t-1} 的函數，固定 sigma_{t-1}^2', 'GARCH：對稱拋物線。GJR-GARCH：在零點處具不對稱轉折', '轉折點是槓桿效應的視覺特徵'] },
    { id: 'w04-s05', title: '休息', duration: 10, type: 'break', content: '10 分鐘休息。' },
    { id: 'w04-s06', title: 'EGARCH 替代方案', duration: 12, type: 'lecture', content: '講授：EGARCH 模型化 ln(sigma_t^2)，無需約束條件即可保證變異數為正。比較表：GJR vs. EGARCH。符號慣例：GJR gamma > 0 = 槓桿效應；EGARCH gamma < 0 = 槓桿效應。', keyPoints: ['EGARCH 使用對數變異數（Log-variance）公式自動保證正值', 'GJR 與 EGARCH 的符號慣例不同', '兩者透過不同機制捕捉相同的經濟效應'] },
    { id: 'w04-s07', title: '概似比檢定', duration: 6, type: 'lecture', content: '講授：巢狀模型（Nested Models）與概似比檢定（LR Test）。LR = 2[L_GJR - L_GARCH] ~ chi^2(1)。核心問題：gamma 是否顯著異於零？臨界值：5% 水準下為 3.84。', keyPoints: ['GARCH 巢狀於 GJR-GARCH 中（令 gamma = 0）', 'LR 檢定自由度為 1（多一個參數）', '對於股票指數，不對稱性幾乎總是顯著的'] },
    { id: 'w04-s08', title: 'Python 現場示範', duration: 17, type: 'demo', content: '執行 4 段程式碼：配適 GARCH/GJR-GARCH/EGARCH，解讀 GJR 參數與不對稱比率，繪製三個模型的新聞衝擊曲線，比較 COVID 期間的條件波動度。', keyPoints: ['arch_model 呼叫中使用 o=1 來加入不對稱性', 'NIC 圖是視覺亮點——不對稱性非常顯著', 'COVID 比較顯示 GJR 在崩盤期間上升更快'] },
    { id: 'w04-s09', title: '應用與診斷', duration: 13, type: 'activity', content: 'COVID 崩盤比較：GARCH vs. GJR-GARCH 波動度路徑。展示 GJR 在連續負報酬日如何更快攀升。診斷檢查：殘差偏態的改善。', keyPoints: ['GJR-GARCH 在崩盤期間一致估計出較高的波動度', '差距在持續負報酬期間最大', '使用 GJR 後殘差偏態改善（更接近零）'] },
    { id: 'w04-s10', title: '總結與任務', duration: 12, type: 'wrapup', content: '歸納 6 個關鍵重點。說明任務 4 的繳交項目：配適三個模型、NIC 圖、COVID 比較、LR 檢定、一頁備忘錄。預告第 5 週：「配適很簡單，預測才是難關。」', keyPoints: ['槓桿效應：壞消息比好消息更大幅增加波動度', 'GJR-GARCH 僅多一個參數 gamma 即可捕捉不對稱性', '忽略不對稱性會在市場下跌後低估風險'] },
  ],
};
