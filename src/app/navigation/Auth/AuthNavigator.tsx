import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList } from '@/app/interfaces/navigation/auth.interface';
import { AUTH_ROUTE } from '@/app/routes/routes';
import { AuthScreens } from '@/app/screens';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator
    initialRouteName={AUTH_ROUTE.SIGN_IN}
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Group>
      <AuthStack.Screen component={AuthScreens.SignIn} name={AUTH_ROUTE.SIGN_IN} />
      <AuthStack.Screen component={AuthScreens.SignUp} name={AUTH_ROUTE.SIGN_UP} />
    </AuthStack.Group>
  </AuthStack.Navigator>
);

export default AuthNavigator;
