import { useState } from "react";
import { BiSolidShow } from "react-icons/bi";

interface InputProps {
  PlaceHolder: string;
  Name: string;
}

const PasswordInput = ({ PlaceHolder, Name, value, onChange, error } : InputProps & { value: string; onChange: (value: string) => void; error?: string }) => {
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <div className="pb-4 relative">
      <input className="p-2 border border-gray-300 w-full rounded-lg dark:text-white" type={isShow ? 'text' : 'password'} placeholder={PlaceHolder} name={Name} value={value} onChange={(e) => onChange(e.target.value)} />
      <button type="button" onClick={() => {
        setIsShow(!isShow);
        
      }} className="absolute right-3 top-2 cursor-pointer">
        <BiSolidShow className="w-6 h-6 dark:fill-white" />
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;
