"use client";
import React, { useState, useEffect } from "react";
import { MovieModel } from "../model/model";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { storeMovie } from "@/app/recoil/atom/storeMovie";
import { modifyMovieName, shortifyText } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface BoxItem {
  movie: MovieModel;
  num: number;
}

const MovieBox = ({ movie, num }: BoxItem) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [selectedMovie, setSelectedMovie] = useRecoilState(storeMovie);
  const handleMovieSelection = () => {
    setSelectedMovie(movie);
    router.push(`/Movie/${encodeURIComponent(movie._id + "-" + movie.title)}`);
  };

  return (
    <div className="group relative bg-[rgba(255,255,255,0.06)] backdrop-blur-sm flex border-textWhite border-2 rounded-lg overflow-hidden">
      <div className="absolute top-0 left-0 w-[1000px] h-full ">
        <svg
          width="800"
          height="261"
          viewBox="0 0 800 261"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="-15.1351"
            cy="35.416"
            rx="346.667"
            ry="208.646"
            fill="url(#paint0_radial_154_50)"
            fillOpacity="0.8"
          />
          <ellipse
            cx="528.288"
            cy="177.85"
            rx="449.009"
            ry="210.186"
            fill="url(#paint1_radial_154_50)"
            fillOpacity="0.8"
          />
          <defs>
            <radialGradient
              id="paint0_radial_154_50"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(-15.1351 35.416) rotate(89.8568) scale(208.647 346.666)"
            >
              <stop stopColor="#F80F00" stopOpacity="0.22" />
              <stop offset="1" stopColor="#984724" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="paint1_radial_154_50"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(528.288 177.85) rotate(89.8159) scale(210.187 449.008)"
            >
              <stop stopColor="#68F9EB" stopOpacity="0.2" />
              <stop offset="1" stopColor="#68F9EB" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <img
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        src={movie.images.postor}
        alt=""
        className="h-[240px] object-contain"
      />
      <div className="relative flex flex-col gap-2 p-4 pt-2 pb-2 flex-1">
        <p className="text-2xl text-primary">
          {num < 10 ? "0" + (num + 1) : num + 1}
        </p>
        <div className="flex h-full flex-col gap-2 justify-between pb-2">
          <p className="text-md font-bold">{movie.title}</p>
          <div className="flex flex-col gap-2 text-base">
            <div className="flex items-center gap-2 text-yellow-300">
              <FaStar />
              <p>{movie.rating} / 10</p>
            </div>
            <p className="flex-[0.8] break-words text-xs text-primary">
              {shortifyText(movie.genre, 30)}
            </p>
          </div>
        </div>

        {/* <Link href={`/Movie/${modifyMovieName(movie.title)}`} onClick={(e) => handleMovieSelection(e)}> */}
        <button
          className="absolute flex justify-center items-center bottom-0 right-0 h-[48px] w-[48px] border-l-2 border-t-2 border-white rounded-md text-md group-hover:bg-white group-hover:text-primary transition-all"
          onClick={() => handleMovieSelection()}
        >
          <FaArrowRight />
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default MovieBox;
