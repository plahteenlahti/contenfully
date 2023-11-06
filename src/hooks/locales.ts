import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';
import { useEnv, useSpace } from '../storage/store';
import { z } from 'zod';
import { LocaleSchema } from '../schemas/locale';

export const useLocales = () => {
  const [spaceID] = useSpace();
  const [envID] = useEnv();

  return useQuery(
    ['locales', spaceID, envID],
    async () => Contentful.Locales.getAll(spaceID, envID),
    { enabled: !!spaceID && !!envID },
  );
};

export const useLocale = (localeID: string) => {
  const [spaceID] = useSpace();
  const [envID] = useEnv();

  return useQuery(
    ['locale', spaceID, envID, localeID],
    async () => Contentful.Locales.getByID(spaceID, envID, localeID),
    { enabled: !!spaceID && !!envID },
  );
};

export const useDefaultLocale = () => {
  const [spaceID] = useSpace();
  const [envID] = useEnv();

  return useQuery(
    ['locales', spaceID, envID, 'default'],
    async () => await Contentful.Locales.getAll(spaceID, envID),
    {
      enabled: !!spaceID && !!envID,
      select: data => data?.items?.find(item => item.default),
    },
  );
};

export const usePrefetchLocale = () => {
  const queryClient = useQueryClient();
  const [spaceID] = useSpace();
  const [envID] = useEnv();

  const prefetch = async (localeID: string) => {
    queryClient.prefetchQuery<Locale>(
      ['locale', spaceID, envID, localeID],
      () => Contentful.Locales.getByID(spaceID, envID, localeID),
    );
  };
  return prefetch;
};

type Locale = z.infer<typeof LocaleSchema>;
type LocaleMutation = Partial<Omit<z.infer<typeof LocaleSchema>, 'sys'>>;
type MutationData = {
  fields: LocaleMutation;
  version: number;
  localeID: string;
};

export const useUpdateLocale = () => {
  const [spaceID] = useSpace();
  const [envID] = useEnv();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MutationData) => {
      if (!spaceID || !envID || !data.localeID) {
        return null;
      }

      return await Contentful.Locales.updateByID(
        data.fields,
        data.version,
        spaceID,
        envID,
        data.localeID,
      );
    },

    onMutate: async update => {
      await queryClient.cancelQueries([
        'locale',
        spaceID,
        envID,
        update.localeID,
      ]);
      const previousValues = queryClient.getQueryData<Locale>([
        'locale',
        spaceID,
        envID,
        update.localeID,
      ]);
      queryClient.setQueryData<Locale>(
        ['locale', spaceID, envID, update.localeID],
        {
          ...previousValues,
          ...update.fields,
        },
      );

      return { previousValues, update };
    },
    onError: (error, update, context) => {
      if (context?.previousValues) {
        queryClient.setQueryData<Locale>(
          ['locale', spaceID, envID, context.update.localeID],
          context.previousValues,
        );
      }
    },
    onSettled: update => {
      queryClient.invalidateQueries<Locale>({
        queryKey: ['locale', spaceID, envID, update?.sys.id],
      });
    },
  });
};

export const useDeleteLocale = () => {
  const [spaceID] = useSpace();
  const [envID] = useEnv();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (localeID: string) => {
      if (!spaceID || !envID || !localeID) {
        return null;
      }

      return await Contentful.Locales.deleteByID(spaceID, envID, localeID);
    },
  });
};
