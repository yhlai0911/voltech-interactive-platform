import { WeekLesson } from '@/types';

export const week03Lesson: WeekLesson = {
  weekNumber: 3,
  title: '波動度群聚與 GARCH',
  subtitle: '馴服波動巨獸',
  duration: 120,
  prerequisites: [
    '第 2 週（EWMA、滾動波動度）',
    '對自相關（Autocorrelation）的基本理解',
  ],
  learningObjectives: [
    '在報酬率序列中識別波動度群聚（Volatility Clustering），並使用平方報酬率的 ACF 與 Ljung-Box 檢定進行驗證',
    '解釋 ARCH 模型及其作為條件波動度建模基礎的角色',
    '推導並解讀 GARCH(1,1) 模型，包括 omega、alpha 與 beta 各參數的角色',
    '將 GARCH 與 EWMA 連結，並解釋為何 GARCH 增加了均值回歸（Mean Reversion）',
    '使用 Python 中的最大概似估計法（Maximum Likelihood Estimation, MLE）估計 GARCH(1,1) 模型並解讀輸出',
  ],
  segments: [
    { id: 'w03-s01', title: '開場故事', duration: 8, type: 'story', content: '朗讀 VolTech 對話。引子：「我們能否預測波動度，而不只是衡量它？」Mandelbrot 名言：「大變動之後往往跟隨大變動。」', keyPoints: ['Alex Chen 想從衡量進入預測', '波動度群聚是關鍵的可預測模式'] },
    { id: 'w03-s02', title: '偵測群聚現象', duration: 12, type: 'lecture', content: '講授：平方報酬率作為波動度代理變數。展示 ACF 圖：原始報酬率（平坦）vs. 平方報酬率（高度持續性）。介紹 Ljung-Box Q 統計量。', keyPoints: ['報酬率不相關，但平方報酬率具有強烈的自相關性', 'Ljung-Box 檢定將自相關檢定正規化'] },
    { id: 'w03-s03', title: 'ARCH 模型', duration: 15, type: 'lecture', content: '講授：報酬率分解 r_t = sigma_t * z_t。在白板上寫出 ARCH(q) 方程式。活動：「如果昨天的報酬率非常大，會發生什麼？」', keyPoints: ['報酬率 = 時變波動度 乘以 隨機衝擊', 'ARCH(q)：今日變異數取決於過去的平方報酬率', 'ARCH 能捕捉群聚性但需要許多落後項'] },
    { id: 'w03-s04', title: 'GARCH(1,1)', duration: 17, type: 'lecture', content: '核心講授：sigma_t^2 = omega + alpha * r_{t-1}^2 + beta * sigma_{t-1}^2。逐一解析參數。討論定態條件（Stationarity）：alpha + beta < 1。', keyPoints: ['omega：基礎變異數，alpha：衝擊反應，beta：記憶/持續性', 'GARCH(1,1) = 具幾何遞減權重的 ARCH(infinity)', '僅 3 個參數即可捕捉大多數資產的波動度動態'] },
    { id: 'w03-s05', title: '休息', duration: 10, type: 'break', content: '10 分鐘休息。' },
    { id: 'w03-s06', title: '均值回歸與半衰期', duration: 13, type: 'lecture', content: '推導長期變異數 sigma_bar^2 = omega/(1-alpha-beta)。比較 GARCH vs. EWMA（缺少的 omega）。半衰期（Half-life）範例：alpha+beta=0.97 對應 h=23 天。', keyPoints: ['GARCH 有長期錨點（Long-run Anchor），EWMA 沒有', '半衰期衡量波動度回歸均衡的速度', '典型半衰期：14 至 69 天'] },
    { id: 'w03-s07', title: 'MLE 概述', duration: 7, type: 'lecture', content: '講授：對數概似函數（Log-likelihood Function）、數值最佳化。提及 Student-t 延伸以處理厚尾。保持概念層次——細節留在 Python 示範中。', keyPoints: ['MLE 找到使觀測資料機率最大化的參數', 'Student-t 殘差透過容納厚尾來改善配適度'] },
    { id: 'w03-s08', title: 'Python 現場示範', duration: 16, type: 'demo', content: '執行 4 段程式碼：群聚視覺化、ACF/Ljung-Box、GARCH 配適、條件波動度圖。學生同步操作。', keyPoints: ['ACF 比較是「震撼時刻」', 'arch 套件處理 GARCH 估計', '條件波動度圖追蹤每一次危機'] },
    { id: 'w03-s09', title: '應用與診斷', duration: 10, type: 'activity', content: '討論 COVID 崩盤案例：危機前估計、起始問題。展示標準化殘差與 GARCH 後的 Ljung-Box。提問：「為什麼殘差偏態仍為負值？」', keyPoints: ['GARCH 是反應式的，非預防式的——起始問題（Onset Problem）', '若模型正確，標準化殘差應為獨立同分配（i.i.d.）', '殘差中的負偏態指向第 4 週的內容'] },
    { id: 'w03-s10', title: '總結與任務', duration: 12, type: 'wrapup', content: '歸納 6 個關鍵重點。說明任務 3 的繳交項目。預告第 4 週：「GARCH 抹除了符號。但壞消息的衝擊比好消息更大。」', keyPoints: ['波動度具群聚性，ARCH 開創先河，GARCH(1,1) 主宰市場', '均值回歸是 GARCH 相對於 EWMA 的關鍵優勢', '局限性：GARCH 對正負衝擊一視同仁'] },
  ],
};
