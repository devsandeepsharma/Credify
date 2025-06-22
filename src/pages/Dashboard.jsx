import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Dashboard = () => {
  
    const user = useSelector((state) => state.auth.user);
    const data = useSelector((state) => state.testimonials.data || {});

    const testimonials = Object.values(data);
    const total = testimonials.length;
    const shareLink = `https://credify-beige.vercel.app/v1/${user.slug}`;

    return (
        <motion.div
            className="p-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <h1 className="text-4xl font-bold mb-3">Dashboard</h1>
            <p className="text-gray-400 mb-8">Manage your testimonial activity</p>

            {!user.hasPremium && total >= 5 && (
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    }}
                    initial="hidden"
                    animate="visible"
                >
                    <Card className="border-primary border-2 mb-6">
                        <CardHeader>
                            <CardTitle>Free Limit Reached</CardTitle>
                            <CardDescription>
                                Free accounts can collect up to 5 testimonials.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4 text-left text-sm list-disc pl-4">
                                <li>You're currently on the Free plan</li>
                                <li>Testimonials collected: {total}/5</li>
                                <li>Upgrade to collect unlimited testimonials</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link to="/pricing" className="w-full">
                                <Button className="w-full">
                                    Upgrade to Premium
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </motion.div>
            )}
            
            <Card>
                <CardHeader>
                    <CardTitle>Shareable Testimonial Link</CardTitle>
                    <CardDescription>
                        Share this with your customers to collect testimonials.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between bg-muted px-4 py-2 rounded text-sm">
                        <span>{shareLink}</span>
                        <Button
                            variant="link"
                            onClick={() => navigator.clipboard.writeText(shareLink)}
                            className="text-blue-600 text-sm font-semibold"
                        >
                            Copy
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Recent Testimonials</CardTitle>
                    <CardDescription>
                    {testimonials.length > 0
                        ? `Total: ${testimonials.length} testimonial${testimonials.length > 1 ? "s" : ""}`
                        : "No testimonials have been submitted yet."}
                    </CardDescription>
                </CardHeader>

                {testimonials.length > 0 && (
                    <>
                        <CardContent className="-my-3">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {testimonials
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .slice(0, 4)
                                    .map((t) => (
                                        <motion.div
                                            key={t.id}
                                            variants={itemVariants}
                                            className="border-b py-3 last:border-b-0"
                                        >
                                            <p className="text-sm italic mb-1 truncate">
                                            “{t.message}”
                                            </p>
                                            <div className="text-xs text-muted-foreground">
                                            — {t.username} | {new Date(t.createdAt).toLocaleDateString()}
                                            </div>
                                        </motion.div>
                                    ))
                                }
                            </motion.div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Link to="/testimonials">
                                <Button variant="link" size="sm">
                                    View All
                                </Button>
                            </Link>
                        </CardFooter>
                    </>
                )}
            </Card>
        </motion.div>
    );
};


export default Dashboard;