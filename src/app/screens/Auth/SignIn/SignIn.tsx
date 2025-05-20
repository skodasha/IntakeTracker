import { useNavigation } from '@react-navigation/native';
import { type FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from '@/app/components';
import { AuthNavigationProps } from '@/app/interfaces/navigation/auth.interface';
import { AUTH_ROUTE } from '@/app/routes/routes';

const stylesheet = createStyleSheet((theme, runtime) => ({
  button: {
    alignItems: 'center',
    backgroundColor: theme.app.button.primary.background,
    borderRadius: 15,
    marginTop: 10,
    padding: 15,
    width: '50%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
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

const SignIn: FC = () => {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation<AuthNavigationProps<typeof AUTH_ROUTE.SIGN_IN>>();

  return (
    <View style={styles.root}>
      <Text fontSize={24} fontWeight="500" lineHeight={32} style={styles.title}>
        Sign in
      </Text>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(AUTH_ROUTE.SIGN_UP)}
        >
          <Text style={styles.buttonText}>Don’t have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
