import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components";

const SocialAuthErrorHandler = () => {
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    setError(queryParams.get("error") || null);
  }, []);

  return (
    <div className="max-w-[400px] w-full">
      <h2 className="text-center mb-3">
        {error ? error : "Please try again."}
      </h2>
      <div
        className="w-full"
        onClick={() => {
          navigate("/auth/login");
        }}
      >
        <Button fullWidth>Go back to Login</Button>
      </div>
    </div>
  );
};

export default SocialAuthErrorHandler;
