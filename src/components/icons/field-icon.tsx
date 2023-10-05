import React, { FC } from 'react';
import { Text, TextStyle } from 'react-native';
import Svg, { G, Line, Path, Rect } from 'react-native-svg';
import styled from 'styled-components/native';
import { z } from 'zod';
import { FieldType } from '../../schemas/contentful';

type FieldType =
  | { type: 'Symbol' }
  | { type: 'Text' }
  | { type: 'RichText' }
  | { type: 'Integer' }
  | { type: 'Number' }
  | { type: 'Boolean' }
  | { type: 'Date' }
  | { type: 'Location' }
  | { type: 'Object' }
  | { type: 'Link'; linkType: 'Entry' }
  | { type: 'Link'; linkType: 'Asset' }
  | { type: 'Array'; items: { type: 'Link'; linkType: 'Entry' } }
  | { type: 'Array'; items: { type: 'Symbol' } }
  | { type: 'Array'; items: { type: 'Link'; linkType: 'Asset' } };

type Props = {
  fieldType: z.infer<typeof FieldType>;
  style?: TextStyle;
};

export const FieldIcon: FC<Props> = ({ fieldType }) => {
  /*
  All types https://www.contentful.com/developers/docs/references/content-management-api/#entry-field-location
  */
  switch (fieldType) {
    case 'Symbol':
      return <Symbol color="black" />;
    case 'Link':
      return <Link color="black" />;
    case 'Array':
      return <Array color="black" />;
    case 'RichText':
      return <Array color="black" />;
    case 'Number':
      return <Array color="black" />;
    case 'Integer':
      return <Array color="black" />;
    case 'Location':
      return <Location color="black" />;
    default:
      return <Link color="black" />;
  }
};

export const FieldTypeText: FC<Props> = ({ fieldType, style }) => {
  switch (fieldType) {
    case 'Symbol':
      return <Text className="text-xs text-gray-600">Short text</Text>;
    case 'Link':
      return <Text className="text-xs text-gray-600">Reference</Text>;
    case 'Array':
      return <Text className="text-xs text-gray-600">References, many</Text>;
    case 'RichText':
      return <Text className="text-xs text-gray-600">Rich text</Text>;
    case 'Integer':
      return <Text className="text-xs text-gray-600">Number</Text>;
    case 'Location':
      return <Text className="text-xs text-gray-600">Location</Text>;
    default:
      return <Text className="text-xs text-gray-600">Short text</Text>;
  }
};

type IconProps = {
  color: string;
};

export const Link: FC<IconProps> = ({ color }) => {
  return (
    <Svg
      viewBox="0 0 140 140"
      fill="none"
      strokeWidth="1.5px"
      stroke={color}
      height={16}
      width={16}>
      <G transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
        <Path d="M9.364,18.5l-.932.932a4.5,4.5,0,0,1-6.364-6.364L6.841,8.294a4.5,4.5,0,0,1,6.825,5.825" />
        <Path d="M14.818,5.567l.75-.75a4.5,4.5,0,0,1,6.364,6.364l-4.773,4.773a4.5,4.5,0,0,1-6.824-5.826" />
      </G>
    </Svg>
  );
};

export const Symbol: FC<IconProps> = ({ color }) => {
  return (
    <Svg
      viewBox="0 0 140 140"
      fill="none"
      strokeWidth="1.5px"
      stroke={color}
      height={16}
      width={16}>
      <G transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
        <Rect x="0.75" y="6.748" width="22.5" height="10.5" rx="1.5" ry="1.5" />
        <Line x1="3.75" y1="9.748" x2="3.75" y2="14.248" />
      </G>
    </Svg>
  );
};

export const Location = () => (
  <Svg viewBox="-0.75 -0.75 24 24" height={16} width={16}>
    <Path
      d="M16.171875 5.9146875c0 2.878125 -4.921875 7.4446875 -4.921875 7.4446875S6.328125 8.7928125 6.328125 5.9146875A5.0728124999999995 5.0728124999999995 0 0 1 11.25 0.703125a5.0737499999999995 5.0737499999999995 0 0 1 4.921875 5.2115625Z"
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <Path
      d="M18.984375 4.921875h1.1925000000000001a0.9196875 0.9196875 0 0 1 0.916875 0.916875v15.04125a0.9196875 0.9196875 0 0 1 -0.916875 0.916875H2.323125a0.9196875 0.9196875 0 0 1 -0.916875 -0.916875V5.83875a0.9196875 0.9196875 0 0 1 0.916875 -0.916875H3.515625"
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </Svg>
);

export const Array: FC<IconProps> = ({ color }) => {
  return (
    <Svg
      viewBox="0 0 140 140"
      fill="none"
      strokeWidth="1.5px"
      stroke={color}
      height={16}
      width={16}>
      <G transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
        <Rect
          x="9.75"
          y="18.748"
          width="13.5"
          height="4.5"
          rx="0.75"
          ry="0.75"
        />
        <Rect
          x="9.75"
          y="11.248"
          width="13.5"
          height="4.5"
          rx="0.75"
          ry="0.75"
        />
        <Rect
          x="0.75"
          y="0.748"
          width="13.5"
          height="4.5"
          rx="0.75"
          ry="0.75"
        />
        <Path d="M6.75,5.248v1.5a1.5,1.5,0,0,0,1.5,1.5h4.5a1.5,1.5,0,0,1,1.5,1.5v1.5" />
        <Line x1="17.25" y1="15.748" x2="17.25" y2="18.748" />
      </G>
    </Svg>
  );
};
