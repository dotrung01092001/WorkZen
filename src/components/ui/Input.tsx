import { Search, X } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";

const Input = () => {
  const { search, setSearch } = useSearchStore();

  return (
    <div className="relative w-full max-w-xl">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks, employees..."
        className="h-10 w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-10 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:ring-slate-800"
        aria-label="Search"
      />
      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Input;
