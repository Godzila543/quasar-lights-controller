<template>
  <q-card
    v-ripple
    class=""
    :class="
      props.palette === db.activePalette
        ? 'q-my-md inset-shadow'
        : 'q-my-sm shadow-2'
    "
    :style="[
      backgroundGradient(props.palette.colors),
      { borderRadius: props.palette === db.activePalette ? '40px' : '6px' },
    ]"
    style="cursor: pointer; transition: 0.25s ease-out"
    @click="db.setActivePalette(props.palette)"
  >
    <q-card-section horizontal>
      <q-card-section
        class="text-h6 q-py-sm text-no-wrap"
        :style="{ color: textColor(props.palette.colors, 0) }"
        >{{ props.palette.name }}</q-card-section
      >
      <q-space />
      <q-btn
        flat
        icon="content_copy"
        dense
        :style="{ color: textColor(props.palette.colors, -1) }"
        @click.stop="db.copyPalette(props.palette)"
      />
      <q-btn
        flat
        icon="edit"
        :style="{ color: textColor(props.palette.colors, -1) }"
        @click.stop="db.editPalette(props.palette)"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { Palette, backgroundGradient, textColor } from 'src/ts/palette';
import { useDatabase } from 'src/stores/database-store';

interface Props {
  palette: Palette;
}

const props = defineProps<Props>();
const db = useDatabase();
</script>
