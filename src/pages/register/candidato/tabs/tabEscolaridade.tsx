import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import type { Candidato } from "@domains/Candidato";
import { instituicoes, niveis } from "@utils/constants";
import { hasError, invalid } from "@utils/utils";
import "./tabs.css";

type TabEscolaridadeProps = {
  formData: Candidato;
  setField: (field: string, value: unknown) => void;
  submitted: boolean;
  errors: Record<string, string>;
};

const TabEscolaridade = ({
  formData,
  setField,
  submitted,
  errors,
}: TabEscolaridadeProps) => (
  <div className="step-wrap">
    <div className="register-card">
      <div className="field">
        <label>Você é *</label>

        <div className="radio-row">
          <div className="radio-item">
            <RadioButton
              inputId="cargo-aluno"
              name="cargo"
              value="ALUNO"
              onChange={(e) => setField("cargo", e.value)}
              checked={formData.cargo === "ALUNO"}
            />
            <label htmlFor="cargo-aluno">Aluno</label>
          </div>

          <div className="radio-item">
            <RadioButton
              inputId="cargo-tec"
              name="cargo"
              value="TECNICO"
              onChange={(e) => setField("cargo", e.value)}
              checked={formData.cargo === "TECNICO"}
            />
            <label htmlFor="cargo-tec">Técnico Administrativo</label>
          </div>
        </div>

        {hasError(submitted, errors.cargo) && <small>{errors.cargo}</small>}
      </div>

      <div className="field">
        <label>Instituição de Ensino *</label>
        <Dropdown
          value={formData.instituicao}
          onChange={(e) => setField("instituicao", e.value)}
          options={instituicoes}
          placeholder="Selecione a sua instituição"
          className={invalid(submitted, errors.instituicao)}
        />
        {hasError(submitted, errors.instituicao) && (
          <small>{errors.instituicao}</small>
        )}
      </div>

      <div className="field">
        <label>Curso / Área de atuação *</label>
        <InputText
          value={formData.areaAtuacao}
          onChange={(e) => setField("areaAtuacao", e.target.value)}
          placeholder="Selecione o seu curso ou área de atuação"
          className={invalid(submitted, errors.areaAtuacao)}
        />
        {hasError(submitted, errors.areaAtuacao) && (
          <small>{errors.areaAtuacao}</small>
        )}
      </div>

      <div className="field">
        <label>Nível de escolaridade *</label>
        <Dropdown
          value={formData.nivelEscolaridade}
          onChange={(e) => setField("nivelEscolaridade", e.value)}
          options={niveis}
          placeholder="Selecione o seu nível de escolaridade"
          className={invalid(submitted, errors.nivelEscolaridade)}
        />
        {hasError(submitted, errors.nivelEscolaridade) && (
          <small>{errors.nivelEscolaridade}</small>
        )}
      </div>
      {formData.cargo === "ALUNO" && (
        <>
          <div className="field">
            <label>Período de ingresso</label>
            <InputText
              value={formData.periodoIngresso}
              onChange={(e) => setField("periodoIngresso", e.target.value)}
              placeholder="Ex.: 2023.1"
              maxLength={6}
            />
          </div>

          <div className="field">
            <label>Período de conclusão</label>
            <InputText
              value={formData.periodoConclusao}
              onChange={(e) => setField("periodoConclusao", e.target.value)}
              placeholder="Ex.: 2027.2"
              maxLength={6}
            />
          </div>
        </>
      )}
    </div>
  </div>
);

export default TabEscolaridade;
