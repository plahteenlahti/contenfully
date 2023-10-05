import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Contentful } from '../services/contentful';
import { useSpace as useSpaceMMKV } from '../storage/store';

export const useSpaces = () =>
  useQuery(['spaces'], async () => await Contentful.Spaces.getAll());

export const useSpace = () => {
  const [spaceID] = useSpaceMMKV();

  return useQuery(
    ['spaces', spaceID],
    async () => await Contentful.Spaces.getById(spaceID),
    {
      enabled: !!spaceID,
    },
  );
};
