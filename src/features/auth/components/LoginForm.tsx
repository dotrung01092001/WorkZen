import { useForm, FormProvider } from 'react-hook-form';
import { TextField } from '@/components/forms/TextField';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form className="space-y-4">
        <TextField name="email" label="Email" />
        <TextField name="password" label="Password" />

        <Button type="submit">Login</Button>
      </form>
    </FormProvider>
  );
}
