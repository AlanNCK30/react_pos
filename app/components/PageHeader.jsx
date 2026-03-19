const PageHeader = ({ title, desc, actionBtn }) => {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-card p-6 text-card-foreground shadow-xs lg:flex-row lg:items-end lg:justify-between w-full ring-1 ring-foreground/10 border">
            <div className="space-y-2">
                <h1 className="text-xl font-semibold text-foreground/95">{title}</h1>
                <p className="max-w-2xl text-base tracking-widestpro text-muted-foreground">
                    {desc}
                </p>
            </div>
            {actionBtn && <div>{actionBtn}</div>}
        </div>
    );
};

export { PageHeader };
