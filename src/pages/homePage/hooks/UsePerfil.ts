import { useEffect, useState } from "react";
import type { Perfil } from "../../../domains/Perfil";

const API_URL = import.meta.env.VITE_BACKEND_URL;

type UsePerfilResult = {
  perfis: Perfil[];
};

export function usePerfil(): UsePerfilResult {
  const [perfis, setPerfis] = useState<Perfil[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPerfis = async () => {
      try {
        const [candidatosRes, recrutadoresRes] = await Promise.all([
          fetch(`${API_URL}/candidatos`, { signal: controller.signal }),
          fetch(`${API_URL}/recrutadores`, { signal: controller.signal }),
        ]);

        const [candidatos, recrutadores] = await Promise.all([
          candidatosRes.json(),
          recrutadoresRes.json(),
        ]);

        setPerfis([...(candidatos as Perfil[]), ...(recrutadores as Perfil[])]);
      } catch (error: any) {
        if (error?.name !== "AbortError") {
          console.error("Erro ao buscar perfis:", error);
        }
      }
    };

    fetchPerfis();
    return () => controller.abort();
  }, []);

  return { perfis };
}