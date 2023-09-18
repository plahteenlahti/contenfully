import { useQuery } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';
import { useAppSelector } from '../storage/store';

export const useSpaces = () =>
  useQuery(['spaces'], async () => await Contentful.Spaces.getAll());

export const useSpace = () => {
  const {
    space: { space },
  } = useAppSelector(state => state);

  return useQuery(
    ['spaces', space],
    async () => await Contentful.Spaces.getById(space),
  );
};
