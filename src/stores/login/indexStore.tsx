import { useAuth } from "@contexts/authContext";
import { useNotification } from "@contexts/notificationContext";
import { defaultPerfilLogin, type PerfilLogin } from "@domains/Perfil";
import { login } from "@routes/routesPerfil";
import { isEmail, isValueValid } from "@utils/utils";
import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type FieldErrors = Record<string, string>;

interface LoginContextType {
  formData: PerfilLogin;
  setField: (field: string, value: unknown) => void;
  errors: FieldErrors;
  validate: () => Promise<boolean>;
  errorsForm: (path: string) => ReactNode;
  finalizeLogin: () => void;
}

const LoginContext = createContext<LoginContextType | null>(null);

export const useLogin = (): LoginContextType => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

interface LoginProviderProps {
  children: ReactNode;
}

const initialFormData = defaultPerfilLogin;

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const { showNotification } = useNotification();
  const { validateAuth } = useAuth();
  const navigate = useNavigate();

  const getByPath = (obj: any, path: string) =>
    path.split(".").reduce((acc, key) => acc?.[key], obj);

  const clearErrors = (paths: string[]) => {
    if (!paths.length) return;
    setErrors((prev) => {
      const next = { ...prev };
      paths.forEach((p) => delete next[p]);
      return next;
    });
  };

  const setField = (field: string, value: unknown) => {
    setFormData((prev) => {
      const updated: any = { ...prev };
      const keys = field.split(".");
      let cur = updated;

      keys.forEach((key, idx) => {
        if (idx === keys.length - 1) cur[key] = value;
        else {
          cur[key] = cur[key] ?? {};
          cur = cur[key];
        }
      });

      return updated;
    });

    clearErrors([field]);
  };

  const validate = async (): Promise<boolean> => {
    const stepErrors: FieldErrors = {};

    const required: string[] = ["email", "senha"];

    required.forEach((path) => {
      const v = getByPath(formData, path);
      if (!isValueValid(v) || (typeof v === "string" && !v.trim())) {
        stepErrors[path] = "Campo obrigatório";
      }
    });

    const email = (formData.email ?? "").trim();
    if (!isEmail(email)) {
      stepErrors.email = "E-mail inválido";
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      return false;
    }

    return true;
  };

  const errorsForm = (path: string) =>
    errors[path] && <small className="p-error">{errors[path]}</small>;

  const finalizeLogin = async () => {
    if (await validate()) {
      try {
        const response = await login(formData);

        if (response.status === 200) {
          showNotification("success", "Login realizado com sucesso!", "");
          validateAuth();
          navigate("/");
        }
      } catch (error) {
        showNotification(
          "error",
          "Algo deu errado. Tente novamente mais tarde.",
          ""
        );
      }
    }
  };

  return (
    <LoginContext.Provider
      value={{
        formData,
        setField,
        errors,
        validate,
        submit,
        errorsForm,
        finalizeLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
