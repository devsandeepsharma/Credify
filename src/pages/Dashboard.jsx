import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button } from "../components/ui/button";

const Dashboard = () => {

    const user = useSelector(state => state.auth.user);

    return (
        <main>
            <h2>Dashboard</h2>
            <Link target="_blank" to={`/v1/${user.slug}`}>
                <Button>
                    {`/v1/${user.slug}`}
                </Button>
            </Link>
        </main>
    )
}

export default Dashboard;