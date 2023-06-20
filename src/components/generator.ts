export interface Generator {
  name: string;
  type: 'gradient' | 'particle';

  //gradient options
  speed: number;
  density: number;

  //particle options
  particleCount: number;
  particleLifetime: number;
  particleSize: number;
  particleSharpness: number;
  persistence: number;
  colorMethod: 'random' | 'age' | 'intensity' | 'influence';

  intensityMethod: 'fade-in' | 'fade-out' | 'fade-in-out' | 'pulse';
  pulseCount: number;

  initialPositionMethod: 'set' | 'range';
  initialPosition: Range;

  initialVelocityMethod: 'set' | 'range';
  initialVelocity: Range;

  calculatedAttribute: 'position' | 'velocity' | 'acceleration';
  calculationMethod: 'constant' | 'scaled-over-life' | 'attractor';
  calculatedAttributeParams: [p1: number, p2: number, p3: number];
}

import { config, Range } from './configMarkup';

export const particleUI: config<Generator> = [
  {
    label: 'Particle',
    options: [
      {
        label: 'Count',
        model: 'particleCount',
        conditionalAttribute: true,
        element: 'slider',
        config: [1, 300, 1],
      },
      {
        label: 'Lifetime',
        model: 'particleLifetime',
        conditionalAttribute: true,
        element: 'slider',
        config: [0.1, 10, 0.01],
      },
      {
        label: 'Size',
        model: 'particleSize',
        conditionalAttribute: true,
        element: 'slider',
        config: [1, 300, 1],
      },
    ],
  },
  {
    label: 'Presentation',
    options: [
      {
        label: 'Persistence',
        model: 'persistence',
        conditionalAttribute: true,
        element: 'slider',
        config: [0.0, 1.0, 0.01],
      },
      {
        label: 'Color',
        model: 'colorMethod',
        conditionalAttribute: true,
        element: 'select',
        config: ['random', 'age', 'intensity', 'influence'],
      },
      {
        label: 'Intensity',
        model: 'intensityMethod',
        conditionalAttribute: true,
        element: 'select',
        config: ['fade-in', 'fade-out', 'fade-in-out', 'pulse'],
      },
      {
        label: 'Pulse Count',
        model: 'pulseCount',
        conditionalAttribute: 'intensityMethod',
        conditionalValue: 'pulse',
        element: 'slider',
        config: [1, 30, 0.1],
      },
      {
        label: 'Sharpness',
        model: 'particleSharpness',
        conditionalAttribute: true,
        element: 'slider',
        config: [0.1, 10, 0.01],
      },
    ],
  },
  {
    label: 'Position',
    options: [
      {
        label: 'Method',
        model: 'initialPositionMethod',
        conditionalAttribute: true,
        element: 'select',
        config: ['set', 'range'],
      },
      {
        label: 'Range',
        model: 'initialPosition',
        conditionalAttribute: 'initialPositionMethod',
        conditionalValue: 'range',
        element: 'range-slider',
        config: [0, 900, 1],
      },
      {
        label: 'Value',
        model: 'initialPosition',
        conditionalAttribute: 'initialPositionMethod',
        conditionalValue: 'set',
        element: 'half-range-slider',
        config: [0, 900, 1],
      },
    ],
  },
  {
    label: 'Velocity',
    options: [
      {
        label: 'Method',
        model: 'initialVelocityMethod',
        conditionalAttribute: true,
        element: 'select',
        config: ['set', 'range'],
      },
      {
        label: 'Range',
        model: 'initialVelocity',
        conditionalAttribute: 'initialVelocityMethod',
        conditionalValue: 'range',
        element: 'range-slider',
        config: [-5, 5, 0.01],
      },
      {
        label: 'Value',
        model: 'initialVelocity',
        conditionalAttribute: 'initialVelocityMethod',
        conditionalValue: 'set',
        element: 'half-range-slider',
        config: [-5, 5, 0.01],
      },
    ],
  },
  {
    label: 'Calculated Attribute',
    options: [
      {
        label: 'Calculated Attribute',
        model: 'calculatedAttribute',
        conditionalAttribute: true,
        element: 'select',
        config: ['position', 'velocity', 'acceleration'],
      },
      {
        label: 'Calculation Method',
        model: 'calculationMethod',
        conditionalAttribute: true,
        element: 'select',
        config: ['constant', 'scaled-over-life', 'attractor'],
      },
    ],
  },
];

export const gradientUI: config<Generator> = [
  {
    label: 'Gradient',
    options: [
      {
        label: 'Speed',
        model: 'speed',
        conditionalAttribute: true,
        element: 'slider',
        config: [0.1, 5, 0.01],
      },
      {
        label: 'Density',
        model: 'density',
        conditionalAttribute: true,
        element: 'slider',
        config: [0.1, 5, 0.01],
      },
    ],
  },
];
