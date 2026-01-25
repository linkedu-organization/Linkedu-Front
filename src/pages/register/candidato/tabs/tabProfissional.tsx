import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import type { Candidato } from "@domains/Candidato";
import { cargaHoraria, habilidades, interesses } from "@utils/constants";
import { hasError, invalid } from "@utils/utils";
import "./tabs.css";
import { Dropdown } from "primereact/dropdown";

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

      {formData.disponivel && (
        <div className="field">
          <label>Horas disponíveis *</label>
          <Dropdown
            value={formData.tempoDisponivel}
            onChange={(e) => setField("tempoDisponivel", e.value)}
            options={cargaHoraria}
            placeholder="Selecione sua faixa de carga horária semanal"
            className={invalid(submitted, errors.tempoDisponivel)}
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
