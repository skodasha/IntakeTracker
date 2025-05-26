import { FC } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/app/components';

const stylesheet = createStyleSheet(() => ({
  root: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
}));

const EmptyListComponent: FC = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <Text fontWeight="500">{`You don't have any medications`}</Text>
    </View>
  );
};

export default EmptyListComponent;
