// Importing necessary components and hooks
import { useState } from "react";
import { Input, Button } from "../../components";
import { useAuth } from "../../context/auth.context.tsx";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Component for the Login page
const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const { forgotPassword } = useAuth();

  // Function to handle the login process
  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) return toast.error("Please enter an email address.");
    forgotPassword(email);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="m-auto sm:max-w-screen-sm w-full ">
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
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
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Button to initiate the login process */}
          <div className="w-full mt-3">
            <Button fullWidth>Send OTP</Button>
          </div>
          {/* Link to the registration page */}
          <small className="text-zinc-300  text-sm mb-3">
            <Link className="text-blue-400 hover:underline" to="/auth/register">
              Back to login
            </Link>
          </small>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
