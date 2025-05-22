import { ActivityIndicator, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import colors from '@/app/theme/colors';

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.app.background.semiTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
}));

const FullScreenLoader = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.blue} />
    </View>
  );
};

export default FullScreenLoader;
