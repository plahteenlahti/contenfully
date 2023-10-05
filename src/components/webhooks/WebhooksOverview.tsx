import React from 'react';
import { useCreateNotifications } from '../../hooks/notification';
import { useWebhooks } from '../../hooks/webhooks';
import { Card } from '../card/Card';
import { WebhookItem } from './webhook-item';

export const WebhooksOverview = () => {
  const webhooks = useWebhooks();
  const { mutate: createH } = useCreateNotifications();

  return (
    <Card.OuterContainer>
      <Card.Title>Webhooks</Card.Title>

      <Card className="overflow-hidden">
        {webhooks.data?.items.map(hook => (
          <WebhookItem key={hook?.sys?.id} hook={hook} />
        ))}
      </Card>
    </Card.OuterContainer>
  );
};
