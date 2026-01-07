import { createContext, useContext, type ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCandidato } from "@routes/routesCandidato";
import { defaultCandidato, type Candidato } from "@domains/Candidato";
import { useNotification } from "@contexts/notificationContext";

interface RegisterCandidatoContextType {
  formData: Candidato;
  setField: (field: string, value: unknown) => void;
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
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const setField = (field: string, value: unknown) => {
    setFormData((prev) => {
      const updatedFormData: any = { ...prev };

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

  const validateStep = async (step: number) => {
    if (step === 0) {
      if (!formData.perfil.nome.trim()) return false;
      if (!formData.perfil.email.trim()) return false;
      if (!formData.perfil.senha) return false;
      if (formData.perfil.senha !== formData.perfil.confirmaSenha) return false;
      return true;
    }

    if (step === 1) {
      if (!formData.perfil.tipo) return false;
      if (!formData.instituicao) return false;
      if (!formData.areaAtuacao) return false;
      if (!formData.nivelEscolaridade) return false;
      if (!formData.periodoIngresso) return false;
      if (!formData.periodoConclusao) return false;
      return true;
    }

    if (step === 2) {
      if (formData.disponivel === null) return false;
      if (formData.disponivel && (formData.tempoDisponivel ?? 0) <= 0)
        return false;
      return true;
    }

    return true;
  };

  const finalizeRegister = async () => {
    try {
      await registerCandidato(formData);
      showNotification("success", null, "Usuário cadastrado com sucesso!");
      navigate("/login");
    } catch (error) {
      showNotification(
        "error",
        "Erro ao cadastrar usuário. Verifique os campos do formulário.",
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
