import { createContext, useContext, type ReactNode, useState } from "react";
import { getCandidato, deleteCandidato } from "@routes/routesCandidato";
import { type Candidato } from "@domains/Candidato";
import { useNotification } from "@contexts/notificationContext";
import type { Experiencia } from "@domains/Experiencia";
import { deleteExperiencia } from "@routes/routesExperiencia";
import { useAuth } from "@contexts/authContext";

interface ProfileCandidatoContextType {
  formData: Candidato;
  experiencias: Experiencia[];
  deleteCand: () => void;
  deleteExp: (id: number, callback: Function) => void;
  getCandById: (id: string) => void;
  loading: boolean;
}

const ProfileCandidatoContext =
  createContext<ProfileCandidatoContextType | null>(null);

export const useProfileCandidato = (): ProfileCandidatoContextType => {
  const context = useContext(ProfileCandidatoContext);
  if (!context) {
    throw new Error(
      "useProfileCandidato must be used within a ProfileCandidatoProvider"
    );
  }
  return context;
};

interface ProfileCandidatoProviderProps {
  children: ReactNode;
}

export const ProfileCandidatoProvider = ({
  children,
}: ProfileCandidatoProviderProps) => {
  const [formData, setFormData] = useState<Candidato>();
  const [experiencias, setExperiencias] = useState<Experiencia[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const { handleLogout } = useAuth();
  const { showNotification } = useNotification();

  const getCandById = async (id: string) => {
    setLoading(true);
    try {
      const response = await getCandidato(id);
      setFormData(response);
      setExperiencias(response.experiencias ?? []);
    } catch (error) {
      showNotification("error", "Erro ao carregar usuário");
    } finally {
      setLoading(false);
    }
  };

  const deleteCand = async () => {
    try {
      await deleteCandidato(formData?.id);
      showNotification("success", "Conta excluída com sucesso!");
      handleLogout();
    } catch (error) {
      showNotification("error", "Houve um erro ao excluir a conta");
    }
  };

  const deleteExp = async (idExp: number, callback: Function) => {
    try {
      await deleteExperiencia(idExp);
      callback?.();
      showNotification("success", "Experiência excluída com sucesso!");
    } catch (error) {
      showNotification("error", "Houve um erro ao excluir a conta");
    }
  };

  return (
    <ProfileCandidatoContext.Provider
      value={{
        formData,
        experiencias,
        deleteCand,
        getCandById,
        deleteExp,
        loading,
      }}
    >
      {children}
    </ProfileCandidatoContext.Provider>
  );
};
