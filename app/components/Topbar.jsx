import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TopBar() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("zh-HK", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex justify-center items-center text-black h-auto border-b-4 p-1">
      <h1 className="mr-auto p-4 text-3xl bg-slate-200 rounded-2xl">Boba Store</h1>
      <div className="flex text-2xl p-4 bg-slate-200 rounded-2xl">
        <p className="pr-6">{formattedDate}</p>
        <FontAwesomeIcon icon={faUser} />
        <p>Mark Ho</p>
      </div>
    </div>
  );
}
