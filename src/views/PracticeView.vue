<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Empty,
  NavBar,
  Progress,
  Radio,
  RadioGroup
} from 'vant'
import type { PracticeMode, Question } from '@/types'
import { useStudyStore } from '@/stores/study'

const route = useRoute()
const router = useRouter()
const store = useStudyStore()

const singleVal = ref<string>('')
const multiVal = ref<string[]>([])
const submitted = ref(false)
const result = ref<{ correct: boolean } | null>(null)
const startedAt = ref<number>(Date.now())

const mode = computed<PracticeMode>(() => (route.query.mode as PracticeMode) || 'order')
const isMulti = computed(() => store.currentQuestion?.type === 'multiple')
const session = computed(() => store.current)
const total = computed(() => session.value?.questionIds.length ?? 0)
const index = computed(() => session.value?.index ?? 0)
const current = computed<Question | null>(() => store.currentQuestion)
const progress = computed(() => (total.value ? ((index.value + (submitted.value ? 1 : 0)) / total.value) * 100 : 0))
const isLast = computed(() => index.value >= total.value - 1)

/** 题型标识，避免用户不清楚该单选还是多选 */
const typeLabel = computed(() => {
  switch (current.value?.type) {
    case 'single':
      return '单选题'
    case 'multiple':
      return '多选题 · 可多选'
    default:
      return '判断题'
  }
})

function resetLocal() {
  singleVal.value = ''
  multiVal.value = []
  submitted.value = false
  result.value = null
  startedAt.value = Date.now()
}

function buildSession() {
  const idsParam = route.query.ids
  const questionIds = typeof idsParam === 'string' && idsParam ? idsParam.split(',') : undefined
  const subjectId = typeof route.query.subjectId === 'string' ? route.query.subjectId : undefined
  const chapter = typeof route.query.chapter === 'string' ? route.query.chapter : undefined
  store.startSession(mode.value, { subjectId, chapter, questionIds })
  resetLocal()
}

onMounted(buildSession)

watch(current, resetLocal)

/** 选项是否为正确答案（提交后高亮） */
function isCorrectOption(key: string): boolean {
  return !!current.value?.answer.includes(key)
}

/** 选项是否被用户选中 */
function isChosen(key: string): boolean {
  return isMulti.value ? multiVal.value.includes(key) : singleVal.value === key
}

function optionClass(key: string) {
  if (!submitted.value) return ''
  const chosen = isChosen(key)
  const correct = isCorrectOption(key)
  if (correct) return 'opt--correct'
  if (chosen && !correct) return 'opt--wrong'
  return ''
}

const canSubmit = computed(() => (isMulti.value ? multiVal.value.length > 0 : singleVal.value !== ''))

async function submit() {
  if (!canSubmit.value || !current.value) return
  const userAnswer = isMulti.value ? [...multiVal.value] : [singleVal.value]
  const res = await store.answer(current.value.id, userAnswer, Date.now() - startedAt.value)
  if (res) {
    result.value = { correct: res.correct }
    submitted.value = true
  }
}

function goBack() {
  if (router.options.history.state.back) {
    router.back()
    return
  }
  router.replace({ name: 'home' })
}

function next() {
  if (isLast.value) {
    store.finishSession()
    router.replace({ name: 'home' })
    return
  }
  store.advance()
}
</script>

<template>
  <div class="page page--fullscreen practice">
    <NavBar :title="`第 ${index + 1}/${total} 题`" left-arrow @click-left="goBack" />
    <Progress :percentage="progress" :show-pivot="false" color="#2f855a" />

    <template v-if="current">
      <div class="qbody">
        <div class="qtype" :class="`qtype--${current.type}`">{{ typeLabel }}</div>
        <p class="qstem">{{ current.stem }}</p>

        <RadioGroup v-if="!isMulti" v-model="singleVal" :disabled="submitted" class="opts">
          <Radio
            v-for="opt in current.options"
            :key="opt.key"
            :name="opt.key"
            :class="optionClass(opt.key)"
          >
            <span class="opt__key">{{ opt.key }}.</span>{{ opt.text }}
          </Radio>
        </RadioGroup>

        <CheckboxGroup v-else v-model="multiVal" :disabled="submitted" class="opts">
          <Checkbox
            v-for="opt in current.options"
            :key="opt.key"
            :name="opt.key"
            :class="optionClass(opt.key)"
          >
            <span class="opt__key">{{ opt.key }}.</span>{{ opt.text }}
          </Checkbox>
        </CheckboxGroup>
      </div>

      <div v-if="submitted" class="feedback" :class="result?.correct ? 'feedback--ok' : 'feedback--bad'">
        <div class="feedback__title">
          {{ result?.correct ? '回答正确' : '回答错误' }}
        </div>
        <div class="feedback__answer">
          正确答案：<b>{{ current.answer.join('、') }}</b>
        </div>
        <div v-if="current.analysis" class="feedback__analysis">
          <span class="feedback__label">解析：</span>{{ current.analysis }}
        </div>
      </div>

      <div class="footer">
        <Button v-if="!submitted" type="primary" block round :disabled="!canSubmit" @click="submit">
          提交
        </Button>
        <Button v-else type="primary" block round @click="next">
          {{ isLast ? '完成' : '下一题' }}
        </Button>
        <Button
          v-if="!submitted"
          plain
          block
          round
          class="fav-btn"
          :icon="store.states[current.id]?.favorite ? 'star' : 'star-o'"
          @click="store.toggleFavorite(current.id)"
        >
          {{ store.states[current.id]?.favorite ? '已收藏' : '收藏' }}
        </Button>
      </div>
    </template>

    <Empty v-else description="没有可练习的题目" />
  </div>
</template>

<style scoped>
.practice {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 0;
}

.qbody {
  flex: 1;
  margin-top: 16px;
}

.qtype {
  display: inline-block;
  margin-bottom: 10px;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.6;
  color: var(--brand-color-dark);
  background: var(--brand-color-light);
}

.qtype--multiple {
  color: #9a6b2f;
  background: #fbf3e3;
}

.qtype--judge {
  color: #4f7099;
  background: #eef3f9;
}

.qstem {
  font-size: 17px;
  line-height: 1.6;
  font-weight: 600;
  margin: 0 0 16px;
}

.opts {
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
}

.opts :deep(.van-radio),
.opts :deep(.van-checkbox) {
  padding: 14px;
}

.opt__key {
  font-weight: 600;
  margin-right: 4px;
}

.opts :deep(.van-radio--disabled .van-radio__label),
.opts :deep(.van-checkbox--disabled .van-checkbox__label) {
  color: #323233;
}

.opts :deep(.opt--correct) {
  background: var(--brand-color-light);
}

.opts :deep(.opt--correct .van-radio__label),
.opts :deep(.opt--correct .van-checkbox__label) {
  color: var(--brand-color-dark);
  font-weight: 600;
}

.opts :deep(.opt--wrong) {
  background: var(--danger-bg);
}

.opts :deep(.opt--wrong .van-radio__label),
.opts :deep(.opt--wrong .van-checkbox__label) {
  color: var(--danger-color);
}

.feedback {
  margin-top: 16px;
  border-radius: 12px;
  padding: 14px;
  background: var(--card-bg);
}

.feedback--ok {
  border-left: 4px solid var(--brand-color);
}

.feedback--bad {
  border-left: 4px solid var(--danger-color);
}

.feedback__title {
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 8px;
}

.feedback--ok .feedback__title {
  color: var(--brand-color-dark);
}

.feedback--bad .feedback__title {
  color: var(--danger-color);
}

.feedback__answer {
  font-size: 14px;
  margin-bottom: 8px;
}

.feedback__analysis {
  font-size: 13px;
  color: #646566;
  line-height: 1.6;
}

.feedback__label {
  color: #323233;
  font-weight: 600;
}

.footer {
  margin-top: 20px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fav-btn {
  color: var(--brand-color-dark);
  border-color: var(--brand-color);
}
</style>
