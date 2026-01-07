import type { Candidato } from "@domains/Candidato";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";

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
  const invalid = (cond: boolean) =>
    classNames({ "p-invalid": submitted && cond });

  const senhaMismatch =
    submitted &&
    formData.perfil.senha &&
    formData.perfil.confirmaSenha &&
    formData.perfil.senha !== formData.perfil.confirmaSenha;

  return (
    <div className="form-step">
      <div className="field">
        <label htmlFor="nome">Nome *</label>

        <InputText
          id="nome"
          value={formData.perfil.nome}
          onChange={(e) => setField("perfil.nome", e.target.value)}
          className={invalid(!formData.perfil.nome?.trim())}
        />

        {submitted && !formData.perfil.nome?.trim() && (
          <small className="error">Informe o nome.</small>
        )}
      </div>

      <div className="field">
        <label>E-mail institucional *</label>
        <InputText
          value={formData.perfil.email}
          onChange={(e) => setField("perfil.email", e.target.value)}
          className={invalid(!formData.perfil.email?.trim())}
        />
        {submitted && !formData.perfil.email?.trim() && (
          <small className="error">Informe o e-mail.</small>
        )}
      </div>

      <div className="field">
        <label>Senha *</label>
        <Password
          value={formData.perfil.senha}
          onChange={(e) => setField("perfil.senha", e.target.value)}
          toggleMask
          feedback={false}
          className={invalid(!formData.perfil.senha)}
          inputClassName={invalid(!formData.perfil.senha)}
          placeholder="Crie uma senha"
        />
        {submitted && !formData.perfil.senha && (
          <small className="error">Informe a senha.</small>
        )}
      </div>

      <div className="field">
        <label>Confirmar senha *</label>
        <Password
          value={formData.perfil.confirmaSenha}
          onChange={(e) => setField("perfil.confirmaSenha", e.target.value)}
          toggleMask
          feedback={false}
          className={invalid(!formData.perfil.confirmaSenha || senhaMismatch)}
          inputClassName={invalid(
            !formData.perfil.confirmaSenha || senhaMismatch
          )}
          placeholder="Repita a senha"
        />
        {submitted && !formData.perfil.confirmaSenha && (
          <small className="error">Confirme a senha.</small>
        )}
        {senhaMismatch && (
          <small className="error">As senhas não conferem.</small>
        )}
      </div>
    </div>
  );
};

export default TabDadosBasicos;
