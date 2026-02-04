import React from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { instituicoes, categorias, publicoAlvo } from "@utils/constants";
import { RadioButton } from "primereact/radiobutton";
import { MultiSelect } from "primereact/multiselect";
import type { Recrutador } from "@domains/Recrutador";
import { useRegisterVaga } from "@stores/register/vaga/formStore";
import "./style.css";

type VagaFormProps = {
  recrutador: Recrutador;
  switchVisibility: () => void;
};

const VagaFormPage: React.FC<VagaFormProps> = ({
  recrutador,
  switchVisibility,
}) => {
  const { formData, setField, errors, submit, resetForm } =
    useRegisterVaga();

  return (
    <div className="exp-form">
      <div className="exp-form-grid">
        <div className="exp-field">
          <label>Título *</label>
          <InputText
            value={formData.titulo}
            onChange={(e) => setField("titulo", e.target.value)}
            className={errors.titulo ? "p-invalid" : ""}
            placeholder="Digite o título da vaga"
          />
          {errors.titulo && <small className="p-error">{errors.titulo}</small>}
        </div>

        <div className="exp-field">
          <label>Visibilidade *</label>

          <div className="radio-row">
            <div className="radio-item">
              <RadioButton
                inputId="vis-publica"
                name="ehPublica"
                value={true}
                onChange={(e) => setField("ehPublica", e.value)}
                checked={formData.ehPublica === true}
              />
              <label htmlFor="vis-publica">Pública</label>
            </div>

            <div className="radio-item">
              <RadioButton
                inputId="vis-privada"
                name="ehPublica"
                value={false}
                onChange={(e) => setField("ehPublica", e.value)}
                checked={formData.ehPublica === false}
              />
              <label htmlFor="vis-privada">Privada</label>
            </div>
          </div>

          {errors["ehPublica"] && (
            <small className="p-error">{errors["ehPublica"]}</small>
          )}
        </div>
        
        <div className="exp-field">
          <label>Categoria *</label>
          <Dropdown
            value={formData.categoria ?? ""}
            options={categorias}
            optionLabel="label"
            optionValue="value"
            onChange={(e) => setField("categoria", e.value)}
            placeholder="Selecione a categoria"
            className={errors["categoria"] ? "p-invalid" : ""}
            style={{ width: "100%" }}
          />
          {errors["categoria"] && (
            <small className="p-error">{errors["categoria"]}</small>
          )}
        </div>



        <div className="exp-field">
          <label>A vaga é *</label>

          <div className="radio-row">
            <div className="radio-item">
              <RadioButton
                inputId="remunerada-nao"
                name="ehRemunerada"
                value={false}
                onChange={(e) => setField("ehRemunerada", e.value)}
                checked={formData.ehRemunerada === false}
              />
              <label htmlFor="remunerada-nao">Voluntária</label>
            </div>

            <div className="radio-item">
              <RadioButton
                inputId="remunerada-sim"
                name="ehRemunerada"
                value={true}
                onChange={(e) => setField("ehRemunerada", e.value)}
                checked={formData.ehRemunerada === true}
              />
              <label htmlFor="remunerada-sim">Remunerada</label>
            </div>
          </div>

          {errors["ehRemunerada"] && (
            <small className="p-error">{errors["ehRemunerada"]}</small>
          )}
        </div>
        

        <div className="exp-field">
          <label>Data de expiração da vaga *</label>
          <InputText
            value={formData.dataExpiracao}
            onChange={(e) => setField("dataExpiracao", e.target.value)}
            className={errors.dataExpiracao ? "p-invalid" : ""}
            placeholder="DD/MM/AA"
          />
          {errors.dataExpiracao && (
            <small className="p-error">{errors.dataExpiracao}</small>
          )}
        </div>

       <div className="exp-field">
          <label>Carga horária *</label>
          <InputText
            value={formData.cargaHoraria ? String(formData.cargaHoraria) : ""}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10);
              setField("cargaHoraria", Number.isNaN(n) ? 0 : n);
            }}
            className={errors.cargaHoraria ? "p-invalid" : ""}
          />
          {errors.cargaHoraria && (
            <small className="p-error">{errors.cargaHoraria}</small>
          )}
        </div>

         <div className="exp-field">
          <label>Tempo de duração (em meses) *</label>
          <InputText
            value={formData.duracao}
            onChange={(e) => setField("duracao", e.target.value)}
            className={errors.duracao ? "p-invalid" : ""}
            placeholder="Informe o período de duração da vaga"
          />
          {errors.duracao && (
            <small className="p-error">{errors.duracao}</small>
          )}
        </div>

         <div className="exp-field">
          <label>Público-alvo *</label>
         <MultiSelect
            value={formData.publicoAlvo}
            options={publicoAlvo}
            optionLabel="label"
            optionValue="value"
            onChange={(e) => setField("publicoAlvo", e.value)} 
            placeholder="Selecione um ou mais públicos..."
            className={errors.publicoAlvo ? "p-invalid" : ""}
            style={{ width: "100%" }}
          />          
          {errors["publicoAlvo"] && (
            <small className="p-error">{errors["publicoAlvo"]}</small>
          )}
        </div>

        <div className="exp-field">
          <label>Instituição de ensino *</label>
          <Dropdown
            value={formData.instituicao ?? ""}
            options={instituicoes}
            optionLabel="label"
            optionValue="value"
            onChange={(e) => setField("instituicao", e.value)}
            placeholder="Selecione a instituição"
            className={errors["instituicao"] ? "p-invalid" : ""}
            style={{ width: "100%" }}
          />
          {errors["instituicao"] && (
            <small className="p-error">{errors["instituicao"]}</small>
          )}
        </div>

         <div className="exp-field">
          <label>Curso *</label>
          <InputText
            value={formData.curso}
            onChange={(e) => setField("curso", e.target.value)}
            className={errors.curso ? "p-invalid" : ""}
            placeholder="Digite o curso"
          />
          {errors.curso && (
            <small className="p-error">{errors.curso}</small>
          )}
        </div>

         <div className="exp-field">
          <label>Conhecimentos Obrigatórios *</label>
          <InputText
            value={formData.conhecimentosObrigatorios.join(", ")}
             onChange={(e) =>
              setField(
                "conhecimentosObrigatorios",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            className={errors.conhecimentosObrigatorios ? "p-invalid" : ""}
            placeholder="Digite os conhecimentos obrigatórios"
          />
          {errors.conhecimentosObrigatorios && (
            <small className="p-error">{errors.conhecimentosObrigatorios}</small>
          )}
        </div>

        <div className="exp-field">
          <label>Conhecimentos Opcionais *</label>
          <InputText
            value={formData.conhecimentosOpcionais.join(", ")}
             onChange={(e) =>
              setField(
                "conhecimentosOpcionais",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            className={errors.conhecimentosOpcionais ? "p-invalid" : ""}
            placeholder="Digite os conhecimentos opcionais"
          />
          {errors.conhecimentosOpcionais && (
            <small className="p-error">{errors.conhecimentosOpcionais}</small>
          )}
        </div>

         <div className="exp-field">
          <label>Link para inscrição *</label>
          <InputText
            value={formData.linkInscricao}
            onChange={(e) => setField("linkInscricao", e.target.value)}
            className={errors.linkInscricao? "p-invalid" : ""}
            placeholder="Digite o link do formulário ou site da inscrição"
          />
          {errors.linkInscricao && (
            <small className="p-error">{errors.linkInscricao}</small>
          )}
        </div>

        <div className="exp-field">
          <label>Laboratório/Local *</label>
          <InputText
            value={formData.local}
            onChange={(e) => setField("local", e.target.value)}
            className={errors.local ? "p-invalid" : ""}
            placeholder="Digite o nome do laboratório ou o local associado"
          />
          {errors.local && (
            <small className="p-error">{errors.local}</small>
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
            placeholder="Descreva os detalhes da vaga: atividades, objetivos e demais informações relevantes."
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
          onClick={() => {
            resetForm();
            switchVisibility();
          }}
        />
        <Button
          label="Salvar"
          className="p-button-save-exp"
          onClick={async () => {
            await submit(recrutador, () => switchVisibility());
          }}
        />
      </div>
    </div>
  );
};

export default VagaFormPage;
