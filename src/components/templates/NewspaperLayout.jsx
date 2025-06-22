import { motion } from "framer-motion";

import TemplateForm from "./TemplateForm";

const NewspaperLayout = ({ localId, companyLogo="", companyName, companyDesc="", testimonials = [], hasPremium }) => {
    return (
        <motion.div
            className="min-h-screen font-serif max-w-6xl mx-auto p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
        >
            <header className="mb-10">
                <div className="flex items-center justify-start gap-3">
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
                    <h1 className="text-4xl font-extrabold uppercase tracking-widest">{companyName}</h1>
                </div>
                {
                    companyDesc && (
                        <p className="italic text-muted-foreground">{companyDesc}</p>
                    )
                }
            </header>

            <h2 className="text-3xl font-bold uppercase tracking-wide border-b-2 border-muted-foreground pb-2 mb-8">
                We Value Your Feedback
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <section>
                    <TemplateForm localId={localId} canSubmit={hasPremium || testimonials.length < 5} />
                </section>
                <section className="md:max-h-[400px] md:overflow-y-auto">
                    <h3 className="text-2xl font-semibold mb-6 border-b border-muted-foreground pb-1">
                        What People Are Saying
                    </h3>
                    <div className="space-y-6">
                        {testimonials.length === 0 && (
                            <div className="text-sm text-muted-foreground italic">
                                No testimonials yet — be the first to share your thoughts! 🙌
                            </div>
                        )}
                        {
                            testimonials.map(({ id, username, message }) => (
                                <blockquote
                                    key={id}
                                    className="border-l-4 border-primary pl-4 italic text-muted-foreground"
                                >
                                    <p className="text-foreground">“{message}”</p>
                                    <footer className="mt-1 font-semibold text-primary">— {username}</footer>
                                </blockquote>
                            ))
                        }
                    </div>
                    <footer className="border-t border-border py-6 px-4 mt-8 text-center text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} {companyName}. Built with ❤️ using Credify.
                    </footer>
                </section>
            </div>
        </motion.div>
    );
};

export default NewspaperLayout;