import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

import dashboard from "../assets/dashboard.png";
import dashboardMobile from "../assets/dashboard-mobile.png";

const Landing = () => {
    return (
        <>
            <section className="py-20 px-4 text-center max-w-4xl mx-auto space-y-6">
                <h1 className="text-4xl font-bold">Collect Testimonials Effortlessly</h1>
                <p className="text-lg text-muted-foreground">
                    Turn happy customers into powerful testimonials with just one link. Effortless collection,
                    beautiful layouts, and zero hassle — built for freelancers, creators, and small teams.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Link to="/signup">
                        <Button>Get Started</Button>
                    </Link>
                    <Link to="#features">
                        <Button variant="link">Features</Button>
                    </Link>
                </div>
                <picture>
                    <source srcSet={dashboardMobile} media="(max-width: 768px)" />
                    <img
                        src={dashboard}
                        alt="Credify Dashboard Preview"
                        className="w-full h-auto max-h-[450px] rounded-xl shadow-lg border mt-8"
                    />
                </picture>
            </section>
        </>
    )
}

export default Landing;