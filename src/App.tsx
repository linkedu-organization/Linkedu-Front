import { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@pages/homePage";
import ExplorePage from "@pages/explore";
import RegistrationPage from "@pages/register";
import { NotificationProvider } from "@contexts/notificationContext";
import RegisterCandidato from "@pages/register/candidato/form";
import { RegisterCandidatoProvider } from "@stores/register/candidato/formStore";
import { ExploreProvider } from "@stores/explore/exploreStore";
import ProfileCandidatoPage from "@pages/profile/candidato";
import { ProfileCandidatoProvider } from "@stores/profile/candidato/indexStore";
import RegisterRecrutador from "@pages/register/recrutador/form";
import { RegisterRecrutadorProvider } from "@stores/register/recrutador/formStore";
import ProfileRecrutadorPage from "@pages/profile/recrutador";
import { ProfileRecrutadorProvider } from "@stores/profile/recrutador/indexStore";
import LoginPage from "@pages/login";
import { AuthProvider, useAuth } from "@contexts/authContext";
import { LoginProvider } from "@stores/login/indexStore";
import PasswordRecoveryPage from "@pages/recover";
import ResetPasswordPage from "@pages/recover/form";

interface RedirectIfLoggedProps {
  children: ReactNode;
}

const RedirectIfLogged = ({ children }: RedirectIfLoggedProps) => {
  const { perfil } = useAuth();

  if (perfil) {
    return <Navigate to="/explore" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} /> 

    <Route
      path="/explore"
      element={
        <ExploreProvider>
          <ExplorePage />
        </ExploreProvider>
      }
    />

    <Route
      path="/login"
      element={
        <RedirectIfLogged>
          <LoginProvider>
            <LoginPage />
          </LoginProvider>
        </RedirectIfLogged>
      }
    />

    <Route path="/register" element={<RegistrationPage />} />

    <Route path="/recover" element={<PasswordRecoveryPage />} />
    <Route path="/recover/reset" element={<ResetPasswordPage />} />

    <Route
      path="/register/candidato"
      element={
        <RegisterCandidatoProvider>
          <RegisterCandidato />
        </RegisterCandidatoProvider>
      }
    />

    <Route
      path="/profile/candidato/:id?"
      element={
        <ProfileCandidatoProvider>
          <ProfileCandidatoPage />
        </ProfileCandidatoProvider>
      }
    />

    <Route
      path="/register/recrutador"
      element={
        <RegisterRecrutadorProvider>
          <RegisterRecrutador />
        </RegisterRecrutadorProvider>
      }
    />

    <Route
      path="/profile/recrutador/:id?"
      element={
        <ProfileRecrutadorProvider>
          <ProfileRecrutadorPage />
        </ProfileRecrutadorProvider>
      }
    />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <NotificationProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </NotificationProvider>
  </BrowserRouter>
);

export default App;