import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { MainStackParamList } from '../navigation/navigation';
import { Contentful } from '../services/contentful';
import { useToken } from '../storage/store';
import { font } from '../styles';

const icon = require('../assets/app-icon.png');

type Props = NativeStackScreenProps<MainStackParamList, 'Welcome'>;

type Form = {
  content: string | undefined;
};

export const Welcome: FC<Props> = ({ navigation }) => {
  const [token, setToken] = useToken();
  const [account, setAccount] = useState('');
  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<Form>({
    mode: 'onChange',
    defaultValues: {
      content: token?.content,
    },
  });

  const submit = async ({ content }: { content: undefined | string }) => {
    if (content) {
      setToken({ email: account, content: content });
      navigation.navigate('Drawer');
    }
  };

  useEffect(() => {
    const subscription = watch(async (value, { name, type }) => {
      try {
        if (value.content) {
          const tokenContent = await Contentful.validateToken(value.content);
          if (tokenContent.valid) {
            setAccount(tokenContent.email);
          }
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <SafeAreaView>
      <Background>
        <LargeCircle />
        <SmallCircle />
      </Background>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <KeyboardAvoidingView className="flex-1">
          <Column>
            <View>
              <Icon source={icon} />
            </View>
          </Column>
          <Text className="text-center text-4xl font-bold text-gray-700">
            Contentfully
          </Text>
          <Text className="text-md mb-10 mt-2 text-center font-medium text-gray-600">
            Manage your Contentful Space
          </Text>

          <View className="w-full flex-row items-center overflow-hidden rounded-full border border-gray-300 bg-white px-5 py-2 shadow">
            <View className="flex-1">
              <Controller
                name="content"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur } }) => (
                  <TextInput
                    className="text-base text-gray-900"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    textContentType="password"
                    returnKeyType="done"
                    placeholder="1234Token55678"
                    clearButtonMode="while-editing"
                  />
                )}
              />
            </View>

            <TouchableOpacity className="h-10 w-10 rounded-full bg-indigo-600"></TouchableOpacity>
          </View>

          <Text className="mt-2 text-center text-sm text-gray-500">
            How to find management token.
          </Text>
          <View className="h-14 rounded-md bg-white shadow-sm">
            <Text className="font-sm text-base text-gray-600">
              Account found!
            </Text>
            <Text className="font-sm text-base text-gray-600">{account}</Text>
          </View>
          <TouchableHighlight
            className="absolute bottom-2 mt-8 w-full rounded-md bg-indigo-600 p-4"
            disabled={!account}
            onPress={handleSubmit(submit)}>
            <Text className="text-center text-base font-medium text-white">
              Authorize
            </Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const ScrollView = styled.ScrollView`
  padding: 16px;
`;

const Background = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const LargeCircle = styled.View`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 300px;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  border-width: 10px;
  right: -300px;
  top: -200px;
`;

const SmallCircle = styled.View`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 150px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border-color: ${({ theme }) => theme.colors.gray[200]};
  border-width: 10px;
  right: 240px;
  top: 50px;
`;

const Title = styled.Text`
  font-size: 32px;
  text-align: center;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.gray[700]};
  font-family: ${font.bold};
`;

const Subtitle = styled.Text`
  text-align: center;
  font-size: 15px;
  font-family: ${font.regular};
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-bottom: 24px;
`;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Icon = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 14px;
`;

const Column = styled.View`
  margin: 32px 0px;
  flex-direction: column;
  align-items: center;
  z-index: 20;
`;
