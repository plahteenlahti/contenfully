import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { Container } from '../components/shared/container';
import { useMedium } from '../hooks/media';
import { AssetStackParamList } from '../navigation/navigation';
import { useDefaultLocale } from '../hooks/locales';
import { Card } from '../components/card/Card';
import { localizedFormatDate } from '../utilities/time';

type Props = NativeStackScreenProps<AssetStackParamList, 'Asset'>;

export const Asset: FC<Props> = ({
  route: {
    params: { assetID },
  },
}) => {
  const asset = useMedium(assetID);
  const locale = useDefaultLocale();

  return (
    <ScrollView contentInset={{ top: 200 }}>
      <Card.OuterContainer>
        <Card>
          {locale.data?.code &&
            asset.data?.fields.file[locale.data?.code].contentType ===
              'image/jpeg' && (
              <Container>
                <Image
                  source={{
                    uri: `https:${asset.data?.fields.file[locale.data?.code]
                      .url}`,
                  }}
                />
              </Container>
            )}
          <Card.Divider />
          <Card.DetailRow
            title="Title"
            subtitle={
              locale.data?.code && asset.data?.fields.title[locale.data?.code]
            }
          />
        </Card>
      </Card.OuterContainer>
      <Card.OuterContainer>
        <Card.Title>Info</Card.Title>
        <Card>
          <Card.DetailRow
            title="Created"
            subtitle={
              asset.data?.sys.createdAt &&
              localizedFormatDate(new Date(asset.data?.sys.createdAt))
            }
          />
          <Card.Divider />
          <Card.DetailRow
            title="Updated"
            subtitle={
              asset.data?.sys.updatedAt &&
              localizedFormatDate(new Date(asset.data?.sys.updatedAt))
            }
          />
          <Card.Divider />
          <Card.DetailRow
            title="Published"
            subtitle={
              asset.data?.sys.publishedAt &&
              localizedFormatDate(new Date(asset.data?.sys.publishedAt))
            }
          />
        </Card>
      </Card.OuterContainer>
    </ScrollView>
  );
};

const Image = styled.Image`
  height: 300px;
  width: 100%;
`;
