import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import HomePage from "../pages/home/HomePage";
import DashboardLayout from "../layouts/DashboardLayout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <BasicLayout></BasicLayout>,
      children: [
        {
            path: '/',
            element: <HomePage></HomePage>
        }
      ]
    },
    {
        path:"/dashboard",
        element: <DashboardLayout></DashboardLayout>
    }
  ]);

export default router;