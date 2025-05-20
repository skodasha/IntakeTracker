import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { type MainStackParamList } from '@/app/interfaces/navigation/main.interface';
import { MAIN_ROUTE } from '@/app/routes/routes';
import { MainScreens } from '@/app/screens';

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => (
  <MainStack.Navigator
    initialRouteName={MAIN_ROUTE.MEDICATION_LIST}
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainStack.Group>
      <MainStack.Screen component={MainScreens.MedicationList} name={MAIN_ROUTE.MEDICATION_LIST} />
    </MainStack.Group>
  </MainStack.Navigator>
);

export default MainNavigator;
