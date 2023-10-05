import { useMMKVObject, useMMKVString } from 'react-native-mmkv';
import { storage } from '../../App';

type Token = {
  email: string;
  content: string;
};

export const useToken = () => useMMKVObject<Token>('current-token', storage);

export const useSpace = () => useMMKVString('current-space', storage);

export const useEnv = () => useMMKVString('current-env', storage);
