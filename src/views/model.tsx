import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from '../components/card/Card';
import { FieldIcon, FieldTypeText } from '../components/icons/field-icon';
import { RefreshControl } from '../components/shared/refresh-control';
import { useModel } from '../hooks/models';
import { useUserRefresh } from '../hooks/refresh';
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
  const { handleRefresh, refreshing } = useUserRefresh(model.refetch);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
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
        <Card.Title>Info</Card.Title>
        <Card>
          <Card.DetailRow title="Name" subtitle={model.data?.name} />
          <Card.Divider />
          <Card.DetailRow
            title="Description"
            column
            subtitle={model.data?.description}
          />
        </Card>
      </Card.OuterContainer>

      <Card.OuterContainer>
        <Card.Title>Fields</Card.Title>
        <Card>
          {model.data?.fields?.map(field => (
            <View className="flex-row items-center px-2 pt-1" key={field.id}>
              <FieldIcon fieldType={field.type} />
              <View className="ml-2 w-full flex-row items-start border-b border-b-gray-200 py-1">
                <View>
                  <Text className="text-sm font-medium text-gray-800">
                    {field.name}
                  </Text>
                  <FieldTypeText fieldType={field.type} />
                </View>
                {model.data.displayField === field.id && (
                  <View className="ml-2 w-auto rounded-sm bg-gray-200 px-2 py-0.5">
                    {
                      <Text className="text-center text-xs text-gray-600">
                        Entry title
                      </Text>
                    }
                  </View>
                )}
              </View>
            </View>
          ))}
        </Card>
      </Card.OuterContainer>
    </ScrollView>
  );
};
