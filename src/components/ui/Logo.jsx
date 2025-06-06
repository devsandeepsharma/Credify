import { Newspaper } from "lucide-react";

const Logo = () => {
    return (
        <div className="inline-flex gap-2 items-center">
            <Newspaper size={20} />
            <span className="text-xl font-bold">Credify</span>
        </div>
    )
}

export default Logo;