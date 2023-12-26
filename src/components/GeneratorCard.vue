<template>
  <q-card
    v-ripple
    :class="
      props.generator === db.activeGenerator
        ? 'q-my-md inset-shadow inset-dark-glass'
        : 'q-my-sm shadow-4 hovering-glass'
    "
    :style="{
      borderRadius: props.generator === db.activeGenerator ? '40px' : '6px',
    }"
    style="cursor: pointer; transition: 0.25s ease-out"
    @click="db.setActiveGenerator(props.generator)"
  >
    <q-card-section horizontal>
      <q-card-section class="text-h6 q-py-sm text-no-wrap">{{
        props.generator.name
      }}</q-card-section>
      <q-space />
      <q-btn
        flat
        icon="content_copy"
        dense
        @click.stop="db.copyGenerator(props.generator)"
      />
      <q-btn flat icon="edit" @click.stop="db.editGenerator(props.generator)" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { Generator } from 'src/ts/generator';
import { useDatabase } from 'src/stores/database-store';

interface Props {
  generator: Generator;
}

const props = defineProps<Props>();
const db = useDatabase();
</script>
<style scoped lang="scss"></style>
