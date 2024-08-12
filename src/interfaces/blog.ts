export interface BlogImage {
  url: string;
  public_id: string;
  _id: string;
}

export interface Author {
  username: string;
  email: string;
  _id: string;
}

export interface BlogInterface {
  _id: string;
  heading: string;
  content: string;
  blogImage: BlogImage;
  author: Author;
  blogCategory: string;
  subHeading: string;
  createdAt: string;
  totalLikes: number;
  isUserLiked: boolean;
}

// src/types/FormData.ts
export interface IFormInput {
  heading: string;
  subHeading: string;
  content: string;
  blogCategory: string;
  blogImage?: File | null;
}
