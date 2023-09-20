import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../constants/constants';
import { Contentful } from '../services/contentful';
import { useAppSelector } from '../storage/store';
import { useEnvAtom, useSpaceAtom } from '../storage/jotai/atoms';

export const useLocales = () => {
  const [space] = useSpaceAtom();
  const [environment] = useEnvAtom();

  return useQuery(
    ['locales', space, environment],
    async () => Contentful.Locale.getAll(space, environment),
    { enabled: !!space && !!environment },
  );
};

export const useLocale = (localeID: string) => {
  const [space] = useSpaceAtom();
  const [environment] = useEnvAtom();

  return useQuery(
    ['locale', space, environment],
    async () => Contentful.Locale.getByID(space, environment, localeID),
    { enabled: !!space && !!environment },
  );
};

export const useDefaultLocale = () => {
  const [space] = useSpaceAtom();
  const [environment] = useEnvAtom();

  return useQuery(
    ['locales', 'default', space, environment],
    async () => await Contentful.Locale.getAll(space, environment),
    {
      enabled: !!space && !!environment,
      select: data => data?.items?.find(item => item.default),
    },
  );
};
