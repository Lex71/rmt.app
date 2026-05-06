import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ allowedRoles }: Record<string, string[]>) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    // CHECK: still needed?
    // return <Navigate to="/auth/login" />;
    return;
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role ?? "")
  ) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
