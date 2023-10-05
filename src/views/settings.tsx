import React, { FC, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components/native';
import { TokenItem } from '../components/settings/token-item';
import { PrimaryButton } from '../components/shared/button';
import { Container } from '../components/shared/container';
import { CardDescription, CardTitle } from '../components/shared/typography';
import { resolveColor } from '../utilities/color';
import { Button, ScrollView, Text } from 'react-native';
import { Card } from '../components/card/Card';
import { useToken } from '../storage/store';

export const Settings: FC = () => {
  const scrollRef = useRef(null);
  const [token, setToken] = useToken();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      content: '',
    },
  });

  const submit = ({ name, content }: { name: string; content: string }) => {
    reset();
  };

  const logout = () => {
    setToken(undefined);
  };

  return (
    <ScrollView className="bg-gray-100">
      <Card.OuterContainer>
        <Card.Title>Management tokens</Card.Title>
        <Card>
          <Text>
            To create a Contentful Management token in Contentful dashboard,
            follow these instructions.
          </Text>
          {/* {tokens?.map(token => (
            <TokenItem
              simultaneousHandlers={scrollRef}
              key={token.name}
              selected={selected?.name === token.name}
              token={token}
            />
          ))} */}
        </Card>

        <Button onPress={logout} title="Logout" />

        <Card.Title>Add new Token</Card.Title>
        <InputLabel>Token name</InputLabel>
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              spellCheck={true}
              returnKeyType="next"
              placeholder="ACME Corp Token"
            />
          )}
        />

        <InputLabel>Token</InputLabel>
        <Controller
          name="content"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              textContentType="password"
              returnKeyType="done"
              placeholder="1234Token55678"
            />
          )}
        />

        <PrimaryButton
          disabled={!isValid}
          buttonText="Add Token"
          onPress={handleSubmit(submit)}
        />
      </Card.OuterContainer>

      <Card.OuterContainer>
        <Card.Title>Theme</Card.Title>
        <Card></Card>
      </Card.OuterContainer>
    </ScrollView>
  );
};

const InputLabel = styled.Text`
  font-size: 13px;
  margin-bottom: 8px;
  color: ${({ theme }) => resolveColor(theme, 'text')};
`;

const Input = styled.TextInput`
  margin: 4px 0px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray[400]};
  color: ${({ theme }) => resolveColor(theme, 'text')};
  padding: 8px;
  border-radius: 8px;
  font-size: 13px;
`;
