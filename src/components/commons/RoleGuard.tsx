import { useAuth } from "@/hooks/useAuth";
import { type Role } from "@/types/common"
import type { JSX } from "react"
import { Navigate } from "react-router";

interface Props {
    allow: Role[]
    children: JSX.Element;
}

export const RoleGuard = ({allow, children} : Props) => {
    const { user } = useAuth();
    
    if (!user || !allow.includes(user.role)) {
        return <Navigate to='/dashboard' />
    }

    return children;
}