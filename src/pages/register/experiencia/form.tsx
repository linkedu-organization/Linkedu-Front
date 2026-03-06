import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

import type { Candidato } from "@domains/Candidato";
import type { Experiencia } from "@domains/Experiencia";
import { useRegisterExperiencia } from "@stores/register/experiencia/formStore";
import "./style.css";
import { InputMask } from "primereact/inputmask";

type ExperienciaFormProps = {
  candidato: Candidato;
  switchVisibility: () => void;
  experiencia?: Experiencia | null;
  callback?: () => void;
};

const ExperienciaFormPage: React.FC<ExperienciaFormProps> = ({
  candidato,
  switchVisibility,
  experiencia,
  callback,
}) => {
  const { formData, setField, errors, submit, resetForm, load } =
    useRegisterExperiencia();

  useEffect(() => {
    if (experiencia) load(experiencia);
    else resetForm();
  }, [experiencia]);

  return (
    <div className="exp-form">
      <div className="exp-form-grid">
        <div className="exp-field">
          <label>Título *</label>
          <InputText
            value={formData.titulo}
            onChange={(e) => setField("titulo", e.target.value)}
            className={errors.titulo ? "p-invalid" : ""}
            placeholder="Digite o título da experiência"
          />
          {errors.titulo && <small className="p-error">{errors.titulo}</small>}
        </div>

        <div className="exp-field">
          <label>Orientador *</label>
          <InputText
            value={formData.orientador}
            onChange={(e) => setField("orientador", e.target.value)}
            className={errors.orientador ? "p-invalid" : ""}
            placeholder="Digite o nome do orientador"
          />
          {errors.orientador && (
            <small className="p-error">{errors.orientador}</small>
          )}
        </div>

        <div className="exp-field">
          <label>Instituição de ensino *</label>
          <InputText
            value={formData.instituicao}
            onChange={(e) => setField("instituicao", e.target.value)}
            className={errors.instituicao ? "p-invalid" : ""}
            placeholder="Digite a instituição"
          />
          {errors.instituicao && (
            <small className="p-error">{errors.instituicao}</small>
          )}
        </div>

        <div className="exp-field">
          <label>Laboratório/Local</label>
          <InputText
            value={formData.local ?? ""}
            onChange={(e) => setField("local", e.target.value)}
            placeholder="Digite o laboratório ou local"
          />
        </div>

        <div className="exp-field">
          <label>Período de início (MM/AAAA) *</label>
          <InputMask
            value={formData.periodoInicio}
            onChange={(e) => setField("periodoInicio", e.target.value)}
            className={errors.periodoInicio ? "p-invalid" : ""}
            placeholder="Ex: 10/2024"
            mask="99/9999"
          />
          {errors.periodoInicio && (
            <small className="p-error">{errors.periodoInicio}</small>
          )}
        </div>

        <div className="exp-field">
          <label>Período de conclusão (MM/AAAA)</label>
          <InputMask
            value={formData.periodoFim}
            onChange={(e) => setField("periodoFim", e.target.value)}
            className={errors.periodoFim ? "p-invalid" : ""}
            placeholder="Ex: 03/2025"
            mask="99/9999"
          />
          {errors.periodoFim && (
            <small className="p-error">{errors.periodoFim}</small>
          )}
        </div>

        <div className="exp-field exp-field-full">
          <label>Descrição *</label>
          <InputTextarea
            value={formData.descricao}
            onChange={(e) => setField("descricao", e.target.value)}
            className={errors.descricao ? "p-invalid" : ""}
            rows={5}
            autoResize
            placeholder="Fale um pouco sobre a experiência, atividades realizadas e aprendizados obtidos."
          />
          {errors.descricao && (
            <small className="p-error">{errors.descricao}</small>
          )}
        </div>
      </div>

      <div className="exp-form-actions">
        <Button
          label="Cancelar"
          className="p-button-cancel-exp"
          type="button"
          onClick={() => {
            resetForm();
            switchVisibility();
          }}
        />
        <Button
          label="Salvar"
          className="p-button-save-exp"
          type="button"
          onClick={async () => {
            await submit(
              candidato,
              () => {
                switchVisibility();
                callback?.();
              },
              experiencia?.id
            );
          }}
        />
      </div>
    </div>
  );
};

export default ExperienciaFormPage;
