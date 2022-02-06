import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    light: 'white',
    bgGrey: '#e1e4e8',
    borderGrey: '#b0b3b5',
    error: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export const formStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: theme.colors.light,
    padding: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 15,
  },
});

export default theme;
