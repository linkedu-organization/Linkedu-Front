import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import type { Candidato } from "@domains/Candidato";
import { habilidades, interesses } from "@utils/constants";
import { hasError, invalid } from "@utils/utils";
import "./tabs.css";

type TabProfissionalProps = {
  formData: Candidato;
  setField: (field: string, value: unknown) => void;
  submitted: boolean;
  errors: Record<string, string>;
};

const TabProfissional = ({
  formData,
  setField,
  submitted,
  errors,
}: TabProfissionalProps) => (
  <div className="step-wrap">
    <div className="register-card">
      <div className="field">
        <label>Disponível para contratação? *</label>

        <div className="radio-row">
          <div className="radio-item">
            <RadioButton
              inputId="contratacao-sim"
              name="contratacao"
              value
              onChange={(e) => setField("disponivel", e.value)}
              checked={formData.disponivel === true}
            />
            <label htmlFor="contratacao-sim">Sim</label>
          </div>

          <div className="radio-item">
            <RadioButton
              inputId="contratacao-nao"
              name="contratacao"
              value={false}
              onChange={(e) => setField("disponivel", e.value)}
              checked={formData.disponivel === false}
            />
            <label htmlFor="contratacao-nao">Não</label>
          </div>
        </div>

        {hasError(submitted, errors.disponivel) && (
          <small>{errors.disponivel}</small>
        )}
      </div>

      {formData.disponivel === true && (
        <div className="field">
          <label>Horas disponíveis *</label>
          <InputNumber
            value={formData.tempoDisponivel}
            onValueChange={(e) => setField("tempoDisponivel", e.value)}
            min={0}
            placeholder="Digite sua carga horária semanal"
            className={invalid(submitted, errors.tempoDisponivel)}
            inputClassName={invalid(submitted, errors.tempoDisponivel)}
          />
          {hasError(submitted, errors.tempoDisponivel) && (
            <small>{errors.tempoDisponivel}</small>
          )}
        </div>
      )}

      <div className="field">
        <label>Áreas de interesse *</label>
        <MultiSelect
          value={formData.areasInteresse}
          onChange={(e) => setField("areasInteresse", e.value)}
          options={interesses}
          placeholder="Selecione as suas áreas de interesse"
          display="chip"
        />
        {hasError(submitted, errors.areasInteresse) && (
          <small>{errors.areasInteresse}</small>
        )}
      </div>

      <div className="field">
        <label>Habilidades *</label>
        <MultiSelect
          value={formData.habilidades}
          onChange={(e) => setField("habilidades", e.value)}
          options={habilidades}
          placeholder="Selecione as suas habilidades"
          display="chip"
        />
        {hasError(submitted, errors.habilidades) && (
          <small>{errors.habilidades}</small>
        )}
      </div>

      <div className="field">
        <label>Currículo Lattes</label>
        <InputText
          value={formData.lattes}
          onChange={(e) => setField("lattes", e.target.value)}
          placeholder="Digite o link do seu currículo"
        />
      </div>

      <div className="field">
        <label>LinkedIn</label>
        <InputText
          value={formData.linkedin}
          onChange={(e) => setField("linkedin", e.target.value)}
          placeholder="Digite o link do seu perfil"
        />
      </div>
    </div>
  </div>
);

export default TabProfissional;
