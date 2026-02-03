import { Card } from "primereact/card";
import { Button } from "primereact/button";
import type { Vaga } from "@domains/Vaga";
import { getValueDate } from "@utils/utils";
import { DATE_FORMAT_PERIOD } from "@utils/date";
import "./style.css";

export interface CardVagaProps {
  data: Vaga;
  showActions?: boolean;
}

const CardVaga = ({
  data,
  showActions = true,
}: CardVagaProps) => (
  <Card className="exp-card">
    <div className="exp-bar">
      <div className="exp-bar-left">
        <span className="exp-bar-title">{data.titulo}</span>
        <span className="exp-bar-subtitle">{`${getValueDate(data.periodoInicio, DATE_FORMAT_PERIOD)} - ${data.periodoFim ? getValueDate(data.periodoFim, DATE_FORMAT_PERIOD) : "Atual"}`}</span>
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

export default CardVaga;
