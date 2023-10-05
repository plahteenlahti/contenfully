import { useQuery } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';
import { useEnv, useSpace } from '../storage/store';

export const useMedia = () => {
  const [space] = useSpace();
  const [environment] = useEnv();

  return useQuery(
    ['assets', space],
    async () => Contentful.Media.getAll(space, environment),
    { enabled: !!space },
  );
};

export const useMedium = (assetID?: string) => {
  const [space] = useSpace();
  const [environment] = useEnv();

  return useQuery(
    ['asset', space, environment, assetID],
    async () => Contentful.Media.getByID(space, environment, assetID),

    { enabled: !!space && !!environment && !!assetID },
  );
};
