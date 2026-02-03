import { Card } from "primereact/card";
import { Button } from "primereact/button";
import type { Experiencia } from "@domains/Experiencia";
import "./style.css";

export interface CardExperienciaProps {
  data: Experiencia;
  showActions?: boolean;
}

const CardExperiencia = ({
  data,
  showActions = true,
}: CardExperienciaProps) => (
  <Card className="exp-card">
    <div className="exp-bar">
      <div className="exp-bar-left">
        <span className="exp-bar-title">{data.titulo}</span>
        <span className="exp-bar-subtitle">{data.periodoInicio} - {data.periodoFim ? data.periodoFim : "Atual"}</span>
      </div>

      {showActions && (
        <div className="exp-bar-actions">
          <Button icon="pi pi-pencil" className="exp-action edit" text />
          <Button icon="pi pi-trash" className="exp-action del" text />
        </div>
      )}
    </div>

    <div className="exp-body">
      <div className="exp-place">{`${data.local ? `${data.local} - ` : ""} ${data.instituicao}`}</div>
      <div className="exp-mentor">
        <span>Orientado por: {data.orientador}</span>
      </div>
      <p className="exp-desc">{data.descricao}</p>
    </div>
  </Card>
);

export default CardExperiencia;
