<template>
  <q-header class="opaque-glass" elevated>
    <q-toolbar>
      <q-toolbar-title class="text-black"> Settings </q-toolbar-title>
    </q-toolbar>
  </q-header>
  <ConfigPage :config-def="settingsUI" :model-object="db.settings" />
</template>

<script lang="ts" setup>
import ConfigPage from 'src/components/ConfigPage.vue';
import { useDatabase } from 'src/stores/database-store';
import { settingsUI } from 'src/ts/settingsUI';
import { watch } from 'vue';

const db = useDatabase();
// load theme from local storage
const theme = localStorage.getItem('theme') as
  | 'Light'
  | 'Dark'
  | 'Active Palette';
db.settings.theme = theme || 'light';
watch(
  () => db.settings.brightness,
  () => {
    db.bt.sendBrightness(db.settings.brightness);
  }
);
watch(
  () => db.settings.theme,
  () => {
    // save to local storage
    localStorage.setItem('theme', db.settings.theme);
  }
);
</script>
