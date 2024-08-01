import { useEffect, useState } from "react";
import { Button, Loader } from "../../components";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resendEmailVerificationRequest } from "../../api";

const EmailVerification = () => {
  const { email } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      toast.error("Please register first! ");
      navigate("/auth/register");
    }
  });

  const onResendMail = async () => {
    try {
      setIsLoading(true);
      if (email) {
        const res = await resendEmailVerificationRequest(email);
        const { data } = res;
        toast.message(data.message);
      }
    } catch (error) {
      toast.error(
        "Failed to resend verification link. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="sm:max-w-screen-sm w-full ">
        <h1 className="md:text-3xl text-2xl text-center md:my-4 text-white custom-font">
          Check your email for verification link
        </h1>
        <p className="text-base text-center">
          A verification link has been sent to your email address:{" "}
          <span className="text-[#f68c23]">{email}</span>
          <br />
          Please check your email and click on the link provided to complete
          your account registration.
        </p>
        <div className="mt-3 ">
          <Button onClick={onResendMail}>Resend Mail</Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
