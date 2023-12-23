<template>
  <q-page padding class="row justify-center">
    <div class="column col-grow" style="max-width: 900px">
      <q-card
        class="q-ma-sm opaque-glass col-12"
        style="border-radius: 45px; height: min-content"
      >
        <div class="text-h5 q-pa-md q-pl-lg" style="border-radius: 30px">
          Settings
        </div>
      </q-card>
      <ConfigPage :config-def="settingsUI" :model-object="db.settings" />
    </div>
  </q-page>
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
