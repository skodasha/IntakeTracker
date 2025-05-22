export interface IUserTO {
  email: string;
  id: string;
}

export type IUser = IUserTO;

export type IUserRequest = {
  email: string;
  password: string;
};

export interface IAccessToken {
  accessToken: string;
}
