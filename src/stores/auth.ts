import { defineStore } from 'pinia'
import type { Account } from '@/types'
import {
  listAccounts,
  login as loginAccount,
  register as registerAccount,
  getCurrentAccountId,
  setCurrentAccountId,
  type AuthResult
} from '@/services/auth'
import { repository, accountStorageKey, STORAGE_KEY } from '@/services/repository'
import { useStudyStore } from '@/stores/study'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accounts: [] as Account[],
    current: null as Account | null,
    ready: false
  }),

  getters: {
    isLoggedIn: (state) => !!state.current
  },

  actions: {
    /**
     * 恢复登录态：读取账号列表 + 上次登录账号。
     * 若存在登录账号，则把数据存储切换到该账号的命名空间。
     */
    async init(): Promise<void> {
      if (this.ready) return
      this.accounts = listAccounts()
      const id = getCurrentAccountId()
      const account = id ? this.accounts.find((a) => a.id === id) : undefined
      this.current = account ?? null
      repository.setKey(account ? accountStorageKey(account.id) : STORAGE_KEY)
      this.ready = true
    },

    /** 登录：校验通过后切换命名空间并加载该账号的学习数据 */
    async login(username: string, password: string): Promise<AuthResult> {
      const res = loginAccount(username, password)
      if (res.ok && res.account) await this.activate(res.account)
      return res
    },

    /** 注册：创建账号后自动登录 */
    async register(username: string, password: string): Promise<AuthResult> {
      const res = registerAccount(username, password)
      if (res.ok && res.account) {
        this.accounts = listAccounts()
        await this.activate(res.account)
      }
      return res
    },

    /** 退出登录：清空学习状态，并把存储切回默认命名空间 */
    async logout(): Promise<void> {
      setCurrentAccountId(null)
      this.current = null
      const study = useStudyStore()
      study.reset()
      repository.setKey(STORAGE_KEY)
    },

    /** 内部：把某账号设为当前账号，并按命名空间重新加载学习数据 */
    async activate(account: Account): Promise<void> {
      setCurrentAccountId(account.id)
      this.current = account
      repository.setKey(accountStorageKey(account.id))
      const study = useStudyStore()
      study.reset()
      await study.init()
    }
  }
})
