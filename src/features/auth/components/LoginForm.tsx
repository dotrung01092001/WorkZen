import { useForm, FormProvider } from 'react-hook-form';
import { TextField } from '@/components/forms/TextField';
import { AppButton } from '@/components/ui/AppButton';

export function LoginForm() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form className="space-y-4">
        <TextField name="email" label="Email" />
        <TextField name="password" label="Password" />

        <AppButton type="submit">Login</AppButton>
      </form>
    </FormProvider>
  );
}
