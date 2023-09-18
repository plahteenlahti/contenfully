import { ScrollView } from 'react-native';
import { Card } from '../components/card/Card';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SpaceStackParamList } from '../navigation/navigation';
import { useLocale } from '../hooks/locales';

export const LocaleView = ({
  route,
}: NativeStackScreenProps<SpaceStackParamList, 'Locale'>) => {
  const locale = useLocale(route.params.localeID);
  console.log(JSON.stringify(locale.data, undefined, 2));
  console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');

  return (
    <ScrollView>
      <Card.OuterContainer>
        <Card.Title>Information</Card.Title>
        <Card>
          <Card.DetailRow title="Name" subtitle={locale.data?.name} />
          <Card.DetailRow title="Code" subtitle={locale.data?.code} />
        </Card>
      </Card.OuterContainer>
    </ScrollView>
  );
};
