import "./style.css";
import { Card } from "primereact/card";
import type { Perfil } from "@domains/Perfil";
import { Button } from "primereact/button";

type PerfilCardProps = {
  perfil: Perfil;
};


const PerfilCard = ({ perfil }: PerfilCardProps) => {

  const iniciais = perfil.nome
  .split(" ")
  .filter(Boolean)
  .slice(0, 2)
  .map((p) => p[0]!.toUpperCase())
  .join("");

  return (
    <Card className="perfil-card">
      <div className="perfil-header">
        <div className="perfil-title">
            <div className="perfil-name-row">
              {perfil.foto ? (
                <img className="perfil-avatar" src={perfil.foto} alt={`Foto de ${perfil.nome}`} />
                ) : (
                <div className="perfil-avatar-fallback">{iniciais}</div>
              )}
              <h2 className="perfil-name">{perfil.nome}</h2>
              <span className="perfil-badge">
                  {perfil.tipo === "CANDIDATO"
                    ? perfil.candidato?.cargo ?? "-"
                    : perfil.recrutador?.cargo ?? "-"}
              </span>
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
          <span>{perfil.tipo === "CANDIDATO"
            ? perfil.candidato?.areasInteresse ?? "-"
            : perfil.recrutador?.areaAtuacao ?? "-"}
          </span>
        </div>

        <div className="perfil-disponibilidade-conclusao">
          <span>
            <b>Disponibilidade: </b>
             <span>
              {perfil.tipo === "CANDIDATO"
                ? perfil.candidato?.tempoDisponivel ?? "-"
                : perfil.recrutador?.areaAtuacao ?? "-"}h/semana
             </span>
          </span>
        </div>
      </div>

      <div className="position-card-footer">
        <Button label="Visualizar Perfil" className="details-button"></Button>
      </div>

    </Card>
  );
};

export default PerfilCard;
