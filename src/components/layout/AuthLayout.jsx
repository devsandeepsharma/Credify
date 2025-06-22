import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "sonner";
import { AuthService } from "../../services/Authentication";
import { UserService } from "../../services/Database";
import { authActions } from "../../store/authSlice";

const AuthLayout = ({ children }) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = AuthService.checkCurrentUser(async (token) => {
            if(token) {
                try {
                    const user = await UserService.get(token);
                    dispatch(authActions.login(user));
                } catch (error) {
                    dispatch(authActions.logout());
                    toast("Session expired", {
                        description: "Please login again to continue.",
                    });
                } finally {
                    setLoading(false);
                }
            } else {
                dispatch(authActions.logout());
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