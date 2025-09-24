import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import LocationPage from "./pages/LocationPage/LocationPage";
import FilterPage from "./pages/FilterPage/FilterPage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/filter" element={<FilterPage />} />
      <Route path="/details/:id" element={<DetailsPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;
