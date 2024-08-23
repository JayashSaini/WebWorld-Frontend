// src/contexts/CourseContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { CourseDetailInterface, CourseLessonInterface } from "../interfaces";
import { toast } from "sonner";
import { requestHandler } from "../util";
import {
  getCourseById,
  getSyllabusById,
  toggleCourseLikeHandler,
} from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth.context";

interface CourseContextType {
  course: CourseDetailInterface | null;
  lesson: CourseLessonInterface | null;
  isEnrolled: boolean;
  isFavorite: boolean;
  isUserLiked: boolean;
  totalLikes: number | 0;
  setCourseHandler: (courseId: string) => Promise<void>;
  setLessonHandler: (courseId: string, lesson: string) => Promise<void>;
  ToggleLikedHandler: (lessonId: string) => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [course, setCourse] = useState<CourseDetailInterface | null>(null);
  const [lesson, setLesson] = useState<CourseLessonInterface | null>(null);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isUserLiked, setIsUserLiked] = useState<boolean>(false);
  const [totalLikes, setTotalLikes] = useState<number>(0);

  const navigate = useNavigate();
  const { user } = useAuth();

  const setCourseHandler = async (courseId: string) => {
    await requestHandler(
      async () => await getCourseById(courseId),
      null,
      ({ data }) => {
        setCourse(data);
      },
      (err) => {
        toast.error(err);
        // navigate("/dashboard/courses");
      }
    );
  };

  const setLessonHandler = async (courseId: string, lessonId: string) => {
    await requestHandler(
      async () => await getSyllabusById(courseId, lessonId),
      null,
      ({ data }) => {
        setLesson(data);
        setIsUserLiked(data?.isUserLiked);
        setTotalLikes(data?.totalLikes);
      },
      (err) => {
        toast.error(err);
        navigate("/dashboard/courses");
      }
    );
  };

  const ToggleLikedHandler = async (lessonId: string) => {
    setTotalLikes((prevLikes) => prevLikes + (isUserLiked ? -1 : 1));
    setIsUserLiked((prev) => !prev);

    await requestHandler(
      async () => await toggleCourseLikeHandler(lessonId),
      null,
      () => {},
      (e) => toast.error(e)
    );
  };

  useEffect(() => {
    if (user && course) {
      const courseId = course?._id;
      const isFavorite = user.favorites.find((f) => f === courseId);
      const isEnrolled = user.enrollments.find((e) => e === courseId);

      setIsFavorite(isFavorite == undefined || false ? false : true);
      setIsEnrolled(isEnrolled == undefined || false ? false : true);
    }
  }, [course, user]);

  return (
    <CourseContext.Provider
      value={{
        course,
        lesson,
        isEnrolled,
        isFavorite,
        isUserLiked,
        totalLikes,
        setCourseHandler,
        setLessonHandler,
        ToggleLikedHandler,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within an CourseProvider");
  }
  return context;
};
