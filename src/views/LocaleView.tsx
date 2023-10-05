import { RefreshControl, ScrollView } from 'react-native';
import { Card } from '../components/card/Card';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SpaceStackParamList } from '../navigation/navigation';
import { useDeleteLocale, useLocale, useUpdateLocale } from '../hooks/locales';
import { useCallback, useState } from 'react';
import { useUserRefresh } from '../hooks/refresh';

export const LocaleView = ({
  route,
  navigation,
}: NativeStackScreenProps<SpaceStackParamList, 'Locale'>) => {
  const locale = useLocale(route.params.localeID);
  const update = useUpdateLocale();
  const deletion = useDeleteLocale();
  const { refreshing, handleRefresh } = useUserRefresh(locale.refetch);

  const changeValue = (field: string, value: boolean) => {
    if (locale.data) {
      update.mutate({
        fields: {
          [field]: value,
        },
        localeID: locale.data.sys.id,
        version: locale.data.sys.version,
      });
    }
  };

  const deleteLocale = () => {
    deletion.mutate(route.params.localeID);
    navigation.goBack();
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <Card.OuterContainer>
        <Card.Title>Information</Card.Title>
        <Card>
          <Card.DetailRow title="Name" subtitle={locale.data?.name} />
          <Card.Divider />
          <Card.DetailRow title="Code" subtitle={locale.data?.code} />
          <Card.Divider />
          <Card.DetailRow
            title="Fallback code"
            subtitle={locale.data?.fallbackCode}
          />
          <Card.Divider />
          <Card.ToggleRow
            title="Allow empty fields for this locale"
            onChange={() => changeValue('optional', !locale.data?.optional)}
            value={locale.data?.optional}
          />
          <Card.Divider />
          <Card.ToggleRow
            title="Content delivery API"
            onChange={() =>
              changeValue(
                'contentDeliveryApi',
                !locale.data?.contentDeliveryApi,
              )
            }
            value={locale.data?.contentDeliveryApi}
          />
          <Card.Divider />
          <Card.ToggleRow
            title="Content management API"
            onChange={() =>
              changeValue(
                'contentManagementApi',
                !locale.data?.contentManagementApi,
              )
            }
            value={locale.data?.contentManagementApi}
          />
          {!locale.data?.default && (
            <>
              <Card.Divider />
              <Card.ButtonRow
                onPress={deleteLocale}
                text="Delete locale"
                destructive
              />
            </>
          )}
        </Card>
      </Card.OuterContainer>
    </ScrollView>
  );
};
