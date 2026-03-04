import React, { useEffect } from "react";
import type { Candidato } from "@domains/Candidato";

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { MultiSelect } from "primereact/multiselect";
import { InputNumber } from "primereact/inputnumber";

import { useRegisterEditCandidato } from "@stores/profile/candidato/formStore";
import PhotoUpload from "@components/PhotoUpload";
import {
  cargoCandidato,
  cursos,
  habilidades,
  interesses,
  niveis,
  simNao,
} from "@utils/constants";
import "../styleForm.css";

type CandidatoEditFormProps = {
  candidato: Candidato;
  switchVisibility: () => void;
  onSaved: () => void;
};

const CandidatoEditFormPage: React.FC<CandidatoEditFormProps> = ({
  candidato,
  switchVisibility,
  onSaved,
}) => {
  const { formData, setInitialData, setField, errors, submit, errorsForm } =
    useRegisterEditCandidato();

  useEffect(() => {
    if (candidato) setInitialData(candidato);
  }, [candidato]);

  if (!formData) return null;

  const conditionalFields = [
    <>
      <div className="editperfil-field">
        <label>Horas disponíveis</label>
        <InputNumber
          value={formData.tempoDisponivel}
          onValueChange={(e) => setField("tempoDisponivel", e.value)}
          min={0}
          placeholder="Selecione sua carga horária disponível na semana"
          className={errors.tempoDisponivel ? "p-invalid" : ""}
          inputClassName={errors.tempoDisponivel ? "p-invalid" : ""}
        />

        {errorsForm("tempoDisponivel")}
      </div>

      <div className="editperfil-field">
        <label>Currículo Lattes</label>
        <InputText
          value={formData.lattes ?? ""}
          onChange={(e) => setField("lattes", e.target.value)}
          placeholder="Digite o link do seu currículo"
        />
      </div>
    </>,
    <>
      <div className="editperfil-field">
        <label>LinkedIn</label>
        <InputText
          value={formData.linkedin ?? ""}
          onChange={(e) => setField("linkedin", e.target.value)}
          placeholder="Digite o link do seu perfil"
        />
      </div>
      <div className="editperfil-field">
        <label>Disponível para contratação *</label>
        <div className="radio-row">
          {simNao.map((opt) => (
            <div className="radio-item" key={String(opt.value)}>
              <RadioButton
                inputId={`disp-${opt.label}`}
                name="disponivel"
                value={opt.value}
                onChange={(e) => setField("disponivel", e.value)}
                checked={formData.disponivel === opt.value}
              />
              <label htmlFor={`disp-${opt.label}`}>{opt.label}</label>
            </div>
          ))}
        </div>
        {errorsForm("disponivel")}
      </div>
    </>,
  ];

  return (
    <div>
      <div className="editperfil-header">
        <div className="editperfil-avatar">
          <PhotoUpload
            canUpload
            setField={setField}
            imageProfile={formData?.perfil?.foto || ""}
          />
        </div>

        <div className="editperfil-bio">
          <label>Biografia</label>
          <InputTextarea
            value={formData.perfil.biografia}
            onChange={(e) => setField("perfil.biografia", e.target.value)}
            rows={4}
            autoResize
            placeholder="Fale um pouco sobre você, seu perfil e objetivos."
            style={{
              width: "-webkit-fill-available",
            }}
          />
        </div>
      </div>

      <div className="edit-grid candidato">
        <div className="editperfil-field">
          <label>Nome *</label>
          <InputText
            value={formData.perfil.nome}
            onChange={(e) => setField("perfil.nome", e.target.value)}
            className={errors["perfil.nome"] ? "p-invalid" : ""}
            placeholder="Digite seu nome completo"
          />
          {errorsForm("perfil.nome")}
        </div>

        <div className="editperfil-field">
          <label>E-mail (Institucional) *</label>
          <InputText
            value={formData.perfil.email}
            onChange={(e) => setField("perfil.email", e.target.value)}
            className={errors["perfil.email"] ? "p-invalid" : ""}
            placeholder="Digite seu endereço de e-mail"
          />
          {errorsForm("perfil.email")}
        </div>

        <div className="editperfil-field">
          <label>Você é *</label>
          <div className="radio-row">
            {cargoCandidato.map((opt) => (
              <div className="radio-item" key={opt.value}>
                <RadioButton
                  inputId={`cargo-${opt.value}`}
                  name="cargo"
                  value={opt.value}
                  onChange={(e) => setField("cargo", e.value)}
                  checked={formData.cargo === opt.value}
                />
                <label htmlFor={`cargo-${opt.value}`}>{opt.label}</label>
              </div>
            ))}
          </div>
          {errorsForm("cargo")}
        </div>

        <div className="editperfil-field">
          <label>Instituição de Ensino *</label>
          <InputText
            value={formData.instituicao}
            onChange={(e) => setField("instituicao", e.target.value)}
            className={errors.instituicao ? "p-invalid" : ""}
            placeholder="Selecione a sua instituição"
          />
          {errorsForm("instituicao")}
        </div>

        <div className="editperfil-field">
          <label>Curso/Área de atuação *</label>
          <Dropdown
            value={formData.areaAtuacao}
            options={cursos}
            optionLabel="label"
            optionValue="value"
            onChange={(e) => setField("areaAtuacao", e.value)}
            className={errors.areaAtuacao ? "p-invalid" : ""}
            placeholder="Selecione o seu curso ou área de atuação"
          />
          {errorsForm("areaAtuacao")}
        </div>

        <div className="editperfil-field">
          <label>Nível de escolaridade *</label>
          <Dropdown
            value={formData.nivelEscolaridade}
            options={niveis}
            optionLabel="label"
            optionValue="value"
            onChange={(e) => setField("nivelEscolaridade", e.value)}
            className={errors.nivelEscolaridade ? "p-invalid" : ""}
            placeholder="Selecione seu nível de escolaridade"
          />
          {errorsForm("nivelEscolaridade")}
        </div>

        {formData.cargo === "ALUNO" && (
          <>
            <div className="editperfil-field">
              <label>Período de conclusão</label>
              <InputText
                value={formData.periodoConclusao ?? ""}
                onChange={(e) => setField("periodoConclusao", e.target.value)}
                placeholder="MM/AAAA"
              />
            </div>

            <div className="editperfil-field">
              <label>Período de ingresso</label>
              <InputText
                value={formData.periodoIngresso ?? ""}
                onChange={(e) => setField("periodoIngresso", e.target.value)}
                placeholder="MM/AAAA"
              />
            </div>
            {conditionalFields}
          </>
        )}
      </div>
      {formData.cargo === "TECNICO" &&
        conditionalFields.map((fields) => (
          <div className="editcand-half-grid">{fields}</div>
        ))}
      <div className="editcand-half-grid">
        <div className="editperfil-field">
          <label>Áreas de interesse *</label>
          <MultiSelect
            value={formData.areasInteresse}
            onChange={(e) => setField("areasInteresse", e.value)}
            options={interesses}
            placeholder="Selecione as suas áreas de interesse"
            className={errors.areasInteresse ? "p-invalid" : ""}
            display="chip"
            maxSelectedLabels={2}
          />
          {errorsForm("areasInteresse")}
        </div>

        <div className="editperfil-field">
          <label>Habilidades *</label>
          <MultiSelect
            value={formData.habilidades}
            onChange={(e) => setField("habilidades", e.value)}
            options={habilidades}
            placeholder="Selecione as suas habilidades"
            className={errors.habilidades ? "p-invalid" : ""}
            display="chip"
            maxSelectedLabels={2}
          />
          {errorsForm("habilidades")}
        </div>
      </div>

      <div className="editperfil-actions">
        <Button
          label="Salvar"
          className="save-edit-button"
          onClick={() =>
            submit(() => {
              onSaved();
              switchVisibility();
            })
          }
        />
      </div>
    </div>
  );
};

export default CandidatoEditFormPage;
