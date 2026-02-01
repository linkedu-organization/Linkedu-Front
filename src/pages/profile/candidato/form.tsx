import React, { useEffect } from "react";
import type { Candidato } from "@domains/Candidato";

import { Avatar } from "primereact/avatar";
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
  habilidades,
  interesses,
  niveis,
  simNao,
} from "@utils/constants";
import "./styleForm.css";

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

  return (
    <div>
      <div className="editcand-header">
        <div className="editcand-avatar">
          <PhotoUpload
            canUpload
            setField={setField}
            imageProfile={formData?.perfil?.foto || ""}
          />
        </div>

        <div className="editcand-bio">
          <label>Biografia *</label>
          <InputTextarea
            value={formData.perfil.biografia}
            onChange={(e) => setField("perfil.biografia", e.target.value)}
            className={errors["perfil.biografia"] ? "p-invalid" : ""}
            rows={4}
            autoResize
            placeholder="Fale um pouco sobre você, seu perfil e objetivos."
            style={{
              width: "-webkit-fill-available",
            }}
          />
          {errorsForm("perfil.biografia")}
        </div>
      </div>

      <div className="editcand-grid">
        <div className="editcand-field">
          <label>Nome *</label>
          <InputText
            value={formData.perfil.nome}
            onChange={(e) => setField("perfil.nome", e.target.value)}
            className={errors["perfil.nome"] ? "p-invalid" : ""}
            placeholder="Digite seu nome completo"
          />
          {errorsForm("perfil.nome")}
        </div>

        <div className="editcand-field">
          <label>E-mail (Institucional) *</label>
          <InputText
            value={formData.perfil.email}
            onChange={(e) => setField("perfil.email", e.target.value)}
            className={errors["perfil.email"] ? "p-invalid" : ""}
            placeholder="Digite seu endereço de e-mail"
          />
          {errorsForm("perfil.email")}
        </div>

        <div className="editcand-field">
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

        <div className="editcand-field">
          <label>Instituição de Ensino *</label>
          <InputText
            value={formData.instituicao}
            onChange={(e) => setField("instituicao", e.target.value)}
            className={errors.instituicao ? "p-invalid" : ""}
            placeholder="Selecione a sua instituição"
          />
          {errorsForm("instituicao")}
        </div>

        <div className="editcand-field">
          <label>Curso/Área de atuação *</label>
          <InputText
            value={formData.areaAtuacao}
            onChange={(e) => setField("areaAtuacao", e.target.value)}
            className={errors.areaAtuacao ? "p-invalid" : ""}
            placeholder="Selecione o seu curso ou área de atuação"
          />
          {errorsForm("areaAtuacao")}
        </div>

        <div className="editcand-field">
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

        <div className="editcand-field">
          <label>Período de conclusão</label>
          <InputText
            value={formData.periodoConclusao ?? ""}
            onChange={(e) => setField("periodoConclusao", e.target.value)}
            className={errors.periodoConclusao ? "p-invalid" : ""}
            placeholder="MM/AAAA"
          />
          {errorsForm("periodoConclusao")}
        </div>

        <div className="editcand-field">
          <label>Período de ingresso</label>
          <InputText
            value={formData.periodoIngresso ?? ""}
            onChange={(e) => setField("periodoIngresso", e.target.value)}
            className={errors.periodoIngresso ? "p-invalid" : ""}
            placeholder="MM/AAAA"
          />
          {errorsForm("periodoIngresso")}
        </div>

        <div className="editcand-field">
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

        <div className="editcand-field">
          <label>Currículo Lattes</label>
          <InputText
            value={formData.lattes ?? ""}
            onChange={(e) => setField("lattes", e.target.value)}
            placeholder="Digite o link do seu currículo"
          />
        </div>

        <div className="editcand-field">
          <label>LinkedIn</label>
          <InputText
            value={formData.linkedin ?? ""}
            onChange={(e) => setField("linkedin", e.target.value)}
            placeholder="Digite o link do seu perfil"
          />
        </div>

        <div className="editcand-field">
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
      </div>
      <div className="editcand-half-grid">
        <div className="editcand-field">
          <label>Áreas de interesse *</label>
          <MultiSelect
            value={formData.areasInteresse}
            onChange={(e) => setField("areasInteresse", e.value)}
            options={interesses}
            placeholder="Selecione as suas áreas de interesse"
            className={errors.areasInteresse ? "p-invalid" : ""}
            display="chip"
          />
          {errorsForm("areasInteresse")}
        </div>

        <div className="editcand-field">
          <label>Habilidades *</label>
          <MultiSelect
            value={formData.habilidades}
            onChange={(e) => setField("habilidades", e.value)}
            options={habilidades}
            placeholder="Selecione as suas habilidades"
            className={errors.habilidades ? "p-invalid" : ""}
            display="chip"
          />
          {errorsForm("habilidades")}
        </div>
      </div>

      <div className="editcand-actions">
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
