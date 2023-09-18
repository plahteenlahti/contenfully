import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../storage/store';
import { Contentful } from '../services/contentful';

export const useModels = () => {
  const {
    space: { space, environment },
  } = useAppSelector(state => state);

  return useQuery(
    ['models', space, environment],
    async () => await Contentful.Models.getAll(space, environment),
    { enabled: !!space },
  );
};

export const useModel = (modelID?: string) => {
  const {
    space: { space, environment },
  } = useAppSelector(state => state);

  return useQuery(
    ['models', space, environment, modelID],
    async () => await Contentful.Models.getById(space, environment, modelID),

    { enabled: !!space && !!modelID },
  );
};
