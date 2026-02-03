import type { Recrutador } from "@domains/Recrutador";
import type { Candidato } from "@domains/Candidato";
import { cargoCandidato } from "@utils/constants";
import { getValueByKey } from "@utils/utils";

import { useProfileRecrutador } from "@stores/profile/recrutador/indexStore"; // ajuste isso
/*
import { RegisterEditRecrutadorProvider } from "@stores/profile/recrutador/formStore";
import { RegisterVagaProvider } from "@stores/register/vaga/formStore"; // exemplo

import VagaFormPage from "@pages/register/vaga/form";
import CardVaga from "@components/CardVaga";
import RecrutadorEditFormPage from "./form";
*/
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
    label: getValueByKey(formData?.cargo, cargoCandidato),
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

  return (
    <ProfilePage
      formData={formData}
      items={vagas}
      getById={getRecById}
      deleteProfile={deleteRec}
      buildTags={tags}
      buildAboutRows={aboutRows}
      /*
      EditProvider={RegisterEditRecrutadorProvider}
      renderEditForm={({ close, formData }) => (
        <RecrutadorEditFormPage
          recrutador={formData}
          switchVisibility={close}
          onSaved={() => {
            if (formData?.id) getRecrById(formData?.id);
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
      renderItem={(vaga) => <CardVaga data={vaga} />}
      emptyText="Nenhuma vaga cadastrada" */
    />
  );
}
