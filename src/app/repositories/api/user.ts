import config from '@/app/config/config';
import { IUserTO } from '@/app/interfaces/user.interface';
import ApiRepository from './api';

class UserRepository extends ApiRepository {
  constructor() {
    super(config.api.url);
  }

  public async getCurrent(): Promise<IUserTO> {
    const result = await this.http.get('/users/current');
    return result.data;
  }
}

const userRepository = new UserRepository();
export default userRepository;