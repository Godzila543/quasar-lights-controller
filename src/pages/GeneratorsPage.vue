<template>
  <q-header style="background: #00000000">
    <div
      class="text-h5 q-mx-lg q-mt-md q-pa-md q-pl-lg opaque-glass row shadow-4"
      style="border-radius: 45px"
      :style="{ color: textColor(undefined, -1) }"
    >
      <div>Generators</div>
      <q-space />
      <span class="text-h6 text-right">{{ db.activeGenerator?.name }}</span>
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
              v-for="p in db.generators"
              :key="p.name"
              class="col-12 col-lg-3 col-sm-6 col-md-4 q-px-md"
            >
              <generator-card :generator="p" />
            </div>
            <div style="width: 100%; height: 80px" />
          </div>
        </q-scroll-area>
      </q-card>
    </q-card>

    <q-page-sticky position="bottom" :offset="[18, 50]">
      <q-fab class="opaque-glass" icon="add" direction="up">
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
import { textColor } from 'src/ts/palette';
import { QSpace } from 'quasar';

const db = useDatabase();
</script>
<style lang="scss" scoped></style>
