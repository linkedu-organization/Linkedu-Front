import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@pages/homePage";
import RegistrationPage from "@pages/register";
import { NotificationProvider } from "@contexts/notificationContext";
import RegisterCandidato from "@pages/register/candidato/form";

const App = () => (
  <BrowserRouter>
    <NotificationProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/register/candidato" element={<RegisterCandidato />} />
      </Routes>
    </NotificationProvider>
  </BrowserRouter>
);

export default App;
