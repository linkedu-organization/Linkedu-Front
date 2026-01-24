import { createContext, useContext, type ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCandidato } from "@routes/routesCandidato";
import { defaultCandidato, type Candidato } from "@domains/Candidato";
import { useNotification } from "@contexts/notificationContext";
import { isEmail, isValueValid } from "@utils/utils";
import { validarEmail } from "@routes/routesPerfil";

type FieldErrors = Record<string, string>;

interface RegisterCandidatoContextType {
  formData: Candidato;
  setField: (field: string, value: unknown) => void;
  errors: FieldErrors;
  validateStep: (stepIndex: number) => Promise<boolean>;
  finalizeRegister: () => Promise<void>;
}

const RegisterCandidatoContext =
  createContext<RegisterCandidatoContextType | null>(null);

export const useRegisterCandidato = (): RegisterCandidatoContextType => {
  const context = useContext(RegisterCandidatoContext);
  if (!context) {
    throw new Error(
      "useRegisterCandidato must be used within a RegisterCandidatoProvider"
    );
  }
  return context;
};

const initialFormData: Candidato = defaultCandidato;

interface RegisterCandidatoProviderProps {
  children: ReactNode;
}

export const RegisterCandidatoProvider = ({
  children,
}: RegisterCandidatoProviderProps) => {
  const [formData, setFormData] = useState<Candidato>(initialFormData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const requiredByStep: Record<number, Array<string>> = {
    0: [
      "perfil.biografia",
      "perfil.nome",
      "perfil.email",
      "perfil.senha",
      "perfil.confirmaSenha",
    ],
    1: ["perfil.tipo", "instituicao", "areaAtuacao", "nivelEscolaridade"],
    2: ["disponivel", "areasInteresse", "habilidades"],
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
      const updatedFormData: Candidato = { ...prev };

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
      const invalidArray = Array.isArray(v) && v.length === 0;
      if (!isValueValid(v) || invalidArray) {
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

      if (formData.perfil.senha !== formData.perfil.confirmaSenha) {
        stepErrors["perfil.confirmaSenha"] = "As senhas não conferem";
      }
    }

    if (step === 2) {
      if (formData.disponivel && formData.tempoDisponivel <= 0) {
        stepErrors.tempoDisponivel = "Informe um tempo disponível válido";
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
      await registerCandidato(formData);
      showNotification("success", null, "Candidato cadastrado com sucesso!");
      navigate("/login");
    } catch (error) {
      showNotification(
        "error",
        "Erro ao cadastrar candidato. Verifique os campos do formulário."
      );
    }
  };

  return (
    <RegisterCandidatoContext.Provider
      value={{
        formData,
        setField,
        errors,
        validateStep,
        finalizeRegister,
      }}
    >
      {children}
    </RegisterCandidatoContext.Provider>
  );
};
