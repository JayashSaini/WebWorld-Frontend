// Importing necessary components and hooks
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button } from "../components";
import { useAuth } from "../context/auth.context";
import { userLoginSchema } from "../util/schema";

// Defining form input interface
interface IFormInput {
  email: string;
  password: string;
}

// Component for the Login page
const Login: React.FC = () => {
  // Accessing the login function from the AuthContext
  const { login } = useAuth();

  // Setting up React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(userLoginSchema),
  });

  // Function to handle the login process
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await login(data);
  };

  return (
    <div className="w-full py-44">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto sm:w-1/2 w-full sm:p-8 p-4 flex justify-center items-center gap-5 flex-col shadow-md rounded-2xl my-16 border-[#e8eaa1] border-[1px]"
      >
        <h1 className="md:text-3xl text-2xl text-center my-4 text-white custom-font">
          Sign In to your Account
        </h1>
        {/* Input for entering the email */}
        <div className="w-full">
          <Input
            placeholder="Enter the email..."
            type="email"
            {...register("email")}
            required={true}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        {/* Input for entering the password */}
        <div className="w-full">
          <Input
            placeholder="Enter the password..."
            type="password"
            {...register("password")}
            required={true}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        {/* Button to initiate the login process */}
        <Button fullWidth>Sign in</Button>
        {/* Link to the registration page */}
        <small className="text-zinc-300 md:text-base text-sm">
          Don&apos;t have an account?{" "}
          <a className="text-blue-400 hover:underline" href="/register">
            Register
          </a>
        </small>
      </form>
    </div>
  );
};

export default Login;
