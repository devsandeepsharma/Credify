import { Link, NavLink } from "react-router-dom";

import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import Logo from "../ui/Logo";

import { AlignJustify, Edit, LogOut } from "lucide-react";

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
                fixed top-0 right-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out
                ${isMobile ? (openMobile ? "translate-x-0" : "translate-x-full") : (open ? "translate-x-0" : "translate-x-full")}
                md:static md:translate-x-0 md:flex md:flex-col
                bg-sidebar text-sidebar-foreground border-r border-sidebar-border`
            }
        >
            <div className="flex items-center pl-8 h-16 border-b">
                <Logo />
            </div>

            <nav className="flex flex-col p-4 space-y-2 flex-grow">
                {
                    navItems.map(({ name, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={toggleSidebar}
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

            <div className="border-t p-4 mt-auto flex items-center justify-between">
                <div className="flex flex-col truncate">
                    <p className="text-sm font-semibold text-white truncate">Username</p>
                    <p className="text-xs text-gray-400 truncate">user@example.com</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        className={`p-1 rounded hover:bg-accent ${focus}`}
                        aria-label="Edit Profile"
                    >
                        <Edit />
                    </button>
                    <button
                        className={`p-1 rounded hover:bg-accent ${focus}`}
                        aria-label="Logout"
                    >
                        <LogOut />
                    </button>
                </div>
            </div>
        </aside>
        </>
    );
};

export default AsideHeader;