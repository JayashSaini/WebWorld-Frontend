// Importing necessary components and hooks
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button } from "../../components";
import { useAuth } from "../../context/auth.context.tsx";
import { userLoginSchema } from "../../util/schema";
import { Link } from "react-router-dom";
import google from "../../assets/google.svg";
import { useState } from "react";

// Defining form input interface
interface IFormInput {
  email: string;
  password: string;
}

// Component for the Login page
const Login: React.FC = () => {
  // Accessing the login function from the AuthContext
  const [isSSOLoader, setIsSSOLoader] = useState(false);

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

  const onGoogleSignIn = async () => {
    setIsSSOLoader(true);
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URI
    }/api/v1/users/google`;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center items-center gap-3 flex-col "
      >
        <h1 className="md:text-4xl text-2xl text-center md:my-4 text-white custom-font">
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
          <small className="text-zinc-300  text-sm">
            <Link
              className="text-blue-400 hover:underline mt-3"
              to="/auth/forgot-password"
            >
              Forgot password?
            </Link>
          </small>
        </div>
        {/* Button to initiate the login process */}
        <div className="w-full mt-3">
          <Button fullWidth>Sign in</Button>
        </div>
        {/* Link to the registration page */}
        <small className="text-zinc-300  text-sm mb-3">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-400 hover:underline" to="/auth/register">
            Register
          </Link>
        </small>
      </form>
      <Button
        severity="secondary"
        onClick={onGoogleSignIn}
        isLoading={isSSOLoader}
      >
        <img src={google} alt="" className="w-[38px]" />
        <span className="text-white">Sign in with Google</span>
      </Button>
    </>
  );
};

export default Login;
