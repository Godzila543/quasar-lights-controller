import { colors } from 'quasar';
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

const { hexToRgb } = colors;

export interface Palette {
  name: string;
  colors: string[];
}

export function backgroundGradient(colors: string[] | undefined): string {
  if (!colors || colors.length === 0) {
    return 'background: #333333';
  } else if (colors.length === 1) {
    return `background: ${colors[0]}`;
  }
  return `background: linear-gradient(45deg, ${colors.join(', ')})`;
}

export function textColor(
  colors: string[] | undefined,
  index: number,
  defaultColor = 'white'
): string {
  if (!colors || colors.length === 0) {
    return defaultColor;
  }

  const color = colors[mod(index, colors.length)];
  const rgb = hexToRgb(color);
  if (!rgb) {
    return defaultColor;
  }

  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 158 ? 'black' : 'white';
}
