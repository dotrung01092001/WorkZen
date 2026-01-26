import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
}

export function TextField({ name, label }: Props) {
  const { register } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="text-sm">{label}</label>
      <Input {...register(name)} />
    </div>
  );
}
