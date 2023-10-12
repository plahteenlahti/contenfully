import { Text } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { localizedFormatDate } from '../../utilities/time';
import { z } from 'zod';
import { ModelSchema } from '../../schemas/contentful';

type Model = z.infer<typeof ModelSchema>;

type Props = {
  item: Model;
};

export const ModelListItem = ({ item, navigation }: Props) => {
  return (
    <TouchableOpacity
      className=" py-2"
      key={item.sys.id}
      onPress={() => navigation.navigate('Model', { modelID: item.sys.id })}>
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-medium text-gray-500">{item.name}</Text>
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
};
