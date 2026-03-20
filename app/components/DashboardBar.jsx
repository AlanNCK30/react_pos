function DashboardBar() {
    return (
        <div className="flex justify-start gap-2 text-secondary  w-full py-2 px-1 text-center">
            <div
                className=" mr-auto py-2 px-4 text-2xl bg-primary/90 text-background/80
            rounded-xl"
            >
                <h2>儀表板</h2>
            </div>

            <div className="bg-primary/90 text-background/80 py-2 px-4  rounded-xl flex justify-center items-center text-2xl">
                <p className="tracking-wide">
                    每日銷售額: <span className="">$1000</span>
                </p>
            </div>
            <div className="bg-primary text-background/80 py-2 px-4  rounded-xl flex justify-center items-center text-2xl">
                <p>訂單數: 100杯</p>
            </div>
            <div className="bg-primary text-background/80 py-2 px-4  rounded-xl flex justify-center items-center text-2xl">
                <p>平均定單銷售額: $10</p>
            </div>
        </div>
    );
}

export default DashboardBar;
