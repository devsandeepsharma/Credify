import TemplateForm from "./TemplateForm";

const ModernGrid = ({ localId, companyLogo="", companyName, companyDesc="", testimonials = [] }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b border-border">
                <div className="p-4 max-w-7xl mx-auto flex justify-between items-center">
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
                        <h1 className="text-xl font-bold tracking-wide">{companyName}</h1>
                    </div>
                    <span className="text-sm italic text-muted-foreground">
                        Trusted by 500+ freelancers ✨
                    </span>
                </div>
            </header>

            <main className="flex-grow max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:gap-12">
                <section
                    className="md:flex-1 md:max-h-[80vh] md:overflow-y-auto space-y-8"
                    style={{ scrollbarGutter: "stable" }}
                >
                    {
                        companyDesc && (
                            <article className="prose max-w-none text-foreground">{companyDesc}</article>
                        )
                    }
                    <div className="md:hidden mt-8">
                        <h2 className="text-lg font-semibold mb-6">Send us your feedback</h2>
                        <TemplateForm localId={localId} />
                    </div>

                    <section>
                        <h2 className="text-xl font-semibold mb-5">What people say</h2>
                        <div className="space-y-6">
                            {testimonials.length === 0 && (
                                <div className="text-sm text-muted-foreground italic">
                                    No testimonials yet — be the first to share your thoughts! 🙌
                                </div>
                            )}
                            {testimonials.map(({ id, name, feedback }) => (
                                <blockquote
                                    key={id}
                                    className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm"
                                >
                                    <p className="text-muted-foreground">“{feedback}”</p>
                                    <footer className="mt-3 text-sm text-muted-foreground">- {name}</footer>
                                </blockquote>
                            ))}
                        </div>
                    </section>
                    <footer className="border-t border-border py-6 px-4 text-center text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} {companyName}. Built with ❤️ using Credify.
                    </footer>
                </section>

                <section className="hidden md:block md:w-[500px] md:sticky md:top-20 md:self-start bg-card rounded-xl p-8 shadow-lg">
                    <h2 className="text-lg font-semibold mb-6">Send us your feedback</h2>
                    <TemplateForm localId={localId} />
                </section>
            </main>
        </div>
    );
};

export default ModernGrid;