import { Skeleton } from "../ui/skeleton";

const Loader = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen w-full bg-background text-foreground">
            <header className="md:hidden border-b">
                <div className="p-4 w-full max-w-6xl mx-auto flex justify-between items-center">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                </div>
            </header>
            <aside className="hidden md:flex md:flex-col md:w-64 border-r border-muted bg-muted/40 animate-pulse">
                <div className="h-16 flex items-center px-4 border-b">
                    <Skeleton className="h-6 w-24" />
                </div>
                <div className="p-4 space-y-3">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <Skeleton key={i} className="h-8 w-full rounded-md" />
                    ))}
                </div>
            </aside>

            <main className="flex-1 p-4 space-y-6">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/2" />

                <div className="border rounded-md p-4 space-y-4">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                </div>

                <div className="border rounded-md p-4 space-y-4">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-10 w-full" />
                </div>

                <div className="border rounded-md p-4 space-y-4">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="space-y-3">
                    {[1, 2, 3, 4].map((_, i) => (
                        <div key={i}>
                            <Skeleton className="h-4 w-3/4 mb-1" />
                            <Skeleton className="h-3 w-1/4" />
                        </div>
                    ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Loader;