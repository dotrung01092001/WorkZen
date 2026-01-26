import { useState } from 'react';
import AccountImage from '../../assets/mèo.jfif'

const UserInfo = () => {
    const [isDropdown, setIsDropdown] = useState<boolean>(false)

  return (
    <button onClick={() => setIsDropdown(!isDropdown)} className='flex relative items-center cursor-pointer'>
      <img className='w-12 h-12 p-0.5 border-2 border-gray-500 rounded-full mr-2' src={AccountImage} />
      <div className='flex flex-col text-white items-start py-2'>
        <p className='text-sm font-bold dark:text-black'>John Doe</p>
        <p className='ext-sm text-gray-600'>john@example</p>
      </div>
{isDropdown && (
    <ul className='absolute text-white bg-gray-900 top-15 rounded-xl w-full'>
        <li className='p-2 m-2 rounded-xl hover:outline-2 hover:outline-blue-600 hover:bg-gray-700'>User profile</li>
        <li className='hover:bg-red-500 p-2 m-2 rounded-xl hover:outline-2 hover:outline-blue-600'>Logout</li>
    </ul>
)}
    </button>
  );
};

export default UserInfo;
