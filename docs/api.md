# API Repositories

This article explains how API repositories must be setup and used.

## API URL setup

To make sure primary API URL is not hardcoded we put it in config file.
<br>
Value of URL comes from ENV variables.

1. Put API URL in .env file in following format:
```
API_URL=https://some-api-url.com
```
2. Update config.ts file with API URL:
```javascript
const { API_URL } = Config;

const config = {
  api: {
    url: API_URL,
  },
};
```

## Repository setup

To follow code consistency it's important to create correct repositories in right folders with self-explaining names.
<br>
We already have basic repositories which help us building API integration easier.

1. Create new file under `repositories/api` folder with name which represents API. Example: `Auth API` -> `auth.ts`
2. Write down functions in repository. Example:
```javascript
import { config } from '@/config/config';
import { IUserTO } from '@/interfaces/user.interface';

import ApiRepository from './api';

class AuthRepository extends ApiRepository {
  constructor() {
    super(config.api.url);
  }

  public async getUsers(): Promise<IUserTO[]> {
    const result = await this.http.get('/users');
    return result.data;
  }
}

const authRepository = new AuthRepository();
export default authRepository;
```

## Extending ApiRepository

Usually we have to provide some additional stuff for each request (i. e. headers) or handling each response.
<br>
For this purpose we are able to extend ApiRepository class by adding request / response interceptors.
<br>
We are using axios so it can be done using it's methods which are wrapped in HttpRepository. For more information visit [axios documentation](https://axios-http.com/docs/interceptors).
<br>
<br>
Example with additional header on each request:
```javascript
import HttpRepository from '@/app/repositories/http';

class ApiRepository {
  public http: HttpRepository;

  constructor(baseUrl: string) {
    this.http = new HttpRepository(baseUrl);

    // Add new request interceptor
    this.http.addRequestInterceptor((axiosConfig) => {
      // Make sure headers is object.
      axiosConfig.headers = axiosConfig.headers || {};

      // Set 'x-api-key' header with value 'MY_API_KEY'.
      axiosConfig.headers['x-api-key'] = 'MY_API_KEY';

      return axiosConfig;
    });
  }
}

export default ApiRepository;
```
