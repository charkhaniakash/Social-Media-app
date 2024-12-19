import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

function AuthRoute({ element: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/" /> : Component;
}

export default AuthRoute;
