import { Linking } from 'react-native';

export const useEmail = (email?: string | null) => {
  const sendEmail = async () => {
    const address = `mailto:${email}`;
    const canOpen = await Linking.canOpenURL(address);

    if (!canOpen) {
      throw new Error('Provided URL can not be handled');
    }

    await Linking.openURL(address);
  };

  return sendEmail;
};
