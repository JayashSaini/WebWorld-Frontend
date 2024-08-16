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
  lessonTitles: string[];
}
