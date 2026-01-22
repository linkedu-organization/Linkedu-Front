import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import type { Experiencia } from "@domains/Experiencia";
import "./style.css";

export interface CardExperienciaProps {
  data: Experiencia;
  showActions?: boolean;
}

const formatPeriodo = (data: Experiencia) => {
  const inicio = data.periodoInicio ?? "";
  const fim = (data as any).periodoConclusao ?? (data as any).periodoFim ?? "";
  if (inicio && fim) return `${inicio} - ${fim}`;
  if (inicio && !fim) return `${inicio} - Atual`;
  return "Período de início - Período de conclusão";
};

const CardExperiencia: React.FC<CardExperienciaProps> = ({
  data,
  showActions = true,
}) => (
  <Card className="exp-card">
    <div className="exp-bar">
      <div className="exp-bar-left">
        <span className="exp-bar-title">{data.titulo || "Título"}</span>
        <span className="exp-bar-subtitle">{formatPeriodo(data)}</span>
      </div>

      {showActions && (
        <div className="exp-bar-actions">
          <Button icon="pi pi-pencil" className="icon-btn icon-btn-edit" text />
          <Button icon="pi pi-trash" className="icon-btn icon-btn-del" text />
        </div>
      )}
    </div>

    {/* Corpo */}
    <div className="exp-body">
      <div className="exp-place">{data.local}</div>

      <div className="exp-mentor">
        <span className="exp-mentor-label">Orientado por:</span>{" "}
        <span className="exp-mentor-value">{data.orientador || "-"}</span>
      </div>

      <p className="exp-desc">{data.descricao}</p>
    </div>
  </Card>
);

export default CardExperiencia;
