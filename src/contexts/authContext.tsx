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
  authChecked: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [authChecked, setAuthChecked] = useState(false);

  const authLogin = useCallback((perfil: Perfil) => {
    setIsAuthenticated(true);
    setPerfil(perfil);
    localStorage.setItem("auth", JSON.stringify(perfil));
  }, []);

  const authLogout = useCallback(() => {
    setIsAuthenticated(false);
    setPerfil(null);
    localStorage.removeItem("auth");
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      showNotification("success", null, "Logout realizado com sucesso!");

      authLogout();
      navigate("/login");
    } catch (err) {
      showNotification("error", null, "Logout falhou");
    }
  }, []);

  const validateAuth = useCallback(async () => {
    try {
      const response = await checkAutenticacao();
      if (response.data.autenticado) {
        authLogin(response.data.perfil);
      } else {
        authLogout();
      }
    } catch (err) {
      authLogout();
    } finally {
      setAuthChecked(true);
    }
  }, [authLogin, authLogout]);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      authLogin(JSON.parse(storedAuth));
    }
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
        authChecked,
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
