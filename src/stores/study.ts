import { defineStore } from 'pinia'
import type {
  AnswerRecord,
  PracticeMode,
  PracticeSession,
  Question,
  QuestionState,
  StudyData,
  Subject
} from '@/types'
import { repository } from '@/services/repository'
import { createSeedData, DATA_VERSION } from '@/data/seed'

const DAY = 24 * 60 * 60 * 1000

/** 生成一个短 id */
function uid(prefix = ''): string {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

/** 把时间戳格式化为本地 YYYY-MM-DD */
function dayKey(ts: number): string {
  const d = new Date(ts)
  const m = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

/** 当天 00:00 的时间戳 */
function startOfDay(ts: number): number {
  const d = new Date(ts)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

/** 比较两个答案集合是否相同（顺序无关） */
function sameAnswer(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  const sa = [...a].sort()
  const sb = [...b].sort()
  return sa.every((v, i) => v === sb[i])
}

/** 洗牌 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** 新建一个 QuestionState */
function createState(questionId: string, dueAt?: number): QuestionState {
  return {
    questionId,
    wrongCount: 0,
    favorite: false,
    mastered: false,
    interval: 0,
    ease: 2.5,
    reps: 0,
    dueAt
  }
}

/** 当前练习上下文 */
export interface PracticeContext {
  mode: PracticeMode
  subjectId?: string
  sessionId: string
  questionIds: string[]
  index: number
}

/** 每日做题量 */
export interface DailyCount {
  date: string
  count: number
}

export const useStudyStore = defineStore('study', {
  state: () => ({
    subjects: [] as Subject[],
    questions: [] as Question[],
    /** questionId -> QuestionState */
    states: {} as Record<string, QuestionState>,
    records: [] as AnswerRecord[],
    sessions: [] as PracticeSession[],
    current: null as PracticeContext | null,
    ready: false
  }),

  getters: {
    questionMap(state): Record<string, Question> {
      const map: Record<string, Question> = {}
      for (const q of state.questions) map[q.id] = q
      return map
    },

    /** 错题本：答错过且尚未掌握 */
    wrongBook(): Question[] {
      return this.questions.filter((q) => {
        const s = this.states[q.id]
        return !!s && s.wrongCount > 0 && !s.mastered
      })
    },

    /** 收藏题目 */
    favorites(): Question[] {
      return this.questions.filter((q) => !!this.states[q.id]?.favorite)
    },

    /** 今日（含逾期）待复习题目 */
    dueQuestions(): Question[] {
      const now = Date.now()
      return this.questions.filter((q) => {
        const s = this.states[q.id]
        return !!s && !s.mastered && s.dueAt !== undefined && s.dueAt <= now
      })
    },

    totalQuestions(state): number {
      return state.questions.length
    },

    /** 累计做题数 */
    totalAnswered(state): number {
      return state.records.length
    },

    /** 累计答对题数 */
    correctCount(state): number {
      return state.records.filter((r) => r.correct).length
    },

    /** 正确率（0-100 整数） */
    accuracy(): number {
      return this.totalAnswered ? Math.round((this.correctCount / this.totalAnswered) * 100) : 0
    },

    /** 今日做题量 */
    todayCount(state): number {
      const key = dayKey(Date.now())
      return state.records.filter((r) => dayKey(r.createdAt) === key).length
    },

    /** 近 84 天每日做题量（用于热力图） */
    dailyCounts(state): DailyCount[] {
      const counts: Record<string, number> = {}
      for (const r of state.records) {
        const key = dayKey(r.createdAt)
        counts[key] = (counts[key] ?? 0) + 1
      }
      const result: DailyCount[] = []
      const today = startOfDay(Date.now())
      for (let i = 83; i >= 0; i--) {
        const key = dayKey(today - i * DAY)
        result.push({ date: key, count: counts[key] ?? 0 })
      }
      return result
    },

    /** 连续打卡天数 */
    streak(state): number {
      const counts: Record<string, number> = {}
      for (const r of state.records) {
        const key = dayKey(r.createdAt)
        counts[key] = (counts[key] ?? 0) + 1
      }
      let cursor = startOfDay(Date.now())
      if (!counts[dayKey(cursor)]) cursor -= DAY
      let streak = 0
      for (let i = 0; i < 3650; i++) {
        if (counts[dayKey(cursor)]) {
          streak += 1
          cursor -= DAY
        } else {
          break
        }
      }
      return streak
    },

    /** 当前练习中的题目 */
    currentQuestion(): Question | null {
      if (!this.current) return null
      const id = this.current.questionIds[this.current.index]
      return id ? this.questionMap[id] ?? null : null
    }
  },

  actions: {
    /** 清空内存状态（切换账号 / 退出登录时调用），下次 init 会按新命名空间重新加载 */
    reset(): void {
      this.subjects = []
      this.questions = []
      this.states = {}
      this.records = []
      this.sessions = []
      this.current = null
      this.ready = false
    },

    /** 首次启动初始化：本地为空则写入种子数据 */
    async init(): Promise<void> {
      if (this.ready) return
      const data = await repository.load()
      const isUsable =
        !!data &&
        data.version === DATA_VERSION &&
        Array.isArray(data.questions) &&
        data.questions.length > 0

      if (isUsable) {
        this.subjects = data!.subjects ?? []
        this.questions = data!.questions
        this.states = {}
        for (const s of data!.states ?? []) this.states[s.questionId] = s
        this.records = data!.records ?? []
        this.sessions = data!.sessions ?? []
      } else {
        // 本地为空，或内置题库版本升级：用最新种子数据覆盖，保证题目更新
        const seed = createSeedData()
        this.subjects = seed.subjects
        this.questions = seed.questions
        this.records = []
        this.sessions = []
        this.states = {}
        const now = Date.now()
        for (const q of seed.questions) this.states[q.id] = createState(q.id, now)
        await this.persist()
      }
      // 兜底：确保每道题都存在状态
      const now = Date.now()
      for (const q of this.questions) {
        if (!this.states[q.id]) this.states[q.id] = createState(q.id, now)
      }
      this.ready = true
    },

    /** 把当前内存数据持久化到 Repository */
    async persist(): Promise<void> {
      const data: StudyData = {
        version: DATA_VERSION,
        subjects: this.subjects,
        questions: this.questions,
        states: Object.values(this.states),
        records: this.records,
        sessions: this.sessions
      }
      await repository.save(data)
    },

    /** 获取（必要时创建）某题的派生状态 */
    getState(questionId: string): QuestionState {
      let s = this.states[questionId]
      if (!s) {
        s = createState(questionId, Date.now())
        this.states[questionId] = s
      }
      return s
    },

    /**
     * 作答：判定对错、写入记录、更新状态（含简化 SM-2 间隔重复）
     */
    async answer(
      questionId: string,
      userAnswer: string[],
      durationMs: number
    ): Promise<{ correct: boolean; question: Question; record: AnswerRecord } | null> {
      const question = this.questionMap[questionId]
      if (!question) return null

      const correct = sameAnswer(userAnswer, question.answer)
      const now = Date.now()
      const sessionId = this.current?.sessionId ?? 'adhoc'

      const record: AnswerRecord = {
        id: uid('r_'),
        questionId,
        sessionId,
        userAnswer: [...userAnswer],
        correct,
        durationMs,
        createdAt: now
      }
      this.records.push(record)

      const state = this.getState(questionId)
      if (!correct) {
        state.wrongCount += 1
        state.lastWrongAt = now
      }

      // 简化的 SM-2 间隔重复算法
      if (correct) {
        state.reps += 1
        if (state.reps === 1) state.interval = 1
        else if (state.reps === 2) state.interval = 6
        else state.interval = Math.max(1, Math.round((state.interval || 1) * state.ease))
        state.ease = Math.min(3, state.ease + 0.1)
        state.dueAt = now + state.interval * DAY
      } else {
        state.reps = 0
        state.interval = 1
        state.ease = Math.max(1.3, state.ease - 0.2)
        state.dueAt = now + DAY
      }

      await this.persist()
      return { correct, question, record }
    },

    /** 切换收藏 */
    async toggleFavorite(questionId: string): Promise<void> {
      const state = this.getState(questionId)
      state.favorite = !state.favorite
      await this.persist()
    },

    /** 标记（取消）已掌握 */
    async markMastered(questionId: string, mastered = true): Promise<void> {
      const state = this.getState(questionId)
      state.mastered = mastered
      if (mastered) state.dueAt = undefined
      await this.persist()
    },

    /** 开始一次练习 */
    startSession(
      mode: PracticeMode,
      options: { subjectId?: string; chapter?: string; questionIds?: string[] } = {}
    ): PracticeSession {
      let ids: string[] = []
      if (options.questionIds && options.questionIds.length > 0) {
        ids = [...options.questionIds]
      } else if (mode === 'wrong') {
        ids = this.wrongBook.map((q) => q.id)
      } else if (mode === 'favorite') {
        ids = this.favorites.map((q) => q.id)
      } else {
        let pool = this.questions
        if (options.subjectId) pool = pool.filter((q) => q.subjectId === options.subjectId)
        if (mode === 'chapter' && options.chapter) {
          pool = pool.filter((q) => q.chapter === options.chapter)
        }
        ids = pool.map((q) => q.id)
        if (mode === 'random') ids = shuffle(ids)
      }

      const sessionId = uid('s_')
      const session: PracticeSession = {
        id: sessionId,
        mode,
        subjectId: options.subjectId,
        questionIds: ids,
        startedAt: Date.now()
      }
      this.sessions.push(session)
      this.current = {
        mode,
        subjectId: options.subjectId,
        sessionId,
        questionIds: ids,
        index: 0
      }
      return session
    },

    /** 结束当前练习 */
    finishSession(): void {
      if (!this.current) return
      const sessionId = this.current.sessionId
      const session = this.sessions.find((s) => s.id === sessionId)
      if (session) session.finishedAt = Date.now()
      this.current = null
    },

    /** 前进到下一题 */
    advance(): void {
      if (this.current) this.current.index += 1
    }
  }
})
