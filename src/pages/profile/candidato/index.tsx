import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";

import { experiencia1 } from "@stores/mock";
import { RegisterExperienciaProvider } from "@stores/register/experiencia/formStore";
import { useProfileCandidato } from "@stores/profile/candidato/indexStore";
import type { Candidato } from "@domains/Candidato";
import { cargoCandidato, niveis } from "@utils/constants";
import {
  getValueByKey,
  getValueDate,
  joinTextPipes,
  parseBoolean,
} from "@utils/utils";
import {
  DATE_FORMAT_PERIOD,
  DATE_FORMAT_WITH_HOURS_AND_SECONDS,
  DATE_PARSE_FORMAT_WITH_HOURS_AND_SECONDS,
} from "@utils/date";
import { Layout } from "@components/Layout";
import CardExperiencia from "@components/CardExperiencia";
import ExperienciaFormPage from "@pages/register/experiencia/form";
import "./style.css";

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
                    )}{" "}
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
    value: joinTextPipes(formData?.areasInteresse || []),
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
  const { id } = useParams();
  const { formData, experiencias, updateCand, deleteCand, getCandById } =
    useProfileCandidato();
  const [dialogExperiencia, setDialogExperiencia] = useState<boolean>(false);

  const confirmExcluir = (event) => {
    confirmDialog({
      trigger: event.currentTarget,
      message:
        "Você tem certeza que deseja excluir o seu perfil? Esta ação não poderá ser desfeita",
      header: "Excluir Perfil",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Confirmar exclusão",
      accept: () => deleteCand(),
    });
  };

  useEffect(() => {
    if (id) {
      getCandById(id);
    } else {
      // recuperar usuario logado
    }
  }, [id]);

  return (
    <Layout showFooter headerType="full">
      <div className="profile-container">
        <Card className="profile-card">
          <div className="profile-card-content">
            <div className="profile-avatar">
              <Avatar
                image={formData?.perfil.foto}
                size="xlarge"
                shape="circle"
              />
            </div>
            <div className="profile-info">
              <div className="profile-text">
                <h1>{formData?.perfil.nome}</h1>
                <h2>{formData?.perfil.email}</h2>

                <div className="tags-row">
                  {tags(formData).map((t) => {
                    const content = (
                      <Tag
                        icon={t.icon}
                        value={t.label}
                        rounded
                        style={{ backgroundColor: t.color }}
                      />
                    );

                    return t.href ? (
                      <a href={t.href} target="_blank" rel="noreferrer">
                        {content}
                      </a>
                    ) : (
                      content
                    );
                  })}
                </div>
                <p className="bio-text">{formData?.perfil.biografia}</p>
              </div>
            </div>

            <div className="profile-buttons">
              <div className="profile-actions">
                <Button
                  label="Editar perfil"
                  icon="pi pi-pencil"
                  style={{
                    background: "var(--Linkedu-Green)",
                    border: "1px solid var(--Linkedu-Green)",
                  }}
                  size="small"
                />
                <Button
                  label="Excluir perfil"
                  icon="pi pi-trash"
                  style={{
                    background: "var(--Linkedu-Red)",
                    border: "1px solid var(--Linkedu-Red)",
                  }}
                  size="small"
                  onClick={confirmExcluir}
                />
                <ConfirmDialog />
              </div>
            </div>
          </div>
          <div className="bio-update">
            <span className="last-update">
              Última atualização:{" "}
              {getValueDate(
                formData?.perfil.ultimoAcesso,
                DATE_FORMAT_WITH_HOURS_AND_SECONDS,
                DATE_PARSE_FORMAT_WITH_HOURS_AND_SECONDS
              )}
            </span>
          </div>
        </Card>
        <Card className="profile-card">
          <h3>Sobre</h3>
          <div className="about-grid">
            {aboutRows(formData).map((row) => (
              <div className="about-item">
                <Avatar
                  icon={row.icon}
                  shape="circle"
                  className="avatar-about"
                />
                <div className="about-line">
                  {row.body ? (
                    row.body
                  ) : (
                    <>
                      <strong>{row.label}</strong>
                      <span>{row.value}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Divider />
        <div className="exp-header">
          <h3>Experiências</h3>
          <Button
            label="Adicionar Experiência"
            icon="pi pi-plus"
            className="exp-button"
            size="small"
            onClick={() => setDialogExperiencia(true)}
          />
          {dialogExperiencia && (
            <RegisterExperienciaProvider>
              <Dialog
                header="Experiência"
                visible={dialogExperiencia}
                style={{ width: "1200px", maxWidth: "95vw" }}
                onHide={() => setDialogExperiencia(false)}
                draggable={false}
              >
                <ExperienciaFormPage
                  candidato={formData}
                  switchVisibility={() => setDialogExperiencia(false)}
                />
              </Dialog>
            </RegisterExperienciaProvider>
          )}
        </div>

        <div className="exp-list">
          {(experiencias || [experiencia1, experiencia1]).map((experiencia) => (
            <CardExperiencia data={experiencia} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProfileCandidatoPage;
