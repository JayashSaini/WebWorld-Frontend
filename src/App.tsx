import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { About, Home } from "./pages";

function App() {
  return (
    <Routes>
      {/* Wrap all routes with Layout */}
      <Route path="/" element={<Layout />}>
        {/* Private routes */}
        <Route index={true} path="/" element={<Home />} />

        <Route index={true} path="/about" element={<About />} />

        {/* 404 page */}
        <Route
          path="*"
          element={
            <div className="w-full h-screen flex items-center justify-center">
              <h1 className="text-lg">404 Page not found | Not Design yet</h1>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
