import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { Layout } from "@components/Layout";
import "./style.css";
import { useLogin } from "@stores/login/indexStore";

const LoginPage = () => {
  const { formData, setField, errors, finalizeLogin, errorsForm } = useLogin();
  return (
    <Layout headerType="none" showFooter={false}>
      <div className="login-page">
        <section className="login-left">
          <div className="login-left-content">
            <img
              alt="logo"
              src="/images/logo-azul.png"
              className="login-logo"
            />
            <h2 className="login-title">Login</h2>
            <div className="login-form">
              <InputText
                id="email"
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) => setField("email", e.target.value)}
                className={
                  errors.email ? "p-invalid login-input" : "login-input"
                }
              />
              {errorsForm("email")}

              <InputText
                id="senha"
                type="password"
                placeholder="Senha"
                value={formData.senha}
                onChange={(e) => setField("senha", e.target.value)}
                className={
                  errors.senha ? "p-invalid login-input" : "login-input"
                }
              />
              {errorsForm("senha")}

              <div className="login-row">
                <span className="register-link">
                  Ainda não é cadastrado?{" "}
                  <Link className="enter-link" to="/register">
                    Cadastre-se
                  </Link>
                </span>
              </div>
              <div className="login-action">
                <Button
                  label="Entrar"
                  className="login-button"
                  onClick={() => finalizeLogin()}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="login-right">
          <div className="login-right-content">
            <div className="cap-icon" aria-hidden="true">
              <img alt="chapeu" src="/images/login.png" className="login" />
            </div>

            <div className="login-hero-text">
              <div className="hero-line-1">Bem vindo(a) à</div>
              <div className="hero-line-2">
                plataforma que{" "}
                <span className="hero-underline">linka você</span> a{" "}
                <span className="hero-underline">oportunidades acadêmicas</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default LoginPage;
