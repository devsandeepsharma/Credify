import { Outlet } from "react-router-dom";

import { Button } from "../ui/button";

const Layout = () => {
    return (
        <div className="flex flex-col gap-3 justify-center items-center min-h-screen">
            <h1 className="text-3xl text-bold underline">Credify</h1>
            <Outlet />
            <div>
                <Button>Get Started</Button>
                <Button variant="secondary">About us</Button>
            </div>
        </div>
    )
}

export default Layout;