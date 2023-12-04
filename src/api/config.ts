import axios, { AxiosError } from 'axios';

import { HOLIDAYS_API_KEY } from '@/constants/environment/environment';
import { BASE_URL } from '@/constants/holidays/endpoints';

console.log('KEY = ', HOLIDAYS_API_KEY);

export const holidaysInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'text/json',
    'X-Api-Key': '/E9Utzc7doqFIdJQU1t82w==J7heC8AohHyFG4QT',
  },
});

holidaysInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error instanceof AxiosError) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
    return null;
  },
);
