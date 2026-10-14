<script setup lang="ts">
import { Tabbar, TabbarItem } from 'vant'
</script>

<template>
  <Tabbar route fixed placeholder safe-area-inset-bottom>
    <TabbarItem replace to="/" icon="wap-home-o" name="home">首页</TabbarItem>
    <TabbarItem replace to="/practice" icon="edit" name="practice">刷题</TabbarItem>
    <TabbarItem replace to="/wrong" icon="warning-o" name="wrong">错题本</TabbarItem>
    <TabbarItem replace to="/favorites" icon="star-o" name="favorites">收藏</TabbarItem>
    <TabbarItem replace to="/stats" icon="bar-chart-o" name="stats">统计</TabbarItem>
  </Tabbar>
</template>

<style scoped>
:deep(.van-tabbar-item--active) {
  color: var(--brand-color-dark);
}
</style>
