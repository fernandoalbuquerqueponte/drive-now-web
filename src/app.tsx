import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/authentication";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Authentication />} index />
      </Routes>
    </BrowserRouter>
  );
}
