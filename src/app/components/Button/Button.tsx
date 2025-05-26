import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/app/components';

const stylesheet = createStyleSheet((theme) => ({
  button: {
    alignItems: 'center',
    backgroundColor: theme.app.button.primary.background,
    borderRadius: 100,
    padding: 16,
    width: '100%',
  },
  buttonText: {
    color: theme.app.button.primary.textColor,
  },
}));

type ButtonPropsType = {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
};

const Button = ({ onPress, style, title }: ButtonPropsType) => {
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text fontSize={16} fontWeight="500" style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
