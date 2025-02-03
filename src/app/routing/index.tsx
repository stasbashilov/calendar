import {createBrowserRouter, Navigate} from "react-router-dom";
import LoginPage from "../loginPage/LoginPage.tsx";
import DashboardPage from "../dashboardPage/DashboardPage.tsx";
import { SignIn } from "../loginPage/components/SignIn";
import { SignUp } from "../loginPage/components/SignUp";
import {useContext} from "react";
import UserContext, { UserContextType } from "../context/UserContext.tsx";
import ProfilePage from "../profilePage/ProfilePage.tsx";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { user } = useContext(UserContext) as UserContextType;

  if (!user) {
    return <Navigate to="/" replace/>;
  }

  return element;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute
        element={<DashboardPage />}
      />
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute
        element={<ProfilePage />}
      />
    ),
  },
]);

export default router;
