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
    <div className="flex text-black">
      <h1 className="mr-auto text-3xl">Boba Store</h1>
      <div className="flex text-2xl pr-6">
        <p className="pr-6">{formattedDate}</p>
        <FontAwesomeIcon icon={faUser} />
        <p>Mark Ho</p>
      </div>
    </div>
  );
}
