import { BiSolidShow } from "react-icons/bi";

const PasswordInput = ({ PlaceHolder, Name }) => {
  return (
    <div className="pb-4 relative">
      <input className="p-2 border border-gray-300 w-full rounded-lg" type="password" placeholder={PlaceHolder} name={Name} />
      <button className="absolute right-3 top-2 cursor-pointer">
        <BiSolidShow className="w-6 h-6" />
      </button>
    </div>
  );
};

export default PasswordInput;
