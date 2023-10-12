import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Card } from '../components/card/Card';
import {
  TitleContainer,
  UnpaddedContainer,
} from '../components/shared/container';
import { ListButton, ListButtonText } from '../components/shared/text-button';
import { CardTitle } from '../components/shared/typography';
import { useEntry, useUnpublishEntry } from '../hooks/entry';
import { useDefaultLocale } from '../hooks/locales';
import { ContentStackParamList } from '../navigation/navigation';
import { font } from '../styles';
import { fieldResolver } from '../utilities/field-resolver';
import { localizedFormatDate } from '../utilities/time';
import { useContentfulUser } from '../hooks/user';
import { useNavigation } from '@react-navigation/native';
import { Entry } from '../schemas/entry';

type Props = NativeStackScreenProps<ContentStackParamList, 'Entry'>;

const Fields = (fields: Entry['fields']) => {
  return <></>;
};

export const EntryView: FC<Props> = ({
  navigation,
  route: {
    params: { entryID },
  },
}) => {
  const entry = useEntry(entryID);
  const locale = useDefaultLocale();
  const updatedBy = useContentfulUser(entry.data?.sys.updatedBy.sys.id);
  const { mutate, error } = useUnpublishEntry();

  const renderField = () => {
    switch (true) {
      case true:
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <ScrollView>
      <Card.OuterContainer>
        <Card.Title>Info</Card.Title>
        <Card>
          <Card.DetailRow
            title="Updated last by"
            onPress={() =>
              navigation.navigate('User', {
                userID: updatedBy.data.sys.id,
                name: 'user',
              })
            }
            subtitle={updatedBy.data?.email}
          />
          <Card.Divider />
          <Card.DetailRow
            title="Updated last at"
            subtitle={
              entry.data?.sys.updatedAt &&
              localizedFormatDate(new Date(entry.data?.sys.updatedAt))
            }
          />
        </Card>
      </Card.OuterContainer>

      <Card.OuterContainer>
        <Card.Title>Metadata</Card.Title>
        <Card>
          <View className="flex-row border-b border-b-gray-200 py-2">
            <Column>
              <Value>
                {entry.data?.sys.publishedAt &&
                  localizedFormatDate(new Date(entry.data?.sys.createdAt))}
              </Value>
              <Title>Created</Title>
            </Column>

            <Column>
              <Value>
                {entry.data?.sys.updatedAt &&
                  localizedFormatDate(new Date(entry.data?.sys.updatedAt))}
              </Value>
              <Title>Updated</Title>
            </Column>

            <Column last>
              <Value>
                {entry.data?.sys.publishedAt &&
                  localizedFormatDate(new Date(entry.data?.sys.publishedAt))}
              </Value>
              <Title>Published</Title>
            </Column>
          </View>

          <View className="mx-2 flex-row pb-2">
            <View className="flex-1 border-r border-r-gray-200 py-2">
              <Text className="mb-1 text-sm text-gray-600">
                {entry.data?.sys.publishedCounter}
              </Text>
              <Title>Publish counter</Title>
            </View>

            <Column>
              <Value>{entry.data?.sys.publishedVersion}</Value>
              <Title>Published version</Title>
            </Column>

            <Column last>
              <Value>{entry.data?.sys.version}</Value>
              <Title>Version</Title>
            </Column>
          </View>
        </Card>
      </Card.OuterContainer>

      <Card.OuterContainer>
        <Card.Title>Fields</Card.Title>
        <Card>
          {entry.data &&
            Object.keys(entry.data?.fields).map(fieldKey => (
              <View key={`${entry.data?.sys.id}_${fieldKey}`}>
                <Text className="text-sm font-medium text-gray-700">
                  {fieldKey}
                </Text>
                <FieldContent>
                  {locale.data?.code &&
                    fieldResolver(
                      entry.data?.fields[fieldKey][locale.data?.code],
                    )}
                </FieldContent>
              </View>
            ))}
        </Card>
      </Card.OuterContainer>

      <TitleContainer>
        <CardTitle>Actions</CardTitle>
      </TitleContainer>
      <UnpaddedContainer>
        <ListButton
          onPress={() =>
            mutate({
              entryID,
              unpublish: false,
              version: entry.data?.sys.version,
            })
          }>
          <ListButtonText>Unpublish entry</ListButtonText>
        </ListButton>
        <ListButton noBorder>
          <ListButtonText>Archive entry</ListButtonText>
        </ListButton>
      </UnpaddedContainer>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView`
  padding-top: 128px;
`;

const Field = styled.View``;

const FieldTitle = styled.Text`
  margin: 8px 0px 4px;
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${font.medium};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const FieldContent = styled.Text``;

const Row = styled.View`
  padding-bottom: 8px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
`;

const BottomRow = styled.View`
  margin: 8px 0px 32px;
  padding-bottom: 8px;
  flex-direction: row;
`;

type ColumnProps = {
  last?: boolean;
};

const Column = styled.View<ColumnProps>`
  flex: 1;
  padding: 0px 8px;
  ${({ last }) =>
    !last &&
    css`
      border-right-width: 1px;
      border-right-color: ${({ theme }) => theme.colors.gray[200]};
    `}
`;

const Value = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[600]};
  font-family: ${font.medium};
  margin-bottom: 4px;
`;

const Title = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[500]}
  font-family: ${font.regular};
`;
