import { motion } from "framer-motion";

import TemplateForm from "./TemplateForm";

const CreativePortfolio = ({ localId, companyLogo="", companyName, companyDesc="", testimonials = [], hasPremium }) => {
    return (
        <motion.div
            className="min-h-screen font-sans flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
        >
            <header className="border-b border-border py-6 px-8 max-w-7xl mx-auto flex flex-col justify-between items-center gap-3">
                <div className="flex items-center space-x-5">
                    {
                        companyLogo && (
                            <div className="w-10 h-10 flex items-center justify-center">
                                <img
                                    src={companyLogo}
                                    alt={companyName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )
                    }
                    <h1 className="font-serif text-4xl font-bold tracking-tight">
                        {companyName}
                    </h1>
                </div>
                <span className="italic text-muted-foreground text-lg font-semibold">
                    Stylish feedback for creatives
                </span>
            </header>

            <main className="flex-grow max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row gap-12 relative">
                <section
                    className="flex-1 max-w-xl max-h-[70vh] overflow-y-auto pr-4"
                    style={{ scrollbarGutter: "stable" }}
                >
                    {
                        companyDesc && (
                            <h2 className="text-3xl font-serif font-bold mb-6 text-foreground tracking-wide">
                                {companyDesc}
                            </h2>
                        )
                    }

                    <div className="md:hidden mb-12">
                        <TemplateForm localId={localId} canSubmit={hasPremium || testimonials.length < 5} />
                    </div>

                    <p className="mb-12 italic text-muted-foreground font-semibold">
                        Share your feedback and help us improve.
                    </p>

                    <div className="space-y-8">
                        {testimonials.length === 0 && (
                            <div className="text-sm text-muted-foreground italic">
                                No testimonials yet — be the first to share your thoughts! 🙌
                            </div>
                        )}
                        {testimonials.map(({ id, username, message }, i) => (
                            <blockquote
                                key={id}
                                className={`bg-card text-card-foreground rounded-lg p-6 shadow-md border border-border transform transition-transform duration-300 hover:scale-105 ${
                                i % 2 === 0 ? "rotate-1" : "-rotate-1"
                                }`}
                            >
                                <p className="italic text-lg">“{message}”</p>
                                <footer className="mt-4 text-right font-semibold text-muted-foreground">
                                — {username}
                                </footer>
                            </blockquote>
                        ))}
                    </div>

                    <footer className="border-t border-border mt-12 pt-6 text-center text-sm text-muted-foreground font-sans">
                        &copy; {new Date().getFullYear()} {companyName}. Made with passion ❤️ using Credify.
                    </footer>
                </section>

                <section className="hidden md:block md:w-[400px] md:sticky md:top-20 md:self-start bg-card rounded-3xl shadow-lg p-10 border border-border z-10">
                    <TemplateForm localId={localId} canSubmit={hasPremium || testimonials.length < 5} />
                </section>
            </main>
        </motion.div>
    );
};

export default CreativePortfolio;