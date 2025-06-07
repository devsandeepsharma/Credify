import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { SidebarProvider } from "../ui/sidebar";
import { Toaster } from "../ui/sonner";
import Header from "./Header";
import Footer from "./Footer";
import AsideHeader from "./AsideHeader";

const Layout = () => {

    const authenticate = useSelector(state => state.auth.authenticate)

    return (
        <>
            {
                authenticate ? (
                    <SidebarProvider>
                        <div className="flex flex-col md:flex-row min-h-screen w-full">
                            <Toaster />
                            <AsideHeader />
                            <main className="flex-1 p-4">
                                <Outlet />
                            </main>
                        </div>
                    </SidebarProvider>
                ) : (
                    <div className="flex flex-col min-h-screen w-full">
                        <Toaster />
                        <Header />
                        <Outlet />
                        <Footer />
                    </div>
                )
            }
        </>
    )
}

export default Layout;