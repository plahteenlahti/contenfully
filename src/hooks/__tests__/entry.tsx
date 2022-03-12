import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-hooks';
import {
  setEnvironment,
  setSpace,
  spaceReducer,
} from '../../storage/reducers/space';
import { setSelectedToken, tokensReducer } from '../../storage/reducers/token';
import { createWrapper } from '../../testing/query-wrapper';
import { useEntry } from '../entry';

test('useEntry works', async () => {
  // tokens: { selected },
  // space: { space, environment },

  const { result, waitFor } = renderHook(() => useEntry('entry1234'), {
    wrapper: createWrapper(),
  });

  waitFor(() => result.current.isSuccess);

  expect(result.current.data).toEqual({ answer: 42 });
});
