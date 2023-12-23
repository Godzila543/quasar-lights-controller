<template>
  <q-page padding class="row">
    <q-card
      class="q-ma-sm overflow-hidden col-grow raised-light-glass"
      style="border-radius: 45px"
    >
      <q-scroll-area class="fit q-px-md">
        <div>
          <q-card
            v-for="(category, i) in configDef"
            :key="i"
            style="background-color: rgb(0, 0, 0, 0.2); border-radius: 30px"
            class="q-pa-md inset-shadow q-my-md"
          >
            <!-- <q-intersection transition="slide-right" style="height: 38px"> -->
            <div
              class="text-h6 shadow-2 q-pl-md"
              style="background-color: rgb(0, 0, 0, 0.16); border-radius: 20px"
            >
              {{ category.label }}
            </div>
            <!-- </q-intersection> -->
            <div v-for="(option, j) in category.options" :key="j">
              <ConfigRow :option="option" :config-object="model" />
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup generic="T extends object">
import { computed } from 'vue';

import { config } from 'src/ts/configMarkup';
import ConfigRow from './ConfigRow.vue';

const props = defineProps<{
  configDef: config<T>;
  modelObject: T;
}>();

const model = computed(() => props.modelObject);
</script>
