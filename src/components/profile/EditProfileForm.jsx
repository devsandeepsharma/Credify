import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { AuthService } from "../../service/Authentication";
import { authActions } from "../../store/authSlice";

import { Edit, Loader2 } from "lucide-react";

const EditProfileForm = () => {

    const focus = "transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const [error, setError] = useState();
    
    const formSchema = z.object({
        username: z.string().min(2, { 
            message: "Username must be at least 2 characters." 
        })
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user?.username
        },
        mode: "onChange"
    });

    const onSubmit = async (values) => {
        setError("");
        try {
            await AuthService.updateUsername({
                idToken: user.token,
                displayName: values.username
            })
            dispatch(authActions.updateUsername(values.username));
            toast("Profile Updated", {
                description: "Your username has been successfully updated."
            });
        } catch (error) {
            toast("Update failed", {
                description: "Could not update username. Try again later."
            });

            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className={`cursor-pointer p-1 rounded hover:bg-accent ${focus}`}
                    aria-label="Edit Profile"
                >
                    <Edit />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder={user?.username} {...field} />
                                    </FormControl>
                                    <FormMessage>{error}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="pt-2">
                            <DialogClose asChild>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={!form.formState.isValid || form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="animate-spin w-4 h-4" /> Saving...
                                    </span>
                                    ) : (
                                        "Save Changes"
                                    )
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileForm;