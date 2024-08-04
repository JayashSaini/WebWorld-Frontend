import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button } from "../../components";
import { useAuth } from "../../context/auth.context.tsx";
import { Link } from "react-router-dom";
import { userForgotPasswordSchema } from "../../util/schema.ts";

// Defining the form input interface
interface IFormInput {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const { forgotPassword } = useAuth();

  // Setting up React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(userForgotPasswordSchema),
  });

  // Function to handle form submission
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await forgotPassword(data.email);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center items-center gap-3 flex-col "
      >
        <h1 className="md:text-4xl text-2xl text-center md:my-4 text-white custom-font">
          Forgot Password
        </h1>
        {/* Input for entering the email */}
        <div className="w-full">
          <Input
            placeholder="Enter the email..."
            type="email"
            {...register("email")}
            required
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        {/* Button to initiate the OTP process */}
        <div className="w-full mt-3">
          <Button fullWidth>Send OTP</Button>
        </div>
        {/* Link to the registration page */}
        <small className="text-zinc-300 text-sm mb-3">
          <Link className="text-blue-400 hover:underline" to="/auth/register">
            Back to login
          </Link>
        </small>
      </form>
    </>
  );
};

export default ForgotPassword;
