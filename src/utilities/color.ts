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
      return colors[config[theme].text][config[theme].textColorScale];
    case 'border':
      return colors[config[theme].background][config[theme].borderColorScale];
    default:
      return colors[config[theme].background][
        config[theme].backgroundColorScale
      ];
  }
};

export const stringToHex = (str: string): string => {
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, '0');
  }
  return colour;
};
