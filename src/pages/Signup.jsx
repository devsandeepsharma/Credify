import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import Logo from "../components/ui/Logo";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthService } from "../services/Authentication";

const Signup = () => {

    const focus = "transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);

    const formSchema = z.object({
        companyName: z.string().min(2, { 
            message: "Company Name must be at least 2 characters." 
        }),
        email: z.string().email({
            message: "Please enter a valid email address.",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            email: "",
            password: ""
        },
        mode: "onChange"
    });

    const onSubmit = async (values) => {
        try {
            await AuthService.create(values);
            toast("Account created successfully!", {
                description: "You can now log in.",
            });
            navigate("/login");
        } catch (error) {
            let msg = error.response?.data?.error.message;
            if(msg === "EMAIL_EXISTS") {
                msg = "This email is already registered.";
            } else {
                msg = "Something went wrong. Please try again.";
            }
            toast("Signup failed", {
                description: msg,
            });
        }
    };

    return (
        <main className="w-full p-4">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-sm m-auto"
                >
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle><Logo /></CardTitle>
                            <CardDescription>
                                Fill in your details to create a new account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="companyName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Company Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="user@gmail.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="••••••••"
                                                            {...field}
                                                        />
                                                        <Button
                                                            variant="ghost"
                                                            type="button"
                                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                                            onClick={() => setShowPassword((prev) => !prev)}
                                                            className="absolute !p-0 right-3 top-1/2 transform -translate-y-1/2"
                                                        >
                                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        className="w-full mt-1"
                                        type="submit"
                                        disabled={!form.formState.isValid || form.formState.isSubmitting}
                                    >
                                        {form.formState.isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <Loader2 className="animate-spin w-4 h-4" /> Signing up...
                                            </span>
                                            ) : (
                                                "Signup"
                                            )
                                        }
                                    </Button>
                                    <div className="text-sm text-center -mt-1">
                                        <Link to="/login" className={`text-muted-foreground hover:underline ${focus}`}>
                                            Already have an account? Log in
                                        </Link>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </motion.div>  
            </AnimatePresence>              
        </main>
    );
};

export default Signup;