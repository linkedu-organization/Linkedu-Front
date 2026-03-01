import { useState } from "react";
import type { Vaga } from "@domains/Vaga";
import type { Candidato } from "@domains/Candidato";
import { createRecommendedCandidates, getRecommendedCandidates } from "@routes/routesRecomendacao";
import { getCandidato } from "@routes/routesCandidato";


export const useRecommendedCandidatos = () => {

    type RecommendedItem = {
      vagaId: number;
      candidatoId: number;
      score: number;
    };

    const [isRecommendedOpen, setIsRecommendedOpen] = useState(false);
    const [recommendedVaga, setRecommendedVaga] = useState<Vaga | null>(null);
    const [loadingCandidates, setLoadingCandidates] = useState(false);

    const [recommendedCandidates, setRecommendedCandidates] = useState<RecommendedItem[]>([]);
    const [recommendedProfiles, setRecommendedProfiles] = useState<Record<number, Candidato>>({});
    const [loadingProfiles, setLoadingProfiles] = useState(false);

    const [recommendedError, setRecommendedError] = useState<string | null>(null);
    const [recommendedCache, setRecommendedCache] = useState<Record<number, RecommendedItem[]>>({});
    const [forceUpdate, setForceUpdate] = useState(false);

    const openRecommended = async (vaga: Vaga) => {
      setRecommendedVaga(vaga);
      setIsRecommendedOpen(true);
      if (forceUpdate) {
        setForceUpdate(false); 
      } else {
        if (recommendedCache[vaga.id]) {
          setRecommendedCandidates(recommendedCache[vaga.id]); 
          return;
      }
    }
    
      setLoadingCandidates(true);
      setRecommendedError(null);
      setRecommendedCandidates([]);
      setRecommendedProfiles({});
    
      try {
        await createRecommendedCandidates(Number(vaga.id));
        const data = await getRecommendedCandidates(Number(vaga.id));
        const list: RecommendedItem[] = Array.isArray(data) ? data : (data?.candidatos ?? []);
        setRecommendedCandidates(list);
        setRecommendedCache((prevCache) => ({
          ...prevCache,
          [vaga.id]: list, 
        }));
        setLoadingProfiles(true);
        const uniqueIds = Array.from(new Set(list.map((x) => x.candidatoId)));
        const results = await Promise.all(
          uniqueIds.map(async (id) => {
          const candidato = await getCandidato(id);
          console.log("candidato completo:", candidato);
          return [id, candidato] as const;
          })
        );
        setRecommendedProfiles(Object.fromEntries(results));
      } catch (err) {
        setRecommendedError("Erro ao buscar candidatos recomendados.");
      } finally {
        setLoadingCandidates(false);
        setLoadingProfiles(false);
      }
    };

    const closeRecommended = () => {
      setIsRecommendedOpen(false);
      setRecommendedVaga(null);
      setRecommendedCandidates([]);
      setRecommendedError(null);
      setLoadingCandidates(false);
    }; 

    return {
        isRecommendedOpen,
        recommendedVaga,
        loadingCandidates,
        recommendedCandidates,
        recommendedProfiles,
        loadingProfiles,
        recommendedError,

        openRecommended,
        closeRecommended,

        forceUpdate,
        setForceUpdate,
        recommendedCache,
        setRecommendedCache,
    };

};