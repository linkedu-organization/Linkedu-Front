import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@pages/homePage";
import RegistrationPage from "@pages/register";
import { NotificationProvider } from "@contexts/notificationContext";
import RegisterCandidato from "@pages/register/candidato/form";
import { RegisterCandidatoProvider } from "@stores/register/candidato/formStore";
import { HomePageProvider } from "@stores/home/homePageStore";
import RegisterRecrutador from "@pages/register/recrutador/form";
import { RegisterRecrutadorProvider } from "@stores/register/recrutador/formStore";

const App = () => (
  <BrowserRouter>
    <NotificationProvider>
      <Routes>
        <Route 
          path="/" 
          element=
            {
              <HomePageProvider>
                  <HomePage />
                </HomePageProvider>
            } />
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
          path="/register/recrutador"
          element={
            <RegisterRecrutadorProvider>
              <RegisterRecrutador />
            </RegisterRecrutadorProvider>
          }
        />
      </Routes>
    </NotificationProvider>
  </BrowserRouter>
);

export default App;