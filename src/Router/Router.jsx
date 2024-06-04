import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import Signup from "../Pages/Signup/Signup";
import Apartments from "../Pages/Apertment/Apertment";
import PrivateRoute from "./PrivateRoute";
import ManageMembers from "../Pages/Dashboard/ManageMembur";
import ContactPage from "../Pages/Contact/Contact";
import About from "../Components/About/About";
import MakeAnnouncement from "../Pages/Dashboard/MakeAnouncement";
import AgreementReq from "../Pages/Dashboard/AgreementReq";
import ManageCoupons from "../Pages/Dashboard/ManageCoupons";
import AdminHome from "../Pages/Dashboard/AdminHome";
import Announcements from "../Pages/Dashboard/Announcements";
import MyProfile from "../Pages/Dashboard/MyProfile";
import Payment from "../Pages/Dashboard/Payment";


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
            {
                path: "/contact",
                element: <PrivateRoute><ContactPage /></PrivateRoute>
            },
            {
                path: "/about",
                element: <About></About>,
            },

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: < AdminHome />
            },
            {
                path: 'manage-members',
                element: <ManageMembers />
            },
            {
                path: 'make-announcement',
                element: <MakeAnnouncement />
            },
            {
                path: 'agreement-requests',
                element: <AgreementReq />
            },
            {
                path: 'manage-coupons',
                element: <ManageCoupons />
            },
            {
                path: 'announcements',
                element: <Announcements></Announcements>
            },
            {
                path: 'my-profile',
                element: <MyProfile />
            },
            {
                path: 'make-payment',
                element: <Payment />
            },

        ]
    }
]);
