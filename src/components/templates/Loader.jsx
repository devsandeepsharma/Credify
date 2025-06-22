import { Skeleton } from "../ui/skeleton";

const Loader = () => {
    return (
        <div className="min-h-screen">
            <header className="border-b mb-2">
                <div className="p-4 w-full max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-4 w-48" />
                </div>
            </header>
            <main className="flex-grow max-w-3xl mx-auto px-4 py-10 space-y-10">
                <section className="space-y-2 text-center">
                    <Skeleton className="h-6 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                </section>
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Skeleton className="h-10 w-full md:flex-1" />
                        <Skeleton className="h-10 w-full md:flex-1" />
                    </div>
                    <Skeleton className="h-28 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <section className="space-y-6">
                    <Skeleton className="h-5 w-40" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[...Array(2)].map((_, i) => (
                            <Skeleton key={i} className="h-28 w-full rounded-xl" />
                        ))}
                    </div>
                </section>
            </main>
            <footer className="border-t mt-auto">
                <div className="py-6 px-4 w-full max-w-6xl mx-auto">
                    <Skeleton className="h-4 w-64 mx-auto" />
                </div>
            </footer>
        </div>
    );
};

export default Loader;