import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";
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
                    path: "/forgot-password",
                    element: <ForgotPassword />
                },
                {
                    path: "/",
                    element: <Dashboard />
                },
                {
                    path: "/testimonials",
                    element: <Testimonials />
                },
                {
                    path: "/template",
                    element: <Template />
                },
                {
                    path: "/profile",
                    element: <Profile />
                },
                {
                    path: "/pricing",
                    element: <Pricing />
                },
            ]
        }
    ])

    return <RouterProvider router={Router} />
}

export default App;