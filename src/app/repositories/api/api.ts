import HttpRepository from '@/app/repositories/http';

class ApiRepository {
  public http: HttpRepository;

  constructor(baseUrl: string) {
    this.http = new HttpRepository(baseUrl);

    // Request interceptors go here
  }
}

export default ApiRepository;
