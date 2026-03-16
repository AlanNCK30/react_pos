import { Button } from "@/components/ui/button";

const dashboard = () => {
    return (
        <>
            {/* Small size */}
            <Button size="sm">Small Button</Button>

            {/* Default size */}
            <Button size="default">Default Button</Button>

            {/* Large size */}
            <Button size="lg">Large Button</Button>

            <Button className={`h-50`}>tailwindcss</Button>
        </>
    );
};

export default dashboard;
