import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { useModel } from '../../hooks/models';
import { EntrySchema } from '../../schemas/entry';
import { Code } from '../../schemas/locale';
import { formatTimestamp } from '../../utilities/time';
import { ContentViewNavigationProp } from '../../views/entries';
import { Chevron } from '../icons/chevron';
import { Draft, Published } from '../shared/published';

type Props = {
  locale: z.infer<typeof Code> | undefined | null;
  entry?: z.infer<typeof EntrySchema>;
};

export const Entry: FC<Props> = ({ entry, locale }) => {
  const model = useModel(entry?.sys?.contentType?.sys?.id);
  const navigation = useNavigation<ContentViewNavigationProp['navigation']>();

  const navigate = useCallback(() => {
    navigation.navigate('Entry', { entryID: `${entry?.sys.id}` });
  }, []);

  return (
    <TouchableOpacity
      className="flex-row bg-white px-2 py-2"
      onPress={navigate}>
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          {model.data?.displayField && locale && (
            <Text className="text-sm font-medium text-gray-700">
              {entry?.fields?.[model.data?.displayField]?.[locale]}
            </Text>
          )}
          {entry?.sys?.updatedAt === entry?.sys.publishedAt ? (
            <Published />
          ) : (
            <Draft />
          )}
        </View>
        <Text className="text-xs font-normal text-gray-500">
          {entry?.sys.updatedAt && formatTimestamp(entry?.sys.updatedAt)}
        </Text>
      </View>
      <Chevron />
    </TouchableOpacity>
  );
};
