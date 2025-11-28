<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationHeader from './components/NavigationHeader.vue'
</script>

<template>
  <div class="app">
    <NavigationHeader />
    
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  background-color: #fafafa;
}

/* 確保全局樣式重置 */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
</style>
