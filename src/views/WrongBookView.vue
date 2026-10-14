<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Empty } from 'vant'
import QuestionCard from '@/components/QuestionCard.vue'
import { useStudyStore } from '@/stores/study'

const router = useRouter()
const store = useStudyStore()

const list = computed(() => store.wrongBook)

function practiceOne(id: string) {
  router.push({ name: 'practice', query: { mode: 'wrong', ids: id } })
}

function retryAll() {
  router.push({ name: 'practice', query: { mode: 'wrong' } })
}
</script>

<template>
  <div class="page">
    <h1 class="page-title">错题本</h1>

    <template v-if="list.length">
      <Button
        type="primary"
        block
        round
        icon="replay"
        class="retry-btn"
        @click="retryAll"
      >
        重刷错题（{{ list.length }}）
      </Button>

      <QuestionCard
        v-for="q in list"
        :key="q.id"
        :question="q"
        :meta="`错误 ${store.states[q.id]?.wrongCount ?? 0} 次`"
        show-difficulty
        @click="practiceOne(q.id)"
      >
        <template #actions>
          <div class="row-actions">
            <Button size="small" plain round type="primary" @click.stop="practiceOne(q.id)">
              重做
            </Button>
            <Button size="small" plain round @click.stop="store.markMastered(q.id)">
              标记已掌握
            </Button>
          </div>
        </template>
      </QuestionCard>
    </template>

    <Empty v-else description="太棒了，暂无错题" />
  </div>
</template>

<style scoped>
.retry-btn {
  margin-bottom: 16px;
}

.row-actions {
  margin-top: 12px;
  display: flex;
  gap: 10px;
}
</style>
