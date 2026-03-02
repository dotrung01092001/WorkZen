import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoginImage from "@/assets/login-image.png";
import { motion } from "framer-motion";

interface LoginForm {
  email: string;
  password: string;
}

export function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { login, loading } = useAuth();
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
    <motion.div
      className="flex w-full h-screen p-15"
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, type: "spring", stiffness: 50 }}
    >
      <img
        src={LoginImage}
        alt="Login"
        className="w-full h-full flex-4 object-cover"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-2 justify-center space-y-5  bg-[#c1cffd] p-20"
      >
        <h1 className="text-2xl font-bold text-center text-white">
          Sign into your account
        </h1>
        <input
          {...register("email")}
          placeholder="Email"
          className="input border-2 border-white rounded-md p-3 w-full outline-none"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="input border-2 border-white rounded-md p-3 w-full outline-none"
        />
        <button className="btn w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 py-3 rounded-md cursor-pointer " disabled={loading}>
          {loading ? 'LOGGIN IN ...' : 'LOGIN'}
        </button>
      </form>
    </motion.div>
  );
}
