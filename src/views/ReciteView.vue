<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NavBar, Tab, Tabs, Empty } from 'vant'
import { useStudyStore } from '@/stores/study'
import { memorizeGroups } from '@/data/recite'
import type { Question } from '@/types'

const router = useRouter()
const store = useStudyStore()
const active = ref(0)

/** 卡片展开状态：cardId -> 是否展开 */
const open = ref<Record<string, boolean>>({})
function toggle(id: string): void {
  open.value[id] = !open.value[id]
}

/** 题型显示名 */
function typeLabel(q: Question): string {
  return q.type === 'single' ? '单选' : q.type === 'multiple' ? '多选' : '判断'
}

/** 正确答案文本 */
function answerText(q: Question): string {
  if (q.type === 'judge') {
    return q.answer.map((k) => (k === 'T' ? '正确' : '错误')).join('、')
  }
  return q.answer.join('、')
}

/** 把某科目的题库按章节分组，生成「选择题」闪卡 */
function questionChapters(subjectId: string): { chapter: string; list: Question[] }[] {
  const map = new Map<string, Question[]>()
  for (const q of store.questions) {
    if (q.subjectId !== subjectId) continue
    const chapter = q.chapter ?? '未分类'
    const arr = map.get(chapter) ?? []
    arr.push(q)
    map.set(chapter, arr)
  }
  return [...map.entries()].map(([chapter, list]) => ({ chapter, list }))
}
</script>

<template>
  <div class="page page--fullscreen">
    <NavBar title="背题模式" left-arrow @click-left="router.back()" />

    <Tabs v-model:active="active" shrink>
      <Tab v-for="g in memorizeGroups" :key="g.subjectId" :title="g.name">
        <p class="intro">点击卡片即可展开答案，再点一次收起。</p>

        <!-- 记忆资料分类 -->
        <template v-for="c in g.categories" :key="c.key">
          <h2 class="section-title">{{ c.name }}</h2>
          <div
            v-for="card in c.cards"
            :key="card.id"
            class="card flashcard"
            :class="{ 'flashcard--open': open[card.id] }"
            @click="toggle(card.id)"
          >
            <div class="flashcard__front">
              <span class="flashcard__text">{{ card.front }}</span>
              <span class="flashcard__arrow">{{ open[card.id] ? '▲' : '▼' }}</span>
            </div>
            <div v-if="open[card.id]" class="flashcard__back">{{ card.answer }}</div>
          </div>
        </template>

        <!-- 选择题（由题库生成，按章节分组） -->
        <h2 class="section-title">选择题</h2>
        <template v-if="questionChapters(g.subjectId).length">
          <template v-for="ch in questionChapters(g.subjectId)" :key="ch.chapter">
            <h3 class="chapter-title">{{ ch.chapter }}</h3>
            <div
              v-for="q in ch.list"
              :key="q.id"
              class="card flashcard"
              :class="{ 'flashcard--open': open[q.id] }"
              @click="toggle(q.id)"
            >
              <div class="flashcard__front">
                <span class="flashcard__badge">{{ typeLabel(q) }}</span>
                <span class="flashcard__text">{{ q.stem }}</span>
                <span class="flashcard__arrow">{{ open[q.id] ? '▲' : '▼' }}</span>
              </div>
              <div v-if="open[q.id]" class="flashcard__back">
                <ul class="options">
                  <li v-for="o in q.options" :key="o.key">
                    <b>{{ o.key }}.</b> {{ o.text }}
                  </li>
                </ul>
                <p class="answer">正确答案：{{ answerText(q) }}</p>
                <p v-if="q.analysis" class="analysis">解析：{{ q.analysis }}</p>
              </div>
            </div>
          </template>
        </template>
        <Empty v-else description="本科目暂无选择题" />
      </Tab>
    </Tabs>
  </div>
</template>

<style scoped>
.intro {
  margin: 4px 4px 8px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--brand-color-light);
  color: var(--brand-color-dark);
  font-size: 13px;
  line-height: 1.6;
}

.section-title {
  margin: 16px 4px 8px;
}

.chapter-title {
  margin: 12px 4px 6px;
  font-size: 13px;
  font-weight: 600;
  color: #969799;
}

.flashcard {
  margin-bottom: 10px;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
}

.flashcard__front {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
}

.flashcard__badge {
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--brand-color-light);
  color: var(--brand-color-dark);
  font-size: 11px;
  line-height: 1.6;
}

.flashcard__text {
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
  color: #323233;
}

.flashcard__arrow {
  flex-shrink: 0;
  color: #c8c9cc;
  font-size: 11px;
}

.flashcard--open .flashcard__arrow {
  color: var(--brand-color);
}

.flashcard__back {
  padding: 12px 14px;
  border-top: 1px dashed #ece7df;
  background: #fbfaf6;
  font-size: 13px;
  line-height: 1.8;
  color: #4a4a4a;
  white-space: pre-wrap;
}

.options {
  margin: 0 0 8px;
  padding-left: 18px;
}

.options li {
  margin-bottom: 2px;
}

.answer {
  margin: 0;
  font-weight: 600;
  color: var(--brand-color-dark);
}

.analysis {
  margin: 6px 0 0;
  color: #7a7a7a;
  white-space: pre-wrap;
}
</style>
