import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AnimationProvider } from "./context/animation.context.tsx";
import { AuthProvider } from "./context/auth.context.tsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <AnimationProvider>
        <App />
      </AnimationProvider>
    </AuthProvider>
    <Toaster position="top-center" duration={2000} />
  </BrowserRouter>
);
