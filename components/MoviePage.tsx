"use client";
import React, { useState, useEffect } from "react";
import MovieHero from "./MovieHero";
import MovieReviews from "./MovieReviews";
import MovieMedia from "./MovieMedia";
import { useParams } from "next/navigation";
import { getMovieData } from "@/lib/utils";
import { useRecoilState } from "recoil";
import { storeMovie } from "@/app/recoil/atom/storeMovie";
import { MovieModel } from "@/model/model";

const MoviePage = () => {
  const params = useParams();
  console.log("params: ", params);
  const [movie, setMovie] = useRecoilState<MovieModel>(storeMovie);
  const [movieId, setMovieId] = useState("");

  useEffect(() => {
    setMovieId(decodeURIComponent(params.movieName.split("-")[0]));
  }, []);

  useEffect(() => {
    console.log("MoviePage useEffect[movieId] movieId ", movieId);

    const getmovieDetails = async (movieId: string) => {
      const movieData = await getMovieData(movieId);
      setMovie(movieData);
    };
    getmovieDetails(movieId);
  }, [movieId]);
  return (
    <div>
      {movie ? (
        <>
          <MovieHero />
          <MovieReviews />
          <MovieMedia />
        </>
      ) : null}
    </div>
  );
};

export default MoviePage;
