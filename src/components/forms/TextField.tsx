import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
}

export function TextField({ name, label }: Props) {
  const { register } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <input
        {...register(name)}
        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition-all focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
      />
    </div>
  );
}
