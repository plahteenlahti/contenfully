import { atomWithMMKV } from './storage';
import { useAtom } from 'jotai';

type Token = {
  email: string;
  content: string;
};

export const tokenAtom = atomWithMMKV<Token | null>('current-token', null);

export const useTokenAtom = () => useAtom(tokenAtom);

type Space = string;

export const spaceToken = atomWithMMKV<Space | null>('current-space', null);

export const useSpaceAtom = () => useAtom(spaceToken);

type Environment = string;

export const envToken = atomWithMMKV<Environment | null>('current-space', null);

export const useEnvAtom = () => useAtom(envToken);
