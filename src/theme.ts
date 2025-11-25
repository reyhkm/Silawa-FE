import { createTheme, MantineColorsTuple } from '@mantine/core';

// Palet warna biru "pemerintahan" yang modern
const brandBlue: MantineColorsTuple = [
  '#eef3ff',
  '#dce4f5',
  '#b9c7e6',
  '#94a8d7',
  '#748ccb',
  '#5f7ac4',
  '#5171c2',
  '#4160ac',
  '#35549a',
  '#264888',
];

export const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
  },
  colors: {
    brandBlue,
  },
  primaryColor: 'brandBlue',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Paper: {
      defaultProps: {
        p: 'lg',
        shadow: 'sm',
        withBorder: true,
        radius: 'md',
      },
    },
  },
});
