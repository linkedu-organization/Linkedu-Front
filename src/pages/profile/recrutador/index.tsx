import type { Recrutador } from "@domains/Recrutador";
import type { Candidato } from "@domains/Candidato";
import { cargosRecrutador } from "@utils/constants";
import { getValueByKey } from "@utils/utils";
import { useProfileRecrutador } from "@stores/profile/recrutador/indexStore";
import { RegisterVagaProvider } from "@stores/register/vaga/formStore"; 
import { RegisterEditRecrutadorProvider } from "@stores/profile/recrutador/formStore";
import VagaFormPage from "@pages/register/vaga/form";
import ProfilePage from "../index";
import RecrutadorEditFormPage from "./form";
import VagaCard from "@components/Vaga/VagaCard";
import type { Vaga } from "@domains/Vaga";
import "@fontsource/inter/700.css";
import "@fontsource/inter/300.css";

import { useState } from "react";
import { Dialog } from "primereact/dialog";
import VagaDetails from "@components/Vaga/vagaDetails";


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

export default function ProfileRecrutadorPage() {
  const { formData, vagas, deleteRec, getRecById } = useProfileRecrutador();

  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const openDetails = (vaga: Vaga) => {
    setSelectedVaga(vaga);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
    setSelectedVaga(null);
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
          <VagaCard vaga={vaga} openDetails={openDetails} />
        )}
        emptyText="Nenhuma vaga cadastrada"
    />

    <Dialog
      visible={isDetailsOpen}
      onHide={closeDetails}
      header={selectedVaga?.titulo}
      style={{ width: "70vw" }}
    >
      {selectedVaga && <VagaDetails vaga={selectedVaga} />}
    </Dialog>

    </>
  );
}
