export interface ProfileInterface {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface ThumbnailInterface {
  url: string;
  public_id: string;
  _id: string;
}

export interface CourseInterface {
  _id: string;
  thumbnail: ThumbnailInterface;
  title: string;
  subTitle: string;
  about: string;
  syllabus: string[]; // Array of syllabus IDs
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface CourseDetailInterface extends CourseInterface {
  lessonTitles: [
    {
      _id: string;
      title: string;
    }
  ];
}

export interface Video {
  url: string;
  title: string;
  _id: string;
}

export interface CourseLessonInterface {
  _id: string;
  courseId: string;
  title: string;
  subHeading: string;
  video: Video;
  createdAt: string; // Use Date if you want to work with Date objects
  updatedAt: string; // Use Date if you want to work with Date objects
  __v: number;
  totalLikes: number;
  isUserLiked: boolean;
}

export interface CommentInterface {
  _id?: string;
  comment?: string;
  commentBy?: string;
  syllabusId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  owner?: {
    _id: string;
    avatar: {
      url: string;
      public_id: string;
      _id: string;
    };
    username: string;
  };
}
