import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@pages/homePage";
import RegistrationPage from "@pages/register";
import { NotificationProvider } from "@contexts/notificationContext";
import RegisterCandidato from "@pages/register/candidato/form";
import { RegisterCandidatoProvider } from "@stores/register/candidato/formStore";
import ProfileCandidatoPage from "@pages/profile/candidato";
import { ProfileCandidatoProvider } from "@stores/profile/candidato/indexStore";

const App = () => (
  <BrowserRouter>
    <NotificationProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
      </Routes>
    </NotificationProvider>
  </BrowserRouter>
);

export default App;
