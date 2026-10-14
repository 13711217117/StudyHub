<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, Cell, CellGroup, Field, Form, Tab, Tabs, showToast } from 'vant'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const mode = ref('login')
const username = ref('')
const password = ref('')
const confirm = ref('')
const loading = ref(false)

// 从「切换账号」跳转过来时，自动填入目标账号名
const presetUser = route.query.u
if (typeof presetUser === 'string' && presetUser) {
  username.value = presetUser
  mode.value = 'login'
}

const existing = computed(() => auth.accounts)

function fillAccount(name: string) {
  username.value = name
  password.value = ''
}

async function submit() {
  if (!username.value.trim()) {
    showToast('请输入账号名')
    return
  }
  if (!password.value) {
    showToast('请输入密码')
    return
  }
  if (mode.value === 'register' && password.value !== confirm.value) {
    showToast('两次输入的密码不一致')
    return
  }

  loading.value = true
  const res =
    mode.value === 'login'
      ? await auth.login(username.value, password.value)
      : await auth.register(username.value, password.value)
  loading.value = false

  if (!res.ok) {
    showToast(res.error || '操作失败')
    return
  }
  showToast(mode.value === 'login' ? '登录成功' : '注册成功')
  router.replace({ name: 'home' })
}
</script>

<template>
  <div class="login-page">
    <div class="brand-head">
      <div class="brand-logo">📚</div>
      <h1 class="brand-name">StudyHub</h1>
      <p class="brand-sub">个人学习空间 · 2026 成考</p>
    </div>

    <div class="card login-card">
      <Tabs v-model:active="mode" shrink>
        <Tab title="登录" name="login" />
        <Tab title="注册" name="register" />
      </Tabs>

      <Form class="login-form">
        <Field
          v-model="username"
          label="账号"
          placeholder="请输入账号名"
          :rules="[{ required: true, message: '请输入账号名' }]"
        />
        <Field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
        <Field
          v-if="mode === 'register'"
          v-model="confirm"
          type="password"
          label="确认密码"
          placeholder="请再次输入密码"
        />
      </Form>

      <Button type="primary" block round :loading="loading" class="login-btn" @click="submit">
        {{ mode === 'login' ? '登录' : '注册并登录' }}
      </Button>
    </div>

    <template v-if="mode === 'login' && existing.length">
      <h2 class="section-title">选择已有账号</h2>
      <CellGroup inset>
        <Cell
          v-for="a in existing"
          :key="a.id"
          :title="a.username"
          is-link
          @click="fillAccount(a.username)"
        />
      </CellGroup>
    </template>

    <p class="tip">账号数据保存在本机浏览器中，不同账号的刷题记录与进度相互独立。</p>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  padding: 24px 16px calc(24px + env(safe-area-inset-bottom));
}

.brand-head {
  text-align: center;
  margin: 24px 0 20px;
}

.brand-logo {
  font-size: 44px;
  line-height: 1;
}

.brand-name {
  margin: 8px 0 4px;
  font-size: 24px;
  font-weight: 700;
}

.brand-sub {
  margin: 0;
  font-size: 13px;
  color: #969799;
}

.login-card {
  padding: 8px 0 16px;
}

.login-form {
  margin-top: 8px;
}

.login-btn {
  margin: 16px 16px 0;
  width: auto;
}

.tip {
  margin: 20px 6px 0;
  font-size: 12px;
  line-height: 1.6;
  color: #969799;
  text-align: center;
}
</style>
