import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { 
    Card, 
    CardContent
} from "../components/ui/card";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "../components/ui/select";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const Testimonials = () => {

    const data = useSelector((state) => state.testimonials.data);

    const [sortOrder, setSortOrder] = useState("newest");

    const testimonials = Object.values(data || {}).sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return (
        <motion.div
            className="p-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold mb-3">Testimonials</h1>
                    <p className="text-gray-400 mb-3">
                        See what others have shared about their experience.
                    </p>
                </div>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                {testimonials.map((testimonial) => (
                <motion.div
                    key={testimonial.id}
                    variants={cardVariants}
                    className="flex-1"
                >
                    <Card className="w-full">
                        <CardContent className="space-y-2">
                            <div className="text-xs text-gray-400 space-y-1">
                                <div className="flex justify-between">
                                    <span>{testimonial.email}</span>
                                    <span>
                                    {new Date(testimonial.createdAt).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                    </span>
                                </div>
                            </div>
                            <p className="leading-relaxed italic">
                                “{testimonial.message}”
                            </p>

                            <div className="text-right capitalize font-medium">
                                — {testimonial.username}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default Testimonials;