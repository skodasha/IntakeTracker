import { UnistylesRegistry } from 'react-native-unistyles';

import appTheme from '@/app/theme/theme';

export const initTheme = () => {
  UnistylesRegistry.addThemes({
    primary: {
      app: appTheme,
    },
  }).addConfig({
    adaptiveThemes: true,
  });
};
