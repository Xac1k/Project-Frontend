import { AuthLayout } from "./views/Login/AuthLayout";
import { PresentationMaker } from "./views/PresentationMaker/PresentationMaker";
import { Gallary } from "./views/Gallary/Gallary";
import { Outlet, Route, Routes } from "react-router-dom";
import { LoginPage } from "./views/Login/LoginPage";
import { LogupPage } from "./views/Login/LogupPage";
import { Viewer } from "./views/Viewer/Viewer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="/Logup" element={<LogupPage />} />
      </Route>
      <Route path="/Presentation-Gallary" element={<Gallary />} />
      <Route path="/Presentation-Maker" element={<Outlet />}>
        <Route index element={<PresentationMaker />} />
        <Route path="Viewer" element={<Viewer />} />
      </Route>
    </Routes>
  );
}

export { App };
