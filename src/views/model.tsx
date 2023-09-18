import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Card } from '../components/card/Card';
import { FieldIcon, FieldTypeText } from '../components/icons/field-icon';
import { UnpaddedContainer } from '../components/shared/container';
import { RefreshControl } from '../components/shared/refresh-control';
import { ListButton, ListButtonText } from '../components/shared/text-button';
import { useModel } from '../hooks/models';
import { useContentfulUser } from '../hooks/user';
import { ModelStackParamList } from '../navigation/navigation';
import { localizedFormatDate } from '../utilities/time';

type Props = NativeStackScreenProps<ModelStackParamList, 'Model'>;

export const Model: FC<Props> = ({
  route: {
    params: { modelID },
  },
}) => {
  const model = useModel(modelID);
  const updateBy = useContentfulUser(model.data?.sys.updatedBy.sys.id);

  console.log(updateBy.data);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={model.isRefetching}
          onRefresh={model.refetch}
        />
      }>
      <Card.OuterContainer>
        <Card.Title>Activity</Card.Title>
        <Card>
          <Card.DetailRow title="Updated by" subtitle={updateBy.data?.email} />
          <Card.Divider />
          <Card.DetailRow
            title="Updated"
            subtitle={
              model.data?.sys.updatedAt &&
              localizedFormatDate(new Date(model.data?.sys.updatedAt))
            }
          />
          <Card.Divider />
          <Card.DetailRow
            title="Published"
            subtitle={
              model.data?.sys.publishedAt &&
              localizedFormatDate(new Date(model.data?.sys.publishedAt))
            }
          />
        </Card>
      </Card.OuterContainer>

      <Card.OuterContainer>
        <Card.Title>{model.data?.name}</Card.Title>
        <Card>
          <Text>{model.data?.description}</Text>
        </Card>
      </Card.OuterContainer>

      <Card.OuterContainer>
        <Card.Title>Fields</Card.Title>
        <Card>
          {model.data?.fields?.map(field => (
            <Field key={field.id}>
              <FieldIcon fieldType={field.type} />
              <Column>
                <FieldTitle>{field.name}</FieldTitle>
                <FieldTypeText fieldType={field.type} />
              </Column>
            </Field>
          ))}
        </Card>
      </Card.OuterContainer>

      <Card.OuterContainer>
        <Card.Title>Actions</Card.Title>
        <UnpaddedContainer>
          <ListButton>
            <ListButtonText>Deactivate model</ListButtonText>
          </ListButton>
          <ListButton noBorder>
            <ListButtonText>Delete model</ListButtonText>
          </ListButton>
        </UnpaddedContainer>
      </Card.OuterContainer>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;

const Field = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 0px 0px;
`;

const FieldTitle = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const Column = styled.View`
  margin-left: 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
  padding: 8px 0px;
  width: 100%;
`;
