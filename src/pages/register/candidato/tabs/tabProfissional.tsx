import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";

type Props = {
  formData: any;
  setField: (field: string, value: any) => void;
  submitted: boolean;
};

const interesses = [
  { label: "IA / ML", value: "IA/ML" },
  { label: "Web", value: "WEB" },
  { label: "Mobile", value: "MOBILE" },
  { label: "DevOps", value: "DEVOPS" },
  { label: "Dados", value: "DADOS" },
  { label: "Testes", value: "TESTES" },
];

const habilidades = [
  { label: "Java", value: "Java" },
  { label: "Python", value: "Python" },
  { label: "React", value: "React" },
  { label: "SQL", value: "SQL" },
  { label: "Docker", value: "Docker" },
  { label: "Git", value: "Git" },
];

const TabProfissional = ({ formData, setField, submitted }: Props) => {
  const invalid = (cond: boolean) =>
    classNames({ "p-invalid": submitted && cond });

  const precisaHoras = formData.disponivel === true;
  const horasInvalid = precisaHoras && (formData.horasDisponiveis ?? 0) <= 0;

  return (
    <div className="form-step">
      <div className="field">
        <label>Disponível para mentoria? *</label>

        <div className="radio-row">
          <div className="radio-item">
            <RadioButton
              inputId="mentoria-sim"
              name="mentoria"
              value
              onChange={(e) => setField("disponivel", e.value)}
              checked={formData.disponivel === true}
            />
            <label htmlFor="mentoria-sim">Sim</label>
          </div>

          <div className="radio-item">
            <RadioButton
              inputId="mentoria-nao"
              name="mentoria"
              value={false}
              onChange={(e) => setField("disponivel", e.value)}
              checked={formData.disponivel === false}
            />
            <label htmlFor="mentoria-nao">Não</label>
          </div>
        </div>

        {submitted && formData.disponivel === null && (
          <small className="error">Selecione uma opção.</small>
        )}
      </div>

      {formData.disponivel === true && (
        <div className="field">
          <label>Horas disponíveis *</label>
          <InputNumber
            value={formData.horasDisponiveis}
            onValueChange={(e) => setField("horasDisponiveis", e.value)}
            min={1}
            placeholder="Ex.: 2"
            className={invalid(horasInvalid)}
            inputClassName={invalid(horasInvalid)}
          />
          {submitted && horasInvalid && (
            <small className="error">
              Informe um número de horas maior que 0.
            </small>
          )}
        </div>
      )}

      <div className="field">
        <label>Áreas de interesse</label>
        <MultiSelect
          value={formData.areasInteresse}
          onChange={(e) => setField("areasInteresse", e.value)}
          options={interesses}
          placeholder="Selecione"
          display="chip"
        />
      </div>

      <div className="field">
        <label>Habilidades</label>
        <MultiSelect
          value={formData.habilidades}
          onChange={(e) => setField("habilidades", e.value)}
          options={habilidades}
          placeholder="Selecione"
          display="chip"
        />
      </div>

      <div className="field">
        <label>Currículo Lattes</label>
        <InputText
          value={formData.lattes}
          onChange={(e) => setField("lattes", e.target.value)}
          placeholder="https://lattes.cnpq.br/..."
        />
      </div>

      <div className="field">
        <label>LinkedIn</label>
        <InputText
          value={formData.linkedin}
          onChange={(e) => setField("linkedin", e.target.value)}
          placeholder="https://www.linkedin.com/in/..."
        />
      </div>
    </div>
  );
};

export default TabProfissional;
