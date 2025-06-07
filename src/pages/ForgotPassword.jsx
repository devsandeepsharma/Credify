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
import { toast } from "sonner";
import Logo from "../components/ui/Logo";

import { Loader2 } from "lucide-react";
import { AuthService } from "../service/Authentication";

const ForgotPassword = () => {

    const focus = "transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";
    
    const [error, setError] = useState();

    const formSchema = z.object({
        email: z.string().email({
            message: "Please enter a valid email address.",
        })
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        },
        mode: "onChange"
    });

    const onSubmit = async (values) => {
        setError("");
        try {
            await AuthService.sendPasswordResetLink(values);
            toast("Reset link sent", {
                description: "Check your email to reset your password."
            });
        } catch (error) {
            setError("Something went wrong. Try again.");

            toast("Error sending reset link", {
                description: "Please try again later."
            });
        }
    };

    return (
        <main className="w-full p-4">
            <Card className="w-full max-w-sm m-auto">
                <CardHeader>
                    <CardTitle><Logo /></CardTitle>
                    <CardDescription>
                        <h1 className="font-bold text-base my-1">Forgot Your Password?</h1>
                        <p>Enter your email address below, and we’ll send you a link to reset your password.</p>
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
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={!form.formState.isValid || form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="animate-spin w-4 h-4" /> Sending...
                                    </span>
                                    ) : (
                                        "Sent Reset Link"
                                    )
                                }
                            </Button>
                            <div className="text-sm text-center -mt-1">
                                <Link to="/login" className={`text-muted-foreground hover:underline ${focus}`}>
                                    Try login again? Login
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    );
};

export default ForgotPassword;