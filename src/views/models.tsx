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
  // const [, setSearch] = useState<undefined | string>(undefined);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerSearchBarOptions: {
  //       onSearchButtonPress: event => setSearch(event.nativeEvent.text),
  //       onCancelButtonPress: () => setSearch(undefined),
  //     },
  //   });
  // }, [navigation]);

  const renderItem: ListRenderItem<Model> = useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity
          className=" py-2"
          key={item.sys.id}
          onPress={() =>
            navigation.navigate('Model', { modelID: item.sys.id })
          }>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-medium text-gray-500">
              {item.name}
            </Text>
            <Text className="text-xs font-medium text-gray-500">
              {localizedFormatDate(new Date(item.sys.createdAt))}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="flex-1 pr-4 text-xs font-medium text-gray-500">
              {item.description || '-'}
            </Text>
            <Text className="text-xs font-medium text-gray-500">
              {localizedFormatDate(new Date(item.sys.updatedAt))}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation],
  );

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
      data={models.data?.items}
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
