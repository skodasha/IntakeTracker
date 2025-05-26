class TokenService {
  private static accessToken: string | null = null;

  public static setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  public static getAccessToken(): string | null {
    return this.accessToken;
  }
}

export default TokenService;
