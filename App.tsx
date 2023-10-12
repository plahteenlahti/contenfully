import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainNavigation } from './src/navigation/navigation';
import { Contentful } from './src/services/contentful';
import { clientPersister } from './src/storage/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
// import Burnt from 'burnt';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        console.log(error);
      }
    },
  }),
});
export const storage = new MMKV({ id: 'contentfully' });

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

const App = () => {
  useEffect(() => {
    const init = async () => {
      Contentful.init();
    };

    init();
  });

  return (
    <ActionSheetProvider>
      <NavigationContainer>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: clientPersister }}>
          <SafeAreaProvider>
            <MainNavigation />
          </SafeAreaProvider>
        </PersistQueryClientProvider>
      </NavigationContainer>
    </ActionSheetProvider>
  );
};

export default App;
