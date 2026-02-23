import type { Recrutador } from "@domains/Recrutador";
import type { Candidato } from "@domains/Candidato";
import { cargosRecrutador } from "@utils/constants";
import { getValueByKey } from "@utils/utils";
import { useProfileRecrutador } from "@stores/profile/recrutador/indexStore";
import { RegisterVagaProvider } from "@stores/register/vaga/formStore";
import { RegisterEditRecrutadorProvider } from "@stores/profile/recrutador/formStore";
import VagaFormPage from "@pages/register/vaga/form";
import { VagaCard } from "@components/Vaga";
import type { Vaga } from "@domains/Vaga";
import "@fontsource/inter/700.css";
import "@fontsource/inter/300.css";
import { getCandidato } from "@routes/routesCandidato";

import { useState } from "react";
import { Dialog } from "primereact/dialog";
import VagaDetails from "@components/Vaga/indexDetail";
import { deleteVaga } from "@routes/routesVaga";
import { confirmDialog } from "primereact/confirmdialog";
import RecrutadorEditFormPage from "./form";
import ProfilePage from "../index";
import { createRecommendedCandidates, getRecommendedCandidates } from "@routes/routesRecomendacao";
import PerfilCard from "@components/Profile";
import type { Perfil } from "@domains/Perfil";
import "./style.css";

const aboutRows = (formData: Recrutador): unknown => [
  {
    icon: "pi pi-building",
    label: "Instituição:",
    value: formData?.instituicao,
  },
  ...(formData?.laboratorios
    ? [
        {
          icon: "pi pi-bookmark",
          value: formData?.laboratorios,
        },
      ]
    : []),
];

const tags = (formData: Candidato): unknown => [
  {
    icon: "pi pi-user",
    label: getValueByKey(formData?.cargo, cargosRecrutador),
    color: "#EBF4FF",
  },
  {
    icon: "pi pi-briefcase",
    label: formData?.areaAtuacao,
    color: "#FCF9DD",
  },
];

const candidatoToPerfil = (c: Candidato): Perfil => ({
  id: c.perfil?.id ?? c.id,         
  nome: c.perfil?.nome ?? "Sem nome",
  email: c.perfil?.email ?? "",
  foto: c.perfil?.foto,
  tipo: "CANDIDATO",
  candidato: c,                     
});

const ProfileRecrutadorPage: React.FC = () => {
  const { formData, vagas, deleteRec, getRecById } = useProfileRecrutador();

  const [vagaDetail, setVagaDetail] = useState<Vaga | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);
  const [dialogVaga, setDialogVaga] = useState(false);

  const [isRecommendedOpen, setIsRecommendedOpen] = useState(false);
  const [recommendedVaga, setRecommendedVaga] = useState<Vaga | null>(null);

  const [loadingCandidates, setLoadingCandidates] = useState(false);
  
  type RecommendedItem = { vagaId: number; candidatoId: number; score: number };
  const [recommendedCandidates, setRecommendedCandidates] = useState<RecommendedItem[]>([]);
  const [recommendedProfiles, setRecommendedProfiles] = useState<Record<number, Candidato>>({});
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  
  const [recommendedError, setRecommendedError] = useState<string | null>(null);
  
  const openRecommended = async (vaga: Vaga) => {
    setRecommendedVaga(vaga);
    setIsRecommendedOpen(true);
    
    setLoadingCandidates(true);
    setRecommendedError(null);
    setRecommendedCandidates([]);
    setRecommendedProfiles({});
    
    try {
      await createRecommendedCandidates(Number(vaga.id));
      const data = await getRecommendedCandidates(Number(vaga.id));
      const list: RecommendedItem[] = Array.isArray(data) ? data : (data?.candidatos ?? []);
      setRecommendedCandidates(list);

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

  const openEdit = (exp: Vaga) => {
    setSelectedVaga(exp);
    setDialogVaga(true);
  };

  const confirmDeleteVaga = (event: any, exp: Vaga) => {
    confirmDialog({
      trigger: event.currentTarget,
      message: "Deseja excluir esta vaga?",
      header: "Excluir experiência",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Excluir",
      accept: async () => {
        await deleteVaga(exp.id);
        getRecById(formData?.id);
      },
    });
  };

  const openDetails = (vaga: Vaga) => {
    setVagaDetail(vaga);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
    setVagaDetail(null);
  };

  return (
    <>
      <ProfilePage
        formData={formData}
        items={vagas}
        getById={getRecById}
        deleteProfile={deleteRec}
        buildTags={tags}
        buildAboutRows={aboutRows}
        EditProvider={RegisterEditRecrutadorProvider}
        renderEditForm={({ close, formData }) => (
          <RecrutadorEditFormPage
            recrutador={formData}
            switchVisibility={close}
            onSaved={() => {
              if (formData?.id) getRecById(formData?.id);
            }}
          />
        )}
        listTitle="Vagas Ofertadas"
        addLabel="Adicionar Vaga"
        addDialogHeader="Vaga"
        AddProvider={RegisterVagaProvider}
        renderAddForm={({ close, formData }) => (
          <VagaFormPage recrutador={formData} switchVisibility={close} />
        )}
        renderItem={(vaga: Vaga) => (
          <VagaCard
            vaga={vaga}
            openDetails={openDetails}
            onEdit={openEdit}
            onDelete={(e) => {
              confirmDeleteVaga(window.event, e);
              getRecById(String(formData?.id));
            }}
            showActions
            showRecommendedButton
            onRecommendedCandidates={openRecommended} 
            detailsVariant="icon"
          />
        )}
        emptyText="Nenhuma vaga cadastrada"
      />

      <Dialog
        visible={isRecommendedOpen}
        onHide={closeRecommended}
        header={
          recommendedVaga
            ? `Candidatos recomendados para a vaga: ${recommendedVaga.titulo}`
            : "Candidatos recomendados"
        }
        className="recommended-modal"
        style={{ width: "70vw" }}
        
      >
        {loadingCandidates && <div>Carregando candidatos...</div>}

        {!loadingCandidates && recommendedError && <div>{recommendedError}</div>}

        {!loadingCandidates && !recommendedError && recommendedCandidates.length === 0 && (
          <div>Não há recomendações disponíveis para essa vaga</div>
        )}

        {!loadingCandidates && !recommendedError && recommendedCandidates.length > 0 && (
            <div style={{ display: "grid", gap: 12, width: "100%" }}>
              {recommendedCandidates.map((rec) => {
                const candidato = recommendedProfiles[rec.candidatoId];
                return (
                  <div key={rec.candidatoId}>
                   <PerfilCard perfil={candidatoToPerfil(candidato)} />
                  </div>
                );
              })}
            </div>
         )}

      </Dialog>

      <Dialog
        visible={isDetailsOpen}
        onHide={closeDetails}
        header={vagaDetail?.titulo}
        style={{ width: "70vw" }}
        className="recrutador-vaga-dialog"
      >
        {vagaDetail && <VagaDetails vaga={vagaDetail} />}
      </Dialog>
      {dialogVaga && (
        <RegisterVagaProvider>
          <Dialog
            header="Editar Vaga"
            visible={dialogVaga}
            style={{ width: "1200px", maxWidth: "95vw" }}
            onHide={() => setDialogVaga(false)}
            draggable={false}
          >
            <VagaFormPage
              recrutador={formData}
              vaga={selectedVaga}
              switchVisibility={() => {
                setDialogVaga(false);
                getRecById(String(formData?.id));
              }}
            />
          </Dialog>
        </RegisterVagaProvider>
      )}
    </>
  );
};

export default ProfileRecrutadorPage;
