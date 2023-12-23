<template>
  <q-header style="background: #00000000">
    <div
      class="text-h5 q-mx-md q-mt-md q-pa-md q-pl-lg opaque-glass row shadow-4"
      style="border-radius: 30px"
    >
      <div>Palettes</div>
      <q-space />
      <span
        class="text-overline text-right"
        :style="{ color: textColor(db.activePalette?.colors, -1) }"
        >{{ db.activePalette?.name }}</span
      >
    </div>
  </q-header>

  <q-page padding class="row">
    <q-card
      style="border-radius: 45px"
      class="raised-light-glass row-grow col-grow q-ma-sm row"
    >
      <q-card
        style="border-radius: 30px"
        class="q-ma-md overflow-hidden col-grow inset-shadow inset-dark-glass"
      >
        <q-scroll-area class="fit q-py-md" bar-style="display: none">
          <div class="row">
            <div
              v-for="p in db.palettes"
              :key="p.name"
              class="col-12 col-lg-3 col-sm-6 col-md-4 q-px-md"
            >
              <palette-card :palette="p" />
            </div>
            <div style="width: 100%; height: 80px" />
          </div>
        </q-scroll-area>
      </q-card>
    </q-card>

    <q-page-sticky position="bottom" :offset="[18, 50]">
      <q-btn
        size="25px"
        round
        class="shadow-10 opaque-glass"
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
