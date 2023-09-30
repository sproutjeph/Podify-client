import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToAsyncStorage = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};
export const getFromAsyncStorage = async (key: string) => {
  return AsyncStorage.getItem(key);
};
export const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};

export enum StoreKeys {
  AUTH_TOKEN = 'AUTH_TOKEN',
}
