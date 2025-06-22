import { useEffect, useState } from "react";

import { toast } from "sonner";
import { AuthService } from "../../services/Authentication";

const AuthLayout = ({ children }) => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = AuthService.checkCurrentUser(async (token) => {
            if(token) {
                try {
                    console.log(token);
                } catch (error) {
                    toast("Session expired", {
                        description: "Please login again to continue.",
                    });
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [])

    if(loading) return <h1>Loading....</h1>

    return children;
}

export default AuthLayout;