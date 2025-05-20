import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

import { useUserContext } from '@/app/contexts/UserContext';
import AuthNavigator from '@/app/navigation/Auth';
import MainNavigator from '@/app/navigation/Main';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const { isLoading, user } = useUserContext();

  useEffect(() => {
    const init = async () => {
      if (!isLoading) {
        await BootSplash.hide({ fade: true });
      }
    };

    init();
  }, [isLoading]);

  const getNavigator = () => {
    if (user) {
      return {
        component: MainNavigator,
        name: 'MainNavigator',
      };
    }

    return {
      component: AuthNavigator,
      name: 'AuthNavigator',
    };
  };

  const currentNavigator = getNavigator();

  return (
    <RootStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
        headerShown: false,
      }}
    >
      <RootStack.Screen component={currentNavigator.component} name={currentNavigator.name} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
