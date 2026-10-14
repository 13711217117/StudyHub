/**
 * 存储抽象层（Repository）
 * ------------------------------------------------------------------
 * 业务层（Pinia store / 组件）只依赖下面的 `Repository` 接口，不关心底层
 * 究竟把数据存在哪里。
 *
 * 目前默认使用 `LocalRepository`，把整份数据序列化进 localStorage，
 * 适合纯前端 / 静态托管 / 手机访问等无后端场景。
 *
 * 将来接入 Supabase / CloudBase 等云端存储时，只需：
 *   1. 新增一个实现 `Repository` 接口的类（例如 SupabaseRepository），
 *      在其 load()/save() 内部调用云端 SDK 或 REST 接口；
 *   2. 把文件末尾导出的默认实例 `repository` 替换为该实现即可。
 *   业务层代码（store、页面）无需任何改动。
 */
import type { StudyData } from '@/types'

export interface Repository {
  /** 读取整份数据；本地为空时返回 null */
  load(): Promise<StudyData | null>
  /** 覆盖写入整份数据 */
  save(data: StudyData): Promise<void>
  /** 清空已存储的数据 */
  clear(): Promise<void>
}

/** localStorage 的存储键，带版本号便于日后迁移 */
export const STORAGE_KEY = 'studyhub:v1'

export class LocalRepository implements Repository {
  private readonly key: string

  constructor(key: string = STORAGE_KEY) {
    this.key = key
  }

  async load(): Promise<StudyData | null> {
    const raw = localStorage.getItem(this.key)
    if (!raw) return null
    try {
      return JSON.parse(raw) as StudyData
    } catch {
      return null
    }
  }

  async save(data: StudyData): Promise<void> {
    localStorage.setItem(this.key, JSON.stringify(data))
  }

  async clear(): Promise<void> {
    localStorage.removeItem(this.key)
  }
}

/** 默认存储实现；接入云端时替换为对应实现即可 */
export const repository: Repository = new LocalRepository()
