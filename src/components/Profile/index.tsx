import { Card } from "primereact/card";
import type { Perfil } from "@domains/Perfil";
import { useNavigate } from "react-router-dom";
import type { KeyboardEvent } from "react";
import {
  getCargo,
  formatDisponibilidade,
  getMultipleValuesByKey,
  getIniciais,
} from "@utils/utils";
import { interesses } from "@utils/constants";
import "./style.css";

export interface PerfilCardProps {
  perfil: Perfil;
}

const PerfilCard = ({ perfil }: PerfilCardProps) => {
  const isCandidato = perfil.tipo === "CANDIDATO";

  const areas = isCandidato
    ? getMultipleValuesByKey(
        perfil.candidato?.areasInteresse || [],
        interesses,
        " | "
      )
    : perfil.recrutador?.areaAtuacao;

  const tempo = isCandidato ? perfil.candidato?.tempoDisponivel : null;
  const navigate = useNavigate();

  const handleOpenPerfil = () => {
    navigate(
      perfil.tipo === "CANDIDATO"
        ? `/profile/candidato/${perfil.candidato?.id}`
        : `/profile/recrutador/${perfil.recrutador?.id}`
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenPerfil();
    }
  };

  return (
    <Card
      className="perfil-card clickable-card"
      onClick={handleOpenPerfil}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="perfil-header">
        <div className="perfil-title">
          <div className="perfil-name-row">
            {perfil.foto ? (
              <img
                className="perfil-avatar"
                src={perfil.foto}
                alt={`Foto de ${perfil.nome}`}
              />
            ) : (
              <div className="perfil-avatar-fallback">
                {getIniciais(perfil?.nome)}
              </div>
            )}

            <h2 className="perfil-name">{perfil.nome}</h2>
            <span className="perfil-badge">{getCargo(perfil)}</span>
          </div>
        </div>
      </div>

      <div className="perfil-content">
        <div className="perfil-email">
          <b>Email: </b>
          <span>{perfil.email}</span>
        </div>

        {perfil.tipo === "RECRUTADOR" && (
          <div>
            <div className="perfil-email">
              <b>Instituição: </b>
              <span>{perfil.recrutador?.instituicao || "Não informado"}</span>
            </div>

            <div className="perfil-email">
              <b>Laboratórios: </b>
              <span>{perfil.recrutador?.laboratorios || "Não informado"}</span>
            </div>

            <div className="perfil-email">
              <b>Área de atuação: </b>
              <span>{areas || "Não informado"}</span>
            </div>
          </div>
        )}

        {perfil.tipo === "CANDIDATO" && (
          <div>
            <div className="perfil-email">
              <b>Áreas de interesse: </b>
              <span>{areas || "Não informado"}</span>
            </div>

            <div className="perfil-email">
              <b>Disponibilidade: </b>
              <span>{formatDisponibilidade(tempo)}</span>
            </div>

            <div className="perfil-email">
              <b>Período de Conclusão: </b>
              <span>
                {perfil.candidato?.periodoConclusao || "Não informado"}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PerfilCard;