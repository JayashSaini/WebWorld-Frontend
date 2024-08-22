import { useEffect, useState } from "react";
import { refreshAccessTokenRequest } from "../../api";
import { Button } from "../../components";
import { LocalStorage, requestHandler } from "../../util";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const RefreshToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const localStorageToken = LocalStorage.get("token");

  toast.info("Your token has expired. Click the button to refresh it.");

  useEffect(() => {
    if (!token || token.trim() === "") {
      toast.error("Invalid refresh token. Please Login!");
      LocalStorage.clear();
      navigate("/auth/login");
    } else if (token !== localStorageToken) {
      toast.error("Invalid refresh token. Please Login!");
      LocalStorage.clear();
      navigate("/auth/login");
    }
  }, [token, navigate, localStorageToken]);

  const refreshTokenHandler = async () => {
    await requestHandler(
      async () => refreshAccessTokenRequest(),
      setIsLoading,
      ({ data }) => {
        LocalStorage.set("token", data.accessToken);
        navigate("/dashboard/courses");
      },
      () => {
        toast.error("Failed to refresh token. Please Login!");
        LocalStorage.clear();
        navigate("/auth/login");
      }
    );
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Button
        fullWidth={false}
        isLoading={isLoading}
        onClick={refreshTokenHandler}
      >
        Refresh Token
      </Button>
    </div>
  );
};

export default RefreshToken;
