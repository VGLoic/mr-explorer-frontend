const APPLICATION_ID: string =
  "20e149e67b28302d54d4e79cb96e5f14bbd0cd075c40abf329b8d358be93906a";
const CALLBACK_URL: string = "http://localhost:3000/auth/gitlab/callback";
const SCOPE: string = "read_user+profile";
const TOKEN_KEY: string = "mr-explorer-access-token";

class AuthUtils {
  static getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  static isAuthenticated(): boolean {
    const accessToken: string | null = this.getToken();
    return Boolean(accessToken);
  }

  static loginRequest(): void {
    const state: number = Math.floor(Math.random() * 10000000);
    window.location.replace(
      `https://gitlab.com/oauth/authorize?client_id=${APPLICATION_ID}&redirect_uri=${CALLBACK_URL}&response_type=token&state=${state}&scope=${SCOPE}`
    );
  }
}

export default AuthUtils;
