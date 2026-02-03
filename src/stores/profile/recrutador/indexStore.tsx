import { createContext, useContext, type ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@contexts/notificationContext";
import type { Recrutador } from "@domains/Recrutador";
import type { Vaga } from "@domains/Vaga";
import { getAllVagas } from "@routes/routesVaga";
import {
  deleteRecrutador,
  getRecrutador,
  updateRecrutador,
} from "@routes/routesRecrutador";

interface ProfileRecrutadorContextType {
  formData: Recrutador;
  vagas: Vaga[];
  updateRec: () => void;
  deleteRec: () => void;
  getRecById: (id: string) => void;
}

const ProfileRecrutadorContext =
  createContext<ProfileRecrutadorContextType | null>(null);

export const useProfileRecrutador = (): ProfileRecrutadorContextType => {
  const context = useContext(ProfileRecrutadorContext);
  if (!context) {
    throw new Error(
      "useProfileRecrutador must be used within a ProfileRecrutadorProvider"
    );
  }
  return context;
};

interface ProfileRecrutadorProviderProps {
  children: ReactNode;
}

export const ProfileRecrutadorProvider = ({
  children,
}: ProfileRecrutadorProviderProps) => {
  const [formData, setFormData] = useState<Recrutador>();
  const [vagas, setVagas] = useState<Vaga[]>();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const getRecById = async (id: string) => {
    try {
      const response = await getRecrutador(Number(id));
      setFormData(response);

      const allVagas = await getAllVagas();

      const recrutadorVagas = (allVagas ?? []).filter((v) => {
      const recId = v.recrutadorId ?? v.recrutador?.id;
      return recId === response.id;
    });

    setVagas(recrutadorVagas);
    } catch (error) {
      showNotification("error", "Erro ao carregar usuário");
    }
  };

  const updateRec = async () => {
    try {
      // validar campos
      const response = await updateRecrutador(formData, formData?.id);
      setFormData(response);
      navigate("/profile/recrutador");
      showNotification("success", "Dados atualizados com sucesso!");
    } catch (error) {
      showNotification("error", "Houve um erro ao atualizar a conta");
    }
  };

  const deleteRec = async () => {
    try {
      await deleteRecrutador(formData?.id);
      showNotification("success", "Conta excluída com sucesso!");
      // handleLogout();
      navigate("/");
    } catch (error) {
      showNotification("error", "Houve um erro ao excluir a conta");
    }
  };

  return (
    <ProfileRecrutadorContext.Provider
      value={{
        formData,
        vagas,
        updateRec,
        deleteRec,
        getRecById,
      }}
    >
      {children}
    </ProfileRecrutadorContext.Provider>
  );
};
