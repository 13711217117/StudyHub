<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Cell, CellGroup, Empty } from 'vant'
import QuestionCard from '@/components/QuestionCard.vue'
import { useStudyStore } from '@/stores/study'

const router = useRouter()
const store = useStudyStore()

const dueList = computed(() => store.dueQuestions.slice(0, 5))

function goPractice(mode: 'order' | 'wrong') {
  router.push({ name: 'practice', query: { mode } })
}

function goQuestion(id: string) {
  router.push({ name: 'practice', query: { mode: 'order', ids: id } })
}
</script>

<template>
  <div class="page">
    <h1 class="page-title">学习空间</h1>

    <div class="stats-grid">
      <div class="stat">
        <div class="stat__value brand">{{ store.dueQuestions.length }}</div>
        <div class="stat__label">今日待复习</div>
      </div>
      <div class="stat">
        <div class="stat__value">{{ store.totalQuestions }}</div>
        <div class="stat__label">总题数</div>
      </div>
      <div class="stat">
        <div class="stat__value">{{ store.accuracy }}%</div>
        <div class="stat__label">正确率</div>
      </div>
      <div class="stat">
        <div class="stat__value">{{ store.streak }}</div>
        <div class="stat__label">连续打卡(天)</div>
      </div>
    </div>

    <div class="entries">
      <Button type="primary" block round icon="play-circle-o" @click="goPractice('order')">
        开始刷题
      </Button>
      <Button plain block round icon="warning-o" class="entries__secondary" @click="goPractice('wrong')">
        复习错题
      </Button>
    </div>

    <h2 class="section-title">今日待复习</h2>
    <template v-if="dueList.length">
      <QuestionCard
        v-for="q in dueList"
        :key="q.id"
        :question="q"
        :meta="store.states[q.id]?.wrongCount ? `错误 ${store.states[q.id].wrongCount} 次` : undefined"
        @click="goQuestion(q.id)"
      />
    </template>
    <Empty v-else description="暂无待复习题目，去刷题吧" />

    <h2 class="section-title">科目</h2>
    <CellGroup inset>
      <Cell
        v-for="s in store.subjects"
        :key="s.id"
        :title="s.name"
        :label="`${store.questions.filter((q) => q.subjectId === s.id).length} 道题`"
        is-link
        @click="router.push({ name: 'subject', params: { subjectId: s.id } })"
      />
    </CellGroup>
  </div>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat {
  background: #fff;
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

.entries {
  margin: 16px 0 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.entries__secondary {
  color: var(--brand-color-dark);
  border-color: var(--brand-color);
}
</style>
