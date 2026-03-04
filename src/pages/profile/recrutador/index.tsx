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
import { useEffect, useMemo, useState } from "react";
import { Dialog } from "primereact/dialog";
import VagaDetails from "@components/Vaga/indexDetail";
import { confirmDialog } from "primereact/confirmdialog";
import { useAuth } from "@contexts/authContext";
import { useParams } from "react-router-dom";
import PerfilCard from "@components/Profile";
import type { Perfil } from "@domains/Perfil";
import { Button } from "primereact/button";
import { useRecommendedCandidatos } from "@hooks/useRecommendedCandidatos";
import ProfilePage from "../index";
import RecrutadorEditFormPage from "./form";
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
  const { formData, vagas, deleteRec, getRecById, loading, deleteVag } =
    useProfileRecrutador();
  const { perfil } = useAuth();
  const { id } = useParams();
  const {
    isRecommendedOpen,
    recommendedVaga,
    loadingCandidates,
    recommendedCandidates,
    recommendedProfiles,
    loadingProfiles,
    recommendedError,
    openRecommended,
    closeRecommended,
    setForceUpdate,
  } = useRecommendedCandidatos();

  const [vagaDetail, setVagaDetail] = useState<Vaga | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);
  const [dialogVaga, setDialogVaga] = useState(false);

  useEffect(() => {
    if (id) {
      getRecById(id);
    } else if (perfil?.tipo === "RECRUTADOR") {
      getRecById(perfil?.recrutador?.id);
    }
  }, [id, perfil]);

  const isOwnProfile = useMemo(
    () => (perfil !== null ? perfil?.recrutador?.id === formData?.id : false),
    [perfil, formData?.id]
  );

  const openEdit = (exp: Vaga) => {
    setSelectedVaga(exp);
    setDialogVaga(true);
  };

  const confirmDeleteVaga = (event: any, vag: Vaga) => {
    confirmDialog({
      trigger: event.currentTarget,
      message: "Deseja excluir esta vaga?",
      header: "Excluir experiência",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Excluir",
      accept: async () => {
        deleteVag(vag.id, () => getRecById(formData?.id));
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

  if (loading) return null;
  return (
    <>
      <ProfilePage
        formData={formData}
        items={vagas}
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
          <VagaFormPage
            recrutador={formData}
            switchVisibility={close}
            callback={() => getRecById(formData?.id)}
          />
        )}
        renderItem={(vaga: Vaga) => (
          <VagaCard
            vaga={vaga}
            openDetails={openDetails}
            onEdit={openEdit}
            onDelete={(e) => {
              confirmDeleteVaga(window.event, e);
            }}
            showActions={isOwnProfile}
            showRecommendedButton={isOwnProfile}
            onRecommendedCandidates={() => openRecommended(vaga)}
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

        {!loadingCandidates && recommendedError && (
          <div>{recommendedError}</div>
        )}

        {!loadingCandidates &&
          !recommendedError &&
          recommendedCandidates.length === 0 && (
            <div>Não há recomendações disponíveis para essa vaga</div>
          )}

        {!loadingCandidates &&
          !recommendedError &&
          recommendedCandidates.length > 0 && (
            <div style={{ display: "grid", gap: 12, width: "100%" }}>
              {recommendedCandidates.map((rec) => {
                const candidato = recommendedProfiles[rec.candidatoId];
                if (!candidato) return null;
                return (
                  <div key={rec.candidatoId}>
                    <PerfilCard perfil={candidatoToPerfil(candidato)} />
                  </div>
                );
              })}
            </div>
          )}

        <Button
          label="Atualizar Recomendações"
          icon="pi pi-sparkles"
          className="recommended-update-button"
          onClick={() => {
            setForceUpdate(true);
            openRecommended(recommendedVaga!);
          }}
        />
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
      {dialogVaga && isOwnProfile && (
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
