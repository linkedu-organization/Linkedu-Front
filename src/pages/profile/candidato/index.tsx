import React, { useEffect, useMemo, useState } from "react";

import { useProfileCandidato } from "@stores/profile/candidato/indexStore";
import type { Candidato } from "@domains/Candidato";
import type { Experiencia } from "@domains/Experiencia";
import {
  cargoCandidato,
  habilidades,
  interesses,
  niveis,
} from "@utils/constants";
import {
  getMultipleValuesByKey,
  getValueByKey,
  getValueDate,
  parseBoolean,
} from "@utils/utils";
import { DATE_FORMAT_PERIOD } from "@utils/date";
import { RegisterEditCandidatoProvider } from "@stores/profile/candidato/formStore";
import { CardExperiencia } from "@components/CardExperiencia";
import ExperienciaFormPage from "@pages/register/experiencia/form";
import { RegisterExperienciaProvider } from "@stores/register/experiencia/formStore";
import { Dialog } from "primereact/dialog";
import { useAuth } from "@contexts/authContext";
import { useParams } from "react-router-dom";
import CandidatoEditFormPage from "./form";
import ProfilePage from "../index";
import "../style.css";
import { confirmDialog } from "primereact/confirmdialog";

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
    value: getMultipleValuesByKey(
      formData?.habilidades || [],
      habilidades,
      " | "
    ),
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

const ProfileCandidatoPage: React.FC = () => {
  const {
    formData,
    experiencias,
    deleteCand,
    getCandById,
    deleteExp,
    loading,
  } = useProfileCandidato();
  const { perfil } = useAuth();
  const { id } = useParams();

  const [dialogExperiencia, setDialogExperiencia] = useState(false);
  const [selectedExp, setSelectedExp] = useState<Experiencia | null>(null);

  useEffect(() => {
    if (id) {
      getCandById(id);
    } else if (perfil?.tipo === "CANDIDATO") {
      getCandById(perfil?.candidato?.id);
    }
  }, [id, perfil]);

  const isOwnProfile = useMemo(
    () => (perfil !== null ? perfil?.candidato?.id === formData?.id : false),
    [perfil, formData?.id]
  );

  const openEdit = (exp: Experiencia) => {
    setSelectedExp(exp);
    setDialogExperiencia(true);
  };

  const confirmDeleteExp = (event: any, exp: Experiencia) => {
    confirmDialog({
      trigger: event.currentTarget,
      message: "Deseja excluir esta experiência?",
      header: "Excluir experiência",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Excluir",
      accept: async () => {
        deleteExp(exp.id, () => getCandById(formData?.id));
      },
    });
  };

  if (loading) return null;
  return (
    <>
      <ProfilePage
        formData={formData}
        items={experiencias}
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
          <ExperienciaFormPage
            candidato={data}
            switchVisibility={close}
            callbackAdd={() => getCandById(formData?.id)}
          />
        )}
        renderItem={(exp: Experiencia) => (
          <CardExperiencia
            key={exp.id}
            data={exp}
            onEdit={openEdit}
            onDelete={(e) => {
              confirmDeleteExp(window.event, e);
            }}
            showActions={isOwnProfile}
          />
        )}
        emptyText="Nenhuma experiência cadastrada"
      />

      {dialogExperiencia && isOwnProfile && (
        <RegisterExperienciaProvider>
          <Dialog
            header="Editar Experiência"
            visible={dialogExperiencia}
            style={{ width: "1200px", maxWidth: "95vw" }}
            onHide={() => setDialogExperiencia(false)}
            draggable={false}
          >
            <ExperienciaFormPage
              candidato={formData}
              experiencia={selectedExp}
              switchVisibility={() => {
                setDialogExperiencia(false);
                getCandById(String(formData?.id));
              }}
            />
          </Dialog>
        </RegisterExperienciaProvider>
      )}
    </>
  );
};

export default ProfileCandidatoPage;
