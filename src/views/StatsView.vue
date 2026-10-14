<script setup lang="ts">
import { computed } from 'vue'
import { Cell, CellGroup } from 'vant'
import { useStudyStore } from '@/stores/study'

const store = useStudyStore()

const heatmap = computed(() => store.dailyCounts)
const recent = computed(() => store.dailyCounts.slice(-7).reverse())

function level(count: number): string {
  if (count <= 0) return 'l0'
  if (count <= 2) return 'l1'
  if (count <= 5) return 'l2'
  if (count <= 9) return 'l3'
  return 'l4'
}
</script>

<template>
  <div class="page">
    <h1 class="page-title">统计</h1>

    <div class="stats-grid">
      <div class="stat">
        <div class="stat__value">{{ store.totalQuestions }}</div>
        <div class="stat__label">总题数</div>
      </div>
      <div class="stat">
        <div class="stat__value">{{ store.totalAnswered }}</div>
        <div class="stat__label">累计做题</div>
      </div>
      <div class="stat">
        <div class="stat__value brand">{{ store.accuracy }}%</div>
        <div class="stat__label">正确率</div>
      </div>
      <div class="stat">
        <div class="stat__value">{{ store.streak }}</div>
        <div class="stat__label">连续打卡(天)</div>
      </div>
    </div>

    <h2 class="section-title">每日做题量（近 12 周）</h2>
    <div class="card heatmap-card">
      <div class="heatmap">
        <div
          v-for="(d, i) in heatmap"
          :key="i"
          class="cell"
          :class="level(d.count)"
          :title="`${d.date}：${d.count} 题`"
        />
      </div>
      <div class="legend">
        <span class="muted">少</span>
        <span class="cell l0" />
        <span class="cell l1" />
        <span class="cell l2" />
        <span class="cell l3" />
        <span class="cell l4" />
        <span class="muted">多</span>
      </div>
    </div>

    <h2 class="section-title">最近 7 天</h2>
    <CellGroup inset>
      <Cell
        v-for="d in recent"
        :key="d.date"
        :title="d.date"
        :value="`${d.count} 题`"
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

.heatmap-card {
  overflow-x: auto;
}

.heatmap {
  display: grid;
  grid-template-rows: repeat(7, 12px);
  grid-auto-flow: column;
  grid-auto-columns: 12px;
  gap: 3px;
  width: max-content;
  min-width: 100%;
}

.cell {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: #ebedf0;
}

/* 品牌绿色系深浅 */
.l0 {
  background: #ebedf0;
}
.l1 {
  background: #9be9c1;
}
.l2 {
  background: #4fd693;
}
.l3 {
  background: #0fdc78;
}
.l4 {
  background: #0a9e57;
}

.legend {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
  justify-content: flex-end;
}
</style>
