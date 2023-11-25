import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';
import { useEnv, useSpace } from '../storage/store';
import { SearchParamsOption } from 'ky';
import { z } from 'zod';
import { EntrySchema } from '../schemas/entry';

type QueryParams = {
  type: 'limit' | 'skip' | 'order' | 'query';
  parameter?: string;
};

const EntryArray = z.array(EntrySchema);

const ITEMS_PER_PAGE = 25;

export const useEntries = (searchParams?: SearchParamsOption) => {
  const [space] = useSpace();
  const [environment] = useEnv();

  return useInfiniteQuery({
    queryKey: ['entries', space, environment, searchParams],
    queryFn: async ({ pageParam = 0 }) =>
      await Contentful.Entries.getAll(space, environment, searchParams),
    enabled: !!space && !!environment,
    initialPageParam: 0,
    select: data => {
      const allPagesArray: z.infer<typeof EntryArray> = [];
      for (const entryArray of data.pages) {
        allPagesArray.push(...entryArray.items);
      }

      return {
        pages: data.pages,
        pageParams: data.pageParams,
        entries: allPagesArray,
      };
    },
    getNextPageParam: lastPage =>
      lastPage.skip + ITEMS_PER_PAGE < lastPage.total
        ? lastPage.skip + ITEMS_PER_PAGE
        : undefined,
  });
};

export const useEntry = (entryID?: string) => {
  const [space] = useSpace();
  const [environment] = useEnv();

  return useQuery({
    queryKey: ['entry', space, environment, entryID],
    queryFn: async () =>
      await Contentful.Entries.getById(space, environment, entryID),
    enabled: !!space && !!environment && !!entryID,
  });
};

export const useUnpublishEntry = () => {
  const [space] = useSpace();
  const [environment] = useEnv();

  return useMutation({
    mutationFn: async (entryID: string) => undefined,
  });
};
