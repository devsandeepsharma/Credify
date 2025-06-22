import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { toast } from "sonner";
import TemplateCard from "../components/templates/TemplateCard";
import { templateData } from "../components/templates/templateData";

import { UserService } from "../services/Database";
import { authActions } from "../store/authSlice";

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

const Template = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const handleUseTemplate = async (id, title) => {
        try {
            await UserService.patch(user.localId, {template: id});
            dispatch(authActions.update({
                ...user,
                template: id
            }))
            toast.success("Template updated", {
                description: `${title} template has been applied.`
            });
        } catch (error) {
            toast.error("Failed to update template", {
                description: "Please try again later.",
            });
        }
    };

    return (
        <motion.div
            className="p-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <h1 className="text-4xl font-bold mb-3">Choose Your Template</h1>
            <p className="text-gray-400 mb-8">Select a layout to collect testimonials. More coming soon!</p>
            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                {
                  templateData.map((tpl) => (
                    <motion.div key={tpl.id} variants={cardVariants} className="flex-1">
                        <TemplateCard
                            id={tpl.id}
                            title={tpl.title}
                            preview={tpl.preview}
                            isPremium={tpl.isPremium}
                            userIsPremium={user?.hasPremium}
                            selectedTemplate={user?.template}
                            onUseTemplate={() => handleUseTemplate(tpl.id, tpl.title)}
                        />
                    </motion.div>
                ))
                }
            </div>
        </motion.div>
    );
};

export default Template;