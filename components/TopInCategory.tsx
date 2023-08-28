'use client'

import React, { useState, useEffect } from 'react'
import MovieData from "../data/movieData"
import { MovieModel } from "../model/model"
import MovieBox from './MovieBox'
import allData from '../data/allData.json'
import { getAllMovieData } from '@/lib/utils'
// JSON list of movies
const movies = allData.movies[2020].action_adventure.slice(0, 2)
// const categoryMenu = ['Movies', 'TV Series', 'Destinations', 'Games', 'Live Shows', 'Books']
// const secondaryMenu = ["Top Rated", "Trending"]

const TopInCategory = ({ type }: { type: string }) => {
    const [categoryData, setCategoryData] = useState<MovieModel[]>([])
    useEffect(() => {
        async function getTopCategoryMovies() {
            const movies = await getAllMovieData(1,6,"-rating")
            console.log("getTopCategoryMovies movies", movies);
            
            if(movies.length)
                setCategoryData(movies)
        }
        getTopCategoryMovies()   

    }, [])

    return (
        <div className='w-screen pt-[64px] pb-[64px] pl-[120px] pr-[120px] text-textWhite flex flex-col gap-12'>
            {type ? <p className='text-[48px] font-bold'>Top in <span className='text-primary'>{type}</span></p> : null}
            {/* items */}
            <div className=' w-full flex justify-center items-center'>
                {type === "Movies" ? (
                    <div className='grid grid-cols-3 items-center gap-8'>
                        {categoryData.slice(0, 6).map((data, i) => (
                            <MovieBox key={i} movie={data} num={i} />
                        ))}
                    </div>
                ) : null}
                {type === "Tv Series" ? (
                    <p className='text-md font-bold font-serif'>🚀 Coming Soon . . . 🚀</p>
                ) : null}
                {type === "Books" ? (
                    <p className='text-md font-bold font-serif'>🚀 Coming Soon . . . 🚀</p>
                ) : null}
                {type === "Destinations" ? (
                    <p className='text-md font-bold font-serif'>🚀 Coming Soon . . . 🚀</p>
                ) : null}
                {type === "Live Shows" ? (
                    <p className='text-md font-bold font-serif'>🚀 Coming Soon . . . 🚀</p>
                ) : null}
                {type === "Cafes" ? (
                    <p className='text-md font-bold font-serif'>🚀 Coming Soon . . . 🚀</p>
                ) : null}
            </div>
        </div>
    )
}

export default TopInCategory