import "./style.css";
import { Card } from "primereact/card";
import type { Perfil } from "@domains/Perfil";
import { Button } from "primereact/button";

type PerfilCardProps = {
  perfil: Perfil;
};

const PerfilCard = ({ perfil }: PerfilCardProps) => {

  return (
    <Card className="perfil-card">
      <div className="perfil-header">
        <div className="perfil-title">
            <div className="perfil-name-row">
              <h2 className="perfil-name">{perfil.nome}</h2>
              <span className="perfil-badge">
                  {perfil.tipo}
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
          <span>{perfil.email}</span>
        </div>

        <div className="perfil-disponibilidade-conclusao">
          <span>
            <b>Disponibilidade: </b>
             <span>{}</span>
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
