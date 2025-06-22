import { useDispatch } from "react-redux";

import { Button } from "../components/ui/button";
import { AuthService } from "../services/Authentication";
import { authActions } from "../store/authSlice";

const Dashboard = () => {

    const dispatch = useDispatch();

    const logout = () => {
        AuthService.logout();
        dispatch(authActions.logout());
    }

    return (
        <>
            <h2 className="text-xl">Dashboard</h2>
            <Button className="w-fit" onClick={logout}>Logout</Button>
        </>
    )
}

export default Dashboard;