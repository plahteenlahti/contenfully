import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';
import { useEnv, useSpace } from '../storage/store';

type QueryParams = {
  type: 'limit' | 'skip' | 'order' | 'query';
  parameter?: string;
};

type QueryOptions = QueryParams[];

export const useEntries = (queryOptions?: QueryOptions) => {
  const [space] = useSpace();
  const [environment] = useEnv();

  // queryOptions?.forEach(({ type, parameter }) => {
  //   if (type && parameter) {
  //     url.searchParams.append(type, parameter);
  //   }
  // });
  // url.searchParams.set('skip', `${pageParam}`);

  return useInfiniteQuery(
    ['entries', { space, environment, queryOptions }],
    async ({ pageParam = 0 }) =>
      await Contentful.Entries.getAll(space, environment),
    {
      enabled: !!space && !!environment,
      select: data => {
        const allPagesArray = [];
        data?.pages?.forEach(entryArray =>
          allPagesArray.push(entryArray.items),
        );
        const flatEntries = allPagesArray.flat();
        return {
          pages: data.pages,
          pageParams: data.pageParams,
          entries: flatEntries,
        };
      },
      getNextPageParam: lastPage =>
        lastPage.skip + 25 < lastPage.total ? lastPage.skip + 25 : undefined,
    },
  );
};

export const useEntry = (entryID?: string) => {
  const [space] = useSpace();
  const [environment] = useEnv();

  return useQuery(
    ['entry', space, environment, entryID],
    async () => await Contentful.Entries.getById(space, environment, entryID),
    { enabled: !!space && !!environment && !!entryID },
  );
};

export const useUnpublishEntry = () => {
  const [space] = useSpace();
  const [environment] = useEnv();

  return useMutation(
    async ({
      entryID,
      unpublish,
      version,
    }: {
      entryID: string;
      version: number;
      unpublish: boolean;
    }) => undefined,
  );
};
