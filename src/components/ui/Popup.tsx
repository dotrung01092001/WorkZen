import { FaCheck } from "react-icons/fa";

export default function Popup ({message}: {message: string}) {
    return <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-1">
        {message} <FaCheck className="inline-block fill-green-500" />
    </div>
}