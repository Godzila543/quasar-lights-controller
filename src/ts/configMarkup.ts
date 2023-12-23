export interface Range {
  min: number;
  max: number;
}

type TypedKeys<T, T2> = {
  [K in keyof T]: T[K] extends T2 ? K : never;
}[keyof T];

export interface configOption<T, modelInterface> {
  label: string;
  model: TypedKeys<modelInterface, T>;
  conditionalAttribute: keyof modelInterface | true;
  conditionalValue?: string;
  element:
    | 'slider'
    | 'select'
    | 'range-slider'
    | 'half-range-slider'
    | 'button';
  config: T[];
}

export interface configCategory<modelInterface> {
  label: string;
  options: configOption<
    string | number | Range | (() => void),
    modelInterface
  >[];
}

export type config<modelInterface> = configCategory<modelInterface>[];
