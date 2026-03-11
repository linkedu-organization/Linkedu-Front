import React, { useEffect } from "react";
import type { Candidato } from "@domains/Candidato";

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from "primereact/inputmask";

import { useRegisterEditCandidato } from "@stores/profile/candidato/formStore";
import PhotoUpload from "@components/PhotoUpload";
import MultiSelectWithCustom from "@components/MultiSelectWithCustom";
import {
  cargoCandidato,
  cursos,
  getHabilidadesPorCurso,
  getInteressesPorCurso,
  instituicoes,
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

  const curso =
    cursos.find((c) => c.label === formData.areaAtuacao)?.value ?? null;

  const interessesDisponiveis = getInteressesPorCurso(curso);
  const habilidadesDisponiveis = getHabilidadesPorCurso(curso);

  const interessesFiltrados = (formData.areasInteresse ?? []).filter(
    (v) =>
      interessesDisponiveis.some((o) => o.value === v) ||
      v.startsWith("CUSTOM_")
  );
  const habilidadesFiltradas = (formData.habilidades ?? []).filter(
    (v) =>
      habilidadesDisponiveis.some((o) => o.value === v) ||
      v.startsWith("CUSTOM_")
  );

  const conditionalFields = [
    <React.Fragment key="disp-field">
      <div className="editperfil-field">
        <label>Disponível para contratação *</label>
        <div className="radio-row">
          {simNao.map((opt) => (
            <div className="radio-item" key={String(opt.value)}>
              <RadioButton
                inputId={`disp-${opt.label}`}
                name="disponivel"
                value={opt.value}
                onChange={(e) => {
                  setField("disponivel", e.value);
                  if (!e.value) setField("tempoDisponivel", 0);
                }}
                checked={formData.disponivel === opt.value}
              />
              <label htmlFor={`disp-${opt.label}`}>{opt.label}</label>
            </div>
          ))}
        </div>
        {errorsForm("disponivel")}
      </div>
      <div className="editperfil-field">
        <label>Horas disponíveis (na semana)</label>
        <InputNumber
          value={formData.tempoDisponivel}
          onValueChange={(e) => setField("tempoDisponivel", e.value)}
          min={0}
          max={168}
          placeholder="Selecione sua carga horária disponível na semana"
          className={errors.tempoDisponivel ? "p-invalid" : ""}
          inputClassName={errors.tempoDisponivel ? "p-invalid" : ""}
        />
        {errorsForm("tempoDisponivel")}
      </div>
    </React.Fragment>,
    <React.Fragment key="social-field">
      <div className="editperfil-field">
        <label>Currículo Lattes</label>
        <InputText
          value={formData.lattes ?? ""}
          onChange={(e) => setField("lattes", e.target.value)}
          placeholder="Digite o link do seu currículo"
        />
      </div>
      <div className="editperfil-field">
        <label>LinkedIn</label>
        <InputText
          value={formData.linkedin ?? ""}
          onChange={(e) => setField("linkedin", e.target.value)}
          placeholder="Digite o link do seu perfil"
        />
      </div>
    </React.Fragment>,
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
            style={{ width: "-webkit-fill-available" }}
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
                  onChange={(e) => {
                    setField("cargo", e.value);
                    if (e.value === "TECNICO") {
                      setField("periodoConclusao", undefined);
                      setField("periodoIngresso", undefined);
                    }
                  }}
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
          <Dropdown
            value={formData.instituicao}
            options={instituicoes}
            onChange={(e) => setField("instituicao", e.value)}
            className={errors.instituicao ? "p-invalid" : ""}
            placeholder="Selecione a sua instituição"
          />
          {errorsForm("instituicao")}
        </div>

        <div className="editperfil-field">
          <label>Curso/Área de atuação *</label>
          <MultiSelectWithCustom
            value={formData.areaAtuacao ?? ""}
            onChange={(val) => {
              setField("areaAtuacao", val);
              setField("areasInteresse", []);
              setField("habilidades", []);
            }}
            options={cursos}
            className={errors.areaAtuacao ? "p-invalid" : ""}
            placeholder="Selecione o seu curso ou área de atuação"
            customLabel="Outro (digitar manualmente)"
            selectionMode="single"
            singleSaveAs="label"
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
              <label>Período de ingresso</label>
              <InputMask
                value={formData.periodoIngresso ?? ""}
                onChange={(e) => setField("periodoIngresso", e.target.value)}
                placeholder="Ex.: 2027.2"
                mask="9999.9"
              />
            </div>
            <div className="editperfil-field">
              <label>Período de conclusão (previsto)</label>
              <InputMask
                value={formData.periodoConclusao ?? ""}
                onChange={(e) => setField("periodoConclusao", e.target.value)}
                placeholder="Ex.: 2023.1"
                mask="9999.9"
              />
            </div>
            {conditionalFields}
          </>
        )}
      </div>

      {formData.cargo === "TECNICO" &&
        conditionalFields.map((fields, i) => (
          <div key={i} className="editcand-half-grid">
            {fields}
          </div>
        ))}

      <div className="editcand-half-grid">
        <div className="editperfil-field">
          <label>Áreas de interesse *</label>
          {!curso && (
            <small style={{ color: "var(--Linkedu-Gray)", marginBottom: 4 }}>
              Selecione um curso para ver as opções disponíveis.
            </small>
          )}
          <MultiSelectWithCustom
            value={interessesFiltrados}
            onChange={(vals) => setField("areasInteresse", vals)}
            options={interessesDisponiveis}
            placeholder={
              curso
                ? "Selecione as suas áreas de interesse"
                : "Disponível após selecionar o curso"
            }
            className={errors.areasInteresse ? "p-invalid" : ""}
            disabled={!curso}
            customLabel="Adicionar área personalizada"
          />
          {errorsForm("areasInteresse")}
        </div>

        <div className="editperfil-field">
          <label>Habilidades *</label>
          {!curso && (
            <small style={{ color: "var(--Linkedu-Gray)", marginBottom: 4 }}>
              Selecione um curso para ver as opções disponíveis.
            </small>
          )}
          <MultiSelectWithCustom
            value={habilidadesFiltradas}
            onChange={(vals) => setField("habilidades", vals)}
            options={habilidadesDisponiveis}
            placeholder={
              curso
                ? "Selecione as suas habilidades"
                : "Disponível após selecionar o curso"
            }
            className={errors.habilidades ? "p-invalid" : ""}
            disabled={!curso}
            customLabel="Adicionar habilidade personalizada"
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
