<template>
  <q-header class="opaque-glass" elevated>
    <q-toolbar class="q-px-none">
      <!-- <q-toolbar class="bg-black"> -->
      <q-toolbar-title>
        <div class="row full-height">
          <q-input
            class="q-ml-md q-pl-md q-mr-md text-black col-grow q-my-sm button-glass shadow-3"
            style="border-radius: 30px"
            v-model="db.editedGenerator.name"
            label="Generator Name"
            borderless
            color="black"
            :dark="false"
          />
          <q-btn
            class="q-mr-sm q-my-sm button-glass"
            :class="db.editedGenerator.name.length < 1 ? '' : 'shadow-3'"
            icon="save"
            round
            flat
            size="lg"
            :disabled="db.editedGenerator.name.length < 1"
            color="black"
            @click="saveButton"
            style="transition: 0.25s ease-in-out"
          />
          <q-btn
            class="q-mr-md q-my-sm button-glass shadow-3"
            icon="delete"
            round
            flat
            size="lg"
            color="black"
            @click="db.deleteGenerator(db.editedGenerator.name)"
          />
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
  <ConfigPage :config-def="uiDefinition" :model-object="db.editedGenerator" />
</template>

<script lang="ts" setup>
import { useDatabase } from 'src/stores/database-store';
import { computed } from 'vue';

import { particleUI, gradientUI } from 'src/ts/generator';

import ConfigPage from 'src/components/ConfigPage.vue';

const uiDefinition = computed(() => {
  return db.editedGenerator.type === 'particle' ? particleUI : gradientUI;
});

const db = useDatabase();
function saveButton() {
  if (db.freshGenerator) {
    db.createGenerator(db.editedGenerator);
  } else {
    db.updateGenerator(db.editedGenerator);
  }
}
</script>

<style scoped lang="scss"></style>
