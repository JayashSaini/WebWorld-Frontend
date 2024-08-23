import React, { useEffect, useRef, useState } from "react";
import { CommentInterface } from "../../interfaces";
import Button from "../Button";
import { formatRelativeTime, requestHandler } from "../../util";
import {
  addLessonComment,
  deleteLessonComment,
  getLessonComments,
  updateLessonComment,
} from "../../api";
import { useAuth } from "../../context/auth.context";
import { toast } from "sonner";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import DropDown from "../DropDown";
import { TailSpin } from "react-loader-spinner";
import { useCourse } from "../../context/course.context";

const CommentCourse: React.FC = () => {
  const { lesson, isEnrolled } = useCourse();
  const [isAddButtonLoading, setIsAddButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [commentText, setCommentText] = useState<string>("");
  const [updateComment, setUpdateComment] = useState<CommentInterface | null>(
    null
  );
  const [comments, setComments] = useState<CommentInterface[]>([]);

  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [showUpdateCommentSection, setShowUpdateCommentSection] =
    useState(false);
  const [activeComment, setActiveComment] = useState<CommentInterface | null>(
    null
  );

  const { user } = useAuth();

  const editCommentRef = useRef<any>(null);

  useEffect(() => {
    if (lesson) {
      requestHandler(
        async () => getLessonComments(lesson?._id),
        setIsLoading,
        ({ data }) => {
          setComments(data);
          setCommentText("");
        },
        (err) => console.log("Error fetching comments:", err)
      );
    }
  }, [lesson]);

  // FOR ADDING COMMENT TO THE LESSON
  const handleAddComment = async (comment: string) => {
    if (lesson) {
      await requestHandler(
        async () => await addLessonComment(lesson?._id, comment),
        setIsAddButtonLoading,
        (res) => {
          const newComment: CommentInterface = {
            ...res.data,
            owner: {
              username: user?.username || "Guest",
              avatar: {
                url: user?.avatar?.url || "https://example.com/avatar.jpg",
                _id: user?._id || "6005175035172",
                public_id: user?.avatar?.public_id || "600517503517278752",
              },
              _id: user?._id || "600517503517278752",
            },
          };
          setComments((prev) => [...prev, newComment]);
          setCommentText("");
        },
        (err) => console.log("Error adding comment:", err)
      );
    }
  };

  // FOR UPDATING COMMENT TO THE LESSON
  const handleUpdateComment = async (
    comment: CommentInterface,
    updateCommentText: string
  ) => {
    if (lesson) {
      await requestHandler(
        async () =>
          await updateLessonComment(comment._id || "", updateCommentText),
        setIsAddButtonLoading,
        (res) => {
          setComments((prev) => {
            // Find the index of the comment to update
            const idx = prev.findIndex((cmt) => cmt._id === comment._id);

            // If the comment is found, create a new array with the updated comment
            if (idx !== -1) {
              const updatedComments = [...prev];
              updatedComments[idx] = {
                ...updatedComments[idx],
                comment: res.data.comment,
                updatedAt: res.data.updatedAt,
              };
              return updatedComments;
            }

            // If the comment is not found, return the previous state unchanged
            return prev;
          });

          setCommentText("");
        },
        (err) => console.log("Error edit comment:", err)
      );
    }
  };

  //   FOR SORTING COMMENT OLDEST AND RECENT
  const handleSortComments = () => {
    if (sortOrder === "recent") {
      setComments((prev) =>
        [...prev].sort(
          (a, b) =>
            new Date(b.updatedAt ?? "1970-01-01T00:00:00Z").getTime() -
            new Date(a.updatedAt ?? "1970-01-01T00:00:00Z").getTime()
        )
      );
    } else {
      setComments((prev) =>
        [...prev].sort(
          (a, b) =>
            new Date(a.updatedAt ?? "1970-01-01T00:00:00Z").getTime() -
            new Date(b.updatedAt ?? "1970-01-01T00:00:00Z").getTime()
        )
      );
    }
  };

  const handleToggleMenu = (comment: CommentInterface | null) => {
    if (activeComment === comment) {
      setActiveComment(null); // Close the dropdown if the same comment is clicked
    } else {
      setActiveComment(comment); // Open the dropdown for the clicked comment
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    requestHandler(
      async () => await deleteLessonComment(commentId),
      setIsLoading,
      () => {
        setComments((prev) => prev.filter((c) => c._id !== commentId));
      },
      () => toast.error("Failed to delete comment")
    );
  };

  const showUpdateCommentSectionHandler = (comment: CommentInterface) => {
    setUpdateComment(comment);
    setCommentText(comment.comment || "");
    setShowUpdateCommentSection(true);
    editCommentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return isLoading ? (
    <div className="w-full h-[500px] flex justify-center items-center custom-main-bg">
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
    </div>
  ) : (
    <div>
      {!isEnrolled && (
        <h2 className="sm:text-2xl text-base font-bold custom-font">
          Lesson Discussion
        </h2>
      )}
      {isEnrolled && !showUpdateCommentSection && (
        <>
          <h2 className="sm:text-2xl text-base  custom-font">
            Lesson Discussion
          </h2>

          <textarea
            className="w-full bg-transparent h-24 p-2 border border-neutral-500 rounded-md focus:outline-none focus:border-[#ef6c35] duration-200 ease-linear mt-1"
            placeholder="Enter your discussion..."
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
          />

          <Button
            disabled={commentText.trim() === ""}
            fullWidth={false}
            className="mt-4"
            size="small"
            isLoading={isAddButtonLoading}
            onClick={async () => {
              if (commentText.trim() === "" || !commentText) {
                return toast.error("Please enter a comment");
              }
              await handleAddComment(commentText);
            }}
          >
            POST DISCUSSION
          </Button>
        </>
      )}

      {isEnrolled && showUpdateCommentSection && (
        <div ref={editCommentRef}>
          <h2 className="sm:text-2xl text-base font-bold custom-font">
            Edit Your Comment
          </h2>

          <textarea
            className="w-full bg-transparent h-24 p-2 border border-neutral-500 rounded-md focus:outline-none focus:border-[#ef6c35] duration-200 ease-linear mt-1"
            placeholder="Edit your discussion..."
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
          />

          <Button
            disabled={commentText.trim() === ""}
            fullWidth={false}
            className="mt-4"
            size="small"
            isLoading={isAddButtonLoading}
            onClick={async () => {
              if (commentText.trim() === "" || !commentText) {
                return toast.error("Please enter comment");
              }
              if (updateComment) {
                await handleUpdateComment(updateComment, commentText);
              }
              setShowUpdateCommentSection(false);
            }}
          >
            Save
          </Button>
        </div>
      )}

      {comments.length > 0 ? (
        <div className="w-full h-full mt-5">
          <div className="w-full flex justify-end">
            <button
              className="flex items-center gap-1 py-2 px-3 text-white bg-[rgba(255,255,255,0.16)] rounded-sm sm:text-sm text-xs  my-2 border-[1px] border-neutral-700 hover:border-neutral-400 duration-200 ease-linear "
              onClick={() => {
                handleSortComments();
                setSortOrder((prev) =>
                  prev === "recent" ? "oldest" : "recent"
                );
              }}
            >
              {sortOrder === "recent" ? (
                <FaLongArrowAltUp />
              ) : (
                <FaLongArrowAltDown />
              )}{" "}
              {sortOrder === "recent" ? "Most Recent" : "Oldest"}
            </button>
          </div>
          <ul className="w-full h-full">
            {comments.map((comment, index) => {
              return (
                <li key={index} className="w-full h-full py-3 custom-color">
                  <div className="w-full flex justify-between">
                    <div className="w-[90%] flex  gap-3">
                      <img
                        className="h-9 w-9 rounded-full"
                        src={comment?.owner?.avatar?.url || ""}
                        alt="avatar"
                      />
                      <div className="w-full">
                        <div className="flex gap-2 items-start ">
                          <p className="sm:text-base text-sm">
                            {comment?.owner?.username}
                          </p>
                          <p className="sm:text-sm text-xs text-neutral-300">
                            {formatRelativeTime(comment?.updatedAt || "")}
                          </p>
                        </div>
                        <div className="w-full flex mt-1">
                          <p className="text-[14px] w-full break-words whitespace-pre-line">
                            {comment?.comment}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-[10%] relative">
                      <IoMdMore
                        onClick={() => {
                          handleToggleMenu(comment);
                        }}
                        className="cursor-pointer text-white text-xl"
                      />
                      {activeComment === comment && (
                        <DropDown
                          deleteComment={handleDeleteComment}
                          toggleMenu={handleToggleMenu}
                          editComment={showUpdateCommentSectionHandler}
                          selectedComment={activeComment}
                          user={user}
                        />
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="w-full h-[200px] flex items-center justify-center mt-5">
          <p>No discussions yet</p>
        </div>
      )}
    </div>
  );
};

export default CommentCourse;
