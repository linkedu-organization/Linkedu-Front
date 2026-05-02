import { useState, type FormEvent } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@components/Layout";
import { useNotification } from "@contexts/notificationContext";
import { atualizarSenha } from "@routes/routesPerfil";
import { isMinValue, isValueValid } from "@utils/utils";
import "./style.css";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; errors?: Array<{ message: string }> }
      | undefined;

    return data?.message ?? data?.errors?.[0]?.message ?? fallback;
  }

  return fallback;
};

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const validate = () => {
    const stepErrors: Record<string, string> = {};

    if (!isValueValid(senha)) {
      stepErrors.senha = "Campo obrigatório";
    } else if (!isMinValue(senha, 8)) {
      stepErrors.senha = "A senha precisa de no mínimo oito dígitos";
    }

    if (!isValueValid(confirmaSenha)) {
      stepErrors.confirmaSenha = "Campo obrigatório";
    } else if (senha !== confirmaSenha) {
      stepErrors.confirmaSenha = "As senhas não conferem";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading || !validate()) return;

    setLoading(true);

    try {
      await atualizarSenha({ senha, token });
      showNotification("success", null, "Senha atualizada com sucesso!");
      navigate("/login");
    } catch (err) {
      showNotification(
        "error",
        null,
        getErrorMessage(err, "Erro ao atualizar senha")
      );
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Layout headerType="none" showFooter={false}>
        <div className="recover-page">
          <div className="recover-card">
            <img
              alt="logo"
              src="/images/logo-azul.png"
              className="recover-logo"
            />

            <h2 className="recover-title">Link inválido</h2>
            <p className="recover-description">
              O link de recuperação não possui um token válido. Solicite um novo
              link para redefinir sua senha.
            </p>

            <Link to="/recover" className="recover-link">
              Solicitar novo link
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout headerType="none" showFooter={false}>
      <div className="recover-page">
        <form className="recover-card" onSubmit={handleSubmit}>
          <img
            alt="logo"
            src="/images/logo-azul.png"
            className="recover-logo"
          />

          <h2 className="recover-title">Redefinir senha</h2>
          <p className="recover-description">
            Digite uma nova senha para acessar sua conta.
          </p>

          <div className="recover-field recover-password-field">
            <label htmlFor="senha">Nova senha *</label>
            <Password
              id="senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setErrors((prev) => ({ ...prev, senha: "" }));
              }}
              inputClassName={errors.senha ? "p-invalid" : ""}
              placeholder="Digite sua nova senha"
              feedback={false}
              toggleMask
              disabled={loading}
            />
            {errors.senha && <small>{errors.senha}</small>}
          </div>

          <div className="recover-field recover-password-field">
            <label htmlFor="confirmaSenha">Confirme sua senha *</label>
            <Password
              id="confirmaSenha"
              value={confirmaSenha}
              onChange={(e) => {
                setConfirmaSenha(e.target.value);
                setErrors((prev) => ({ ...prev, confirmaSenha: "" }));
              }}
              inputClassName={errors.confirmaSenha ? "p-invalid" : ""}
              placeholder="Digite sua senha novamente"
              feedback={false}
              toggleMask
              disabled={loading}
            />
            {errors.confirmaSenha && <small>{errors.confirmaSenha}</small>}
          </div>

          <Button
            type="submit"
            label="Atualizar senha"
            className="recover-button"
            loading={loading}
            disabled={loading}
          />

          <Link to="/login" className="recover-link">
            Voltar para o login
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
