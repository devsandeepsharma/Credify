import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

import { authActions } from "../store/authSlice";
import { UserService } from "../services/Database";

import { Check, X } from "lucide-react";

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

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const Pricing = () => {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { hasPremium } = user;

    const [isLoading, setIsLoading] = useState(false);

    const togglePlan = async () => {
        setIsLoading(true);
        try {
            await UserService.patch(user.localId, { hasPremium: !hasPremium });
            dispatch(authActions.update({
                ...user,
                hasPremium: !hasPremium,
            }));
            toast.success(`Switched to ${!hasPremium ? "Premium" : "Free"} Plan`);
        } catch (error) {
            toast.error("Something went wrong while updating your plan.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="p-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <header>
                <h1 className="text-4xl font-bold mb-3">Choose Your Plan</h1>
                <p className="text-gray-400 mb-8">
                    Start for free, upgrade when you're ready.
                </p>
            </header>

            <div className="flex flex-col md:flex-row gap-6">
                <motion.div variants={cardVariants} className="flex-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Free{" "}
                                <span className="text-sm font-normal text-muted-foreground">
                                    ₹0/month
                                </span>
                            </CardTitle>
                            <CardDescription>Perfect to get started</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4 text-left text-sm">
                                <li className="flex items-center">
                                    <Check className="w-4 h-4 text-primary mr-2" />
                                    Access to free templates
                                </li>
                                <li className="flex items-center">
                                    <Check className="w-4 h-4 text-primary mr-2" />
                                    5 testimonials
                                </li>
                                <li className="flex items-center">
                                    <Check className="w-4 h-4 text-primary mr-2" />
                                    Customize profile
                                </li>
                                <li className="flex items-center text-muted-foreground">
                                    <X className="w-4 h-4 mr-2" />
                                    Unique shareable URL
                                </li>
                                <li className="flex items-center text-muted-foreground">
                                    <X className="w-4 h-4 mr-2" />
                                    Dashboard access
                                </li>
                            </ul>
                            <Button
                                className="mt-6 w-full"
                                variant="outline"
                                disabled={!hasPremium || isLoading}
                                onClick={togglePlan}
                            >
                                {isLoading
                                    ? "Processing..."
                                    : hasPremium
                                    ? "Downgrade to Free"
                                    : "Current Plan"}
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
                
                <motion.div variants={cardVariants} className="flex-1">
                    <Card className="border-primary border-2">
                        <CardHeader>
                            <CardTitle>
                                Premium{" "}
                                <span className="text-sm font-normal text-muted-foreground">
                                    ₹199/month
                                </span>
                            </CardTitle>
                            <CardDescription>Everything unlimited</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4 text-left text-sm">
                                <li className="flex items-center">
                                    <Check className="w-4 h-4 text-primary mr-2" />
                                    Access to all templates
                                </li>
                                <li className="flex items-center">
                                    <Check className="w-4 h-4 text-primary mr-2" />
                                    Unlimited testimonials
                                </li>
                                <li className="flex items-center">
                                    <Check className="w-4 h-4 text-primary mr-2" />
                                    Customize profile
                                </li>
                                <li className="flex items-center">
                                    <Check className="w-4 h-4 text-primary mr-2" />
                                    Unique shareable URL
                                </li>
                                <li className="flex items-center">
                                    <Check className="w-4 h-4 text-primary mr-2" />
                                    Dashboard access
                                </li>
                            </ul>
                            <Button
                                className="mt-6 w-full"
                                disabled={hasPremium || isLoading}
                                onClick={togglePlan}
                            >
                                {isLoading
                                    ? "Processing..."
                                    : hasPremium
                                    ? "Current Plan"
                                    : "Upgrade to Premium"}
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Pricing;