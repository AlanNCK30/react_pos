import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TopBar() {
  return (
    <div className="flex text-black">
      <h1 className="mr-auto text-3xl">Boba Store</h1>
      <div className="flex text-2xl pr-6">
        <p className="pr-6">Date:123456</p>
        <FontAwesomeIcon icon={faUser} />
        <p>Mark Ho</p>
      </div>
    </div>
  );
}
