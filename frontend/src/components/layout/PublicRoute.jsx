import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { loading, status } = useSelector((state) => state.user);

  // If the profile isn't loading and the user is authenticated, redirect them
  if (!loading && status) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
