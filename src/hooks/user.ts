import { useQuery } from '@tanstack/react-query';
import { Contentful } from '../services/contentful';
import { useAtomValue } from 'jotai';
import { spaceAtom } from '../storage/jotai/atoms';
import { useSpace } from '../storage/store';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => Contentful.Me.get(),
  });
};

export const useContentfulUser = (userId?: string) => {
  const [space] = useSpace();

  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => await Contentful.Users.getById(space, userId),
    enabled: !!space && !!userId,
  });
};

export const useUsers = (userId?: string) => {
  const [space] = useSpace();

  return useQuery({
    queryKey: ['users', userId],
    queryFn: async () => await Contentful.Users.getAll(space),
    enabled: !!space,
  });
};
