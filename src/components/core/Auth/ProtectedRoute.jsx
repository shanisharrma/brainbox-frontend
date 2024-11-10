/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { navigate } from "../../../hooks/setNavigate";
import toast from "react-hot-toast";
import { hasRequiredRoles } from "../../../utils/authUtils";
import { useEffect } from "react";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { token, roles } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    if (requiredRoles && !hasRequiredRoles(requiredRoles, roles)) {
      navigate("/login");
      toast.error("Not Authorized");
    }
  }, [roles, token, requiredRoles]);

  if (!token || (requiredRoles && !hasRequiredRoles(requiredRoles, roles)))
    return null;

  return children;
};

export default ProtectedRoute;