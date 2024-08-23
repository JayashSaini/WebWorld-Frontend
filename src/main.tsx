import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AnimationProvider } from "./context/animation.context.tsx";
import { AuthProvider } from "./context/auth.context.tsx";
import { Toaster } from "sonner";
import { CourseProvider } from "./context/course.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <AnimationProvider>
        <CourseProvider>
          <App />
        </CourseProvider>
      </AnimationProvider>
    </AuthProvider>
    <Toaster position="bottom-right" duration={2000} />
  </BrowserRouter>
);
