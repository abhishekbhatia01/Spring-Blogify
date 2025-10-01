import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/userAuthStore";

const RequireGuest = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireGuest;
