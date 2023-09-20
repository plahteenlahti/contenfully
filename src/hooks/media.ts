import { useQuery } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';
import { useEnvAtom, useSpaceAtom } from '../storage/jotai/atoms';

const BASE_URL = 'https://api.contentful.com';

export const useAssets = () => {
  const [space] = useSpaceAtom();
  const [environment] = useEnvAtom();

  return useQuery(
    ['assets', space],
    async () => Contentful.Assets.getAll(space, environment),
    { enabled: !!space },
  );
};

export const useAsset = (assetID?: string) => {
  const [space] = useSpaceAtom();
  const [environment] = useEnvAtom();

  return useQuery(
    ['asset', space, environment, assetID],
    async () => Contentful.Assets.getByID(space, environment, assetID),

    { enabled: !!space && !!environment && !!assetID },
  );
};
