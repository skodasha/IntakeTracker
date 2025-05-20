import { useMemo, forwardRef } from 'react';
import {
  Text as RNText,
  type TextStyle,
  type TextProps as RNTextProps,
  type StyleProp,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import {
  getFontStyles,
  type FontWeight,
  type FontFamily,
  type FontSize,
  type LineHeight,
} from '@/app/utils/font';

export interface TextProps extends RNTextProps {
  fontFamily?: FontFamily;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  lineHeight?: LineHeight;
  style?: StyleProp<TextStyle>;
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    color: theme.app.text.primary,
  },
}));

const Text = forwardRef<RNText, TextProps>(
  ({ children, fontFamily, fontSize, fontWeight, lineHeight, style, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);

    const fontStyles = useMemo(
      () => getFontStyles({ fontFamily, fontSize, fontWeight, lineHeight }),
      [fontWeight, fontFamily, fontSize, lineHeight]
    );

    return (
      <RNText {...props} ref={ref} style={[styles.root, fontStyles, style]}>
        {children}
      </RNText>
    );
  }
);

Text.displayName = 'Text';

export default Text;
