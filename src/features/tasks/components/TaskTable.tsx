import { type Task } from '../types';

const TASKS: Task[] = [
  { id: '1', title: 'Design UI', assignee: 'John', status: 'todo' },
];

export function TaskTable() {
  return (
    <ul className="space-y-2">
      {TASKS.map(task => (
        <li key={task.id} className="border p-3 rounded">
          {task.title} – {task.status}
        </li>
      ))}
    </ul>
  );
}
