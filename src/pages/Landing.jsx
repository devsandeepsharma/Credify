import { Link } from "react-router-dom";

import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import FadeInWhenVisible from "../components/animation/FadeInWhenVisible";

import { Check, X } from "lucide-react";

import dashboard from "../assets/dashboard.png";
import dashboardMobile from "../assets/dashboard-mobile.png";

const Landing = () => {

    const features = [
        {
            title: "One Link Simplicity",
            desc: "Share a single link with your clients to collect testimonials. No login required for them.",
        },
        {
            title: "Custom Branding",
            desc: "Upload your logo and description to make your testimonial page feel like your brand.",
        },
        {
            title: "Beautiful Layouts",
            desc: "Choose from multiple testimonial layouts — including free and premium templates. Switch anytime to match your brand style.",
        },
        {
            title: "Mobile Friendly",
            desc: "Fully responsive. Your dashboard and testimonials look great on all devices.",
        },
        {
            title: "No Login for Clients",
            desc: "Clients can submit testimonials instantly without creating an account.",
        },
        {
            title: "Upgrade Anytime",
            desc: "Need more than 5 testimonials? Upgrade to premium anytime — no pressure.",
        },
    ]

    const plans = [
        {
            name: "Free",
            price: "₹0/month",
            description: "Perfect to get started",
            features: [
                { label: "Access to free templates", included: true },
                { label: "5 testimonials", included: true },
                { label: "Customize profile", included: true },
                { label: "Unique shareable URL", included: false },
                { label: "Dashboard access", included: false },
            ],
            cta: "Get Started Free",
            highlighted: false,
        },
        {
            name: "Premium",
            price: "₹199/month",
            description: "Everything unlimited",
            features: [
                { label: "Access to all templates", included: true },
                { label: "Unlimited testimonials", included: true },
                { label: "Customize profile", included: true },
                { label: "Unique shareable URL", included: true },
                { label: "Dashboard access", included: true },
            ],
            cta: "Upgrade to Premium",
            highlighted: true,
        },
    ];

    return (
        <>
            <FadeInWhenVisible>
                <section className="py-20 px-4 text-center max-w-4xl mx-auto space-y-6">
                    <h1 className="text-4xl font-bold">Collect Testimonials Effortlessly</h1>
                    <p className="text-lg text-muted-foreground">
                        Turn happy customers into powerful testimonials with just one link. Effortless collection,
                        beautiful layouts, and zero hassle — built for freelancers, creators, and small teams.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link to="/signup" asChild>
                            <Button>Get Started</Button>
                        </Link>
                        <a href="#features" asChild>
                            <Button variant="link">Features</Button>
                        </a>
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
            </FadeInWhenVisible>
            <FadeInWhenVisible>
                <section
                    id="features"
                    className="py-16 px-4 max-w-5xl mx-auto min-h-screen flex flex-col justify-center items-center text-center gap-12"
                >
                    <h2 className="text-3xl font-bold">Why Choose Us</h2>

                    <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 w-full text-left">
                        {features.map((feature, index) => (
                            <FadeInWhenVisible key={feature.title} delay={index * 0.1}>
                                <li>
                                    <Card className="h-full shadow-sm">
                                        <CardHeader>
                                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-muted-foreground text-sm -mt-5">
                                            {feature.desc}
                                        </CardContent>
                                    </Card>
                                </li>
                            </FadeInWhenVisible>
                        ))}
                    </ul>
                </section>
            </FadeInWhenVisible>
            <FadeInWhenVisible>
                <section id="pricing" className="py-16 px-4 w-full max-w-5xl mx-auto min-h-screen flex flex-col justify-center items-center text-center gap-12">
                    <div>
                        <h2 className="text-3xl font-bold">Pricing</h2>
                        <p className="text-muted-foreground mt-2">
                            Simple plans, straight pricing. No hidden fees.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 w-full">
                        {plans.map((plan, index) => (
                            <FadeInWhenVisible key={plan.name} delay={index * 0.2} className="w-full md:w-1/2">
                                <Card className={`w-full h-full text-left ${plan.highlighted ? "border-primary border-2" : ""}`}>
                                    <CardHeader>
                                        <CardTitle className="text-xl">
                                            {plan.name}{" "}
                                            <span className="text-sm font-normal text-muted-foreground">
                                                {plan.price}
                                            </span>
                                        </CardTitle>
                                        <CardDescription>{plan.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <ul className="text-sm space-y-3 text-left">
                                            {plan.features.map((feat, i) => (
                                                <li
                                                    key={i}
                                                    className={`flex items-center ${
                                                    !feat.included ? "text-muted-foreground line-through" : ""
                                                    }`}
                                                >
                                                    {feat.included ? (
                                                        <Check className="w-4 h-4 text-primary mr-2" />
                                                    ) : (
                                                        <X className="w-4 h-4 mr-2" />
                                                    )}
                                                    {feat.label}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link to="/signup" asChild>
                                            <Button className="w-full mt-6">{plan.cta}</Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </FadeInWhenVisible>
                        ))}
                    </div>
                </section>
            </FadeInWhenVisible>
            <FadeInWhenVisible>
                <section className="py-16 px-4 w-full max-w-5xl mx-auto">
                    <Card className="text-center shadow-md">
                        <CardHeader>
                            <CardTitle className="text-2xl">Ready to Collect Testimonials Effortlessly?</CardTitle>
                            <CardDescription className="mt-2 text-muted-foreground">
                                Start free and upgrade anytime. No credit card required.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link to="/signup" asChild>
                                <Button size="lg" >
                                    Get Started Now
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </section>
            </FadeInWhenVisible>
        </>
    )
}

export default Landing;