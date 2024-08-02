import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components";
import { toast } from "sonner";
import { useAuth } from "../../context/auth.context";

const SocialAuthCallback = () => {
  const { accessToken, refreshToken } = useParams();
  const navigate = useNavigate();
  const { setUserState } = useAuth();

  useEffect(() => {
    if (!(accessToken && refreshToken)) {
      toast.error("Google Sign in Failed please try again.");
      navigate("/auth/login");
    } else {
      setUserState(accessToken);
    }
  });

  return <Loader />;
};

export default SocialAuthCallback;
