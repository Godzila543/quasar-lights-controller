<template>
  <q-header elevated class="opaque-glass">
    <q-toolbar>
      <q-toolbar-title class="text-black">Palettes</q-toolbar-title>
      <q-space />
      <q-toolbar-title
        class="text-overline text-right"
        :style="{ color: textColor(db.activePalette?.colors, -1) }"
        >{{ db.activePalette?.name }}</q-toolbar-title
      >
    </q-toolbar>
  </q-header>
  <q-page padding class="row">
    <q-card class="raised-light-glass row-grow col-grow q-ma-sm row">
      <q-card
        class="q-ma-md overflow-hidden col-grow inset-shadow inset-dark-glass"
      >
        <q-scroll-area class="fit q-py-md" bar-style="display: none">
          <palette-card
            v-for="p in db.palettes"
            :key="p.name"
            :palette="p"
            class="q-mx-md"
          />
          <div style="width: 100%; height: 80px" />
        </q-scroll-area>
      </q-card>
    </q-card>

    <q-page-sticky position="bottom" :offset="[18, 40]">
      <q-btn
        :style="[
          {
            background: db.activePalette?.colors[0],
            color: textColor(db.activePalette?.colors, 0),
          },
        ]"
        size="25px"
        round
        class="shadow-10"
        icon="add"
        @click="db.newPalette"
      />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts" setup>
import PaletteCard from 'src/components/PaletteCard.vue';
import { useDatabase } from 'src/stores/database-store';
import { backgroundGradient, textColor } from 'src/ts/palette';
import { QSpace } from 'quasar';

const db = useDatabase();
</script>
<style lang="scss" scoped></style>
