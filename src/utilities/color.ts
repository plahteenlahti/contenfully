import { DefaultTheme } from 'styled-components/native';

export const resolveColor = (
  config: DefaultTheme,
  type: 'text' | 'background' | 'border',
): string => {
  const { theme, colors } = config;
  switch (type) {
    case 'background':
      return colors[config[theme].background][
        config[theme].backgroundColorScale
      ];
    case 'text':
      return colors[config[theme].background][config[theme].textColorScale];
    case 'border':
      return colors[config[theme].background][config[theme].borderColorScale];
    default:
      return colors[config[theme].background][
        config[theme].backgroundColorScale
      ];
  }
};
