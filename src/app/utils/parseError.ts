import { CustomAxiosError } from '@/app/interfaces/error.interface';

export const parseError = (error: unknown): string => {
  const err = error as CustomAxiosError;
  return err.formattedMessage || 'Something went wrong';
};
