import colors from '@/app/theme/colors';

const theme = {
  background: {
    darkGray: colors.darkGray,
    green: colors.green,
    lightGray: colors.lightGray,
    lightRed: colors.lightRed,
    primary: colors.white,
    secondary: colors.lightGreen,
    semiTransparent: colors.semiTransparent,
  },
  button: {
    primary: {
      background: colors.blue,
      textColor: colors.white,
    },
  },
  input: {
    background: colors.lightGray,
  },
  text: {
    error: colors.red,
    link: colors.green,
    primary: colors.black,
    secondary: colors.gray,
  },
};

export default theme;
