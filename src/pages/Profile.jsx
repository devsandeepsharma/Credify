import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import EditProfileForm from "../components/profile/EditProfileForm";

import { AuthService } from "../services/Authentication";
import { authActions } from "../store/authSlice";

const Profile = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const logout = () => {
        AuthService.logout();
        dispatch(authActions.logout());
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-2"
            >
                <header>
                    <h1 className="text-4xl font-bold mb-3">Company Profile</h1>
                    <p className="text-gray-400 mb-8">
                        View and manage your company information below. You can update details like logo, description, and more.
                    </p>
                </header>

                <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
                    {user?.companyLogo ? (
                        <motion.img
                            key="logo"
                            src={user.companyLogo}
                            alt="Company Logo"
                            className="w-25 h-25 md:w-35 md:h-35 rounded-md object-cover border"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    ) : (
                        <motion.div
                            key="initial"
                            className="w-25 h-25 md:w-35 md:h-35 rounded-md flex items-center justify-center border text-5xl font-semibold text-gray-600 uppercase"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {user?.companyName?.charAt(0) || "C"}
                        </motion.div>
                    )}

                    <div className="flex flex-col gap-4 w-full">
                        <div>
                            <Label className="mb-3" htmlFor="slug">Slug</Label>
                            <Input id="slug" value={user?.slug || ""} disabled />
                        </div>
                        <div>
                            <Label className="mb-3" htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" value={user?.companyName || ""} disabled />
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <Label className="mb-3" htmlFor="description">Description</Label>
                    <Textarea
                        className="resize-none"
                        id="description"
                        value={user?.companyDesc || "No description provided."}
                        disabled
                        rows={5}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="flex-1">
                        <Label className="mb-3" htmlFor="template">Current Template</Label>
                        <Input id="template" value={user?.template || "Default"} disabled />
                    </div>
                    <div className="flex-1">
                        <Label className="mb-3" htmlFor="plan">Current Plan</Label>
                        <Input id="plan" value={user?.hasPremium || "Basic"} disabled />
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <EditProfileForm />
                    <Button variant="destructive" onClick={logout}>Logout</Button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Profile;