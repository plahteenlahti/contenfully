import { useQuery } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';
import { useEnv, useSpace } from '../storage/store';

export const useModels = () => {
  const [space] = useSpace();
  const [environment] = useEnv();

  return useQuery({
    queryKey: ['models', space, environment],
    queryFn: async () => await Contentful.Models.getAll(space, environment),
    enabled: !!space && !!environment,
  });
};

export const useModel = (modelID?: string) => {
  const [space] = useSpace();
  const [environment] = useEnv();

  return useQuery({
    queryKey: ['models', space, environment, modelID],
    queryFn: async () =>
      await Contentful.Models.getById(space, environment, modelID),

    enabled: !!space && !!modelID && !!environment,
  });
};
