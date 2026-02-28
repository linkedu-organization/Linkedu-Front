import { type Perfil } from "@domains/Perfil";
import { checkAutenticacao, logout } from "@routes/routesPerfil";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./notificationContext";

type AuthContextType = {
  isAuthenticated: boolean;
  perfil: Perfil | null;
  authLogin: (perfil: Perfil) => void;
  authLogout: () => void;
  validateAuth: () => Promise<void>;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const authLogin = useCallback((perfil: Perfil) => {
    setIsAuthenticated(true);
    setPerfil(perfil);
  }, []);

  const authLogout = useCallback(() => {
    setIsAuthenticated(false);
    setPerfil(null);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        showNotification("success", null, "Logout realizado com sucesso!");
      } else {
        showNotification("error", null, "Logout falhou");
      }

      authLogout();
      navigate("/");
    } catch (err) {
      showNotification("error", null, err);
    }
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
      value={{
        isAuthenticated,
        perfil,
        authLogin,
        authLogout,
        validateAuth,
        handleLogout,
      }}
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
