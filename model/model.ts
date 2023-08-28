export interface UserInterface {
  _id: string;
  userName: string;
  email: string;
  avatar: {
    url: string;
  };
  status: string;
  createdAt: string;
  role: string;
}
export interface RegisterUserInterface {
  userName: string;
  email: string;
  password: string;
  avatar: {
    url: string;
  };
}
export interface LoginUserInterface {
  userName: string;
  password: string;
}
export interface MovieModel {
  _id: string;
  title: string;
  releaseYear: number;
  rated: string;
  releaseDate: string;
  duration: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  country: string;
  description: string;
  images: {
    postor: string;
    banner: string;
    backdrops: string[];
  };
  rating: number;
  votes: number;
  type: string;
  video: string[];
  __v: number;
}
export interface MovieReview {
  _id: string;
  movieId: string;
  content: string;
  reviewDate: string;
  userId: string;
  userName: string;
  likes: number;
  dislikes: number;
  __v: number;
}
export interface MovieReviewSubmission {
  movieId: string;
  content: string;
  userId: string;
  userName: string;
}
