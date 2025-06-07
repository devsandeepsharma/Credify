import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "./components/layout/AuthLayout";
import PublicRoute from "./components/layout/PublicRoute";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Testimonials from "./pages/Testimonials";
import Template from "./pages/Template";
import Pricing from "./pages/Pricing";
import ShareLink from "./pages/ShareLink";

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
                    path: "/forgot-password",
                    element: (
                        <PublicRoute>
                            <ForgotPassword />
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
                {
                    path: "/testimonials",
                    element: (
                        <ProtectedRoute>
                            <Testimonials />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/template",
                    element: (
                        <ProtectedRoute>
                            <Template />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/pricing",
                    element: (
                        <ProtectedRoute>
                            <Pricing />
                        </ProtectedRoute>
                    )
                },
                {
                    path: "/v1/:slug",
                    element: <ShareLink />
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