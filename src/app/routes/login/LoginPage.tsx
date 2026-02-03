import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoginImage from "@/assets/login-image.png";

interface LoginForm {
  email: string;
  password: string;
}

export function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex w-full h-screen">
      <img
        src={LoginImage}
        alt="Login"
        className="w-full h-full flex-4 object-cover"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-2 justify-center h-screen mx-auto space-y-5 bg-[#cadcf9] p-20"
      >
        <h1 className="text-2xl font-bold text-center">
          Sign into your account
        </h1>
        <input
          {...register("email")}
          placeholder="Email"
          className="input border-2 border-black rounded-md p-3 w-full outline-none"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="input border-2 border-black rounded-md p-3 w-full outline-none"
        />
        <button className="btn w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 py-3 rounded-md cursor-pointer ">
          LOGIN
        </button>
      </form>
    </div>
  );
}
