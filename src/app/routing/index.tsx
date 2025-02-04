import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../loginPage/LoginPage.tsx";
import DashboardPage from "../dashboardPage/DashboardPage.tsx";
import { SignIn } from "../loginPage/components/SignIn";
import { SignUp } from "../loginPage/components/SignUp";
import ProfilePage from "../profilePage/ProfilePage.tsx";
import PrivateRoute from "./PrivatRoute.tsx";

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
    element: <PrivateRoute element={<DashboardPage />} />,
  },
  {
    path: "/profile",
    element: <PrivateRoute element={<ProfilePage />} />,
  },
]);

export default router;
