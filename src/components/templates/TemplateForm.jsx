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
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";

import { Loader2 } from "lucide-react";

const TemplateForm = ({ responsive=false, localId }) => {
    
    const [error, setError] = useState();
    
    const formSchema = z.object({
        username: z.string().min(2, { message: "Username must be at least 2 characters." }),
        email: z.string().email({ message: "Please enter a valid email address." }),
        message: z.string().min(12, { message: "Message must be at least 12 characters." }),
    });
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { username: "", email: "", message: "" },
        mode: "onChange",
    });
    
    const onSubmit = async (values) => {
        setError("");
        try {
            console.log(localId);
            console.log(values);
            form.reset();
            toast.success("Feedback submitted", {
                description: "Thanks for sharing your experience!",
            });
        } catch(error) {
            toast.error("Something went wrong", {
                description: "Could not submit your feedback. Please try again.",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className={`flex flex-col gap-6 w-full ${responsive && "md:flex-row"}`}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className={`${responsive && "flex-1"}`}>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage>{error}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className={`${responsive && "flex-1"}`}>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@example.com" {...field} />
                                </FormControl>
                                <FormMessage>{error}</FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Your thoughts..." rows={5} {...field} />
                            </FormControl>
                            <FormMessage>{error}</FormMessage>
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={!form.formState.isValid || form.formState.isSubmitting}
                    className="w-full"
                >
                    {form.formState.isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <Loader2 className="animate-spin w-5 h-5" /> Sending...
                    </span>
                    ) : (
                    "Send Feedback"
                    )}
                </Button>
            </form>
        </Form>
    )
}

export default TemplateForm;