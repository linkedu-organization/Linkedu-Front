import { Card } from "primereact/card";
import type { Perfil } from "@domains/Perfil";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
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

  return (
    <Card className="perfil-card">
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

        <div className="perfil-areas-interesse">
          <b>Áreas de interesse: </b>
          <span>{areas?.length ? areas : "Não informado"} </span>
        </div>

        <div className="perfil-disponibilidade-conclusao">
          <span>
            <b>Disponibilidade: </b>
            <span>{formatDisponibilidade(tempo)}</span>
          </span>
        </div>
      </div>

      <div className="position-card-footer">
        <Button
          label="Visualizar Perfil"
          className="details-button"
          onClick={() =>
            navigate(
              perfil.tipo === "CANDIDATO"
                ? `/profile/candidato/${perfil.candidato?.id}`
                : `/profile/recrutador/${perfil.recrutador?.id}`
            )
          }
        />
      </div>
    </Card>
  );
};

export default PerfilCard;
