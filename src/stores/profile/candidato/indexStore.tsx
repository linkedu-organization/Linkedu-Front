import { createContext, useContext, type ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCandidato, deleteCandidato } from "@routes/routesCandidato";
import { type Candidato } from "@domains/Candidato";
import { useNotification } from "@contexts/notificationContext";
import type { Experiencia } from "@domains/Experiencia";

interface ProfileCandidatoContextType {
  formData: Candidato;
  experiencias: Experiencia[];
  deleteCand: () => void;
  getCandById: (id: string) => void;
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
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const getCandById = async (id: string) => {
    try {
      const response = await getCandidato(id);
      setFormData(response);
      setExperiencias(response.experiencias ?? []);
    } catch (error) {
      showNotification("error", "Erro ao carregar usuário");
    }
  };

  const deleteCand = async () => {
    try {
      await deleteCandidato(formData?.id);
      showNotification("success", "Conta excluída com sucesso!");
      // handleLogout();
      navigate("/");
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
      }}
    >
      {children}
    </ProfileCandidatoContext.Provider>
  );
};
