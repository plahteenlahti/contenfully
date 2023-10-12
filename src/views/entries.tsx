import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Entry } from '../components/entry/entry';
import { RefreshControl } from '../components/shared/refresh-control';
import { useEntries } from '../hooks/entry';
import { useDefaultLocale } from '../hooks/locales';
import { useModels } from '../hooks/models';
import { ContentStackParamList } from '../navigation/navigation';
import { font } from '../styles';
import { StyledFlatList } from '../components/shared/flatlist';
import { Card } from '../components/card/Card';
import Animated, { FadeIn } from 'react-native-reanimated';

export type ContentViewNavigationProp = NativeStackScreenProps<
  ContentStackParamList,
  'Entries'
>;

type Props = {
  navigation: ContentViewNavigationProp['navigation'];
};

export const Content: FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const entries = useEntries();
  const locale = useDefaultLocale();
  const models = useModels();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerSearchBarOptions: {
  //       onSearchButtonPress: event => setSearch(event.nativeEvent.text),
  //       onCancelButtonPress: () => setSearch(undefined),
  //     },
  //   });
  // }, [navigation]);

  return (
    <StyledFlatList
      className="px-2 py-2"
      contentContainerStyle="bg-white rounded-md px-2 py-2"
      contentInset={{ top: 200 }}
      refreshControl={
        <RefreshControl
          refreshing={entries.isRefetching}
          onRefresh={entries.refetch}
        />
      }
      ListHeaderComponent={() => (
        <HContainer horizontal>
          {models.data?.items?.map(model => (
            <ModelButton key={model.sys.id}>
              <ButtonText>{model.name}</ButtonText>
            </ModelButton>
          ))}
        </HContainer>
      )}
      ListEmptyComponent={
        <Animated.View entering={FadeIn} className="bg-white p-4">
          <Text className="mb-4 text-center text-lg text-gray-800">
            No entries to show
          </Text>
          <Text className="text-center text-sm text-gray-500">
            This Contentful space does not contain any entries. Try changing
            space or environment.
          </Text>
        </Animated.View>
      }
      data={entries.data?.entries}
      ItemSeparatorComponent={Card.Divider}
      renderItem={({ item }) => (
        <Entry locale={locale.data?.code} entry={item} key={item?.sys?.id} />
      )}
      ListFooterComponent={
        entries.isFetchingNextPage ? <ActivityIndicator /> : null
      }
      progressViewOffset={100}
      onEndReached={() => entries.fetchNextPage()}
    />
  );
};

const HContainer = styled.ScrollView`
  flex-direction: row;
  background-color: white;
  border-radius: 8px;
  padding: 8px 16px;
`;

const ModelButton = styled.TouchableOpacity`
  flex: 1;
  padding: 8px 8px;
`;

const ButtonText = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-family: ${font.regular};
`;
