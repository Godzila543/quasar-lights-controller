<template>
  <q-page padding class="row justify-center">
    <div class="column col-grow" style="max-width: 900px">
      <div class="col-12" style="border-radius: 45px; height: min-content">
        <div class="row full-height">
          <q-input
            class="q-ml-sm q-pl-md q-mr-md text-black col-grow q-my-sm opaque-glass shadow-3"
            style="border-radius: 30px"
            v-model="db.editedGenerator.name"
            label="Generator Name"
            borderless
            color="black"
            :dark="false"
          />
          <q-btn
            class="q-mr-sm q-my-sm opaque-glass"
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
            class="q-mr-sm q-my-sm opaque-glass shadow-3"
            icon="delete"
            round
            flat
            size="lg"
            color="black"
            @click="db.deleteGenerator(db.editedGenerator.name)"
          />
        </div>
      </div>
      <ConfigPage
        :config-def="uiDefinition"
        :model-object="db.editedGenerator"
      />
    </div>
  </q-page>
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
