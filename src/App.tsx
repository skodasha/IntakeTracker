import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { type FC } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { initApplicationContext } from '@/app/config/initApplicationContext';
import ApplicationContextProvider from '@/app/contexts/ApplicationContext';
import UserContextProvider from '@/app/contexts/UserContext';
import RootNavigator from '@/app/navigation/RootNavigator';
import { initTheme } from '@/app/theme/init';
import { createQueryClient } from '@/app/utils/queryClient';

const { repositories, services } = initApplicationContext();

initTheme();

const queryClient = createQueryClient(repositories.storage);

const App: FC = () => (
  <GestureHandlerRootView>
    <StatusBar animated translucent backgroundColor="transparent" barStyle="dark-content" />
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <ApplicationContextProvider services={services} repositories={repositories}>
          <UserContextProvider>
            <BottomSheetModalProvider>
              <RootNavigator />
            </BottomSheetModalProvider>
          </UserContextProvider>
        </ApplicationContextProvider>
      </QueryClientProvider>
    </NavigationContainer>
  </GestureHandlerRootView>
);

export default App;
