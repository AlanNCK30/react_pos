export default function DetailItem({ label, value }) {
    return (
        <div className="rounded-xl bg-secondary p-3 ring ">
            <p className="text-base tracking-widestpro uppercase">{label}</p>
            <p className="mt-2 text-xl font-medium tracking-widestpromax ">{value}</p>
        </div>
    );
}
