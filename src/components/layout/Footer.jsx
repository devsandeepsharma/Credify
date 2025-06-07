import { Link } from "react-router-dom";

import Logo from "../ui/Logo";

import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {

    const focus = "transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";
    const link = `${focus} hover:text-foreground transition`;

    return (
        <footer className="border-t mt-auto">
            <div className="py-6 px-4 w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start">
                    <Link to="/landing" className={focus}><Logo /></Link>
                    <p className="text-center md:hidden text-sm max-w-3xs text-muted-foreground mt-2">
                        Helping freelancers & small businesses get feedback fast.
                    </p>
                </div>

                <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground md:mx-auto">
                    <li><Link to="/landing" className={link}>Home</Link></li>
                    <li><Link to="/landing" className={link}>About</Link></li>
                    <li><Link to="/" className={link}>Pricing</Link></li>
                    <li><Link to="/" className={link}>Contact</Link></li>
                </ul>

                <ul className="flex gap-4 text-muted-foreground">
                    <li><Link to="/landing" className={link}><Twitter size={18} /></Link></li>
                    <li><Link to="/landing" className={link}><Github size={18} /></Link></li>
                    <li><Link to="/landing" className={link}><Linkedin size={18} /></Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;