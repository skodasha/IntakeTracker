import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import CircleWarningIcon from '@/app/assets/icons/circle-warning-icon.svg';
import { Text } from '@/app/components';

const stylesheet = createStyleSheet((theme) => ({
  errorContainer: {
    backgroundColor: theme.app.background.lightRed,
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 14.5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  errorText: {
    color: theme.app.text.error,
    width: '90%'
  },
}));

type ErrorMessagePropsType = {
  message?: string;
};

const ErrorMessage = ({ message }: ErrorMessagePropsType) => {
  const { styles } = useStyles(stylesheet);

  if (!message) {
    return null;
  };
  
  return (
    <View style={styles.errorContainer}>
            <CircleWarningIcon height={24} width={24} />
            <Text fontSize={14} style={styles.errorText}>
              {message}
            </Text>
          </View>
  );
};

export default ErrorMessage;
