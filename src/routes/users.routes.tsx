import { Routes, Route } from "react-router";
import ChangePassord from "../pages/users/ChangePassword";

const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/change-password" element={<ChangePassord />} />
    </Routes>
  );
};

export default UsersRoutes;
