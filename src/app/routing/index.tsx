import { createBrowserRouter } from 'react-router-dom';
import LoginPage from "../loginPage/LoginPage.tsx";
import DashboardPage from "../dashboardPage/DashboardPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

export default router;