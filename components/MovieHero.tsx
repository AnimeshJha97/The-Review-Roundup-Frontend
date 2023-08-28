"use client";

import React, { useEffect, useState } from "react";
import Header from "@/sections/header";
import { ratingIdentifier, timeformatter } from "@/lib/utils";
import { MovieModel } from "@/model/model";
import { useRecoilValue } from "recoil";
import { storeMovie } from "@/app/recoil/atom/storeMovie";

const MovieHero = () => {
  const [actors, setActors] = useState<string[]>([]);
  const movie = useRecoilValue(storeMovie);
  return (
    <div>
      <Header overlay={false} />
      {movie && movie.images ? (
        <div className="relative h-[65vh] flex justify-center">
          <div className="h-[65vh] overflow-hidden">
            {/* <img src={movie.images.banner} alt="movie-poster" className='w-full object-contain' /> */}
            <div className="relative">
              <div
                style={{ backgroundImage: `url(${movie?.images.banner})` }}
                className="object-contain w-screen h-[65vh] bg-[center_top_-5rem] bg-cover blur-sm"
              />
              <div className="absolute top-0 left-0 w-full h-[65vh] bg-black opacity-70 "></div>
            </div>
            <div className="absolute top-0 left-0 text-textWhite w-full h-[65vh] flex items-center p-[120px] pt-4 pb-4 gap-12">
              <img
                src={movie.images.postor}
                className="rounded-md w-[360px] object-contain "
                alt=""
              />
              <div className="flex flex-col gap-4 justify-between">
                <div>
                  <p className="text-lg font-bold">
                    {movie.title}{" "}
                    <span className="font-light">({movie.releaseYear})</span>
                  </p>

                  <div className="flex gap-2 items-center">
                    <p className="pr-1 pl-1 border-[1px] rounded-sm text-gray-400 border-gray-400">
                      {movie.rated}
                    </p>
                    <p className="font-semibold">{movie.country}</p>
                    <div className="h-2 w-2 bg-textWhite border-textWhite rounded-full" />
                    <p className="font-semibold">{movie.genre}</p>
                    <div className="h-2 w-2 bg-textWhite border-textWhite rounded-full" />
                    <p>{timeformatter(movie.duration)}</p>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-md">Overview</p>
                  <p className="w-10/12">{movie.description}</p>
                </div>
                <div className="grid grid-cols-3">
                  {/* {actors.map((actor) => (
                                        <div key={actor}>
                                            <p>{actor}</p>
                                        </div>
                                    ))} */}
                  <div>
                    <p className="font-bold">
                      {movie.director ? movie.director : "NA"}
                    </p>
                    <p>Director</p>
                  </div>
                  <div>
                    <p className="font-bold">
                      {movie.writer ? movie.writer : "NA"}
                    </p>
                    <p>Writer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bottom-[-100px] absolute bg-primary"
            style={{
              width: "175px",
              height: "195px",
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          >
            <div
              className="absolute font-bold text-primary top-[50%] left-[50%] flex flex-col items-center justify-center translate-x-[-50%] translate-y-[-50%] bg-background"
              style={{
                width: "170px",
                height: "190px",
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
            >
              <div
                className="absolute bg-primary"
                style={{
                  width: "155px",
                  height: "175px",
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div
                  className="absolute font-bold text-primary top-[50%] left-[50%] flex flex-col items-center justify-center translate-x-[-50%] translate-y-[-50%] bg-background"
                  style={{
                    width: "140px",
                    height: "160px",
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <p className="text-2xl">{movie.rating}</p>
                  <p>{ratingIdentifier(Number(movie.rating))}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Movie Data Not Found</p>
      )}
    </div>
  );
};

export default MovieHero;
