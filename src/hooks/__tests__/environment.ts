import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { server } from '../../setupTests';
import { createWrapper } from '../../testing/query-wrapper';
import { useEnvironments } from '../environment';

describe('useEnvironments hook', () => {
  test('returns data in correct format', async () => {
    const { result, waitFor } = renderHook(() => useEnvironments(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual([
      {
        name: 'environment-1',
      },
      {
        name: 'environment-2',
      },
    ]);
  });

  test('returns error on error', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    const { result, waitFor } = renderHook(() => useEnvironments(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toBeDefined();
  });
});
