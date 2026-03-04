import { createContext, useContext, type ReactNode, useState } from "react";
import { useNotification } from "@contexts/notificationContext";
import type { Recrutador } from "@domains/Recrutador";
import type { Vaga } from "@domains/Vaga";
import { deleteVaga, getAllVagas } from "@routes/routesVaga";
import { deleteRecrutador, getRecrutador } from "@routes/routesRecrutador";
import { useAuth } from "@contexts/authContext";

interface ProfileRecrutadorContextType {
  formData: Recrutador;
  vagas: Vaga[];
  deleteRec: () => void;
  deleteVag: (id: number, callback: Function) => void;
  getRecById: (id: string) => void;
  loading: boolean;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [vagas, setVagas] = useState<Vaga[]>();
  const { showNotification } = useNotification();
  const { handleLogout } = useAuth();

  const getRecById = async (id: string) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const deleteRec = async () => {
    try {
      await deleteRecrutador(formData?.id);
      showNotification("success", "Conta excluída com sucesso!");
      handleLogout();
    } catch (error) {
      showNotification("error", "Houve um erro ao excluir a conta");
    }
  };

  const deleteVag = async (idVaga: number, callback: Function) => {
    try {
      await deleteVaga(idVaga);
      callback?.();
      showNotification("success", "Vaga excluída com sucesso!");
    } catch (error) {
      showNotification("error", "Houve um erro ao excluir a vaga");
    }
  };

  return (
    <ProfileRecrutadorContext.Provider
      value={{
        formData,
        vagas,
        deleteRec,
        getRecById,
        deleteVag,
        loading,
      }}
    >
      {children}
    </ProfileRecrutadorContext.Provider>
  );
};
