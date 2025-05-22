import { AxiosError } from "axios";

interface IError {
  msg?: string;
  param?: string;
}

export interface IApiError {
  message?: string;
  errors?: IError[];
}

export interface CustomAxiosError extends AxiosError<IApiError> {
  formattedMessage?: string;
}
