<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Cell, CellGroup, NavBar, showToast } from 'vant'
import { useAuthStore } from '@/stores/auth'
import { useStudyStore } from '@/stores/study'

const router = useRouter()
const auth = useAuthStore()
const study = useStudyStore()

const current = computed(() => auth.current)
const others = computed(() => auth.accounts.filter((a) => a.id !== auth.current?.id))

function joinedAt(ts: number): string {
  return new Date(ts).toLocaleDateString('zh-CN')
}

/** 切换到另一个账号：先退出，再带着账号名回到登录页 */
async function switchTo(username: string) {
  await auth.logout()
  router.replace({ name: 'login', query: { u: username } })
}

async function logout() {
  await auth.logout()
  showToast('已退出登录')
  router.replace({ name: 'login' })
}
</script>

<template>
  <div class="page page--fullscreen">
    <NavBar title="我的账号" left-arrow @click-left="router.back()" />

    <template v-if="current">
      <div class="card account-card">
        <div class="account-avatar">{{ current.username.slice(0, 1).toUpperCase() }}</div>
        <div class="account-meta">
          <div class="account-name">{{ current.username }}</div>
          <div class="account-date">注册于 {{ joinedAt(current.createdAt) }}</div>
        </div>
      </div>

      <h2 class="section-title">学习概览</h2>
      <div class="stats-grid">
        <div class="stat">
          <div class="stat__value">{{ study.totalQuestions }}</div>
          <div class="stat__label">总题数</div>
        </div>
        <div class="stat">
          <div class="stat__value">{{ study.totalAnswered }}</div>
          <div class="stat__label">累计做题</div>
        </div>
        <div class="stat">
          <div class="stat__value brand">{{ study.accuracy }}%</div>
          <div class="stat__label">正确率</div>
        </div>
        <div class="stat">
          <div class="stat__value">{{ study.streak }}</div>
          <div class="stat__label">连续打卡(天)</div>
        </div>
      </div>

      <template v-if="others.length">
        <h2 class="section-title">切换账号</h2>
        <CellGroup inset>
          <Cell
            v-for="a in others"
            :key="a.id"
            :title="a.username"
            label="点击后重新登录该账号"
            is-link
            @click="switchTo(a.username)"
          />
        </CellGroup>
      </template>

      <div class="logout-wrap">
        <Button block round plain type="danger" @click="logout">退出登录</Button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.account-card {
  display: flex;
  align-items: center;
  gap: 14px;
}

.account-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--brand-color-light);
  color: var(--brand-color-dark);
  font-size: 22px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.account-name {
  font-size: 17px;
  font-weight: 600;
}

.account-date {
  margin-top: 4px;
  font-size: 12px;
  color: #969799;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 6px rgba(100, 101, 102, 0.08);
}

.stat__value {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
}

.stat__label {
  margin-top: 6px;
  font-size: 12px;
  color: #969799;
}

.logout-wrap {
  margin-top: 24px;
}
</style>
