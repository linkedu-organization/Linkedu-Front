import type { Recrutador } from "@domains/Recrutador";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { invalid, hasError } from "@utils/utils";
import PhotoUpload from "@components/PhotoUpload";
import "./tabs.css";

type TabDadosBasicosProps = {
  formData: Recrutador;
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
          <label htmlFor="biografia">Biografia</label>
          <InputTextarea
            id="biografia"
            autoResize
            maxLength={255}
            rows={3}
            value={formData.perfil?.biografia}
            onChange={(e) => setField("perfil.biografia", e.target.value)}
            placeholder="Fale um pouco sobre você, seu perfil e objetivos."
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="nome">Nome *</label>
        <InputText
          id="nome"
          value={formData.perfil.nome}
          onChange={(e) => setField("perfil.nome", e.target.value)}
          className={invalid(submitted, errors["perfil.nome"])}
          placeholder="Digite seu nome completo"
        />
        {hasError(submitted, errors["perfil.nome"]) && (
          <small>{errors["perfil.nome"]}</small>
        )}
      </div>

      <div className="field">
        <label>E-mail *</label>
        <InputText
          value={formData.perfil.email}
          onChange={(e) => setField("perfil.email", e.target.value)}
          className={invalid(submitted, errors["perfil.email"])}
          placeholder="Digite seu endereço de e-mail"
        />
        {hasError(submitted, errors["perfil.email"]) && (
          <small>{errors["perfil.email"]}</small>
        )}
      </div>

      <div className="field">
        <label>Senha *</label>
        <InputText
          value={formData.perfil.senha}
          onChange={(e) => setField("perfil.senha", e.target.value)}
          type="password"
          className={invalid(submitted, errors["perfil.senha"])}
          placeholder="Digite sua senha"
        />
        {hasError(submitted, errors["perfil.senha"]) && (
          <small>{errors["perfil.senha"]}</small>
        )}
      </div>

      <div className="field">
        <label>Confirme sua senha *</label>
        <InputText
          value={formData.perfil.confirmaSenha}
          onChange={(e) => setField("perfil.confirmaSenha", e.target.value)}
          type="password"
          className={invalid(submitted, errors["perfil.confirmaSenha"])}
          placeholder="Digite sua senha novamente"
        />
        {hasError(submitted, errors["perfil.confirmaSenha"]) && (
          <small>{errors["perfil.confirmaSenha"]}</small>
        )}
      </div>
    </div>
  </div>
);

export default TabDadosBasicos;
