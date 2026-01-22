import type { Candidato } from "@domains/Candidato";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { InputTextarea } from "primereact/inputtextarea";
import "./tabs.css";
import { invalid } from "@utils/utils";
import PhotoUpload from "@components/PhotoUpload";

type TabDadosBasicosProps = {
  formData: Candidato;
  setField: (field: string, value: unknown) => void;
  submitted: boolean;
};

const TabDadosBasicos = ({
  formData,
  setField,
  submitted,
}: TabDadosBasicosProps) => {
  const senhaMismatch =
    submitted &&
    formData.perfil.senha &&
    formData.perfil.confirmaSenha &&
    formData.perfil.senha !== formData.perfil.confirmaSenha;

  return (
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
              className={invalid(
                submitted,
                !formData?.perfil?.biografia?.trim()
              )}
            />
            {submitted && !formData?.perfil?.biografia?.trim() && (
              <small>Verifique sua biografia</small>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="nome">Nome *</label>
          <InputText
            id="nome"
            value={formData.perfil.nome}
            onChange={(e) => setField("perfil.nome", e.target.value)}
            className={invalid(submitted, !formData.perfil.nome?.trim())}
            placeholder="Digite seu nome completo"
          />
          {submitted && !formData.perfil.nome?.trim() && (
            <small>Verifique o nome informado</small>
          )}
        </div>

        <div className="field">
          <label>E-mail *</label>
          <InputText
            value={formData.perfil.email}
            onChange={(e) => setField("perfil.email", e.target.value)}
            className={invalid(submitted, !formData.perfil.email?.trim())}
            placeholder="Digite seu endereço de e-mail"
          />
          {submitted && !formData.perfil.email?.trim() && (
            <small>Verifique o e-mail</small>
          )}
        </div>

        <div className="field">
          <label>Senha *</label>
          <Password
            value={formData.perfil.senha}
            onChange={(e) => setField("perfil.senha", e.target.value)}
            toggleMask
            feedback={false}
            className={invalid(submitted, !formData.perfil.senha)}
            inputClassName={invalid(submitted, !formData.perfil.senha)}
            placeholder="Crie uma senha"
          />
          {submitted && !formData.perfil.senha && (
            <small>Verifique a senha informada</small>
          )}
        </div>

        <div className="field">
          <label>Confirme sua senha *</label>
          <Password
            value={formData.perfil.confirmaSenha}
            onChange={(e) => setField("perfil.confirmaSenha", e.target.value)}
            toggleMask
            feedback={false}
            className={invalid(
              submitted,
              !formData.perfil.confirmaSenha || senhaMismatch
            )}
            inputClassName={invalid(
              submitted,
              !formData.perfil.confirmaSenha || senhaMismatch
            )}
            placeholder="Digite novamente"
          />
          {submitted && !formData.perfil.confirmaSenha && (
            <small>Confirme a senha informada</small>
          )}
          {senhaMismatch && <small>As senhas não conferem.</small>}
        </div>
      </div>
    </div>
  );
};

export default TabDadosBasicos;
