import { useState } from "react";
import { BiSolidShow } from "react-icons/bi";

const PasswordInput = ({ PlaceHolder, Name }) => {
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <div className="pb-4 relative">
      <input className="p-2 border border-gray-300 w-full rounded-lg dark:text-white" type={isShow ? 'text' : 'password'} placeholder={PlaceHolder} name={Name} />
      <button type="button" onClick={() => {
        setIsShow(!isShow);
        
      }} className="absolute right-3 top-2 cursor-pointer">
        <BiSolidShow className="w-6 h-6 dark:fill-white" />
      </button>
    </div>
  );
};

export default PasswordInput;
