import {
  createContext,
  useContext,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import type { Perfil } from "@domains/Perfil";
import type { Vaga } from "@domains/Vaga";
import { getAllCandidato } from "@routes/routesCandidato";
import { getAllRecrutador } from "@routes/routesRecrutador";
import { getAllVagas } from "@routes/routesVaga";
import { useNotification } from "@contexts/notificationContext";

interface HomePageContextType {
  vagas: Vaga[];
  perfis: Perfil[];
}

const HomePageContext = createContext<HomePageContextType | null>(null);

export const useHomePage = (): HomePageContextType => {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error("useHomePage must be used within a HomePageProvider");
  }
  return context;
};

interface HomePageProviderProps {
  children: ReactNode;
}

export const HomePageProvider = ({ children }: HomePageProviderProps) => {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const { showNotification } = useNotification();

  const uniquePerfisById = (perfis: Perfil[]) => {
    const map = new Map<number, Perfil>();
    perfis.forEach((p) => p?.id != null && map.set(p.id, p));
    return Array.from(map.values());
  };

  const getVagas = useCallback(async () => {
    try {
      const response = await getAllVagas();
      const vagasPublicas = (response ?? []).filter((v) => v?.ehPublica);

      setVagas(vagasPublicas);
    } catch (error) {
      showNotification("error", "Erro ao carregar vagas");
    }
  }, []);

  const getPerfis = useCallback(async () => {
    try {
      const [candidatos, recrutadores] = await Promise.all([
        getAllCandidato(),
        getAllRecrutador(),
      ]);

      const perfisData: Perfil[] = [
        ...(candidatos ?? [])
          .filter((c) => c?.perfil)
          .map((c) => ({
            ...c.perfil,
            candidato: c,
            recrutador: undefined,
          })),
        ...(recrutadores ?? [])
          .filter((r) => r?.perfil)
          .map((r) => ({
            ...r.perfil,
            recrutador: r,
            candidato: undefined,
          })),
      ];

      setPerfis(uniquePerfisById(perfisData));
    } catch (err) {
      showNotification("error", "Erro ao carregar perfis");
      setPerfis([]);
    }
  }, []);

  const getAllData = useCallback(async () => {
    await Promise.all([getVagas(), getPerfis()]);
  }, [getVagas, getPerfis]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const value: HomePageContextType = {
    vagas,
    perfis,
  };

  return (
    <HomePageContext.Provider value={value}>
      {children}
    </HomePageContext.Provider>
  );
};
