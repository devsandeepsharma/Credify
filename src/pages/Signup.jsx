import { useState } from "react";
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
    CardTitle 
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import Logo from "../components/ui/Logo";

import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {

    const totalSteps = 3
    const stepFields = [
        ["logo", "companyName"], 
        ["description"],
        ["email", "password"],
    ];

    const [step, setStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);

    const formSchema = z.object({
        logo: z.any().refine((file) => file instanceof File, { message: "Logo is required" }),
        companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
        description: z.string().min(10, { message: "Description must be at least 10 characters." }),
        email: z.string().email({ message: "Please enter a valid email address." }),
        password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            logo: null,
            companyName: "",
            description: "",
            email: "",
            password: ""
        },
        mode: "onChange"
    });

    const handleSignup = (values) => {
        console.log(values)
    }

    const handleLogoChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            field.onChange(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const nextStep = async () => {
        const fields = stepFields[step];
        const valid = await form.trigger(fields);
        if (valid) {
            setStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setStep((prev) => prev - 1);
        }
    };

    return (
        <main className="w-full p-4">
            <Card className="w-full max-w-sm m-auto">
                <CardHeader>
                    <CardTitle><Logo /></CardTitle>
                    <CardDescription>
                        Complete the steps to create a new account.
                    </CardDescription>
                    <Progress value={((step + 1) / totalSteps) * 100} className="mt-2" />
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
                            {
                                step === 0 && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="logo"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company Logo</FormLabel>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-15 h-12 rounded-full border border-muted overflow-hidden bg-muted flex items-center justify-center">
                                                        {logoPreview ? (
                                                            <img
                                                                src={logoPreview}
                                                                alt="Logo Preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-xs text-center text-gray-400">No Logo</span>
                                                        )}
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleLogoChange(e, field)}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="companyName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Acme Inc." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )
                            }

                            {
                                step === 1 && (
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Short Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Write a short description about your business..." rows={5} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                )
                            }

                            {
                                step === 2 && (
                                    <>
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
                                    </>
                                )
                            }

                            <div className="flex justify-end gap-3">
                                <Button type="button" variant="outline" disabled={step === 0} onClick={prevStep}>
                                    <ArrowLeft />
                                    Prev
                                </Button>
                                {step < totalSteps - 1 ? (
                                    <Button type="button" onClick={nextStep}>
                                        Next
                                        <ArrowRight />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={form.formState.isSubmitting}
                                    >
                                        {form.formState.isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="animate-spin w-4 h-4" /> Signing up...
                                        </span>
                                        ) : (
                                            <>
                                                Signup
                                                <UserPlus />
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                    <div className="text-sm text-center mt-4">
                        <Link
                        to="/login"
                        className="text-muted-foreground hover:underline"
                        >
                            Already have an account? Log in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

export default Signup;