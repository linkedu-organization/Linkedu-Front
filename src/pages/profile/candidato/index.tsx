import React, { useEffect, useState } from "react";
import { Layout } from "@components/Layout";

import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";

import CardExperiencia from "@components/CardExperiencia";
import { experiencia1 } from "@stores/mock";
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
import type { Candidato } from "@domains/Candidato";
import { useParams } from "react-router-dom";
import { useNotification } from "@contexts/notificationContext";
import { getCandidato } from "@routes/routesCandidato";
import "./style.css";

const aboutRows = (data: Candidato): unknown => [
  {
    icon: "pi pi-building",
    label: "Instituição:",
    value: data?.instituicao,
  },
  ...(data?.periodoIngresso || data?.periodoConclusao
    ? [
        {
          icon: "pi pi-calendar",
          body: (
            <>
              {data?.periodoIngresso && (
                <>
                  <strong>Período de ingresso:</strong>
                  <span>
                    {getValueDate(data?.periodoIngresso, DATE_FORMAT_PERIOD)} -
                  </span>
                </>
              )}
              {data?.periodoConclusao && (
                <>
                  <strong>Período de conclusão:</strong>
                  <span>
                    {getValueDate(data?.periodoConclusao, DATE_FORMAT_PERIOD)}
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
    value: getValueByKey(data?.nivelEscolaridade, niveis),
  },
  {
    icon: "pi pi-briefcase",
    body: (
      <>
        <strong>Disponível para contratação:</strong>
        <span>{parseBoolean(data?.disponivel)}</span>
        {data?.disponivel && (
          <>
            - <strong>Disponibilidade:</strong>
            <span>{data?.tempoDisponivel}h/semana</span>
          </>
        )}
      </>
    ),
  },
  {
    icon: "pi pi-wrench",
    label: "Habilidades:",
    value: joinTextPipes(data?.habilidades || []),
  },
  {
    icon: "pi pi-eye",
    label: "Áreas de interesse:",
    value: joinTextPipes(data?.areasInteresse || []),
  },
];

const tags = (data: Candidato): unknown => [
  {
    icon: "pi pi-user",
    label: getValueByKey(data?.cargo, cargoCandidato),
    color: "#EBF4FF",
  },
  {
    icon: "pi pi-briefcase",
    label: data?.areaAtuacao,
    color: "#FCF9DD",
  },
  ...(data?.linkedin
    ? [
        {
          icon: "pi pi-linkedin",
          label: "LinkedIn",
          href: data?.linkedin,
          color: "#EBF4FF",
        },
      ]
    : []),
  ...(data?.lattes
    ? [
        {
          icon: "pi pi-id-card",
          label: "Lattes",
          color: "#FCF9DD",
          href: data?.lattes,
        },
      ]
    : []),
];

const ProfileCandidatoPage: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<Candidato>();
  const { showNotification } = useNotification();

  const getUserById = async (idCand: string) => {
    try {
      const response = await getCandidato(idCand);
      setData(response);
    } catch (error) {
      showNotification("error", "Erro ao carregar usuário");
    }
  };

  useEffect(() => {
    if (id) {
      getUserById(id);
    } else {
      // setData(conta?.usuario); recuperar usuario logado
    }
  }, [id]);

  return (
    <Layout showFooter headerType="full">
      <div className="profile-container">
        <Card className="profile-card">
          <div className="profile-card-content">
            <div className="profile-avatar">
              <Avatar image={data?.perfil.foto} size="xlarge" shape="circle" />
            </div>
            <div className="profile-info">
              <div className="profile-text">
                <h1>{data?.perfil.nome}</h1>
                <h2>{data?.perfil.email}</h2>

                <div className="tags-row">
                  {tags(data).map((t) => {
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
                <p className="bio-text">{data?.perfil.biografia}</p>
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
              Última atualização:{" "}
              {getValueDate(
                data?.perfil.ultimoAcesso,
                DATE_FORMAT_WITH_HOURS_AND_SECONDS,
                DATE_PARSE_FORMAT_WITH_HOURS_AND_SECONDS
              )}
            </span>
          </div>
        </Card>
        <Card className="profile-card">
          <h3>Sobre</h3>
          <div className="about-grid">
            {aboutRows(data).map((row) => (
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
};

export default ProfileCandidatoPage;
