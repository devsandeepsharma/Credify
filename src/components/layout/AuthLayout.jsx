import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { toast } from "sonner";
import { AuthService } from "../../service/Authentication";
import { authActions } from "../../store/authSlice";

const AuthLayout = ({ children }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = AuthService.checkCurrentUser(async (token) => {
            if(token) {
                try {
                    const user = await AuthService.getUserData(token);
                    const userData = {
                        username: user.users[0].displayName,
                        localId: user.users[0].localId,
                        email: user.users[0].email
                    }
                    dispatch(authActions.login(userData));
                } catch (error) {
                    dispatch(authActions.logout());
                    toast("Session expired", {
                        description: "Please login again to continue.",
                    });
                }
            } else {
                dispatch(authActions.logout());
            }
        });

        return () => {
            unsubscribe();
        };
    }, [])

    return children;
}

export default AuthLayout;