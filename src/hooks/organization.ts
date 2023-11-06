import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Contentful } from '../services/contentful';
import { useSpace as useSpaceMMKV } from '../storage/store';

export const useSpaces = () =>
  useQuery({
    queryKey: ['spaces'],
    queryFn: async () => await Contentful.Spaces.getAll(),
  });

export const useSpace = () => {
  const [spaceID] = useSpaceMMKV();

  return useQuery({
    queryKey: ['spaces', spaceID],
    queryFn: async () => await Contentful.Spaces.getById(spaceID),
    enabled: !!spaceID,
  });
};
