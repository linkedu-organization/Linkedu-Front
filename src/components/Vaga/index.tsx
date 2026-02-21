import { Card } from "primereact/card";
import { Button } from "primereact/button";
import type { Vaga } from "@domains/Vaga";
import { Avatar } from "primereact/avatar";
import { getValueByKey } from "@utils/utils";
import { categorias } from "@utils/constants";
import "./style.css";

export interface VagaCardProps {
  vaga: Vaga;
  openDetails: (vaga: Vaga) => void;
  
  showActions?: boolean;
  onEdit?: (exp: Vaga) => void;
  onDelete?: (exp: Vaga) => void;

  showRecommendedButton?: boolean;
  onRecommendedCandidates?: (vaga: Vaga) => void;
  detailsVariant?: "button" | "icon" | "hidden";
}

export const VagaCard = ({
  vaga,
  openDetails,
  onEdit,
  onDelete,
  showActions,
  showRecommendedButton,
  onRecommendedCandidates,
  detailsVariant = "button",
}: VagaCardProps) => (
  <Card key={vaga.id} className="position-card">
    <div className="position-card-header">
      <h2 className="card-title">
        {vaga.titulo} - {getValueByKey(vaga.categoria, categorias as any)}
      </h2>

      {!vaga.ehPublica && (
        <i className="pi pi-lock lock-icon" aria-label="Vaga privada" />
      )}
      <p className="position-work-hours">{vaga.cargaHoraria}h/semana</p>
    </div>

    <p className="position-type">
      <span className="value ellipsis">
        {vaga.ehRemunerada ? "Remunerada" : "Voluntária"}
      </span>
    </p>

    <div className="position-lab">
      <Avatar icon="pi pi-building" shape="circle" className="icon-badge" />
      <b>Instituição: </b>
      <span className="value ellipsis">{vaga.instituicao}</span>
    </div>

    <div className="position-recruiter">
      <Avatar icon="pi pi-user" shape="circle" className="icon-badge" />
      <b>Ofertada por: </b>
      <span className="value ellipsis">
        {vaga.recrutador?.perfil?.nome ?? "Desconhecido"}
      </span>
    </div>

    <div className="position-course">
      <Avatar icon="pi pi-book" shape="circle" className="icon-badge" />
      <b>Curso: </b>
      <span className="value ellipsis">{vaga.curso}</span>
    </div>

    <div className="position-skills">
      <Avatar icon="pi pi-check-circle" shape="circle" className="icon-badge" />
      <b>Conhecimentos Obrigatórios: </b>
      <span className="value ellipsis">
        {vaga.conhecimentosObrigatorios.join(", ")}
      </span>
    </div>

    <div className="position-card-footer">

      <div className="footer-left">
        {showRecommendedButton && (
          <Button
            label="Candidatos recomendados"
            icon="pi pi-sparkles"
            className="recommended-button"
            onClick={() => onRecommendedCandidates?.(vaga)}
          />
        )}
      </div>

      <div className="footer-right">
        {detailsVariant === "button" && (
          <Button
            label="Ver Detalhes"
            className="details-button"
            onClick={() => openDetails(vaga)}
          />
        )}

        {detailsVariant === "icon" && (
          <Button
            icon="pi pi-eye"  
            className="details-button icon-only"
            text
            type="button"
            onClick={() => openDetails(vaga)}
          />
        )}

        {showActions && (
          <>
            <Button
              icon="pi pi-pencil"
              className="exp-action edit"
              text
              type="button"
              onClick={() => onEdit?.(vaga)}
            />
            <Button
              icon="pi pi-trash"
              className="exp-action del"
              text
              type="button"
              onClick={() => onDelete?.(vaga)}
            />
          </>
        )}
    </div>
    </div>
  </Card>
);
