import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import HomePage from "../pages/home/HomePage";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ManageProfile from "../pages/dashboard/manageProfile/ManageProfile";

const router = createBrowserRouter([
    {
      path: "/",
      element: <BasicLayout></BasicLayout>,
      children: [
        {
            path: '/',
            element: <HomePage></HomePage>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'register',
            element:<Register></Register>
        }
      ]
    },
    {
        path:"dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path:'manageProfile',
                element:<ManageProfile></ManageProfile>
            }
        ]
    }
  ]);

export default router;