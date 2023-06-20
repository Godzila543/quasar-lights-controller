<template>
  <q-header elevated>
    <q-toolbar :style="backgroundGradient(db.editedPalette.colors)">
      <!-- <q-toolbar class="bg-black"> -->
      <q-toolbar-title>
        <div class="row">
          <q-input
            class="q-mr-md text-black col-grow"
            v-model="db.editedPalette.name"
            outlined
            label="Palette Name"
            rounded
            dense
            :color="headerColor"
            :label-color="headerColor"
            :input-style="{ color: headerColor }"
            :dark="headerColor == 'white'"
          />
          <q-btn
            class="q-mr-sm"
            icon="save"
            round
            outline
            :disabled="db.editedPalette.colors.length < 2"
            @click="
              if (db.freshPalette) db.createPalette(db.editedPalette);
              else db.updatePalette(db.editedPalette);
            "
            :color="textColor(db.editedPalette.colors, -1)"
          />
          <q-btn
            icon="delete"
            round
            outline
            :disabled="db.editedPalette.colors.length < 2"
            @click="db.deletePalette(db.oldEditedPaletteName)"
            :color="textColor(db.editedPalette.colors, -1)"
          />
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
  <q-page padding>
    <div class="row" v-for="(color, i) in db.editedPalette.colors" :key="i">
      <div class="col">
        <q-color
          v-model="db.editedPalette.colors[i]"
          no-header
          no-footer
          class="q-mb-md"
        />
      </div>

      <div class="col-2 justify-between">
        <div class="row flex-center q-my-sm">
          <q-btn
            outline
            round
            size="sm"
            icon="arrow_upward"
            :style="{ color: color }"
            v-if="i > 0"
            @click="
              db.editedPalette.colors.splice(
                i - 1,
                0,
                db.editedPalette.colors.splice(i, 1)[0]
              )
            "
          />
          <div style="height: 30px" v-else />
        </div>
        <div class="row flex-center q-mb-sm">
          <q-btn
            flat
            icon="delete"
            color="negative"
            @click="db.editedPalette.colors.splice(i, 1)"
          />
        </div>

        <div class="row flex-center">
          <q-btn
            round
            outline
            size="sm"
            icon="arrow_downward"
            :style="{ color: color }"
            v-if="i < db.editedPalette.colors.length - 1"
            @click="
              db.editedPalette.colors.splice(
                i + 1,
                0,
                db.editedPalette.colors.splice(i, 1)[0]
              )
            "
          />
        </div>
      </div>
    </div>
    <div class="row flex-center">
      <q-btn
        fab
        icon="add"
        :style="backgroundGradient(db.editedPalette.colors)"
        @click="db.editedPalette.colors.push('#00aaff')"
      />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useDatabase } from 'src/stores/database-store';
import { backgroundGradient, textColor } from 'src/components/palette';

import { computed } from 'vue';

const headerColor = computed(() => {
  return textColor(db.editedPalette.colors, 0);
});

const db = useDatabase();
</script>

<style scoped lang="scss">
:deep(.q-color-picker__spectrum) {
  height: 90px;
}
</style>
