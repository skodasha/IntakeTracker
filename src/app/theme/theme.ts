import colors from '@/app/theme/colors';

const theme = {
  background: {
    primary: colors.white,
    secondary: colors.lightGreen,
    semiTransparent: colors.semiTransparent,
    lightRed: colors.lightRed,
    lightGray: colors.lightGray,
    darkGray: colors.darkGray,
    green: colors.green
  },
  input: {
    background: colors.lightGray,
  },
  button: {
    primary: {
      background: colors.blue,
      textColor: colors.white
    },
  },
  text: {
    primary: colors.black,
    secondary: colors.gray,
    error: colors.red,
    link: colors.green
  },
};

export default theme;
