import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect
} from "react";
import { useLocation, useHistory } from "react-router-dom";
// Utils
import AuthUtils, { LoginInformations } from "utils/auth";

interface IContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext: React.Context<any> = createContext(undefined);

type AuthProviderProps = any;
export const AuthProvider = (props: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    AuthUtils.isAuthenticated()
  );

  const value = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated
    }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value} {...props} />;
};

export interface IAuth {
  isAuthInitialized: boolean;
  isAuthenticated: boolean;
  getToken: () => string | null;
}

export const useAuth = (): IAuth => {
  const context: IContext = useContext(AuthContext);

  if (!context) {
    throw new Error("Unable to access the AuthContext.");
  }

  const { pathname, hash } = useLocation();
  const history = useHistory();
  const [isAuthInitialized, setAuthInitialized] = useState<boolean>(false);

  useEffect((): void => {
    if (!context.isAuthenticated) {
      const {
        token,
        originalUrl
      }: LoginInformations = AuthUtils.deriveLoginInfoFromUrl(pathname, hash);
      // Authenticating
      if (token) {
        AuthUtils.setToken(token);
        // AuthUtils.setExpirationDate(expirationDate);
        context.setIsAuthenticated(true);
        if (originalUrl) {
          history.push(originalUrl);
        }
      } else {
        AuthUtils.redirectToLogin(pathname);
      }
    }
    setAuthInitialized(true);
  }, [context, pathname, hash, history]);

  return {
    isAuthInitialized,
    isAuthenticated: context.isAuthenticated,
    getToken: AuthUtils.getToken
  };
};
