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
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { StorageService } from "../../services/Storage";
import { UserService } from "../../services/Database";
import { authActions } from "../../store/authSlice";

const EditProfileForm = () => {
  
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [logoPreview, setLogoPreview] = useState(user.companyLogo || null);
    const [newLogoFile, setNewLogoFile] = useState(null);

    const formSchema = z.object({
        description: z.string().min(10, { message: "Description must be at least 10 characters." }),
        logo: z.any(),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
            defaultValues: {
            description: user?.companyDesc || "",
            logo: null,
        },
        mode: "onChange",
    });

    const onSubmit = async (values) => {

        const hasChanged = checkDataChange(values);
        if (!hasChanged) {
            toast.error("No changes detected.");
            return;
        }

        try {

            let imageUrl = user.companyLogo || "";

            if (newLogoFile) {
                imageUrl = await StorageService.uploadImage(newLogoFile);
            }

            await UserService.patch(user.localId, {
                companyLogo: imageUrl,
                companyDesc: values.description
            })

            dispatch(authActions.update(
                {
                    ...user, 
                    companyLogo: imageUrl,
                    companyDesc: values.description
                }
            ))
            toast.success("Info saved!");
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
        }
    };

    const handleLogoChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            field.onChange(file);
            setNewLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const checkDataChange = (values) => {
        const currentDesc = user?.companyDesc || "";

        const hasChanged =
            values.description !== currentDesc ||
            newLogoFile !== null;

        return hasChanged;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Company Info</DialogTitle>
                    <DialogDescription>
                        Update your logo and company description below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Short Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write a short description about your business..." rows={5} className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
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
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </span>
                                ) : (
                                "Save Info"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfileForm;