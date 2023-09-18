import { useColorScheme } from 'react-native';
import { ThemeState } from '../storage/reducers/theme';
import { useAppSelector } from '../storage/store';

export const useThemeScheme = (): Pick<
  ThemeState,
  'dark' | 'light' | 'theme'
> & { barStyle: 'light-content' | 'dark-content' } => {
  const { useSystemTheme, theme, dark, light } = useAppSelector(
    state => state.theme,
  );
  const isDarkMode = useColorScheme() === 'dark';

  if (useSystemTheme) {
    return isDarkMode
      ? { theme: 'dark', dark, light, barStyle: 'light-content' }
      : { theme: 'light', dark, light, barStyle: 'dark-content' };
  } else {
    return { theme: theme, dark, light, barStyle: 'light-content' };
  }
};
