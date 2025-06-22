import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Toaster } from "sonner";
import ClassicLayout from "../components/templates/ClassicLayout";
import CreativePortfolio from "../components/templates/CreativePortfolio";
import ModernGrid from "../components/templates/ModernGrid";
import NewspaperLayout from "../components/templates/NewspaperLayout";

import { SlugService, UserService } from "../services/Database";

const ShareLink = () => {

    const templates = [
        ClassicLayout,
        ModernGrid,
        CreativePortfolio,
        NewspaperLayout,
    ]

    const { slug } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const selected = user?.template || 0;
    const SelectedTemplate = templates[selected];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uid = await SlugService.get(slug);
                const user = await UserService.get(uid?.localId);
                setUser(user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <h2>Loading...</h2>;
    if (!user.companyName) return <h2>User not found</h2>;

    return (
        <>
            {SelectedTemplate ? (
                <>
                    <SelectedTemplate {...user} localId={user?.localId} />
                    <Toaster />
                </>
            ) : (
                <h2>Template not found</h2>
            )}
        </>
    );
};

export default ShareLink;