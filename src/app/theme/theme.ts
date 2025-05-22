import colors from '@/app/theme/colors';

const theme = {
  background: {
    primary: colors.white,
    semiTransparent: colors.semiTransparent,
    lightRed: colors.lightRed
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
