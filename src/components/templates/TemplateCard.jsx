import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

const TemplateCard = ({
    id=0,
    title="Template",
    description = "A clean and modern template to collect testimonials.",
    preview,
    isPremium = false,
    userIsPremium = false,
    selectedTemplate=0,
    onUseTemplate=() => {},
}) => {

    const isLocked = isPremium && !userIsPremium;

    const isSelected = selectedTemplate === id;

    return (
        <Card className={
                `relative w-full max-w-sm transition-all duration-300 
                ${isLocked ? "opacity-90 cursor-not-allowed" : ""}
                ${isSelected ? "border-2 border-primary" : ""}
            `}>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {
                    isLocked && (
                        <div className="absolute top-3 right-3 py-1 px-2">
                            <Badge className="bg-yellow-400 text-black hover:bg-yellow-500">Premium</Badge>
                        </div>
                    )
                }
                <div className="w-full aspect-video rounded-md overflow-hidden border border-muted bg-background">
                    <img
                        src={preview}
                        alt={`${title} preview image`}
                        className="w-full h-full object-cover"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
                <Button
                    disabled={isLocked || isSelected}
                    onClick={onUseTemplate}
                    className={`flex-1 ${isLocked || isSelected ? "cursor-not-allowed" : ""}`}
                >
                    {
                        isLocked
                        ? "Locked 🔒"
                        : isSelected
                        ? "In Use"
                        : "Use Template"
                    }
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TemplateCard;