import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@pages/homePage";
import RegistrationPage from "@pages/register";
import { NotificationProvider } from "@contexts/notificationContext";
import RegisterCandidato from "@pages/register/candidato/form";
import { RegisterCandidatoProvider } from "@stores/register/candidato/formStore";
import { HomePageProvider } from "@stores/homePage/indexStore";
import ProfileCandidatoPage from "@pages/profile/candidato";
import { ProfileCandidatoProvider } from "@stores/profile/candidato/indexStore";
import RegisterRecrutador from "@pages/register/recrutador/form";
import { RegisterRecrutadorProvider } from "@stores/register/recrutador/formStore";
import ProfileRecrutadorPage from "@pages/profile/recrutador";
import { ProfileRecrutadorProvider } from "@stores/profile/recrutador/indexStore";
import LoginPage from "@pages/login";
import { AuthProvider } from "@contexts/authContext";
import { LoginProvider } from "@stores/login/indexStore";

const App = () => (
  <BrowserRouter>
    <NotificationProvider>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <HomePageProvider>
                <HomePage />
              </HomePageProvider>
            }
          />
          <Route
            path="/login"
            element={
              <LoginProvider>
                <LoginPage />
              </LoginProvider>
            }
          />
          <Route path="/register" element={<RegistrationPage />} />
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
        </Routes>
      </AuthProvider>
    </NotificationProvider>
  </BrowserRouter>
);

export default App;
