import type { TextStyle } from 'react-native/types';

export type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type FontFamily = 'dmSans';
export type FontSize = 12 | 14 | 16 | 18 | 22 | 24 | 28 | number;
export type LineHeight = number;

const fontSizeLineHeightMap: { [key: number]: number } = {
  12: 18,
  14: 20,
  16: 22,
  18: 26,
  22: 32,
  24: 36,
  28: 40,
  32: 44,
};

const getLineHeightByFontSize = (fontSize: FontSize) => {
  const lineHeight = fontSizeLineHeightMap[fontSize];
  if (!lineHeight) {
    return fontSize + 8;
  }

  return lineHeight;
};

const dmSansHandler = (fontWeight: number) => {
  let fontFamily = 'DMSans-';

  if (fontWeight <= 100) {
    fontFamily += 'DMSans';
  } else if (fontWeight <= 200) {
    fontFamily += 'ExtraLight';
  } else if (fontWeight <= 300) {
    fontFamily += 'Light';
  } else if (fontWeight <= 400) {
    fontFamily += 'Regular';
  } else if (fontWeight <= 500) {
    fontFamily += 'Medium';
  } else if (fontWeight <= 600) {
    fontFamily += 'SemiBold';
  } else if (fontWeight <= 700) {
    fontFamily += 'Bold';
  } else if (fontWeight <= 800) {
    fontFamily += 'ExtraBold';
  } else {
    fontFamily += 'Black';
  }

  return fontFamily;
};

const fontFamilyHandlerMap: {
  [key: string]: (fontWeight: number) => string;
} = {
  dmSans: dmSansHandler,
};

// When applying new fonts make sure font family names are correct for ios and android
// android fonts are defined by name
// ios fonts inner names may be different from file names, check Font book app, import font file, see info, see Identifiers
export const getFontStyles = ({
  fontFamily = 'dmSans',
  fontSize = 16,
  fontWeight = '400',
  lineHeight,
}: {
  fontFamily?: FontFamily;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  lineHeight?: LineHeight;
}): TextStyle => {
  const fontWeightNum = Number(fontWeight);

  return {
    fontFamily: fontFamilyHandlerMap[fontFamily]?.(fontWeightNum) ?? 'DMSans-Regular',
    fontSize,
    fontStyle: undefined,
    fontWeight: undefined,
    lineHeight: lineHeight || getLineHeightByFontSize(fontSize),
  };
};
