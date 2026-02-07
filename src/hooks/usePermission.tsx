import { PERMISSIONS } from '@/lib/permissions';
import {useAuth} from './useAuth';


export const usePermission = () => {
    const {user} = useAuth();

    if (!user) {
        return null;
    }

  return PERMISSIONS[user.role];
}
