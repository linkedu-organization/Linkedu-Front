import { useEffect, useState } from "react";
import type { Perfil } from "@domains/Perfil";

const API_URL = import.meta.env.VITE_BACKEND_URL;

type UsePerfilResult = { perfis: Perfil[] };

function uniquePerfisById(perfis: Perfil[]) {
  const map = new Map<number, Perfil>();
  for (const p of perfis) {
    if (p?.id != null) map.set(p.id, p);
  }
  return Array.from(map.values());
}

export function usePerfil(): UsePerfilResult {
  const [perfis, setPerfis] = useState<Perfil[]>([]);

  useEffect(() => {

    const fetchPerfis = async () => {
      try {
        const [candidatosRes, recrutadoresRes] = await Promise.all([
          fetch(`${API_URL}/candidatos`),
          fetch(`${API_URL}/recrutadores`),
        ]);

        const [candidatos, recrutadores] = await Promise.all([
          candidatosRes.json() as Promise<Perfil[]>,
          recrutadoresRes.json() as Promise<Perfil[]>,
        ]);

        const perfisExtraidos = [
          ...candidatos.map((c) => c.perfil).filter(Boolean),
          ...recrutadores.map((r) => r.perfil).filter(Boolean),
        ] as Perfil[];

        setPerfis(uniquePerfisById(perfisExtraidos));
      } catch (error) {
            console.error("Erro ao buscar vagas:", error);
      }
    };

    fetchPerfis();
  }, []);

  return { perfis };
} 