import { Moon, Sun } from "lucide-react";

type SwitchProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const Switch = ({ checked = false, onChange }: SwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-9 w-16 items-center rounded-full p-1 transition-colors ${
        checked ? "bg-slate-700" : "bg-amber-400"
      }`}
    >
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm transition-transform ${
          checked ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {checked ? (
          <Moon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Sun className="h-4 w-4" aria-hidden="true" />
        )}
      </span>
    </button>
  );
};

export default Switch;
