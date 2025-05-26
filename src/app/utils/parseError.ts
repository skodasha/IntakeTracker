import { CustomAxiosError, ErrorObjectType } from '@/app/interfaces/error.interface';

export const parseError = (error: unknown): ErrorObjectType => {
  const apiErrorData = (error as CustomAxiosError)?.response?.data;
  let apiError: ErrorObjectType;

  if (apiErrorData?.errors?.length) {
    const errorObject = apiErrorData.errors.reduce((acc: ErrorObjectType, { msg, path }) => {
      acc[path] = { message: msg };
      return acc;
    }, {});

    apiError = errorObject;
  } else {
    apiError = { error: { message: apiErrorData?.message || 'Something went wrong' } };
  }

  return apiError;
};
