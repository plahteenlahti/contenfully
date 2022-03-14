import { useColorScheme } from 'react-native';
import { CustomTheme } from '../storage/reducers/theme';
import { useAppSelector } from '../storage/store';

type Theme = {
  theme: 'dark' | 'light';
  dark: CustomTheme;
  light: CustomTheme;
};

export const useThemeScheme = (): Theme => {
  const { useSystemTheme, theme, dark, light } = useAppSelector(
    state => state.theme,
  );
  const isDarkMode = useColorScheme() === 'dark';

  if (useSystemTheme) {
    return isDarkMode
      ? { theme: 'dark', dark, light }
      : { theme: 'light', dark, light };
  } else {
    return { theme: theme, dark, light };
  }
};
