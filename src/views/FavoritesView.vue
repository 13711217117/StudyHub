<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Empty } from 'vant'
import QuestionCard from '@/components/QuestionCard.vue'
import { useStudyStore } from '@/stores/study'

const router = useRouter()
const store = useStudyStore()

const list = computed(() => store.favorites)

function practiceOne(id: string) {
  router.push({ name: 'practice', query: { mode: 'favorite', ids: id } })
}

function practiceAll() {
  router.push({ name: 'practice', query: { mode: 'favorite' } })
}
</script>

<template>
  <div class="page">
    <h1 class="page-title">收藏</h1>

    <template v-if="list.length">
      <Button type="primary" block round icon="play-circle-o" class="all-btn" @click="practiceAll">
        刷收藏题（{{ list.length }}）
      </Button>

      <QuestionCard
        v-for="q in list"
        :key="q.id"
        :question="q"
        show-difficulty
        @click="practiceOne(q.id)"
      >
        <template #actions>
          <div class="row-actions">
            <Button size="small" plain round type="primary" @click.stop="practiceOne(q.id)">
              去刷题
            </Button>
            <Button size="small" plain round @click.stop="store.toggleFavorite(q.id)">
              取消收藏
            </Button>
          </div>
        </template>
      </QuestionCard>
    </template>

    <Empty v-else description="还没有收藏的题目" />
  </div>
</template>

<style scoped>
.all-btn {
  margin-bottom: 16px;
}

.row-actions {
  margin-top: 12px;
  display: flex;
  gap: 10px;
}
</style>
