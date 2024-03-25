import clsx from "clsx";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { HandshakeOutlined } from "@mui/icons-material";

export function AppointmentStatus({ status }) {
  return (
    <div
      className={clsx("flex items-center gap-2 w-max rounded-full px-3 py-1 text-xs", {
        "bg-gray-100 text-gray-500": status === "Pending",
        "bg-lime-800 text-white": status === "Approved",
        "bg-cyan-400 text-white": status === "Closed",
      })}
    >
      {status === "Pending" ? (
        <ClockIcon className="w-4 h-4 text-gray-500" />
      ) : status === "Closed" ? (
        <CheckIcon className="w-4 h-4 text-white" />
      ) : (
        <HandshakeOutlined className="w-4 h-4 text-white" />
      )}
      <span className="">{status}</span>
    </div>
  );
}
