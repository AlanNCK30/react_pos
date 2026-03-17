import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
    CircleAlert,
    Package,
    Pencil,
    PencilLine,
    Plus,
    Search,
    Trash2,
    TriangleAlert,
} from "lucide-react";
export default function OrderHistoryPage() {
    return (
        <>
            <section className=" my-8">
                {/*  TOP : Header  */}
                <div className="flex flex-col p-4 mx-4 bg-linear-to-rshadow-lg lg:flex-row lg:items-end lg:justify-between  bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="space-y-4">
                        {/* <p className="tracking-[0.2em] uppercase">Employee Management</p> */}
                        <div className="space-y-2">
                            <h1 className="text-xl font-semibold tracking-widest">歴史訂單</h1>
                            <p className="max-w-2xl tracking-[0.2em]">
                                查閱過去所有交易細節，包括商品項目、金額、付款方式及店員資訊，設有退款功能。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="flex flex-row justify-between mx-4 gap-2 bg-white">
                    <div className="w-3/5 min-h-dvh ">
                        {/* Left content */}
                        <Table className="relative  table-fixed text-base bg-white">
                            <TableHeader className="sticky top-0 bg-gray-200/50 z-10 shadow-sm">
                                <TableRow>
                                    <TableHead>訂單編號</TableHead>
                                    <TableHead className="">內容</TableHead>
                                    <TableHead>付款金額</TableHead>

                                    <TableHead>訂單時間</TableHead>
                                    <TableHead>職員</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="[&_tr:nth-child(even)]:bg-gray-100/50">
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow className="even:bg-amber-500/50">
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>14052</TableCell>
                                    <TableCell className="truncate">
                                        何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基何榮基
                                    </TableCell>
                                    <TableCell className="">199.80</TableCell>

                                    <TableCell>1900-0-0 12:00</TableCell>
                                    <TableCell className="">哥基</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div className="w-2/5 bg-amber-200 h-fit">
                        {/* Right content */}
                        def
                    </div>
                </div>
            </section>
        </>
    );
}
