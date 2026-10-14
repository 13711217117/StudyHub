/**
 * 本地账号系统
 * ------------------------------------------------------------------
 * 纯前端多账号实现：账号注册表 + 当前登录态，全部存放在 localStorage。
 * 每个账号拥有独立的数据命名空间（见 repository.accountStorageKey），
 * 因此不同账号的刷题记录 / 进度互不影响。
 *
 * 说明：口令仅做本地简单散列校验，不是安全加密；接入云端账号体系时，
 * 只需把本文件的 register / login / logout 换成后端调用，对外语义保持一致。
 */
import type { Account } from '@/types'

const ACCOUNTS_KEY = 'studyhub:accounts'
const CURRENT_KEY = 'studyhub:currentAccount'

function uid(): string {
  return `acc_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

/** 简单散列（djb2），仅用于本地口令校验 */
function hashPassword(password: string): string {
  let h = 5381
  for (let i = 0; i < password.length; i++) {
    h = ((h << 5) + h + password.charCodeAt(i)) | 0
  }
  return `h${(h >>> 0).toString(36)}`
}

/** 读取全部已注册账号 */
export function listAccounts(): Account[] {
  const raw = localStorage.getItem(ACCOUNTS_KEY)
  if (!raw) return []
  try {
    const list = JSON.parse(raw)
    return Array.isArray(list) ? (list as Account[]) : []
  } catch {
    return []
  }
}

function saveAccounts(list: Account[]): void {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(list))
}

/** 当前登录账号 id；未登录返回 null */
export function getCurrentAccountId(): string | null {
  return localStorage.getItem(CURRENT_KEY)
}

/** 写入 / 清除当前登录账号 id */
export function setCurrentAccountId(id: string | null): void {
  if (id) localStorage.setItem(CURRENT_KEY, id)
  else localStorage.removeItem(CURRENT_KEY)
}

export interface AuthResult {
  ok: boolean
  account?: Account
  error?: string
}

/** 注册新账号 */
export function register(username: string, password: string): AuthResult {
  const name = username.trim()
  if (name.length < 2) return { ok: false, error: '账号名至少 2 个字符' }
  if (password.length < 4) return { ok: false, error: '密码至少 4 位' }
  const accounts = listAccounts()
  if (accounts.some((a) => a.username === name)) {
    return { ok: false, error: '该账号名已被注册' }
  }
  const account: Account = {
    id: uid(),
    username: name,
    passwordHash: hashPassword(password),
    createdAt: Date.now()
  }
  accounts.push(account)
  saveAccounts(accounts)
  return { ok: true, account }
}

/** 登录已有账号 */
export function login(username: string, password: string): AuthResult {
  const name = username.trim()
  const account = listAccounts().find((a) => a.username === name)
  if (!account) return { ok: false, error: '账号不存在' }
  if (account.passwordHash !== hashPassword(password)) {
    return { ok: false, error: '密码错误' }
  }
  return { ok: true, account }
}
