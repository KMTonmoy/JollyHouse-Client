import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import Signup from "../Pages/Signup/Signup";
import Apartments from "../Pages/Apertment/Apertment";
import PrivateRoute from "./PrivateRoute";
import UserHome from "../Pages/Dashboard/UserHome";
import ManageMembers from "../Pages/Dashboard/ManageMembur";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Signup />,
            },
            {
                path: "/apartments",
                element: <Apartments />
            },

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <UserHome />
            },
            {
                path: 'manage-members',
                element: <ManageMembers />
            },
       
        ]
    }
]);
