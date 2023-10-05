import { useQuery } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';
import { useAtomValue } from 'jotai';
import { spaceAtom } from '../storage/jotai/atoms';
import { useSpace } from '../storage/store';

export const useUser = () => {
  return useQuery(['user'], async () => Contentful.Me.get());
};

export const useContentfulUser = (userId?: string) => {
  const [space] = useSpace();

  return useQuery(
    ['user', userId],
    async () => await Contentful.Users.getById(space, userId),
    {
      enabled: !!space && !!userId,
    },
  );
};

export const useUsers = () => {
  const [space] = useSpace();

  return useQuery(
    ['users', space],
    async () => await Contentful.Users.getAll(space),
    {
      enabled: !!space,
    },
  );
};
