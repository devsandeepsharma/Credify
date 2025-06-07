import { useEffect } from "react";

import { toast } from "sonner";
import { AuthService } from "../../service/authentication";

const AuthLayout = ({ children }) => {

    useEffect(() => {
        const unsubscribe = AuthService.checkCurrentUser(async (token) => {
            console.log(token)
            if(token) {
                try {
                    const user = await AuthService.getUserData(token);
                    console.log(user);
                } catch (error) {
                    console.log(error);
                    toast("Session expired", {
                        description: "Please login again to continue.",
                    });
                }
            }
        });

        return () => {
            unsubscribe();
        };
    }, [])

    return children;
}

export default AuthLayout;