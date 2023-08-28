"use client";

import React, { useEffect, useState } from "react";
import SectionMenu from "./SectionMenu";
import { useRecoilValue } from "recoil";
import { storeMovie } from "@/app/recoil/atom/storeMovie";
import { getLocalDate, getMovieReviews } from "@/lib/utils";
import { MdCancel, MdOutlinePersonPinCircle } from "react-icons/md";
import MovieReviewBox from "./MovieReviewBox";
import { MovieModel, MovieReview } from "@/model/model";

const menuOptions = ["Reviews", "Discussions"];

const MovieReviews = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Reviews");
  const [reviews, setReviews] = useState<MovieReview[]>([]);
  const [toggleReviewPopup, setToggleReviewPopup] = useState(false);
  const [reviewPopupData, setReviewPopupData] = useState<MovieReview>(
    {} as MovieReview
  );
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [paginationArr, setPaginationArr] = useState<number[]>([]);

  const [newReviewText, setNewReviewText] = useState("");
  const [reviewSubmitMessage, setReviewSubmitMessage] = useState(true);

  const movie = useRecoilValue(storeMovie);
  const movieId = movie._id;

  useEffect(() => {
    console.log("MoviesReviews movieId", movieId);

    const getReviews = async () => {
      const reviewsData = await getMovieReviews(movieId, selectedPage);
      console.log("getReviews reviewsData", reviewsData);
      setTimeout(() => {
        setReviews(reviewsData.reviews);
        const totalPages = reviewsData.total
          ? Math.floor(reviewsData.total / 5) + 1
          : 1;
        console.log("MovieReviews totalPages", totalPages);

        let arr = [];
        for (let i = 1; i <= totalPages; i++) {
          arr.push(i);
        }
        setPaginationArr([...arr]);
      }, 100);
    };
    getReviews();
  }, [movieId, selectedPage]);

  const handleTogglePopup = (review = {} as MovieReview) => {
    setReviewPopupData(review);
    setToggleReviewPopup(!toggleReviewPopup);
  };

  const handlePrev = () => {
    if (selectedPage > 1) {
      setSelectedPage(selectedPage - 1);
    }
  };
  const handleNext = () => {
    if (selectedPage < paginationArr.length) {
      setSelectedPage(selectedPage + 1);
    }
  };

  const handlePageNumberClick = (pageNo: number) => {
    if (pageNo != selectedPage) {
      setSelectedPage(pageNo);
    }
  };

  const handleCreateReviewTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setNewReviewText(e.target.value);
  };

  const handleReviewSubmit = async () => {
    const reviewReqBody = {
      movieId: movieId,
      content: newReviewText,
      // userId: "", //userId
      // userName: "", //userName
    };
    // call post reviews method form utils
    // const message = await
  };

  return (
    <div className="relative w-screen pt-[64px] pb-[64px] pl-[120px] pr-[120px] text-textWhite">
      <div className="flex justify-between items-center mb-4">
        <p className="text-[48px] font-bold mb-2">Social</p>
        <SectionMenu
          menu={menuOptions}
          setSelectedItem={setSelectedMenuItem}
          selectedItem={selectedMenuItem}
        />
      </div>
      {selectedMenuItem === "Reviews" ? (
        <div>
          <div
            className={toggleReviewPopup ? "flex gap-8 blur-sm" : "flex gap-8"}
          >
            <div className="flex-[1.6]">
              {reviews && reviews.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {reviews.map((review, reviewIndex) => (
                    <MovieReviewBox
                      key={reviewIndex}
                      review={review}
                      handleTogglePopup={handleTogglePopup}
                    />
                  ))}
                </div>
              ) : (
                <p>No Reviews Yet</p>
              )}
            </div>
            {/* Create Review */}
            <div className="flex-[.6] items-center flex flex-col gap-8">
              <div>
                <p className="text-md font-semibold">Create a New Review</p>
                <hr className="mt-2 bg-white opacity-30" />
              </div>
              <textarea
                style={{
                  all: "unset",
                  padding: "6px",
                  resize: "vertical",
                  width: "99%",
                  borderRadius: "6px",
                  boxShadow: "0 2px 6px 0 rgba(255,255,255,0.2)",
                }}
                placeholder="Type your review here"
                name="user-review"
                id=""
                rows={10}
                onChange={(e) => handleCreateReviewTextChange(e)}
              />
              <button
                className="duration-300 relative overflow-hidden border-[1px] hover:text-primary  border-textWhite rounded-md p-2 pr-8 pl-8 group"
                onClick={(e) => handleReviewSubmit()}
              >
                <div className="hidden group-hover:block absolute top-[-70px] left-[-100px] w-[400px] h-[200]">
                  <svg
                    width="400"
                    height="200"
                    viewBox="0 0 400 200"
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
                <p>Submit Review</p>
              </button>
            </div>
          </div>
          <div className="w-full flex items-center justify-center mt-8">
            <div className="flex gap-14 items-center">
              <button
                disabled={
                  paginationArr.length > 1 || selectedPage === 1 ? false : true
                }
                onClick={() => handlePrev()}
              >
                {"<"}
              </button>
              <div className="flex gap-4 items-center">
                {paginationArr.map((pageNo, i) => (
                  <button key={i} onClick={() => handlePageNumberClick(pageNo)}>
                    <p
                      className={
                        i + 1 === selectedPage
                          ? "pr-2 pl-2 border-[1px] rounded-sm bg-gray-400 text-background font-bold"
                          : "pr-2 pl-2 border-[1px] rounded-sm text-gray-400 border-gray-500"
                      }
                    >
                      {String(pageNo)}
                    </p>
                  </button>
                ))}
              </div>
              <button
                disabled={
                  paginationArr.length > 1 ||
                  selectedPage === paginationArr.length
                    ? false
                    : true
                }
                onClick={() => handleNext()}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Discussions Comming Soon</p>
        </div>
      )}

      <div className="relative z-50">
        <div
          className={
            toggleReviewPopup
              ? "duration-300 opacity-100 fixed top-0 left-0 h-full w-full flex items-center justify-center bg-[rgba(0,0,0,0.9)]"
              : "duration-300 hidden opacity-0"
          }
          //   onClick={() => handleTogglePopup()}
        >
          <div
            style={{ boxShadow: "0 2px 6px 0 rgba(255,255,255,0.3)" }}
            className={
              toggleReviewPopup
                ? "fixed duration-300 scale-100 w-[70%] min-h-[50vh] p-8 bg-[rgba(0,0,0,0.9)] rounded-lg text-textWhite border-[1px] border-white overflow-hidden"
                : "scale-0"
            }
          >
            <MdCancel
              onClick={() => handleTogglePopup()}
              className="absolute top-[4px] right-[4px] text-[24px] text-white opacity-60 cursor-pointer z-20"
            />
            <div className="absolute top-0 left-0 w-[1500px] h-full blur-lg opacity-60 z-10">
              <svg
                width="100%"
                height="800"
                viewBox="0 0 800 600"
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
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <MdOutlinePersonPinCircle className="text-xl" />
                <div>
                  <p className="text-md font-bold">
                    Review by {reviewPopupData.userName}
                  </p>
                  <p className="text-sm">
                    Written on {getLocalDate(reviewPopupData.reviewDate)}
                  </p>
                </div>
              </div>
              <p>{reviewPopupData.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieReviews;
