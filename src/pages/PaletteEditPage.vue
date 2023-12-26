<template>
  <q-page padding class="row justify-center">
    <div class="column col-grow" style="max-width: 900px">
      <div class="col-12" style="border-radius: 45px; height: min-content">
        <div class="row full-height">
          <q-input
            class="q-ml-sm q-pl-md q-mr-md text-black col-grow q-my-sm opaque-glass shadow-3"
            :style="{ color: textColor(db.activePalette?.colors, -1) }"
            style="border-radius: 30px"
            v-model="db.editedPalette.name"
            label="Palette Name"
            borderless
            :dark="false"
          />
          <q-btn
            class="q-mr-sm q-my-sm opaque-glass"
            :class="db.editedPalette.colors.length < 2 ? '' : 'shadow-3'"
            icon="save"
            round
            flat
            size="lg"
            :disabled="db.editedPalette.colors.length < 2"
            color="black"
            @click="
              if (db.freshPalette) db.createPalette(db.editedPalette);
              else db.updatePalette(db.editedPalette);
            "
            style="transition: 0.25s ease-in-out"
          />
          <q-btn
            class="q-mr-sm q-my-sm opaque-glass shadow-3"
            icon="delete"
            round
            flat
            size="lg"
            color="black"
            @click="db.deletePalette(db.oldEditedPaletteName)"
          />
        </div>
      </div>
      <q-card
        class="opaque-glass row-grow col-grow q-ma-sm row"
        style="border-radius: 45px"
      >
        <q-card
          class="q-ma-md overflow-hidden col-grow inset-shadow inset-dark-glass"
          style="background: #00000080; border-radius: 30px"
        >
          <q-scroll-area class="fit" bar-style="display: none">
            <q-card
              class="row q-ma-md q-pa-sm shadow-3 opaque-glass"
              v-for="(color, i) in db.editedPalette.colors"
              :key="i"
              :style="{ background: color, borderRadius: '40px' }"
            >
              <q-btn
                icon="colorize"
                class="opaque-glass shadow-3"
                round
                flat
                size="md"
                color="black"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color
                    v-model="db.editedPalette.colors[i]"
                    no-header
                    style="width: 300px; border-radius: 30px"
                  />
                </q-popup-proxy>
              </q-btn>
              <q-space />
              <q-btn
                class="opaque-glass shadow-3"
                round
                flat
                size="md"
                color="black"
                icon="delete"
                @click="db.editedPalette.colors.splice(i, 1)"
              />
            </q-card>
            <div class="row flex-center">
              <q-btn
                size="25px"
                round
                class="shadow-10 opaque-glass"
                icon="add"
                :disable="db.editedPalette.colors.length > 7"
                @click="db.editedPalette.colors.push('#000000')"
              />
            </div>
          </q-scroll-area>
        </q-card>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useDatabase } from 'src/stores/database-store';
import { backgroundGradient, textColor } from 'src/ts/palette';

const db = useDatabase();
</script>
