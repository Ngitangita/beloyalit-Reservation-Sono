import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "~/stores/useAuthStore";

export default function ProtectedClient() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (user?.role === "admin") {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
