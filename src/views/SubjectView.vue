<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, Cell, CellGroup, Empty, NavBar } from 'vant'
import { useStudyStore } from '@/stores/study'

const route = useRoute()
const router = useRouter()
const store = useStudyStore()

const subjectId = computed(() => String(route.params.subjectId || ''))
const subject = computed(() => store.subjects.find((s) => s.id === subjectId.value))
const questions = computed(() => store.questions.filter((q) => q.subjectId === subjectId.value))

/** 章节分类：按题库中的出现顺序，统计每章题目数 */
const chapters = computed(() => {
  const order: string[] = []
  const counts: Record<string, number> = {}
  for (const q of questions.value) {
    const name = q.chapter || '未分类'
    if (!(name in counts)) {
      counts[name] = 0
      order.push(name)
    }
    counts[name] += 1
  }
  return order.map((name) => ({ name, count: counts[name] }))
})

function practiceAll() {
  router.push({ name: 'practice', query: { mode: 'order', subjectId: subjectId.value } })
}

function practiceChapter(chapter: string) {
  router.push({
    name: 'practice',
    query: { mode: 'chapter', subjectId: subjectId.value, chapter }
  })
}
</script>

<template>
  <div class="page">
    <NavBar :title="subject ? subject.name : '科目'" left-arrow @click-left="router.back()" />

    <template v-if="subject">
      <Button type="primary" block round icon="play-circle-o" class="all-btn" @click="practiceAll">
        练习本科目全部题目（{{ questions.length }}）
      </Button>

      <h2 class="section-title">章节分类</h2>
      <CellGroup inset>
        <Cell
          v-for="c in chapters"
          :key="c.name"
          :title="c.name"
          :label="`${c.count} 道题`"
          is-link
          @click="practiceChapter(c.name)"
        />
      </CellGroup>
    </template>

    <Empty v-else description="未找到该科目" />
  </div>
</template>

<style scoped>
.all-btn {
  margin-bottom: 16px;
}
</style>
