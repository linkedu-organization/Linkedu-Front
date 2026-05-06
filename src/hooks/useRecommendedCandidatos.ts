import { useState } from "react";
import type { Vaga } from "@domains/Vaga";
import type { Candidato } from "@domains/Candidato";
import {
  createRecommendedCandidates,
  getRecommendedCandidates,
} from "@routes/routesRecomendacao";
import { getCandidato, getAllCandidato } from "@routes/routesCandidato";

export const useRecommendedCandidatos = () => {
  type RecommendedItem = {
    vagaId: number;
    candidatoId: number;
    score: number;
    descricao: string;
  };

  const [isRecommendedOpen, setIsRecommendedOpen] = useState(false);
  const [recommendedVaga, setRecommendedVaga] = useState<Vaga | null>(null);
  const [loadingCandidates, setLoadingCandidates] = useState(false);

  const [recommendedCandidates, setRecommendedCandidates] = useState<
    RecommendedItem[]
  >([]);
  const [recommendedProfiles, setRecommendedProfiles] = useState<
    Record<number, Candidato>
  >({});
  const [otherProfiles, setOtherProfiles] = useState<Candidato[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);

  const [recommendedError, setRecommendedError] = useState<string | null>(null);
  const [recommendedCache, setRecommendedCache] = useState<
    Record<number, RecommendedItem[]>
  >({});
  const [forceUpdate, setForceUpdate] = useState(false);

  const openRecommended = async (vaga: Vaga) => {
    setRecommendedVaga(vaga);
    setIsRecommendedOpen(true);

    setLoadingCandidates(true);
    setRecommendedError(null);
    setRecommendedCandidates([]);
    setRecommendedProfiles({});
    setOtherProfiles([]);

    try {
      if (!forceUpdate && recommendedCache[vaga.id]) {
        const list = recommendedCache[vaga.id];
        setRecommendedCandidates(list);
        await loadProfilesData(list);
      } else {
        await createRecommendedCandidates(Number(vaga.id));
        const data = await getRecommendedCandidates(Number(vaga.id));
        const list: RecommendedItem[] = Array.isArray(data)
          ? data
          : (data?.candidatos ?? []);

        setRecommendedCandidates(list);
        setRecommendedCache((prevCache) => ({
          ...prevCache,
          [vaga.id]: list,
        }));
        await loadProfilesData(list);
      }

      setForceUpdate(false);
    } catch (err) {
      setRecommendedError("Erro ao buscar candidatos recomendados.");
    } finally {
      setLoadingCandidates(false);
    }
  };

  const loadProfilesData = async (list: RecommendedItem[]) => {
    setLoadingProfiles(true);
    try {
      const recommendedIds = new Set(list.map((x) => x.candidatoId));

      const [profilesResults, allCandidatos] = await Promise.all([
        Promise.all(
          Array.from(recommendedIds).map(async (id) => {
            const candidato = await getCandidato(id);
            return [id, candidato] as const;
          })
        ),
        getAllCandidato(),
      ]);

      setRecommendedProfiles(Object.fromEntries(profilesResults));

      if (Array.isArray(allCandidatos)) {
        const filteredOthers = allCandidatos
          .filter((c: Candidato) => !recommendedIds.has(c.id))
          .slice(0, 5);
        setOtherProfiles(filteredOthers);
      }
    } finally {
      setLoadingProfiles(false);
    }
  };

  const closeRecommended = () => {
    setIsRecommendedOpen(false);
    setRecommendedVaga(null);
    setRecommendedCandidates([]);
    setOtherProfiles([]);
    setRecommendedError(null);
    setLoadingCandidates(false);
  };

  return {
    isRecommendedOpen,
    recommendedVaga,
    loadingCandidates,
    recommendedCandidates,
    recommendedProfiles,
    otherProfiles,
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
