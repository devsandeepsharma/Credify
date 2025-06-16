import { Button } from "./components/ui/button";

const App = () => {
    return (
        <div className="flex flex-col gap-3 justify-center items-center min-h-screen">
            <h1 className="text-3xl font-bold">Credify</h1>
            <div className="flex gap-2">
                <Button>Get Started</Button>
                <Button variant="secondary">View Website</Button>
            </div>
        </div>
    )
}

export default App;