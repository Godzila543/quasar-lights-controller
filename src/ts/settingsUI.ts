import { config } from './configMarkup';

export interface Settings {
  brightness: number;
  speed: number;
  theme: 'Active Palette' | 'Light' | 'Dark';
}

export const settingsUI: config<Settings> = [
  {
    label: 'Lights',
    options: [
      {
        label: 'Brightness',
        model: 'brightness',
        conditionalAttribute: true,
        element: 'slider',
        config: [0, 1, 0.01],
      },
      {
        label: 'Speed',
        model: 'speed',
        conditionalAttribute: true,
        element: 'slider',
        config: [0.1, 5, 0.01],
      },
    ],
  },
  {
    label: 'App',
    options: [
      {
        label: 'Theme',
        model: 'theme',
        conditionalAttribute: true,
        element: 'select',
        config: ['Active Palette', 'Light', 'Dark'],
      },
      {
        label: 'Connect to Lights',
        model: 'openDialog',
        conditionalAttribute: true,
        element: 'button',
        config: [],
      },
    ],
  },
];
