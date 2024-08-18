import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UncontrolledFormPage from "./pages/UncontrolledForm";
import ControlledFormPage from "./pages/ControlledForm";

const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"uncontrolled-form"} element={<UncontrolledFormPage />} />
      <Route path={"controlled-form"} element={<ControlledFormPage />} />
      <Route path={"*"} element={<div>Page not found 404</div>} />
    </Routes>
  );
};

export default App;
