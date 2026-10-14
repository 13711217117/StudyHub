<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppTabbar from '@/components/AppTabbar.vue'

const route = useRoute()
const hideTabbar = computed(() => route.meta.hideTabbar === true)
</script>

<template>
  <div class="app-shell">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <AppTabbar v-if="!hideTabbar" />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
}
</style>
