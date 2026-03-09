import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTask } from "@/contexts/TaskContext";
import { useAuth } from "@/hooks/useAuth";
import { useEmployee } from "@/contexts/EmployeeContext";

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function TaskActivityPanel({ taskId }: { taskId: string }) {
  const { tasks, addTaskAttachment, removeTaskAttachment } = useTask();
  const { user } = useAuth();
  const { employees } = useEmployee();
  const [uploadError, setUploadError] = useState("");

  const task = tasks.find((item) => item.id === taskId);
  const employeeMap = useMemo(
    () => new Map(employees.map((employee) => [employee.id, employee.name])),
    [employees],
  );

  if (!task) {
    return null;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Task Activity
        </h3>
        <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs dark:border-slate-700">
          {task.title}
        </span>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Timeline
          </p>
          <ul className="max-h-64 space-y-2 overflow-y-auto pr-1">
            {(task.timeline ?? []).map((event) => (
              <li
                key={event.id}
                className="rounded-lg border border-slate-200 bg-white p-3 text-xs dark:border-slate-700 dark:bg-slate-900"
              >
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  {event.actorName} {event.action}
                </p>
                {event.details ? (
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{event.details}</p>
                ) : null}
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  {new Date(event.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
            {(task.timeline ?? []).length === 0 && (
              <li className="rounded-lg border border-dashed border-slate-300 p-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                No activity yet.
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Attachments
          </p>
          <label className="mb-2 inline-block cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
            Upload file
            <input
              type="file"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file || !user) return;

                if (file.size > 5 * 1024 * 1024) {
                  setUploadError("Max file size is 5MB.");
                  return;
                }

                const reader = new FileReader();
                reader.onload = () => {
                  addTaskAttachment(task.id, {
                    fileName: file.name,
                    url: String(reader.result),
                    mimeType: file.type || "application/octet-stream",
                    size: file.size,
                    uploadedBy: user.id,
                  });
                  setUploadError("");
                };
                reader.readAsDataURL(file);
              }}
            />
          </label>
          {uploadError ? <p className="mb-2 text-xs text-rose-500">{uploadError}</p> : null}

          <ul className="max-h-56 space-y-2 overflow-y-auto pr-1">
            {(task.attachments ?? []).map((attachment) => (
              <li
                key={attachment.id}
                className="rounded-lg border border-slate-200 bg-white p-3 text-xs dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-100">
                      {attachment.fileName}
                    </p>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">
                      {formatFileSize(attachment.size)} • by{" "}
                      {employeeMap.get(attachment.uploadedBy) ?? "Unknown"}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => removeTaskAttachment(task.id, attachment.id)}
                  >
                    Remove
                  </Button>
                </div>
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-cyan-600 hover:underline dark:text-cyan-300"
                >
                  Preview
                </a>
              </li>
            ))}
            {(task.attachments ?? []).length === 0 && (
              <li className="rounded-lg border border-dashed border-slate-300 p-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                No attachments.
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
