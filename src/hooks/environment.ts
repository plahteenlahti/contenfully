import { useQuery } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';

export const useEnvironment = (spaceID?: string) => {
  return useQuery(
    ['environment', spaceID],
    async () => Contentful.Environment.getAll(spaceID),
    { enabled: !!spaceID },
  );
};
