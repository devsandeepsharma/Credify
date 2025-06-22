import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Toaster } from "sonner";
import Loader from "../components/templates/Loader";
import ClassicLayout from "../components/templates/ClassicLayout";
import CreativePortfolio from "../components/templates/CreativePortfolio";
import ModernGrid from "../components/templates/ModernGrid";
import NewspaperLayout from "../components/templates/NewspaperLayout";

import { SlugService, TestimonialService, UserService } from "../services/Database";

const ShareLink = () => {

    const templates = [
        ClassicLayout,
        ModernGrid,
        CreativePortfolio,
        NewspaperLayout,
    ]

    const { slug } = useParams();

    const [user, setUser] = useState(null);
    const [testimonials, setTestimonials] = useState(null);
    const [loading, setLoading] = useState(true);

    const selected = user?.template || 0;
    const SelectedTemplate = templates[selected];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uid = await SlugService.get(slug);
                const user = await UserService.get(uid?.localId);
                const testimonials = await TestimonialService.get(uid?.localId);
                setUser(user);
                setTestimonials(Object.values(testimonials));
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loader />;
    if (!user.companyName) return <h2>User not found</h2>;

    return (
        <>
            {SelectedTemplate ? (
                <>
                    <SelectedTemplate {...user} testimonials={testimonials} localId={user?.localId} />
                    <Toaster />
                </>
            ) : (
                <h2>Template not found</h2>
            )}
        </>
    );
};

export default ShareLink;