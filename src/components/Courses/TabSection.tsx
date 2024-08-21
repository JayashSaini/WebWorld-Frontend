import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { CommentInterface, CourseLessonInterface } from "../../interfaces";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { requestHandler } from "../../util";
import {
  addLessonComment,
  deleteLessonComment,
  getLessonComments,
  toggleCourseLikeHandler,
  updateLessonComment,
} from "../../api";
import Button from "../Button";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";
import { formatRelativeTime } from "../../util";
import { IoMdMore } from "react-icons/io";
import { useAuth } from "../../context/auth.context";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import DropDown from "../DropDown";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface CourseTabSectionProps {
  lesson?: CourseLessonInterface;
  about?: string;
  isEnroll: boolean;
}

const CourseTabSection: React.FC<CourseTabSectionProps> = ({
  lesson,
  about,
  isEnroll,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddButtonLoading, setIsAddButtonLoading] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isUserLiked, setIsUserLiked] = useState(lesson?.isUserLiked);
  const [totalLikes, setTotalLikes] = useState<number | undefined>(
    lesson?.totalLikes || 0
  );
  const [commentText, setCommentText] = useState<string>("");
  const [updateComment, setUpdateComment] = useState<CommentInterface | null>(
    null
  );
  const [showUpdateCommentSection, setShowUpdateCommentSection] =
    useState(false);
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const { user } = useAuth();
  const editCommentRef = useRef<any>(null);
  const [activeComment, setActiveComment] = useState<CommentInterface | null>(
    null
  );

  const handleToggleMenu = (comment: CommentInterface | null) => {
    if (activeComment === comment) {
      setActiveComment(null); // Close the dropdown if the same comment is clicked
    } else {
      setActiveComment(comment); // Open the dropdown for the clicked comment
    }
  };

  const handleTabChange = (_: any, newIndex: number) => {
    setActiveTabIndex(newIndex);
  };

  const handleLikeToggle = async () => {
    if (isUserLiked) {
      setTotalLikes((prevLikes) => (prevLikes ? prevLikes - 1 : 0));
    } else {
      setTotalLikes((prevLikes) => (prevLikes ? prevLikes + 1 : 1));
    }
    await requestHandler(
      async () => await toggleCourseLikeHandler(lesson?._id || ""),
      null,
      () => {},
      () => {}
    );
    setIsUserLiked(!isUserLiked);
  };

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
                comment: comment.comment,
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

  const showUpdateCommentSectionHandler = (comment: CommentInterface) => {
    setUpdateComment(comment);
    setCommentText(comment.comment || "");
    setShowUpdateCommentSection(true);
    editCommentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTabIndex}
          onChange={handleTabChange}
          aria-label="course tabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#ef6c35",
              height: "2px",
            },
          }}
          className="bg-neutral-900"
        >
          <Tab
            label="About"
            {...a11yProps(0)}
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "12px",
              backgroundColor: "neutral.700",
              "&.Mui-selected": {
                color: "#fff",
              },
            }}
          />
          <Tab
            label="Discussions"
            {...a11yProps(1)}
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "12px",
              backgroundColor: "neutral.700",
              "&.Mui-selected": {
                color: "#fff",
              },
            }}
          />
        </Tabs>
      </Box>
      <CourseTabPanel value={activeTabIndex} index={0}>
        <h2 className="sm:text-2xl text-base font-medium">{lesson?.title}</h2>
        <p className="text-sm font-light mt-1 custom-color">
          {lesson?.subHeading}
        </p>

        <div className="inline-block my-2 ">
          <label
            className="flex gap-4 items-center  poppins"
            htmlFor="like-checkbox"
          >
            <div onClick={handleLikeToggle} className="cursor-pointer text-xl">
              {isUserLiked ? <AiFillLike /> : <AiOutlineLike />}
            </div>
            <span className="text-neutral-300 text-lg">{totalLikes}</span>
          </label>
        </div>
        <h3 className="sm:text-xl text-base font-medium custom-font mt-3">
          About This Course
        </h3>
        <p className="text-sm font-light mt-1 ">{about}</p>
      </CourseTabPanel>
      <CourseTabPanel value={activeTabIndex} index={1}>
        {!isEnroll && (
          <h2 className="sm:text-2xl text-base font-se custom-font">
            Lesson Discussion
          </h2>
        )}
        {isEnroll && !showUpdateCommentSection && (
          <>
            <h2 className="sm:text-2xl text-base font-se custom-font">
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

        {isEnroll && showUpdateCommentSection && (
          <div ref={editCommentRef}>
            <h2 className="sm:text-2xl text-base font-se custom-font">
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
      </CourseTabPanel>
    </Box>
  );
};

function CourseTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `course-tab-${index}`,
    "aria-controls": `course-tabpanel-${index}`,
  };
}

export default CourseTabSection;
