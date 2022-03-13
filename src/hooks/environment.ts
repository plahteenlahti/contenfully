import { useQuery } from 'react-query';
import { BASE_URL } from '../constants/constants';
import { useAppSelector } from '../storage/store';

type Organization = {};

type Response = {
  sys: {
    type: 'Array';
  };
  total: number;
  skip: number;
  limit: number;
  items: {
    name: string;
    sys: {
      createdAt: string;
      createdBy: {
        sys: { id: string; linkType: string; type: string };
      };
      id: string;
      space: {
        sys: { id: string; linkType: string; type: string };
      };
      status: {
        sys: { id: string; linkType: string; type: string };
      };
      type: string;
      updatedAt: string;
      updatedBy: {
        sys: { id: string; linkType: string; type: string };
      };
      version: number;
    };
  }[];
};

export const useEnvironments = () => {
  const {
    tokens: { selected },
    space: { space },
  } = useAppSelector(state => state);

  return useQuery<Response, Error, Response['items']>(
    ['environment', space],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/spaces/${space}/environments`,
          {
            headers: {
              Authorization: `Bearer ${selected?.content}`,
            },
          },
        );

        return response.json();
      } catch (error) {
        return error;
      }
    },
    {
      enabled: !!space,
      select: data => data.items,
    },
  );
};
