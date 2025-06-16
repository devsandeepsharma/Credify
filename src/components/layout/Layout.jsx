import { Outlet } from "react-router-dom";

import { Button } from "../ui/button";
import Logo from "../ui/Logo";

const Layout = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Logo />
            <Outlet />
            <div className="flex gap-2 mt-3">
                <Button>Get Started</Button>
                <Button variant="secondary">View Website</Button>
            </div>
        </div>
    )
}

export default Layout;