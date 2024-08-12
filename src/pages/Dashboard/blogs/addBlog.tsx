import "quill/dist/quill.snow.css";
import { useRef, useEffect, useState } from "react";
import Quill from "quill";
import { addBlog } from "../../../api";
import { TailSpin } from "react-loader-spinner";
import { requestHandler } from "../../../util";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogSchema } from "../../../util/schema";
import { IFormInput } from "../../../interfaces/blog";

const AddBlog: React.FC = () => {
  const navigate = useNavigate();
  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstanceRef = useRef<Quill | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(blogSchema),
    defaultValues: {
      heading: "",
      subHeading: "",
      content: "",
      blogCategory: "",
      blogImage: null,
    },
  });

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
        setValue("content", quillInstanceRef.current?.root.innerHTML || "");
      });
    }
  }, [setValue]);

  const addBlogHandler: SubmitHandler<IFormInput> = async (data) => {
    if (!data.blogImage) {
      toast.error("Image is required");
      return;
    }

    try {
      const isImgLandscape = await isLandscape(data.blogImage);
      if (!isImgLandscape) {
        toast.error("Image must be landscape.");
        return;
      }
    } catch (error) {
      toast.error("Error validating image dimensions.");
      return;
    }

    const formData: any = new FormData();
    formData.append("heading", data.heading);
    formData.append("subHeading", data.subHeading);
    formData.append("content", data.content);
    formData.append("blogImage", data.blogImage);
    formData.append("blogCategory", data.blogCategory);

    await requestHandler(
      async () => await addBlog(formData),
      (loading) => setIsLoading(loading),
      () => {
        reset();
        navigate("/dashboard/blogs");
        toast.success("Blog created successfully!");
      },
      (message: string) => {
        toast.error(message);
      }
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    console.log("Selected file:", file); // Debug log
    setValue("blogImage", file);
  };

  const isLandscape = (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };

      reader.onerror = (error) => reject(error);
      img.onload = () => {
        resolve(img.width > img.height);
      };
      img.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="w-full min-h-screen p-4">
      <form
        onSubmit={handleSubmit(addBlogHandler)}
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
          {...register("heading")}
          className="w-full py-3 px-4 mb-4 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffffff91] text-white rounded"
        />
        {errors.heading && (
          <p className="text-red-500">{errors.heading.message}</p>
        )}

        <label htmlFor="subheading" className="text-white text-sm py-5">
          Sub Heading
        </label>
        <textarea
          id="subheading"
          placeholder="Sub Heading"
          {...register("subHeading")}
          className="w-full py-3 px-4 mb-4 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffffff91] text-white rounded"
          rows={4}
        />
        {errors.subHeading && (
          <p className="text-red-500">{errors.subHeading.message}</p>
        )}

        <label htmlFor="category" className="text-white text-sm py-5">
          Blog Category
        </label>
        <input
          type="text"
          id="category"
          placeholder="News, Sports or Technology"
          {...register("blogCategory")}
          className="w-full py-3 px-4 mb-4 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffffff91] text-white rounded"
        />
        {errors.blogCategory && (
          <p className="text-red-500">{errors.blogCategory.message}</p>
        )}

        <label htmlFor="image" className="text-white text-sm py-5">
          Blog Image
        </label>
        <input
          type="file"
          id="image"
          onChange={handleFileChange} // Use custom handler for file input
          className="w-full py-3 px-4 mb-4 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffffff91] text-white rounded"
        />

        {errors.blogImage && (
          <p className="text-red-500">{errors.blogImage.message}</p>
        )}

        <label htmlFor="content" className="text-white text-sm py-5">
          Content
        </label>
        <div ref={quillRef} className="custom-quill rounded"></div>

        <div className="flex justify-center md:flex-row flex-col items-center md:gap-5">
          <button
            type="reset"
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
