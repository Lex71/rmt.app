import { BrowserRouter, Route, Routes } from "react-router";
import AnonymousLayout from "./layouts/anonymous.layout";
import AuthRoutes from "./routes/auth.routes";
import PasswordRoutes from "./routes/password.routes";
import { Navigate } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import FacilitiesRoutes from "./routes/facilities.routes";
import TablesRoutes from "./routes/tables.routes";
import ReservationsRoutes from "./routes/reservations.routes";
// import Todos from "./pages/Todos";

import MainLayout from "./layouts/main.layout";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import AxiosInterceptor from "./components/AxiosInterceptor";
import ChangePassword from "./pages/auth/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AxiosInterceptor />
        {/* <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <div>
                  Questa è la root, che non sarà visualizzata ma farà redirect a
                  auth/login...
                </div>
              }
            />
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes> */}
        <Routes>
          <Route element={<AnonymousLayout />}>
            <Route path="/password/*" element={<PasswordRoutes />} />
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/facilities/*" element={<FacilitiesRoutes />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
              <Route path="/tables/*" element={<TablesRoutes />} />
              <Route path="/reservations/*" element={<ReservationsRoutes />} />
            </Route>
            <Route
              element={<ProtectedRoute allowedRoles={["admin", "user"]} />}
            >
              <Route path="/home" element={<Home />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
