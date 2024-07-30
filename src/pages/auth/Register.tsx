// Importing necessary components and hooks
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button } from "../../components/index.ts";
import { useAuth } from "../../context/auth.context.tsx";
import { userRegisterSchema } from "../../util/schema.ts";

// Defining form input interface
interface IFormInput {
  username: string;
  email: string;
  password: string;
}

// Component for the Register page
const Register: React.FC = () => {
  // Accessing the login function from the AuthContext
  const { register: authRegister } = useAuth();

  // Setting up React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(userRegisterSchema),
  });

  // Function to handle the login process
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await authRegister(data);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto sm:w-1/2 w-full sm:p-8 p-4 flex justify-center items-center gap-5 flex-col shadow-md rounded-2xl my-16 border-[#ef6c35] border-[1px]"
      >
        <h1 className="md:text-3xl text-2xl text-center my-4 text-white custom-font">
          Sign Up
        </h1>
        {/* Input for entering the email */}
        <div className="w-full">
          <Input
            placeholder="username"
            {...register("username")}
            required={true}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="w-full">
          <Input
            placeholder="email"
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
            placeholder="password"
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
          Already have an account?{" "}
          <a className="text-blue-400 hover:underline" href="/auth/login">
            Login
          </a>
        </small>
      </form>
    </div>
  );
};

export default Register;
