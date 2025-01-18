import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import HomePage from "../pages/home/HomePage";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ManageProfile from "../pages/dashboard/manageProfile/ManageProfile";
import MyBookings from "../pages/dashboard/myBookings/MyBookings";
import AddStories from "../pages/dashboard/AddStories/AddStories";
import ManageStories from "../pages/dashboard/manageStories/ManageStories";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/dashboard/manageUsers/ManageUsers";
import AllTrips from "../pages/AllTrips/AllTrips";
import PackageDetails from "../pages/packageDetails/PackageDetails";
import ApplyAsGuide from "../pages/dashboard/applyForTourGuide/ApplyAsGuide";
import ManageCandidates from "../pages/dashboard/AdminDashboard/ManageCandidates/ManageCandidates";

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
        },
        {
            path: 'allTrips',
            element: <AllTrips></AllTrips>
        },
        {
            path: 'packageDetails/:id',
            element: <PackageDetails></PackageDetails>
        }
      ]
    },
    {
        path:"dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path:'manageProfile',
                element:<ManageProfile></ManageProfile>
            },
            {
                path:'my-bookings',
                element:<MyBookings></MyBookings>
            },
            {
                path:'add-stories',
                element:<AddStories></AddStories>
            },
            {
                path: 'manage-stories',
                element: <ManageStories></ManageStories>
            },
            {
                path: 'tourGuideApplication',
                element: <ApplyAsGuide></ApplyAsGuide>
            },
            // admin route
            {
                path: 'manage-users',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'manage-candidates',
                element: <ManageCandidates></ManageCandidates>
            }
        ]
    }
  ]);

export default router;