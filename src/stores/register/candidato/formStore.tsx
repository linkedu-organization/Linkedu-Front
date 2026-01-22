import { createContext, useContext, type ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCandidato } from "@routes/routesCandidato";
import { defaultCandidato, type Candidato } from "@domains/Candidato";
import { useNotification } from "@contexts/notificationContext";
import { isEmail, isValueValid } from "@utils/utils";

interface RegisterCandidatoContextType {
  formData: Candidato;
  setField: (field: string, value: unknown) => void;
  validateStep: (stepIndex: number) => boolean;
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
  const { showNotification } = useNotification();
  const navigate = useNavigate();

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
  };

  const requiredByStep: Record<number, Array<string>> = {
    0: [
      "perfil.biografia",
      "perfil.nome",
      "perfil.email",
      "perfil.senha",
      "perfil.confirmaSenha",
    ],
    1: ["perfil.tipo", "instituicao", "areaAtuacao", "nivelEscolaridade"],
  };

  const getByPath = (obj: unknown, path: string) =>
    path.split(".").reduce((acc, key) => acc?.[key], obj);

  const validateStep = (step: number): boolean => {
    const required = requiredByStep[step] ?? [];
    const allFilled = required.every((path) => {
      const v = getByPath(formData, path);
      return isValueValid(v);
    });
    if (!allFilled) return false;

    if (step === 0) {
      if (!isEmail(formData.perfil.email.trim())) return false;
      if (formData.perfil.senha !== formData.perfil.confirmaSenha) return false;
    }

    if (step === 2) {
      if (formData.disponivel === null) return false;
      if (
        formData.areasInteresse.length === 0 ||
        formData.habilidades.length === 0
      )
        return false;
      if (formData.disponivel && formData.tempoDisponivel <= 0) return false;
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
        "Erro ao cadastrar candidato. Verifique os campos do formulário.",
        ""
      );
    }
  };

  return (
    <RegisterCandidatoContext.Provider
      value={{
        formData,
        setField,
        validateStep,
        finalizeRegister,
      }}
    >
      {children}
    </RegisterCandidatoContext.Provider>
  );
};
