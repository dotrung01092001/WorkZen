import { type Task } from "@/types/task";
import { type AuthUser } from "@/types/auth";

export function filterTasksByRole(tasks: Task[], user: AuthUser) {
    if (user.role === 'Employee') {
        return tasks.filter(task => task.assignee === user.id)
    }
    
    return tasks;
}