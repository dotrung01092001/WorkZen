import Header from '@/components/layout/Header';
import PasswordInput from '@/components/ui/PasswordInput';
import SaveButton from '@/components/ui/SaveButton';
import { useEmployee } from '@/contexts/EmployeeContext';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface errorProps {
  current?: string;
  new?: string;
  confirm?: string;
}

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { employees, updateEmployee } = useEmployee();

  const [error, setError] = useState<errorProps>({});
  const [current, setCurrent] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>(''); 

  const navigate = useNavigate();

  const updatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) return;

    const employee = employees.find(emp => emp.id === user.id);

    if (!employee) return;
    
    const newError: errorProps = {};

    if (employee.password !== current) {
      newError.current = 'Current password is incorrect';
    }

    if (newPassword.length < 6) {
      newError.new = 'New password must be at least 6 characters long';
    }

    if (newPassword !== confirmPassword) {
      newError.confirm = 'New password and confirm password do not match';
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return
    } 

    updateEmployee({
      ...employee,
      password: newPassword
    });
    setError({});
    setCurrent('');
    setNewPassword('');
    setConfirmPassword('');

    logout();

    navigate('/login');
  };

  return (
    <div className='bg-white dark:bg-black min-h-screen'>
    <Header handleOpen={undefined} />
    <div className='w-[80vw] mx-auto bg-[#cce1fa] p-6 rounded-2xl mt-20'>
        <div className="p-4">
        <div className='flex bg-white dark:bg-black p-3 rounded-xl mb-4'>
          <div className='mx-4'>
            <p className='font-semibold text-2xl dark:text-white'>{user?.name}</p>
            <p className='font-semibold text-lg dark:text-white'>{user?.role}</p>
            <p className='text-gray-500'>{user?.email}</p>
          </div>
        </div>

        <form onSubmit={updatePassword} className='bg-white dark:bg-black rounded-xl p-4'>
          <button className='text-xl font-semibold dark:text-white pb-4 w-full flex justify-start cursor-pointer'>Password</button>
          <p className='pb-4 dark:text-white'>Change Password</p>
          <PasswordInput PlaceHolder='Current Password' Name='current' value={current} onChange={setCurrent} error={error.current} />
          <PasswordInput PlaceHolder='New Password' Name='new' value={newPassword} onChange={setNewPassword} error={error.new} />
          <PasswordInput PlaceHolder='Confirm Password' Name='confirm' value={confirmPassword} onChange={setConfirmPassword} error={error.confirm} />
          <SaveButton/>
        </form>
      </div>
    </div>
    </div>
  )
}

export default ProfilePage