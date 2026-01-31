import { useEffect, useState } from "react";
import type { Vaga } from "../../../domains/Vaga";

const API_URL = import.meta.env.VITE_BACKEND_URL;

type UseVagasResult = {
  vagas: Vaga[];
};

export function useVagas(): UseVagasResult {
    const [vagas, setVagas] = useState<Vaga[]>([]);
    
      useEffect(() => {
         const fetchVagas = async () => {
          try { 
            const response = await fetch(`${API_URL}/vagas`);
            const data = await response.json();
            setVagas(data);
          } catch (error) {
            console.error("Erro ao buscar vagas:", error);
          }
        };
    
        fetchVagas();
      }, []);

    return { vagas };
}