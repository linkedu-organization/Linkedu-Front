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
import { getValueByKey } from "@utils/utils";

const mock = candidatoMock;

const ProfileCandidatoPage: React.FC = () => (
  <Layout showFooter headerType="full">
    <div className="profile-container">
      <Card>
        <div className="profile-card-content">
          <div className="profile-avatar">
            <Avatar image={mock.perfil.foto} size="xlarge" shape="circle" />
          </div>
          <div className="profile-info">
            <div className="profile-text">
              <h1>{mock.perfil.nome}</h1>
              <h2>{mock.perfil.email}</h2>

              <div className="tags-row">
                <Tag
                  icon="pi pi-user"
                  value={getValueByKey(mock.perfil.tipo, tipoPerfil)}
                  rounded
                  style={{ backgroundColor: "#EBF4FF" }}
                />
                <Tag
                  icon="pi pi-briefcase"
                  value={mock.areaAtuacao}
                  rounded
                  style={{ backgroundColor: "#FCF9DD" }}
                />
                {mock.linkedin && (
                  <a href={mock.linkedin} target="_blank" rel="noreferrer">
                    <Tag
                      icon="pi pi-linkedin"
                      value="Linkedin"
                      rounded
                      style={{ backgroundColor: "#EBF4FF" }}
                    />
                  </a>
                )}
                {mock.lattes && (
                  <a href={mock.lattes} target="_blank" rel="noreferrer">
                    <Tag
                      icon="pi pi-id-card"
                      value="Lattes"
                      rounded
                      style={{ backgroundColor: "#FCF9DD" }}
                    />
                  </a>
                )}
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

      <Card>
        <h3>Sobre</h3>
        <div className="about-grid">
          <div className="about-item">
            <Avatar icon="pi pi-user" shape="circle" className="avatar-about" />
            <div className="about-line">
              <strong>Instituição:</strong>
              <span>{mock.instituicao}</span>
            </div>
          </div>

          <div className="about-item">
            <Avatar icon="pi pi-user" shape="circle" className="avatar-about" />
            <div className="about-line">
              <strong>Período de ingresso:</strong>
              <span>{mock.periodoIngresso} —</span>
              <strong className="ml8">Período de conclusão:</strong>
              <span>{mock.periodoConclusao}</span>
            </div>
          </div>

          <div className="about-item">
            <Avatar icon="pi pi-user" shape="circle" className="avatar-about" />
            <div className="about-line">
              <strong>Nível de escolaridade:</strong>
              <span>{mock.nivelEscolaridade}</span>
            </div>
          </div>

          <div className="about-item">
            <Avatar icon="pi pi-user" shape="circle" className="avatar-about" />
            <div className="about-line">
              <strong>Disponível para contratação:</strong>
              <span>
                {mock.disponivel
                  ? `Sim - Disponibilidade: ${mock.tempoDisponivel}h/semana`
                  : "Não"}
              </span>
            </div>
          </div>

          <div className="about-item">
            <Avatar icon="pi pi-user" shape="circle" className="avatar-about" />
            <div className="about-line">
              <strong>Habilidades:</strong>
              <span>{mock.habilidades.join(" | ")}</span>
            </div>
          </div>

          <div className="about-item">
            <Avatar icon="pi pi-user" shape="circle" className="avatar-about" />
            <div className="about-line">
              <strong>Áreas de interesse:</strong>
              <span>{mock.areasInteresse.join(" | ")}</span>
            </div>
          </div>
        </div>
      </Card>
      <Divider />

      <section className="section">
        <div className="section-header">
          <h2>Experiências</h2>

          <Button
            label="Adicionar Experiência"
            icon="pi pi-plus"
            className="btn-add-exp"
            size="small"
          />
        </div>

        <div className="exp-list">
          {[experiencia1, experiencia1].map((experiencia) => (
            <CardExperiencia data={experiencia} />
          ))}
        </div>
      </section>
    </div>
  </Layout>
);

export default ProfileCandidatoPage;
