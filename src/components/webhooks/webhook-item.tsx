import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  RectButton,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { z } from 'zod';
import { WebhookSchema } from '../../schemas/webhook';
import { formatTimestamp } from '../../utilities/time';
import { SpaceScreenProps } from '../../views/space';
import { Chevron } from '../icons/chevron';
import { DeleteIcon } from '../icons/delete';

const WIDTH = Dimensions.get('window').width - 16;
const MAX_TRANSLATE = -80;

const springConfig = (velocity: number) => {
  'worklet';
  return {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    velocity,
  };
};

const timingConfig = {
  duration: 400,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

type Props = {
  hook: z.infer<typeof WebhookSchema>;
};

export const WebhookItem: FC<Props> = ({ hook, removeHook }) => {
  const navigation = useNavigation<SpaceScreenProps['navigation']>();
  const isRemoving = useSharedValue(false);
  const translateX = useSharedValue(0);

  type AnimatedGHContext = {
    startX: number;
  };
  const handler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    AnimatedGHContext
  >({
    onStart: (_evt, ctx) => {
      ctx.startX = translateX.value;
    },

    onActive: (evt, ctx) => {
      const nextTranslate = evt.translationX + ctx.startX;
      translateX.value = Math.min(0, Math.max(nextTranslate, MAX_TRANSLATE));
    },

    onEnd: evt => {
      if (evt.velocityX < -20) {
        translateX.value = withSpring(
          MAX_TRANSLATE,
          springConfig(evt.velocityX),
        );
      } else {
        translateX.value = withSpring(0, springConfig(evt.velocityX));
      }
    },
  });

  const styles = useAnimatedStyle(() => {
    if (isRemoving.value) {
      return {
        height: withTiming(0, timingConfig, () => {
          // runOnJS(deleteHook)();
        }),
        transform: [
          {
            translateX: withTiming(-WIDTH, timingConfig),
          },
        ],
      };
    }

    return {
      height: 45,
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const handleDelete = () => [(isRemoving.value = true)];

  return (
    <PanGestureHandler activeOffsetX={[-10, 10]} onGestureEvent={handler}>
      <Animated.View>
        <View className="absolute bottom-0 right-0 top-0 ">
          <View className="w-12 flex-1 items-center justify-center bg-red-500 ">
            <TouchableOpacity className="" onPress={handleDelete}>
              <DeleteIcon color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View style={styles}>
          <RectButton
            className="flex-row items-center bg-white px-2 py-2"
            onPress={() =>
              navigation.navigate('Webhook', {
                webhookID: hook?.sys?.id,
                title: `${hook?.name}`,
              })
            }>
            <View className="flex-1">
              <Text className="text-sm text-gray-700">{`${hook?.name}`}</Text>
              <Text className="text-xs text-gray-500">
                {formatTimestamp(hook?.sys.updatedAt)}
              </Text>
            </View>
            <Chevron />
          </RectButton>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};
