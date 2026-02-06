// ProtectedRoute.jsx - Add more detailed logging
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const data = useSelector((state) => state.user);
  const authStatus = useSelector((state) => state.user.status);
  const loading = useSelector((state) => state.user.loading);
  const userData = useSelector((state) => state.user.userData);

  // console.log("🔍 Protected Route Debug:", data);
  // console.log("  - authStatus:", authStatus);
  // console.log("  - loading:", loading);
  // console.log("  - userData:", userData);
  // console.log("  - isAuthenticated:", userData?._id ? true : false);

  if (loading) {
    // console.log("⏳ Showing loading/outlet while loading");
    return <Outlet />;
  }

  if (!authStatus && !userData?._id) {
    // console.log("❌ Not authenticated, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  // console.log("✅ Authenticated, showing outlet");
  return <Outlet />;
};

export default ProtectedRoute;
