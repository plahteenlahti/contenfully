import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useLayoutEffect, useState } from 'react';
import { MediaItem } from '../components/media/media-item';
import { Container } from '../components/shared/container';
import { RefreshControl } from '../components/shared/refresh-control';
import { useDefaultLocale } from '../hooks/locales';
import { useMedia } from '../hooks/media';
import { AssetStackParamList } from '../navigation/navigation';
import { useUserRefresh } from '../hooks/refresh';
import { FlatList, ListRenderItem, ScrollView } from 'react-native';
import { z } from 'zod';
import { MediaSchema } from '../schemas/media';

export type AllMediaScreenProp = NativeStackScreenProps<
  AssetStackParamList,
  'Assets'
>;

export const Assets: FC<AllMediaScreenProp> = ({ navigation }) => {
  const [, setSearch] = useState<undefined | string>(undefined);
  const media = useMedia();
  const locale = useDefaultLocale();
  const { handleRefresh, refreshing } = useUserRefresh(media.refetch);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onSearchButtonPress: event => setSearch(event.nativeEvent.text),
        onCancelButtonPress: () => setSearch(undefined),
      },
    });
  }, [navigation]);

  const renderItem: ListRenderItem<z.infer<typeof MediaSchema>> = ({
    item,
  }) => (
    <MediaItem
      navigation={navigation}
      key={item.sys.id}
      locale={locale.data?.code}
      media={item}
    />
  );

  return (
    <FlatList
      contentInset={{ top: 200 }}
      className="pt-10"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      data={media.data?.items}
      renderItem={renderItem}
    />
  );
};
