import { useQuery } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';

export const useEnvironment = (spaceID?: string) => {
  return useQuery({
    queryKey: ['environment', spaceID],
    queryFn: async () => Contentful.Environment.getAll(spaceID),
    enabled: !!spaceID,
  });
};
