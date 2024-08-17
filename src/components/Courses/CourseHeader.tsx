import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CourseHeader: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();

  const searchHandler = () => {
    if (query.trim() === "") {
      toast.error("Please enter a search query");
    } else {
      navigate("/dashboard/courses/all?show=search-results&query=" + query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  return (
    <div className="w-full py-2 mb-6 px-2 border-b-[1px] border-b-neutral-700">
      <div className="group relative sm:w-[300px] w-full">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="search-icon"
          onClick={searchHandler}
        >
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>

        <input
          id="query"
          className="input pl-10 w-full bg-neutral-900 text-neutral-100 placeholder-neutral-400 focus:outline-none"
          type="search"
          placeholder="Search..."
          name="searchbar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            WebkitAppearance: "none",
            colorScheme: "dark", // This ensures the clear button uses the dark theme colors
          }}
        />
      </div>
    </div>
  );
};

export default CourseHeader;
