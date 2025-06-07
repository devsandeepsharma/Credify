import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./components/layout/AuthLayout";
import PublicRoute from "./components/layout/PublicRoute";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const App = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/landing",
                    element: (
                        <PublicRoute>
                            <Landing />
                        </PublicRoute>
                    )
                },
                {
                    path: "/login",
                    element: (
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    )
                },
                {
                    path: "/signup",
                    element: (
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    )
                },
                {
                    path: "/",
                    element: (
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    )
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