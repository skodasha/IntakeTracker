import appTheme from '@/app/theme/theme';

type AppThemes = {
  primary: {
    app: typeof appTheme;
  };
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}
