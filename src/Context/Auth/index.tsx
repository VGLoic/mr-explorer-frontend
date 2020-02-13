import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo
} from "react";
// Utils
import AuthUtils from "utils/auth";

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
  isAuthenticated: boolean;
  authenticateUser: (hash: string) => void;
  getToken: () => string | null;
  loginRequest: () => void;
}

export const useAuth = (): IAuth => {
  const context: IContext = useContext(AuthContext);

  if (!context) {
    throw new Error("Unable to access the AuthContext.");
  }

  const authenticateUser = useCallback(
    (hash: string): void => {
      const paramsString: string = hash.substr(1);
      const paramsStringArray: string[] = paramsString.split("&");
      const [, token]: string[] = paramsStringArray[0].split("=");
      if (token) {
        AuthUtils.setToken(token);
        context.setIsAuthenticated(true);
      }
    },
    [context]
  );

  return {
    isAuthenticated: context.isAuthenticated,
    authenticateUser,
    getToken: AuthUtils.getToken,
    loginRequest: AuthUtils.loginRequest
  };
};
