import { type Perfil } from "@domains/Perfil";
import { checkAutenticacao } from "@routes/routesPerfil";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  perfil: Perfil | null;
  auth_login: (perfil: Perfil) => void;
  auth_logout: () => void;
  validateAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [perfil, setPerfil] = useState<Perfil | null>(null);

  const authLogin = useCallback((perfil: Perfil) => {
    setIsAuthenticated(true);
    setPerfil(perfil);
  }, []);

  const authLogout = useCallback(() => {
    setIsAuthenticated(false);
    setPerfil(null);
  }, []);

  const validateAuth = useCallback(async () => {
    try {
      const response = await checkAutenticacao();
      if (response.data === true) {
        setIsAuthenticated(true);
        authLogin(response.data.perfil);
      } else {
        authLogout();
      }
    } catch (err) {
      console.error("Validation error:", err);
      authLogout();
    }
  }, [authLogin, authLogout]);

  useEffect(() => {
    validateAuth();
  }, [validateAuth]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, perfil, authLogin, authLogout, validateAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
