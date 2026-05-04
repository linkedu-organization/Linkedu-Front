import { Card } from "primereact/card";
import { Button } from "primereact/button";
import type { Vaga } from "@domains/Vaga";
import { Avatar } from "primereact/avatar";
import { getValueByKey } from "@utils/utils";
import { categorias, cursos } from "@utils/constants";
import type { KeyboardEvent, MouseEvent } from "react";
import "./style.css";

export interface VagaCardProps {
  vaga: Vaga;
  openDetails: (vaga: Vaga) => void;

  showActions?: boolean;
  onEdit?: (exp: Vaga) => void;
  onDelete?: (exp: Vaga) => void;
  deleteLoading?: boolean;

  showRecommendedButton?: boolean;
  onRecommendedCandidates?: (vaga: Vaga) => void;
  recommendedLoading?: boolean;
  detailsVariant?: "button" | "icon" | "hidden";
}

export const VagaCard = ({
  vaga,
  openDetails,
  onEdit,
  onDelete,
  deleteLoading,
  showActions,
  showRecommendedButton,
  onRecommendedCandidates,
  recommendedLoading,
}: VagaCardProps) => {
  const handleOpenDetails = () => {
    openDetails(vaga);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetails(vaga);
    }
  };

  const stopCardClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <Card
      key={vaga.id}
      className="vaga-card clickable-card"
      onClick={handleOpenDetails}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="vaga-card-header">
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
        <span className="value ellipsis">
          {getValueByKey(vaga.curso, cursos as any)}
        </span>
      </div>

      <div className="position-skills">
        <Avatar
          icon="pi pi-check-circle"
          shape="circle"
          className="icon-badge"
        />
        <b>Conhecimentos Obrigatórios: </b>
        <span className="value ellipsis">
          {vaga.conhecimentosObrigatorios.join(", ")}
        </span>
      </div>

      {(showRecommendedButton || showActions) && (
        <div className="vaga-card-footer">
          <div className="footer-left">
            {showRecommendedButton && (
              <Button
                label="Candidatos recomendados"
                icon="pi pi-sparkles"
                className="recommended-button"
                onClick={(event) => {
                  stopCardClick(event);
                  onRecommendedCandidates?.(vaga);
                }}
                loading={recommendedLoading}
                disabled={recommendedLoading}
              />
            )}
          </div>

          <div className="footer-right">
            {showActions && (
              <div className="action-buttons">
                <Button
                  icon="pi pi-pencil"
                  className="exp-action edit"
                  text
                  type="button"
                  onClick={(event) => {
                    stopCardClick(event);
                    onEdit?.(vaga);
                  }}
                />

                <Button
                  icon="pi pi-trash"
                  className="exp-action del"
                  text
                  type="button"
                  onClick={(event) => {
                    stopCardClick(event);
                    onDelete?.(vaga);
                  }}
                  loading={deleteLoading}
                  disabled={deleteLoading}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
