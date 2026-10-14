# StudyHub 学习空间

一个移动端优先的个人学习空间 Web 应用：刷题、错题本、收藏、间隔重复复习与学习统计。

## 技术栈

- **Vite 5 + Vue 3 + TypeScript**（`<script setup>` 组合式 API）
- **Vant 4**（移动端 UI 组件库，按需引入 JS + 全量样式）
- **Vue Router 4**（`createWebHashHistory`，便于静态托管与手机访问）
- **Pinia**（状态管理）
- **vite-plugin-pwa**（注册 PWA，支持「添加到主屏幕」）

数据目前落在 `localStorage`，通过 `src/services/repository.ts` 中的 `Repository`
接口做了存储抽象，未来可直接替换为 Supabase / CloudBase 实现，业务层无需改动。

## 运行

```bash
npm install          # 安装依赖
npm run dev          # 本地启动开发服务（默认 http://localhost:5173，已开启 host）
npm run typecheck    # 类型检查（vue-tsc --noEmit）
npm run build        # 类型检查 + 生产构建，产物在 dist/
npm run preview      # 预览生产构建
```

## 目录结构

```
src/
├── main.ts                      # 应用入口：注册 Pinia / Router，初始化数据后挂载
├── App.vue                      # 根组件 + 底部 Tabbar
├── env.d.ts                     # *.vue 模块与 vite/client 类型声明
├── router/index.ts              # 路由（hash 模式）
├── types/index.ts               # 数据模型（Subject / Question / AnswerRecord ...）
├── services/repository.ts       # 存储抽象层 + LocalRepository 实现
├── data/seed.ts                 # 示例题库种子数据（2 科目 / 12 题）
├── stores/study.ts              # Pinia store：核心业务逻辑 + 统计 + SM-2 复习算法
├── styles/main.css              # 全局样式（绿色主色 #0FDC78）
├── components/
│   ├── AppTabbar.vue            # 底部导航
│   └── QuestionCard.vue         # 题目卡片
└── views/
    ├── HomeView.vue             # 首页：关键数字 + 主入口 + 今日待复习
    ├── PracticeView.vue         # 刷题（支持 ?mode=wrong / ?mode=favorite 等）
    ├── WrongBookView.vue        # 错题本
    ├── FavoritesView.vue        # 收藏
    └── StatsView.vue            # 统计 + 每日做题量热力图
```

## 页面路由

| 页面 | 路由 | 说明 |
| --- | --- | --- |
| 首页 | `/#/` | 今日待复习 / 总题数 / 正确率 / 连续打卡 |
| 刷题 | `/#/practice` | query 支持 `mode=order|random|wrong|favorite|chapter`、`ids`、`subjectId` |
| 错题本 | `/#/wrong` | 错题列表，可标记已掌握 / 重刷 |
| 收藏 | `/#/favorites` | 收藏列表，可取消收藏 / 刷题 |
| 统计 | `/#/stats` | 做题量热力图与最近 7 天 |
