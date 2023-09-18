import React from 'react';
import { useSpace } from '../../hooks/organization';
import { useContentfulUser } from '../../hooks/user';
import { localizedFormatDate } from '../../utilities/time';
import { Card } from '../card/Card';
import { useNavigation } from '@react-navigation/native';
import { SpaceScreenProps } from '../../views/space';

export const SpaceDetails = () => {
  const space = useSpace();
  const navigation = useNavigation<SpaceScreenProps['navigation']>();
  const updatedBy = useContentfulUser(space.data?.sys.updatedBy.sys.id);

  return (
    <Card.OuterContainer>
      <Card.Title>Space</Card.Title>
      <Card>
        <Card.DetailRow title="Name" subtitle={space.data?.name} />
        <Card.Divider />
        <Card.DetailRow
          title="Created"
          subtitle={
            space.data?.sys.createdAt &&
            localizedFormatDate(new Date(space.data?.sys.createdAt))
          }
        />
        <Card.Divider />
        <Card.DetailRow
          title="Last Updated"
          subtitle={
            space.data?.sys.updatedAt &&
            localizedFormatDate(new Date(space.data?.sys.updatedAt))
          }
        />
        <Card.Divider />
        <Card.DetailRow
          onPress={() =>
            navigation.navigate('User', {
              userID: space.data?.sys.updatedBy.sys.id,
              name: updatedBy.data?.email,
            })
          }
          title="Last updated by"
          subtitle={updatedBy.data?.email}
        />
      </Card>
    </Card.OuterContainer>
  );
};
