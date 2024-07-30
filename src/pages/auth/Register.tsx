// Importing necessary components and hooks
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button } from "../../components/index.ts";
import { useAuth } from "../../context/auth.context.tsx";
import { userRegisterSchema } from "../../util/schema.ts";
import { Link } from "react-router-dom";
import google from "../../assets/google.svg";

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
      <div className="m-auto sm:max-w-screen-sm w-full p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex justify-center items-center gap-3 flex-col "
        >
          <h1 className="md:text-4xl text-2xl text-center md:my-4 text-white custom-font">
            Sign Up and Get Started{" "}
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
            <Button fullWidth>Sign in</Button>
          </div>
          {/* Link to the registration page */}
          <small className="text-zinc-300  text-sm mb-3">
            Already have an account?{" "}
            <Link className="text-blue-400 hover:underline" to="/auth/login">
              Login
            </Link>
          </small>
        </form>
        <Button severity="secondary">
          <img src={google} alt="" className="w-[38px]" />
          <span className="text-white">Sign in with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default Register;
