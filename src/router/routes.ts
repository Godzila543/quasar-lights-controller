import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/palettes' },
      {
        path: 'generators',
        component: () => import('pages/GeneratorsPage.vue'),
      },
      {
        path: 'generators/edit',
        component: () => import('pages/GeneratorEditPage.vue'),
      },
      {
        path: 'palettes',
        component: () => import('pages/PalettesPage.vue'),
      },
      {
        path: 'palettes/edit',
        component: () => import('pages/PaletteEditPage.vue'),
      },
      {
        path: 'settings',
        component: () => import('pages/SettingsPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
