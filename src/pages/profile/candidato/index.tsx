import React from "react";
import { Layout } from "@components/Layout";
import "./style.css";

import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";

import CardExperiencia from "@components/CardExperiencia";
import { candidatoMock, experiencia1 } from "@stores/mock";
import { tipoPerfil } from "@utils/constants";
import { getValueByKey, joinTextPipes, parseBoolean } from "@utils/utils";

const mock = candidatoMock;

const aboutRows = [
  {
    icon: "pi pi-building",
    label: "Instituição:",
    value: mock.instituicao,
  },
  {
    icon: "pi pi-calendar",
    body: (
      <>
        <strong>Período de ingresso:</strong>
        <span>{mock.periodoIngresso} -</span>
        <strong>Período de conclusão:</strong>
        <span>{mock.periodoConclusao}</span>
      </>
    ),
  },
  {
    icon: "pi pi-graduation-cap",
    label: "Nível de escolaridade:",
    value: mock.nivelEscolaridade,
  },
  {
    icon: "pi pi-briefcase",
    body: (
      <>
        <strong>Disponível para contratação:</strong>
        <span>{parseBoolean(mock.disponivel)}</span>
        {mock.disponivel && (
          <>
            - <strong>Disponibilidade:</strong>
            <span>{mock.tempoDisponivel}h/semana</span>
          </>
        )}
      </>
    ),
  },
  {
    icon: "pi pi-wrench",
    label: "Habilidades:",
    value: joinTextPipes(mock.habilidades),
  },
  {
    icon: "pi pi-eye",
    label: "Áreas de interesse:",
    value: joinTextPipes(mock.areasInteresse),
  },
];

const tags = [
  {
    icon: "pi pi-user",
    label: getValueByKey(mock.perfil.tipo, tipoPerfil),
    color: "#EBF4FF",
  },
  {
    icon: "pi pi-briefcase",
    label: mock.areaAtuacao,
    color: "#FCF9DD",
  },
  ...(mock.linkedin
    ? [
        {
          icon: "pi pi-linkedin",
          label: "LinkedIn",
          href: mock.linkedin,
          color: "#EBF4FF",
        },
      ]
    : []),
  ...(mock.lattes
    ? [
        {
          icon: "pi pi-id-card",
          label: "Lattes",
          color: "#FCF9DD",
          href: mock.lattes,
        },
      ]
    : []),
];

const ProfileCandidatoPage: React.FC = () => (
  <Layout showFooter headerType="full">
    <div className="profile-container">
      <Card className="profile-card">
        <div className="profile-card-content">
          <div className="profile-avatar">
            <Avatar image={mock.perfil.foto} size="xlarge" shape="circle" />
          </div>
          <div className="profile-info">
            <div className="profile-text">
              <h1>{mock.perfil.nome}</h1>
              <h2>{mock.perfil.email}</h2>

              <div className="tags-row">
                {tags.map((t) => {
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
              <p className="bio-text">{mock.perfil.biografia}</p>
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
              />
            </div>
          </div>
        </div>
        <div className="bio-update">
          <span className="last-update">
            Última atualização: {mock.perfil.ultimoAcesso}
          </span>
        </div>
      </Card>
      <Card className="profile-card">
        <h3>Sobre</h3>
        <div className="about-grid">
          {aboutRows.map((row) => (
            <div className="about-item">
              <Avatar icon={row.icon} shape="circle" className="avatar-about" />
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
        />
      </div>

      <div className="exp-list">
        {[experiencia1, experiencia1].map((experiencia) => (
          <CardExperiencia data={experiencia} />
        ))}
      </div>
    </div>
  </Layout>
);

export default ProfileCandidatoPage;
