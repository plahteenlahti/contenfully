import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { z } from 'zod';
import { Card } from '../components/card/Card';
import { RefreshControl } from '../components/shared/refresh-control';
import { useModels } from '../hooks/models';
import { ModelStackParamList } from '../navigation/navigation';
import { ModelSchema } from '../schemas/contentful';
import { localizedFormatDate } from '../utilities/time';
import { styled } from 'nativewind';
import { ModelListItem } from '../components/model/ModelListItem';

type Model = z.infer<typeof ModelSchema>;

const StyledFlatList = styled(FlatList, {
  props: {
    contentContainerStyle: true,
  },
});

export const Models = ({
  navigation,
}: NativeStackScreenProps<ModelStackParamList, 'Models'>) => {
  const models = useModels();

  const renderItem: ListRenderItem<Model> = ({ item }) => {
    return <ModelListItem item={item} navigation={navigation} />;
  };

  const divider = useCallback(() => <Card.Divider />, []);

  return (
    <StyledFlatList
      ItemSeparatorComponent={divider}
      className="px-2 py-2"
      contentContainerStyle="bg-white rounded-md px-2 py-2"
      ListHeaderComponent={
        <View className="mb-8">
          <View className="item-center mb-2 flex-row justify-between border-b border-b-gray-200 pb-2">
            <View>
              <Text className="text-sm font-semibold text-gray-800">Name</Text>
              <Text className="text-xs text-gray-600">Description</Text>
            </View>
            <View>
              <Text className="text-sm font-semibold text-gray-800">
                Created
              </Text>
              <Text className="text-xs text-gray-600">Updated</Text>
            </View>
          </View>
          <View className="gap-2" />
        </View>
      }
      ListEmptyComponent={<View></View>}
      data={models.data?.items ?? []}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          onRefresh={models.refetch}
          refreshing={models.isRefetching}
        />
      }
    />
  );
};
