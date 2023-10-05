import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';
import { useSpace } from '../storage/store';
import { WebhookSchema } from '../schemas/webhook';
import { z } from 'zod';

export const useWebhooks = () => {
  const [spaceID] = useSpace();

  return useQuery(
    ['webhooks', { spaceID }],
    async () => {
      if (!spaceID) {
        return null;
      }
      return await Contentful.Webhooks.getAll(spaceID);
    },
    {
      enabled: !!spaceID,
    },
  );
};

export const useWebhook = (webhookID: string) => {
  const [spaceID] = useSpace();

  return useQuery(
    ['webhooks', spaceID, webhookID],
    async () => {
      if (!spaceID || !webhookID) {
        return null;
      }

      return Contentful.Webhooks.getByID(spaceID, webhookID);
    },
    {
      enabled: !!spaceID,
    },
  );
};

export const useDeleteWebhook = () => {
  const [spaceID] = useSpace();

  return useMutation(async (webhookID: string) => {
    if (!spaceID || !webhookID) {
      return null;
    }

    return await Contentful.Webhooks.deleteByID(spaceID, webhookID);
  });
};

type Webhook = z.infer<typeof WebhookSchema>;
type WebhookMutation = Partial<Omit<z.infer<typeof WebhookSchema>, 'sys'>>;
type MutationData = {
  fields: WebhookMutation;
  version: number;
  webhookID: string;
};

export const useUpdateWebhook = () => {
  const [spaceID] = useSpace();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: MutationData) => {
      if (!spaceID || !data.webhookID) {
        return null;
      }

      return await Contentful.Webhooks.updateByID(
        spaceID,
        data.webhookID,
        data.fields,
        data.version,
      );
    },
    {
      onMutate: async update => {
        await queryClient.cancelQueries([
          'webhooks',
          spaceID,
          update.webhookID,
        ]);
        const previousValues = queryClient.getQueryData<Webhook>([
          'webhooks',
          spaceID,
          update.webhookID,
        ]);
        queryClient.setQueryData<Webhook>(
          ['webhooks', spaceID, update.webhookID],
          {
            ...previousValues,
            ...update.fields,
          },
        );

        return { previousValues, update };
      },
      onError: (error, update, context) => {
        if (context?.previousValues) {
          queryClient.setQueryData<Webhook>(
            ['locale', spaceID, context.update.webhookID],
            context.previousValues,
          );
        }
      },
      onSettled: update => {
        queryClient.invalidateQueries<Locale>({
          queryKey: ['locale', spaceID, update?.sys.id],
        });
      },
    },
  );
};

export const createWebhook = () => {
  const [spaceID] = useSpace();

  return useMutation(async (webhookID: string) => {
    if (!spaceID || !webhookID) {
      return null;
    }

    return await Contentful.Webhooks.create(spaceID, webhookID);
  });
};

export const useWebhookHealth = (webhookID: string) => {
  const [spaceID] = useSpace();

  return useQuery(
    ['webhooks', 'health', spaceID, webhookID],
    async () => {
      if (!spaceID || !webhookID) {
        return null;
      }
      Contentful.Webhooks.getHealthByID(spaceID, webhookID);
    },
    {
      enabled: !!spaceID && !!webhookID,
    },
  );
};
