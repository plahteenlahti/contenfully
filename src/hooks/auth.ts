import { AuthConfiguration } from 'react-native-app-auth';
import { useQuery } from 'react-query';

export const useAuthConfig = () => {
  return useQuery<AuthConfiguration>(['oauth'], () => {
    fetch('https://netli.fyi/.netlify/functions/contentfully-auth');
  });
};
