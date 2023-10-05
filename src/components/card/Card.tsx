import React, { ReactNode } from 'react';
import {
  Switch,
  SwitchProps,
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
  title: string | number | null;
  subtitle?: string | number | null;
  actionable?: boolean;
  valueProps?: TextProps;
  column?: boolean;
} & TouchableHighlightProps;

Card.Divider = (props: ViewProps) => (
  <View {...props} className="ml-4 w-full border-b border-b-gray-200" />
);

Card.DetailRow = ({
  title,
  subtitle,
  actionable,
  valueProps,
  column = false,
  ...touchableProps
}: DetailRowProps) => (
  <TouchableHighlight
    activeOpacity={1}
    underlayColor={colors.gray[100]}
    {...touchableProps}
    className="px-2 py-5">
    <View
      className={cx(
        'ml-2',
        column ? 'flex-col' : 'flex-row items-center justify-between',
      )}>
      <Text className="text-sm font-medium text-gray-700">{title}</Text>
      <Text
        {...valueProps}
        className={cx(
          'font-regular text-sm',
          actionable ? 'text-indigo-500' : 'text-gray-500',
        )}>
        {subtitle}
      </Text>
    </View>
  </TouchableHighlight>
);

type ToggleRowProps = {
  title: string | number | null;
} & SwitchProps;

Card.ToggleRow = ({ title, ...props }: ToggleRowProps) => (
  <View className="ml-3 flex-row items-center justify-between py-4">
    <Text className="text-sm font-medium text-gray-700">{title}</Text>
    <Switch
      {...props}
      className="mr-2"
      // thumbColor={colors.gray[300]}
      trackColor={{
        true: colors.indigo[500],
        false: colors.gray[50],
      }}
      ios_backgroundColor={colors.gray[50]}
    />
  </View>
);

Card.InputRow = (props: TextInputProps) => (
  <View className="px-2 py-3">
    <TextInput {...props} className="font-sm text-gray-700" />
  </View>
);

type ButtonRowProps = {
  destructive?: boolean;
  text: string;
} & TouchableHighlightProps;

Card.ButtonRow = ({ destructive, text, ...props }: ButtonRowProps) => (
  <TouchableHighlight
    {...props}
    className={cx(props.className, 'px-3 py-5')}
    activeOpacity={1}
    underlayColor={colors.gray[100]}>
    <Text
      className={cx(
        'text-sm font-medium ',
        destructive ? 'text-red-600' : 'text-indigo-600',
      )}>
      {text}
    </Text>
  </TouchableHighlight>
);
