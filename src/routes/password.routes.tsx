import { Routes, Route } from "react-router";
import PasswordRecover from "../pages/password/PasswordRecover";
import PasswordReset from "../pages/password/PasswordReset";

const PasswordRoutes = () => {
  return (
    <Routes>
      <Route path="/recover" element={<PasswordRecover />} />
      <Route path="/reset/:userId/:token" element={<PasswordReset />} />
    </Routes>
  );
};

export default PasswordRoutes;
