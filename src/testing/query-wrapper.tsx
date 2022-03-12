import { configureStore } from '@reduxjs/toolkit';
import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { tokensReducer } from '../storage/reducers/token';

function buildStore() {
  const store = configureStore({
    reducer: tokensReducer,
    preloadedState: {
      tokens: [],
      selected: { name: 'test', content: 'content' },
    },
  });
  return store;
}

export const createWrapper = () => {
  const store = buildStore();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: Infinity,
        retry: false,
      },
    },
  });

  return ({ children }: PropsWithChildren<{}>) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};
