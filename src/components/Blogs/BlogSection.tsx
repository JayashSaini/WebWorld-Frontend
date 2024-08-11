import React, { useEffect, useState, useCallback } from "react";
import BlogCard from "./BlogCard";
import { getAllBlogs, getFavoritesBlog, getMyBlogs } from "../../api";
import { requestHandler } from "../../util";
import { TailSpin } from "react-loader-spinner";
import { BlogInterface as Blog, BlogInterface } from "../../interfaces/blog";

interface BlogSectionProps {
  blogsType: "favorites" | "myBlogs" | "trending" | "latest";
}

const BlogSection: React.FC<BlogSectionProps> = ({ blogsType }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [showMoreLoader, setShowMoreLoader] = useState<boolean>(false);
  const limit = 6;
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  const blogsHandler = useCallback(async () => {
    await requestHandler(
      async () => await getAllBlogs(blogsType, page, limit),
      setShowMoreLoader,
      (data) => {
        setBlogs((prev) => {
          const currentBlogs = [...prev, ...data.data.blogs];
          setIsShowMore(data.data.totalBlogs > currentBlogs.length);
          return currentBlogs;
        });
      },
      (message) => {
        // Handle error message display (toast.error(message))
        console.error(message);
      }
    );
  }, [blogsType, page, limit]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (blogsType === "favorites") {
          await requestHandler(
            async () => await getFavoritesBlog(page, limit),
            setShowMoreLoader,
            (data) => {
              setBlogs((prev) => {
                const currentBlogs = [...prev, ...data.data.blogs];
                setIsShowMore(data.data.totalBlogs > currentBlogs.length);
                return currentBlogs;
              });
            },
            (message) => {
              // Handle error message display (toast.error(message))
              console.error(message);
            }
          );
        } else if (blogsType === "myBlogs") {
          await requestHandler(
            async () => await getMyBlogs(page, limit),
            setShowMoreLoader,
            (data) => {
              setBlogs((prev) => {
                const currentBlogs = [...prev, ...data.data.blogs];
                setIsShowMore(data.data.totalBlogs > currentBlogs.length);
                return currentBlogs;
              });
            },
            (message) => {
              // Handle error message display (toast.error(message))
              console.error(message);
            }
          );
        } else {
          await blogsHandler();
        }
      } catch (error: any) {
        console.error("Error fetching blogs:", error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [blogsType, page, limit, blogsHandler]);

  return isLoading ? (
    <div className="w-full min-h-[300px] flex items-center justify-center">
      <TailSpin
        visible={true}
        height="50"
        width="50"
        color="#fff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  ) : (
    <div>
      {blogs.length > 0 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-20">
          {blogs.map((blog: BlogInterface) => (
            <BlogCard key={blog._id} data={blog} />
          ))}
        </div>
      ) : (
        <div className="w-full h-40 flex justify-center items-center ">
          No Blogs here.
        </div>
      )}
      {isShowMore &&
        (showMoreLoader ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <TailSpin
              visible={true}
              height="50"
              width="50"
              color="#fff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <div className="w-full mt-20 flex items-center justify-center ">
            <button
              className="py-2 px-5 border-[#fff] border-[1px] text-base text-white  rounded  duration-150 ease-in-out"
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
            >
              Show more
            </button>
          </div>
        ))}
    </div>
  );
};

export default BlogSection;
