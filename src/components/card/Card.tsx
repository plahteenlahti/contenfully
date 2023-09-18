import React, { ReactNode } from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
  ViewProps,
} from 'react-native';
import colors from 'tailwindcss/colors';
import { cx } from '../../utilities/class';

type Props = {
  children: ReactNode;
};

export const Card = ({ children, className, ...rest }: Props & ViewProps) => (
  <View className={cx(className, 'rounded-md bg-white')} {...rest}>
    {children}
  </View>
);

Card.Title = ({ children }: Props & TextProps) => (
  <Text className="mb-2 ml-4 text-xs uppercase text-gray-500">{children}</Text>
);

Card.OuterContainer = ({
  children,
  className,
  ...props
}: Props & ViewProps) => (
  <View className={cx(className, 'p-2')} {...props}>
    {children}
  </View>
);

type ListItemProps = {
  children: ReactNode;
} & TouchableHighlightProps;

Card.ListItem = ({ children, className, ...props }: ListItemProps) => (
  <TouchableHighlight
    underlayColor={colors.gray[100]}
    className={cx(className, 'p-2')}
    {...props}>
    <>{children}</>
  </TouchableHighlight>
);

type DetailRowProps = {
  title: string;
  subtitle?: string;
} & TouchableHighlightProps;

Card.Divider = (props: ViewProps) => (
  <View {...props} className="ml-4 w-full border-b border-b-gray-200" />
);

Card.DetailRow = ({ title, subtitle, ...touchableProps }: DetailRowProps) => (
  <TouchableHighlight
    activeOpacity={1}
    underlayColor={colors.gray[100]}
    {...touchableProps}
    className="px-2 py-3">
    <View className="ml-4 flex-row items-center justify-between ">
      <Text className="text-sm font-medium text-gray-700">{title}</Text>
      <Text className="font-regular text-sm text-gray-500">{subtitle}</Text>
    </View>
  </TouchableHighlight>
);

Card.InputRow = (props: TextInputProps) => (
  <View className="px-2 py-3">
    <TextInput {...props} className="font-sm text-gray-700" />
  </View>
);
