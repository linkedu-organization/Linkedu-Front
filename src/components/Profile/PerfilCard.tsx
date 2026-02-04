import "./style.css";
import { Card } from "primereact/card";
import type { Perfil } from "@domains/Perfil";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import {
  getIniciais,
  getCargo,
  getAreas,
  getTempoDisponivel,
  formatDisponibilidade,
} from "@utils/utils";

type PerfilCardProps = {
  perfil: Perfil;
};

const PerfilCard = ({ perfil }: PerfilCardProps) => {
  const iniciais = getIniciais(perfil.nome);
  const cargo = getCargo(perfil);
  const areas = getAreas(perfil);
  const tempo = getTempoDisponivel(perfil);

  const disponibilidade = formatDisponibilidade(tempo);
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
              <div className="perfil-avatar-fallback">{iniciais}</div>
            )}
            <h2 className="perfil-name">{perfil.nome}</h2>
            <span className="perfil-badge">{cargo}</span>
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
            <span>{disponibilidade}</span>
          </span>
        </div>
      </div>

      <div className="position-card-footer">
        <Button
          label="Visualizar Perfil"
          className="details-button"
          onClick={() => navigate(`/profile/candidato/${perfil.id}`)}
        />
      </div>
    </Card>
  );
};

export default PerfilCard;
