<template>
  <q-header elevated class="opaque-glass">
    <q-toolbar>
      <q-toolbar-title class="text-black">Generators</q-toolbar-title>
      <q-space />
      <q-toolbar-title
        class="text-overline text-right"
        :style="{ color: textColor(db.activePalette?.colors, -1) }"
        >{{ db.activeGenerator?.name }}</q-toolbar-title
      >
    </q-toolbar>
  </q-header>
  <q-page padding class="row">
    <q-card class="raised-light-glass row-grow col-grow q-ma-sm row">
      <q-card
        class="q-ma-md overflow-hidden col-grow inset-shadow inset-dark-glass"
      >
        <q-scroll-area class="fit q-py-md" bar-style="display: none">
          <generator-card
            v-for="p in db.generators"
            :key="p.name"
            :generator="p"
          />
        </q-scroll-area>
      </q-card>
    </q-card>

    <q-page-sticky position="bottom" :offset="[18, 44]">
      <q-fab
        class="our-fab"
        :style="[
          {
            background: db.activePalette?.colors[0],
            color: textColor(db.activePalette?.colors, 0),
          },
        ]"
        icon="add"
        direction="up"
      >
        <q-fab-action
          icon="gradient"
          label="Gradient"
          @click="db.newGradient"
        />
        <q-fab-action
          icon="filter_drama"
          label="Particle"
          @click="db.newParticle"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts" setup>
import GeneratorCard from 'src/components/GeneratorCard.vue';
import { useDatabase } from 'src/stores/database-store';
import { backgroundGradient, textColor } from 'src/ts/palette';
import { QSpace } from 'quasar';

const db = useDatabase();
</script>
<style lang="scss" scoped></style>
