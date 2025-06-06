// Importing necessary components and hooks
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button } from "../../components/index.ts";
import { useAuth } from "../../context/auth.context.tsx";
import { userRegisterSchema } from "../../util/schema.ts";
import { Link } from "react-router-dom";
import google from "../../assets/google.svg";
import { useState } from "react";

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
  const [isSSOLoader, setIsSSOLoader] = useState(false);

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
          Sign up and Get Started{" "}
        </h1>
        {/* Input for entering the email */}
        <div className="w-full">
          <Input
            placeholder="Enter your username"
            {...register("username")}
            required={true}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="w-full">
          <Input
            placeholder="Enter your email"
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
            placeholder="Password must be  8 characters "
            type="password"
            {...register("password")}
            required={true}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        {/* Button to initiate the login process */}
        <div className=" w-full mt-3">
          <Button fullWidth>Sign up</Button>
        </div>
        {/* Link to the registration page */}
        <small className="text-zinc-300  text-sm mb-3">
          Already have an account?{" "}
          <Link className="text-blue-400 hover:underline" to="/auth/login">
            Login
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

export default Register;
