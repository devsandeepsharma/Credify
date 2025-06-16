import { Outlet } from "react-router-dom";

import { Button } from "../ui/button";

const Layout = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-3xl font-bold">Credify</h1>
            <Outlet />
            <div className="flex gap-2 mt-3">
                <Button>Get Started</Button>
                <Button variant="secondary">View Website</Button>
            </div>
        </div>
    )
}

export default Layout;