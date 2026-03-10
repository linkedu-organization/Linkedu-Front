import { createContext, useContext, type ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRecrutador } from "@routes/routesRecrutador";
import { defaultRecrutador, type Recrutador } from "@domains/Recrutador";
import { useNotification } from "@contexts/notificationContext";
import { isEmail, isMaxValue, isMinValue, isValueValid } from "@utils/utils";
import { validarEmail } from "@routes/routesPerfil";

type FieldErrors = Record<string, string>;

interface RegisterRecrutadorContextType {
  formData: Recrutador;
  setField: (field: string, value: unknown) => void;
  errors: FieldErrors;
  validateStep: (stepIndex: number) => Promise<boolean>;
  finalizeRegister: () => Promise<void>;
}

const RegisterRecrutadorContext =
  createContext<RegisterRecrutadorContextType | null>(null);

export const useRegisterRecrutador = (): RegisterRecrutadorContextType => {
  const context = useContext(RegisterRecrutadorContext);
  if (!context) {
    throw new Error(
      "useRegisterRecrutador must be used within a RegisterRecrutadorProvider"
    );
  }
  return context;
};

const initialFormData: Recrutador = defaultRecrutador;

interface RegisterRecrutadorProviderProps {
  children: ReactNode;
}

export const RegisterRecrutadorProvider = ({
  children,
}: RegisterRecrutadorProviderProps) => {
  const [formData, setFormData] = useState<Recrutador>(initialFormData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const requiredByStep: Record<number, Array<string>> = {
    0: ["perfil.nome", "perfil.email", "perfil.senha", "perfil.confirmaSenha"],
    1: ["cargo", "instituicao", "areaAtuacao"],
  };

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

  const clearStepErrors = (step: number) => {
    const paths = requiredByStep[step] ?? [];
    if (step === 0) paths.push("perfil.confirmaSenha");
    clearErrors(paths);
  };

  const setField = (field: string, value: unknown) => {
    setFormData((prev) => {
      const updatedFormData: Recrutador = { ...prev };

      const keys = field.split(".");
      let currentField: any = updatedFormData;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          currentField[key] = value;
        } else {
          currentField[key] = currentField[key] ?? {};
          currentField = currentField[key];
        }
      });

      return updatedFormData;
    });

    clearErrors([field]);

    if (field === "perfil.senha" || field === "perfil.confirmaSenha") {
      clearErrors(["perfil.confirmaSenha"]);
    }
  };

  const validateEmail = async (): Promise<boolean> => {
    try {
      const response = await validarEmail(formData?.perfil?.email);
      return response.status === 200;
    } catch (error) {
      console.error("Erro ao validar e-mail:", error);
      return false;
    }
  };

  const validateStep = async (step: number): Promise<boolean> => {
    clearStepErrors(step);

    const stepErrors: FieldErrors = {};
    const required = requiredByStep[step] ?? [];

    required.forEach((path) => {
      const v = getByPath(formData, path);
      if (!isValueValid(v)) {
        stepErrors[path] = "Campo obrigatório";
      }
    });

    if (step === 0) {
      const email = (formData.perfil.email ?? "").trim();

      if (!isEmail(email)) {
        stepErrors["perfil.email"] = "E-mail inválido";
      } else if (!(await validateEmail())) {
        stepErrors["perfil.email"] = "E-mail já cadastrado";
      }

      if (!isMaxValue(formData?.perfil?.biografia, 255)) {
        stepErrors["perfil.biografia"] = "Diminua o tamanho da biografia";
      }
      if (!isMinValue(formData.perfil?.senha, 8)) {
        stepErrors["perfil.senha"] =
          "A senha precisa de no mínimo oito dígitos";
      }
      if (formData.perfil.senha !== formData.perfil.confirmaSenha) {
        stepErrors["perfil.confirmaSenha"] = "As senhas não conferem";
      }
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      return false;
    }

    return true;
  };

  const finalizeRegister = async () => {
    try {
      await registerRecrutador(formData);
      showNotification("success", null, "Cadastro concluído com sucesso!");
      navigate("/login");
    } catch (error) {
      showNotification(
        "error",
        "Erro ao cadastrar recrutador. Verifique os campos do formulário."
      );
    }
  };

  return (
    <RegisterRecrutadorContext.Provider
      value={{
        formData,
        setField,
        errors,
        validateStep,
        finalizeRegister,
      }}
    >
      {children}
    </RegisterRecrutadorContext.Provider>
  );
};
