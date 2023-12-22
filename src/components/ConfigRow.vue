<template>
  <div
    class="row q-mt-md"
    v-if="
      option.conditionalAttribute === true ||
      model[option.conditionalAttribute] === option.conditionalValue
    "
  >
    <q-intersection
      transition="slide-right"
      style="height: 38px"
      v-if="!(option.element == 'button')"
    >
      <q-card class="ui-card shadow-4 q-mr-md">
        <q-card-section class="text-subtitle2 q-py-sm">
          {{ option.label }}
        </q-card-section>
      </q-card>
    </q-intersection>
    <q-intersection transition="slide-left" class="col-grow">
      <q-card class="ui-card shadow-4 col-grow">
        <q-card-section class="q-py-sm">
          <q-slider
            v-if="option.element == 'slider'"
            dense
            v-model="model[(option as configOption<number, T>).model]"
            :min="(option as configOption<number, T>).config[0]"
            :max="(option as configOption<number, T>).config[1]"
            :step="(option as configOption<number, T>).config[2]"
            color="white"
            label
            label-text-color="black"
          />
          <q-range
            v-if="option.element == 'range-slider'"
            dense
            v-model="model[(option as configOption<Range, T>).model]"
            :min="(option as configOption<number, T>).config[0]"
            :max="(option as configOption<number, T>).config[1]"
            :step="(option as configOption<number, T>).config[2]"
            color="white"
            label
            label-text-color="black"
          />
          <q-slider
            v-if="option.element == 'half-range-slider'"
            dense
            v-model="(model[(option as configOption<Range, T>).model] as Range).min"
            :min="(option as configOption<number, T>).config[0]"
            :max="(option as configOption<number, T>).config[1]"
            :step="(option as configOption<number, T>).config[2]"
            color="white"
            label
            label-text-color="black"
          />
          <q-select
            v-if="option.element == 'select'"
            popup-content-class="top-glass"
            dense
            behavior="menu"
            borderless
            v-model="model[(option as configOption<string, T>).model]"
            :options="(option as configOption<string, T>).config"
            color="white"
            style="margin-top: -10px; margin-bottom: -10px"
          />
          <q-btn
            v-if="option.element == 'button'"
            dense
            flat
            style="margin-top: -10px; margin-bottom: -10px; width: 100%"
            :label="option.label"
            @click="model[(option as configOption<() => void, T>).model]"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-intersection>
  </div>
</template>

<script setup lang="ts" generic="T extends object">
import { computed } from 'vue';
import { configOption, Range } from 'src/ts/configMarkup';

const props = defineProps<{
  option: configOption<string | number | (() => void) | Range, T>;
  configObject: T;
}>();

const model = computed(() => props.configObject);
</script>
<style scoped>
.ui-card {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
