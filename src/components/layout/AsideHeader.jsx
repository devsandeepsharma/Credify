import { Link, NavLink } from "react-router-dom";

import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import Logo from "../ui/Logo";

import { AlignJustify } from "lucide-react";

const AsideHeader = () => {

    const focus = "transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

    const {
        isMobile,
        open,
        openMobile,
        toggleSidebar,
        closeSidebar = () => {},
    } = useSidebar();

    const navItems = [
        { name: "Dashboard", to: "/" },
        { name: "Testimonials", to: "/testimonials" },
        { name: "Template", to: "/template" },
        { name: "Profile", to: "/profile" },
        { name: "Pricing", to: "/pricing" },
    ];

    return (
        <>
        {
            isMobile && (
                <header className="border-b-1 md:hidden">
                    <div className="p-4 w-full max-w-6xl mx-auto flex justify-between items-center">
                        <Link to="/" className={focus}>
                            <Logo />
                        </Link>
                        <Button variant="outline" onClick={toggleSidebar}>
                            <span className="sr-only">Toggle sidebar</span>
                            <AlignJustify size={25} />
                        </Button>
                    </div>
                </header>
            )
        }

        {
            isMobile && openMobile && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={toggleSidebar}
                />
            )
        }

        <aside
            className={`
                fixed top-0 right-0 w-64 z-50  h-full overflow-auto flex flex-col transform transition-transform duration-300 ease-in-out
                ${isMobile ? (openMobile ? "translate-x-0" : "translate-x-full") : (open ? "translate-x-0" : "translate-x-full")}
                md:left-0 md:top-0 md:h-screen
                bg-sidebar text-sidebar-foreground border-r border-sidebar-border`
            }
        >
            <div className="flex items-center pl-4 h-16 border-b">
                <Logo />
            </div>

            <nav className="flex flex-col p-4 space-y-2 flex-grow">
                {
                    navItems.map(({ name, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={isMobile && toggleSidebar}
                            className={({ isActive }) =>
                                `block rounded px-3 py-2
                                ${focus}
                                ${
                                isActive
                                    ? "bg-accent text-accent-foreground font-semibold"
                                    : "hover:bg-accent/50 hover:text-accent-foreground"
                                }`
                            }
                        >
                            {name}
                        </NavLink>
                    ))
                }
            </nav>
        </aside>
        </>
    );
};

export default AsideHeader;