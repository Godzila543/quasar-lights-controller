<template>
  <q-layout view="hHh lpr fFf" :style="pageStyle">
    <q-footer style="background-color: #00000000" class="row justify-center">
      <div
        class="q-mb-md q-pa-sm q-px-md opaque-glass row shadow-4 justify-center"
        style="border-radius: 45px"
      >
        <q-tabs
          shrink
          active-class="inset-dark-glass active-tab inset-shadow"
          indicator-color="transparent"
        >
          <q-route-tab
            :ripple="true"
            :style="{ color: textColor(undefined, 0) }"
            style="transition: 0.25s ease-out; border-radius: 30px"
            v-for="t in tabs"
            :key="t.name"
            :to="'/' + t.name"
            :icon="t.icon"
          />
        </q-tabs>
      </div>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog v-model="db.bt.dialog">
      <q-card class="opaque-glass">
        <q-card-section class="text-h6"
          >Connect to the LED Device</q-card-section
        >
        <q-card-section>
          <div class="row">
            <q-btn
              @click="db.bt.dialog = false"
              dense
              flat
              class="text-negative"
              >Ignore</q-btn
            >
            <q-space />
            <q-btn
              class="opaque-glass text-black"
              @click="db.bt.initBluetooth()"
              >Connect Device</q-btn
            >
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDatabase } from 'src/stores/database-store';
import { backgroundGradient } from 'src/ts/palette';
import { textColor } from 'src/ts/palette';

const db = useDatabase();

const theme = localStorage.getItem('theme') as
  | 'Light'
  | 'Dark'
  | 'Active Palette';
db.settings.theme = theme || 'light';

const tabs = [
  { name: 'palettes', icon: 'palette' },
  { name: 'generators', icon: 'api' },
  { name: 'settings', icon: 'settings' },
];

const pageStyle = computed(() => {
  if (db.settings.theme == 'Dark') {
    return backgroundGradient(['#011827', '#412837']);
  } else if (db.settings.theme == 'Light' || !db.activePalette) {
    return backgroundGradient(['#00FFFF', '#88FF88', '#FFFF00']);
  } else {
    return backgroundGradient(db.activePaletteColors);
  }
});
</script>

<style lang="scss" scoped>
.active-tab {
  color: #000000;
}
</style>
