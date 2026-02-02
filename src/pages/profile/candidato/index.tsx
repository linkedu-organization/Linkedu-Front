import { useProfileCandidato } from "@stores/profile/candidato/indexStore";
import { RegisterExperienciaProvider } from "@stores/register/experiencia/formStore";
import { RegisterEditCandidatoProvider } from "@stores/profile/candidato/formStore";
import ExperienciaFormPage from "@pages/register/experiencia/form";
import CardExperiencia from "@components/CardExperiencia";
import type { Candidato } from "@domains/Candidato";
import {
  getMultipleValuesByKey,
  getValueByKey,
  getValueDate,
  joinTextPipes,
  parseBoolean,
} from "@utils/utils";
import { cargoCandidato, interesses, niveis } from "@utils/constants";
import { DATE_FORMAT_PERIOD } from "@utils/date";
import ProfilePage from "../index";
import CandidatoEditFormPage from "./form";

const aboutRows = (formData: Candidato): unknown => [
  {
    icon: "pi pi-building",
    label: "Instituição:",
    value: formData?.instituicao,
  },
  ...(formData?.periodoIngresso || formData?.periodoConclusao
    ? [
        {
          icon: "pi pi-calendar",
          body: (
            <>
              {formData?.periodoIngresso && (
                <>
                  <strong>Período de ingresso:</strong>
                  <span>
                    {getValueDate(
                      formData?.periodoIngresso,
                      DATE_FORMAT_PERIOD
                    )}
                    -
                  </span>
                </>
              )}
              {formData?.periodoConclusao && (
                <>
                  <strong>Período de conclusão:</strong>
                  <span>
                    {getValueDate(
                      formData?.periodoConclusao,
                      DATE_FORMAT_PERIOD
                    )}
                  </span>
                </>
              )}
            </>
          ),
        },
      ]
    : []),
  {
    icon: "pi pi-graduation-cap",
    label: "Nível de escolaridade:",
    value: getValueByKey(formData?.nivelEscolaridade, niveis),
  },
  {
    icon: "pi pi-briefcase",
    body: (
      <>
        <strong>Disponível para contratação:</strong>
        <span>{parseBoolean(formData?.disponivel)}</span>
        {formData?.disponivel && (
          <>
            - <strong>Disponibilidade:</strong>
            <span>{formData?.tempoDisponivel}h/semana</span>
          </>
        )}
      </>
    ),
  },
  {
    icon: "pi pi-wrench",
    label: "Habilidades:",
    value: joinTextPipes(formData?.habilidades || []),
  },
  {
    icon: "pi pi-eye",
    label: "Áreas de interesse:",
    value: getMultipleValuesByKey(
      formData?.areasInteresse || [],
      interesses,
      " | "
    ),
  },
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
  ...(formData?.linkedin
    ? [
        {
          icon: "pi pi-linkedin",
          label: "LinkedIn",
          href: formData?.linkedin,
          color: "#EBF4FF",
        },
      ]
    : []),
  ...(formData?.lattes
    ? [
        {
          icon: "pi pi-id-card",
          label: "Lattes",
          color: "#FCF9DD",
          href: formData?.lattes,
        },
      ]
    : []),
];

export default function ProfileCandidatoPage() {
  const { formData, experiencias, deleteCand, getCandById } =
    useProfileCandidato();

  return (
    <ProfilePage
      formData={formData}
      items={experiencias}
      getById={getCandById}
      deleteProfile={deleteCand}
      buildTags={tags}
      buildAboutRows={aboutRows}
      EditProvider={RegisterEditCandidatoProvider}
      renderEditForm={({ close, formData }) => (
        <CandidatoEditFormPage
          candidato={formData}
          switchVisibility={close}
          onSaved={() => {
            if (formData?.id) getCandById(formData?.id);
          }}
        />
      )}
      listTitle="Experiências"
      addLabel="Adicionar Experiência"
      addDialogHeader="Experiência"
      AddProvider={RegisterExperienciaProvider}
      renderAddForm={({ close, data }) => (
        <ExperienciaFormPage candidato={data} switchVisibility={close} />
      )}
      renderItem={(exp) => <CardExperiencia data={exp} />}
    />
  );
}
