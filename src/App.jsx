import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./components/layout/AuthLayout";

const App = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/landing",
                    element: <Landing />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/signup",
                    element: <Signup />
                },
                {
                    path: "/",
                    element: <Dashboard />
                },
            ]
        }
    ])

    return (
        <AuthLayout>
            <RouterProvider router={router} />
        </AuthLayout>
    )
}

export default App;