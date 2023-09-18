import { useQuery } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';
import { useAppSelector } from '../storage/store';

export const useUser = () => {
  return useQuery(['user'], async () => Contentful.Me.get());
};

export const useContentfulUser = (userId?: string) => {
  const {
    space: { space },
  } = useAppSelector(state => state);

  return useQuery(
    ['user', userId],
    async () => await Contentful.Users.getById(space, userId),
    {
      enabled: !!space && !!userId,
    },
  );
};

export const useUsers = () => {
  const {
    space: { space },
  } = useAppSelector(state => state);

  return useQuery(
    ['users', space],
    async () => await Contentful.Users.getAll(space),
    {
      enabled: !!space,
    },
  );
};
