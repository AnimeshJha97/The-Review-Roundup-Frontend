import MovieData from "@/data/movieData";
import {
  MovieModel,
  MovieReviewSubmission,
  RegisterUserInterface,
  UserInterface,
} from "@/model/model";
import axios from "axios";
const backendUrl = "http://localhost:4000/api/v1";

export const shortifyText = (txt: string, len: number) => {
  if (txt.length > len) return txt.substring(0, len) + "...";

  return txt;
};

export const modifyMovieName = (name: string) => {
  return name.replace(" ", "+");
};

export const validateEmail = (email: string) => {
  let emailformat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email.match(emailformat)) return true;
  return false;
};

// export const modifyMovieData = (data) => {
//     let modifiedData = []
//     // for (let year in data) {
//     //     const yearData = data[year]; //object
//     //     console.log("year, yearData", year, yearData);

//     for (let cat in data) {
//         const catData = data[cat]; //array
//         console.log("cat, catData", cat, catData);
//         catData.map((movie, i) => {
//             let newMovieData = {
//                 releaseDate: `10-${i + 2}-2020`,
//                 writer: "",
//                 rating: ((Math.random() * 3) + 7).toFixed(1),
//                 votes: Math.round(Math.random() * 25665)
//             }
//             for (let movieKey in movie) {
//                 if (movieKey !== 'show_id' || movieKey !== 'date_added') {
//                     newMovieData[movieKey] = movie[movieKey];
//                 }
//             }
//             modifiedData.push(newMovieData)
//         })
//     }
//     // }

//     console.log(modifiedData);
// }

export const getMovieData = async (movieId: string): Promise<MovieModel> => {
  console.log("movieId", movieId);

  //   let foundData = MovieData.find((movie) => movie.title === movieName);
  let foundData = await axios.get(`${backendUrl}/movies/${movieId}`);
  console.log("getMovieData foundData", foundData);

  if (!foundData.data.data.movie) return {} as MovieModel;
  return foundData.data.data.movie;
};

export const getAllMovieData = async (
  page: number = 1,
  limit: number = 10,
  sort: string = "",
  query: string = ""
): Promise<MovieModel[]> => {
  let foundData;
  foundData = await axios.get(
    `${backendUrl}/movies?sort=${sort}&limit=${limit}&page=${page}${query}`
  );

  console.log("getAllMovieData foundData", foundData.data.data.movies);

  if (!foundData.data.data.movies) return [] as MovieModel[];

  return foundData.data.data.movies;
};

export const timeformatter = (time: string): string => {
  const duration = Number(time.split(" ")[0]);
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration % 60);
  if (hours > 0 && minutes > 0) return `${hours}hr ${minutes}min`;
  else if (hours > 0 && minutes < 0) return `${hours}hr`;
  else return `${minutes}min`;
};
export const ratingIdentifier = (rating: number) => {
  if (rating > 9) return "Fantastic";
  else if (rating > 7) return "Good";
  else if (rating > 5) return "Okay";
  else if (rating > 3) return "Bad";
  else return "Worst";
};

export const getLocalDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
};

export const getMovieReviews = async (
  movieId: string,
  pageNumber: number,
  limit: number = 4
) => {
  console.log(
    "getMovieReviews movieId pageNumber limit",
    movieId,
    pageNumber,
    limit
  );

  const foundData = await axios.get(
    `${backendUrl}/reviews?movieId=${movieId}&sort=-likes&page=${pageNumber}&limit=${limit}`
  );

  console.log(`reviews for movie ${movieId}`, foundData);

  return {
    reviews: foundData.data.data.reviews,
    total: foundData.data.total,
  };
};

export const getCurrentUser = async () => {
  const foundData = await axios.get(`${backendUrl}/user`);
};

export const createUser = async ({
  userName,
  email,
  password,
  avatar,
}: RegisterUserInterface) => {
  const body = {
    userName,
    email,
    password,
    avatar,
    role: "user",
  };

  const user = await axios.post(`${backendUrl}/auth/register`, body);

  if (!user) {
    return {
      status: false,
      message: "User Not Created",
    };
  }
  return {
    status: true,
    message: "User Successfully Created",
  };
};

export const getUserByUsername = async (userName: string) => {
  const user = await axios.get(
    `${backendUrl}/auth/userCheck?userName=${userName}`
  );
  console.log("getUserByUsername user", user);

  if (user.data.status === "fail") {
    return {
      status: false,
      data: null,
    };
  }
  let temp = user.data.data.user;
  console.log("getUserByUsername temp", temp);

  let obj: UserInterface;
  obj = {
    _id: temp._id,
    userName: temp.userName,
    email: temp.email,
    avatar: {
      url: temp.avatar.url,
    },
    status: temp.status,
    createdAt: temp.createdAt,
    role: temp.role,
  };
  console.log("getUserByUsername obj", obj);

  return {
    status: true,
    data: obj,
  };
};

export const getUserByEmail = async (email: string) => {
  const user = await axios.get(`${backendUrl}/auth/userCheck?email=${email}`);
  console.log("getUserByEmail user", user);

  if (user.data.status === "fail") {
    return {
      status: false,
      data: null,
    };
  }
  return {
    status: true,
    data: user.data.data.user,
  };
};

export const submitMovieReview = async (data: MovieReviewSubmission) => {
  const user = await getCurrentUser();
  const foundData = await axios.post(`${backendUrl}/review/new`, data);
};
