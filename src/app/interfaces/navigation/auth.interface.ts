import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import { AUTH_ROUTE } from '@/app/routes/routes';

// Here we pass interfaces for each screen in stack
// that can be passed as params and received further with useRoute hook
export type AuthStackParamList = {
  [AUTH_ROUTE.SIGN_IN]: undefined;
  [AUTH_ROUTE.SIGN_UP]: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export type AuthNavigationProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>['navigation'];

export type AuthRouteProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>['route'];

export type AuthRouteParamsProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>['route']['params'];
