<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NavBar, Tab, Tabs } from 'vant'
import { examTips } from '@/data/examTips'

const router = useRouter()
const active = ref(0)
</script>

<template>
  <div class="page page--fullscreen">
    <NavBar title="考试技巧" left-arrow @click-left="router.back()" />

    <Tabs v-model:active="active" shrink>
      <Tab v-for="t in examTips" :key="t.subjectId" :title="t.name">
        <p class="intro">{{ t.intro }}</p>

        <div v-for="b in t.blocks" :key="b.heading" class="card block">
          <h3 class="block__title">{{ b.heading }}</h3>

          <ul v-if="b.type === 'list'" class="tip-list">
            <li v-for="(item, i) in b.items" :key="i">{{ item }}</li>
          </ul>

          <div v-else class="table-wrap">
            <table class="tip-table">
              <thead>
                <tr>
                  <th v-for="c in b.columns" :key="c">{{ c }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, ri) in b.rows" :key="ri">
                  <td v-for="(cell, ci) in row" :key="ci">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Tab>
    </Tabs>
  </div>
</template>

<style scoped>
.intro {
  margin: 4px 4px 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--brand-color-light);
  color: var(--brand-color-dark);
  font-size: 13px;
  line-height: 1.6;
}

.block {
  margin-bottom: 12px;
}

.block__title {
  margin: 0 0 10px;
  padding-left: 10px;
  border-left: 3px solid var(--brand-color);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  color: #323233;
}

.tip-list {
  margin: 0;
  padding-left: 18px;
}

.tip-list li {
  margin-bottom: 4px;
  font-size: 13px;
  line-height: 1.7;
  color: #4a4a4a;
}

.table-wrap {
  overflow-x: auto;
}

.tip-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.tip-table th,
.tip-table td {
  padding: 7px 8px;
  border: 1px solid #ece7df;
  text-align: left;
  white-space: nowrap;
  color: #4a4a4a;
}

.tip-table th {
  background: var(--brand-color-light);
  color: var(--brand-color-dark);
  font-weight: 600;
}
</style>
