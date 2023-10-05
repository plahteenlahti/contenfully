import { useActionSheet } from '@expo/react-native-action-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Card } from '../components/card/Card';
import { useContentfulUser } from '../hooks/user';
import { useUpdateWebhook, useWebhook } from '../hooks/webhooks';
import { SpaceStackParamList } from '../navigation/navigation';
import { useUserRefresh } from '../hooks/refresh';
import { RefreshControl, Text, View } from 'react-native';

export type WebhookScreenProps = NativeStackScreenProps<
  SpaceStackParamList,
  'Webhook'
>;

type Props = {
  route: WebhookScreenProps['route'];
  navigation: WebhookScreenProps['navigation'];
};

export const Webhook: FC<Props> = ({
  route: {
    params: { webhookID },
  },
  navigation,
}) => {
  const webhook = useWebhook(webhookID);
  const updatedBy = useContentfulUser(webhook.data?.sys.updatedBy.sys.id);
  const createdBy = useContentfulUser(webhook.data?.sys.createdBy.sys.id);
  const update = useUpdateWebhook();
  const { handleRefresh, refreshing } = useUserRefresh(webhook.refetch);
  const { showActionSheetWithOptions } = useActionSheet();

  const handleDelete = () => {
    showActionSheetWithOptions(
      {
        options: ['Delete', 'Cancel'],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          navigation.navigate('Space');
        }
      },
    );
  };

  const changeValue = (field: string, value: boolean) => {
    if (webhook.data) {
      update.mutate({
        fields: {
          [field]: value,
        },
        webhookID: webhook.data.sys.id,
        version: webhook.data.sys.version,
      });
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }>
      <Card.OuterContainer>
        <Card.Title>Webhook</Card.Title>
        <Card>
          <Card.DetailRow
            title="URL"
            column
            valueProps={{
              dataDetectorType: 'link',
              ellipsizeMode: 'tail',
              selectable: true,
              numberOfLines: 1,
            }}
            subtitle={webhook.data?.url}
          />
          <Card.Divider />
          <Card.DetailRow
            title="Topics"
            subtitle={webhook.data?.topics?.join(',')}
          />
          <View>
            <Text>Headers</Text>
            {webhook.data?.headers?.map(header => (
              <View key={header.key}>
                <Text>{header.key}</Text>
                <Text>{header.value}</Text>
              </View>
            ))}
          </View>

          <Card.Divider />
          <Card.ToggleRow
            title="Active"
            value={webhook.data?.active}
            onChange={() => changeValue('active', !webhook.data?.active)}
          />
        </Card>
      </Card.OuterContainer>
      <Card.OuterContainer>
        <Card.Title>Actions</Card.Title>
        <Card>
          <Card.ButtonRow
            text="Delete webhook"
            destructive
            onPress={handleDelete}
          />
        </Card>
      </Card.OuterContainer>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;
