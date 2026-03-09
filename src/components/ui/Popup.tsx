import { LuCircleCheckBig } from "react-icons/lu";

export default function Popup({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300">
      <LuCircleCheckBig className="h-4 w-4 fill-current" />
      {message}
    </div>
  );
}
