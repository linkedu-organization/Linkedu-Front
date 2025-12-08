import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@pages/homePage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
