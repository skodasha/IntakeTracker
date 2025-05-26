import { AxiosError } from 'axios';

interface IError {
  msg: string;
  path: string;
}

interface IApiError {
  errors?: IError[];
  message?: string;
}

export type CustomAxiosError = AxiosError<IApiError>;

export type ErrorObjectType = {
  [field: string]: {
    message: string;
  };
};
