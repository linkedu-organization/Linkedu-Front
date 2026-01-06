import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@pages/homePage";
import RegistrationPage from "@pages/register";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
