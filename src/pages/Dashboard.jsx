import { useDispatch } from "react-redux";

import { Button } from "../components/ui/button";
import { AuthService } from "../service/authentication";
import { authActions } from "../store/authSlice";

const Dashboard = () => {

    const dispatch = useDispatch();

    const logout = () => {
        AuthService.logoutuser();
        dispatch(authActions.logout());
    }

    return (
        <main>
            <h2>Dashboard</h2>
            <Button onClick={logout}>Logout</Button>
        </main>
    )
}

export default Dashboard;