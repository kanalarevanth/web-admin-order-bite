import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { localKeys } from "../utils/local-storage";
import { User, AuthContextType } from "../types/type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>({});
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const currentUserData = localStorage.getItem(localKeys.user);
    const tokenData = localStorage.getItem(localKeys.token);

    if (currentUserData) {
      setUser(JSON.parse(currentUserData));
    }
    if (tokenData) {
      setToken(tokenData);
    }
  }, []);

  const isAuthenticated = !!(user && Object.keys(user).length && token);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
