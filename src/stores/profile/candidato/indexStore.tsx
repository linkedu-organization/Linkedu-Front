import { createContext, useContext, type ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCandidato,
  deleteCandidato,
  updateCandidato,
} from "@routes/routesCandidato";
import { type Candidato } from "@domains/Candidato";
import { useNotification } from "@contexts/notificationContext";
import type { Experiencia } from "@domains/Experiencia";
import { getAllExperienciaByCandidato } from "@routes/routesExperiencia";

interface ProfileCandidatoContextType {
  formData: Candidato;
  experiencias: Experiencia[];
  updateCand: () => void;
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
      const experienciasCand = await getAllExperienciaByCandidato(formData?.id);
      setExperiencias(experienciasCand);
    } catch (error) {
      showNotification("error", "Erro ao carregar usuário");
    }
  };

  const updateCand = async () => {
    try {
      // validar campos
      const response = await updateCandidato(formData, formData?.id);
      setFormData(response);
      navigate("/profile/candidato");
      showNotification("success", "Dados atualizados com sucesso!");
    } catch (error) {
      showNotification("error", "Houve um erro ao atualizar a conta");
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
        updateCand,
        deleteCand,
        getCandById,
      }}
    >
      {children}
    </ProfileCandidatoContext.Provider>
  );
};
