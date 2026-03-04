import { LuCircleCheckBig } from "react-icons/lu";

export default function Popup ({message}: {message: string}) {
    return <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-1">
       <LuCircleCheckBig className='fill-green-600' />  {message} 
    </div>
}