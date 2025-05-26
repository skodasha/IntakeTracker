export interface IUserTO {
  email: string;
  id: string;
}

export type IUser = IUserTO;

export interface IUserRequest {
  email: string;
  password: string;
}

export interface IAccessToken {
  accessToken: string;
}
