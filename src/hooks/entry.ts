import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../constants/constants';
import { Contentful } from '../services/contentful';
import { useAppSelector } from '../storage/store';

type QueryParams = {
  type: 'limit' | 'skip' | 'order' | 'query';
  parameter?: string;
};

type QueryOptions = QueryParams[];

export const useEntries = (queryOptions?: QueryOptions) => {
  const {
    space: { space, environment },
  } = useAppSelector(state => state);

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
  const {
    space: { space, environment },
  } = useAppSelector(state => state);

  return useQuery(
    ['entry', space, environment, entryID],
    async () => await Contentful.Entries.getById(space, environment, entryID),
    { enabled: !!space && !!environment && !!entryID },
  );
};

export const useUnpublishEntry = () => {
  const {
    tokens: { selected },
    space: { space, environment },
  } = useAppSelector(state => state);

  return useMutation(
    async ({
      entryID,
      unpublish,
      version,
    }: {
      entryID: string;
      version: number;
      unpublish: boolean;
    }) => {
      try {
        const response = await fetch(
          `${BASE_URL}/spaces/${space}/environments/${environment}/entries/${entryID}/published`,
          {
            method: unpublish ? 'DELETE' : 'PUT',
            headers: {
              'X-Contentful-Version': `${version}`,
              Authorization: `Bearer ${selected?.content}`,
            },
          },
        );

        return response.json();
      } catch (error) {
        return error;
      }
    },
  );
};
