import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { useEnvironment } from '../../hooks/environment';
import { setEnvironment, setSpace } from '../../storage/reducers/space';
import { useAppDispatch } from '../../storage/store';
import { z } from 'zod';
import { SpaceSchema } from '../../schemas/space';
import { useEnvAtom, useSpaceAtom } from '../../storage/jotai/atoms';

type Props = {
  space: z.infer<typeof SpaceSchema>;
  id: string;
  navigation: DrawerNavigationHelpers;
};

export const SpaceCard: FC<Props> = ({ space, id, navigation }) => {
  const environment = useEnvironment(id);
  const dispatch = useAppDispatch();
  const [_space, setSpace] = useSpaceAtom();
  const [_env, setEnv] = useEnvAtom();

  const navigateToSpace = (environmentID: string) => {
    setSpace(id);
    setEnv(environmentID);
    navigation.navigate('Space', { id });
  };

  return (
    <View className="mx-2 my-2 rounded-md bg-gray-100 px-2 py-2">
      <Text className="mb-1 text-base font-medium text-gray-800">
        {space.name}
      </Text>
      <Text className="text-sm text-gray-600">{space.sys.id}</Text>
      {environment.data?.items?.map(env => {
        return (
          <TouchableOpacity
            className="flex-1 py-2"
            key={env.sys.id}
            onPress={() => navigateToSpace(env.sys.id)}>
            <Text className="text-right text-sm text-gray-600">{env.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const SpaceName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Environment = styled.TouchableOpacity`
  padding: 8px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
  border-bottom-width: 1px;
`;
