import { AxiosResponse } from 'axios';

import HttpRepository from '@/app/repositories/http';
import TokenService from '@/app/services/token.service';
import { parseError } from '@/app/utils/parseError';

class ApiRepository {
  public http: HttpRepository;

  constructor(baseUrl: string) {
    this.http = new HttpRepository(baseUrl);

    this.http.addRequestInterceptor((axiosConfig) => {
      // eslint-disable-next-line no-param-reassign
      axiosConfig.headers = axiosConfig.headers || {};

      const token = TokenService.getAccessToken();
      if (token) {
        // eslint-disable-next-line no-param-reassign
        axiosConfig.headers.Authorization = `Bearer ${token}`;
      }

      return axiosConfig;
    });

    this.http.addResponseInterceptor(
      (response: AxiosResponse) => response,
      (error) => Promise.reject(parseError(error))
    );
  }
}

export default ApiRepository;
