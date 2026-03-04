import { SiDialogflow } from "react-icons/si";
import { useEmployee } from "@/contexts/EmployeeContext";
import { useTask } from "@/contexts/TaskContext";

export default function Dialog() {
  const { handleCloseDialog, handleConfirmDelete } = useEmployee();
  const { handleCloseDialog2, handleConfirmDelete2 } = useTask();

  return (
    <div className="bg-white p-5 rounded-xl">
      <p className="font-semibold mb-4 flex items-center dark:text-black">
        <SiDialogflow className="mr-2" /> Are you sure you want to delete it?
      </p>
      <div className="flex justify-around dark:text-black">
        <button
          className="px-4 py-1.5 outline rounded-md hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            handleCloseDialog();
            handleCloseDialog2();
          }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-1.5 bg-black text-white rounded-md cursor-pointer"
          onClick={() => {
            handleConfirmDelete();
            handleConfirmDelete2();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
