import newspaper from "../../assets/newspaper.png";
import classic from "../../assets/classic.png";
import moderngrid from "../../assets/moderngrid.png";
import portfolio from "../../assets/portfolio.png";

export const templateData = [
    {
        id: 1,
        title: "Classic Layout",
        description: "A timeless, clean layout with simple testimonial collection for quick feedback.",
        preview: classic,
        isPremium: false,
    },
    {
        id: 2,
        title: "Modern Grid",
        description: "A grid-based layout with vibrant visuals and structured content. Great for tech startups.",
        isPremium: false,
        preview: moderngrid,
    },
    {
        id: 3,
        title: "Creative Portfolio",
        description: "A stylish layout with fixed form and dynamic testimonials. Perfect for creatives and freelancers.",
        isPremium: true,
        preview: portfolio,
    },
    {
        id: 4,
        title: "News Ad Style",
        description: "Inspired by newspaper ads, with bold headlines and clean sections. Catchy for product promos.",
        isPremium: true,
        preview: newspaper,
    }
]