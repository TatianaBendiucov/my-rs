import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<SearchPage />}>
        <Route path={"details"} element={<DetailPage />} />
      </Route>
      <Route path={"*"} element={<div>Page not found 404</div>} />
    </Routes>
  );
};

export default App;
