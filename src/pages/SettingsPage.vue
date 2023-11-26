<template>
  <q-header class="opaque-glass" elevated>
    <q-toolbar>
      <q-toolbar-title class="text-black"> Settings </q-toolbar-title>
    </q-toolbar>
  </q-header>
  <ConfigPage :config-def="settingsUI" :model-object="db.settings" />
</template>

<script lang="ts" setup>
import ConfigPage from 'src/components/ConfigPage.vue';
import { useDatabase } from 'src/stores/database-store';
import { settingsUI } from 'src/ts/settingsUI';

const db = useDatabase();
</script>
