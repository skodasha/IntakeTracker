import config from '@/app/config/config';
import { IAccessToken, IUserRequest } from '@/app/interfaces/user.interface';

import ApiRepository from './api';

class AuthRepository extends ApiRepository {
  constructor() {
    super(config.api.url);
  }

  public async register(payload: IUserRequest): Promise<IAccessToken> {
    const result = await this.http.post('/auth/register', payload);
    return result.data;
  }

  public async login(payload: IUserRequest): Promise<IAccessToken> {
    const result = await this.http.post('/auth/login', payload);
    return result.data;
  }
}

const authRepository = new AuthRepository();
export default authRepository;
