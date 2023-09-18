import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React, { FC } from 'react';
import { useSpaces } from '../../hooks/organization';
import { SpaceCard } from '../space/space-card';

export const DrawerContent: FC<DrawerContentComponentProps> = props => {
  const spaces = useSpaces();

  return (
    <DrawerContentScrollView {...props}>
      {spaces.data?.items?.map(item => (
        <SpaceCard
          navigation={props.navigation}
          key={item.sys.id}
          id={item.sys.id}
          space={item}
        />
      ))}

      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('Settings')}
      />
    </DrawerContentScrollView>
  );
};
