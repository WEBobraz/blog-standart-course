import { faBrain } from "@fortawesome/free-solid-svg-icons/faBrain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Logo = () => {
  return (
    <div className="text-3xl text-center py-4 font-heading">
      Your AI Writer &nbsp;
      <FontAwesomeIcon icon={faBrain} className="text-2xl text-slate-400" />
    </div>
  );
};
