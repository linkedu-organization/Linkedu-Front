import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { Layout } from "@components/Layout";
import "./style.css";

const LoginPage = () => (
  <Layout headerType="none" showFooter={false}>
    <div className="login-page">
      <section className="login-left">
        <div className="login-left-content">
          <img alt="logo" src="/images/logo-azul.png" className="login-logo" />
          <h2 className="login-title">Login</h2>
          <div className="login-form">
            <InputText
              id="email"
              type="email"
              className="login-input"
              placeholder="E-mail"
            />
            <InputText
              id="senha"
              type="password"
              placeholder="Senha"
              className="login-input"
            />
            <div className="login-row">
              <span className="register-link">
                Ainda não é cadastrado?{" "}
                <Link className="enter-link" to="/register">
                  Cadastre-se
                </Link>
              </span>
            </div>
            <div className="login-action">
              <Button label="Entrar" className="login-button" />
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
              plataforma que <span className="hero-underline">linka você</span>{" "}
              a <span className="hero-underline">oportunidades acadêmicas</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);

export default LoginPage;
