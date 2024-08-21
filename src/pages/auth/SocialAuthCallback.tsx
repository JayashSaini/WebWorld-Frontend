import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components";
import { toast } from "sonner";
import { useAuth } from "../../context/auth.context";

const SocialAuthCallback = () => {
  const { accessToken, refreshToken } = useParams();
  const navigate = useNavigate();
  const { SetUserStateByToken } = useAuth();

  useEffect(() => {
    if (!(accessToken && refreshToken)) {
      toast.error("Google Sign in Failed please try again.");
      navigate("/auth/login");
    } else {
      SetUserStateByToken(accessToken);
    }
  });

  return <Loader />;
};

export default SocialAuthCallback;
