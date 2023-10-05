import React from 'react';
import { Text, View } from 'react-native';
import { useLocales, usePrefetchLocale } from '../../hooks/locales';
import { Card } from '../card/Card';
import { SpaceScreenProps } from '../../views/space';
import { RenderWithDividers } from '../shared/list-renderer';

const LocaleCard = (item, navigation, prefetch) => {
  return (
    <Card.ListItem
      key={item.sys.id}
      onPressIn={() => prefetch(item.sys.id)}
      onPress={() => {
        navigation.navigate('Locale', {
          localeID: item.sys.id,
          title: item.name,
        });
      }}>
      <View className="flex-row px-2">
        <Text className="text-sm font-medium text-gray-800">{item.name}</Text>
        {item.default && (
          <View className="ml-2 rounded-full bg-gray-300 px-2 py-0.5">
            <Text className="text-xs font-medium text-gray-600">Default</Text>
          </View>
        )}
      </View>
      <View className="px-2">
        <Text className="text-xs text-gray-500">{`${item.code}`}</Text>
      </View>
    </Card.ListItem>
  );
};

export const Locales = ({
  navigation,
}: Pick<SpaceScreenProps, 'navigation'>) => {
  const locales = useLocales();
  const prefetch = usePrefetchLocale();
  return (
    <Card.OuterContainer>
      <Card.Title>Locales</Card.Title>
      <Card>
        {/* <RenderWithDividers
          items={locales.data?.items}
          renderItem={LocaleCard}
          divider={Card.Divider}
        /> */}
        {locales.data?.items?.map(item => (
          <Card.ListItem
            key={item.sys.id}
            onPressIn={() => prefetch(item.sys.id)}
            onPress={() => {
              navigation.navigate('Locale', {
                localeID: item.sys.id,
                title: item.name,
              });
            }}>
            <View className="flex-row px-2">
              <Text className="text-sm font-medium text-gray-800">
                {item.name}
              </Text>
              {item.default && (
                <View className="ml-2 rounded-full bg-gray-300 px-2 py-0.5">
                  <Text className="text-xs font-medium text-gray-600">
                    Default
                  </Text>
                </View>
              )}
            </View>
            <View className="px-2">
              <Text className="text-xs text-gray-500">{`${item.code}`}</Text>
            </View>
          </Card.ListItem>
        ))}
      </Card>
    </Card.OuterContainer>
  );
};
