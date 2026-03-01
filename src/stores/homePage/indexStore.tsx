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
import { getAllVagas } from "@routes/routesVaga";
import { useNotification } from "@contexts/notificationContext";

type FilterField = { campo: string; operador: "eq" | "in"; valor: any };
type Sorter = { campo: string; ordem: "ASC" | "DESC" };

type FetchArgs = { filters?: FilterField[]; sorters?: Sorter[] };

interface HomePageContextType {
  vagas: Vaga[];
  perfis: Perfil[];
  fetchVagas: (args?: FetchArgs) => Promise<void>;
  fetchPerfis: (args?: FetchArgs) => Promise<void>;
  refresh: () => Promise<void>;
}

const HomePageContext = createContext<HomePageContextType | null>(null);

export const useHomePage = (): HomePageContextType => {
  const context = useContext(HomePageContext);
  if (!context) throw new Error("useHomePage must be used within a HomePageProvider");
  return context;
};

interface HomePageProviderProps {
  children: ReactNode;
}

const uniqueById = (perfis: Perfil[]) => {
  const map = new Map<number, Perfil>();
  for (const p of perfis) if (p?.id != null) map.set(p.id, p);
  return Array.from(map.values());
};

const applyFilters = <T extends Record<string, any>>(data: T[], filters: FilterField[]) => {
  if (!filters?.length) return data;
  return data.filter((row) =>
    filters.every((f) => {
      const v = row?.[f.campo];
      if (f.operador === "eq") return v === f.valor;
      if (f.operador === "in") return Array.isArray(f.valor) && f.valor.includes(v);
      return true;
    })
  );
};

const applySort = <T extends Record<string, any>>(data: T[], sorter?: Sorter) => {
  if (!sorter?.campo) return data;
  const dir = sorter.ordem === "ASC" ? 1 : -1;

  return [...data].sort((a, b) => {
    const va = a?.[sorter.campo];
    const vb = b?.[sorter.campo];

    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;

    if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;

    return (
      String(va).localeCompare(String(vb), "pt-BR", { sensitivity: "base" }) * dir
    );
  });
};

const mapPerfisFromApi = (candidatos: any[] = [], recrutadores: any[] = []) => {
  const fromCandidatos: Perfil[] = candidatos
    .filter((c) => c?.perfil)
    .map((c) => ({
      ...c.perfil,
      candidato: c,
      recrutador: undefined,
    }));

  const fromRecrutadores: Perfil[] = recrutadores
    .filter((r) => r?.perfil)
    .map((r) => ({
      ...r.perfil,
      recrutador: r,
      candidato: undefined,
    }));

  return uniqueById([...fromCandidatos, ...fromRecrutadores]);
};

export const HomePageProvider = ({ children }: HomePageProviderProps) => {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const { showNotification } = useNotification();

  const fetchVagas = useCallback(
    async (args?: FetchArgs) => {
      try {
        const filters = args?.filters ?? [];
        const sorters = args?.sorters ?? [];

        const response = await getAllVagas({ filters, sorters });
        setVagas((response ?? []).filter((v) => v?.ehPublica));
      } catch {
        showNotification("error", "Erro ao carregar vagas");
        setVagas([]);
      }
    },
    [showNotification]
  );

  const fetchPerfis = useCallback(
    async (args?: FetchArgs) => {
      try {
        const filters = args?.filters ?? [];
        const sorters = args?.sorters ?? [];

        const [candidatos, recrutadores] = await Promise.all([
          getAllCandidato(),
          getAllRecrutador(),
        ]);

        const base = mapPerfisFromApi(candidatos ?? [], recrutadores ?? []);
        const filtered = applyFilters(base as any[], filters as FilterField[]);
        const sorted = sorters.length ? applySort(filtered, sorters[0]) : filtered;

        setPerfis(sorted as Perfil[]);
      } catch {
        showNotification("error", "Erro ao carregar perfis");
        setPerfis([]);
      }
    },
    [showNotification]
  );

  const refresh = useCallback(async () => {
    await Promise.all([fetchVagas(), fetchPerfis()]);
  }, [fetchVagas, fetchPerfis]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo<HomePageContextType>(
    () => ({
      vagas,
      perfis,
      fetchVagas,
      fetchPerfis,
      refresh,
    }),
    [vagas, perfis, fetchVagas, fetchPerfis, refresh]
  );

   return (
    <HomePageContext.Provider value={value}>
      {children}
    </HomePageContext.Provider>
  );
};