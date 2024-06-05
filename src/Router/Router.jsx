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
import PaymentInformation from "../Pages/Dashboard/PaymentInformation";
import Pay from "../Pages/Dashboard/Pay";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import AdminRoute from "./AdminRoute";
import MemberRoute from "./MemberRoute";


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
                element: <AdminRoute><ManageMembers /></AdminRoute>
            },
            {
                path: 'make-announcement',
                element: <AdminRoute><MakeAnnouncement /></AdminRoute>
            },
            {
                path: 'agreement-requests',
                element: <AdminRoute><AgreementReq /></AdminRoute>
            },
            {
                path: 'manage-coupons',
                element: <AdminRoute><ManageCoupons /></AdminRoute>
            },
            {
                path: 'announcements',
                element: <Announcements></Announcements>
            },
            {
                path: 'my-profile',
                element: <PrivateRoute><MyProfile /></PrivateRoute>
            },
            {
                path: 'make-payment',
                element: <MemberRoute> <PaymentInformation /></MemberRoute>
            },

            {
                path: 'process-payment',
                element: <MemberRoute><Pay /></MemberRoute>
            },
            {
                path: 'payment-history',
                element: <MemberRoute><PaymentHistory /></MemberRoute>
            },


        ]
    }
]);
