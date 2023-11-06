import { useQuery } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';
import { useEnv, useSpace } from '../storage/store';

export const useMedia = () => {
  const [space] = useSpace();
  const [environment] = useEnv();

  return useQuery({
    queryKey: ['assets', space],
    queryFn: async () => Contentful.Media.getAll(space, environment),
    enabled: !!space,
  });
};

export const useMedium = (assetID?: string) => {
  const [space] = useSpace();
  const [environment] = useEnv();

  return useQuery({
    queryKey: ['asset', space, environment, assetID],
    queryFn: async () => Contentful.Media.getByID(space, environment, assetID),
    enabled: !!space && !!environment && !!assetID,
  });
};
