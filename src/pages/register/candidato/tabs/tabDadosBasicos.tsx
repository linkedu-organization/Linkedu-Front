import type { Candidato } from "@domains/Candidato";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import "./tabs.css";
import { invalid, getErrorMsg, hasError } from "@utils/utils";
import PhotoUpload from "@components/PhotoUpload";

type TabDadosBasicosProps = {
  formData: Candidato;
  setField: (field: string, value: unknown) => void;
  submitted: boolean;
  errors: Record<string, string>;
};

const TabDadosBasicos = ({
  formData,
  setField,
  submitted,
  errors,
}: TabDadosBasicosProps) => (
  <div className="step-wrap">
    <div className="register-card">
      <div className="profile-header">
        <PhotoUpload
          canUpload
          setField={setField}
          imageProfile={formData?.perfil?.foto || ""}
        />

        <div className="bio">
          <label htmlFor="biografia">Biografia *</label>
          <InputTextarea
            id="biografia"
            autoResize
            rows={3}
            value={formData.perfil?.biografia}
            onChange={(e) => setField("perfil.biografia", e.target.value)}
            placeholder="Fale um pouco sobre você, seu perfil e objetivos."
            className={invalid(submitted, hasError(errors["perfil.biografia"]))}
          />
          {hasError(errors["perfil.biografia"]) && (
            <small>{getErrorMsg(submitted, errors["perfil.biografia"])}</small>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="nome">Nome *</label>
        <InputText
          id="nome"
          value={formData.perfil.nome}
          onChange={(e) => setField("perfil.nome", e.target.value)}
          className={invalid(submitted, hasError(errors["perfil.nome"]))}
          placeholder="Digite seu nome completo"
        />
        {hasError(errors["perfil.nome"]) && (
          <small>{getErrorMsg(submitted, errors["perfil.nome"])}</small>
        )}
      </div>

      <div className="field">
        <label>E-mail *</label>
        <InputText
          value={formData.perfil.email}
          onChange={(e) => setField("perfil.email", e.target.value)}
          className={invalid(submitted, hasError(errors["perfil.email"]))}
          placeholder="Digite seu endereço de e-mail"
        />
        {hasError(errors["perfil.email"]) && (
          <small>{getErrorMsg(submitted, errors["perfil.email"])}</small>
        )}
      </div>

      <div className="field">
        <label>Senha *</label>
        <InputText
          value={formData.perfil.senha}
          onChange={(e) => setField("perfil.senha", e.target.value)}
          type="password"
          className={invalid(submitted, hasError(errors["perfil.senha"]))}
          placeholder="Crie uma senha"
        />
        {hasError(errors["perfil.senha"]) && (
          <small>{getErrorMsg(submitted, errors["perfil.senha"])}</small>
        )}
      </div>

      <div className="field">
        <label>Confirme sua senha *</label>
        <InputText
          value={formData.perfil.confirmaSenha}
          onChange={(e) => setField("perfil.confirmaSenha", e.target.value)}
          type="password"
          className={invalid(
            submitted,
            hasError(errors["perfil.confirmaSenha"])
          )}
          placeholder="Digite novamente"
        />
        {hasError(errors["perfil.confirmaSenha"]) && (
          <small>
            {getErrorMsg(submitted, errors["perfil.confirmaSenha"])}
          </small>
        )}
      </div>
    </div>
  </div>
);

export default TabDadosBasicos;
