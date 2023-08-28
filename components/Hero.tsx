'use client'

import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import useAxios from "axios-hooks";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from '@/sections/header'
import MovieData from "../data/movieData"
import { MovieModel } from '@/model/model';
import { getAllMovieData } from '@/lib/utils';

const Hero = () => {
    const [movieData, setMovieData] = useState<MovieModel[]>([])

    useEffect(() => {
        async function getHeroMovies() {
            const movies = await getAllMovieData(1,3,"releaseYear")
            console.log("getHeroMovies movies", movies);
            
            if(movies.length)
                setMovieData(movies)
        }
        getHeroMovies()        
    }, [])

    useEffect(() => {        
        console.log("movieData: ", movieData);
        // async function getHeroMovies() {
        //     const movies = await getAllMovieData(1,3,"releaseYear")
        //     if(movies.length)
        //         setMovieData(movies)
        // }
        // getHeroMovies()    
    }, [movieData])


    const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "0px",
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='relative'>
            <Header overlay={true} />
            <div className="absolute top-0 left-0 w-screen overflow-hidden">
                <div className="relative h-[90vh] w-full">
                    <Slider {...settings}>
                        {movieData && movieData.length > 0 && movieData.map(movie => (
                            <div key={movie.title} className='relative w-full'>
                                <img src={movie.images.banner} alt="movie-poster" className='w-full object-contain' />
                                <div className='absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)]' />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Hero