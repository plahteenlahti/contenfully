import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '../storage/store';
import { Contentful } from '../services/contentful';

const BASE_URL = 'https://api.contentful.com';

export const useWebhooks = () => {
  const {
    space: { space },
  } = useAppSelector(state => state);

  return useQuery(
    ['webhooks', { space }],
    async () => await Contentful.Webhooks.getAll(space),
    {
      enabled: !!space,
    },
  );
};

export const useWebhook = (id: string) => {
  const {
    tokens: { selected },
    space: { space },
  } = useAppSelector(state => state);

  return useQuery(
    ['webhooks', id, { space }],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/spaces/${space}/webhook_definitions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${selected?.content}`,
            },
          },
        );

        return response.json();
      } catch (error) {
        return error;
      }
    },
    {
      enabled: !!space && !!selected,
    },
  );
};

export const useWebhookHealth = (id: string) => {
  const {
    tokens: { selected },
    space: { space },
  } = useAppSelector(state => state);

  return useQuery(
    ['webhooks', id, 'health', space],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/spaces/${space}/webhooks/${id}/health`,
          {
            headers: {
              Authorization: `Bearer ${selected?.content}`,
            },
          },
        );

        return response.json();
      } catch (error) {
        return error;
      }
    },
    {
      enabled: !!space && !!selected,
    },
  );
};

export const useDeleteWebhook = () => {
  const {
    tokens: { selected },
    space: { space },
  } = useAppSelector(state => state);
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      const response = await fetch(
        `${BASE_URL}/spaces/${space}/webhook_definitions/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${selected?.content}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
    },
    {
      onSuccess: () => {
        queryClient.resetQueries('webhooks');
      },
    },
  );
};
