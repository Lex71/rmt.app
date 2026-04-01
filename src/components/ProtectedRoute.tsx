import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ allowedRoles }: Record<string, string[]>) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" />;
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
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
