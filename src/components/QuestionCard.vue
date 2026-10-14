<script setup lang="ts">
import { computed } from 'vue'
import { Tag } from 'vant'
import type { Question } from '@/types'

const props = defineProps<{
  question: Question
  /** 右侧附加信息，例如“错误 3 次” */
  meta?: string
  /** 是否显示难度 */
  showDifficulty?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()

const typeLabel = computed(() => {
  switch (props.question.type) {
    case 'single':
      return '单选'
    case 'multiple':
      return '多选'
    default:
      return '判断'
  }
})

const typeColor = computed(() => {
  switch (props.question.type) {
    case 'single':
      return '#0fdc78'
    case 'multiple':
      return '#ff9f43'
    default:
      return '#3b82f6'
  }
})

const difficultyText = computed(() => '★'.repeat(props.question.difficulty))
</script>

<template>
  <div class="qcard card" @click="$emit('click')">
    <div class="qcard__head">
      <Tag :color="typeColor" text-color="#fff" plain>
        <span :style="{ color: typeColor }">{{ typeLabel }}</span>
      </Tag>
      <span v-if="showDifficulty" class="qcard__difficulty">{{ difficultyText }}</span>
      <span v-if="meta" class="qcard__meta">{{ meta }}</span>
    </div>
    <p class="qcard__stem">{{ question.stem }}</p>
    <div v-if="question.tags.length" class="qcard__tags">
      <span v-for="tag in question.tags" :key="tag" class="qcard__tag">#{{ tag }}</span>
    </div>
    <slot name="actions" />
  </div>
</template>

<style scoped>
.qcard {
  margin-bottom: 12px;
}

.qcard__head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.qcard__difficulty {
  color: #f7b500;
  font-size: 12px;
  letter-spacing: 1px;
}

.qcard__meta {
  margin-left: auto;
  color: #ee4d2d;
  font-size: 12px;
  font-weight: 600;
}

.qcard__stem {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: #1a1a1a;
}

.qcard__tags {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.qcard__tag {
  font-size: 12px;
  color: #969799;
}
</style>
