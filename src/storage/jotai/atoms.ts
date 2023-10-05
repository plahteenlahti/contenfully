import { useAtom } from 'jotai';
import { atomWithMMKV } from './storage';

type Token = {
  email: string;
  content: string;
};

export const tokenAtom = atomWithMMKV<Token | null>('current-token', null);

export const useTokenAtom = () => useAtom(tokenAtom);

type Space = string;

export const spaceAtom = atomWithMMKV<Space | null>('current-space', null);

export const useSpaceAtom = () => useAtom(spaceAtom);

type Environment = string;

export const envAtom = atomWithMMKV<Environment | null>('current-env', null);

export const useEnvAtom = () => useAtom(envAtom);
