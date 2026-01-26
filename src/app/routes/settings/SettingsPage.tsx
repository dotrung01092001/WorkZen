  import Modal from "@/components/ui/Modal";
  import { EmployeeTable2 } from "@/features/employees/components/EmployeeTable2";
  import { useState } from "react";

  export default function SettingsPage() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onEdit = ({employee}) => {
    setIsOpenModal(true);
  }

  return (
    <div className="relative h-[85vh] w-full rounded-xl bg-gray-100 dark:bg-black text-black dark:text-white overflow-hidden">

      {/* MAIN CONTENT */}
      <div className="p-5 h-full overflow-auto">
        <h1 className="text-2xl font-semibold mb-4">Settings</h1>

        <button
          onClick={() => setIsOpenModal(true)}
          className="mb-4 py-2 px-4 rounded-lg bg-green-400 font-semibold cursor-pointer"
        >
          Add Employee
        </button>

        <EmployeeTable2 onEdit={onEdit} />
      </div>

      {/* OVERLAY */}
      {isOpenModal && (
        <div
          className="fixed inset-0 bg-black/90 z-9998"
          onClick={() => setIsOpenModal(false)}
        />
      )}

      {/* MODAL */}
      {isOpenModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center">
          <div onClick={(e) => e.stopPropagation()}>
            <Modal setIsOpenModal={setIsOpenModal} />
          </div>
        </div>
      )}
    </div>
  );
}
