import { motion } from "framer-motion";

import TemplateForm from "./TemplateForm";

const ClassicLayout = ({ localId, companyLogo="", companyName, companyDesc="", testimonials = [], hasPremium }) => {
    return (
        <motion.div
            className="min-h-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
        >
            <header className="border-b mb-2">
                <div className="p-4 w-full max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        {
                            companyLogo && (
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <img
                                        src={companyLogo}
                                        alt={companyName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )
                        }
                        <h1 className="text-xl font-bold text-white tracking-wide">
                            {companyName}
                        </h1>
                    </div>

                    <span className="text-sm italic">
                        Trusted by 500+ freelancers ✨
                    </span>
                </div>
            </header>
            <main className="flex-grow max-w-3xl mx-auto px-4 py-10 space-y-10">
                <section className="text-center space-y-2">
                    {
                        companyDesc && (
                            <p className="text-lg">{companyDesc}</p>
                        )
                    }
                    <p className="text-gray-400 italic">
                        Share your experience with us. We appreciate your words!
                    </p>
                </section>
                <TemplateForm responsive={true} localId={localId} canSubmit={hasPremium || testimonials.length < 5} />
                <section className="space-y-6">
                    <h2 className="text-xl font-semibold mb-5">What people say</h2>
                    {testimonials.length === 0 && (
                        <div className="text-sm text-muted-foreground italic">
                            No testimonials yet — be the first to share your thoughts! 🙌
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {testimonials.map(({ id, username, message }) => (
                            <blockquote
                                key={id}
                                className="bg-card text-card-foreground p-4 rounded-xl border py-6 shadow-sm"
                            >
                                <p className="text-gray-200">“{message}”</p>
                                <footer className="mt-2 text-sm text-gray-400">- {username}</footer>
                            </blockquote>
                        ))}
                    </div>
                </section>
            </main>
            <footer className="border-t mt-auto">
                <div className="py-6 px-4 w-full max-w-6xl mx-auto">
                    <p className="text-center text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} {companyName}. Built with ❤️ using Credify.
                    </p>
                </div>
            </footer>
        </motion.div>
    );
};

export default ClassicLayout;