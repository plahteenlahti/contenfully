import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Entry } from '../components/entry/entry';
import { RefreshControl } from '../components/shared/refresh-control';
import { useEntries } from '../hooks/entry';
import { useDefaultLocale } from '../hooks/locales';
import { useModels } from '../hooks/models';
import { ContentStackParamList } from '../navigation/navigation';
import { font } from '../styles';

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

  console.log(JSON.stringify(locale.error, undefined, 2));

  return (
    <FlatList
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
      data={entries.data?.entries}
      renderItem={({ item }) => (
        <Entry locale={locale.data?.code} entry={item} key={item?.sys?.id} />
      )}
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
