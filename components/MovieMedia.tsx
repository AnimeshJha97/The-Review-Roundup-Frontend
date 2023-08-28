"use client";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { storeMovie } from "@/app/recoil/atom/storeMovie";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import YoutubePlayer from "./youtubePlayer";
import SectionMenu from "./SectionMenu";
import { ratingIdentifier } from "@/lib/utils";
import { MovieModel } from "@/model/model";

const mediaMenuData = ["Videos", "Gallery"];

interface propType {
  movie: MovieModel;
}

const MovieMedia = () => {
  const movie = useRecoilValue(storeMovie);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Videos");
  const ytSliderSettings = {
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
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
    <div className="relative w-screen pb-[64px] pl-[120px] pr-[120px] text-textWhite z-10">
      <div className="flex justify-between items-center mb-4">
        <p className="text-[48px] font-bold mb-2">Media</p>
        <SectionMenu
          menu={mediaMenuData}
          setSelectedItem={setSelectedMenuItem}
          selectedItem={selectedMenuItem}
        />
      </div>
      <div className="z-10">
        {selectedMenuItem === "Videos" ? (
          <Slider {...ytSliderSettings}>
            {movie &&
              movie.video &&
              movie.video.map((id) => <YoutubePlayer key={id} videoId={id} />)}
          </Slider>
        ) : (
          <Slider {...ytSliderSettings}>
            <img src={movie.images.banner} alt="" />
            {movie &&
              movie.images &&
              movie.images.backdrops &&
              movie.images.backdrops.map((imgUrl, i) => (
                <img key={i} src={imgUrl} alt="" />
              ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default MovieMedia;
