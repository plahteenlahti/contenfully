import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { useModel } from '../../hooks/models';
import { font } from '../../styles';
import { formatTimestamp } from '../../utilities/time';
import { ContentViewNavigationProp } from '../../views/entries';
import { Chevron } from '../icons/chevron';
import { Draft, Published } from '../shared/published';
import { TouchableOpacity } from 'react-native';
import { z } from 'zod';
import { Code } from '../../schemas/locale';
import { EntrySchema } from '../../schemas/entry';

type Props = {
  locale: z.infer<typeof Code> | undefined | null;
  entry?: z.infer<typeof EntrySchema>;
};

export const Entry: FC<Props> = ({ entry, locale }) => {
  const model = useModel(entry?.sys?.contentType?.sys?.id);
  const navigation = useNavigation<ContentViewNavigationProp['navigation']>();

  return (
    <TouchableOpacity
      className="flex-row bg-white px-2 py-2"
      onPress={() =>
        navigation.navigate('Entry', { entryID: `${entry?.sys.id}` })
      }>
      <Column>
        <TopRow>
          {model.data?.displayField && locale && (
            <Title>{entry?.fields?.[model.data?.displayField]?.[locale]}</Title>
          )}
          {entry?.sys?.updatedAt === entry?.sys.publishedAt ? (
            <Published />
          ) : (
            <Draft />
          )}
        </TopRow>
        <Updated>
          {entry?.sys.updatedAt && formatTimestamp(entry?.sys.updatedAt)}
        </Updated>
      </Column>
      <Chevron />
    </TouchableOpacity>
  );
};

const Title = styled.Text`
  font-size: 13px;
  font-family: ${font.medium};
  color: ${({ theme }) => theme.colors.gray[600]};
  flex: 1;
`;

const Updated = styled.Text`
  font-size: 13px;
  font-family: ${font.medium};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const Column = styled.View`
  flex: 1;
  padding-right: 8px;
`;

const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
