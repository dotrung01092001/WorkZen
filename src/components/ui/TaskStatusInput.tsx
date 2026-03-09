import type { TaskStatus } from "@/types/common";

type Props = {
    value?: TaskStatus;
    onChange?: (status: TaskStatus) => void;
}

const TaskStatusInput = ({ value, onChange }: Props) => {

  return (
    <select
      className="outline-none bg-transparent"
      value={value}
      onChange={(e) => onChange?.(e.target.value as TaskStatus)}
    >
      <option className="dark:text-black">todo</option>
      <option className="dark:text-black">in-progress</option>
      <option className="dark:text-black">review</option>
      <option className="dark:text-black">done</option>
    </select>
  );
};

export default TaskStatusInput;
