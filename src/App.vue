<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useDatabase } from './stores/database-store';

const db = useDatabase();

onMounted(() => {
  console.log('App mounted!');
  db.fetchDB();
});
</script>
