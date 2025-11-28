<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationHeader from './components/NavigationHeader.vue'
</script>

<template>
  <v-app>
    <NavigationHeader />
    
    <v-main>
      <v-container fluid class="pa-0">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
