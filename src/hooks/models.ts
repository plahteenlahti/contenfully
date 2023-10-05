import { useQuery } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';
import { useEnv, useSpace } from '../storage/store';

export const useModels = () => {
  const [space] = useSpace();
  const [environment] = useEnv();

  return useQuery(
    ['models', space, environment],
    async () => await Contentful.Models.getAll(space, environment),
    { enabled: !!space && !!environment },
  );
};

export const useModel = (modelID?: string) => {
  const [space] = useSpace();
  const [environment] = useEnv();

  return useQuery(
    ['models', space, environment, modelID],
    async () => await Contentful.Models.getById(space, environment, modelID),
    { enabled: !!space && !!modelID && !!environment },
  );
};
