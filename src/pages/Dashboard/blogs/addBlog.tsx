import "quill/dist/quill.snow.css";
import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import Quill from "quill";
import { addBlog } from "../../../api";
import { TailSpin } from "react-loader-spinner";
import { requestHandler } from "../../../util";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddBlog: React.FC = () => {
  const [heading, setHeading] = useState<string>("");
  const [subHeading, setSubHeading] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [blogCategory, setBlogCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstanceRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current) {
      quillInstanceRef.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
          ],
        },
        placeholder: "Content",
      });

      quillInstanceRef.current.on("text-change", () => {
        setContent(quillInstanceRef.current?.root.innerHTML || "");
      });
    }
  }, []);

  const addBlogHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!heading || !subHeading || !content || !blogCategory || !blogImage) {
      toast.error("All fields are required");
      return;
    }

    const formData: any = new FormData();
    formData.append("heading", heading);
    formData.append("subHeading", subHeading);
    formData.append("content", content);
    formData.append("blogImage", blogImage);
    formData.append("blogCategory", blogCategory);

    await requestHandler(
      async () => await addBlog(formData),
      setIsLoading,
      () => {
        resetForm();
        navigate("/dashboard/blogs");
        toast.success("Blog created successfully!");
      },
      (message: string) => {
        toast.error(message);
      }
    );
  };

  const resetForm = () => {
    setHeading("");
    setSubHeading("");
    setContent("");
    setBlogImage(null);
    setBlogCategory("");
    quillInstanceRef.current?.setContents([]);
  };

  return (
    <div className="w-full min-h-screen p-4 ">
      <form
        onSubmit={addBlogHandler}
        className="md:p-6 p-3 rounded-lg shadow-lg max-w-screen-md w-full mx-auto"
      >
        <h1 className="text-3xl text-center mb-4 font-bold text-neutral-200">
          Create Blog
        </h1>
        <label htmlFor="heading" className="text-white text-sm py-5">
          Heading
        </label>
        <input
          type="text"
          id="heading"
          placeholder="Enter blog post heading"
          value={heading}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setHeading(e.target.value)
          }
          className="w-full py-3 px-4 mb-4 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffffff91] text-white rounded"
        />
        <label htmlFor="subheading" className="text-white text-sm py-5">
          Sub Heading
        </label>
        <textarea
          id="subheading"
          placeholder="Sub Heading"
          value={subHeading}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setSubHeading(e.target.value)
          }
          className="w-full py-3 px-4 mb-4 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffffff91] text-white rounded"
          rows={4}
        />
        <label htmlFor="category" className="text-white text-sm py-5">
          Blog Category
        </label>
        <input
          type="text"
          id="category"
          placeholder="News, Sports or Technology"
          value={blogCategory}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBlogCategory(e.target.value)
          }
          className="w-full py-3 px-4 mb-4 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffffff91] text-white rounded"
        />
        <label htmlFor="image" className="text-white text-sm py-5">
          Blog Image
        </label>
        <input
          type="file"
          id="image"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBlogImage(e.target.files?.[0] || null)
          }
          className="w-full py-3 px-4 mb-4 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffffff91] text-white rounded"
        />
        <label htmlFor="content" className="text-white text-sm py-5">
          Content
        </label>
        <div ref={quillRef} className="custom-quill rounded"></div>
        <div className="flex justify-center md:flex-row flex-col items-center md:gap-5 ">
          <button
            type="reset"
            onClick={resetForm}
            className="w-full py-3 border-[#ef6c35] border-[1px] text-white rounded hover:bg-[#ef6c35] mt-8 flex justify-center items-center duration-200 ease-in"
          >
            Reset Content
          </button>
          <button
            type="submit"
            className="w-full py-3 bg-[#ef6c35] text-white rounded hover:bg-[#ef6c35] mt-8 flex justify-center items-center"
          >
            {isLoading ? (
              <TailSpin
                visible={true}
                height="30"
                width="30"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Create Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
