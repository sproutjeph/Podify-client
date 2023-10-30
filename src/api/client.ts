import {getFromAsyncStorage, StoreKeys} from '@utils/asyncStorage';
import axios, {CreateAxiosDefaults} from 'axios';
const baseURL = 'http://192.168.0.101:8000';
export const axiosInstance = axios.create({
  baseURL,
});

type headers = CreateAxiosDefaults<any>['headers'];

export const getClient = async (headers?: headers) => {
  const token = await getFromAsyncStorage(StoreKeys.AUTH_TOKEN);

  if (!token) {
    return axios.create({baseURL});
  }

  const defaultHeaders = {
    Authorization: 'Bearer ' + token,
    ...headers,
  };

  return axios.create({baseURL, headers: defaultHeaders});
};
