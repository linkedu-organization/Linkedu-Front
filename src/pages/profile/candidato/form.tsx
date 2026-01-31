import React, { useEffect } from "react";
import type { Candidato } from "@domains/Candidato";

import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";

import { useRegisterEditCandidato } from "@stores/profile/candidato/formStore";
import "./styleForm.css";

type Props = {
  candidato?: Candidato;
  switchVisibility: () => void;
  onSaved?: (updated: Candidato) => void;
};

const tipoCargoOptions = [
  { label: "Aluno", value: "ALUNO" },
  { label: "Técnico Administrativo", value: "TECNICO" },
];

const escolaridadeOptions = [
  { label: "Graduação incompleta", value: "GRADUACAO_INCOMPLETA" },
  { label: "Graduação completa", value: "GRADUACAO_COMPLETA" },
  { label: "Pós-graduação", value: "POS_GRADUACAO" },
];

const CandidatoEditFormPage: React.FC<Props> = ({
  candidato,
  switchVisibility,
  onSaved,
}) => {
  const { formData, setInitialData, setField, errors, submit, resetForm } =
    useRegisterEditCandidato();

  useEffect(() => {
    if (candidato) setInitialData(candidato);
  }, [candidato]);

  if (!formData) return null;

  const error = (path: string) => errors[path];

  return (
    <div className="editcand">
      <div className="editcand-header">
        <div className="editcand-avatar">
          <Avatar image={formData.perfil.foto} size="xlarge" shape="circle" />
        </div>

        <div className="editcand-bio">
          <label>
            Biografia <span className="req">*</span>
          </label>
          <InputTextarea
            value={formData.perfil.biografia ?? ""}
            onChange={(e) => setField("perfil.biografia", e.target.value)}
            className={error("perfil.biografia") ? "p-invalid" : ""}
            rows={4}
            autoResize
            placeholder="Fale um pouco sobre você, seu perfil e objetivos."
          />
          {error("perfil.biografia") && (
            <small className="p-error">{error("perfil.biografia")}</small>
          )}
        </div>
      </div>

      <div className="editcand-grid">
        <div className="field">
          <label>
            Nome <span className="req">*</span>
          </label>
          <InputText
            value={formData.perfil.nome ?? ""}
            onChange={(e) => setField("perfil.nome", e.target.value)}
            className={error("perfil.nome") ? "p-invalid" : ""}
            placeholder="Digite seu nome completo"
          />
          {error("perfil.nome") && (
            <small className="p-error">{error("perfil.nome")}</small>
          )}
        </div>

        <div className="field">
          <label>
            E-mail (Institucional) <span className="req">*</span>
          </label>
          <InputText
            value={formData.perfil.email ?? ""}
            onChange={(e) => setField("perfil.email", e.target.value)}
            className={error("perfil.email") ? "p-invalid" : ""}
            placeholder="Digite seu endereço de e-mail"
          />
          {error("perfil.email") && (
            <small className="p-error">{error("perfil.email")}</small>
          )}
        </div>

        <div className="field">
          <label>
            Você é <span className="req">*</span>
          </label>
          <div className="radio-row">
            {tipoCargoOptions.map((opt) => (
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
          {error("cargo") && (
            <small className="p-error">{error("cargo")}</small>
          )}
        </div>

        <div className="field">
          <label>
            Instituição de Ensino <span className="req">*</span>
          </label>
          <InputText
            value={formData.instituicao ?? ""}
            onChange={(e) => setField("instituicao", e.target.value)}
            className={error("instituicao") ? "p-invalid" : ""}
            placeholder="Selecione a sua instituição"
          />
          {error("instituicao") && (
            <small className="p-error">{error("instituicao")}</small>
          )}
        </div>

        <div className="field">
          <label>
            Curso/Área de atuação <span className="req">*</span>
          </label>
          <InputText
            value={formData.areaAtuacao ?? ""}
            onChange={(e) => setField("areaAtuacao", e.target.value)}
            className={error("areaAtuacao") ? "p-invalid" : ""}
            placeholder="Selecione o seu curso ou área de atuação"
          />
          {error("areaAtuacao") && (
            <small className="p-error">{error("areaAtuacao")}</small>
          )}
        </div>

        <div className="field">
          <label>
            Nível de escolaridade <span className="req">*</span>
          </label>
          <Dropdown
            value={formData.nivelEscolaridade}
            options={escolaridadeOptions}
            optionLabel="label"
            optionValue="value"
            onChange={(e) => setField("nivelEscolaridade", e.value)}
            className={error("nivelEscolaridade") ? "p-invalid" : ""}
            placeholder="Selecione seu nível de escolaridade"
          />
          {error("nivelEscolaridade") && (
            <small className="p-error">{error("nivelEscolaridade")}</small>
          )}
        </div>

        <div className="field">
          <label>Período de conclusão</label>
          <InputText
            value={formData.periodoConclusao ?? ""}
            onChange={(e) => setField("periodoConclusao", e.target.value)}
            className={error("periodoConclusao") ? "p-invalid" : ""}
            placeholder="MM/AAAA"
          />
          {error("periodoConclusao") && (
            <small className="p-error">{error("periodoConclusao")}</small>
          )}
        </div>

        <div className="field">
          <label>Período de ingresso</label>
          <InputText
            value={formData.periodoIngresso ?? ""}
            onChange={(e) => setField("periodoIngresso", e.target.value)}
            className={error("periodoIngresso") ? "p-invalid" : ""}
            placeholder="MM/AAAA"
          />
          {error("periodoIngresso") && (
            <small className="p-error">{error("periodoIngresso")}</small>
          )}
        </div>

        <div className="field">
          <label>Horas disponíveis</label>
          <InputText
            value={String(formData.tempoDisponivel ?? "")}
            onChange={(e) =>
              setField("tempoDisponivel", Number(e.target.value))
            }
            className={error("tempoDisponivel") ? "p-invalid" : ""}
            placeholder="Selecione sua carga horária disponível na semana"
          />
          {error("tempoDisponivel") && (
            <small className="p-error">{error("tempoDisponivel")}</small>
          )}
        </div>

        <div className="field">
          <label>Currículo Lattes</label>
          <InputText
            value={formData.lattes ?? ""}
            onChange={(e) => setField("lattes", e.target.value)}
            placeholder="Digite o link do seu currículo"
          />
        </div>

        <div className="field">
          <label>LinkedIn</label>
          <InputText
            value={formData.linkedin ?? ""}
            onChange={(e) => setField("linkedin", e.target.value)}
            placeholder="Digite o link do seu perfil"
          />
        </div>

        <div className="field">
          <label>
            Disponível para contratação <span className="req">*</span>
          </label>
          <div className="radio-row">
            {[
              { label: "Sim", value: true },
              { label: "Não", value: false },
            ].map((opt) => (
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
          {error("disponivel") && (
            <small className="p-error">{error("disponivel")}</small>
          )}
        </div>

        <div className="field">
          <label>
            Áreas de interesse <span className="req">*</span>
          </label>
          <InputText
            value={(formData.areasInteresse ?? []).join(" | ")}
            onChange={(e) =>
              setField(
                "areasInteresse",
                e.target.value
                  .split("|")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            className={error("areasInteresse") ? "p-invalid" : ""}
            placeholder="Selecione as suas áreas de interesse"
          />
          {error("areasInteresse") && (
            <small className="p-error">{error("areasInteresse")}</small>
          )}
        </div>

        <div className="field">
          <label>
            Habilidades <span className="req">*</span>
          </label>
          <InputText
            value={(formData.habilidades ?? []).join(" | ")}
            onChange={(e) =>
              setField(
                "habilidades",
                e.target.value
                  .split("|")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            className={error("habilidades") ? "p-invalid" : ""}
            placeholder="Selecione as suas habilidades"
          />
          {error("habilidades") && (
            <small className="p-error">{error("habilidades")}</small>
          )}
        </div>
      </div>

      <div className="editcand-actions">
        <Button
          label="Salvar"
          onClick={() => submit(() => switchVisibility())}
        />
      </div>
    </div>
  );
};

export default CandidatoEditFormPage;
