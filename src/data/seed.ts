import type { Question, StudyData, Subject } from '@/types'

export const seedSubjects: Subject[] = [
  { id: 'sub-math', name: '高等数学' },
  { id: 'sub-net', name: '计算机网络' }
]

export const seedQuestions: Question[] = [
  // ---------------- 高等数学 ----------------
  {
    id: 'q-math-01',
    subjectId: 'sub-math',
    chapter: '极限',
    type: 'single',
    stem: '极限 lim(x→0) sin(x)/x 的值为？',
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '1' },
      { key: 'C', text: '∞' },
      { key: 'D', text: '不存在' }
    ],
    answer: ['B'],
    analysis: '这是重要极限之一：lim(x→0) sin(x)/x = 1，可用夹逼准则证明。',
    tags: ['极限', '重要极限'],
    difficulty: 1
  },
  {
    id: 'q-math-02',
    subjectId: 'sub-math',
    chapter: '极限',
    type: 'single',
    stem: '极限 lim(x→∞) (1 + 1/x)^x 的值为？',
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: 'e' },
      { key: 'C', text: '0' },
      { key: 'D', text: '不存在' }
    ],
    answer: ['B'],
    analysis: '第二个重要极限：lim(x→∞) (1 + 1/x)^x = e，其中 e 为自然常数。',
    tags: ['极限', '重要极限', 'e'],
    difficulty: 2
  },
  {
    id: 'q-math-03',
    subjectId: 'sub-math',
    chapter: '导数',
    type: 'single',
    stem: '函数 f(x) = x² 的导数为？',
    options: [
      { key: 'A', text: '2x' },
      { key: 'B', text: 'x' },
      { key: 'C', text: 'x²' },
      { key: 'D', text: '2' }
    ],
    answer: ['A'],
    analysis: '由幂函数求导公式 (x^n)′ = n·x^(n-1)，得 (x²)′ = 2x。',
    tags: ['导数', '幂函数'],
    difficulty: 1
  },
  {
    id: 'q-math-04',
    subjectId: 'sub-math',
    chapter: '导数',
    type: 'judge',
    stem: '若函数在某点可导，则它在该点一定连续。',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: ['T'],
    analysis: '可导必连续；但连续不一定可导（如 |x| 在 x=0 处连续但不可导）。',
    tags: ['导数', '连续性'],
    difficulty: 1
  },
  {
    id: 'q-math-05',
    subjectId: 'sub-math',
    chapter: '导数',
    type: 'multiple',
    stem: '下列函数中，在定义域内为奇函数的有？',
    options: [
      { key: 'A', text: 'f(x) = x³' },
      { key: 'B', text: 'f(x) = cos(x)' },
      { key: 'C', text: 'f(x) = sin(x)' },
      { key: 'D', text: 'f(x) = x²' }
    ],
    answer: ['A', 'C'],
    analysis: '奇函数满足 f(-x) = -f(x)：x³ 与 sin(x) 为奇函数，cos(x) 与 x² 为偶函数。',
    tags: ['函数', '奇偶性'],
    difficulty: 2
  },
  {
    id: 'q-math-06',
    subjectId: 'sub-math',
    chapter: '积分',
    type: 'single',
    stem: '不定积分 ∫(1/x) dx 的结果为？',
    options: [
      { key: 'A', text: 'ln|x| + C' },
      { key: 'B', text: 'x + C' },
      { key: 'C', text: '-1/x² + C' },
      { key: 'D', text: 'e^x + C' }
    ],
    answer: ['A'],
    analysis: '基本积分公式：∫(1/x) dx = ln|x| + C，注意 x≠0 时取绝对值。',
    tags: ['积分', '基本公式'],
    difficulty: 2
  },

  // ---------------- 计算机网络 ----------------
  {
    id: 'q-net-01',
    subjectId: 'sub-net',
    chapter: '体系结构',
    type: 'single',
    stem: 'OSI 参考模型共分为几层？',
    options: [
      { key: 'A', text: '4 层' },
      { key: 'B', text: '5 层' },
      { key: 'C', text: '6 层' },
      { key: 'D', text: '7 层' }
    ],
    answer: ['D'],
    analysis: 'OSI 参考模型自下而上为：物理层、数据链路层、网络层、传输层、会话层、表示层、应用层，共 7 层。',
    tags: ['OSI', '体系结构'],
    difficulty: 1
  },
  {
    id: 'q-net-02',
    subjectId: 'sub-net',
    chapter: '传输层',
    type: 'multiple',
    stem: '下列属于传输层协议的有？',
    options: [
      { key: 'A', text: 'TCP' },
      { key: 'B', text: 'UDP' },
      { key: 'C', text: 'IP' },
      { key: 'D', text: 'HTTP' }
    ],
    answer: ['A', 'B'],
    analysis: 'TCP 与 UDP 属于传输层协议；IP 属于网络层，HTTP 属于应用层。',
    tags: ['传输层', 'TCP', 'UDP'],
    difficulty: 2
  },
  {
    id: 'q-net-03',
    subjectId: 'sub-net',
    chapter: '传输层',
    type: 'judge',
    stem: 'TCP 是一种面向连接的、可靠的传输层协议。',
    options: [
      { key: 'T', text: '正确' },
      { key: 'F', text: '错误' }
    ],
    answer: ['T'],
    analysis: 'TCP 通过三次握手建立连接，并使用序号、确认、重传等机制保证可靠传输。',
    tags: ['TCP', '可靠性'],
    difficulty: 1
  },
  {
    id: 'q-net-04',
    subjectId: 'sub-net',
    chapter: '应用层',
    type: 'single',
    stem: 'HTTP 协议默认使用的端口号是？',
    options: [
      { key: 'A', text: '21' },
      { key: 'B', text: '22' },
      { key: 'C', text: '80' },
      { key: 'D', text: '443' }
    ],
    answer: ['C'],
    analysis: 'HTTP 默认端口为 80；HTTPS 默认端口为 443；21 为 FTP，22 为 SSH。',
    tags: ['HTTP', '端口'],
    difficulty: 1
  },
  {
    id: 'q-net-05',
    subjectId: 'sub-net',
    chapter: '网络层',
    type: 'multiple',
    stem: '下列属于私有（内网）IP 地址段的有？',
    options: [
      { key: 'A', text: '10.0.0.0/8' },
      { key: 'B', text: '172.16.0.0/12' },
      { key: 'C', text: '192.168.0.0/16' },
      { key: 'D', text: '8.8.8.0/24' }
    ],
    answer: ['A', 'B', 'C'],
    analysis: 'RFC1918 定义三个私有地址段：10.0.0.0/8、172.16.0.0/12、192.168.0.0/16；8.8.8.8 是 Google 公共 DNS。',
    tags: ['IP', '私有地址'],
    difficulty: 3
  }
]

/** 生成初始种子数据 */
export function createSeedData(): StudyData {
  return {
    version: 1,
    subjects: seedSubjects,
    questions: seedQuestions,
    states: [],
    records: [],
    sessions: []
  }
}
