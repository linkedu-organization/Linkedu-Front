import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import type { Recrutador } from "@domains/Recrutador";
import { instituicoes, cargosRecrutador } from "@utils/constants";
import { hasError, invalid } from "@utils/utils";
import "./tabs.css";

type TabProfissionalProps = {
  formData: Recrutador;
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
        <label>Cargo *</label>
        <Dropdown
          value={formData.cargo}
          onChange={(e) => setField("cargo", e.value)}
          options={cargosRecrutador}
          placeholder="Selecione seu cargo"
          className={invalid(submitted, errors.cargo)}
        />
        {hasError(submitted, errors.cargo) && <small>{errors.cargo}</small>}
      </div>

      <div className="field">
        <label>Instituição *</label>
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
        <label>Área de Atuação *</label>
        <InputText
          value={formData.areaAtuacao}
          onChange={(e) => setField("areaAtuacao", e.target.value)}
          placeholder="Ex: Inteligência Artificial, Engenharia de Software"
          className={invalid(submitted, errors.areaAtuacao)}
        />
        {hasError(submitted, errors.areaAtuacao) && (
          <small>{errors.areaAtuacao}</small>
        )}
      </div>

      <div className="field">
        <label>Laboratórios</label>
        <InputText
          value={formData.laboratorios}
          onChange={(e) => setField("laboratorios", e.target.value)}
          placeholder="Ex: LSI, LSD, VIRTUS"
        />
      </div>
    </div>
  </div>
);

export default TabProfissional;