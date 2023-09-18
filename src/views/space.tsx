import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { Locales } from '../components/locale/Locales';
import { AllUsers } from '../components/user/all-users';

import { ScrollView } from 'react-native';
import { SpaceStackParamList } from '../navigation/navigation';
import { SpaceDetails } from '../components/space/SpaceDetails';
import { WebhooksOverview } from '../components/webhooks/WebhooksOverview';

export type SpaceScreenProps = NativeStackScreenProps<
  SpaceStackParamList,
  'Space'
>;

export const Space: FC<SpaceScreenProps> = ({ navigation }) => {
  return (
    <ScrollView>
      <SpaceDetails />
      <WebhooksOverview />
      <Locales navigation={navigation} />
      <AllUsers />
    </ScrollView>
  );
};
