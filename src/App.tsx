import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import LocationPage from "./pages/LocationPage/LocationPage";
import FilterPage from "./pages/FilterPage/FilterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/filter" element={<FilterPage />} />
    </Routes>
  );
}

export default App;
