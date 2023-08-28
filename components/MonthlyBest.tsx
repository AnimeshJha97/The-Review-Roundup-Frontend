"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MovieData from "../data/movieData";
import { MovieModel } from "../model/model";

import { FaStar } from "react-icons/fa";
import { shortifyText } from "@/lib/utils";
import { log } from "console";

const categoryMenu = [
  "Movies",
  "TV Series",
  "Destinations",
  "Games",
  "Live Shows",
  "Books",
];

const MonthlyBest = () => {
  const [selectedCategory, setSelectedCategory] = useState("Movies");
  const [categoryData, setCategoryData] = useState<MovieModel[]>([]);

  useEffect(() => {
    // get data for selected category
    const data: MovieModel[] = [...MovieData];
    setCategoryData(data);
  }, [selectedCategory]);

  const handleCategorySelection = (category: string) => {
    let movies = "";
    categoryData.map((movie) => {
      movies += movie.title + " , ";
    });
    console.log(movies);

    setSelectedCategory(category);
  };

  const settings = {
    // className: "center",
    centerMode: true,
    centerPadding: "300px",
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    // beforeChange: () => beforeChangeHandler,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-screen pt-[64px] pb-[64px] text-textWhite flex flex-col gap-14">
      <div className="flex flex-col gap-4 pl-[120px] pr-[120px]">
        <p className="text-[48px] font-bold">
          Pick of the <span className="text-primary">Month</span>
        </p>
        {/* Category Menu */}
        <div className="flex items-center gap-8">
          {categoryMenu.map((category, i) => (
            <div key={i} className="flex items-center">
              <p
                className={
                  category === selectedCategory
                    ? "text-primary cursor-pointer text-md border-b-primary border-b-2"
                    : "hover:text-primary cursor-pointer text-md"
                }
                onClick={() => handleCategorySelection(category)}
              >
                {category}
              </p>
              {i < categoryMenu.length - 1 && (
                <svg
                  width="3"
                  height="28"
                  className="ml-8"
                  viewBox="0 0 3 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 2.73628L3 0V28L0 25.5823V2.73628Z"
                    fill="#02DAC5"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* categorywise items */}
      <div className="w-screen">
        <Slider {...settings}>
          {categoryData.map((data, i) => (
            <div key={i} className="pr-4 pl-4 group">
              <div className="h-[500px] overflow-hidden mb-4">
                <img
                  className="h-full group-hover:scale-125 transition-all duration-300"
                  src={data.images.postor}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-md group-hover:text-primary">
                  {shortifyText(data.title, 30)}
                </p>
                <div className="flex items-center gap-2 text-yellow-200">
                  <FaStar />
                  <p>{data.rating}/10</p>
                </div>
                <p className="w-full break-words text-primary">{data.genre}</p>
                {/* <div className='flex justify-between items-end gap-2 text-primary'>
                                </div> */}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MonthlyBest;
