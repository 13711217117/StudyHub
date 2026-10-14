/** 科目 */
export interface Subject {
  id: string
  name: string
}

/** 题目类型：单选 / 多选 / 判断 */
export type QuestionType = 'single' | 'multiple' | 'judge'

/** 选项 */
export interface QuestionOption {
  key: string
  text: string
}

/** 题目 */
export interface Question {
  id: string
  subjectId: string
  chapter?: string
  type: QuestionType
  stem: string
  options: QuestionOption[]
  answer: string[]
  analysis?: string
  tags: string[]
  difficulty: 1 | 2 | 3
}

/** 作答记录 */
export interface AnswerRecord {
  id: string
  questionId: string
  sessionId: string
  userAnswer: string[]
  correct: boolean
  durationMs: number
  createdAt: number
}

/** 每道题的派生状态（间隔重复 + 错题 + 收藏） */
export interface QuestionState {
  questionId: string
  wrongCount: number
  lastWrongAt?: number
  favorite: boolean
  mastered: boolean
  dueAt?: number
  /** 间隔重复：当前间隔（天） */
  interval: number
  /** 间隔重复：难度系数 */
  ease: number
  /** 间隔重复：连续答对次数 */
  reps: number
}

/** 练习模式 */
export type PracticeMode = 'order' | 'random' | 'wrong' | 'favorite' | 'chapter'

/** 一次练习会话 */
export interface PracticeSession {
  id: string
  mode: PracticeMode
  subjectId?: string
  questionIds: string[]
  startedAt: number
  finishedAt?: number
}

/** 持久化的整份数据快照 */
export interface StudyData {
  version: number
  subjects: Subject[]
  questions: Question[]
  states: QuestionState[]
  records: AnswerRecord[]
  sessions: PracticeSession[]
}
