/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (token === null) {
    return children;
  } else {
    return <Navigate to={"/dashboard/my-profile"} />;
  }
};

export default PublicRoute;
