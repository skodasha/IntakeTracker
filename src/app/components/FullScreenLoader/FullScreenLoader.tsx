import { ActivityIndicator, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import colors from '@/app/theme/colors';

const stylesheet = createStyleSheet((theme) => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.app.background.semiTransparent,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
  },
}));

const FullScreenLoader = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.blue} size="large" />
    </View>
  );
};

export default FullScreenLoader;
