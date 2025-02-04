import { ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext, { UserContextType } from "../context/UserContext.tsx";

const PrivateRoute = ({ element }: { element: ReactElement }) => {
  const { user } = useContext(UserContext) as UserContextType;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
