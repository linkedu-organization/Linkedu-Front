import { createContext, useContext, type ReactNode, useState } from "react";

import {
  defaultExperiencia,
  type Experiencia,
  type ExperienciaSubmit,
} from "@domains/Experiencia";
import type { Candidato } from "@domains/Candidato";
import { useNotification } from "@contexts/notificationContext";
import { isValueValid } from "@utils/utils";
import {
  registerExperiencia,
  updateExperiencia,
} from "@routes/routesExperiencia";

type FieldErrors = Record<string, string>;

interface RegisterExperienciaContextType {
  formData: Experiencia;
  setField: (field: string, value: unknown) => void;
  errors: FieldErrors;
  resetForm: () => void;
  validate: () => boolean;
  load: (exp: Experiencia) => void;
  submit: (
    candidato: Candidato,
    callback: Function,
    experienciaId?: string | number
  ) => Promise<Experiencia | null>;
}

const RegisterExperienciaContext =
  createContext<RegisterExperienciaContextType | null>(null);

export const useRegisterExperiencia = (): RegisterExperienciaContextType => {
  const ctx = useContext(RegisterExperienciaContext);
  if (!ctx) {
    throw new Error(
      "useRegisterExperiencia must be used within a RegisterExperienciaProvider"
    );
  }
  return ctx;
};

const initialFormData = defaultExperiencia;

export const RegisterExperienciaProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [formData, setFormData] = useState(initialFormData);
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

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const validate = (): boolean => {
    const stepErrors: FieldErrors = {};

    const required: string[] = [
      "titulo",
      "orientador",
      "instituicao",
      "periodoInicio",
      "descricao",
    ];

    required.forEach((path) => {
      const v = getByPath(formData, path);
      if (!isValueValid(v) || (typeof v === "string" && !v.trim())) {
        stepErrors[path] = "Campo obrigatório";
      }
    });

    if (isValueValid(formData.periodoFim)) {
      if (formData.periodoFim.trim().length === 0) {
        stepErrors.periodoFim = "Período inválido";
      }
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      return false;
    }

    return true;
  };

  const load = (exp: Experiencia) => {
    setFormData({
      ...initialFormData,
      ...exp,
    });
    setErrors({});
  };

  const submit = async (
    candidato: Candidato,
    callback: Function,
    experienciaId?: string | number
  ) => {
    try {
      if (!validate()) return null;

      const payload: ExperienciaSubmit = {
        candidatoId: candidato?.id,
        ...formData,
      };

      if (experienciaId) {
        await updateExperiencia(Number(experienciaId), payload);
        showNotification("success", "Experiência atualizada com sucesso!");
      } else {
        await registerExperiencia(payload);
        showNotification("success", "Experiência criada com sucesso!");
      }

      callback();
      resetForm();
      return formData;
    } catch (error) {
      showNotification(
        "error",
        experienciaId
          ? "Houve um erro ao atualizar a experiência"
          : "Houve um erro ao criar a experiência"
      );
      return null;
    }
  };

  return (
    <RegisterExperienciaContext.Provider
      value={{
        formData,
        setField,
        errors,
        resetForm,
        validate,
        load,
        submit,
      }}
    >
      {children}
    </RegisterExperienciaContext.Provider>
  );
};
