import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

type Props = {
  formData: any;
  setField: (field: string, value: any) => void;
  submitted: boolean;
};

const instituicoes = [
  { label: "UFCG", value: "UFCG" },
  { label: "UFPB", value: "UFPB" },
  { label: "IFPB", value: "IFPB" },
  { label: "Outra", value: "Outra" },
];

const niveis = [
  { label: "Ensino Médio", value: "ENSINO_MEDIO" },
  { label: "Técnico", value: "TECNICO" },
  { label: "Graduação", value: "GRADUACAO" },
  { label: "Especialização", value: "ESPECIALIZACAO" },
  { label: "Mestrado", value: "MESTRADO" },
  { label: "Doutorado", value: "DOUTORADO" },
];

const TabEscolaridade = ({ formData, setField, submitted }: Props) => {
  const invalid = (cond: boolean) =>
    classNames({ "p-invalid": submitted && cond });

  return (
    <div className="form-step">
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
          <small className="error">Selecione uma opção.</small>
        )}
      </div>

      <div className="field">
        <label>Instituição de Ensino *</label>
        <Dropdown
          value={formData.instituicao}
          onChange={(e) => setField("instituicao", e.value)}
          options={instituicoes}
          placeholder="Selecione"
          className={invalid(!formData.instituicao)}
        />
        {submitted && !formData.instituicao && (
          <small className="error">Informe a instituição.</small>
        )}
      </div>

      <div className="field">
        <label>Curso / Área de atuação *</label>
        <InputText
          value={formData.areaAtuacao}
          onChange={(e) => setField("areaAtuacao", e.target.value)}
          placeholder="Ex.: Ciência da Computação / Administração / ..."
          className={invalid(!formData.areaAtuacao)}
        />
        {submitted && !formData.areaAtuacao && (
          <small className="error">Informe o curso/área.</small>
        )}
      </div>

      <div className="field">
        <label>Nível de escolaridade *</label>
        <Dropdown
          value={formData.nivelEscolaridade}
          onChange={(e) => setField("nivelEscolaridade", e.value)}
          options={niveis}
          placeholder="Selecione"
          className={invalid(!formData.nivelEscolaridade)}
        />
        {submitted && !formData.nivelEscolaridade && (
          <small className="error">Informe o nível.</small>
        )}
      </div>

      <div className="field">
        <label>Período de ingresso *</label>
        <InputText
          value={formData.periodoIngresso}
          onChange={(e) => setField("periodoIngresso", e.target.value)}
          placeholder="Ex.: 2023.1"
          className={invalid(!formData.periodoIngresso)}
        />
        {submitted && !formData.periodoIngresso && (
          <small className="error">Informe o período de ingresso.</small>
        )}
      </div>

      <div className="field">
        <label>Período de conclusão *</label>
        <InputText
          value={formData.periodoConclusao}
          onChange={(e) => setField("periodoConclusao", e.target.value)}
          placeholder="Ex.: 2027.2"
          className={invalid(!formData.periodoConclusao)}
        />
        {submitted && !formData.periodoConclusao && (
          <small className="error">Informe o período de conclusão.</small>
        )}
      </div>
    </div>
  );
};

export default TabEscolaridade;
