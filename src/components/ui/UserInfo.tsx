import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
    const [isDropdown, setIsDropdown] = useState<boolean>(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login')
    }

    const handleUser = async () => {
      if (user) {
        navigate('/profile') 
      }
    }

  return (
    <button onMouseEnter={() => setIsDropdown(true)} onMouseLeave={() => setIsDropdown(false)} className='flex relative items-center cursor-pointer'>
  
      <div className='flex flex-col text-white items-start py-2'>
        <p className='text-sm font-bold dark:text-black'>Hi 👋 {user?.name}</p>
        <p className='text-sm text-gray-600'>{user?.email}</p>
      </div>
{isDropdown && (
    <ul className='absolute text-white bg-gray-900 top-15 rounded-xl w-full'>
        <li className='p-2 m-2 rounded-xl hover:outline-2 hover:outline-blue-600 hover:bg-gray-700' onClick={handleUser}>User profile</li>
        <li className='hover:bg-red-500 p-2 m-2 rounded-xl hover:outline-2 hover:outline-blue-600' onClick={handleLogout}>Logout</li>
    </ul>
)}
    </button>
  );
};

export default UserInfo;
