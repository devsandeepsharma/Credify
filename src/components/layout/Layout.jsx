import { Outlet } from "react-router-dom";

import { Toaster } from "../ui/sonner";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Toaster />
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;