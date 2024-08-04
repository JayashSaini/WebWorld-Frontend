import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userResetPasswordSchema } from "../../util/schema";
import { useAuth } from "../../context/auth.context";
import { toast } from "sonner";

// Defining form input interface
interface IFormInput {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetPassword } = useAuth();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid token. Please try again.");
      navigate("/auth/login");
    }
  }, [token, navigate]);

  // Setting up React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(userResetPasswordSchema),
  });

  const onSubmit = async (data: IFormInput) => {
    if (token) {
      await resetPassword({
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center items-center gap-3 flex-col"
      >
        <h1 className="md:text-4xl text-2xl text-center md:my-4 text-white custom-font">
          Reset Password
        </h1>
        {/* Input for entering the new password */}
        <div className="w-full">
          <Input
            placeholder="Enter the New Password..."
            type="password"
            {...register("newPassword")}
            required
          />
          {errors.newPassword && (
            <p className="text-red-500">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="w-full">
          <Input
            placeholder="Enter the Confirm Password..."
            type="password"
            {...register("confirmPassword")}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        {/* Button to initiate the password change process */}
        <div className="w-full mt-3">
          <Button fullWidth>Change Password</Button>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
