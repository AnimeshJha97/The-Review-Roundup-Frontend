"use client";

import { getLocalDate, shortifyText } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import {
  BsHandThumbsUp,
  BsHandThumbsUpFill,
  BsHandThumbsDown,
  BsHandThumbsDownFill,
} from "react-icons/bs";
import { MdOutlinePersonPinCircle } from "react-icons/md";
import { MovieReview } from "@/model/model";

interface movieReviewBoxPropType {
  review: MovieReview;
  handleTogglePopup: Function;
}

const MovieReviewBox = ({
  review,
  handleTogglePopup,
}: movieReviewBoxPropType) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLikeReview = () => {
    setIsLiked(!isLiked);
    setIsDisliked(false);
  };

  const handleDislikeReview = () => {
    setIsDisliked(!isDisliked);
    setIsLiked(false);
  };
  return (
    <div
      style={{ boxShadow: "0 2px 6px 0 rgba(255,255,255,0.3)" }}
      className="duration-150 relative flex flex-col gap-1 p-4 hover:border-[1px] hover:border-textWhite rounded-md overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-[1500px] h-full blur-lg opacity-60 z-10">
        <svg
          width="100%"
          height="400"
          viewBox="0 0 1000 400"
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
      <div className="relative w-full z-20">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4 mb-6">
            <MdOutlinePersonPinCircle className="text-xl" />
            <div>
              <p className="text-md font-bold">Review by {review.userName}</p>
              <p className="text-sm">
                Written on {getLocalDate(review.reviewDate)}
              </p>
            </div>
          </div>
          <div className="flex text-md items-center gap-4">
            <div onClick={() => handleLikeReview()}>
              {isLiked ? (
                <BsHandThumbsUpFill className="text-primary" />
              ) : (
                <BsHandThumbsUp className="hover:text-primary" />
              )}
            </div>
            <div onClick={() => handleDislikeReview()}>
              {isDisliked ? (
                <BsHandThumbsDownFill className="text-primary" />
              ) : (
                <BsHandThumbsDown className="hover:text-primary" />
              )}
            </div>
          </div>
        </div>
        <div className="w-[95%]">
          <p className="inline leading-7">
            {shortifyText(review.content, 380)}
          </p>
          {review.content.length > 380 ? (
            <button
              className=" ml-4 border-[1px] rounded-md opacity-70 p-2 pt-1 pb-1 text-sm"
              onClick={() => handleTogglePopup(review)}
            >
              View Full
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MovieReviewBox;
