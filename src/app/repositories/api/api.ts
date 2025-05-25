import { AxiosResponse } from 'axios';

import { CustomAxiosError } from '@/app/interfaces/error.interface';
import HttpRepository from '@/app/repositories/http';

class ApiRepository {
  public http: HttpRepository;

  private accessToken: string | null = null;

  constructor(baseUrl: string) {
    this.http = new HttpRepository(baseUrl);

    this.http.addRequestInterceptor((axiosConfig) => {
      axiosConfig.headers = axiosConfig.headers || {};

      if (this.accessToken) {
        axiosConfig.headers.Authorization = `Bearer ${this.accessToken}`;
      }

      return axiosConfig;
    });

    this.http.addResponseInterceptor(
      (response: AxiosResponse) => response,
      (error) => {
        const apiError = error as CustomAxiosError;
        const apiErrorData = apiError?.response?.data;

        if (apiErrorData?.errors?.length) {
          const formattedErrors = apiErrorData.errors.map((err) => err.msg).join('\n');

          apiError.formattedMessage = formattedErrors;
        } else if (apiErrorData?.message) {
          apiError.formattedMessage = apiErrorData.message;
        } else {
          apiError.formattedMessage = 'Something went wrong';
        }

        return Promise.reject(apiError);
      }
    );
  }

  public setAccessToken(token: string | null) {
    this.accessToken = token;
  }
}

export default ApiRepository;
