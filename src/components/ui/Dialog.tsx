import { AlertTriangle } from "lucide-react";
import { useEmployee } from "@/contexts/EmployeeContext";
import { useTask } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";

export default function Dialog() {
  const { handleCloseDialog, handleConfirmDelete } = useEmployee();
  const { handleCloseDialog2, handleConfirmDelete2 } = useTask();

  return (
    <div className="w-[min(460px,92vw)] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Confirm deletion
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            This action cannot be undone. The selected item will be permanently removed.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-200 pt-4 dark:border-slate-700">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            handleCloseDialog();
            handleCloseDialog2();
          }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            handleConfirmDelete();
            handleConfirmDelete2();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
