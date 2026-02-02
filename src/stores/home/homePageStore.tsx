import axios from "axios";
import {
  createContext,
  useContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Perfil } from "@domains/Perfil";
import type { Vaga } from "@domains/Vaga";
import { getAllCandidato } from "@routes/routesCandidato";
import { getAllRecrutador } from "@routes/routesRecrutador";

const API_URL = import.meta.env.VITE_BACKEND_URL;

interface HomePageContextType {
  vagas: Vaga[];
  perfis: Perfil[];

  activeIndex: number;
  setActiveIndex: (index: number) => void;

  selectedVaga: Vaga | null;
  isDetailsOpen: boolean;
  openDetails: (vaga: Vaga) => void;
  closeDetails: () => void;

  items: { label: string }[];

  refreshVagas: () => Promise<void>;
  refreshPerfis: () => Promise<void>;
  refreshAll: () => Promise<void>;
}

const HomePageContext = createContext<HomePageContextType | null>(null);

export const useHomePage = (): HomePageContextType => {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error("useHomePage must be used within a HomePageProvider");
  }
  return context;
};

function uniquePerfisById(perfis: Perfil[]) {
  const map = new Map<number, Perfil>();
  for (const p of perfis) {
    if (p?.id != null) map.set(p.id, p);
  }
  return Array.from(map.values());
}

interface HomePageProviderProps {
  children: ReactNode;
}

export const HomePageProvider = ({ children }: HomePageProviderProps) => {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [perfis, setPerfis] = useState<Perfil[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);

  const items = useMemo(
    () => [
      { label: `Vagas (${vagas.length})` },
      { label: `Perfis (${perfis.length})` },
    ],
    [vagas.length, perfis.length]
  );

  const isDetailsOpen = selectedVaga !== null;

  const openDetails = useCallback((vaga: Vaga) => {
    setSelectedVaga(vaga);
  }, []);

  const closeDetails = useCallback(() => {
    setSelectedVaga(null);
  }, []);

  const refreshVagas = useCallback(async () => {
  try {
    const res = await fetch(`${API_URL}/vagas`);
    if (!res.ok) throw new Error(`Erro HTTP ${res.status} ao buscar vagas`);
    const data = (await res.json()) as Vaga[];

    const vPublicas = (Array.isArray(data) ? data : []).filter(
      (v) => v?.ehPublica
    );

    setVagas(vPublicas);
  } catch (err) {
    console.error("Erro ao buscar vagas:", err);
    setVagas([]);
  }
}, []);

  const refreshPerfis = useCallback(async () => {
    try {
      const [candidatos, recrutadores] = await Promise.all([
        getAllCandidato(),
        getAllRecrutador(),
      ]);
      
      const perfisExtraidos = [
      ...(Array.isArray(candidatos) ? candidatos : [])
        .map((c: { perfil?: Perfil }) => c?.perfil)
        .filter(Boolean),
      ...(Array.isArray(recrutadores) ? recrutadores : [])
        .map((r: { perfil?: Perfil }) => r?.perfil)
        .filter(Boolean),
      ] as Perfil[];

      setPerfis(uniquePerfisById(perfisExtraidos));

    } catch (err) {

      if (axios.isAxiosError(err)) {
      console.error(
        "Erro ao buscar perfis:",
        err.response?.status,
        err.response?.data ?? err.message
      );
      } else {
        console.error("Erro ao buscar perfis:", err);
      }
      setPerfis([]);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    await Promise.all([refreshVagas(), refreshPerfis()]);
  }, [refreshVagas, refreshPerfis]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const value: HomePageContextType = {
    vagas,
    perfis,

    activeIndex,
    setActiveIndex,

    selectedVaga,
    isDetailsOpen,
    openDetails,
    closeDetails,

    items,

    refreshVagas,
    refreshPerfis,
    refreshAll,
  };

  return (
    <HomePageContext.Provider value={value}>
      {children}
    </HomePageContext.Provider>
  );
};
