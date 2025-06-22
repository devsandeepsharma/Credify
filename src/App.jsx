import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";
import PublicRoute from "./components/layout/PublicRoute";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import ShareLink from "./pages/ShareLink";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Testimonials from "./pages/Testimonials";
import Template from "./pages/Template";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";

const App = () => {

    const Router = createBrowserRouter([
        {
            path: "/v1/:slug",
            element: <ShareLink />
        },
        {
            path: "/",
            element: (
                <AuthLayout>
                    <Layout />
                </AuthLayout>
            ),
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
                    path: "/profile",
                    element: (
                        <ProtectedRoute>
                            <Profile />
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
            ]
        }
    ])

    return <RouterProvider router={Router} />
}

export default App;