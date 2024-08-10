import { useCallback, useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getBlogById, toggleBlogLike } from "../../../api";
import { toast } from "sonner";
import { requestHandler } from "../../../util";
import { useAuth } from "../../../context/auth.context";
import Loader from "../../../components/Loader";
import { BlogInterface as BlogData } from "../../../interfaces/blog";

const Blog: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<BlogData | {}>({});
  const [isUserLiked, setIsUserLiked] = useState<boolean>(false);
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  // Function to format the date
  const formatMongoDate = (createdAt: string): string => {
    const date = new Date(createdAt);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return `${formattedDate}`;
  };

  // Function to add paragraph spacing
  const addParagraphSpacing = (content: string, wordLimit: number): string => {
    if (!content) return "";
    const words = content.split(" ");
    const paragraphs: string[] = [];
    for (let i = 0; i < words.length; i += wordLimit) {
      const paragraph = words.slice(i, i + wordLimit).join(" ");
      paragraphs.push(paragraph);
    }
    return paragraphs.join("<br /><br />");
  };

  // Handler to toggle like
  const toggleLikeHandler = useCallback(async () => {
    if (blog) {
      await requestHandler(
        async () => await toggleBlogLike((blog as BlogData)._id),
        null,
        (data) => {
          toast.success(data.message);
        },
        (message) => {
          // Handle error message display (toast.error(message))
          console.error(message);
        }
      );
    }
  }, [blog]);

  useEffect(() => {
    if (blogId) {
      (async () => {
        await requestHandler(
          async () => await getBlogById(blogId),
          setIsLoading,
          (data) => {
            setBlog(data.data);
            setIsUserLiked(data.data.isUserLiked);
            setTotalLikes(data.data.totalLikes);
          },
          (message) => {
            // Handle error message display (toast.error(message))
            console.error(message);
          }
        );
      })();
    }
  }, [blogId]);

  const deleteHandler = async () => {
    if (blogId) {
      await requestHandler(
        async () => await deleteBlog(blogId),
        setIsLoading,
        (data) => {
          toast.success(data.message);
          navigate("/blogs");
        },
        (message) => {
          // Handle error message display (toast.error(message))
          console.error(message);
        }
      );
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full min-h-screen h-full md:pt-24 p-5">
      <div className="max-w-screen-md w-full h-full m-auto">
        <p className="text-sm text-gray-400 mb-2">
          {formatMongoDate((blog as BlogData).createdAt)} |{" "}
          {(blog as BlogData).blogCategory}
        </p>
        <h1 className="md:text-4xl text-xl font-medium">
          {(blog as BlogData).heading}
        </h1>
        <div className="my-6">
          <div className="flex items-center gap-4 justify-start">
            <div className="w-[43px] rounded-full overflow-hidden">
              <img
                src="https://res.cloudinary.com/dcvb5vgyf/image/upload/c_scale,h_500,w_500/oysy3d5lzxjzjp8am3bi.jpg"
                alt="avatar"
                className="w-full"
              />
            </div>
            <div>
              <h1 className="text-white">
                {(blog as BlogData).author?.username}
              </h1>
              <p className="text-sm text-gray-400 ">
                {(blog as BlogData).author?.email}
              </p>
            </div>
          </div>
        </div>
        <hr className="h-[1px] bg-slate-400" />
        <div className="flex gap-2 items-center justify-start">
          <div
            className="my-4 cursor-pointer"
            onClick={() => {
              if (isUserLiked) setTotalLikes((prev) => prev - 1);
              if (!isUserLiked) setTotalLikes((prev) => prev + 1);
              setIsUserLiked(!isUserLiked);
              toggleLikeHandler();
            }}
          >
            {isUserLiked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-[#ef6c35]" />
            )}
          </div>
          <p className="text-sm text-gray-400">{totalLikes} Likes</p>
        </div>
        <hr className="h-[1px] bg-slate-400" />
        <div className="my-6">
          <div
            className="text-white"
            dangerouslySetInnerHTML={{ __html: (blog as BlogData).content }}
          />
        </div>
        <div className="w-full my-4">
          <img
            src={(blog as BlogData).blogImage?.url}
            alt=""
            className="rounded-md"
          />
        </div>
        <div className="my-4">
          <p
            className="text-base text-white"
            dangerouslySetInnerHTML={{
              __html: addParagraphSpacing((blog as BlogData).subHeading, 100),
            }}
          ></p>
          <div className="my-6 flex items-center justify-between gap-4">
            <Link
              to="/blogs"
              className="text-sm text-[#ef6c35] hover:underline flex gap-2 items-center"
              target="_self"
            >
              <FaLongArrowAltLeft /> Back to blogs
            </Link>

            {user &&
              user._id &&
              user._id === (blog as BlogData).author?._id && (
                <button
                  className="py-2 px-5 bg-[#2e8f83] text-base text-white rounded hover:bg-[#34a394]"
                  onClick={deleteHandler}
                >
                  Delete Blog
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
