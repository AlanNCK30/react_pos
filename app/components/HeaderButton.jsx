import { Button } from "./ui/button";

const HeaderButton = ({ icon, text, action }) => {
    const Icon = icon;

    return (
        <Button
            variant="outline"
            className="px-3 py-5 bg-accent-foreground/80 dark:bg-primary/80 text-accent text-base ring tracking-widestpro sm:w-full md:w-full "
            onClick={action}
        >
            {Icon && <Icon className="mr-2 size-5 stroke-2" />}
            {text || "BUTTON"}
        </Button>
    );
};
export { HeaderButton };
