import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
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
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} · StudyHub` : 'StudyHub 学习空间'
})

export default router
