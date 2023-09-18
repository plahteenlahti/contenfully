import { atomWithMMKV } from './storage';

type Token = {
  email: string;
  content: string;
};

export const tokenAtom = atomWithMMKV<Token | null>('current-token', {
  email: 'perttu@nyxo.fi',
  content: 'CFPAT-Q-hDRsYWwC2LRys-QMYBbzAjXse_N6BwwpCdvFcrFZY',
});
