import React, { useEffect } from "react";
import type { Recrutador } from "@domains/Recrutador";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";

import { useRegisterEditRecrutador } from "@stores/profile/recrutador/formStore";
import PhotoUpload from "@components/PhotoUpload";
import { cargosRecrutador } from "@utils/constants";
import "../styleForm.css";

type RecrutadorEditFormProps = {
  recrutador: Recrutador;
  switchVisibility: () => void;
  onSaved: () => void;
};

const RecrutadorEditFormPage: React.FC<RecrutadorEditFormProps> = ({
  recrutador,
  switchVisibility,
  onSaved,
}) => {
  const { formData, setInitialData, setField, errors, submit, errorsForm } =
    useRegisterEditRecrutador();

  useEffect(() => {
    if (recrutador) setInitialData(recrutador);
  }, [recrutador]);

  if (!formData) return null;

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

      <div className="edit-grid recrutador">
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
            {cargosRecrutador.map((opt) => (
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
          <InputText
            value={formData.areaAtuacao}
            onChange={(e) => setField("areaAtuacao", e.target.value)}
            className={errors.areaAtuacao ? "p-invalid" : ""}
            placeholder="Selecione o seu curso ou área de atuação"
          />
          {errorsForm("areaAtuacao")}
        </div>

        <div className="editperfil-field">
          <label>Laboratório(s) Associado(s)</label>
          <InputText
            value={formData.laboratorios ?? ""}
            onChange={(e) => setField("laboratorios", e.target.value)}
            className={errors.laboratorios ? "p-invalid" : ""}
          />
          {errorsForm("laboratorios")}
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

export default RecrutadorEditFormPage;
