import { Link } from "react-router-dom";
import BlogSection from "../../../components/Blogs/BlogSection";

const MyBlogs = () => {
  return (
    <div className="w-full max-w-screen-xl min-h-screen md:pt-24 p-5 m-auto">
      <div className="w-full mb-16">
        <h1 className="md:text-4xl text-xl text-white text-center">My Blogs</h1>
      </div>

      <Link
        to="/dashboard/create-blog"
        className=" py-2 px-5 border-[#ef6c35] border-[1px] text-base text-white hover:text-[#12332f] rounded hover:bg-[#ef6c35] duration-150 ease-in-out"
      >
        Create Blogs
      </Link>
      <div className="w-full my-8">
        <BlogSection blogsType={"myBlogs"} />
      </div>
    </div>
  );
};

export default MyBlogs;
