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

import { useState } from "react";
import { Dialog } from "primereact/dialog";
import VagaDetails from "@components/Vaga/indexDetail";
import { deleteVaga } from "@routes/routesVaga";
import { confirmDialog } from "primereact/confirmdialog";
import RecrutadorEditFormPage from "./form";
import ProfilePage from "../index";

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

const ProfileRecrutadorPage: React.FC = () => {
  const { formData, vagas, deleteRec, getRecById } = useProfileRecrutador();

  const [vagaDetail, setVagaDetail] = useState<Vaga | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);
  const [dialogVaga, setDialogVaga] = useState(false);

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
            detailsVariant="icon"
          />
        )}
        emptyText="Nenhuma vaga cadastrada"
      />

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
