import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    // 登录页：全屏、无需登录、隐藏 Tabbar
    meta: { title: '登录', public: true, hideTabbar: true }
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '学习空间' }
  },
  {
    path: '/practice',
    name: 'practice',
    component: () => import('@/views/PracticeView.vue'),
    // 全屏问答体验：隐藏底部 Tabbar
    meta: { title: '刷题', hideTabbar: true }
  },
  {
    path: '/subject/:subjectId',
    name: 'subject',
    component: () => import('@/views/SubjectView.vue'),
    // 科目详情（章节分类）：子页面，隐藏底部 Tabbar
    meta: { title: '科目分类', hideTabbar: true }
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/AccountView.vue'),
    meta: { title: '我的账号', hideTabbar: true }
  },
  {
    path: '/wrong',
    name: 'wrong',
    component: () => import('@/views/WrongBookView.vue'),
    meta: { title: '错题本' }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('@/views/FavoritesView.vue'),
    meta: { title: '收藏' }
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('@/views/StatsView.vue'),
    meta: { title: '统计' }
  },
  {
    path: '/tips',
    name: 'tips',
    component: () => import('@/views/ExamTipsView.vue'),
    // 考试技巧：子页面，隐藏底部 Tabbar
    meta: { title: '考试技巧', hideTabbar: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

/** 登录守卫：未登录访问受保护页面时跳转到登录页 */
router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (!auth.ready) await auth.init()
  const isPublic = to.meta.public === true
  if (!isPublic && !auth.isLoggedIn) {
    return { name: 'login' }
  }
  if (isPublic && auth.isLoggedIn) {
    return { name: 'home' }
  }
  return true
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} · StudyHub` : 'StudyHub 学习空间'
})

export default router
