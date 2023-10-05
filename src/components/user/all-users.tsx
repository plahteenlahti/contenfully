import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useUser, useUsers } from '../../hooks/user';
import { SpaceScreenProps } from '../../views/space';
import { Card } from '../card/Card';
import { Chevron } from '../icons/chevron';

const nameOrEmail = (
  email: string,
  firstName?: string | null,
  lastName?: string | null,
): string => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else if (firstName) {
    return firstName;
  } else {
    return email;
  }
};

export const AllUsers = () => {
  const users = useUsers();
  const you = useUser();
  const navigation = useNavigation<SpaceScreenProps['navigation']>();

  return (
    <Card.OuterContainer>
      <Card.Title>Users</Card.Title>
      <Card className="pt-2">
        {users.data?.items?.map((user, index) => (
          <TouchableOpacity
            className="flex-row items-center px-2"
            key={user.sys.id}
            onPress={() =>
              navigation.navigate('User', {
                userID: user.sys.id,
                name: nameOrEmail(user.email, user.firstName, user.lastName),
              })
            }>
            <Image
              className="mr-4 h-6 w-6 rounded-full"
              resizeMode="cover"
              source={{ uri: user?.avatarUrl }}
            />
            <View
              className={`flex-1 pb-2 ${
                index !== users.data?.items?.length - 1
                  ? 'mb-1 border-b border-gray-100'
                  : ''
              }`}>
              <View className="flex-row items-center gap-2">
                <Text className="text-sm font-medium text-gray-800">
                  {nameOrEmail(user.email, user.firstName, user.lastName)}
                </Text>

                {you.data?.sys.id === user.sys.id && (
                  <View className="rounded-full bg-gray-300 px-2 py-0.5">
                    <Text className="text-xs font-medium text-gray-600">
                      You
                    </Text>
                  </View>
                )}
              </View>
              <Text className="text-xs leading-4 text-gray-600">
                {user?.email}
              </Text>
            </View>
            <Chevron />
          </TouchableOpacity>
        ))}
      </Card>
    </Card.OuterContainer>
  );
};
