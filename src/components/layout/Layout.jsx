import { Outlet } from "react-router-dom";

import { Button } from "../ui/button";
import Header from "./Header";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <div>
                <Button>Get Started</Button>
                <Button variant="secondary">About us</Button>
            </div>
        </>
    )
}

export default Layout;