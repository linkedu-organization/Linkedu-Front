import { createContext, useContext, type ReactNode, useState } from "react";
import type { Candidato } from "@domains/Candidato";
import { useNotification } from "@contexts/notificationContext";
import { isEmail, isValueValid, isMaxValue } from "@utils/utils";
import { validarEmail } from "@routes/routesPerfil";
import { updateCandidato } from "@routes/routesCandidato";

type FieldErrors = Record<string, string>;

interface RegisterEditCandidatoContextType {
  formData: Candidato;
  setInitialData: (candidato: Candidato) => void;
  setField: (field: string, value: unknown) => void;
  errors: FieldErrors;
  validate: () => Promise<boolean>;
  submit: (callback: () => void) => Promise<Candidato | null>;
  errorsForm: (path: string) => ReactNode;
}

const RegisterEditCandidatoContext =
  createContext<RegisterEditCandidatoContextType | null>(null);

export const useRegisterEditCandidato =
  (): RegisterEditCandidatoContextType => {
    const ctx = useContext(RegisterEditCandidatoContext);
    if (!ctx) {
      throw new Error(
        "useRegisterEditCandidato must be used within a RegisterEditCandidatoProvider"
      );
    }
    return ctx;
  };

export const RegisterEditCandidatoProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [initialData, setInitialDataState] = useState<Candidato>();
  const [formData, setFormData] = useState<Candidato>();
  const [errors, setErrors] = useState<FieldErrors>({});
  const { showNotification } = useNotification();

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

  const setInitialData = (candidato: Candidato) => {
    setInitialDataState(candidato);

    const cloned =
      typeof structuredClone === "function"
        ? structuredClone(candidato)
        : JSON.parse(JSON.stringify(candidato));

    setFormData(cloned);
    setErrors({});
  };

  const setField = (field: string, value: unknown) => {
    setFormData((prev) => {
      if (!prev) return prev;

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

  const validateChangedEmail = async (email: string): Promise<boolean> => {
    try {
      const oldEmail = (initialData?.perfil?.email ?? "").trim();
      const newEmail = (email ?? "").trim();

      if (oldEmail && newEmail && oldEmail === newEmail) return true;

      const response = await validarEmail(email);
      return response.status === 200;
    } catch {
      return false;
    }
  };

  const validate = async (): Promise<boolean> => {
    if (!formData) return false;

    const stepErrors: FieldErrors = {};

    const required: string[] = [
      "perfil.nome",
      "perfil.email",
      "cargo",
      "instituicao",
      "areaAtuacao",
      "nivelEscolaridade",
      "areasInteresse",
      "habilidades",
      "disponivel",
    ];

    required.forEach((path) => {
      const v = getByPath(formData, path);
      const invalidArray = Array.isArray(v) && v.length === 0;

      if (!isValueValid(v) || invalidArray) {
        stepErrors[path] = "Campo obrigatório";
      }
    });

    const email = (formData.perfil?.email ?? "").trim();
    if (!isEmail(email)) {
      stepErrors["perfil.email"] = "E-mail inválido";
    } else if (!(await validateChangedEmail(email))) {
      stepErrors["perfil.email"] = "E-mail já cadastrado";
    }

    if (!isMaxValue(formData?.perfil?.biografia, 255)) {
      stepErrors["perfil.biografia"] = "Diminua o tamanho da biografia";
    }

    if (
      formData.disponivel &&
      (formData.tempoDisponivel === 0 ||
        !isValueValid(formData.tempoDisponivel))
    ) {
      stepErrors.tempoDisponivel = "Informe um tempo disponível válido";
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      return false;
    }

    return true;
  };

  const errorsForm = (path: string) =>
    errors[path] && <small className="p-error">{errors[path]}</small>;

  const submit = async (callback: () => void): Promise<Candidato | null> => {
    try {
      if (formData && (await validate())) {
        const response = await updateCandidato(formData.id, formData);

        showNotification("success", null, "Dados atualizados com sucesso!");
        setInitialData(response);
        callback?.();
        return response;
      }
    } catch (error) {
      showNotification("error", "Houve um erro ao atualizar a conta");
    }
  };

  return (
    <RegisterEditCandidatoContext.Provider
      value={{
        formData,
        setInitialData,
        setField,
        errors,
        validate,
        submit,
        errorsForm,
      }}
    >
      {children}
    </RegisterEditCandidatoContext.Provider>
  );
};
