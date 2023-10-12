import React from 'react';
import { Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useWebhooks } from '../../hooks/webhooks';
import { Card } from '../card/Card';
import { WebhookItem } from './webhook-item';

export const WebhooksOverview = () => {
  const webhooks = useWebhooks();

  return (
    <Card.OuterContainer>
      <Card.Title>Webhooks</Card.Title>

      <Card className="h-32 overflow-hidden">
        {webhooks.isError && (
          <Animated.View className="p-8" entering={FadeIn} exiting={FadeOut}>
            <Text className="text-center text-base text-gray-700">
              There was a problem updating webhooks
            </Text>
            <Text className="mt-2 text-center text-xs text-gray-500">
              It seems that you're not currently connected to the internet.
            </Text>
          </Animated.View>
        )}
        {webhooks.data?.items.map(hook => (
          <Animated.View entering={FadeIn}>
            <WebhookItem key={hook?.sys?.id} hook={hook} />
          </Animated.View>
        ))}
      </Card>
    </Card.OuterContainer>
  );
};
