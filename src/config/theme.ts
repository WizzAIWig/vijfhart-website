/**
 * Vijfhart Brand Theme
 */

export const theme = {
  colors: {
    // Primary - Deep blue
    primary: {
      DEFAULT: '#1E3A5F',
      50: '#E8EEF4',
      100: '#D1DDE9',
      200: '#A3BBD3',
      300: '#7599BD',
      400: '#4777A7',
      500: '#1E3A5F',
      600: '#182E4C',
      700: '#122339',
      800: '#0C1726',
      900: '#060C13',
    },
    
    // Secondary - Teal
    secondary: {
      DEFAULT: '#4A90A4',
      50: '#EDF5F7',
      100: '#DBEBEF',
      200: '#B7D7DF',
      300: '#93C3CF',
      400: '#6FAFBF',
      500: '#4A90A4',
      600: '#3B7383',
      700: '#2C5662',
      800: '#1E3A42',
      900: '#0F1D21',
    },
    
    // Accent - Orange
    accent: {
      DEFAULT: '#F5A623',
      50: '#FEF6E8',
      100: '#FDEDD1',
      200: '#FBDBA3',
      300: '#F9C975',
      400: '#F7B747',
      500: '#F5A623',
      600: '#C4851C',
      700: '#936415',
      800: '#62420E',
      900: '#312107',
    },
  },
  
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    heading: 'Poppins, system-ui, sans-serif',
  },
} as const;

export type Theme = typeof theme;
