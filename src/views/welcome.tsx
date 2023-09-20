import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAtom } from 'jotai';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { MainStackParamList } from '../navigation/navigation';
import { Contentful } from '../services/contentful';
import { tokenAtom } from '../storage/jotai/atoms';
import { font } from '../styles';

const icon = require('../assets/app-icon.png');

type Props = NativeStackScreenProps<MainStackParamList, 'Welcome'>;

export const Welcome: FC<Props> = ({ navigation }) => {
  const [token, setToken] = useAtom(tokenAtom);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: undefined,
      content: undefined,
    },
  });

  const submit = async ({ content }: { content: string }) => {
    setToken({ email: 'test', content });
    navigation.navigate('Drawer');
    // try {
    //   const tokenContent = await Contentful.validateToken(content);
    //   if (tokenContent.valid) {
    //     setToken({ email: tokenContent.email, content: content });
    //     navigation.navigate('Drawer');
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <SafeAreaView>
      <Background>
        <LargeCircle />
        <SmallCircle />
      </Background>
      <ScrollView>
        <Column>
          <PanGestureHandler>
            <IconContainer>
              <Icon source={icon} />
            </IconContainer>
          </PanGestureHandler>
        </Column>
        <Title>Contentfully</Title>
        <Subtitle>Manage your Contentful Space</Subtitle>

        <InputLabel>Token</InputLabel>
        <Controller
          name="content"
          control={control}
          rules={{
            required: true,
          }}
          render={({
            field: { onChange, onBlur },
            fieldState: { isTouched, invalid },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              hasErrors={isTouched && invalid}
              textContentType="password"
              returnKeyType="done"
              placeholder="1234Token55678"
            />
          )}
        />

        <Button disabled={!isValid} onPress={handleSubmit(submit)}>
          <ButtonText>Authorize</ButtonText>
        </Button>
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
  background-color: ${({ theme }) => theme.colors.gray[50]};
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

const IconContainer = styled(Animated.View)``;

const Column = styled.View`
  margin: 32px 0px;
  flex-direction: column;
  align-items: center;
  z-index: 20;
`;

const InputLabel = styled.Text`
  font-size: 12px;
  margin-bottom: 4px;
  font-family: 'Inter-Regular';
  color: ${({ theme }) => theme.colors.gray[500]};
`;

type TextInputProps = {
  hasErrors: undefined | boolean;
};

const Input = styled.TextInput<TextInputProps>`
  margin: 4px 0px 16px;
  border-width: 1px;
  border-color: ${({ theme, hasErrors }) =>
    hasErrors ? theme.colors.red[400] : theme.colors.gray[400]};
  padding: 8px;
  font-family: ${font.regular};
  border-radius: 8px;
  font-size: 13px;
  color: ${({ theme }) =>
    theme.theme === 'light' ? theme.colors.gray[900] : theme.colors.gray[600]};
`;

const HelpText = styled.Text`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-family: ${font.regular};
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  margin-bottom: 8px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.indigo[300] : theme.colors.indigo[500]};
  padding: 16px;
  border-radius: 8px;
  margin-top: 32px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  font-family: ${font.medium};
`;
