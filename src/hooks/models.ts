import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../storage/store';
import { Contentful } from '../services/contentful';
import { useEnvAtom, useSpaceAtom } from '../storage/jotai/atoms';

export const useModels = () => {
  const [space] = useSpaceAtom();
  const [environment] = useEnvAtom();

  return useQuery(
    ['models', space, environment],
    async () => await Contentful.Models.getAll(space, environment),
    { enabled: !!space && !!environment },
  );
};

export const useModel = (modelID?: string) => {
  const [space] = useSpaceAtom();
  const [environment] = useEnvAtom();

  return useQuery(
    ['models', space, environment, modelID],
    async () => await Contentful.Models.getById(space, environment, modelID),
    { enabled: !!space && !!modelID && !!environment },
  );
};
