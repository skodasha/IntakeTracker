import { type FC } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/app/components';

const stylesheet = createStyleSheet((theme, runtime) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.app.background.primary,
    flex: 1,
    paddingTop: runtime.insets.top,
  },
  title: {
    color: theme.app.text.primary,
  },
}));

const MedicationList: FC = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <Text fontSize={24} fontWeight="500" lineHeight={32} style={styles.title}>
        Medication List
      </Text>
    </View>
  );
};

export default MedicationList;
