import { createContext, useContext, type ReactNode, useState } from "react";
import type { Candidato } from "@domains/Candidato";
import { useNotification } from "@contexts/notificationContext";
import { isEmail, isValueValid, isMaxValue } from "@utils/utils";
import { validarEmail } from "@routes/routesPerfil";
import { updateCandidato } from "@routes/routesCandidato";

type FieldErrors = Record<string, string>;

interface RegisterEditCandidatoContextType {
  formData: Candidato | undefined;
  setInitialData: (candidato: Candidato) => void;
  setField: (field: string, value: unknown) => void;
  errors: FieldErrors;
  resetForm: () => void;
  validate: () => Promise<boolean>;
  submit: (callback: Function) => Promise<Candidato | null>;
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
  const [initialData, setInitialDataState] = useState<Candidato | undefined>();
  const [formData, setFormData] = useState<Candidato | undefined>();
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
    // snapshot
    setInitialDataState(candidato);

    // clona pra edição (evita mutação do objeto da tela)
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

  const resetForm = () => {
    if (!initialData) return;

    const cloned =
      typeof structuredClone === "function"
        ? structuredClone(initialData)
        : JSON.parse(JSON.stringify(initialData));

    setFormData(cloned);
    setErrors({});
  };

  const validateEmailUnique = async (email: string): Promise<boolean> => {
    try {
      const oldEmail = (initialData?.perfil?.email ?? "").trim().toLowerCase();
      const newEmail = (email ?? "").trim().toLowerCase();

      // se não mudou, não precisa checar no backend
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

    // obrigatórios (igual ao layout do print)
    const required: string[] = [
      "perfil.nome",
      "perfil.email",
      "perfil.biografia",
      "cargo",
      "instituicao",
      "areaAtuacao",
      "nivelEscolaridade",
      "periodoIngresso",
      "periodoConclusao",
      "areasInteresse",
      "habilidades",
      "disponivel",
    ];

    required.forEach((path) => {
      const v = getByPath(formData, path);
      const invalidArray = Array.isArray(v) && v.length === 0;

      if (
        !isValueValid(v) ||
        invalidArray ||
        (typeof v === "string" && !v.trim())
      ) {
        stepErrors[path] = "Campo obrigatório";
      }
    });

    // valida email
    const email = (formData.perfil?.email ?? "").trim();
    if (!isEmail(email)) {
      stepErrors["perfil.email"] = "E-mail inválido";
    } else if (!(await validateEmailUnique(email))) {
      stepErrors["perfil.email"] = "E-mail já cadastrado";
    }

    // valida biografia tamanho
    if (!isMaxValue(formData?.perfil?.biografia, 255)) {
      stepErrors["perfil.biografia"] = "Diminua o tamanho da biografia";
    }

    // regra: se disponível, exige tempoDisponivel
    if (formData.disponivel && !isValueValid(formData.tempoDisponivel)) {
      stepErrors.tempoDisponivel = "Informe um tempo disponível válido";
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      return false;
    }

    return true;
  };

  const submit = async (callback: Function): Promise<Candidato | null> => {
    try {
      if (!formData) return null;

      const ok = await validate();
      if (!ok) return null;

      const response = await updateCandidato(formData, formData.id);

      showNotification("success", null, "Dados atualizados com sucesso!");
      setInitialData(response); // mantém o snapshot atualizado
      callback?.();

      return response;
    } catch (error) {
      showNotification("error", "Houve um erro ao atualizar a conta");
      return null;
    }
  };

  return (
    <RegisterEditCandidatoContext.Provider
      value={{
        formData,
        setInitialData,
        setField,
        errors,
        resetForm,
        validate,
        submit,
      }}
    >
      {children}
    </RegisterEditCandidatoContext.Provider>
  );
};
