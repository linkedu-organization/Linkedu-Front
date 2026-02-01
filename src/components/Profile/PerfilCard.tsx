import "./style.css";
import { Card } from "primereact/card";
import type { Perfil } from "@domains/Perfil";

type PerfilCardProps = {
  perfil: Perfil;
};

const PerfilCard = ({ perfil }: PerfilCardProps) => {
  return (
    <Card className="perfil-card">
      <div className="perfil-header">
        <h2 className="perfil-name">{perfil.nome ?? "Sem nome"}</h2>
      </div>
    </Card>
  );
};

export default PerfilCard;
