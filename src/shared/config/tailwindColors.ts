/**
 * Цвета для Tailwind / CSS-переменных (HSL).
 * Использовать в классах и theme/variables.css при необходимости.
 */
export const tailwindColors = {
  blue: {
    500: 'hsl(221, 83%, 53%)',
    600: 'hsl(221, 83%, 45%)',
  },
  gray: {
    400: 'hsl(220, 9%, 46%)',
    500: 'hsl(220, 9%, 36%)',
  },
  white: 'hsl(0, 0%, 100%)',
} as const;
