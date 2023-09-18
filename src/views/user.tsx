import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import styled, { css } from 'styled-components/native';
import { Card } from '../components/card/Card';
import { Container } from '../components/shared/container';
import { Skeleton } from '../components/shared/skeleton';
import { useContentfulUser } from '../hooks/user';
import { SpaceStackParamList } from '../navigation/navigation';
import { font } from '../styles';
import { localizedFormatDate } from '../utilities/time';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';

export type SpaceScreenProps = NativeStackScreenProps<
  SpaceStackParamList,
  'User'
>;

type Props = {
  route: SpaceScreenProps['route'];
  navigation: SpaceScreenProps['navigation'];
};

export const User: FC<Props> = ({
  route: {
    params: { userID },
  },
}) => {
  const user = useContentfulUser(userID);

  return (
    <ScrollView>
      <Image
        className="rounded-full h-20 w-20"
        source={{ uri: user.data?.avatarUrl }}
      />
      <Card.OuterContainer>
        <Card.Title>Basic information</Card.Title>
        <Card>
          <Card.DetailRow
            title="Account created"
            subtitle={
              user.data?.sys.createdAt &&
              localizedFormatDate(new Date(user.data?.sys.createdAt))
            }
          />
          <Card.Divider />
          <Card.DetailRow
            title="Details updated"
            subtitle={
              user.data?.sys.updatedAt &&
              localizedFormatDate(new Date(user.data?.sys.updatedAt))
            }
          />
          <Card.Divider />
          <Card.DetailRow title="Email" subtitle={user.data?.email} />
          <Card.Divider />
          <Card.DetailRow
            title="Login count"
            subtitle={user.data?.signInCount}
          />
          <Card.Divider />
          <Card.DetailRow
            title="Account Activated"
            subtitle={user.data?.activated ? 'Yes' : 'No'}
          />
          <Card.Divider />
          <Card.DetailRow
            title="Account Confirmed"
            subtitle={user.data?.confirmed ? 'Yes' : 'No'}
          />
          <Card.Divider />
          <Card.DetailRow
            title="2-factor enabled"
            subtitle={user.data?.['2faEnabled'] ? 'Yes' : 'No'}
          />
        </Card>
      </Card.OuterContainer>
    </ScrollView>
  );
};
