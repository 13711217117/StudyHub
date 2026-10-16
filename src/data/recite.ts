/**
 * 背题模式 · 记忆资料卡
 * ------------------------------------------------------------
 * 内容严格取自用户上传的 2026 成考资料：
 *   - 《26 本科应试技巧（政治英语高数）》
 *       → 政治必背大题框架、英语书面表达（作文）模板与连接词
 *   - 《2026 年 本科常考、易考点手册》 / 高等数学考前冲刺课
 *       → 两个重要极限、基本初等函数导数公式、不定积分基本公式、常用因式分解公式、
 *         常见角三角函数值、切线 / 法线方程、定积分几何应用
 *
 * 说明：本文件只放「记忆资料」类记忆卡；题库里的选择题闪卡由背题模式页面
 * 直接从 study store 的题库中生成，题库更新后会自动同步。
 */

/** 一张记忆卡：正面提示 → 背面内容 */
export interface ReciteCard {
  id: string
  /** 正面：提示 / 标题 / 问题 */
  front: string
  /** 背面：答案 / 内容 / 模板 */
  answer: string
}

/** 一个记忆分类（科目下的一个类别，如「数学公式」「作文模板」「必背大题」） */
export interface ReciteCategory {
  key: string
  name: string
  cards: ReciteCard[]
}

/** 一个科目的记忆资料分组 */
export interface ReciteSubjectGroup {
  subjectId: string
  name: string
  categories: ReciteCategory[]
}

export const memorizeGroups: ReciteSubjectGroup[] = [
  // ============================================================
  //  高等数学 · 数学公式
  // ============================================================
  {
    subjectId: 'sub-math',
    name: '高等数学',
    categories: [
      {
        key: 'math-formula',
        name: '数学公式',
        cards: [
          {
            id: 'rc-math-01',
            front: '两个重要极限',
            answer:
              '① lim(x→0) sin x / x = 1；\n② lim(x→∞) (1 + 1/x)^x = e（也可写成 lim(x→0) (1 + x)^(1/x) = e）。\n做题时一般先凑成标准公式模式，再处理幂的部分。'
          },
          {
            id: 'rc-math-02',
            front: '常用因式分解公式（化简极限常用）',
            answer:
              '平方差：a² − b² = (a + b)(a − b)\n立方和：a³ + b³ = (a + b)(a² − ab + b²)\n立方差：a³ − b³ = (a − b)(a² + ab + b²)'
          },
          {
            id: 'rc-math-03',
            front: '基本初等函数的导数公式',
            answer:
              '(C)′ = 0\n(x^n)′ = n·x^(n−1)\n(sin x)′ = cos x\n(cos x)′ = −sin x\n(e^x)′ = e^x\n(a^x)′ = a^x·ln a\n(ln x)′ = 1/x\n(log_a x)′ = 1/(x·ln a)'
          },
          {
            id: 'rc-math-04',
            front: '求导法则（和差积商 · 复合函数）',
            answer:
              '(u ± v)′ = u′ ± v′\n(uv)′ = u′v + uv′\n(u / v)′ = (u′v − uv′) / v²（v ≠ 0）\n复合函数（链式法则）：[f(g(x))]′ = f′(g(x))·g′(x)'
          },
          {
            id: 'rc-math-05',
            front: '不定积分基本公式',
            answer:
              '∫k dx = kx + C\n∫x^n dx = x^(n+1)/(n+1) + C（n ≠ −1）\n∫(1/x) dx = ln|x| + C\n∫e^x dx = e^x + C\n∫a^x dx = a^x / ln a + C\n∫sin x dx = −cos x + C\n∫cos x dx = sin x + C'
          },
          {
            id: 'rc-math-06',
            front: '牛顿—莱布尼茨公式',
            answer:
              '∫_a^b f(x) dx = F(b) − F(a)\n其中 F(x) 是 f(x) 的一个原函数，即「定积分 = 原函数在积分上下限处的值之差」。'
          },
          {
            id: 'rc-math-07',
            front: '常见角的三角函数值（0° / 30° / 45° / 60° / 90°）',
            answer:
              'sin：0，1/2，√2/2，√3/2，1\ncos：1，√3/2，√2/2，1/2，0\ntan：0，√3/3，1，√3，不存在'
          },
          {
            id: 'rc-math-08',
            front: '切线方程与法线方程（导数的几何意义）',
            answer:
              '曲线 y = f(x) 在点 (x₀, f(x₀)) 处：\n切线：y − f(x₀) = f′(x₀)·(x − x₀)\n法线：y − f(x₀) = −1/f′(x₀)·(x − x₀)（f′(x₀) ≠ 0）\n法线斜率与切线斜率互为负倒数。'
          },
          {
            id: 'rc-math-09',
            front: '定积分的几何应用（面积 / 旋转体体积）',
            answer:
              '平面图形面积：S = ∫_a^b f(x) dx\n绕 x 轴旋转一周的旋转体体积：V = π∫_a^b f(x)² dx'
          }
        ]
      }
    ]
  },
  // ============================================================
  //  英语 · 作文模板
  // ============================================================
  {
    subjectId: 'sub-eng',
    name: '英语',
    categories: [
      {
        key: 'eng-writing',
        name: '作文模板',
        cards: [
          {
            id: 'rc-eng-01',
            front: '书面表达（作文）通用书信模板',
            answer:
              'Dear XXX,\n开头：I\'ve got good news for you. / I think that… / I\'m glad that… / It\'s good that…\n中间：认真写题目给出的要点\n结尾：You are welcome to visit my home anytime. / I\'m looking forward to your reply.\n落款：Yours, XXX'
          },
          {
            id: 'rc-eng-02',
            front: '作文常用连接词（提升条理 · 也占字数）',
            answer:
              'First / Second / Besides / Finally\nOn one hand, on the other hand\nAlthough / But / However / At the same time\nRecently / Today / Now\nLuckily / Especially\nGenerally speaking'
          },
          {
            id: 'rc-eng-03',
            front: '作文得分要点',
            answer:
              '① 字数一定要够；\n② 先翻译题目给出的中文要点，不会的单词在前面试卷里找；\n③ 可借鉴阅读理解中的句子改用在作文里，但不要直接抄开头段。'
          }
        ]
      }
    ]
  },
  // ============================================================
  //  政治 · 必背大题
  // ============================================================
  {
    subjectId: 'sub-pol',
    name: '政治',
    categories: [
      {
        key: 'pol-keypoint',
        name: '必背大题',
        cards: [
          {
            id: 'rc-pol-01',
            front: '马哲「关系」类通用答题模板',
            answer:
              'A 与 B 是辩证统一的（既对立又统一、既联系又区别）：\n对立性——A 是 A、B 是 B；\n统一性——① 相互依存，② 一定条件下相互转化。'
          },
          {
            id: 'rc-pol-02',
            front: '毛泽东思想',
            answer:
              '马克思主义中国化时代化的第一个重大理论成果，是马列主义在中国的运用和发展；其活的灵魂是实事求是、群众路线、独立自主。'
          },
          {
            id: 'rc-pol-03',
            front: '新民主主义革命',
            answer:
              '近代中国是半殖民地半封建社会；总路线是无产阶级领导的、人民大众的、反帝反封建反官僚资本主义的革命；三大法宝是统一战线、武装斗争、党的建设。'
          },
          {
            id: 'rc-pol-04',
            front: '社会主义改造',
            answer:
              '新民主主义社会是过渡性社会；开辟了适合中国特点的社会主义改造道路，实现了中国历史上最深刻最伟大的社会变革。'
          },
          {
            id: 'rc-pol-05',
            front: '邓小平理论',
            answer:
              '首要的基本理论问题是「什么是社会主义、怎样建设社会主义」；精髓是解放思想、实事求是。'
          },
          {
            id: 'rc-pol-06',
            front: '「三个代表」重要思想',
            answer:
              '代表先进生产力发展要求、先进文化前进方向、最广大人民根本利益，是立党之本、执政之基、力量之源。'
          },
          {
            id: 'rc-pol-07',
            front: '中国共产党的领导',
            answer:
              '中国特色社会主义最本质的特征和最大优势都是党的领导，党是最高政治领导力量；党中央集中统一领导是党的领导的最高原则。'
          },
          {
            id: 'rc-pol-08',
            front: '人民至上',
            answer:
              '人民是历史的创造者，「江山就是人民，人民就是江山」；坚持人民至上，解决「为了谁、依靠谁、由谁评价」。'
          },
          {
            id: 'rc-pol-09',
            front: '全面深化改革开放',
            answer: '改革开放是决定当代中国命运的关键一招；改革不停顿、开放不止步。'
          },
          {
            id: 'rc-pol-10',
            front: '教育、科技、人才',
            answer:
              '是全面建设社会主义现代化国家的基础性、战略性支撑；坚持教育优先发展，把立德树人作为根本任务。'
          },
          {
            id: 'rc-pol-11',
            front: '全过程人民民主',
            answer: '是全链条、全方位、全覆盖的民主，是最广泛、最真实、最管用的民主。'
          },
          {
            id: 'rc-pol-12',
            front: '文化自信',
            answer: '文化是一个国家、一个民族的灵魂；文化自信是更基础、更广泛、更深厚的自信。'
          },
          {
            id: 'rc-pol-13',
            front: '外交与人类命运共同体',
            answer:
              '坚定奉行独立自主的和平外交政策；推动构建人类命运共同体，高质量共建「一带一路」。'
          }
        ]
      }
    ]
  }
]
