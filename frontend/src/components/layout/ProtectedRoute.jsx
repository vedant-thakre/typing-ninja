import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const authStatus = useSelector((state) => state.user.status);
  const loading = useSelector((state) => state.user.loading);

  if (loading) {
    return <Outlet />;
  }

  return authStatus ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
