import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Logo from "../components/ui/Logo";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthService } from "../service/Authentication";

const Login = () => {

    const focus = "transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";
    
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState();

    const formSchema = z.object({
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
            email: "",
            password: ""
        },
        mode: "onChange"
    });

    const onSubmit = async (values) => {
        setError("");
        try {
            await AuthService.loginUser(values);
        } catch (error) {
            setError("Invalid login credentials.");
        }
    };

    return (
        <main className="w-full p-4">
            <Card className="w-full max-w-sm m-auto">
                <CardHeader>
                    <CardTitle><Logo /></CardTitle>
                    <CardDescription>
                        Welcome back 👋 Please login to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="user@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage>{error}</FormMessage>
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
                                        <FormMessage>{error}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <div className="text-sm text-right -mt-2">
                                <Link to="/forgot-password" className={`text-muted-foreground hover:underline ${focus}`}>
                                    Forgot password?
                                </Link>
                            </div>
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={!form.formState.isValid || form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="animate-spin w-4 h-4" /> Logging in...
                                    </span>
                                    ) : (
                                        "Login"
                                    )
                                }
                            </Button>
                            <div className="text-sm text-center -mt-1">
                                <Link to="/signup" className={`text-muted-foreground hover:underline ${focus}`}>
                                    Don’t have an account? Signup
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    );
};

export default Login;