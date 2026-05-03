import { useState, type FormEvent } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { Layout } from "@components/Layout";
import { useNotification } from "@contexts/notificationContext";
import { recuperarSenha } from "@routes/routesPerfil";
import { isEmail, isValueValid } from "@utils/utils";
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

const PasswordRecoveryPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { showNotification } = useNotification();

  const validate = () => {
    const trimmedEmail = email.trim();

    if (!isValueValid(trimmedEmail)) {
      setError("Campo obrigatório");
      return false;
    }

    if (!isEmail(trimmedEmail)) {
      setError("E-mail inválido");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading || !validate()) return;

    setLoading(true);
    setSuccessMessage("");

    try {
      const response = await recuperarSenha({ email: email.trim() });
      const mensagem =
        (response.data as { mensagem?: string }).mensagem ??
        "Email para recuperação de senha enviado. Verifique sua caixa de Spam.";

      setSuccessMessage(mensagem);
      showNotification("success", null, mensagem);
    } catch (err) {
      showNotification(
        "error",
        null,
        getErrorMessage(err, "Erro ao solicitar recuperação de senha")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout headerType="none" showFooter={false}>
      <div className="recover-page">
        <form className="recover-card" onSubmit={handleSubmit}>
          <img
            alt="logo"
            src="/images/logo-azul.png"
            className="recover-logo"
          />

          <h2 className="recover-title">Recuperar senha</h2>
          <p className="recover-description">
            Informe o e-mail cadastrado para receber o link de redefinição de
            senha.
          </p>

          <div className="recover-field">
            <label htmlFor="email">E-mail *</label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setSuccessMessage("");
              }}
              placeholder="Digite seu endereço de e-mail"
              className={error ? "p-invalid" : ""}
              disabled={loading}
            />
            {error && <small>{error}</small>}
          </div>

          {successMessage && (
            <p className="recover-success">{successMessage}</p>
          )}

          <Button
            type="submit"
            label="Enviar link de recuperação"
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

export default PasswordRecoveryPage;
