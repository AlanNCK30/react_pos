export default function DetailItem({ label, value }) {
    return (
        <div className="rounded-xl bg-secondary p-3 ring ">
            <p className="text-xs tracking-[0.2em] uppercase">{label}</p>
            <p className="mt-2 text-base font-medium ">{value}</p>
        </div>
    );
}
