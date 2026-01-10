import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import type { Candidato } from "@domains/Candidato";
import { instituicoes, niveis } from "@utils/constants";
import { invalid } from "@utils/utils";
import "./tabs.css";

type TabEscolaridadeProps = {
  formData: Candidato;
  setField: (field: string, value: unknown) => void;
  submitted: boolean;
};

const TabEscolaridade = ({
  formData,
  setField,
  submitted,
}: TabEscolaridadeProps) => (
  <div className="step-wrap">
    <div className="register-card">
      <div className="field">
        <label>Você é *</label>

        <div className="radio-row">
          <div className="radio-item">
            <RadioButton
              inputId="tipo-aluno"
              name="tipo"
              value="ALUNO"
              onChange={(e) => setField("perfil.tipo", e.value)}
              checked={formData.perfil?.tipo === "ALUNO"}
            />
            <label htmlFor="tipo-aluno">Aluno</label>
          </div>

          <div className="radio-item">
            <RadioButton
              inputId="tipo-tec"
              name="tipo"
              value="TECNICO_ADMIN"
              onChange={(e) => setField("perfil.tipo", e.value)}
              checked={formData.perfil?.tipo === "TECNICO_ADMIN"}
            />
            <label htmlFor="tipo-tec">Técnico Administrativo</label>
          </div>
        </div>

        {submitted && !formData.perfil?.tipo && (
          <small>Selecione uma opção.</small>
        )}
      </div>

      <div className="field">
        <label>Instituição de Ensino *</label>
        <Dropdown
          value={formData.instituicao}
          onChange={(e) => setField("instituicao", e.value)}
          options={instituicoes}
          placeholder="Selecione"
          className={invalid(submitted, !formData.instituicao)}
        />
        {submitted && !formData.instituicao && (
          <small>Informe a instituição.</small>
        )}
      </div>

      <div className="field">
        <label>Curso / Área de atuação *</label>
        <InputText
          value={formData.areaAtuacao}
          onChange={(e) => setField("areaAtuacao", e.target.value)}
          placeholder="Selecione o seu curso ou área de atuação"
          className={invalid(submitted, !formData.areaAtuacao)}
        />
        {submitted && !formData.areaAtuacao && (
          <small>Informe o curso/área.</small>
        )}
      </div>

      <div className="field">
        <label>Nível de escolaridade *</label>
        <Dropdown
          value={formData.nivelEscolaridade}
          onChange={(e) => setField("nivelEscolaridade", e.value)}
          options={niveis}
          placeholder="Selecione"
          className={invalid(submitted, !formData.nivelEscolaridade)}
        />
        {submitted && !formData.nivelEscolaridade && (
          <small>Informe o nível.</small>
        )}
      </div>

      <div className="field">
        <label>Período de ingresso *</label>
        <InputText
          value={formData.periodoIngresso}
          onChange={(e) => setField("periodoIngresso", e.target.value)}
          placeholder="Ex.: 2023.1"
          className={invalid(submitted, !formData.periodoIngresso)}
        />
        {submitted && !formData.periodoIngresso && (
          <small>Informe o período de ingresso.</small>
        )}
      </div>

      <div className="field">
        <label>Período de conclusão *</label>
        <InputText
          value={formData.periodoConclusao}
          onChange={(e) => setField("periodoConclusao", e.target.value)}
          placeholder="Ex.: 2027.2"
          className={invalid(submitted, !formData.periodoConclusao)}
        />
        {submitted && !formData.periodoConclusao && (
          <small>Informe o período de conclusão.</small>
        )}
      </div>
    </div>
  </div>
);

export default TabEscolaridade;
