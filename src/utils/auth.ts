const APPLICATION_ID: string =
  "20e149e67b28302d54d4e79cb96e5f14bbd0cd075c40abf329b8d358be93906a";
const CALLBACK_PATH: string = "/auth/gitlab/callback";
const CALLBACK_URL: string = `http://localhost:3000${CALLBACK_PATH}`;
const SCOPE: string = "openid+read_user+profile+api";
const LOGIN_METADATA_KEY: string = "mr-explorer_login_metadata";
const TOKEN_KEY: string = "mr-explorer_access-token";

export interface LoginMetadata {
  state: string;
  originalUrl: string;
}

export interface LoginInformations {
  token: string | null;
  originalUrl: string | null;
}

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

  static redirectToLogin(originalUrl: string = ""): void {
    const state: string = Math.floor(Math.random() * 10000000).toString();
    const loginMetadata: LoginMetadata = { state, originalUrl };
    localStorage.setItem(LOGIN_METADATA_KEY, JSON.stringify(loginMetadata));
    window.location.replace(
      `https://gitlab.com/oauth/authorize?client_id=${APPLICATION_ID}&redirect_uri=${CALLBACK_URL}&response_type=token&state=${state}&scope=${SCOPE}`
    );
  }

  static deriveLoginInfoFromUrl(
    pathname: string,
    hash: string
  ): LoginInformations {
    const nullResult: LoginInformations = { token: null, originalUrl: null };
    if (pathname !== CALLBACK_PATH) return nullResult;

    // Remove # in the string
    const paramsString: string = hash.substr(1);
    const paramsStringArray: string[] = paramsString.split("&");
    if (paramsStringArray.length !== 3) return nullResult;
    const [token, tokenType, state] = paramsStringArray.map(
      (paramString: string): string => paramString.split("=")[1]
    );
    if (tokenType !== "Bearer") return nullResult;
    const loginMetadaString: string | null = localStorage.getItem(
      LOGIN_METADATA_KEY
    );
    if (!loginMetadaString) return nullResult;
    let loginMetadata: LoginMetadata;
    try {
      loginMetadata = JSON.parse(loginMetadaString);
    } catch (err) {
      return nullResult;
    }
    if (state !== loginMetadata.state) return nullResult;
    localStorage.removeItem(LOGIN_METADATA_KEY);
    // Still need to check the token
    return { token, originalUrl: loginMetadata.originalUrl };
  }
}

export default AuthUtils;
