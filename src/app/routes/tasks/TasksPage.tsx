import { TaskTable } from '@/features/tasks/components/TaskTable';

export default function TasksPage() {
  return (
    <div className='h-[85vh] w-full rounded-xl p-5 bg-white dark:bg-black text-black dark:text-white'>
      <h1 className="text-2xl font-semibold mb-6">Tasks</h1>
      <TaskTable />
    </div>
  );
}
