import React, { FC } from 'react';
import { Button } from 'react-native';
import { useCreateNotifications } from '../../hooks/notification';
import { useDeleteWebhook, useWebhooks } from '../../hooks/webhooks';
import { useAppSelector } from '../../storage/store';
import { Container, TitleContainer } from '../shared/container';
import { CardTitle } from '../shared/typography';
import { WebhookItem } from './webhook-item';
import { Card } from '../card/Card';

export const WebhooksOverview = () => {
  const webhooks = useWebhooks();
  const { mutate: removeHook } = useDeleteWebhook();
  const { mutate: createH } = useCreateNotifications();

  return (
    <Card.OuterContainer>
      <Card.Title>Webhooks</Card.Title>

      <Card className="overflow-hidden">
        {webhooks.data?.items.map(hook => (
          <WebhookItem
            removeHook={removeHook}
            key={hook?.sys?.id}
            hook={hook}
          />
        ))}
      </Card>
    </Card.OuterContainer>
  );
};
