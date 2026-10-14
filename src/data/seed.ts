import type { Question, StudyData, Subject } from '@/types'

/**
 * 数据版本号
 * ------------------------------------------------------------
 * 每次内置题库发生结构性变化（新增学科 / 大幅调整题目）时递增，
 * store 启动时会比对本地已存数据的版本，不一致则用最新种子覆盖，
 * 保证「题目会更新，做题记录会在版本升级时重置」。
 */
export const DATA_VERSION = 2

/** 判断题的固定两个选项 */
const JUDGE_OPTIONS = [
  { key: 'T', text: '正确' },
  { key: 'F', text: '错误' }
]

/**
 * 学科（学习分类顶层）
 * 本次题库全部来自 2026 成人高考（专升本）考前资料：
 *   高等数学 · 英语 · 政治
 */
export const seedSubjects: Subject[] = [
  { id: 'sub-math', name: '高等数学' },
  { id: 'sub-eng', name: '英语' },
  { id: 'sub-pol', name: '政治' }
]

/**
 * 题库（按学科 + 章节组织）
 * 题目内容严格取自用户上传的 2026 成考资料：
 *   - 政治：考前冲刺课 PPT（含真题 + 答案解析）
 *   - 英语：考前冲刺课 PPT（含真题）+ 常考易考点手册（语法/语音）
 *   - 高等数学：考前冲刺课 PPT（考纲）+ 常考易考点手册（考点）
 */
export const seedQuestions: Question[] = [
  // ============================================================
  //  高等数学
  // ============================================================
  {
    id: 'q-math-001',
    subjectId: 'sub-math',
    chapter: '极限与连续',
    type: 'single',
    stem: '极限 lim(x→0) sinx/x 的值为（　）。',
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '1' },
      { key: 'C', text: '∞' },
      { key: 'D', text: '不存在' }
    ],
    answer: ['B'],
    analysis: '这是第一个重要极限。当 x→0 时 sinx/x 的极限为 1，可用夹逼准则证明。',
    tags: ['极限', '重要极限'],
    difficulty: 1
  },
  {
    id: 'q-math-002',
    subjectId: 'sub-math',
    chapter: '极限与连续',
    type: 'single',
    stem: '极限 lim(x→∞) (1 + 1/x)^x 的值为（　）。',
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: 'e' },
      { key: 'C', text: '0' },
      { key: 'D', text: '不存在' }
    ],
    answer: ['B'],
    analysis: '这是第二个重要极限：lim(x→∞)(1 + 1/x)^x = e。做此类题一般先凑成标准公式模式，再处理幂的部分。',
    tags: ['极限', '重要极限', 'e'],
    difficulty: 2
  },
  {
    id: 'q-math-003',
    subjectId: 'sub-math',
    chapter: '极限与连续',
    type: 'judge',
    stem: '函数 f(x) 在 x₀ 处极限存在的充要条件是左极限与右极限都存在且相等。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '左极限＝右极限 ⇒ 在 x₀ 处有极限；若再有极限值等于该点函数值，则在该点连续。',
    tags: ['极限', '左右极限'],
    difficulty: 1
  },
  {
    id: 'q-math-004',
    subjectId: 'sub-math',
    chapter: '极限与连续',
    type: 'multiple',
    stem: '下列关于无穷小量的说法，正确的有（　）。',
    options: [
      { key: 'A', text: '有限个无穷小量的和、差、积仍为无穷小量' },
      { key: 'B', text: '无穷小量与有界量之积仍为无穷小量' },
      { key: 'C', text: '在同一变化过程中，f(x) 为无穷小量，则 1/f(x) 为无穷大量' },
      { key: 'D', text: '无穷小量是一个很小的常数' }
    ],
    answer: ['A', 'B', 'C'],
    analysis: 'D 错误：无穷小量是「以 0 为极限的变量」，不是某个很小的固定常数。A、B、C 均为手册中的结论。',
    tags: ['无穷小量', '无穷大量'],
    difficulty: 2
  },
  {
    id: 'q-math-005',
    subjectId: 'sub-math',
    chapter: '极限与连续',
    type: 'single',
    stem: '当 x→∞ 时，求形如「∞/∞」型的多项式极限，通常采用的方法是（　）。',
    options: [
      { key: 'A', text: '分解因式后约分' },
      { key: 'B', text: '分子分母同除以最高次幂' },
      { key: 'C', text: '有理化' },
      { key: 'D', text: '直接代入' }
    ],
    answer: ['B'],
    analysis: '手册给出的求极限步骤：多项式 ∞/∞ 型——分子分母同除以最高次幂，再求极限。',
    tags: ['极限', '求极限方法'],
    difficulty: 1
  },
  {
    id: 'q-math-006',
    subjectId: 'sub-math',
    chapter: '极限与连续',
    type: 'judge',
    stem: '函数在某点连续，则它在该点一定可导。',
    options: JUDGE_OPTIONS,
    answer: ['F'],
    analysis: '可导必连续，但连续不一定可导。连续是可导的必要条件而非充分条件。',
    tags: ['连续', '可导'],
    difficulty: 1
  },
  {
    id: 'q-math-007',
    subjectId: 'sub-math',
    chapter: '一元函数微分学',
    type: 'single',
    stem: '函数 f(x) = x² 的导数为（　）。',
    options: [
      { key: 'A', text: '2x' },
      { key: 'B', text: 'x' },
      { key: 'C', text: 'x²' },
      { key: 'D', text: '2' }
    ],
    answer: ['A'],
    analysis: '由幂函数求导公式 (xⁿ)′ = n·xⁿ⁻¹，得 (x²)′ = 2x。',
    tags: ['导数', '幂函数'],
    difficulty: 1
  },
  {
    id: 'q-math-008',
    subjectId: 'sub-math',
    chapter: '一元函数微分学',
    type: 'single',
    stem: '函数 y = x³ 的导数为（　）。',
    options: [
      { key: 'A', text: '3x²' },
      { key: 'B', text: 'x²' },
      { key: 'C', text: '3x' },
      { key: 'D', text: 'x³/3' }
    ],
    answer: ['A'],
    analysis: '(x³)′ = 3x²，仍是幂函数求导公式的直接应用。',
    tags: ['导数', '幂函数'],
    difficulty: 1
  },
  {
    id: 'q-math-009',
    subjectId: 'sub-math',
    chapter: '一元函数微分学',
    type: 'single',
    stem: '函数 y = sinx 的导数为（　）。',
    options: [
      { key: 'A', text: '-cosx' },
      { key: 'B', text: 'cosx' },
      { key: 'C', text: '-sinx' },
      { key: 'D', text: 'sinx' }
    ],
    answer: ['B'],
    analysis: '基本求导公式：(sinx)′ = cosx，(cosx)′ = -sinx。',
    tags: ['导数', '三角函数'],
    difficulty: 1
  },
  {
    id: 'q-math-010',
    subjectId: 'sub-math',
    chapter: '一元函数微分学',
    type: 'single',
    stem: '导数的几何意义是（　）。',
    options: [
      { key: 'A', text: '曲线在该点切线的斜率' },
      { key: 'B', text: '曲线在该点法线的斜率' },
      { key: 'C', text: '曲线在该点的函数值' },
      { key: 'D', text: '曲线在该点的增量' }
    ],
    answer: ['A'],
    analysis: '导数 f′(x₀) 表示曲线 y = f(x) 在点 (x₀, f(x₀)) 处切线的斜率。',
    tags: ['导数', '几何意义'],
    difficulty: 1
  },
  {
    id: 'q-math-011',
    subjectId: 'sub-math',
    chapter: '一元函数微分学',
    type: 'judge',
    stem: '法线斜率与切线斜率互为负倒数。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '求切线：先求导数得切线斜率，再代入点斜式；法线斜率只是切线斜率的负倒数。',
    tags: ['导数', '切线', '法线'],
    difficulty: 2
  },
  {
    id: 'q-math-012',
    subjectId: 'sub-math',
    chapter: '一元函数微分学',
    type: 'single',
    stem: '若函数 f(x) 在某点可导且在该点取得极值，则该点处（　）。',
    options: [
      { key: 'A', text: 'f′(x₀) = 0' },
      { key: 'B', text: 'f′(x₀) > 0' },
      { key: 'C', text: 'f′(x₀) < 0' },
      { key: 'D', text: 'f′(x₀) 一定不存在' }
    ],
    answer: ['A'],
    analysis: '可导函数取得极值的必要条件是该点导数为 0（该点称为驻点）。',
    tags: ['导数应用', '极值', '驻点'],
    difficulty: 2
  },
  {
    id: 'q-math-013',
    subjectId: 'sub-math',
    chapter: '一元函数微分学',
    type: 'judge',
    stem: '曲线凹凸性的分界点称为拐点。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '手册考点五：令二阶导数为 0 求出疑是拐点的横坐标，凹凸的分界点即为拐点。',
    tags: ['导数应用', '拐点', '凹凸性'],
    difficulty: 2
  },
  {
    id: 'q-math-014',
    subjectId: 'sub-math',
    chapter: '一元函数微分学',
    type: 'multiple',
    stem: '求函数的单调区间与极值时，一般需要（　）。',
    options: [
      { key: 'A', text: '确定函数的定义域' },
      { key: 'B', text: '求导数 f′(x)' },
      { key: 'C', text: '令 f′(x)=0，求出方程的根' },
      { key: 'D', text: '列表，观察 f′(x) 在各区间的符号' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    analysis: '判断单调性和极值一般都作一张表完成，步骤为：定义域→求导→令导数为 0→列表→看符号→写结论。',
    tags: ['导数应用', '单调性', '极值'],
    difficulty: 2
  },
  {
    id: 'q-math-015',
    subjectId: 'sub-math',
    chapter: '一元函数微分学',
    type: 'single',
    stem: '求幂指函数 y = x^x 的导数时，通常采用的方法是（　）。',
    options: [
      { key: 'A', text: '直接套用幂函数求导公式' },
      { key: 'B', text: '两边取对数后再按隐函数求导' },
      { key: 'C', text: '直接套用指数函数求导公式' },
      { key: 'D', text: '先求二阶导数' }
    ],
    answer: ['B'],
    analysis: '手册考点三：幂指函数求导要先「取对数」lny = xlnx，然后再按隐函数求导方法求解。',
    tags: ['导数', '幂指函数', '取对数'],
    difficulty: 3
  },
  {
    id: 'q-math-016',
    subjectId: 'sub-math',
    chapter: '不定积分',
    type: 'single',
    stem: '不定积分 ∫(1/x) dx 的结果为（　）。',
    options: [
      { key: 'A', text: 'ln|x| + C' },
      { key: 'B', text: 'x + C' },
      { key: 'C', text: '-1/x² + C' },
      { key: 'D', text: 'eˣ + C' }
    ],
    answer: ['A'],
    analysis: '基本积分公式：∫(1/x)dx = ln|x| + C（注意 x≠0 时取绝对值）。',
    tags: ['不定积分', '基本公式'],
    difficulty: 2
  },
  {
    id: 'q-math-017',
    subjectId: 'sub-math',
    chapter: '不定积分',
    type: 'single',
    stem: '不定积分 ∫eˣ dx 的结果为（　）。',
    options: [
      { key: 'A', text: 'eˣ + C' },
      { key: 'B', text: 'xeˣ + C' },
      { key: 'C', text: 'eˣ/x + C' },
      { key: 'D', text: 'ln|x| + C' }
    ],
    answer: ['A'],
    analysis: '基本积分公式：∫eˣdx = eˣ + C。',
    tags: ['不定积分', '基本公式'],
    difficulty: 1
  },
  {
    id: 'q-math-018',
    subjectId: 'sub-math',
    chapter: '不定积分',
    type: 'single',
    stem: '不定积分 ∫cosx dx 的结果为（　）。',
    options: [
      { key: 'A', text: 'sinx + C' },
      { key: 'B', text: '-sinx + C' },
      { key: 'C', text: 'cosx + C' },
      { key: 'D', text: '-cosx + C' }
    ],
    answer: ['A'],
    analysis: '基本积分公式：∫cosx dx = sinx + C。',
    tags: ['不定积分', '三角函数'],
    difficulty: 1
  },
  {
    id: 'q-math-019',
    subjectId: 'sub-math',
    chapter: '不定积分',
    type: 'judge',
    stem: '求不定积分与求导数互为逆运算。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '手册考点六：求不定积分即求原函数（一个原函数加常数），与求导互为逆运算。',
    tags: ['不定积分', '原函数'],
    difficulty: 1
  },
  {
    id: 'q-math-020',
    subjectId: 'sub-math',
    chapter: '不定积分',
    type: 'judge',
    stem: '第一类换元积分法又称凑微分法。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '手册考点六：求不定积分的方法包括直接积分法、第一类换元积分法（凑微分法）、第二类换元积分法和分部积分法。',
    tags: ['不定积分', '换元积分法'],
    difficulty: 2
  },
  {
    id: 'q-math-021',
    subjectId: 'sub-math',
    chapter: '定积分',
    type: 'single',
    stem: '牛顿—莱布尼茨公式 ∫ₐᵇ f(x)dx 等于（　）。',
    options: [
      { key: 'A', text: 'F(a) - F(b)' },
      { key: 'B', text: 'F(b) - F(a)' },
      { key: 'C', text: 'F(b) + F(a)' },
      { key: 'D', text: 'F′(b) - F′(a)' }
    ],
    answer: ['B'],
    analysis: '牛顿—莱布尼茨公式：∫ₐᵇ f(x)dx = F(b) - F(a)，即原函数在上下限处函数值之差。',
    tags: ['定积分', '牛顿-莱布尼茨'],
    difficulty: 2
  },
  {
    id: 'q-math-022',
    subjectId: 'sub-math',
    chapter: '定积分',
    type: 'single',
    stem: '定积分 ∫₀¹ x dx 的值为（　）。',
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '1/2' },
      { key: 'C', text: '1' },
      { key: 'D', text: '2' }
    ],
    answer: ['B'],
    analysis: '由原函数 F(x) = x²/2，得 ∫₀¹ x dx = F(1) - F(0) = 1/2 - 0 = 1/2。',
    tags: ['定积分', '计算'],
    difficulty: 2
  },
  {
    id: 'q-math-023',
    subjectId: 'sub-math',
    chapter: '定积分',
    type: 'judge',
    stem: '定积分的几何意义是曲边梯形的面积。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '手册考点七：定积分可理解为曲边梯形的面积，也可用于求平面图形面积与旋转体体积。',
    tags: ['定积分', '几何意义'],
    difficulty: 1
  },
  {
    id: 'q-math-024',
    subjectId: 'sub-math',
    chapter: '定积分',
    type: 'judge',
    stem: '用换元积分法求定积分时，必须同时把积分上下限也换成新变量对应的值。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '手册考点七：定积分换元积分法「要把积分上下限也换了」，这是与不定积分换元的重要区别。',
    tags: ['定积分', '换元积分法'],
    difficulty: 2
  },
  {
    id: 'q-math-025',
    subjectId: 'sub-math',
    chapter: '二元函数微分学',
    type: 'judge',
    stem: '求二元函数 z = f(x, y) 对 x 的偏导数时，应把 y 看作常量。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '手册考点九：求偏导数时，对一个变量求导，其余变量视为常数。',
    tags: ['偏导数', '二元函数'],
    difficulty: 1
  },
  {
    id: 'q-math-026',
    subjectId: 'sub-math',
    chapter: '二元函数微分学',
    type: 'single',
    stem: '二元函数 z = f(x, y) 在点 P₀ 取得极值的必要条件（偏导数存在时）是（　）。',
    options: [
      { key: 'A', text: '两个一阶偏导数都为 0' },
      { key: 'B', text: '两个一阶偏导数都大于 0' },
      { key: 'C', text: '两个一阶偏导数都小于 0' },
      { key: 'D', text: '二阶偏导数都为 0' }
    ],
    answer: ['A'],
    analysis: '手册考点十：二元函数极值的必要条件是偏导数为 0（驻点），再用二阶偏导数构成的判别式判断极大值/极小值。',
    tags: ['二元函数', '极值'],
    difficulty: 3
  },
  {
    id: 'q-math-027',
    subjectId: 'sub-math',
    chapter: '概率论初步',
    type: 'single',
    stem: '必然事件的概率为（　）。',
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '1' },
      { key: 'C', text: '0.5' },
      { key: 'D', text: '2' }
    ],
    answer: ['B'],
    analysis: '必然事件的概率为 1，不可能事件的概率为 0，这是概率的基本性质。',
    tags: ['概率', '基本性质'],
    difficulty: 1
  },
  {
    id: 'q-math-028',
    subjectId: 'sub-math',
    chapter: '概率论初步',
    type: 'judge',
    stem: '离散型随机变量所有可能取值对应的概率之和等于 1。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '手册考点十一：离散型随机变量每个取值对应的概率之和为 1。',
    tags: ['概率', '随机变量'],
    difficulty: 2
  },

  // ============================================================
  //  英语
  // ============================================================
  {
    id: 'q-eng-001',
    subjectId: 'sub-eng',
    chapter: '语音知识',
    type: 'single',
    stem: '英语共有多少个音素（　）。',
    options: [
      { key: 'A', text: '26 个' },
      { key: 'B', text: '44 个' },
      { key: 'C', text: '48 个' },
      { key: 'D', text: '20 个' }
    ],
    answer: ['C'],
    analysis: '手册语音第一章：英语共有 48 个音素，其中元音音素 20 个、辅音音素 28 个。',
    tags: ['语音', '音素'],
    difficulty: 1
  },
  {
    id: 'q-eng-002',
    subjectId: 'sub-eng',
    chapter: '语音知识',
    type: 'single',
    stem: '英语中辅音音素共有（　）。',
    options: [
      { key: 'A', text: '20 个' },
      { key: 'B', text: '28 个' },
      { key: 'C', text: '24 个' },
      { key: 'D', text: '48 个' }
    ],
    answer: ['B'],
    analysis: '英语 48 个音素中，元音 20 个、辅音 28 个。',
    tags: ['语音', '辅音'],
    difficulty: 1
  },
  {
    id: 'q-eng-003',
    subjectId: 'sub-eng',
    chapter: '语音知识',
    type: 'single',
    stem: '字母 c 在元音字母 e、i（y）前读作（　）。',
    options: [
      { key: 'A', text: '[k]' },
      { key: 'B', text: '[s]' },
      { key: 'C', text: '[tʃ]' },
      { key: 'D', text: '[g]' }
    ],
    answer: ['B'],
    analysis: '手册拼读规则：c 在元音字母 a、o、u 前读 [k]，在元音字母 e、i(y) 前读 [s]，如 device[dɪ\'vaɪs]。',
    tags: ['语音', '拼读规则'],
    difficulty: 2
  },
  {
    id: 'q-eng-004',
    subjectId: 'sub-eng',
    chapter: '语音知识',
    type: 'single',
    stem: '字母 b 在词尾字母 m 前（如 comb）时（　）。',
    options: [
      { key: 'A', text: '读 [b]' },
      { key: 'B', text: '不发音' },
      { key: 'C', text: '读 [p]' },
      { key: 'D', text: '读 [m]' }
    ],
    answer: ['B'],
    analysis: '手册拼读规则：b 读 [b]，但当 b 在词尾字母 m 前时不发音，例如 comb[kəʊm]。',
    tags: ['语音', '拼读规则'],
    difficulty: 2
  },
  {
    id: 'q-eng-005',
    subjectId: 'sub-eng',
    chapter: '语音知识',
    type: 'single',
    stem: '字母 s 在两个元音字母之间（如 design）时读作（　）。',
    options: [
      { key: 'A', text: '[s]' },
      { key: 'B', text: '[z]' },
      { key: 'C', text: '[ʃ]' },
      { key: 'D', text: '[tʃ]' }
    ],
    answer: ['B'],
    analysis: '手册拼读规则：s 在两个元音字母之间读 [z]，例如 design[dɪ\'zaɪn]。',
    tags: ['语音', '拼读规则'],
    difficulty: 2
  },
  {
    id: 'q-eng-006',
    subjectId: 'sub-eng',
    chapter: '语音知识',
    type: 'single',
    stem: '名词复数词尾 -s（或 -es）在 [s][z][ʃ][tʃ][dʒ] 等辅音后读作（　）。',
    options: [
      { key: 'A', text: '[s]' },
      { key: 'B', text: '[z]' },
      { key: 'C', text: '[ɪz]' },
      { key: 'D', text: '[t]' }
    ],
    answer: ['C'],
    analysis: '手册拼读规则：-s/-es 在清辅音 [p][t][k][f] 后读 [s]（如 cups）；在 [s][z][ʃ][tʃ][dʒ] 等后读 [ɪz]（如 glasses）。',
    tags: ['语音', '名词复数读音'],
    difficulty: 2
  },
  {
    id: 'q-eng-007',
    subjectId: 'sub-eng',
    chapter: '语音知识',
    type: 'single',
    stem: '在重读开音节中，元音字母一般读作（　）。',
    options: [
      { key: 'A', text: '字母的名称音' },
      { key: 'B', text: '短元音' },
      { key: 'C', text: '[ə]' },
      { key: 'D', text: '不发音' }
    ],
    answer: ['A'],
    analysis: '手册音节分类：重读开音节中元音字母按字母名称音发音，如 make[meɪk]、note[nəʊt]。',
    tags: ['语音', '开音节'],
    difficulty: 2
  },
  {
    id: 'q-eng-008',
    subjectId: 'sub-eng',
    chapter: '语音知识',
    type: 'judge',
    stem: '在重读闭音节中，元音字母读短元音。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '重读闭音节中元音字母读短元音，即 a[æ]、e[e]、i[ɪ]、o[ɒ]、u[ʌ]，如 map[mæp]。',
    tags: ['语音', '闭音节'],
    difficulty: 1
  },
  {
    id: 'q-eng-009',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'When the earthquake happened yesterday afternoon, the students ______ chemistry in the lab.',
    options: [
      { key: 'A', text: 'have' },
      { key: 'B', text: 'were having' },
      { key: 'C', text: 'had had' },
      { key: 'D', text: 'are having' }
    ],
    answer: ['B'],
    analysis: '地震发生的那一刻，学生「正在」做实验，用过去进行时 were having。',
    tags: ['时态', '过去进行时'],
    difficulty: 2
  },
  {
    id: 'q-eng-010',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'The teacher required that every student ______ the paper before Friday.',
    options: [
      { key: 'A', text: 'hands in' },
      { key: 'B', text: 'would hand in' },
      { key: 'C', text: 'hand in' },
      { key: 'D', text: 'handed in' }
    ],
    answer: ['C'],
    analysis: 'require 引导的宾语从句用虚拟语气，其谓语为 (should) + 动词原形，故用 hand in。',
    tags: ['虚拟语气', 'require'],
    difficulty: 2
  },
  {
    id: 'q-eng-011',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'The book ______ I bought yesterday is well worth reading.',
    options: [
      { key: 'A', text: 'who' },
      { key: 'B', text: 'whose' },
      { key: 'C', text: 'which' },
      { key: 'D', text: 'what' }
    ],
    answer: ['C'],
    analysis: '先行词 book 为物，定语从句中作宾语的关系代词用 which（也可用 that）。',
    tags: ['定语从句', '关系代词'],
    difficulty: 2
  },
  {
    id: 'q-eng-012',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'My bike is broken and it really needs ______.',
    options: [
      { key: 'A', text: 'repaired' },
      { key: 'B', text: 'repairing' },
      { key: 'C', text: 'repair' },
      { key: 'D', text: 'to repair' }
    ],
    answer: ['B'],
    analysis: 'need 在此表示「需要」，此时后面接动名词（need doing 表示被动含义），故用 repairing。',
    tags: ['非谓语动词', 'need'],
    difficulty: 2
  },
  {
    id: 'q-eng-013',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'My alarm clock didn\'t ______ this morning, so I was late for school.',
    options: [
      { key: 'A', text: 'go off' },
      { key: 'B', text: 'go out' },
      { key: 'C', text: 'go up' },
      { key: 'D', text: 'go over' }
    ],
    answer: ['A'],
    analysis: 'go off 意为「（闹钟）响起」；go out 出去，go up 上升，go over 复习。',
    tags: ['动词短语', 'go off'],
    difficulty: 2
  },
  {
    id: 'q-eng-014',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'I have been learning English ______ 2018.',
    options: [
      { key: 'A', text: 'for' },
      { key: 'B', text: 'since' },
      { key: 'C', text: 'in' },
      { key: 'D', text: 'from' }
    ],
    answer: ['B'],
    analysis: 'since 接「时间点」（since 2018），for 接「时间段」（for five years）。',
    tags: ['介词', 'since'],
    difficulty: 2
  },
  {
    id: 'q-eng-015',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'The lecture will begin ______ 9 o\'clock tomorrow morning.',
    options: [
      { key: 'A', text: 'in' },
      { key: 'B', text: 'on' },
      { key: 'C', text: 'at' },
      { key: 'D', text: 'for' }
    ],
    answer: ['C'],
    analysis: '表示具体时刻用 at（at 9 o\'clock）。',
    tags: ['介词', 'at'],
    difficulty: 1
  },
  {
    id: 'q-eng-016',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: '______ you go in the future, please keep in touch with me.',
    options: [
      { key: 'A', text: 'Whatever' },
      { key: 'B', text: 'However' },
      { key: 'C', text: 'Wherever' },
      { key: 'D', text: 'Whoever' }
    ],
    answer: ['C'],
    analysis: '让步状语从句中，go 表示「去某地」，故用表示地点的 Wherever（无论你去哪里）。',
    tags: ['让步状语从句', 'wherever'],
    difficulty: 2
  },
  {
    id: 'q-eng-017',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: '______ he said at the meeting surprised everyone present.',
    options: [
      { key: 'A', text: 'That' },
      { key: 'B', text: 'What' },
      { key: 'C', text: 'Which' },
      { key: 'D', text: 'Whether' }
    ],
    answer: ['B'],
    analysis: '主语从句中缺少宾语，用 What 引导（他说的话），What 在从句中充当宾语。',
    tags: ['主语从句', 'what'],
    difficulty: 3
  },
  {
    id: 'q-eng-018',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'The local government has taken a new ______ to reduce air pollution.',
    options: [
      { key: 'A', text: 'method' },
      { key: 'B', text: 'way' },
      { key: 'C', text: 'measure' },
      { key: 'D', text: 'mean' }
    ],
    answer: ['C'],
    analysis: '固定搭配 take a measure to do sth.（采取措施做某事），故选 measure。',
    tags: ['名词辨析', 'measure'],
    difficulty: 2
  },
  {
    id: 'q-eng-019',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'The problem is ______ we can finish the work on time.',
    options: [
      { key: 'A', text: 'that' },
      { key: 'B', text: 'whether' },
      { key: 'C', text: 'what' },
      { key: 'D', text: 'which' }
    ],
    answer: ['B'],
    analysis: '表语从句中表示「是否」，用 whether 引导。',
    tags: ['表语从句', 'whether'],
    difficulty: 3
  },
  {
    id: 'q-eng-020',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'You ______ hand in the report today; it can be given to me next Monday.',
    options: [
      { key: 'A', text: 'mustn\'t' },
      { key: 'B', text: 'needn\'t' },
      { key: 'C', text: 'can\'t' },
      { key: 'D', text: 'shouldn\'t' }
    ],
    answer: ['B'],
    analysis: '句意为「不必」今天交，needn\'t 表示「不必、不需要」；mustn\'t 表示「禁止」。',
    tags: ['情态动词', 'needn\'t'],
    difficulty: 2
  },
  {
    id: 'q-eng-021',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'No sooner ______ home than the telephone rang.',
    options: [
      { key: 'A', text: 'I had got' },
      { key: 'B', text: 'had I got' },
      { key: 'C', text: 'I got' },
      { key: 'D', text: 'did I get' }
    ],
    answer: ['B'],
    analysis: 'no sooner 位于句首时用倒装：No sooner had I got home than...（一……就……）。',
    tags: ['倒装句', 'no sooner'],
    difficulty: 3
  },
  {
    id: 'q-eng-022',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'Not only the students but also their foreign teacher ______ watching romantic movies.',
    options: [
      { key: 'A', text: 'enjoy' },
      { key: 'B', text: 'enjoys' },
      { key: 'C', text: 'to enjoy' },
      { key: 'D', text: 'enjoying' }
    ],
    answer: ['B'],
    analysis: 'not only...but also... 连接并列主语时，谓语动词与最近的主语（their foreign teacher，单数）保持一致，用 enjoys。',
    tags: ['主谓一致', 'not only...but also'],
    difficulty: 3
  },
  {
    id: 'q-eng-023',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'The mayor said that the development would not have any bad ______ upon wildlife in the area.',
    options: [
      { key: 'A', text: 'effect' },
      { key: 'B', text: 'image' },
      { key: 'C', text: 'result' },
      { key: 'D', text: 'power' }
    ],
    answer: ['A'],
    analysis: '固定搭配 have an effect upon/on（对……产生影响），故选 effect。',
    tags: ['名词辨析', 'effect'],
    difficulty: 2
  },
  {
    id: 'q-eng-024',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'John has no idea ______ this dog has been following him all the way.',
    options: [
      { key: 'A', text: 'what' },
      { key: 'B', text: 'when' },
      { key: 'C', text: 'where' },
      { key: 'D', text: 'why' }
    ],
    answer: ['D'],
    analysis: '从句表达「这只狗为什么一直跟着他」，表示原因，用 why 引导同位语从句。',
    tags: ['从句', 'why'],
    difficulty: 2
  },
  {
    id: 'q-eng-025',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'The committee insisted that the proposal ______ without delay.',
    options: [
      { key: 'A', text: 'be discussed' },
      { key: 'B', text: 'to be discussed' },
      { key: 'C', text: 'is discussed' },
      { key: 'D', text: 'is to be discussed' }
    ],
    answer: ['A'],
    analysis: 'insist 引导的宾语从句用虚拟语气 (should) + 动词原形，且 proposal 与 discuss 为被动关系，故用 be discussed。',
    tags: ['虚拟语气', 'insist'],
    difficulty: 3
  },
  {
    id: 'q-eng-026',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'man 的复数形式是（　）。',
    options: [
      { key: 'A', text: 'mans' },
      { key: 'B', text: 'men' },
      { key: 'C', text: 'man' },
      { key: 'D', text: 'mens' }
    ],
    answer: ['B'],
    analysis: '不规则复数：改变内部元音，man→men、woman→women、foot→feet、tooth→teeth。',
    tags: ['名词', '不规则复数'],
    difficulty: 1
  },
  {
    id: 'q-eng-027',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'child 的复数形式是（　）。',
    options: [
      { key: 'A', text: 'childs' },
      { key: 'B', text: 'childes' },
      { key: 'C', text: 'children' },
      { key: 'D', text: 'child' }
    ],
    answer: ['C'],
    analysis: '不规则复数：词尾加 -ren/-en，child→children、ox→oxen。',
    tags: ['名词', '不规则复数'],
    difficulty: 1
  },
  {
    id: 'q-eng-028',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: 'sheep 的复数形式是（　）。',
    options: [
      { key: 'A', text: 'sheeps' },
      { key: 'B', text: 'sheepes' },
      { key: 'C', text: 'sheep' },
      { key: 'D', text: 'sheepies' }
    ],
    answer: ['C'],
    analysis: '单复数同形：sheep→sheep、deer→deer、Chinese→Chinese、Japanese→Japanese。',
    tags: ['名词', '单复数同形'],
    difficulty: 1
  },
  {
    id: 'q-eng-029',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'multiple',
    stem: '下列名词的复数形式属于「不规则变化」的有（　）。',
    options: [
      { key: 'A', text: 'man → men' },
      { key: 'B', text: 'tooth → teeth' },
      { key: 'C', text: 'child → children' },
      { key: 'D', text: 'desk → desks' }
    ],
    answer: ['A', 'B', 'C'],
    analysis: 'D 属于规则变化（词尾直接加 -s）。A、B、C 均为手册列举的不规则复数。',
    tags: ['名词', '不规则复数'],
    difficulty: 2
  },
  {
    id: 'q-eng-030',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: '形容词修饰复合不定代词时应当（　）。',
    options: [
      { key: 'A', text: '前置，如 interesting something' },
      { key: 'B', text: '后置，如 something interesting' },
      { key: 'C', text: '可前可后，无区别' },
      { key: 'D', text: '只能放在句首' }
    ],
    answer: ['B'],
    analysis: '复合不定代词 + 形容词，形容词要后置：something interesting（有趣的事）、nothing special（没什么特别的）。',
    tags: ['形容词', '语序'],
    difficulty: 2
  },
  {
    id: 'q-eng-031',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'multiple',
    stem: '下列词缀中，属于「否定前缀」（表示「不」）的有（　）。',
    options: [
      { key: 'A', text: 'un-' },
      { key: 'B', text: 'im-' },
      { key: 'C', text: 'dis-' },
      { key: 'D', text: 're-' }
    ],
    answer: ['A', 'B', 'C'],
    analysis: '手册构词法：否定前缀有 un-、im-、in-、il-、ir-、dis-、mis-；re- 是表示「再一次」的前缀。',
    tags: ['构词法', '否定前缀'],
    difficulty: 2
  },
  {
    id: 'q-eng-032',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: '后缀 -ly 常用来构成（　）。',
    options: [
      { key: 'A', text: '名词' },
      { key: 'B', text: '形容词' },
      { key: 'C', text: '副词' },
      { key: 'D', text: '动词' }
    ],
    answer: ['C'],
    analysis: '手册构词法：副词后缀有 -ly、-ward(s)、-way(s)、-wise，如 absolutely、upward(s)。',
    tags: ['构词法', '副词后缀'],
    difficulty: 2
  },
  {
    id: 'q-eng-033',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: '结构「as + 形容词/副词原级 + as」表示（　）。',
    options: [
      { key: 'A', text: '……比……更……' },
      { key: 'B', text: '……和……一样……' },
      { key: 'C', text: '……不如……' },
      { key: 'D', text: '……是……的几倍' }
    ],
    answer: ['B'],
    analysis: 'as + 原级 + as 表示「和……一样……」，如 This table is as clean as that one。',
    tags: ['比较', 'as...as'],
    difficulty: 2
  },
  {
    id: 'q-eng-034',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: '结构「倍数 + as + 形容词原级 + as」表示（　）。',
    options: [
      { key: 'A', text: '……和……一样……' },
      { key: 'B', text: '……是……的几倍' },
      { key: 'C', text: '……不如……' },
      { key: 'D', text: '……比……更……' }
    ],
    answer: ['B'],
    analysis: 'three times as big as 表示「是……的三倍大」；也可用「倍数 + the + 名词 + of」等结构。',
    tags: ['倍数表达', '比较'],
    difficulty: 3
  },
  {
    id: 'q-eng-035',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'single',
    stem: '「either...or...」表示（　）。',
    options: [
      { key: 'A', text: '不是……而是……' },
      { key: 'B', text: '不但……而且……' },
      { key: 'C', text: '要么……要么……' },
      { key: 'D', text: '太……以至于不能……' }
    ],
    answer: ['C'],
    analysis: 'either...or... 表示选择「要么……要么……」；not...but... 表示「不是……而是……」；not only...but also... 表示「不但……而且……」。',
    tags: ['连词', 'either...or'],
    difficulty: 2
  },
  {
    id: 'q-eng-036',
    subjectId: 'sub-eng',
    chapter: '词汇与语法',
    type: 'judge',
    stem: '复合名词 woman-teacher 的复数形式是 women-teachers。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '以 man 和 woman 构成的合成名词，各个成分都要变为复数：woman-teacher→women-teachers。',
    tags: ['名词', '合成名词'],
    difficulty: 2
  },
  {
    id: 'q-eng-037',
    subjectId: 'sub-eng',
    chapter: '补全对话',
    type: 'single',
    stem: 'Secretary: Good afternoon. {{1}}.\n（此处应填）（　）',
    options: [
      { key: 'A', text: 'You\'re welcome.' },
      { key: 'B', text: 'Can I help you?' },
      { key: 'C', text: 'Mr. Long is still in a meeting.' },
      { key: 'D', text: 'Just water, please.' }
    ],
    answer: ['B'],
    analysis: '秘书打招呼后，紧接着杨先生回答「Yes, please.」，说明秘书问的是「需要帮忙吗」，选 Can I help you?',
    tags: ['补全对话', '情景交际'],
    difficulty: 1
  },
  {
    id: 'q-eng-038',
    subjectId: 'sub-eng',
    chapter: '补全对话',
    type: 'single',
    stem: 'Secretary: Well, Mr. Yang, your appointment is at 3 p.m. {{2}}.\n（此处应填）（　）',
    options: [
      { key: 'A', text: 'Mr. Long is still in a meeting.' },
      { key: 'B', text: 'Could you be waiting here?' },
      { key: 'C', text: 'I don\'t drink coffee.' },
      { key: 'D', text: 'You\'re welcome.' }
    ],
    answer: ['A'],
    analysis: '杨先生接着说「抱歉，我来得太早了」，说明秘书告诉他龙先生还在开会，选 Mr. Long is still in a meeting.',
    tags: ['补全对话', '情景交际'],
    difficulty: 2
  },
  {
    id: 'q-eng-039',
    subjectId: 'sub-eng',
    chapter: '补全对话',
    type: 'single',
    stem: 'Secretary: It\'s Okay. {{3}}.\nYang: Sure.\n（此处应填）（　）',
    options: [
      { key: 'A', text: 'Just water, please.' },
      { key: 'B', text: 'Could you be waiting here?' },
      { key: 'C', text: 'Can I help you?' },
      { key: 'D', text: 'Mr. Long will be back tomorrow.' }
    ],
    answer: ['B'],
    analysis: '杨先生回答「Sure（当然可以）」，说明秘书问的是能否在此等候，选 Could you be waiting here?',
    tags: ['补全对话', '情景交际'],
    difficulty: 2
  },
  {
    id: 'q-eng-040',
    subjectId: 'sub-eng',
    chapter: '补全对话',
    type: 'single',
    stem: 'Secretary: Would you like something to drink? Coffee, tea or water?\nYang: {{4}} Thank you.\n（此处应填）（　）',
    options: [
      { key: 'A', text: 'I don\'t drink coffee.' },
      { key: 'B', text: 'Just water, please.' },
      { key: 'C', text: 'You\'re welcome.' },
      { key: 'D', text: 'Mr. Long will be back tomorrow.' }
    ],
    answer: ['B'],
    analysis: '秘书问要喝什么，杨先生回答并道谢，选 Just water, please.（只要水就好）。',
    tags: ['补全对话', '情景交际'],
    difficulty: 1
  },
  {
    id: 'q-eng-041',
    subjectId: 'sub-eng',
    chapter: '补全对话',
    type: 'single',
    stem: 'Yang: Just water, please. Thank you.\nSecretary: {{5}}.\n（此处应填）（　）',
    options: [
      { key: 'A', text: 'You\'re welcome.' },
      { key: 'B', text: 'Can I help you?' },
      { key: 'C', text: 'Mr. Long is still in a meeting.' },
      { key: 'D', text: 'Just water, please.' }
    ],
    answer: ['A'],
    analysis: '对方道谢后的应答用 You\'re welcome.（不客气），选 A。',
    tags: ['补全对话', '情景交际'],
    difficulty: 1
  },

  // ============================================================
  //  政治
  // ============================================================
  {
    id: 'q-pol-001',
    subjectId: 'sub-pol',
    chapter: '哲学基本问题与物质观',
    type: 'single',
    stem: '下列不属于哲学基本问题内容的是（　）。',
    options: [
      { key: 'A', text: '物质与意识的关系问题' },
      { key: 'B', text: '思维能不能反映存在的问题' },
      { key: 'C', text: '物质与运动的关系问题' },
      { key: 'D', text: '思维与存在何者为第一性的问题' }
    ],
    answer: ['C'],
    analysis: '哲学基本问题是思维和存在（物质和意识）的关系问题，包含两方面：①何者为第一性；②思维能否认识存在。物质与运动的关系不属于哲学基本问题。',
    tags: ['哲学基本问题', '高频真题'],
    difficulty: 2
  },
  {
    id: 'q-pol-002',
    subjectId: 'sub-pol',
    chapter: '哲学基本问题与物质观',
    type: 'single',
    stem: '下列观点中，属于客观唯心主义的是（　）。',
    options: [
      { key: 'A', text: '心外无物、心外无理' },
      { key: 'B', text: '天地合而万物生，阴阳接而变化起' },
      { key: 'C', text: '上帝决定一切' },
      { key: 'D', text: '天地合气，万物自生' }
    ],
    answer: ['C'],
    analysis: '客观唯心主义把人之外的客观精神（如上帝、理、绝对观念）当作世界本原；A 是主观唯心主义，B、D 是古代朴素唯物主义。',
    tags: ['唯心主义', '客观唯心'],
    difficulty: 3
  },
  {
    id: 'q-pol-003',
    subjectId: 'sub-pol',
    chapter: '哲学基本问题与物质观',
    type: 'single',
    stem: '物质的唯一特性是（　）。',
    options: [
      { key: 'A', text: '运动' },
      { key: 'B', text: '客观实在性' },
      { key: 'C', text: '可知性' },
      { key: 'D', text: '永恒性' }
    ],
    answer: ['B'],
    analysis: '物质的唯一特性是客观实在性；注意区分——运动是物质的根本属性和存在方式，不是唯一特性。',
    tags: ['物质定义', '高频真题'],
    difficulty: 2
  },
  {
    id: 'q-pol-004',
    subjectId: 'sub-pol',
    chapter: '哲学基本问题与物质观',
    type: 'single',
    stem: '正确发挥意识能动作用的客观前提是（　）。',
    options: [
      { key: 'A', text: '个人积极性的充分调动' },
      { key: 'B', text: '集体智慧的充分发挥' },
      { key: 'C', text: '对客观规律的正确反映' },
      { key: 'D', text: '对保守思想的彻底克服' }
    ],
    answer: ['C'],
    analysis: '尊重客观规律是正确发挥主观能动性的前提，只有正确认识和掌握客观规律，才能有效发挥主观能动性。',
    tags: ['主观能动性', '客观规律'],
    difficulty: 3
  },
  {
    id: 'q-pol-005',
    subjectId: 'sub-pol',
    chapter: '哲学基本问题与物质观',
    type: 'single',
    stem: '哲学的基本问题是（　）。',
    options: [
      { key: 'A', text: '物质与运动的关系问题' },
      { key: 'B', text: '思维和存在的关系问题' },
      { key: 'C', text: '实践与认识的关系问题' },
      { key: 'D', text: '社会存在与社会意识的关系问题' }
    ],
    answer: ['B'],
    analysis: '哲学基本问题即思维和存在的关系问题（也表述为物质和意识的关系问题）。注意与历史观基本问题区分。',
    tags: ['哲学基本问题'],
    difficulty: 1
  },
  {
    id: 'q-pol-006',
    subjectId: 'sub-pol',
    chapter: '哲学基本问题与物质观',
    type: 'single',
    stem: '划分唯物主义和唯心主义的标准是（　）。',
    options: [
      { key: 'A', text: '对思维和存在何者为第一性的不同回答' },
      { key: 'B', text: '对思维能否认识存在的不同回答' },
      { key: 'C', text: '是否承认世界的可知性' },
      { key: 'D', text: '是否承认矛盾' }
    ],
    answer: ['A'],
    analysis: '哲学基本问题第一方面（何者为第一性）划分唯物主义和唯心主义；第二方面（有无同一性）划分可知论和不可知论。',
    tags: ['哲学基本问题', '唯物唯心'],
    difficulty: 2
  },
  {
    id: 'q-pol-007',
    subjectId: 'sub-pol',
    chapter: '哲学基本问题与物质观',
    type: 'judge',
    stem: '运动是物质的唯一特性。',
    options: JUDGE_OPTIONS,
    answer: ['F'],
    analysis: '错误。物质的唯一特性是客观实在性；运动是物质的根本属性和存在方式。',
    tags: ['物质观', '易混淆'],
    difficulty: 2
  },
  {
    id: 'q-pol-008',
    subjectId: 'sub-pol',
    chapter: '哲学基本问题与物质观',
    type: 'judge',
    stem: '哲学与具体科学是一般与个别的关系。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '哲学是理论化、系统化的世界观，哲学以具体科学为基础，是对具体科学的概括和总结，二者是一般与个别的关系。',
    tags: ['哲学与具体科学'],
    difficulty: 2
  },
  {
    id: 'q-pol-009',
    subjectId: 'sub-pol',
    chapter: '哲学基本问题与物质观',
    type: 'single',
    stem: '马克思主义哲学最显著、最根本的特征是（　）。',
    options: [
      { key: 'A', text: '科学性' },
      { key: 'B', text: '革命性' },
      { key: 'C', text: '实践性' },
      { key: 'D', text: '阶级性' }
    ],
    answer: ['C'],
    analysis: '实践性是马克思主义哲学最显著、最根本的特征。马哲的直接理论来源是德国古典哲学。',
    tags: ['马哲特征', '实践性'],
    difficulty: 1
  },
  {
    id: 'q-pol-010',
    subjectId: 'sub-pol',
    chapter: '哲学基本问题与物质观',
    type: 'judge',
    stem: '相对静止是理解事物多样性的前提。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '运动是绝对的、无条件的，静止是相对的、有条件的；相对静止是理解事物多样性的前提。',
    tags: ['运动与静止'],
    difficulty: 2
  },

  {
    id: 'q-pol-011',
    subjectId: 'sub-pol',
    chapter: '唯物辩证法',
    type: 'single',
    stem: '唯物辩证法的总特征是（　）。',
    options: [
      { key: 'A', text: '对立统一规律' },
      { key: 'B', text: '联系和发展的观点' },
      { key: 'C', text: '质量互变规律' },
      { key: 'D', text: '否定之否定规律' }
    ],
    answer: ['B'],
    analysis: '唯物辩证法的总特征是联系的观点和发展的观点；对立统一规律才是唯物辩证法的实质与核心，注意区分。',
    tags: ['辩证法', '高频真题'],
    difficulty: 2
  },
  {
    id: 'q-pol-012',
    subjectId: 'sub-pol',
    chapter: '唯物辩证法',
    type: 'single',
    stem: '辩证否定的实质是（　）。',
    options: [
      { key: 'A', text: '全盘肯定' },
      { key: 'B', text: '全盘否定' },
      { key: 'C', text: '扬弃' },
      { key: 'D', text: '抛弃' }
    ],
    answer: ['C'],
    analysis: '辩证否定的实质是「扬弃」——既克服又保留，克服旧事物中消极的东西，保留其积极因素。',
    tags: ['辩证否定', '扬弃'],
    difficulty: 2
  },
  {
    id: 'q-pol-013',
    subjectId: 'sub-pol',
    chapter: '唯物辩证法',
    type: 'single',
    stem: '唯物辩证法的实质与核心是（　）。',
    options: [
      { key: 'A', text: '对立统一规律' },
      { key: 'B', text: '质量互变规律' },
      { key: 'C', text: '否定之否定规律' },
      { key: 'D', text: '联系和发展的观点' }
    ],
    answer: ['A'],
    analysis: '对立统一规律（矛盾规律）是唯物辩证法的实质与核心，揭示了事物发展的动力和源泉。',
    tags: ['辩证法', '对立统一'],
    difficulty: 1
  },
  {
    id: 'q-pol-014',
    subjectId: 'sub-pol',
    chapter: '唯物辩证法',
    type: 'single',
    stem: '矛盾的两个基本属性是（　）。',
    options: [
      { key: 'A', text: '普遍性和特殊性' },
      { key: 'B', text: '同一性和斗争性' },
      { key: 'C', text: '主要方面和次要方面' },
      { key: 'D', text: '内因和外因' }
    ],
    answer: ['B'],
    analysis: '矛盾的两个基本属性是同一性（相对、有条件）和斗争性（绝对、无条件）。',
    tags: ['矛盾', '同一性与斗争性'],
    difficulty: 2
  },
  {
    id: 'q-pol-015',
    subjectId: 'sub-pol',
    chapter: '唯物辩证法',
    type: 'judge',
    stem: '内因是事物发展的根据，外因是事物发展的条件，外因通过内因起作用。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '这是唯物辩证法关于事物发展动力的重要原理，内因是根本，外因通过内因起作用。',
    tags: ['内因外因', '发展动力'],
    difficulty: 1
  },
  {
    id: 'q-pol-016',
    subjectId: 'sub-pol',
    chapter: '唯物辩证法',
    type: 'single',
    stem: '唯物辩证法认为，事物发展的实质是（　）。',
    options: [
      { key: 'A', text: '新事物的产生和旧事物的灭亡' },
      { key: 'B', text: '数量的简单增加' },
      { key: 'C', text: '事物位置的移动' },
      { key: 'D', text: '事物状态的循环往复' }
    ],
    answer: ['A'],
    analysis: '发展的实质是新事物的产生和旧事物的灭亡。',
    tags: ['发展', '实质'],
    difficulty: 1
  },
  {
    id: 'q-pol-017',
    subjectId: 'sub-pol',
    chapter: '唯物辩证法',
    type: 'judge',
    stem: '质量互变规律要求我们坚持适度原则、重视量的积累。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '量变是质变的必要准备，质变是量变的必然结果；方法论上要求坚持适度原则、重视量的积累。',
    tags: ['质量互变', '方法论'],
    difficulty: 1
  },
  {
    id: 'q-pol-018',
    subjectId: 'sub-pol',
    chapter: '唯物辩证法',
    type: 'multiple',
    stem: '下列属于「联系」的特点的有（　）。',
    options: [
      { key: 'A', text: '普遍性' },
      { key: 'B', text: '客观性' },
      { key: 'C', text: '多样性' },
      { key: 'D', text: '静止性' }
    ],
    answer: ['A', 'B', 'C'],
    analysis: '联系的特点包括普遍性、客观性、多样性、条件性；「静止性」不是联系的特点。',
    tags: ['联系', '特点'],
    difficulty: 2
  },

  {
    id: 'q-pol-019',
    subjectId: 'sub-pol',
    chapter: '认识论',
    type: 'single',
    stem: '实践是认识的基础，表现在实践是认识的来源、动力、检验标准和（　）。',
    options: [
      { key: 'A', text: '目的' },
      { key: 'B', text: '形式' },
      { key: 'C', text: '结果' },
      { key: 'D', text: '前提' }
    ],
    answer: ['A'],
    analysis: '实践是认识的来源、动力、检验标准、目的，四个方面缺一不可。',
    tags: ['实践与认识', '认识基础'],
    difficulty: 1
  },
  {
    id: 'q-pol-020',
    subjectId: 'sub-pol',
    chapter: '认识论',
    type: 'single',
    stem: '认识的两个阶段是（　）。',
    options: [
      { key: 'A', text: '感性认识和理性认识' },
      { key: 'B', text: '正确认识和错误认识' },
      { key: 'C', text: '直接经验和间接经验' },
      { key: 'D', text: '实践和认识' }
    ],
    answer: ['A'],
    analysis: '认识分为感性认识（感觉、知觉、表象）和理性认识（概念、判断、推理）两个阶段，二者辩证统一。',
    tags: ['认识', '感性理性'],
    difficulty: 1
  },
  {
    id: 'q-pol-021',
    subjectId: 'sub-pol',
    chapter: '认识论',
    type: 'judge',
    stem: '实践是检验真理的唯一标准。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '实践是检验真理的唯一标准，这是由真理的本性和实践的特点决定的。',
    tags: ['真理', '检验标准'],
    difficulty: 1
  },
  {
    id: 'q-pol-022',
    subjectId: 'sub-pol',
    chapter: '认识论',
    type: 'single',
    stem: '真理是人们对客观事物及其规律的（　）。',
    options: [
      { key: 'A', text: '正确反映' },
      { key: 'B', text: '主观想象' },
      { key: 'C', text: '感性认识' },
      { key: 'D', text: '价值判断' }
    ],
    answer: ['A'],
    analysis: '真理是人们对客观事物及其规律的正确反映，真理具有客观性。',
    tags: ['真理', '客观性'],
    difficulty: 1
  },
  {
    id: 'q-pol-023',
    subjectId: 'sub-pol',
    chapter: '认识论',
    type: 'judge',
    stem: '理性认识依赖于感性认识，感性认识有待于发展到理性认识。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '感性认识和理性认识辩证统一：理性认识依赖于感性认识，感性认识有待于发展到理性认识。',
    tags: ['认识', '感性理性'],
    difficulty: 2
  },
  {
    id: 'q-pol-024',
    subjectId: 'sub-pol',
    chapter: '认识论',
    type: 'single',
    stem: '认识运动的总规律是（　）。',
    options: [
      { key: 'A', text: '实践→认识→再实践→再认识' },
      { key: 'B', text: '感性认识→理性认识' },
      { key: 'C', text: '认识→实践→认识' },
      { key: 'D', text: '理论→实践→理论' }
    ],
    answer: ['A'],
    analysis: '认识运动的总规律：实践→认识→再实践→再认识，反复循环、无限发展。',
    tags: ['认识', '总规律'],
    difficulty: 2
  },

  {
    id: 'q-pol-025',
    subjectId: 'sub-pol',
    chapter: '历史观',
    type: 'single',
    stem: '社会发展的根本动力是（　）。',
    options: [
      { key: 'A', text: '阶级斗争' },
      { key: 'B', text: '社会基本矛盾' },
      { key: 'C', text: '科学技术' },
      { key: 'D', text: '人民群众' }
    ],
    answer: ['B'],
    analysis: '社会基本矛盾（生产力和生产关系、经济基础和上层建筑的矛盾）是社会发展的根本动力；阶级斗争是阶级社会的直接动力，科技是重要动力。',
    tags: ['历史观', '发展动力'],
    difficulty: 2
  },
  {
    id: 'q-pol-026',
    subjectId: 'sub-pol',
    chapter: '历史观',
    type: 'single',
    stem: '「人民群众既是历史的剧中人又是剧作者」，这一观点属于（　）。',
    options: [
      { key: 'A', text: '历史唯物主义观点' },
      { key: 'B', text: '历史唯心主义观点' },
      { key: 'C', text: '历史辩证法观点' },
      { key: 'D', text: '唯意志论观点' }
    ],
    answer: ['A'],
    analysis: '该观点强调人民群众创造历史，是历史唯物主义的基本观点；历史唯心主义否认人民群众的历史作用。',
    tags: ['人民群众', '历史唯物主义'],
    difficulty: 2
  },
  {
    id: 'q-pol-027',
    subjectId: 'sub-pol',
    chapter: '历史观',
    type: 'single',
    stem: '历史观的基本问题是（　）。',
    options: [
      { key: 'A', text: '思维和存在的关系问题' },
      { key: 'B', text: '社会存在和社会意识的关系问题' },
      { key: 'C', text: '生产力和生产关系的关系问题' },
      { key: 'D', text: '经济基础和上层建筑的关系问题' }
    ],
    answer: ['B'],
    analysis: '历史观的基本问题是社会存在和社会意识的关系问题，注意与哲学基本问题（思维和存在）区分。',
    tags: ['历史观基本问题'],
    difficulty: 1
  },
  {
    id: 'q-pol-028',
    subjectId: 'sub-pol',
    chapter: '历史观',
    type: 'judge',
    stem: '社会意识具有相对独立性，对社会存在具有能动的反作用。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '社会存在决定社会意识；社会意识具有相对独立性，先进的社会意识促进社会发展，落后的社会意识阻碍社会发展。',
    tags: ['社会存在与社会意识'],
    difficulty: 2
  },
  {
    id: 'q-pol-029',
    subjectId: 'sub-pol',
    chapter: '历史观',
    type: 'single',
    stem: '在阶级社会中，社会发展的直接动力是（　）。',
    options: [
      { key: 'A', text: '社会基本矛盾' },
      { key: 'B', text: '阶级斗争' },
      { key: 'C', text: '科学技术' },
      { key: 'D', text: '人民群众' }
    ],
    answer: ['B'],
    analysis: '阶级社会中，阶级斗争是社会发展的直接动力；在社会主义社会，改革是直接动力。',
    tags: ['发展动力', '阶级斗争'],
    difficulty: 2
  },
  {
    id: 'q-pol-030',
    subjectId: 'sub-pol',
    chapter: '历史观',
    type: 'multiple',
    stem: '人民群众是历史的创造者，具体表现为（　）。',
    options: [
      { key: 'A', text: '是社会物质财富的创造者' },
      { key: 'B', text: '是社会精神财富的创造者' },
      { key: 'C', text: '是社会变革的决定力量' },
      { key: 'D', text: '是社会规律的制定者' }
    ],
    answer: ['A', 'B', 'C'],
    analysis: '人民群众是社会物质财富的创造者、社会精神财富的创造者、社会变革的决定力量；社会规律是客观的，不能被「制定」。',
    tags: ['人民群众', '历史创造者'],
    difficulty: 2
  },
  {
    id: 'q-pol-031',
    subjectId: 'sub-pol',
    chapter: '历史观',
    type: 'judge',
    stem: '生产力决定生产关系，生产关系反作用于生产力。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '生产关系一定要适合生产力状况的规律，是历史观两条基本规律之一。',
    tags: ['生产力与生产关系'],
    difficulty: 1
  },

  {
    id: 'q-pol-032',
    subjectId: 'sub-pol',
    chapter: '毛泽东思想与中特理论',
    type: 'single',
    stem: '毛泽东思想活的灵魂包括实事求是、群众路线和（　）。',
    options: [
      { key: 'A', text: '武装斗争' },
      { key: 'B', text: '独立自主' },
      { key: 'C', text: '统一战线' },
      { key: 'D', text: '党的建设' }
    ],
    answer: ['B'],
    analysis: '毛泽东思想活的灵魂是实事求是、群众路线、独立自主三个基本方面。',
    tags: ['毛泽东思想', '活的灵魂'],
    difficulty: 1
  },
  {
    id: 'q-pol-033',
    subjectId: 'sub-pol',
    chapter: '毛泽东思想与中特理论',
    type: 'single',
    stem: '实事求是是毛泽东思想的（　）。',
    options: [
      { key: 'A', text: '核心' },
      { key: 'B', text: '精髓' },
      { key: 'C', text: '灵魂' },
      { key: 'D', text: '基础' }
    ],
    answer: ['B'],
    analysis: '实事求是是毛泽东思想的精髓，也是我们党的思想路线。',
    tags: ['毛泽东思想', '实事求是'],
    difficulty: 1
  },
  {
    id: 'q-pol-034',
    subjectId: 'sub-pol',
    chapter: '毛泽东思想与中特理论',
    type: 'single',
    stem: '毛泽东在《关于正确处理人民内部矛盾的问题》中指出，处理人民内部矛盾实行（　）。',
    options: [
      { key: 'A', text: '专政的方法' },
      { key: 'B', text: '民主的方法、说服教育的方法' },
      { key: 'C', text: '批评与自我批评的方法' },
      { key: 'D', text: '团结——批评——团结的方法' }
    ],
    answer: ['B'],
    analysis: '敌我矛盾用专政的方法解决；人民内部矛盾用民主的方法、说服教育的方法解决。',
    tags: ['两类矛盾', '高频真题'],
    difficulty: 2
  },
  {
    id: 'q-pol-035',
    subjectId: 'sub-pol',
    chapter: '毛泽东思想与中特理论',
    type: 'single',
    stem: '下列理论成果中，不属于中国特色社会主义理论体系的是（　）。',
    options: [
      { key: 'A', text: '邓小平理论' },
      { key: 'B', text: '毛泽东思想' },
      { key: 'C', text: '科学发展观' },
      { key: 'D', text: '习近平新时代中国特色社会主义思想' }
    ],
    answer: ['B'],
    analysis: '中国特色社会主义理论体系是改革开放后形成的，包括邓小平理论、「三个代表」重要思想、科学发展观、习近平新时代中国特色社会主义思想；毛泽东思想不包括在内。',
    tags: ['中特理论体系', '高频真题'],
    difficulty: 2
  },
  {
    id: 'q-pol-036',
    subjectId: 'sub-pol',
    chapter: '毛泽东思想与中特理论',
    type: 'single',
    stem: '「三个代表」重要思想回答的基本问题是（　）。',
    options: [
      { key: 'A', text: '什么是社会主义、怎样建设社会主义' },
      { key: 'B', text: '建设什么样的党、怎样建设党' },
      { key: 'C', text: '实现什么样的发展、怎样发展' },
      { key: 'D', text: '新时代坚持和发展什么样的中国特色社会主义' }
    ],
    answer: ['B'],
    analysis: '邓小平理论回答「什么是社会主义、怎样建设社会主义」；「三个代表」回答「建设什么样的党、怎样建设党」；科学发展观回答「实现什么样的发展、怎样发展」。',
    tags: ['三个代表', '高频真题'],
    difficulty: 2
  },
  {
    id: 'q-pol-037',
    subjectId: 'sub-pol',
    chapter: '毛泽东思想与中特理论',
    type: 'single',
    stem: '科学发展观的核心立场是（　）。',
    options: [
      { key: 'A', text: '发展' },
      { key: 'B', text: '以人为本' },
      { key: 'C', text: '全面协调可持续' },
      { key: 'D', text: '统筹兼顾' }
    ],
    answer: ['B'],
    analysis: '科学发展观第一要义是发展，核心立场是以人为本，基本要求是全面协调可持续，根本方法是统筹兼顾。',
    tags: ['科学发展观', '高频真题'],
    difficulty: 2
  },
  {
    id: 'q-pol-038',
    subjectId: 'sub-pol',
    chapter: '毛泽东思想与中特理论',
    type: 'single',
    stem: '新民主主义革命的三大法宝是（　）。',
    options: [
      { key: 'A', text: '统一战线、武装斗争、党的建设' },
      { key: 'B', text: '实事求是、群众路线、独立自主' },
      { key: 'C', text: '农村包围城市、武装夺取政权' },
      { key: 'D', text: '土地革命、根据地建设、武装斗争' }
    ],
    answer: ['A'],
    analysis: '毛泽东在《〈共产党人〉发刊词》中提出：统一战线、武装斗争、党的建设是战胜敌人的三个主要法宝。',
    tags: ['新民主主义革命', '三大法宝'],
    difficulty: 1
  },
  {
    id: 'q-pol-039',
    subjectId: 'sub-pol',
    chapter: '毛泽东思想与中特理论',
    type: 'single',
    stem: '社会主义初级阶段基本路线的核心内容是（　）。',
    options: [
      { key: 'A', text: '一个中心、两个基本点' },
      { key: 'B', text: '两个文明一起抓' },
      { key: 'C', text: '三个有利于' },
      { key: 'D', text: '四项基本原则' }
    ],
    answer: ['A'],
    analysis: '社会主义初级阶段基本路线核心是「一个中心、两个基本点」——以经济建设为中心，坚持四项基本原则，坚持改革开放。',
    tags: ['基本路线', '一个中心两个基本点'],
    difficulty: 1
  },
  {
    id: 'q-pol-040',
    subjectId: 'sub-pol',
    chapter: '毛泽东思想与中特理论',
    type: 'single',
    stem: '1956 年三大改造基本完成，标志着（　）。',
    options: [
      { key: 'A', text: '新民主主义革命取得胜利' },
      { key: 'B', text: '社会主义基本制度在中国确立' },
      { key: 'C', text: '进入共产主义社会' },
      { key: 'D', text: '改革开放正式开始' }
    ],
    answer: ['B'],
    analysis: '1956 年三大改造基本完成，标志着社会主义基本制度在中国确立，是我国历史上最深刻最伟大的社会变革。',
    tags: ['社会主义改造', '历史意义'],
    difficulty: 2
  },
  {
    id: 'q-pol-041',
    subjectId: 'sub-pol',
    chapter: '毛泽东思想与中特理论',
    type: 'judge',
    stem: '社会主义的本质是解放生产力、发展生产力，消灭剥削、消除两极分化，最终达到共同富裕。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '这是邓小平关于社会主义本质的经典论述，五句话必须准确记忆。',
    tags: ['邓小平理论', '社会主义本质'],
    difficulty: 2
  },
  {
    id: 'q-pol-042',
    subjectId: 'sub-pol',
    chapter: '毛泽东思想与中特理论',
    type: 'judge',
    stem: '中国特色社会主义理论体系包括毛泽东思想。',
    options: JUDGE_OPTIONS,
    answer: ['F'],
    analysis: '错误。毛泽东思想是马克思主义中国化第一次历史性飞跃的成果，不属于中国特色社会主义理论体系。',
    tags: ['中特理论体系', '易混淆'],
    difficulty: 2
  },

  {
    id: 'q-pol-043',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'single',
    stem: '习近平新时代中国特色社会主义思想实现了马克思主义中国化时代化的（　）。',
    options: [
      { key: 'A', text: '第一次历史性飞跃' },
      { key: 'B', text: '新的飞跃' },
      { key: 'C', text: '第二次历史性飞跃' },
      { key: 'D', text: '第三个里程碑' }
    ],
    answer: ['B'],
    analysis: '习近平新时代中国特色社会主义思想是马克思主义中国化时代化「新的飞跃」，注意官方表述不是「第二次飞跃」。',
    tags: ['习思想', '历史地位'],
    difficulty: 2
  },
  {
    id: 'q-pol-044',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'single',
    stem: '新时代我国社会主要矛盾是（　）。',
    options: [
      { key: 'A', text: '无产阶级和资产阶级的矛盾' },
      { key: 'B', text: '人民日益增长的物质文化需要同落后的社会生产之间的矛盾' },
      { key: 'C', text: '人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾' },
      { key: 'D', text: '人民对于建立先进的工业国的要求同落后的农业国的现实之间的矛盾' }
    ],
    answer: ['C'],
    analysis: '新时代社会主要矛盾是人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾；B 项是 1981 年的旧表述，已过时。',
    tags: ['新时代', '社会主要矛盾'],
    difficulty: 2
  },
  {
    id: 'q-pol-045',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'single',
    stem: '中国特色社会主义最本质的特征是（　）。',
    options: [
      { key: 'A', text: '人民当家作主' },
      { key: 'B', text: '中国共产党领导' },
      { key: 'C', text: '依法治国' },
      { key: 'D', text: '公有制为主体' }
    ],
    answer: ['B'],
    analysis: '中国共产党领导是中国特色社会主义最本质的特征，是中国特色社会主义制度的最大优势。',
    tags: ['党的领导', '最本质特征'],
    difficulty: 1
  },
  {
    id: 'q-pol-046',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'single',
    stem: '我们党始终把（　）作为奋斗目标。',
    options: [
      { key: 'A', text: '实现共产主义' },
      { key: 'B', text: '人民对美好生活的向往' },
      { key: 'C', text: '成为世界第一大党' },
      { key: 'D', text: '实现经济高速增长' }
    ],
    answer: ['B'],
    analysis: '人民对美好生活的向往就是我们的奋斗目标，体现了以人民为中心的发展思想。',
    tags: ['以人民为中心', '奋斗目标'],
    difficulty: 1
  },
  {
    id: 'q-pol-047',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'single',
    stem: '全面深化改革的总目标是（　）。',
    options: [
      { key: 'A', text: '实现共同富裕' },
      { key: 'B', text: '完善和发展中国特色社会主义制度，推进国家治理体系和治理能力现代化' },
      { key: 'C', text: '建设社会主义法治国家' },
      { key: 'D', text: '建成社会主义现代化强国' }
    ],
    answer: ['B'],
    analysis: '全面深化改革总目标是完善和发展中国特色社会主义制度，推进国家治理体系和治理能力现代化，这是十八届三中全会提出的。',
    tags: ['全面深化改革', '总目标'],
    difficulty: 2
  },
  {
    id: 'q-pol-048',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'single',
    stem: '全面建设社会主义现代化国家的首要任务是（　）。',
    options: [
      { key: 'A', text: '高速增长' },
      { key: 'B', text: '高质量发展' },
      { key: 'C', text: '阶级斗争' },
      { key: 'D', text: '对外开放' }
    ],
    answer: ['B'],
    analysis: '高质量发展是全面建设社会主义现代化国家的首要任务，我国经济已由高速增长阶段转向高质量发展阶段。',
    tags: ['高质量发展', '首要任务'],
    difficulty: 1
  },
  {
    id: 'q-pol-049',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'single',
    stem: '全面建设社会主义现代化国家的基础性、战略性支撑是（　）。',
    options: [
      { key: 'A', text: '工业、农业、国防' },
      { key: 'B', text: '教育、科技、人才' },
      { key: 'C', text: '政治、经济、文化' },
      { key: 'D', text: '改革、发展、稳定' }
    ],
    answer: ['B'],
    analysis: '教育、科技、人才是全面建设社会主义现代化国家的基础性、战略性支撑。',
    tags: ['教育科技人才', '战略支撑'],
    difficulty: 1
  },
  {
    id: 'q-pol-050',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'single',
    stem: '我国的根本政治制度是（　）。',
    options: [
      { key: 'A', text: '人民代表大会制度' },
      { key: 'B', text: '中国共产党领导的多党合作和政治协商制度' },
      { key: 'C', text: '民族区域自治制度' },
      { key: 'D', text: '基层群众自治制度' }
    ],
    answer: ['A'],
    analysis: '人民代表大会制度是我国的根本政治制度；B、C、D 属于基本政治制度。',
    tags: ['根本政治制度', '人民民主'],
    difficulty: 2
  },
  {
    id: 'q-pol-051',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'single',
    stem: '全面依法治国的总目标是（　）。',
    options: [
      { key: 'A', text: '建设中国特色社会主义法治体系，建设社会主义法治国家' },
      { key: 'B', text: '维护社会稳定' },
      { key: 'C', text: '保障人民权利' },
      { key: 'D', text: '实现公平正义' }
    ],
    answer: ['A'],
    analysis: '全面依法治国总目标是建设中国特色社会主义法治体系、建设社会主义法治国家；十六字方针是科学立法、严格执法、公正司法、全民守法。',
    tags: ['全面依法治国', '总目标'],
    difficulty: 2
  },
  {
    id: 'q-pol-052',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'single',
    stem: '总体国家安全观的宗旨是（　）。',
    options: [
      { key: 'A', text: '政治安全' },
      { key: 'B', text: '人民安全' },
      { key: 'C', text: '经济安全' },
      { key: 'D', text: '国土安全' }
    ],
    answer: ['B'],
    analysis: '总体国家安全观以人民安全为宗旨，以政治安全为根本，以经济安全为基础。',
    tags: ['总体国家安全观', '宗旨'],
    difficulty: 2
  },
  {
    id: 'q-pol-053',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'single',
    stem: '党的根本性建设是（　）。',
    options: [
      { key: 'A', text: '思想建设' },
      { key: 'B', text: '政治建设' },
      { key: 'C', text: '组织建设' },
      { key: 'D', text: '作风建设' }
    ],
    answer: ['B'],
    analysis: '党的政治建设是党的根本性建设，决定党的建设方向和效果；思想建设是党的基础性建设。',
    tags: ['全面从严治党', '政治建设'],
    difficulty: 2
  },
  {
    id: 'q-pol-054',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'multiple',
    stem: '中国式现代化的中国特色包括（　）。',
    options: [
      { key: 'A', text: '人口规模巨大的现代化' },
      { key: 'B', text: '全体人民共同富裕的现代化' },
      { key: 'C', text: '物质文明和精神文明相协调的现代化' },
      { key: 'D', text: '人与自然和谐共生的现代化' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    analysis: '中国式现代化五大特征还包括「走和平发展道路的现代化」，本题四个选项均正确。',
    tags: ['中国式现代化', '中国特色'],
    difficulty: 2
  },
  {
    id: 'q-pol-055',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'multiple',
    stem: '新发展理念包括（　）。',
    options: [
      { key: 'A', text: '创新' },
      { key: 'B', text: '协调' },
      { key: 'C', text: '绿色' },
      { key: 'D', text: '开放' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    analysis: '新发展理念为创新、协调、绿色、开放、共享，本题四个选项均正确。创新是第一动力，共享是根本目的。',
    tags: ['新发展理念', '高质量发展'],
    difficulty: 2
  },
  {
    id: 'q-pol-056',
    subjectId: 'sub-pol',
    chapter: '习近平新时代思想',
    type: 'judge',
    stem: '「两个结合」是开辟和发展中国特色社会主义的根本途径。',
    options: JUDGE_OPTIONS,
    answer: ['T'],
    analysis: '「两个结合」即把马克思主义基本原理同中国具体实际相结合、同中华优秀传统文化相结合，是开辟和发展中国特色社会主义的根本途径。',
    tags: ['两个结合', '马克思主义中国化'],
    difficulty: 2
  },

  {
    id: 'q-pol-057',
    subjectId: 'sub-pol',
    chapter: '时事政治',
    type: 'single',
    stem: '2026 年全国两会审查批准的重要文件是（　）。',
    options: [
      { key: 'A', text: '「十四五」规划纲要' },
      { key: 'B', text: '「十五五」规划纲要' },
      { key: 'C', text: '「十三五」规划纲要' },
      { key: 'D', text: '2035 年远景目标纲要' }
    ],
    answer: ['B'],
    analysis: '2026 年全国两会审查批准了「十五五」规划纲要，GDP 增长预期目标为 4.5%—5%。',
    tags: ['时事政治', '全国两会'],
    difficulty: 2
  },
  {
    id: 'q-pol-058',
    subjectId: 'sub-pol',
    chapter: '时事政治',
    type: 'single',
    stem: '海南自贸港全岛封关运作的模式是（　）。',
    options: [
      { key: 'A', text: '一线放开、二线管住、岛内自由' },
      { key: 'B', text: '一线管住、二线放开、岛内自由' },
      { key: 'C', text: '全面放开、自由进出' },
      { key: 'D', text: '内外统一、严格管控' }
    ],
    answer: ['A'],
    analysis: '海南自贸港全岛封关运作采用「一线放开、二线管住、岛内自由」的模式。',
    tags: ['时事政治', '海南自贸港'],
    difficulty: 2
  },
  {
    id: 'q-pol-059',
    subjectId: 'sub-pol',
    chapter: '时事政治',
    type: 'single',
    stem: '截至 2025 年，我国世界遗产总数达到（　）。',
    options: [
      { key: 'A', text: '56 项' },
      { key: 'B', text: '57 项' },
      { key: 'C', text: '60 项' },
      { key: 'D', text: '63 项' }
    ],
    answer: ['C'],
    analysis: '我国世界遗产总数达 60 项（2025 年西夏陵入选）。',
    tags: ['时事政治', '世界遗产'],
    difficulty: 2
  },
  {
    id: 'q-pol-060',
    subjectId: 'sub-pol',
    chapter: '时事政治',
    type: 'single',
    stem: '2026 年是中国共产党成立多少周年（　）。',
    options: [
      { key: 'A', text: '100 周年' },
      { key: 'B', text: '105 周年' },
      { key: 'C', text: '110 周年' },
      { key: 'D', text: '95 周年' }
    ],
    answer: ['B'],
    analysis: '中国共产党成立于 1921 年，2026 年是建党 105 周年。',
    tags: ['时事政治', '建党周年'],
    difficulty: 1
  },
  {
    id: 'q-pol-061',
    subjectId: 'sub-pol',
    chapter: '时事政治',
    type: 'single',
    stem: '「一带一路」建设遵循的原则是（　）。',
    options: [
      { key: 'A', text: '共商、共建、共享' },
      { key: 'B', text: '互利、共赢、开放' },
      { key: 'C', text: '独立、自主、平等' },
      { key: 'D', text: '和平、发展、合作' }
    ],
    answer: ['A'],
    analysis: '「一带一路」建设遵循共商、共建、共享原则。',
    tags: ['时事政治', '一带一路'],
    difficulty: 2
  },
  {
    id: 'q-pol-062',
    subjectId: 'sub-pol',
    chapter: '时事政治',
    type: 'single',
    stem: '我国外交政策的基本立场是（　）。',
    options: [
      { key: 'A', text: '独立自主的和平外交政策' },
      { key: 'B', text: '结盟与对抗' },
      { key: 'C', text: '闭关自守' },
      { key: 'D', text: '霸权主义' }
    ],
    answer: ['A'],
    analysis: '我国奉行独立自主的和平外交政策，以和平共处五项原则为基本准则。',
    tags: ['时事政治', '外交政策'],
    difficulty: 1
  },
  {
    id: 'q-pol-063',
    subjectId: 'sub-pol',
    chapter: '时事政治',
    type: 'single',
    stem: '下列不属于「三大全球倡议」的是（　）。',
    options: [
      { key: 'A', text: '全球发展倡议' },
      { key: 'B', text: '全球安全倡议' },
      { key: 'C', text: '全球文明倡议' },
      { key: 'D', text: '全球经济倡议' }
    ],
    answer: ['D'],
    analysis: '三大全球倡议为全球发展倡议、全球安全倡议、全球文明倡议，不包括「全球经济倡议」。',
    tags: ['时事政治', '全球倡议'],
    difficulty: 2
  },
  {
    id: 'q-pol-064',
    subjectId: 'sub-pol',
    chapter: '时事政治',
    type: 'multiple',
    stem: '人类命运共同体的内涵包括（　）。',
    options: [
      { key: 'A', text: '持久和平、普遍安全' },
      { key: 'B', text: '共同繁荣' },
      { key: 'C', text: '开放包容' },
      { key: 'D', text: '清洁美丽' }
    ],
    answer: ['A', 'B', 'C', 'D'],
    analysis: '人类命运共同体的内涵是持久和平、普遍安全、共同繁荣、开放包容、清洁美丽，四个选项均正确。',
    tags: ['时事政治', '人类命运共同体'],
    difficulty: 2
  }
]

/** 生成初始种子数据 */
export function createSeedData(): StudyData {
  return {
    version: DATA_VERSION,
    subjects: seedSubjects,
    questions: seedQuestions,
    states: [],
    records: [],
    sessions: []
  }
}
