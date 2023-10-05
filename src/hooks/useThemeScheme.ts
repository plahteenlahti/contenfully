import { useColorScheme } from 'react-native';

export const useThemeScheme = (): {
  theme: 'dark' | 'light';
  barStyle: 'light-content' | 'dark-content';
} => {
  const isDarkMode = useColorScheme() === 'dark';

  return isDarkMode
    ? { theme: 'dark', barStyle: 'light-content' }
    : { theme: 'light', barStyle: 'dark-content' };
};
