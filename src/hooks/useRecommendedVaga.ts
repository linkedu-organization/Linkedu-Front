import { useState } from "react";
import { createRecommendedVagas, getRecommendedVagas } from "@routes/routesRecomendacao";
import type { Vaga } from "@domains/Vaga";

export const useRecommendedVagas = () => {

  type Recomendacao = {
    candidatoId: number;
    descricao: string;
    score: number;
    tipo: string;
    updateAt: Date;
    vaga: Vaga;
    vagaId: number;
  };
  
  const [recommendedVagas, setRecommendedVagas] = useState<Recomendacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendedCache, setRecommendedCache] = useState<Recomendacao[]>([]);

  const fetchRecommendedVagas = async () => {
    setLoading(true);
    setError(null);

    try {
      if (recommendedCache.length > 0) {
        setRecommendedVagas(recommendedCache);
        return;
      }

      setRecommendedVagas([]);
      await createRecommendedVagas();
      const vagasRecomendadas = await getRecommendedVagas();
      console.log(vagasRecomendadas[0]); 

      if(vagasRecomendadas.status === 503)
        throw new Error("Serviço de recomendação temporariamente indisponível. Por favor, tente novamente mais tarde.");
      
      const uniqueVagas = vagasRecomendadas.filter((vagasRecomendadas: any) =>
        vagasRecomendadas.vaga.ehPublica === true 
      );

      setRecommendedVagas(uniqueVagas);
      setRecommendedCache(uniqueVagas); 

    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    setRecommendedCache([]); 
    fetchRecommendedVagas();
  };

  return {
    recommendedVagas,
    loading,
    error,
    refetch, 
    fetchRecommendedVagas,
  };
};