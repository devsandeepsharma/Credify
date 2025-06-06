import { Link } from "react-router-dom";

import { Button } from "../ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet"
import Logo from "../ui/Logo";

import { AlignJustify } from "lucide-react";

const Header = () => {
    return (
        <header className="p-4 w-full max-w-6xl mx-auto flex justify-between items-center border-b-1 mb-3">
            <Link to="/landing" className="transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"><Logo /></Link>
            <nav className="sm:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="" variant="outline">
                            <span className="sr-only">menu</span>
                            <AlignJustify size={25} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="top">
                        <ul className="p-4 pt-12 flex flex-col gap-3">
                            <SheetClose asChild>
                                <Button asChild variant="outline" className="w-full">
                                    <Link to="/login">Login</Link>
                                </Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button asChild className="w-full">
                                    <Link to="/signup">Get Started</Link>
                                </Button>
                            </SheetClose>
                        </ul>
                    </SheetContent>
                </Sheet>
            </nav>
            <nav className="hidden sm:flex">
                <ul className="flex gap-3">
                    <Button asChild variant="outline">
                        <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link to="/signup">Get Started</Link>
                    </Button>
                </ul>
            </nav>
        </header>
    )
}

export default Header;