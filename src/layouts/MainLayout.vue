<template>
  <q-layout view="hHh lpr fFf" :style="pageStyle">
    <q-footer class="opaque-glass" elevated>
      <q-toolbar>
        <q-space />
        <q-tabs shrink class="text-black">
          <q-route-tab
            v-for="t in tabs"
            :key="t.name"
            :to="'/' + t.name"
            :icon="t.icon"
          />
        </q-tabs>
        <q-space />
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDatabase } from 'src/stores/database-store';
import { backgroundGradient } from 'src/components/palette';
const db = useDatabase();

const tabs = [
  { name: 'palettes', icon: 'palette' },
  { name: 'generators', icon: 'api' },
  { name: 'settings', icon: 'settings' },
];

const pageStyle = computed(() => {
  if (db.settings.theme == 'Dark') {
    return backgroundGradient(['#011827', '#412837']);
  } else if (db.settings.theme == 'Light' || !db.activePalette) {
    return backgroundGradient(['#aaccff', '#ffaacc']);
  } else {
    return backgroundGradient(db.activePaletteColors);
  }
});
</script>
