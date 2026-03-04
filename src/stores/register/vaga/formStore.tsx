import { createContext, useContext, type ReactNode, useState } from "react";

import { defaultVaga, type Vaga } from "@domains/Vaga";
import type { Recrutador } from "@domains/Recrutador";
import { useNotification } from "@contexts/notificationContext";
import { isValueValid } from "@utils/utils";
import { registerVaga, updateVaga } from "@routes/routesVaga";

type FieldErrors = Record<string, string>;

interface RegisterVagaContextType {
  formData: Vaga;
  setField: (field: string, value: unknown) => void;
  errors: FieldErrors;
  resetForm: () => void;
  load: () => void;
  validate: () => boolean;
  submit: (
    recrutador: Recrutador,
    callback: () => void,
    vagaId?: string | number
  ) => Promise<Vaga | null>;
}

const RegisterVagaContext = createContext<RegisterVagaContextType | null>(null);

export const useRegisterVaga = (): RegisterVagaContextType => {
  const ctx = useContext(RegisterVagaContext);
  if (!ctx) {
    throw new Error(
      "useRegisterVaga must be used within a RegisterVagaProvider"
    );
  }
  return ctx;
};

const initialFormData = defaultVaga;

export const RegisterVagaProvider = ({ children }: { children: ReactNode }) => {
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
      "ehPublica",
      "categoria",
      "ehRemunerada",
      "dataExpiracao",
      "cargaHoraria",
      "duracao",
      "publicoAlvo",
      "instituicao",
      "curso",
      "conhecimentosObrigatorios",
      "linkInscricao",
      "local",
      "descricao",
    ];

    required.forEach((path) => {
      const v = getByPath(formData, path);
      if (!isValueValid(v) || (typeof v === "string" && !v.trim())) {
        stepErrors[path] = "Campo obrigatório";
      }
    });

    if (
      typeof formData.cargaHoraria !== "number" ||
      !Number.isInteger(formData.cargaHoraria) ||
      formData.cargaHoraria <= 0
    ) {
      stepErrors.cargaHoraria = "Informe uma carga horária válida";
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      return false;
    }

    return true;
  };

  const load = (exp: Vaga) => {
    setFormData({
      ...initialFormData,
      ...exp,
    });
    setErrors({});
  };

  const submit = async (
    recrutador: Recrutador,
    callback: () => void,
    vagaId?: string | number
  ) => {
    try {
      if (validate()) {
        if (recrutador.id == null) {
          showNotification("error", "Recrutador inválido (sem id)");
          return null;
        }

        const payload: Vaga = {
          ...formData,
          recrutadorId: recrutador.id,
          recrutador,
        };

        if (vagaId) {
          await updateVaga(Number(vagaId), payload);
          showNotification("success", "Vaga atualizada com sucesso!");
        } else {
          await registerVaga(payload);
          showNotification("success", "Vaga criada com sucesso!");
        }

        callback();
        resetForm();
      }
    } catch (error) {
      debugger;
      showNotification("error", "Houve um erro ao criar a Vaga");
    }
  };

  return (
    <RegisterVagaContext.Provider
      value={{
        formData,
        setField,
        errors,
        resetForm,
        validate,
        submit,
        load,
      }}
    >
      {children}
    </RegisterVagaContext.Provider>
  );
};
