import React, { useEffect, useRef } from "react";
import { GrFlag } from "react-icons/gr";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";
import { UserInterface } from "../interfaces/user";
import { CommentInterface } from "../interfaces";

interface CommentOptionsMenuProps {
  selectedComment: CommentInterface;
  user: UserInterface | null;
  deleteComment: (id: string) => Promise<void>;
  editComment: (comment: CommentInterface) => void;
  toggleMenu: (comment: CommentInterface | null) => void;
}

const DropDown: React.FC<CommentOptionsMenuProps> = ({
  selectedComment,
  user,
  deleteComment,
  toggleMenu,
  editComment,
}) => {
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleMenu]);

  const handleReport = () => {
    toast.success("Report sent successfully");
    toggleMenu(null);
  };

  const handleDelete = async () => {
    toggleMenu(null);
    await deleteComment(selectedComment._id || "");
  };

  const handleUpdate = async () => {
    editComment(selectedComment);
    toggleMenu(null);
  };

  return (
    selectedComment && (
      <div className="absolute bg-neutral-900 rounded-md shadow-lg z-10 top-2 -translate-x-32  overflow-hidden border-[1px] border-neutral-700">
        <ul ref={dropdownRef}>
          {selectedComment.owner?._id !== user?._id ? (
            <li
              className=" px-5 py-2 text-white hover:bg-[#ef6d3570] cursor-pointer flex gap-4  items-center sm:text-base text-sm  border-t-[1px] border-t-neutral-600"
              onClick={handleReport}
            >
              <GrFlag /> Report
            </li>
          ) : (
            <>
              <li
                className=" px-5 py-2 text-white hover:bg-[#ef6d357c] cursor-pointer flex gap-4  items-center sm:text-base text-sm  border-t-[1px] border-t-neutral-600"
                onClick={handleUpdate}
              >
                <MdOutlineEdit className="sm:text-lg text-base " /> Edit
              </li>
              <li
                className=" px-5 py-2 text-white hover:bg-[#ef6d3577] cursor-pointer flex gap-4  items-center sm:text-base text-sm  border-t-[1px] border-t-neutral-600"
                onClick={handleDelete}
              >
                <MdDeleteOutline className="sm:text-lg text-base " /> Delete
              </li>
            </>
          )}
        </ul>
      </div>
    )
  );
};

export default DropDown;
