import { AxiosError } from 'axios';

interface IError {
  msg?: string;
  param?: string;
}

export interface IApiError {
  errors?: IError[];
  message?: string;
}

export interface CustomAxiosError extends AxiosError<IApiError> {
  formattedMessage?: string;
}
