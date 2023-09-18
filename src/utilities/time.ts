import {
  differenceInHours,
  formatDistanceToNow,
  formatRelative,
  format,
} from 'date-fns';
import { getCountry } from 'react-native-localize';

export const formatTimestamp = (time: string) => {
  // Return distance as "10 minutes ago" if time is less than work day

  if (differenceInHours(new Date(time), new Date()) < 8) {
    return formatDistanceToNow(new Date(time));
  }
  return formatRelative(new Date(time), new Date());
};

/**
 * Get date string in localized format
 * @returns string in DD.MM.YYYY or other localized format
 */
export const getDateFormatString = () => {
  const locale = getCountry();

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })
    .formatToParts(Date.now())
    .map(obj => {
      switch (obj.type) {
        case 'day':
          return 'dd';
        case 'month':
          return 'MM';
        case 'year':
          return 'yyyy';
        default:
          return obj.value;
      }
    })
    .join('');
};

export const localizedFormatDate = (date: Date) => {
  return format(date, getDateFormatString());
};
