import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import ApartmentDetails from "../Components/ApertmentDetails/ApertmentDetails";


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
                path: "/apartments/:id",
                element: <ApartmentDetails />,
                // loader:({ params })=> fetch(`apertment.json/${params.id}`)
            },
        ]
    },
]);
