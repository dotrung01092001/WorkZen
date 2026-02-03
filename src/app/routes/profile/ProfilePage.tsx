import Header from '@/components/layout/Header';
import PasswordInput from '@/components/ui/PasswordInput';
import SaveButton from '@/components/ui/SaveButton';
import { useAuth } from '@/hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className='bg-white dark:bg-black min-h-screen'>
    <Header />
    <div className='w-[80vw] mx-auto bg-[#cce1fa] p-6 rounded-2xl mt-20'>
        <div className="p-4">
        <div className='flex bg-white dark:bg-black p-3 rounded-xl mb-4'>
          <div className='mx-4'>
            <p className='font-semibold text-2xl dark:text-white'>{user?.name}</p>
            <p className='font-semibold text-lg dark:text-white'>{user?.role}</p>
            <p className='text-gray-500'>{user?.email}</p>
          </div>
        </div>

        <form className='bg-white dark:bg-black rounded-xl p-4'>
          <button className='text-xl font-semibold dark:text-white pb-4 w-full flex justify-start cursor-pointer'>Password</button>
          <p className='pb-4 dark:text-white'>Change Password</p>
          <PasswordInput PlaceHolder='Current Password' Name='current' />
          <PasswordInput PlaceHolder='New Password' Name='new' />
          <PasswordInput PlaceHolder='Confirm Password' Name='confirm' />
          <SaveButton />
        </form>
      </div>
    </div>
    </div>
  )
}

export default ProfilePage