import PasswordInput from '@/components/ui/PasswordInput';
import Avatar from '../../../assets/mèo.jfif'
const ProfilePage = () => {
  return (
    <div>
        <div className="p-4">
        <div className='flex bg-white p-3 rounded-xl mb-4'>
          <img className='w-20 h-20 rounded-full mr-4' src={Avatar} alt="Avatar" />
          <div>
            <p className='font-semibold text-xl'>John Doe</p>
            <p className='font-semibold text-lg'>Staff</p>
            <p className='text-gray-500'>john@example.com</p>
          </div>
        </div>

        <div className='bg-white rounded-xl p-4'>
          <button className='text-xl font-semibold pb-4 w-full flex justify-start cursor-pointer'>Password</button>
          <p className='pb-4'>Change Password</p>
          <PasswordInput PlaceHolder='Current Password' Name='current' />
          <PasswordInput PlaceHolder='New Password' Name='new' />
          <PasswordInput PlaceHolder='Confirm Password' Name='confirm' />
          <button>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage