import { Label } from "./ui/label";
function InventoryFormField({ id, label, error, children }) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            {children}
            {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </div>
    );
}
export { InventoryFormField };
