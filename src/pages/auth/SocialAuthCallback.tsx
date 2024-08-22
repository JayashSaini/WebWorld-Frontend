import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components";
import { toast } from "sonner";
import { useAuth } from "../../context/auth.context";
import { LocalStorage, requestHandler } from "../../util";
import { refreshAccessTokenRequest } from "../../api";

const SocialAuthCallback = () => {
  const { accessToken, refreshToken } = useParams();
  const navigate = useNavigate();
  const { SetUserStateByToken } = useAuth();

  useEffect(() => {
    if (!(accessToken && refreshToken)) {
      toast.error("Google Sign in Failed please try again.");
      navigate("/auth/login");
    } else {
      setState();
    }
  }, []);

  const setState = async () => {
    await requestHandler(
      async () => await refreshAccessTokenRequest(refreshToken),
      null,
      async ({ data }) => {
        LocalStorage.set("token", data.accessToken);
        await SetUserStateByToken(data.accessToken);
      },
      () => {
        toast.error("Failed to refresh token. Please Login!");
        LocalStorage.clear();
        navigate("/auth/login");
      }
    );
  };

  return <Loader />;
};

export default SocialAuthCallback;
