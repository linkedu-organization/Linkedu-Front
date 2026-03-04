import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import type { Candidato } from "@domains/Candidato";
import { getHabilidadesPorCurso, getInteressesPorCurso } from "@utils/constants";
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
}: TabProfissionalProps) => {
  const curso = formData.areaAtuacao ?? null;
  const interessesDisponiveis = getInteressesPorCurso(curso);
  const habilidadesDisponiveis = getHabilidadesPorCurso(curso);

  const interessesFiltrados = (formData.areasInteresse ?? []).filter((v) =>
    interessesDisponiveis.some((o) => o.value === v)
  );
  const habilidadesFiltradas = (formData.habilidades ?? []).filter((v) =>
    habilidadesDisponiveis.some((o) => o.value === v)
  );

  return (
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
          {!curso && (
            <small style={{ color: "var(--Linkedu-Gray)", marginBottom: 4 }}>
              Selecione um curso/área de atuação na etapa anterior para ver as opções disponíveis.
            </small>
          )}
          <MultiSelect
            value={interessesFiltrados}
            onChange={(e) => setField("areasInteresse", e.value)}
            options={interessesDisponiveis}
            placeholder={
              curso
                ? "Selecione as suas áreas de interesse"
                : "Disponível após selecionar o curso"
            }
            display="chip"
            disabled={!curso}
          />
          {hasError(submitted, errors.areasInteresse) && (
            <small>{errors.areasInteresse}</small>
          )}
        </div>

        <div className="field">
          <label>Habilidades *</label>
          {!curso && (
            <small style={{ color: "var(--Linkedu-Gray)", marginBottom: 4 }}>
              Selecione um curso/área de atuação na etapa anterior para ver as opções disponíveis.
            </small>
          )}
          <MultiSelect
            value={habilidadesFiltradas}
            onChange={(e) => setField("habilidades", e.value)}
            options={habilidadesDisponiveis}
            placeholder={
              curso
                ? "Selecione as suas habilidades"
                : "Disponível após selecionar o curso"
            }
            display="chip"
            disabled={!curso}
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
};

export default TabProfissional;